import { getLocations, Location } from "../data";
import DOORS, { DoorTransition } from "../data/doors";
import { BOSS_DOORS, BOSS_ITEMS } from "../data/interface";
import { loadGraph } from "../lib/graph/init";
import { bytesToParams } from "../lib/graph/params";
import { majorItem, minorItem } from "../lib/items";

export const readParams = (bytes: Uint8Array) => {
  const offset = 0x2f8b00
  const paramBytes = bytes.subarray(offset, offset + 6)
  return bytesToParams(paramBytes)
}

export const readPortals = (bytes: Uint8Array) => {
  const getDestination = (rec: DoorTransition) => {
    let dest = bytes[rec.address+1] << 8 | bytes[rec.address];
    switch(0x10000+dest) {
      case BOSS_DOORS.DoorVectorToKraidInWreckedShip:
      case BOSS_DOORS.DoorVectorToKraidInMaridia:
      case BOSS_DOORS.DoorVectorToKraidInNorfair:
        dest = BOSS_DOORS.DoorVectorToKraidInBrinstar & 0xFFFF;
        break;
      case BOSS_DOORS.DoorVectorToPhantoonInBrinstar:
      case BOSS_DOORS.DoorVectorToPhantoonInMaridia:
      case BOSS_DOORS.DoorVectorToPhantoonInNorfair:
        dest = BOSS_DOORS.DoorVectorToPhantoonInWreckedShip & 0xFFFF;
        break;
      case BOSS_DOORS.DoorVectorToDraygonInBrinstar:
      case BOSS_DOORS.DoorVectorToDraygonInWreckedShip:
      case BOSS_DOORS.DoorVectorToDraygonInNorfair:
        dest = BOSS_DOORS.DoorVectorToDraygonInMaridia & 0xFFFF;
        break;
      case BOSS_DOORS.DoorVectorToRidleyInBrinstar:
      case BOSS_DOORS.DoorVectorToRidleyInWreckedShip:
      case BOSS_DOORS.DoorVectorToRidleyInMaridia:
        dest = BOSS_DOORS.DoorVectorToRidleyInNorfair & 0xFFFF;
        break;
    }
    return DOORS.find(d => (d.vector & 0xFFFF) == dest)?.door;
  }
  return DOORS.filter(d => !d.door.startsWith("Exit_")).map(d => [d.door, getDestination(d)])
}

const readItemCode = (rom: Uint8Array, loc: Location, area: string) => {
  let clone = loc.Clone();

  if (clone.address == BOSS_ITEMS.VariaSuitInBrinstar) {
    if (area == "WreckedShip") {
      clone.address = BOSS_ITEMS.VariaSuitInWreckedShip;
    } else if (area == "EastMaridia") {
      clone.address = BOSS_ITEMS.VariaSuitInMaridia;
    } else if (area == "LowerNorfair") {
      clone.address = BOSS_ITEMS.VariaSuitInNorfair;
    }
  } else if (clone.address == BOSS_ITEMS.SpaceJumpInMaridia) {
    if (area == "WreckedShip") {
      clone.address = BOSS_ITEMS.SpaceJumpInWreckedShip;
    } else if (area == "KraidsLair") {
      clone.address = BOSS_ITEMS.SpaceJumpInBrinstar;
    } else if (area == "LowerNorfair") {
      clone.address = BOSS_ITEMS.SpaceJumpInNorfair;
    }
  } else if (clone.address == BOSS_ITEMS.RidleyTankInNorfair) {
    if (area == "WreckedShip") {
      clone.address = BOSS_ITEMS.RidleyTankInWreckedShip;
    } else if (area == "KraidsLair") {
      clone.address = BOSS_ITEMS.RidleyTankInBrinstar;
    } else if (area == "EastMaridia") {
      clone.address = BOSS_ITEMS.RidleyTankInMaridia;
    }
  } 

  return clone.GetItemCode(rom);
}

export const readGraph = (rom: Uint8Array) => {
  const header = rom.subarray(0x007FC0,0x007FC0+21);
  const textDecoder = new TextDecoder('utf-8');
  const headerString = textDecoder.decode(header);
  if (!headerString.startsWith("Super Metroid DASH")) {
    return [];
  }

  const { seed, settings } = readParams(rom);
  const portals = readPortals(rom);
  const graph = loadGraph(seed, 1, settings.mapLayout,
    settings.majorDistribution, settings.randomizeAreas,
    settings.bossMode, portals as any);
  getLocations().forEach(l => {
    const node = graph.find(e => e.from.name == l.name)?.from as any;
    if (node == undefined) {
      return;
    }
    const itemCode = readItemCode(rom, l, node.area);
    if (node.type == "major") {
      node.item = majorItem(0x0, itemCode)
    } else {
      node.item = minorItem(0x0, itemCode)
    }
  });
  return graph;
}