import {
  generateFromPreset,
  getPresetOptions,
  flagsToOptions,
  optionsToFlags,
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
import fetchSignature from "./lib/signature";
import { ClassicPreset } from "./lib/graph/data/classic/preset";
import { RecallPreset } from "./lib/graph/data/recall/preset";

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
  Classic: ClassicPreset,
  Recall: RecallPreset,
};

export {
  flagsToOptions,
  gameModes,
  generateFromPreset,
  getPresetOptions,
  RandomizeRom,
  vanilla,
  BpsPatch,
  patchRom,
  optionsToFlags,
  getSignature,
  fetchSignature,
  getItemNodes,
  presets,
};
