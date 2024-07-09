import DotNetRandom from "./dotnet-random";
import { AreaCounts, Location, getArea, getAreaString, getLocations } from "./locations";
import { Item, ItemType } from "./items";
import { Edge, Graph, getPreset } from "..";
import { generateSeed } from "../data";
import doors, { isAreaEdge, isBossEdge } from "../data/doors";
import { DASH_CLASSIC_PATCHES, TABLE_FLAGS } from "../data/interface";
import {
  MajorDistributionMode,
  MapLayout,
  Options,
  Settings,
  paramsToBytes,
  paramsToString,
} from "./graph/params";

type Hunk = [ number, number, Uint8Array ];
type Patch = Hunk[];

type ItemNode = {
  location: Location;
  item: ItemType;
}

export const generateSeedPatch = (
  seed: number,
  settings: Settings,
  graph: Graph,
  options: Options,
  race: boolean
): Patch => {
  //-----------------------------------------------------------------
  // Verify inputs.
  //-----------------------------------------------------------------

  if (!Number.isInteger(seed)) {
    throw new Error("Seed is not an integer!");
  }

  //-----------------------------------------------------------------
  // Utility functions.
  //-----------------------------------------------------------------

  const encodeRepeating = (patch: Patch, offset: number, length: number, bytes: Uint8Array) => {
    patch.push([offset, length, bytes]);
  };

  const encodeBytes = (patch: Patch, offset: number, bytes: Uint8Array) => {
    encodeRepeating(patch, offset, 1, bytes);
  };

  const U8toBytes = (u8: number) => {
    return new Uint8Array([u8]);
  };

  const U16toBytes = (u16: number) => {
    return new Uint8Array(new Uint16Array([u16]).buffer);
  };

  const U32toBytes = (u32: number) => {
    return new Uint8Array(new Uint32Array([u32]).buffer);
  };

  //-----------------------------------------------------------------
  // Encode the seed to show on the file select screen.
  //-----------------------------------------------------------------

  const nodes = getItemNodes(graph);
  const seedPatch: Patch = [];
  const rnd = new DotNetRandom(seed);
  encodeBytes(
    seedPatch,
    TABLE_FLAGS.FileSelectCode,
    U16toBytes(rnd.Next(0xffff))
  );
  encodeBytes(
    seedPatch,
    TABLE_FLAGS.FileSelectCode + 2,
    U16toBytes(rnd.Next(0xffff))
  );

  //-----------------------------------------------------------------
  // Handle map layout.
  //-----------------------------------------------------------------

  if (settings.mapLayout == MapLayout.Classic) {
    DASH_CLASSIC_PATCHES.forEach(p => {
      encodeBytes(seedPatch, p.room, U16toBytes(p.patch));
    });
  }

  //-----------------------------------------------------------------
  // Write the items at the appropriate locations.
  //-----------------------------------------------------------------

  nodes.forEach((n) => {
    const itemBytes = n.location.GetItemBytes(n.item.type);
    encodeBytes(seedPatch, n.location.address, itemBytes);
  });

  //-----------------------------------------------------------------
  // Write area item counts.
  //-----------------------------------------------------------------

  const eTanks = nodes.filter((n) => n.item.type == Item.EnergyTank);

  const majors = nodes.filter(
    (n) =>
      n.item.isMajor &&
      n.item.type != Item.EnergyTank &&
      n.item.type != Item.Reserve
  );

  AreaCounts.forEach((addr, area) => {
    const numTanks = eTanks.filter((p) => p.location.area == area).length;
    const numMajors = majors.filter((p) => p.location.area == area).length;
    encodeBytes(seedPatch, addr, new Uint8Array([numMajors, numTanks]));
  });

  //-----------------------------------------------------------------
  // Write the spoiler in the credits.
  //-----------------------------------------------------------------

  const sortedLocations = getLocations().sort((a, b) => a.address - b.address);
  //sortedLocations.forEach(l => console.log(l.name,getAreaString(l.area)))

  nodes
    .filter((n) => n.item.spoilerAddress > 0)
    .forEach((n) => {
      const addr = n.location.address;
      const locIndex = sortedLocations.findIndex((l) => l.address == addr);
      encodeBytes(seedPatch, n.item.spoilerAddress, U16toBytes(locIndex + 1));
    });

  //-----------------------------------------------------------------
  // Setup HUD.
  //-----------------------------------------------------------------

  let hudBits = 0x0d; // Show Area, Change Damage, and Dash Items
  if (settings.majorDistribution == MajorDistributionMode.Full) {
    hudBits |= 0x02; // Show Item Counts
  }
  encodeBytes(seedPatch, TABLE_FLAGS.HUDBitField, U8toBytes(hudBits));

  //-----------------------------------------------------------------
  // Settings.
  //-----------------------------------------------------------------

  encodeBytes(seedPatch, TABLE_FLAGS.ChargeMode, U8toBytes(settings.beamMode));
  encodeBytes(
    seedPatch,
    TABLE_FLAGS.GravityHeatDamage,
    U16toBytes(settings.gravityHeatReduction)
  );

  //-----------------------------------------------------------------
  // Encode boss and area edges.
  //-----------------------------------------------------------------

  const encodeEdge = (e: Edge) => {
      const x = doors.find(
        (d) => d.door == e.from.name && d.area == e.from.area
      );
      const y = doors.find((d) => d.door == e.to.name && d.area == e.to.area);
      if (x == undefined || y == undefined) {
        const msg = `Failed to find boss edge: ${e.from.name} ${e.from.area} to ${e.to.name} ${e.to.area}`
        throw new Error(msg)
      }
      if (x.address == undefined) {
        return;
      }
      //console.log("Encoding",x.door,"to",y.door)
      //console.log(`${x.address.toString(16)} to ${y.vector.toString(16)}`)
      encodeBytes(seedPatch, x.address, U16toBytes(y.vector & 0xffff))
  }

  graph
    .filter((e) => isBossEdge(e) || isAreaEdge(e))
    .forEach((e) => encodeEdge(e))

  //-----------------------------------------------------------------
  // Other options.
  //-----------------------------------------------------------------

  if (options != null) {
    encodeBytes(
      seedPatch,
      TABLE_FLAGS.NoFanfare,
      U16toBytes(options.DisableFanfare ? 0x1 : 0x0)
    );
  }

  //-----------------------------------------------------------------
  // Encode seed flags from the website for non-race seeds.
  //-----------------------------------------------------------------

  const seedFlags = new Uint8Array(TABLE_FLAGS.SeedFlagsSize).fill(0xee)
  if (!race) {
    seedFlags.set(paramsToBytes(seed, settings, options))
  }
  encodeBytes(seedPatch, TABLE_FLAGS.SeedFlags, seedFlags)

  return seedPatch;
};

export const getBasePatch = (settings: Settings) => {
  const area = settings.randomizeAreas ? "_area" : "";
  return settings.mapLayout == MapLayout.Recall
    ? `dash_recall${area}.bps`
    : `dash_standard${area}.bps`;
};

export const getFileName = (
  rootName: string,
  seed: number,
  settings: Settings,
  options: Options
) => {
  const flags = paramsToString(seed, settings, options);
  return `DASH_${rootName}_${flags}.sfc`;
};

const getItemNodes = (graph: Graph): ItemNode[] => {
  const nodes: ItemNode[] = [];

  getLocations().forEach((l) => {
    const vertex = graph.find((e) => {
      return e.from.name == l.name && getArea(e.from.area) == l.area
    })?.from;
    if (vertex == undefined || vertex.item == undefined) {
      return;
    }
    nodes.push({
      location: l,
      item: { ...vertex.item }
    })
  })

  return nodes;
};

export const generateFromPreset = (name: string, seedNumber: number) => {
  const seed = getSeedNumber(seedNumber);
  const preset = getPreset(name);

  if (preset == undefined) {
    console.log("UNKNOWN PRESET: " + name);
    return ["", null, ""];
  }

  // Place the items.
  const { settings, options } = preset;
  const graph = generateSeed(seed, settings, options);

  const seedPatch = generateSeedPatch(seed, settings, graph, options, false);
  const fileName = getFileName(preset.fileName, seed, settings, options);
  const patch = getBasePatch(settings);

  return [`patches/${patch}`, seedPatch, fileName];
};

export const getSeedNumber = (seedNumber?: number) => {
  const MAX_SEED = 1000000
  if (seedNumber != undefined && seedNumber != 0) {
    if (seedNumber > 0 && seedNumber <= MAX_SEED) {
      return seedNumber;
    }
    throw new Error("Invalid seed number: " + seedNumber);
  }
  const timestamp = Math.floor(Date.now() % MAX_SEED);
  return new DotNetRandom(timestamp).NextInRange(1, MAX_SEED);
}
