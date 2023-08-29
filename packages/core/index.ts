import { generateFromPreset, getItemNodes } from "./lib/sm-rando";
import RandomizeRom from "./lib/randomize";
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";
import { patchRom } from "./helpers/patcher";
import { Logic as RecallLogic } from "./lib/modes/modeRecall";
import { Logic as StandardLogic } from "./lib/modes/modeStandard";
import { findPreset, getPreset } from "./lib/presets";
import { Item } from "./lib/items";
import {
  bytesToParams,
  paramsToString,
  stringToParams,
} from "./lib/graph/params";

export const Logic = {
  recall: RecallLogic,
  standard: StandardLogic,
};

export * from './lib/signature'
export * as vanilla from './lib/vanilla'

export {
  gameModes,
  generateFromPreset,
  getPreset,
  findPreset,
  RandomizeRom,
  BpsPatch,
  patchRom,
  bytesToParams,
  paramsToString,
  stringToParams,
  getItemNodes,
  Item,
};
