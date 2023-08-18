import { generateFromPreset, getItemNodes } from "./lib/sm-rando";
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
import { getPreset } from "./lib/presets";
import { Item } from "./lib/items";
import {
  bytesToParams,
  paramsToString,
  stringToParams,
} from "./lib/graph/params";

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

export {
  gameModes,
  generateFromPreset,
  getPreset,
  RandomizeRom,
  vanilla,
  BpsPatch,
  patchRom,
  bytesToParams,
  paramsToString,
  stringToParams,
  getSignature,
  fetchSignature,
  formatMonoSignature,
  getItemNodes,
  Item,
};
