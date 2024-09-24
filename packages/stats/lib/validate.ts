import fs from "fs";
import path from "path";
import {
  decodeSeed,
  Graph,
  loadGraph,
  mapPortals,
  PortalMapping,
  isGraphValid,
  Vertex,
} from "core";
import {
  createLoadout,
  getLocations,
  Item,
  ItemNames,
  majorItem,
  minorItem,
  getAreaString,
  ItemType,
  SeasonEdgeUpdates,
} from "core/data";
import { Options, Params, Settings } from "core/lib/params";
import { MajorDistributionMode } from "core/params";
import chalk from "chalk";

type SeedData = {
  params: Params;
  portals: PortalMapping[];
  itemLocations: {
    location: string;
    area: string;
    item: string;
    code?: number;
  }[];
};

type LegacySeedData = {
  seed: number;
  bosses: {
    kraidBoss: string;
    phantoonBoss: string;
    draygonBoss: string;
    ridleyBoss: string;
  };
  portals: [string, string][];
  itemLocations: { location: string; item: string }[];
};

const getCodeByName = (itemName: string) => {
  let code: number = 0;
  ItemNames.forEach((v, k) => {
    if (v == itemName) {
      code = k;
    }
  });
  return code;
};

const getData = (
  filePath: string,
  defaultSettings?: Settings
): {
  seed: number;
  settings: Settings;
  options: Options;
  portals: PortalMapping[];
  itemLocations: {
    location: string;
    area: string;
    item: string;
    code?: number;
  }[];
  legacy: boolean;
} => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const info = JSON.parse(fileData);
  if (Object.keys(info).includes("params")) {
    const data = info as SeedData;
    return {
      seed: data.params.seed,
      settings: data.params.settings,
      options: data.params.options,
      portals: data.portals,
      itemLocations: data.itemLocations,
      legacy: false,
    };
  }

  if (!defaultSettings) {
    throw new Error(`No settings for ${filePath}`);
  }

  const vanillaLocations = getLocations().filter((l) => l.address < 0x7e000);
  const findLocation = (name: string) => {
    return vanillaLocations.find((l) => l.name == name);
  };

  const data = info as LegacySeedData;
  const getBosses = (): [string, string][] => {
    if (data.bosses === undefined) {
      return [
        ["Door_KraidBoss", `Exit_Kraid`],
        ["Door_PhantoonBoss", `Exit_Phantoon`],
        ["Door_DraygonBoss", `Exit_Draygon`],
        ["Door_RidleyBoss", `Exit_Ridley`],
      ];
    }
    return [
      ["Door_KraidBoss", `Exit_${data.bosses.kraidBoss}`],
      ["Door_PhantoonBoss", `Exit_${data.bosses.phantoonBoss}`],
      ["Door_DraygonBoss", `Exit_${data.bosses.draygonBoss}`],
      ["Door_RidleyBoss", `Exit_${data.bosses.ridleyBoss}`],
    ];
  }
  const getAreas = (): [string, string][] => {
    if (data.portals === undefined) {
      return []
    }
    return data.portals;
  }
  const bossPortals = getBosses();
  const areaPortals = getAreas();

  const portals = mapPortals(areaPortals, bossPortals).filter(
    ([m, n]) => m != undefined && n != undefined
  );

  const itemLocations: { location: string; area: string; item: string }[] =
    data.itemLocations.map((l) => {
      const temp = findLocation(l.location);
      const code = Item[`${l.item}`] as number;
      return {
        location: temp.name,
        area: getAreaString(temp.area),
        item: ItemNames.get(code),
      };
    });
  return {
    seed: data.seed,
    settings: defaultSettings,
    options: {
      RelaxedLogic: false,
      DisableFanfare: false,
    },
    portals,
    itemLocations,
    legacy: true,
  };
};

const loadSeed = (filePath: string, defaultSettings?: Settings) => {
  const data = getData(filePath, defaultSettings);
  const { seed, settings, options, portals, itemLocations, legacy } = data;
  const { mapLayout, majorDistribution, randomizeAreas, bossMode } = settings;
  const { RelaxedLogic } = options;

  const graph = loadGraph(
    seed,
    1,
    mapLayout,
    majorDistribution,
    randomizeAreas,
    RelaxedLogic,
    bossMode,
    portals
  );

  if (legacy) {
    SeasonEdgeUpdates.forEach((c) => {
      const [from, to] = c.edges;
      //TODO: Not currently an issue but should check areas eventually
      const edge = graph.find((n) => n.from.name == from && n.to.name == to);
      if (edge == null) {
        throw new Error(`Could not find edge from ${from} to ${to}`);
      }
      edge.condition = c.requires;
    });
  }

  itemLocations.forEach((i) => {
    const code = i.code ? i.code : getCodeByName(i.item);
    const item =
      majorDistribution == MajorDistributionMode.Full
        ? majorItem(code)
        : minorItem(code);
    placeItem(graph, i.location, i.area, item);
  });

  return {
    settings,
    graph,
  };
};

const placeItem = (
  graph: Graph,
  location: string,
  area: string,
  item: ItemType
) => {
  const part = graph.find(
    (n) => n.from.name == location && n.from.area == area
  );
  if (part == null) {
    console.error("missing part", location, area);
  } else if (part.from.type == "major") {
    item.isMajor = true;
  }
  part.from.item = item;
};

export const checkSeeds = (inputPath: string, areValid: boolean) => {
  const getStuff = () => {
    const inputStat = fs.statSync(inputPath);
    let dirPath = inputPath;
    let entries = [inputPath];
    if (inputStat.isDirectory()) {
      entries = fs.readdirSync(inputPath);
    } else {
      dirPath = path.dirname(inputPath);
    }

    let defaultSettings: Settings = undefined;
    if (fs.existsSync(path.resolve(dirPath, "settings.json"))) {
      const data = fs.readFileSync(
        path.resolve(dirPath, "settings.json"),
        "utf-8"
      );
      defaultSettings = JSON.parse(data) as Settings;
    }

    return {
      dirPath,
      entries,
      defaultSettings,
    };
  };

  const { dirPath, entries, defaultSettings } = getStuff();
  const emptyLoadout = createLoadout();
  let seedCount = 0;

  const checkGraph = (name: string, graph: Graph, settings: Settings) => {
    if (isGraphValid(graph, settings, emptyLoadout)) {
      seedCount += 1;
      if (seedCount % 10000 === 0) {
        console.log(`Validated ${path.resolve(dirPath, name)}`);
      }
      return;
    }

    const getName = (node: Vertex) => {
      if (node.type == "boss") {
        const bossName = node.name.substring(5);
        const doorEdge = graph.find(
          (e) =>
            e.from.name.startsWith("Door_") && e.to.name === `Exit_${bossName}`
        );
        return chalk.magenta(`${bossName} @ ${doorEdge.from.area}`);
      }
      return `${node.item.name} @ ${node.name}`;
    };

    console.log("Collected:");
    const collected = [];
    graph.forEach((e) => {
      if (e.from.progression > 0) {
        const name = getName(e.from);
        if (collected.find((p) => p.name === name)) {
          return;
        }
        collected.push({ progression: e.from.progression, name });
      }
    });
    collected
      .sort((a, b) => a.progression - b.progression)
      .forEach((p) => console.log(p.name));

    console.log("\nUncollected:");
    const uncollected = [];
    graph.forEach((e) => {
      if (e.from.progression == 0) {
        const name = getName(e.from);
        if (uncollected.find((p) => p === name)) {
          return;
        }
        uncollected.push(name);
      }
    });
    uncollected.forEach((p) => console.log(p));

    throw new Error(`failure ${name}`);
  };

  entries.forEach((e) => {
    if (e === "settings.json") {
      return;
    }
    const full = path.resolve(dirPath, e);
    const stats = fs.statSync(full);
    if (stats.isFile()) {
      if (full.endsWith(".json")) {
        // Read directly from a JSON file
        const { settings, graph } = loadSeed(full, defaultSettings);
        checkGraph(e, graph, settings);
      } else if (full.endsWith(".bin")) {
        const encoded = fs.readFileSync(full);
        const decoded = decodeSeed(encoded);
        checkGraph(e, decoded.graph, decoded.params.settings);
      }
    } else if (stats.isDirectory()) {
      seedCount += checkSeeds(full, areValid);
    }
  });

  return seedCount;
};
