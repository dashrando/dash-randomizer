import { getLocations } from "../data";
import DOORS from "../data/doors";
import { PortalMapping } from "../lib/graph/data/portals";
import { loadGraph } from "../lib/graph/init";
import { bytesToParams, MajorDistributionMode } from "../lib/params";
import { Item, majorItem, minorItem } from "../lib/items";
import { getArea } from "../lib/locations";
import { TABLE_FLAGS } from "../data/interface";
import { encodeSeed } from "./encoder";

export const isDASHSeed = (rom: Uint8Array): boolean => {
  const gameHeader = rom.subarray(0x007fc0, 0x007fc0 + 21);
  const textDecoder = new TextDecoder("utf-8");
  return textDecoder.decode(gameHeader).startsWith("Super Metroid DASH");
};

export const readParams = (bytes: Uint8Array) => {
  const offset = TABLE_FLAGS.SeedFlags;
  const paramBytes = bytes.subarray(offset, offset + TABLE_FLAGS.SeedFlagsSize);
  if (
    paramBytes[0] == 0xee &&
    paramBytes[1] == 0xee &&
    paramBytes[2] == 0xee &&
    paramBytes[3] == 0xee
  ) {
    return undefined;
  }
  return bytesToParams(paramBytes);
}

export const readPortals = (bytes: Uint8Array): PortalMapping[] => {
  const portalMappings: PortalMapping[] = [];
  DOORS.forEach((d) => {
    if (d.address == undefined || d.door.startsWith("Exit_")) {
      return;
    }
    const vector = bytes[d.address+1] << 8 | bytes[d.address];
    const dest = DOORS.find((d) => (d.vector & 0xFFFF) == vector);
    if (dest != undefined) {
      portalMappings.push([
        { name: d.door, area: d.area },
        { name: dest.door, area: dest.area }
      ])
    }
  })
  return portalMappings;
}

export const readRom = (rom: Uint8Array) => {
  if (!isDASHSeed(rom)) {
    return {}
  }

  const params = readParams(rom);
  if (params === undefined) {
    return {}
  }
  const { seed, settings, options } = params;
  const portals = readPortals(rom);
  const graph = loadGraph(seed, 1, settings.mapLayout,
    settings.majorDistribution, settings.randomizeAreas,
    options.RelaxedLogic, settings.bossMode, portals);

  getLocations().forEach(l => {
    const node = graph.find(e => e.from.name == l.name && getArea(e.from.area) == l.area)?.from as any;
    if (node == undefined) {
      return;
    }
    const itemCode = l.GetItemCode(rom);
    const isMajor =
      settings.majorDistribution == MajorDistributionMode.Full
        ? itemCode > 0xc000 &&
          itemCode != Item.Missile &&
          itemCode != Item.Super &&
          itemCode != Item.PowerBomb
        : node.type == "major";

    if (isMajor) {
      node.item = majorItem(itemCode)
    } else {
      node.item = minorItem(itemCode)
    }
  });

  return {
    graph,
    portals,
    params
  };
}

export const readRomAsString = (rom: Uint8Array) => {
  const { params, graph } = readRom(rom);
  if (params === undefined || graph === undefined) {
    return '';
  }
  return encodeSeed(params, graph);
}

export const readSeedKey = (rom: Uint8Array) => {
  const offset = TABLE_FLAGS.SeedKey;
  const keyBytes = rom.subarray(offset, offset + TABLE_FLAGS.SeedKeySize);
  const size = keyBytes[0] as number;

  // No data in first byte? No seed key
  if (size === 0 || size === 255) {
    return {
      race: false,
      key: ''
    }
  }

  // Left-most bit is set if the key is for a race seed
  const race = size & 0x80 ? true : false
  const encoded = keyBytes.slice(1);
  return {
    race,
    key: Buffer.from(encoded).toString("base64").slice(0, size & 0x7f)
  }
}