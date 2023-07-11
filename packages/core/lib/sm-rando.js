import DotNetRandom from "./dotnet-random";
import game_modes from "../data/modes";
import { Area, AreaCounts, getLocations } from "./locations";
import { Item } from "./items";
import { mapLocation } from "./graph/util";
import { loadGraph } from "./graph/init";
import { graphFill } from "./graph/fill";
import { presets } from "..";
import doors from "../data/doors";
import { paramsToBytes, paramsToString } from "./graph/params";

export const generateSeedPatch = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  nodes,
  options,
  bosses
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

  bosses.forEach((b) => {
    const bossUpdates = getDoorUpdate(b.door, b.boss);
    console.debug(b);

    bossUpdates.forEach((p) => {
      encodeBytes(seedPatch, p.door, U16toBytes(p.dest & 0xffff));
    });
  });
  console.debug("shuffled bosses:", bosses.length / 2);

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
  return getLocations().map((l) => {
    const vertex = graph.find((e) => e.from.name == mapLocation(l.name)).from;
    return {
      location: l,
      item: vertex.item,
    };
  });
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

  const nodes = getItemNodes(graph);
  const seedPatch = generateSeedPatch(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    nodes,
    null
  );
  const fileName = getFileName(seed, mapLayout, itemPoolParams, settings, null);

  return [gameMode.patch, seedPatch, fileName];
};
