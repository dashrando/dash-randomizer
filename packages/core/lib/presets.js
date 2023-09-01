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

//-----------------------------------------------------------------
// Accessor Method
//-----------------------------------------------------------------

export const getAllPresets = () => {
  return [
    Preset_SGL23,
    Preset_Recall_MM,
    Preset_Recall_Full,
    Preset_Recall_Area_MM,
    Preset_Classic_MM,
    Preset_Classic_Full,
    Preset_Standard_MM,
    Preset_Standard_Full,
  ];
};

export const getPreset = (tag) => {
  return getAllPresets().find((p) => p.tags.includes(tag));
};

export const findPreset = (params) => {
  const { itemPoolParams, settings } = params;
  return getAllPresets().find((p) => {
    if (
      params.mapLayout != p.mapLayout ||
      JSON.stringify(itemPoolParams) !== JSON.stringify(p.itemPoolParams) ||
      settings.beamMode !== p.settings.beamMode ||
      settings.suitMode !== p.settings.suitMode ||
      settings.gravityHeatReduction !== p.settings.gravityHeatReduction ||
      settings.randomizeAreas !== p.settings.randomizeAreas ||
      settings.bossMode !== p.settings.bossMode
    ) {
      return false;
    }
    return true;
  });
};

//-----------------------------------------------------------------
// SG Live 2023 Tournament Settings
//-----------------------------------------------------------------

export const Preset_SGL23 = {
  title: "SGL23",
  tags: ["sgl23"],
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [Item.DoubleJump],
  },
  settings: {
    preset: "SGL23",
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.ShuffleDash,
  },
};

//-----------------------------------------------------------------
// Classic DASH Settings
//-----------------------------------------------------------------

export const Preset_Classic_MM = {
  title: "Classic M/M",
  tags: ["classic_mm"],
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
  },
  settings: {
    preset: "ClassicMM",
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Classic_Full = {
  title: "Classic Full",
  tags: ["classic_full"],
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
  },
  settings: {
    preset: "ClassicFull",
    beamMode: BeamMode.DashClassic,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

//-----------------------------------------------------------------
// DASH Recall Settings
//-----------------------------------------------------------------

export const Preset_Recall_MM = {
  title: "Recall M/M",
  tags: ["recall_mm", "mm"],
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Recall,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
  },
  settings: {
    preset: "RecallMM",
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Recall_Full = {
  title: "Recall Full",
  tags: ["recall_full", "full"],
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
  },
  settings: {
    preset: "RecallFull",
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Recall_Area_MM = {
  title: "Recall Area M/M",
  tags: ["recall_area_mm"],
  mapLayout: MapLayout.Recall,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Recall,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
  },
  settings: {
    preset: "RecallAreaMM",
    beamMode: BeamMode.DashRecall,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: true,
    bossMode: BossMode.Vanilla,
  },
};

//-----------------------------------------------------------------
// Standard Settings (similar to Total and VARIA vanilla seeds)
//-----------------------------------------------------------------

export const Preset_Standard_MM = {
  title: "Standard M/M",
  tags: ["standard_mm"],
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
  },
  settings: {
    preset: "StandardMM",
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Standard_Full = {
  title: "Standard Full",
  tags: ["standard_full"],
  mapLayout: MapLayout.Standard,
  itemPoolParams: {
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
  },
  settings: {
    preset: "StandardFull",
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};
