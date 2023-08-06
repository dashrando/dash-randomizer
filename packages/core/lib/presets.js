import { Item } from "./items";
import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
} from "./graph/params";

export const Preset_SGL23 = {
  title: "SGL23",
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: {
      mode: MajorDistributionMode.Full,
      extraItems: [Item.DoubleJump],
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
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.ShuffleDash,
  },
};
