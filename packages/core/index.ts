import { generateFromPreset } from './lib/sm-rando'
import RandomizeRom from './lib/randomize'
import vanillaROM, { clearVanillaRom, getVanilla } from './lib/vanilla/storage'
import inputVanillaRom from './lib/vanilla/input'
import gameModes from './data/modes'
import BpsPatch from './lib/bps-patch'
import { patchRom } from './helpers/patcher'

const vanilla = {
  vanillaROM,
  clearVanillaRom,
  getVanilla,
  inputVanillaRom,
}

export default function trill() {
  console.log('yo')
}

export {
  gameModes,
  generateFromPreset,
  RandomizeRom,
  vanilla,
  BpsPatch,
  patchRom,
}
