import { Item } from "../../../items";
import {
  BeamMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
} from "../../params";

export const RecallPreset = {
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Recall,
      extraItems: [
        Item.DoubleJump,
        Item.PressureValve,
        Item.HeatShield,
        Item.BeamUpgrade,
        Item.BeamUpgrade,
        Item.BeamUpgrade,
        Item.BeamUpgrade,
      ],
    },
    minorDistribution: {
      mode: MinorDistributionMode.Dash,
      supers: { min: 15, max: 18 },
      powerbombs: { min: 15, max: 18 },
    },
  },
  settings: {
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
  },
};
