import {
  bytesToParams,
  ENCODED_PARAMS_SIZE,
  Params,
  paramsToBytes,
} from "../lib/params";
import { Graph, loadGraph } from "../lib/graph/init";
import {
  getAreaTransitions,
  getBossTransitions,
  getItemLocations,
} from "../lib/graph/utils";
import {
  getAreaPortals,
  Portal,
  PortalMapping,
} from "../lib/graph/data/portals";
import { getArea, getLocations } from "../lib/locations";
import { Item, ItemType, majorItem, minorItem } from "../lib/items";

const SEED_ENCODING_VERSION = 0;
const AREA_REF_INDEX = 1 + ENCODED_PARAMS_SIZE;
const BOSS_REF_INDEX = AREA_REF_INDEX + 32;
const ITEM_REF_INDEX = BOSS_REF_INDEX + 4;
const ENCODED_SEED_SIZE = 153;

const BOSS_NAMES = ["Kraid", "Phantoon", "Draygon", "Ridley"];
const BOSS_AREAS = ["KraidsLair", "WreckedShip", "EastMaridia", "LowerNorfair"];

//-----------------------------------------------------------------
// Extracts seed data from a byte array...
//-----------------------------------------------------------------

export const decodeSeed = (
  bytes: Uint8Array
): { params: Params; graph: Graph } => {
  const version = bytes[0];
  if (version !== 0) {
    throw new Error(`decodeSeed: Unknown version ${version}`);
  }

  const params: Params = bytesToParams(bytes.slice(1, 1 + ENCODED_PARAMS_SIZE));
  const { seed, settings, options } = params;
  const mappings = [...decodeAreaPortals(bytes), ...decodeBossPortals(bytes)];

  const graph: Graph = loadGraph(
    seed,
    0,
    settings.mapLayout,
    settings.majorDistribution,
    settings.randomizeAreas,
    options.RelaxedLogic,
    settings.bossMode,
    mappings
  );

  decodeItemLocations(bytes).forEach((v) => {
    if (v.item === null) {
      return;
    }
    const itemNode = graph.find(
      (p) =>
        p.from.name === v.location.name &&
        getArea(p.from.area) === v.location.area
    );
    if (itemNode === undefined) {
      throw new Error(
        `decodeSeed: Could not find vertex ${v.location.name} in ${v.location.area}`
      );
    }
    itemNode.from.item = v.item;
  });

  return {
    params,
    graph,
  };
};

export const decodeAreaPortals = (bytes: Uint8Array): PortalMapping[] => {
  const areaPortals = getAreaPortals();
  const mappings: PortalMapping[] = [];

  for (let i = 0; i < areaPortals.length; i++) {
    const from = areaPortals.at(i) as Portal;
    const to = areaPortals.at(bytes[i + AREA_REF_INDEX]) as Portal;

    // We only need to map portals once so ignore the reverse mapping
    if (0 <= mappings.findIndex((m) => m[0] == to && m[1] == from)) {
      continue;
    }
    mappings.push([from, to]);
  }

  return mappings;
};

export const decodeBossPortals = (bytes: Uint8Array): PortalMapping[] => {
  return BOSS_AREAS.map((bossArea, i) => {
    const bossByte = bytes[i + BOSS_REF_INDEX];
    const toAreaIndex = (bossByte >> 2) & 0x3;
    const toBossIndex = bossByte & 0x3;
    return [
      {
        name: `Door_${BOSS_NAMES[i]}Boss`,
        area: bossArea
      },
      {
        name: `Exit_${BOSS_NAMES[toBossIndex]}`,
        area: BOSS_AREAS[toAreaIndex],
      },
    ];
  });
};

export const decodeItemLocations = (bytes: Uint8Array) => {
  const itemTypes = Object.values(Item);
  const locations = getLocations().sort((a, b) => a.address - b.address);
  return locations.map((location, i) => {
    const itemByte = bytes[i + ITEM_REF_INDEX];
    let item = null;
    if (itemByte !== 0) {
      if (itemByte & 0x80) {
        const code = itemTypes[(0x7f & itemByte) - 1] as number;
        item = majorItem(code);
      } else {
        item = minorItem(itemTypes[itemByte - 1]);
      }
    }
    return {
      location,
      item,
    };
  });
};

//-----------------------------------------------------------------
// Encodes all seed data into a byte array which can be used
// to reconstruct an exact copy of the seed
//-----------------------------------------------------------------

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
    const mapping = portals.find(
      ([m, _]) => m.name === p.name && m.area === p.area
    );
    if (mapping === undefined) {
      throw new Error(`encodeSeed: Failed to find portal ${p.name}`)
    }
    bytes[pos++] = areaPortals.findIndex(
      (n) => n.name === mapping[1].name && n.area === mapping[1].area
    );
  });

  const bosses = getBossTransitions(graph);
  BOSS_AREAS.forEach((a, i) => {
    const boss = bosses.find(([_, p]) => p.area === a);
    if (boss === undefined) {
      throw new Error(`encodeSeed: Failed to find boss in ${a}`)
    }
    const from_area = i;
    const to_area = BOSS_AREAS.findIndex((q) => q === boss[0].area);
    const boss_idx = BOSS_NAMES.findIndex((q) => boss[0].name.endsWith(q));
    //TODO: Do we actually need to encode the "from" area? Maybe not
    bytes[pos++] = (from_area << 6) | (to_area << 2) | boss_idx;
  });

  const itemTypes = Object.values(Item);
  const itemLocations = getItemLocations(graph, true);

  itemLocations.forEach((p) => {
    if (p.item === null) {
      bytes[pos++] = 0;
      return;
    }
    const item = p.item as ItemType;
    const itemIndex = itemTypes.findIndex((q) => q === item.type) + 1;
    bytes[pos++] = (p.item.isMajor ? 0x80 : 0x00) | itemIndex;
  });

  return bytes;
};

export const toSafeString = (bytes: Uint8Array) => {
  return Buffer.from(bytes)
    .toString("base64")
    .replaceAll("/", "_")
    .replaceAll("+", "-")
    .replace(/=*$/, "");
};
