import BpsPatch from "./bps-patch";
import { getBasePatch, getFileName, generateSeedPatch } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import { patchRom } from "../helpers/patcher";
import ProtectRom from "./protect";

export type Opts = {
  DisableFanfare: number
  RaceMode: number
}

export type Config = {
  onUpdate?: any
  onSuccess?: any
  vanillaBytes: Uint8Array
}

export type Settings = {
  mapLayout: number,
  majorDistribution: number,
  minorDistribution: number,
  extraItems: number[],
  beamMode: number
  bossMode: number
  gravityHeatReduction: number
  preset: string
  randomizeAreas: boolean
  suitMode: number
}

async function RandomizeRom(
  seed: number = 0,
  settings: Settings,
  opts: Opts = {
    DisableFanfare: 0,
    RaceMode: 0
  },
  config: Config
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Place the items.
  const graph = generateSeed(seed, settings);

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(settings);
  const basePatch: any = await BpsPatch.Load(`/patches/${patch}`);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
    RaceMode: 0
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch: any = generateSeedPatch(
    seed, settings, graph, options);

  // Create the rom by patching the vanilla rom.
  const data = patchRom(config.vanillaBytes, basePatch, seedPatch);
  if (options.RaceMode && data != null) {
    ProtectRom(seed, data);
  }

  return {
    data,
    name: getFileName(seed, settings, options),
  };
}

export default RandomizeRom;
