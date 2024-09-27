import { getLocations } from "../data";
import DOORS from "../data/doors";
import { PortalMapping } from "../lib/graph/data/portals";
import { loadGraph } from "../lib/graph/init";
import { bytesToParams } from "../lib/params";
import { majorItem, minorItem } from "../lib/items";
import { getArea } from "../lib/locations";
import { TABLE_FLAGS } from "../data/interface";

export const isDASHSeed = (rom: Uint8Array): boolean => {
  const gameHeader = rom.subarray(0x007fc0, 0x007fc0 + 21);
  const textDecoder = new TextDecoder("utf-8");
  return textDecoder.decode(gameHeader).startsWith("Super Metroid DASH");
};

export const readParams = (bytes: Uint8Array) => {
  const offset = TABLE_FLAGS.SeedFlags;
  const paramBytes = bytes.subarray(offset, offset + TABLE_FLAGS.SeedFlagsSize);
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

export const readGraph = (rom: Uint8Array) => {
  if (!isDASHSeed(rom)) {
    return [];
  }

  const { seed, settings, options } = readParams(rom);
  const portalMappings = readPortals(rom);
  const graph = loadGraph(seed, 1, settings.mapLayout,
    settings.majorDistribution, settings.randomizeAreas,
    options.RelaxedLogic, settings.bossMode, portalMappings);

  getLocations().forEach(l => {
    const node = graph.find(e => e.from.name == l.name && getArea(e.from.area) == l.area)?.from as any;
    if (node == undefined) {
      return;
    }
    const itemCode = l.GetItemCode(rom);
    if (node.type == "major") {
      node.item = majorItem(itemCode)
    } else {
      node.item = minorItem(itemCode)
    }
  });

  return graph;
}