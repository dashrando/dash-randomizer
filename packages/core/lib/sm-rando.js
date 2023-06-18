import DotNetRandom from "./dotnet-random";
import game_modes from "../data/modes";
import { Buffer } from "buffer";
import { Area, AreaCounts, getLocations } from "./locations";
import { Item } from "./items";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { mapLocation } from "./graph/util";
import { MapLayout } from "./graph/params";
import { ClassicPreset } from "./graph/data/classic/preset";
import { RecallPreset } from "./graph/data/recall/preset";
import { loadGraph } from "./graph/init";
import { graphFill } from "./graph/fill";

export const generateSeedPatch = (seed, settings, nodes, options) => {
  //-----------------------------------------------------------------
  // Utility functions.
  //-----------------------------------------------------------------

  const encodeRepeating = (patch, offset, length, bytes) => {
    patch.push([offset, length, bytes]);
  };

  const encodeBytes = (patch, offset, bytes) => {
    encodeRepeating(patch, offset, 1, bytes);
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

  let flags = 0x0; //TODO: fix me
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
  // Other options.
  //-----------------------------------------------------------------

  if (options != null) {
    encodeBytes(seedPatch, 0x2f8b0c, U16toBytes(options.DisableFanfare));
    //seedFlags |= options.DisableFanfare ? 0x0100 : 0x0000;
  }

  //-----------------------------------------------------------------
  // Encode seed flags from the website.
  //-----------------------------------------------------------------

  encodeBytes(seedPatch, 0x2f8b00, U32toBytes(flags));

  return seedPatch;
};

export const getFileName = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  options
) => {
  const prefix =
    mapLayout == MapLayout.Recall ? "DASH_Recall_" : "DASH_Classic";
  let fileName = prefix + seed.toString().padStart(6, "0");

  if (options != null) {
    if (options.DisableFanfare == 1) {
      fileName += "_no_fan";
    }
  }

  return fileName + ".sfc";
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

export const flagsToOptions = (flags) => {
  const bytes = Buffer.from(decompressFromEncodedURIComponent(flags), "base64");

  let options = {};
  const gameMode = game_modes.find((m) => m.mask == (bytes[0] & 0xff));
  options.DisableFanfare = bytes[1] & 0x01;

  return {
    mode: gameMode.name,
    options: options,
  };
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

export const optionsToFlags = (mode, options) => {
  const gameMode = game_modes.find((m) => m.name == mode);
  const bytes = new Uint8Array(12).fill(0);
  bytes[0] |= gameMode.mask;
  bytes[1] |= options.DisableFanfare == 1 ? 0x01 : 0x00;
  return compressToEncodedURIComponent(Buffer.from(bytes).toString("base64"));
};

export const generateFromPreset = (name, seedNumber) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const seed =
    seedNumber == undefined || seedNumber == 0
      ? new DotNetRandom(timestamp).NextInRange(1, 1000000)
      : seedNumber;
  let gameMode, restrictType, preset;

  if (name == "standard_mm" || name == "std_mm") {
    gameMode = game_modes.find((mode) => mode.name == "sm");
    preset = ClassicPreset;
    restrictType = true;
  } else if (name == "standard_full" || name == "std_full") {
    gameMode = game_modes.find((mode) => mode.name == "sf");
    preset = ClassicPreset;
    restrictType = false;
  } else if (name == "mm" || name == "recall_mm") {
    gameMode = game_modes.find((mode) => mode.name == "rm");
    preset = RecallPreset;
    restrictType = true;
  } else if (name == "full" || name == "recall_full") {
    gameMode = game_modes.find((mode) => mode.name == "rf");
    preset = RecallPreset;
    restrictType = false;
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
  graphFill(seed, graph, itemPoolParams, settings, restrictType);

  const nodes = getItemNodes(graph);
  const seedPatch = generateSeedPatch(seed, settings, nodes, null);
  const fileName = getFileName(seed, mapLayout, itemPoolParams, settings, null);

  return [gameMode.patch, seedPatch, fileName];
};
