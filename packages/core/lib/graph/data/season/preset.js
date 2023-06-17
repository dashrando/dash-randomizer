import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const SeasonPreset = {
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
  },
};
