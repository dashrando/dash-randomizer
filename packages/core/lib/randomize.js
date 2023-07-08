import BpsPatch from "./bps-patch";
import { getFileName, generateSeedPatch, getItemNodes } from "./sm-rando";
import { patchRom } from "../helpers/patcher";
import { loadGraph } from "./graph/init";
import { graphFill } from "./graph/fill";
import { MapLayout } from "./graph/params";

const getBasePatch = (mapLayout, area) => {
  if (mapLayout == MapLayout.Recall) {
    return area ? "dash_recall_area.bps" : "dash_recall.bps";
  }
  return area ? "dash_standard_area.bps" : "dash_standard.bps";
};

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
    itemPoolParams.majorDistribution.mode,
    settings.randomizeAreas,
    settings.randomizeBosses
  );
  const bosses = graph
    .filter(
      (n) =>
        n.from.name.startsWith("Door_") &&
        n.from.name.endsWith("Boss") &&
        n.to.name.startsWith("Exit_")
    )
    .map((n) => {
      return {
        door: n.from.name,
        boss: n.to.name,
      };
    });
  graphFill(seed, graph, itemPoolParams, settings, true);

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(mapLayout, settings.randomizeAreas);
  const basePatch = await BpsPatch.Load(`/patches/${patch}`);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const nodes = getItemNodes(graph);
  const seedPatch = generateSeedPatch(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    nodes,
    options,
    bosses
  );

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(seed, mapLayout, itemPoolParams, settings, options),
  };
}

export default RandomizeRom;
