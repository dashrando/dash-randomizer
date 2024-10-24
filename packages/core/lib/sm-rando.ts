import DotNetRandom from "./dotnet-random";
import { AreaCounts, Location, getArea, getLocations } from "./locations";
import { Item, ItemType } from "./items";
import { Edge, Graph, computeCRC32, encodeSeed } from "..";
import doors, { isAreaEdge, isBossEdge } from "../data/doors";
import { DASH_CLASSIC_PATCHES, TABLE_FLAGS } from "../data/interface";
import {
  MajorDistributionMode,
  MapLayout,
  Options,
  Params,
  Settings,
  paramsToBytes,
} from "./params";

type Hunk = [ number, number, Uint8Array ];
export type Patch = Hunk[];

type ItemNode = {
  location: Location;
  item: ItemType;
}

export const generateSeedPatch = (
  seed: number,
  settings: Settings,
  graph: Graph,
  options: Options,
  race: boolean,
  key: string
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
  const beamUpgradeSpoilers = [0x2f802d, 0x2f802f, 0x2f8031, 0x2f8033];
  let beamUpgradeIndex = 0;

  sortedLocations.forEach((l, i) => {
    const node = nodes.find((n) => n.location.address === l.address);
    switch (node?.item?.type) {
      case Item.Morph:
        encodeBytes(seedPatch, 0x2f8007, U16toBytes(i + 1));
        break;
      case Item.Bombs:
        encodeBytes(seedPatch, 0x2f8009, U16toBytes(i + 1));
        break;
      case Item.Ice:
        encodeBytes(seedPatch, 0x2f800b, U16toBytes(i + 1));
        break;
      case Item.Charge:
        encodeBytes(seedPatch, 0x2f802b, U16toBytes(i + 1));
        break;
      case Item.HJB:
        encodeBytes(seedPatch, 0x2f8017, U16toBytes(i + 1));
        break;
      case Item.Speed:
        encodeBytes(seedPatch, 0x2f801b, U16toBytes(i + 1));
        break;
      case Item.Wave:
        encodeBytes(seedPatch, 0x2f800d, U16toBytes(i + 1));
        break;
      case Item.Spazer:
        encodeBytes(seedPatch, 0x2f800f, U16toBytes(i + 1));
        break;
      case Item.SpringBall:
        encodeBytes(seedPatch, 0x2f801f, U16toBytes(i + 1));
        break;
      case Item.Varia:
        encodeBytes(seedPatch, 0x2f8013, U16toBytes(i + 1));
        break;
      case Item.Plasma:
        encodeBytes(seedPatch, 0x2f8011, U16toBytes(i + 1));
        break;
      case Item.Grapple:
        encodeBytes(seedPatch, 0x2f8023, U16toBytes(i + 1));
        break;
      case Item.Gravity:
        encodeBytes(seedPatch, 0x2f8015, U16toBytes(i + 1));
        break;
      case Item.Xray:
        encodeBytes(seedPatch, 0x2f8021, U16toBytes(i + 1));
        break;
      case Item.SpaceJump:
        encodeBytes(seedPatch, 0x2f8019, U16toBytes(i + 1));
        break;
      case Item.ScrewAttack:
        encodeBytes(seedPatch, 0x2f801d, U16toBytes(i + 1));
        break;
      case Item.DoubleJump:
        encodeBytes(seedPatch, 0x2f8029, U16toBytes(i + 1));
        break;
      case Item.PressureValve:
        encodeBytes(seedPatch, 0x2f8027, U16toBytes(i + 1));
        break;
      case Item.HeatShield:
        encodeBytes(seedPatch, 0x2f8025, U16toBytes(i + 1));
        break;
      case Item.BeamUpgrade:
        encodeBytes(
          seedPatch,
          beamUpgradeSpoilers[beamUpgradeIndex++],
          U16toBytes(i + 1)
        );
        break;
      default:
        break;
    }
  });

  //-----------------------------------------------------------------
  // Setup HUD.
  //-----------------------------------------------------------------

  let hudBits = 0x1d; // Show Area, Change Damage, Dash Items, and Heat Reduction
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

  const edgePatch: Patch = [];
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
      encodeBytes(edgePatch, x.address, U16toBytes(y.vector & 0xffff))
  }

  graph
    .filter((e) => isBossEdge(e) || isAreaEdge(e))
    .forEach((e) => encodeEdge(e))

  edgePatch.sort((a, b) => a[0] - b[0]).forEach((p) => seedPatch.push(p))

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
  seedFlags.set(paramsToBytes(seed, settings, options))
  if (race) {
    seedFlags.set(new Uint8Array(4).fill(0xee))
  }
  encodeBytes(seedPatch, TABLE_FLAGS.SeedFlags, seedFlags)

  //-----------------------------------------------------------------
  // Encode seed key which is used as the URL by the website
  //-----------------------------------------------------------------

  if (key.length > 0) {
    // Convert the key to bytes using Base64 encoding
    const keyBytes = Buffer.from(key, "base64")

    // The first byte written is bit packed to include the
    // string length and if the key is for a race seed
    const size = key.length | (race ? 0x80 : 0x00)
    encodeBytes(seedPatch, TABLE_FLAGS.SeedKey, U8toBytes(size))

    // Write the remaining bytes
    keyBytes.forEach((p, i) => {
      encodeBytes(seedPatch, TABLE_FLAGS.SeedKey + i + 1, U8toBytes(p))
    })
  }

  return seedPatch;
};

export const getBasePatch = (settings: Settings) => {
  const area = settings.randomizeAreas ? "_area" : "";
  return settings.mapLayout == MapLayout.Recall
    ? `dash_recall${area}.bps`
    : `dash_standard${area}.bps`;
};

export const getFileName = (params: Params, graph: Graph, rootName?: string, seedKey?: string) => {
  const mode = rootName ? rootName : 'Custom'
  if (seedKey) {
    return `DASH_${mode}_${seedKey}.sfc`
  }
  const encoded = encodeSeed(params, graph);
  const key = computeCRC32(encoded).toString(16)
  return `DASH_${mode}_${key}.sfc`
}

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
