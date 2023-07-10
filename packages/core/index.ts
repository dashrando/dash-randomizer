import {
  generateFromPreset,
  getPresetOptions,
  getItemNodes,
} from "./lib/sm-rando";
import RandomizeRom from "./lib/randomize";
import vanillaROM, { clearVanillaRom, getVanilla } from "./lib/vanilla/storage";
import inputVanillaRom from "./lib/vanilla/input";
import { getSignature, isHeadered, isVerified } from "./lib/vanilla/verify";
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";
import { patchRom } from "./helpers/patcher";
import { Logic as RecallLogic } from "./lib/modes/modeRecall";
import { Logic as StandardLogic } from "./lib/modes/modeStandard";
import fetchSignature, { formatMonoSignature } from "./lib/signature";
import {
  Preset_Classic_MM,
  Preset_Classic_Full,
} from "./lib/graph/data/classic/preset";
import {
  Preset_Recall_MM,
  Preset_Recall_Full,
} from "./lib/graph/data/recall/preset";
import { Item } from "./lib/items";
import { paramsToString, stringToParams } from "./lib/graph/params";

const vanilla = {
  vanillaROM,
  clearVanillaRom,
  getVanilla,
  inputVanillaRom,
  isHeadered,
  isVerified,
  getSignature,
};

export const Logic = {
  recall: RecallLogic,
  standard: StandardLogic,
};

const presets = {
  ClassicMM: Preset_Classic_MM,
  ClassicFull: Preset_Classic_Full,
  RecallMM: Preset_Recall_MM,
  RecallFull: Preset_Recall_Full,
};

export {
  gameModes,
  generateFromPreset,
  getPresetOptions,
  RandomizeRom,
  vanilla,
  BpsPatch,
  patchRom,
  paramsToString,
  stringToParams,
  getSignature,
  fetchSignature,
  formatMonoSignature,
  getItemNodes,
  presets,
  Item,
};
