import BpsPatch from "./bps-patch";
import { getBasePatch, getFileName, generateSeedPatch } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import { patchRom } from "../helpers/patcher";
import { FastMode, Options, Settings } from "./params";
import { Graph } from "./graph/init";
import { encodeSeed } from "../helpers/encoder";
import IpsPatch from "./ips-patch";

export type Config = {
  onUpdate?: any
  onSuccess?: any
  vanillaBytes: Uint8Array
  presetName: string
  seedKey?: string
}

async function RandomizeRom(
  seed: number = 0,
  settings: Settings,
  opts: Options,
  config: Config,
  race: boolean = false,
  permaGraph: Graph = []
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Process options with defaults.
  const defaultOptions: Options = {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false,
    BossesKnown: false,
    fastMode: FastMode.Disabled
  };
  const options: Options = { ...defaultOptions, ...opts };

  // Place the items.
  const graph =
    permaGraph.length > 0 ? permaGraph : generateSeed(seed, settings, options);

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(settings);
  const basePatch: any = await BpsPatch.Load(`/patches/${patch}`);

  let fastPatch: IpsPatch|null = null;
  if (options.fastMode == FastMode.QoL) {
    fastPatch = await IpsPatch.Load(`/patches/qol.ips`);
  } else if (options.fastMode == FastMode.DangerouslyFast) {
    fastPatch = await IpsPatch.Load(`/patches/fast_mode.ips`);
  }

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch = generateSeedPatch(
    seed,
    settings,
    graph,
    options,
    race,
    config.seedKey ? config.seedKey : ''
  );

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, fastPatch, seedPatch),
    name: getFileName({ seed, settings, options }, graph,
      config.presetName, config.seedKey),
    hash: encodeSeed({ seed, settings, options }, graph)
  };
}

export default RandomizeRom;
