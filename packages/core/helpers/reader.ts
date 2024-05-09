import { getLocations } from "../data";
import DOORS from "../data/doors";
import { PortalMapping } from "../lib/graph/data/portals";
import { loadGraph } from "../lib/graph/init";
import { bytesToParams } from "../lib/graph/params";
import { majorItem, minorItem } from "../lib/items";
import { getArea } from "../lib/locations";

export const readParams = (bytes: Uint8Array) => {
  const offset = 0x2f8b00
  const paramBytes = bytes.subarray(offset, offset + 6)
  return bytesToParams(paramBytes)
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
      //console.log(d.door,d.area,"to",dest.door,dest.area)
      portalMappings.push([
        { name: d.door, area: d.area },
        { name: dest.door, area: dest.area }
      ])
    }
  })
  return portalMappings;
}

export const readGraph = (rom: Uint8Array) => {
  const header = rom.subarray(0x007FC0,0x007FC0+21);
  const textDecoder = new TextDecoder('utf-8');
  const headerString = textDecoder.decode(header);
  if (!headerString.startsWith("Super Metroid DASH")) {
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
      node.item = majorItem(0x0, itemCode)
    } else {
      node.item = minorItem(0x0, itemCode)
    }
  });
  return graph;
}