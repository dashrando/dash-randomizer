import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const VanillaPreset = {
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
  },
};
