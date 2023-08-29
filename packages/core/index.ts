import RandomizeRom from './lib/randomize'
import gameModes from './data/modes'
import BpsPatch from './lib/bps-patch'

import { Logic as recall } from './lib/modes/modeRecall'
import { Logic as standard } from './lib/modes/modeStandard'

export const Logic = { recall, standard }

export * from './lib/signature'
export * as vanilla from './lib/vanilla'
export { patchRom } from './helpers/patcher'
export { findPreset, getPreset } from './lib/presets'
export { Item } from './lib/items'
export { generateFromPreset, getItemNodes } from './lib/sm-rando'
export {
  bytesToParams,
  paramsToString,
  stringToParams,
} from './lib/graph/params'

export {
  RandomizeRom,
  gameModes,
  BpsPatch,
}
