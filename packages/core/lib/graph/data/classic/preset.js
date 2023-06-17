import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const ClassicPreset = {
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Standard,
      extraItems: [],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 12, max: 18 },
      powerbombs: { min: 14, max: 20 },
    },
  },
  settings: {
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
  },
};
