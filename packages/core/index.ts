import { generateFromPreset, getItemNodes } from "./lib/sm-rando";
import RandomizeRom from "./lib/randomize";
import * as vanilla from './lib/vanilla'
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";
import { patchRom } from "./helpers/patcher";
import { Logic as RecallLogic } from "./lib/modes/modeRecall";
import { Logic as StandardLogic } from "./lib/modes/modeStandard";
import fetchSignature, { formatMonoSignature } from "./lib/signature";
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

export {
  gameModes,
  generateFromPreset,
  getPreset,
  findPreset,
  RandomizeRom,
  vanilla,
  BpsPatch,
  patchRom,
  bytesToParams,
  paramsToString,
  stringToParams,
  fetchSignature,
  formatMonoSignature,
  getItemNodes,
  Item,
};
