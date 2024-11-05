import { Item, Params, stringToParams } from 'core'
import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  GravityHeatReduction
} from 'core/params'

const getItemSplit = (value: number) => {
  switch (value) {
    case MajorDistributionMode.Chozo:
      return 'Chozo'
    case MajorDistributionMode.Standard:
    case MajorDistributionMode.Recall:
      return 'Major/Minor'
    default:
      return 'Full'
  }
}

const getMinorItemDistribution = (value: number) => {
  switch (value) {
    case MinorDistributionMode.Dash:
      return 'DASH - 2:1:1'
    case MinorDistributionMode.Standard:
      return 'Standard - 3:2:1'
  }
}

const getEnvironmentUpdates = (value: number) => {
  switch (value) {
    case MapLayout.Standard:
      return "Standard"
    case MapLayout.Recall:
      return "DASH: Recall"
    case MapLayout.Classic:
      return "DASH"
  }
}

const getBossMode = (value: number) => {
  switch (value) {
    case BossMode.Vanilla:
      return "Vanilla"
    case BossMode.Shifted:
      return "Shifted"
    case BossMode.Shuffled:
      return "Shuffled"
    case BossMode.Surprise:
      return "Surprise"
  }
}

const getAreaMode = (environment: number, area: boolean) => {
  if (area) {
    return 'Area Randomization';
  }
  return 'Vanilla';
}

const getBeamMode = (value: number) => {
  switch (value) {
    case BeamMode.Vanilla:
      return 'Vanilla'
    case BeamMode.Starter:
      return 'Starter'
    case BeamMode.DashRecall:
      return 'Recall'
    case BeamMode.StarterPlus:
      return 'Starter+'
  }
}

const getGravityMode = (value: number) => {
  return value === GravityHeatReduction.On ? 'On' : 'Off'
}

const displayOnOff = (value: boolean) => value ? 'On' : 'Off'

const getLogic = (value: number) => {
  return value == 0x1 ? 'Relaxed' : 'Standard'
}

const getExtraItems = (extraItems: number[]) => {
  const doubleJump = displayOnOff(extraItems.includes(Item.DoubleJump))
  const heatShield = displayOnOff(extraItems.includes(Item.HeatShield))
  const pressureValve = displayOnOff(extraItems.includes(Item.PressureValve))
  return { doubleJump, heatShield, pressureValve }
}

export const parseSettings = (parameters: Params) => {
  const { settings } = parameters
  const extraItems = getExtraItems(settings.extraItems)
  const randomizeParams = [
    { label: 'Item Split', value: getItemSplit(settings.majorDistribution) },
    { label: 'Boss Locations', value: getBossMode(settings.bossMode) },
    { label: 'Map Layout', value: getAreaMode(settings.mapLayout, settings.randomizeAreas) }
  ]
  const settingsParams = [
    { label: 'Minor Item Distribution', value: getMinorItemDistribution(settings.minorDistribution)},
    { label: 'Environment Updates', value: getEnvironmentUpdates(settings.mapLayout) },
    { label: 'Charge Beam', value: getBeamMode(settings.beamMode), },
    { label: 'Gravity Heat Reduction', value: getGravityMode(settings.gravityHeatReduction), },
    { label: 'Double Jump', value: extraItems.doubleJump, },
    { label: 'Heat Shield', value: extraItems.heatShield, },
    { label: 'Pressure Valve', value: extraItems.pressureValve, },
  ]
  const optionsParams = [
    { label: 'Logic', value: getLogic(parameters.options.RelaxedLogic ? 1 : 0) },
    //{ label: 'Seed Number', value: parameters.seed },
    { label: 'Item Fanfare', value: displayOnOff(!parameters.options.DisableFanfare), }
  ]
  return { randomizeParams, settingsParams, optionsParams }
}

export function hashToParams(hash: string) {
  if (hash.length < 20) {
    return stringToParams(hash);
  }

  return stringToParams(hash.slice(1, 13))
}
