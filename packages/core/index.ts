import {
  generateFromPreset,
  getPresetOptions,
  flagsToOptions,
  optionsToFlags,
} from "./lib/sm-rando";
import RandomizeRom from "./lib/randomize";
import vanillaROM, { clearVanillaRom, getVanilla } from "./lib/vanilla/storage";
import inputVanillaRom from "./lib/vanilla/input";
import gameModes from "./data/modes";
import BpsPatch from "./lib/bps-patch";
import { patchRom } from "./helpers/patcher";
import { Logic as RecallLogic } from "./lib/modes/modeRecall";

const vanilla = {
  vanillaROM,
  clearVanillaRom,
  getVanilla,
  inputVanillaRom,
};

export const Logic = {
  recall: RecallLogic,
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
};
