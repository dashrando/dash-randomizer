import {
  generateFromPreset,
  getPresetOptions,
  flagsToOptions,
  optionsToFlags,
} from "./lib/sm-rando";
import RandomizeRom from "./lib/randomize";
import vanillaROM, { clearVanillaRom, getVanilla } from "./lib/vanilla/storage";
import inputVanillaRom from "./lib/vanilla/input";
import { getSignature } from "./lib/vanilla/verify";
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";
import { patchRom } from "./helpers/patcher";
import { Logic as RecallLogic } from "./lib/modes/modeRecall";
import { Logic as StandardLogic } from "./lib/modes/modeStandard";

const vanilla = {
  vanillaROM,
  clearVanillaRom,
  getVanilla,
  inputVanillaRom,
};

export const Logic = {
  recall: RecallLogic,
  standard: StandardLogic,
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
  getSignature
};
