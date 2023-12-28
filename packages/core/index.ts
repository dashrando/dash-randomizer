import RandomizeRom from "./lib/randomize";
import ProtectRom from "./lib/protect";
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";

export const computeCRC32 = BpsPatch.CRC32;

export * from "./lib/signature";
export * as vanilla from "./lib/vanilla";
export { patchRom } from "./helpers/patcher";
export { findPreset, getPreset, getAllPresets } from "./lib/presets";
export { Item } from "./lib/items";
export { generateFromPreset, getItemNodes, getSeedNumber } from "./lib/sm-rando";
export { getItemProgression } from "./lib/graph/solver";
export {
  bytesToParams,
  paramsToString,
  stringToParams,
} from "./lib/graph/params";
export {
  loadGraph
} from "./lib/graph/init";
export {
  readParams,
  readPortals,
  readGraph
} from "./helpers/reader"

export { RandomizeRom, ProtectRom, gameModes, BpsPatch };
