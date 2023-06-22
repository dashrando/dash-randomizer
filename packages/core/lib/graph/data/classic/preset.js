import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "../../params";

export const Preset_Classic_MM = {
  title: "Classic M/M",
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Standard,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
  },
};

export const Preset_Classic_Full = {
  title: "Classic Full",
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
  },
};
