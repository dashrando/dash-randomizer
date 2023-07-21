import DotNetRandom from "./dotnet-random";
import game_modes from "../data/modes";
import { Area, AreaCounts, getLocations } from "./locations";
import { Item } from "./items";
import { mapLocation } from "./graph/util";
import { loadGraph } from "./graph/init";
import { graphFill } from "./graph/fill";
import { presets } from "..";
import doors, { isAreaEdge, isBossEdge } from "../data/doors";
import { BOSS_DOORS, BOSS_ITEMS } from "../data/interface";
import { BossMode, paramsToBytes, paramsToString } from "./graph/params";

export const generateSeedPatch = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  graph,
  options
) => {
  //-----------------------------------------------------------------
  // Utility functions.
  //-----------------------------------------------------------------

  const encodeRepeating = (patch, offset, length, bytes) => {
    patch.push([offset, length, bytes]);
  };

  const encodeBytes = (patch, offset, bytes) => {
    encodeRepeating(patch, offset, 1, bytes);
  };

  const U8toBytes = (u8) => {
    return new Uint8Array([u8]);
  };

  const U16toBytes = (u16) => {
    return new Uint8Array(new Uint16Array([u16]).buffer);
  };

  const U32toBytes = (u32) => {
    return new Uint8Array(new Uint32Array([u32]).buffer);
  };

  //-----------------------------------------------------------------
  // Encode the seed to show on the file select screen.
  //-----------------------------------------------------------------

  const nodes = getItemNodes(graph);
  const seedPatch = [];
  const rnd = new DotNetRandom(seed);
  encodeBytes(seedPatch, 0x2f8000, U16toBytes(rnd.Next(0xffff)));
  encodeBytes(seedPatch, 0x2f8002, U16toBytes(rnd.Next(0xffff)));

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

  const mapArea = (n) => {
    if (n.location.area == Area.BlueBrinstar) {
      return Area.Crateria;
    } else if (n.location.area == Area.GreenBrinstar) {
      return Area.PinkBrinstar;
    } else {
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

  const sortedLocations = getLocations().sort((a, b) => a.address - b.address);

  nodes
    .filter((n) => n.item.spoilerAddress > 0)
    .forEach((n) => {
      const locIndex = sortedLocations.findIndex(
        (l) => l.address == n.location.address
      );
      encodeBytes(seedPatch, n.item.spoilerAddress, U16toBytes(locIndex + 1));
    });

  //-----------------------------------------------------------------
  // Settings.
  //-----------------------------------------------------------------

  encodeBytes(seedPatch, 0x2f8004, U8toBytes(settings.beamMode));
  encodeBytes(seedPatch, 0x2f8005, U8toBytes(0x1)); // show charge damage on HUD
  encodeBytes(seedPatch, 0x2f8b10, U16toBytes(settings.gravityHeatReduction));

  //-----------------------------------------------------------------
  // Update boss doors.
  //-----------------------------------------------------------------

  const getDoorUpdate = (a, b) => {
    const x = doors.find((d) => d.door == a);
    const y = doors.find((d) => d.door == b);

    if (x == undefined) {
      throw new Error(`Could not find: ${a}`);
    }

    if (y == undefined) {
      throw new Error(`Could not find: ${b}`);
    }
    if (x.from == y.to) {
      return [
        { door: x.address, dest: y.aligned },
        { door: y.address, dest: x.aligned },
      ];
    }
    return [
      { door: x.address, dest: y.misaligned },
      { door: y.address, dest: x.misaligned },
    ];
  };

  let bossUpdates = [];
  graph
    .filter((e) => isBossEdge(e))
    .forEach((b) => {
      if (settings.bossMode == BossMode.ShuffleStandard) {
        bossUpdates.concat(getDoorUpdate(b.from.name, b.to.name));
        console.debug(`from: ${b.from.name} to: ${b.to.name}`);
      } else if (settings.bossMode == BossMode.ShuffleDash) {
        console.debug(`from: ${b.from.name} to: ${b.to.name}`);
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
  console.log(bossUpdates.length);
  bossUpdates.forEach((p) => {
    encodeBytes(seedPatch, p.door, U16toBytes(p.dest & 0xffff));
  });

  graph
    .filter((e) => isAreaEdge(e))
    .forEach((a) => {
      const areaUpdates = getDoorUpdate(a.from.name, a.to.name);
      console.debug(`from: ${a.from.name} to: ${a.to.name}`);
      areaUpdates.forEach((p) => {
        encodeBytes(seedPatch, p.door, U16toBytes(p.dest & 0xffff));
      });
    });

  //-----------------------------------------------------------------
  // Other options.
  //-----------------------------------------------------------------

  if (options != null) {
    encodeBytes(seedPatch, 0x2f8b0c, U16toBytes(options.DisableFanfare));
  }

  //-----------------------------------------------------------------
  // Encode seed flags from the website.
  //-----------------------------------------------------------------

  encodeBytes(
    seedPatch,
    0x2f8b00,
    paramsToBytes(seed, mapLayout, itemPoolParams, settings, options)
  );

  return seedPatch;
};

export const getFileName = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  options
) => {
  const flags = paramsToString(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    options
  );
  return `DASH_${settings.preset}_${flags}.sfc`;
};

export const getItemNodes = (graph) => {
  const nodes = getLocations().map((l) => {
    const vertex = graph.find((e) => e.from.name == mapLocation(l.name)).from;
    const node = {
      location: l,
      item: vertex.item,
    };

    // Space Jump?
    if (node.location.address == 0x7c7a7) {
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
    if (node.location.address == 0x78aca) {
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
    if (node.location.address == 0x79108) {
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

export const getPresetOptions = (preset) => {
  if (preset == "standard_mm" || preset == "std_mm") {
    return {
      mode: "sm",
      options: {},
    };
  } else if (preset == "standard_full" || preset == "std_full") {
    return {
      mode: "sf",
      options: {},
    };
  } else if (preset == "mm" || preset == "recall_mm") {
    return {
      mode: "rm",
      options: {},
    };
  } else if (preset == "full" || preset == "recall_full") {
    return {
      mode: "rf",
      options: {},
    };
  }
};

export const generateFromPreset = (name, seedNumber) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const seed =
    seedNumber == undefined || seedNumber == 0
      ? new DotNetRandom(timestamp).NextInRange(1, 1000000)
      : seedNumber;
  let gameMode, preset;

  if (name == "standard_mm" || name == "std_mm") {
    gameMode = game_modes.find((mode) => mode.name == "sm");
    preset = presets.ClassicMM;
  } else if (name == "standard_full" || name == "std_full") {
    gameMode = game_modes.find((mode) => mode.name == "sf");
    preset = presets.ClassicFull;
  } else if (name == "mm" || name == "recall_mm") {
    gameMode = game_modes.find((mode) => mode.name == "rm");
    preset = presets.RecallMM;
  } else if (name == "full" || name == "recall_full") {
    gameMode = game_modes.find((mode) => mode.name == "rf");
    preset = presets.RecallFull;
  } else {
    console.log("UNKNOWN PRESET: " + name);
    return ["", null, ""];
  }

  // Place the items.
  const { mapLayout, itemPoolParams, settings } = preset;
  const graph = loadGraph(
    seed,
    mapLayout,
    itemPoolParams.majorDistribution.mode
  );
  graphFill(seed, graph, itemPoolParams, settings);

  const seedPatch = generateSeedPatch(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    graph,
    null
  );
  const fileName = getFileName(seed, mapLayout, itemPoolParams, settings, null);

  return [gameMode.patch, seedPatch, fileName];
};
