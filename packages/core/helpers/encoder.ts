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
import { base64ToSafe, safeToBase64 } from "./converters";

const SEED_ENCODING_VERSION = 0;

const BOSS_NAMES = ["Kraid", "Phantoon", "Draygon", "Ridley"];
const BOSS_AREAS = ["KraidsLair", "WreckedShip", "EastMaridia", "LowerNorfair"];

//-----------------------------------------------------------------
// Extracts seed data from a byte array...
//-----------------------------------------------------------------


const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

const toChar = (val: number) => {
  if (val > 63) {
    throw new Error("too big")
  }
  return b64.charAt(val)
}

const fromChar = (val: string) => {
  const idx = b64.indexOf(val)
  if (idx < 0) {
    throw new Error("too small")
  }
  return idx
}

const bossItemLocations = [
  0x78aca, // K@K
  0,
  0x7EC12, // D@K
  0x7ED83, // R@K
  0x7E9FA, // K@P
  0,
  0x7EC74, // D@P
  0x7EDB4, // R@P
  0x7EA2B, // K@D
  0,
  0x7c7a7, // D@D
  0x7EDE5, // R@D
  0x7E9C9, // K@R
  0,
  0x7EC43, // D@R
  0x79108, // R@R
]

export const decodeSeed = (input: string) => {
  const encoded = safeToBase64(input)
  const version = fromChar(encoded[0])
  if (version !== SEED_ENCODING_VERSION) {
    throw new Error(`decodeSeed: Unknown version ${version}`);
  }

  const bytes = Buffer.from(encoded.substring(1, 13), "base64");
  const params: Params = bytesToParams(bytes);
  const { seed, settings, options } = params;

  let mappings: PortalMapping[] = [];
  const ignore = [...bossItemLocations];
  let pos = ENCODED_PARAMS_SIZE;
  BOSS_AREAS.map((bossArea, i) => {
    const bossByte = i % 2 === 0 ? bytes[pos] : bytes[pos++];
    const word = (i % 2 === 0 ? bossByte : (bossByte >> 4)) & 0xF
    ignore[word] = 0;
    const toAreaIndex = (word >> 2) & 0x3;
    const toBossIndex = word & 0x3;
    mappings.push([
      {
        name: `Door_${BOSS_NAMES[i]}Boss`,
        area: bossArea
      },
      {
        name: `Exit_${BOSS_NAMES[toBossIndex]}`,
        area: BOSS_AREAS[toAreaIndex],
      },
    ]);
  });
  
  decodeAreaPortals(encoded).forEach(p => mappings.push(p))

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

  const itemTypes = Object.values(Item);
  const locations = getLocations().sort((a, b) => a.address - b.address);
  pos = 29;
  locations.forEach((location) => {
    if (ignore.includes(location.address)) {
      return;
    }
    const itemByte = fromChar(encoded[pos++]);
    let item = null;
    if (itemByte === 0) {
      return
    }

    if (itemByte & 0x20) {
      const code = itemTypes[(0x1f & itemByte) - 1] as number;
      item = majorItem(code);
    } else {
      item = minorItem(itemTypes[itemByte - 1]);
    }
      
    const itemNode = graph.find(
      (p) =>
        p.from.name === location.name &&
        getArea(p.from.area) === location.area
    );
    if (itemNode === undefined) {
      throw new Error(
        `decodeSeed: Could not find vertex ${location.name} in ${location.area}`
      );
    }
    itemNode.from.item = item;
  });

  return {
    params,
    graph
  }
}

export const decodeAreaPortals = (encoded: string): PortalMapping[] => {
  const areaPortals = getAreaPortals();
  const mappings: PortalMapping[] = [];

  let pos = 13
  for (let i = 0; i < areaPortals.length; i++) {
    const from = areaPortals.at(i) as Portal;

    if (0 <= mappings.findIndex((m) => m[0] == from || m[1] == from)) {
      continue;
    }

    const to = areaPortals.at(fromChar(encoded[pos++])) as Portal;

    // We only need to map portals once so ignore the reverse mapping
    if (0 <= mappings.findIndex((m) => m[0] == to && m[1] == from)) {
      continue;
    }
    mappings.push([from, to]);
  }

  return mappings;
};

export const decodeBossPortals = (_: string): PortalMapping[] => {
  return []
}

//-----------------------------------------------------------------
// Encodes all seed data into string which can be used to
// reconstruct an exact copy of the seed
//-----------------------------------------------------------------

export const encodeSeed = (params: Params, graph: Graph) => {
  let encoded = toChar(SEED_ENCODING_VERSION)

  const bytes = new Uint8Array(ENCODED_PARAMS_SIZE + 2)
  const paramBytes = paramsToBytes(
    params.seed,
    params.settings,
    params.options
  );
  bytes.set(paramBytes);

  let pos = paramBytes.length
  const bosses = getBossTransitions(graph);
  const ignore = [...bossItemLocations]
  //bosses.forEach(p => console.log(p[0].name, '->', p[1].name))
  BOSS_AREAS.forEach((a, i) => {
    const boss = bosses.find(([_, p]) => p.area === a);
    if (boss === undefined) {
      throw new Error(`encodeSeed: Failed to find boss in ${a}`)
    }
    const to_area = BOSS_AREAS.findIndex((q) => q === boss[0].area);
    const boss_idx = BOSS_NAMES.findIndex((q) => boss[0].name.endsWith(q));
    const word = (to_area << 2) | boss_idx;
    ignore[word] = 0;
    if (i % 2 === 0) {
      bytes[pos] = word;
    } else {
      bytes[pos++] |= (word << 4) & 0xF0;
    }
  });

  encoded += Buffer.from(bytes).toString("base64")
  
  const areaPortals = getAreaPortals();
  const portals = getAreaTransitions(graph);
  //console.log('portals:',portals.length)
  //portals.forEach(p => console.log(p[0].name, '->', p[1].name))
  areaPortals.forEach((p, i) => {
    const mapping = portals.find(
      ([m, _]) => m.name === p.name && m.area === p.area
    );
    if (mapping === undefined) {
      throw new Error(`encodeSeed: Failed to find portal ${p.name}`)
    }
    const idx = areaPortals.findIndex(
      (n) => n.name === mapping[1].name && n.area === mapping[1].area
    )
    if (idx < i) {
      return;
    }
    encoded += toChar(idx);
  });

  const itemTypes = Object.values(Item);
  const itemLocations = getItemLocations(graph, true);

  itemLocations.forEach((p) => {
    if (ignore.includes(p.location.address)) {
      return;
    }
    if (!p.item) {
      return;
    }
    const item = p.item as ItemType;
    const itemIndex = itemTypes.findIndex((q) => q === item.type) + 1;
    encoded += toChar((p.item.isMajor ? 0x20 : 0x00) | itemIndex);
  });

  return base64ToSafe(encoded);
};
