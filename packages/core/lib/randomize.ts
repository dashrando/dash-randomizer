import BpsPatch from "./bps-patch";
import { getBasePatch, getFileName, generateSeedPatch } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import { patchRom } from "../helpers/patcher";

export type Config = {
  onUpdate?: any
  onSuccess?: any
  vanillaBytes: Uint8Array
}

async function RandomizeRom(
  seed: number = 0,
  mapLayout,
  itemPoolParams,
  settings,
  opts = {},
  config: Config
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Place the items.
  const graph = generateSeed(seed, mapLayout, itemPoolParams, settings);

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(mapLayout, settings.randomizeAreas);
  const basePatch: any = await BpsPatch.Load(`/patches/${patch}`);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch: any = generateSeedPatch(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    graph,
    options
  );

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(seed, mapLayout, itemPoolParams, settings, options),
  };
}

export default RandomizeRom;
