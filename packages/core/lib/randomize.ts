import BpsPatch from "./bps-patch";
import { getBasePatch, getFileName, generateSeedPatch } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import { patchRom } from "../helpers/patcher";
import { Options, Settings } from "./graph/params";

export type Config = {
  onUpdate?: any
  onSuccess?: any
  vanillaBytes: Uint8Array
  presetName: string
}

async function RandomizeRom(
  seed: number = 0,
  settings: Settings,
  opts: Options,
  config: Config,
  race: boolean = false
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Process options with defaults.
  const defaultOptions: Options = {
    DisableFanfare: false,
    RelaxedLogic: false,
  };
  const options: Options = { ...defaultOptions, ...opts };

  // Place the items.
  const graph = generateSeed(seed, settings, options);

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(settings);
  const basePatch: any = await BpsPatch.Load(`/patches/${patch}`);

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch = generateSeedPatch(
    seed, settings, graph, options, race);

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(config.presetName, seed, settings, options),
  };
}

export default RandomizeRom;
