import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "../../params";

export const VanillaPreset = {
  title: "Vanilla",
  mapLayout: MapLayout.Vanilla,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Standard,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 10, max: 10 },
      powerbombs: { min: 10, max: 10 },
    },
  },
  settings: {
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Vanilla,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};
