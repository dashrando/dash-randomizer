import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "../../params";

export const Preset_Season_MM = {
  title: "Season M/M",
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Standard,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 3,
      supers: 2,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Standard,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Season_Full = {
  title: "Season Full",
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 3,
      supers: 2,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Standard,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};
