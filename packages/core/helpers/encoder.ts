import { bytesToParams, Params, paramsToBytes } from "../lib/params";
import { Graph, loadGraph } from "../lib/graph/init";
import {
  getAreaTransitions,
  getBossTransitions,
  getItemLocations,
} from "../lib/graph/utils";
import { getAreaPortals } from "../lib/graph/data/portals";
import { Item } from "../lib/items";

const SEED_ENCODING_VERSION = 0;
const ENCODED_SEED_SIZE = 153;

const BOSS_NAMES = ["Kraid", "Phantoon", "Draygon", "Ridley"];
const BOSS_AREAS = ["KraidsLair", "WreckedShip", "EastMaridia", "LowerNorfair"];

export const decodeSeed = (
  bytes: Uint8Array
): { params: Params; graph: Graph } => {
  const params: Params = bytesToParams(bytes.slice(1));
  const { seed, settings, options } = params;
  //TODO: Read area/boss portals
  const graph: Graph = loadGraph(
    seed,
    0,
    settings.mapLayout,
    settings.majorDistribution,
    settings.randomizeAreas,
    options.RelaxedLogic,
    settings.bossMode
  );
  //TODO: Place items
  return {
    params,
    graph,
  };
};

export const encodeSeed = (params: Params, graph: Graph) => {
  const bytes = new Uint8Array(ENCODED_SEED_SIZE);
  bytes[0] = SEED_ENCODING_VERSION;

  const encodedParams = paramsToBytes(
    params.seed,
    params.settings,
    params.options
  );
  bytes.set(encodedParams, 1);

  let pos = encodedParams.length + 1;
  const areaPortals = getAreaPortals();

  const portals = getAreaTransitions(graph);
  areaPortals.forEach((p) => {
    const [_, to] = portals.find(
      ([m, _]) => m.name === p.name && m.area === p.area
    );
    bytes[pos++] = areaPortals.findIndex(
      (n) => n.name === to.name && n.area === to.area
    );
  });

  const bosses = getBossTransitions(graph);
  BOSS_AREAS.forEach((a, i) => {
    const boss = bosses.find(([_, p]) => p.area === a);
    const from_area = i;
    const to_area = BOSS_AREAS.findIndex((q) => q === boss[0].area);
    const boss_idx = BOSS_NAMES.findIndex((q) => boss[0].name.endsWith(q));
    bytes[pos++] = (from_area << 6) | (to_area << 2) | boss_idx;
  });

  const itemTypes = Object.values(Item);
  const itemLocations = getItemLocations(graph).sort(
    (a, b) => a.location.address - b.location.address
  );
  itemLocations.forEach((p) => {
    const code = p.item?.type;
    if (code === undefined) {
      bytes[pos++] = 0;
    } else {
      bytes[pos++] = itemTypes.findIndex((q) => q === code) + 1;
    }
  });
  //console.log(pos)

  return bytes;
};

export const toSafeString = (bytes: Uint8Array) => {
  return Buffer.from(bytes)
    .toString("base64")
    .replaceAll("/", "_")
    .replaceAll("+", "-")
    .replace(/=*$/, "");
};
