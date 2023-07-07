import { Item } from "../../../items";
import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "../../params";

export const Preset_Recall_MM = {
  title: "Recall M/M",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Recall,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
  },
};

export const Preset_Recall_Full = {
  title: "Recall Full",
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Standard,
      missiles: 2,
      supers: 1,
      powerbombs: 1,
    },
  },
  settings: {
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
  },
};
