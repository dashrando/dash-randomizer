import {
  computeCRC32,
  Graph,
  loadGraph,
  readGraph,
  readParams,
  readPortals,
} from "../..";
import { getAllPresets } from "../presets";
import { generateSeed, getGraphLocations } from "./fill";
import fs from "fs";
import path from "path";
import { isGraphValid } from "./solver";
import { createLoadout } from "../loadout";
import { mapPortals, PortalMapping } from "./data/portals";
import { Options, Params, Settings } from "../params";
import { Item, ItemNames, ItemType, minorItem } from "../items";
import { getAreaString, getLocations } from "../locations";
import { SeasonEdgeUpdates } from "./data/season/edges";
import { encodeSeed, toSafeString } from "../../helpers/encoder";

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

const computeChecksum = (array: any[]) => {
  const e = new TextEncoder();
  return computeCRC32(e.encode(JSON.stringify(array)));
};

const computeGraphChecksum = (graph: Graph) => {
  return computeChecksum(getGraphLocations(graph).map((n) => n.item));
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

const loadSeed = (filePath: string, defaultSettings?: Settings) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const info = JSON.parse(data);

  const getData = (): {
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
    const { bosses } = data;
    const bossPortals: [string, string][] = [
      ["Door_KraidBoss", `Exit_${bosses.kraidBoss}`],
      ["Door_PhantoonBoss", `Exit_${bosses.phantoonBoss}`],
      ["Door_DraygonBoss", `Exit_${bosses.draygonBoss}`],
      ["Door_RidleyBoss", `Exit_${bosses.ridleyBoss}`],
    ];

    const portals = mapPortals(data.portals, bossPortals).filter(
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

  const { seed, settings, options, portals, itemLocations, legacy } = getData();
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
    placeItem(graph, i.location, i.area, minorItem(code));
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

const saveSeed = (
  filePath: string,
  graph: Graph,
  portals: PortalMapping[],
  params: Params
) => {
  const locations = getGraphLocations(graph);
  const itemLocations = locations
    .filter((l) => l.item != undefined)
    .sort((a, b) => a.name.localeCompare(b.name));
  const seed = {
    params,
    portals: portals,
    itemLocations: itemLocations.map((l) => {
      return {
        location: l.name,
        area: l.area,
        item: l.item.name,
        code: l.item.type,
      };
    }),
  };
  fs.writeFileSync(filePath, JSON.stringify(seed, null, 2));
};

let validSeedCount = 0;
let invalidSeedCount = 0;

const checkSeeds = (dirPath: string, areValid: boolean) => {
  if (!fs.statSync(dirPath).isDirectory()) {
    return;
  }
  const entries = fs.readdirSync(dirPath);
  const emptyLoadout = createLoadout();
  let defaultSettings: Settings = undefined;

  if (fs.existsSync(path.resolve(dirPath, "settings.json"))) {
    const data = fs.readFileSync(
      path.resolve(dirPath, "settings.json"),
      "utf-8"
    );
    defaultSettings = JSON.parse(data) as Settings;
  }

  const checkGraph = (name: string, graph: Graph, settings: Settings) => {
    try {
      expect(isGraphValid(graph, settings, emptyLoadout)).toBe(areValid);
      if (areValid) {
        validSeedCount += 1;
      } else {
        invalidSeedCount += 1;
      }
    } catch (error) {
      console.error(name);
      throw error;
    }
  };

  entries.forEach((e) => {
    if (e === "settings.json") {
      return;
    }
    const full = path.resolve(dirPath, e);
    const stats = fs.statSync(full);
    if (stats.isFile()) {
      if (full.endsWith(".sfc")) {
        // Read parameters and graph from the ROM
        const rom = new Uint8Array(fs.readFileSync(full));
        const params = readParams(rom);
        const portals = readPortals(rom);
        const graph = readGraph(rom);
        saveSeed(full.replace(".sfc", ".json"), graph, portals, params);
        checkGraph(e, graph, params.settings);
      } else if (full.endsWith(".json")) {
        // Read directly from a JSON file
        const { settings, graph } = loadSeed(full, defaultSettings);
        checkGraph(e, graph, settings);
      }
    } else if (stats.isDirectory()) {
      checkSeeds(full, areValid);
    }
  });
};

describe("solver", () => {
  test("first 25", () => {
    const encodings: string[] = [];
    const presets = getAllPresets();

    presets.forEach((p) => {
      for (let i = 0; i < 25; i++) {
        const { settings, options } = p;
        const g = generateSeed(i + 1, settings, options);
        const r = { seed: i + 1, settings, options };
        encodings.push(toSafeString(encodeSeed(r, g)));
      }
    });

    const dirPath = path.resolve(__dirname, "fixtures");
    const fileName = path.resolve(dirPath, "first25.txt");

    const combined = encodings.join("\n");
    //fs.writeFileSync(fileName, combined);
    const existing = fs.readFileSync(fileName, "utf-8");
    expect(combined).toBe(existing);
  });

  test("known valid seeds", () => {
    const dirPath = path.resolve(__dirname, "fixtures");
    const entries = fs.readdirSync(dirPath);

    entries.forEach((e) => {
      if (e == "invalid") {
        return;
      }
      checkSeeds(path.resolve(dirPath, e), true);
    });
    process.stdout.write(`Processed ${validSeedCount} valid seeds\n`);
  });

  test("known invalid seeds", () => {
    const dirPath = path.resolve(__dirname, "fixtures/invalid");
    checkSeeds(dirPath, false);
    process.stdout.write(`Processed ${invalidSeedCount} invalid seeds\n`);
  });
});
