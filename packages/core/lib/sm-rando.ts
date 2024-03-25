import DotNetRandom from "./dotnet-random";
import { Area, AreaCounts, Location, getLocations } from "./locations";
import { Item, ItemType } from "./items";
import { Graph, getPreset } from "..";
import { generateSeed } from "../data";
import doors, { isAreaEdge, isBossEdge } from "../data/doors";
import { BOSS_DOORS, BOSS_ITEMS, DASH_CLASSIC_PATCHES, TABLE_FLAGS } from "../data/interface";
import {
  BossMode,
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
  options: Options
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
  encodeBytes(seedPatch, 0x2f8000, U16toBytes(rnd.Next(0xffff)));
  encodeBytes(seedPatch, 0x2f8002, U16toBytes(rnd.Next(0xffff)));

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

  const mapArea = (n: ItemNode) => {
    switch(n.location.area) {
      case Area.BlueBrinstar:
        return Area.Crateria;
      case Area.GreenBrinstar:
        return Area.PinkBrinstar;
      default:
        return n.location.area;
    }
  };

  const eTanks = nodes.filter((n) => n.item.type == Item.EnergyTank);

  const majors = nodes.filter(
    (n) =>
      n.item.isMajor &&
      n.item.type != Item.EnergyTank &&
      n.item.type != Item.Reserve
  );

  AreaCounts.forEach((addr, area) => {
    const numTanks = eTanks.filter((p) => mapArea(p) == area).length;
    const numMajors = majors.filter((p) => mapArea(p) == area).length;
    encodeBytes(seedPatch, addr, new Uint8Array([numMajors, numTanks]));
  });

  //-----------------------------------------------------------------
  // Write the spoiler in the credits.
  //-----------------------------------------------------------------

  const getSortAddress = (loc: Location) => {
    switch (loc.address) {
      case BOSS_ITEMS.VariaSuitInWreckedShip:
      case BOSS_ITEMS.VariaSuitInMaridia:
      case BOSS_ITEMS.VariaSuitInNorfair:
        return BOSS_ITEMS.VariaSuitInBrinstar;

      case BOSS_ITEMS.RidleyTankInBrinstar:
      case BOSS_ITEMS.RidleyTankInWreckedShip:
      case BOSS_ITEMS.RidleyTankInMaridia:
        return BOSS_ITEMS.RidleyTankInNorfair;

      case BOSS_ITEMS.SpaceJumpInBrinstar:
      case BOSS_ITEMS.SpaceJumpInWreckedShip:
      case BOSS_ITEMS.SpaceJumpInNorfair:
        return BOSS_ITEMS.SpaceJumpInMaridia;

      default:
        return loc.address;
    }
  }

  const sortedLocations = getLocations().sort((a, b) => a.address - b.address);

  nodes
    .filter((n) => n.item.spoilerAddress > 0)
    .forEach((n) => {
      const addr = getSortAddress(n.location);
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
  encodeBytes(seedPatch, 0x2f8b10, U16toBytes(settings.gravityHeatReduction));

  //-----------------------------------------------------------------
  // Update boss doors.
  //-----------------------------------------------------------------

  const getDoorUpdate = (a: string, b: string) => {
    const x = doors.find((d) => d.door == a);
    const y = doors.find((d) => d.door == b);

    if (x == undefined) {
      throw new Error(`Could not find: ${a}`);
    }

    if (y == undefined) {
      throw new Error(`Could not find: ${b}`);
    }
    return [
      { door: x.address, dest: y.vector },
      { door: y.address, dest: x.vector },
    ];
  };

  let bossUpdates: { door: number; dest: number }[] = [];
  graph
    .filter((e) => isBossEdge(e))
    .forEach((b) => {
      if (settings.bossMode == BossMode.Shuffled) {
        bossUpdates.push(...getDoorUpdate(b.from.name, b.to.name));
      } else if (settings.bossMode == BossMode.Shifted) {
        if (b.from.name == "Door_KraidBoss") {
          if (b.to.name == "Exit_Draygon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToKraidBoss,
              dest: BOSS_DOORS.DoorVectorToDraygonInBrinstar,
            });
          } else if (b.to.name == "Exit_Phantoon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToKraidBoss,
              dest: BOSS_DOORS.DoorVectorToPhantoonInBrinstar,
            });
          } else if (b.to.name == "Exit_Ridley") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToKraidBoss,
              dest: BOSS_DOORS.DoorVectorToRidleyInBrinstar,
            });
          }
        } else if (b.from.name == "Door_PhantoonBoss") {
          if (b.to.name == "Exit_Draygon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToPhantoonBoss,
              dest: BOSS_DOORS.DoorVectorToDraygonInWreckedShip,
            });
          } else if (b.to.name == "Exit_Kraid") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToPhantoonBoss,
              dest: BOSS_DOORS.DoorVectorToKraidInWreckedShip,
            });
          } else if (b.to.name == "Exit_Ridley") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToPhantoonBoss,
              dest: BOSS_DOORS.DoorVectorToRidleyInWreckedShip,
            });
          }
        } else if (b.from.name == "Door_DraygonBoss") {
          if (b.to.name == "Exit_Kraid") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToDraygonBoss,
              dest: BOSS_DOORS.DoorVectorToKraidInMaridia,
            });
          } else if (b.to.name == "Exit_Phantoon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToDraygonBoss,
              dest: BOSS_DOORS.DoorVectorToPhantoonInMaridia,
            });
          } else if (b.to.name == "Exit_Ridley") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToDraygonBoss,
              dest: BOSS_DOORS.DoorVectorToRidleyInMaridia,
            });
          }
        } else if (b.from.name == "Door_RidleyBoss") {
          if (b.to.name == "Exit_Draygon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToRidleyBoss,
              dest: BOSS_DOORS.DoorVectorToDraygonInNorfair,
            });
          } else if (b.to.name == "Exit_Phantoon") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToRidleyBoss,
              dest: BOSS_DOORS.DoorVectorToPhantoonInNorfair,
            });
          } else if (b.to.name == "Exit_Kraid") {
            bossUpdates.push({
              door: BOSS_DOORS.DoorToRidleyBoss,
              dest: BOSS_DOORS.DoorVectorToKraidInNorfair,
            });
          }
        }
      }
    });
  bossUpdates.forEach((p) => {
    encodeBytes(seedPatch, p.door, U16toBytes(p.dest & 0xffff));
  });

  graph
    .filter((e) => isAreaEdge(e))
    .forEach((a) => {
      const areaUpdates = getDoorUpdate(a.from.name, a.to.name);
      areaUpdates.forEach((p) => {
        encodeBytes(seedPatch, p.door, U16toBytes(p.dest & 0xffff));
      });
    });

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
  // Encode seed flags from the website.
  //-----------------------------------------------------------------

  encodeBytes(seedPatch, 0x2f8b00, paramsToBytes(seed, settings, options));

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
  const nodes = getLocations().map((l) => {
    const vertex = graph.find((e) => e.from.name == l.name)?.from;
    if (vertex == undefined) {
      throw new Error("getItemNodes: failed to find vertex for location");
    }
    if (vertex.item == undefined) {
      throw new Error("getItemNodes: no item at vertex");
    }
    const node = {
      location: l.Clone(),
      item: { ...vertex.item },
    };

    // Space Jump?
    if (node.location.address == BOSS_ITEMS.SpaceJumpInMaridia) {
      switch (vertex.area) {
        case "KraidsLair":
          node.location.area = Area.Kraid;
          node.location.address = BOSS_ITEMS.SpaceJumpInBrinstar;
          break;
        case "WreckedShip":
          node.location.area = Area.WreckedShip;
          node.location.address = BOSS_ITEMS.SpaceJumpInWreckedShip;
          break;
        case "LowerNorfair":
          node.location.area = Area.LowerNorfair;
          node.location.address = BOSS_ITEMS.SpaceJumpInNorfair;
          break;
      }
    }

    // Varia Suit?
    if (node.location.address == BOSS_ITEMS.VariaSuitInBrinstar) {
      switch (vertex.area) {
        case "EastMaridia":
          node.location.area = Area.EastMaridia;
          node.location.address = BOSS_ITEMS.VariaSuitInMaridia;
          break;
        case "WreckedShip":
          node.location.area = Area.WreckedShip;
          node.location.address = BOSS_ITEMS.VariaSuitInWreckedShip;
          break;
        case "LowerNorfair":
          node.location.area = Area.LowerNorfair;
          node.location.address = BOSS_ITEMS.VariaSuitInNorfair;
          break;
      }
    }

    // Ridley Energy Tank?
    if (node.location.address == BOSS_ITEMS.RidleyTankInNorfair) {
      switch (vertex.area) {
        case "EastMaridia":
          node.location.area = Area.EastMaridia;
          node.location.address = BOSS_ITEMS.RidleyTankInMaridia;
          break;
        case "WreckedShip":
          node.location.area = Area.WreckedShip;
          node.location.address = BOSS_ITEMS.RidleyTankInWreckedShip;
          break;
        case "KraidsLair":
          node.location.area = Area.Kraid;
          node.location.address = BOSS_ITEMS.RidleyTankInBrinstar;
          break;
      }
    }
    return node;
  });

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

  const seedPatch = generateSeedPatch(seed, settings, graph, options);
  const fileName = getFileName(preset.fileName, seed, settings, options);
  const patch = getBasePatch(settings);

  return [`patches/${patch}`, seedPatch, fileName];
};

export const getSeedNumber = (seedNumber?: number) => {
  if (seedNumber != undefined && seedNumber != 0) {
    return seedNumber;
  }
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return new DotNetRandom(timestamp).NextInRange(1, 1000000);
}