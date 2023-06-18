import BpsPatch from "./bps-patch";
import { getFileName, generateSeedPatch, getItemNodes } from "./sm-rando";
import { patchRom } from "../helpers/patcher";
import { loadGraph } from "./graph/init";
import { graphFill } from "./graph/fill";
import { MapLayout } from "./graph/params";

async function RandomizeRom(
  seed = 0,
  mapLayout,
  itemPoolParams,
  settings,
  opts = {},
  config = {}
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Place the items.
  const graph = loadGraph(
    seed,
    mapLayout,
    itemPoolParams.majorDistribution.mode
  );
  graphFill(seed, graph, itemPoolParams, settings, true);

  // Load the base patch associated with the map layout.
  const patch =
    mapLayout == MapLayout.Recall ? "dash_working.bps" : "dash_std.bps";
  const basePatch = await BpsPatch.Load(`patches/${patch}`);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const nodes = getItemNodes(graph);
  const seedPatch = generateSeedPatch(seed, settings, nodes, options);

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(seed, mapLayout, itemPoolParams, settings, options),
  };
}

export default RandomizeRom;
