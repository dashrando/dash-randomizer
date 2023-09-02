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

export const findPreset = (settings) => {
  return getAllPresets().find((p) => {
    const ps = p.settings;
    if (
      settings.mapLayout != ps.mapLayout ||
      settings.majorDistribution != ps.majorDistribution ||
      settings.minorDistribution != ps.minorDistribution ||
      JSON.stringify(settings.extraItems) !== JSON.stringify(ps.extraItems) ||
      settings.beamMode !== ps.beamMode ||
      settings.suitMode !== ps.suitMode ||
      settings.gravityHeatReduction !== ps.gravityHeatReduction ||
      settings.randomizeAreas !== ps.randomizeAreas ||
      settings.bossMode !== ps.bossMode
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
  settings: {
    preset: "SGL23",
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [Item.DoubleJump],
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
  settings: {
    preset: "ClassicMM",
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
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
  settings: {
    preset: "ClassicFull",
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
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
  settings: {
    preset: "RecallMM",
    mapLayout: MapLayout.Recall,
    majorDistribution: MajorDistributionMode.Recall,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
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
  settings: {
    preset: "RecallFull",
    mapLayout: MapLayout.Recall,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
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
  settings: {
    preset: "RecallAreaMM",
    mapLayout: MapLayout.Recall,
    majorDistribution: MajorDistributionMode.Recall,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.PressureValve, Item.HeatShield],
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
  settings: {
    preset: "StandardMM",
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
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
  settings: {
    preset: "StandardFull",
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};
