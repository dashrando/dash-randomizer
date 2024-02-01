import { Item } from "./items";
import {
  BeamMode,
  BossMode,
  MapLayout,
  MajorDistributionMode,
  MinorDistributionMode,
  SuitMode,
  GravityHeatReduction,
  Settings,
} from "./graph/params";

export type Preset = {
  title: string;
  fileName: string;
  tags: string[];
  settings: Settings;
}

//-----------------------------------------------------------------
// Accessor Method
//-----------------------------------------------------------------

export const getAllPresets = () => {
  return [
    Preset_SGL23,
    Preset_Recall_MM,
    Preset_Recall_Full,
    Preset_Classic_MM,
    Preset_Classic_Full,
    Preset_2017_MM,
    Preset_Chozo,
    Preset_Chozo_Bozo,
    Preset_Chozo_Bozo_Area,
    Preset_Chozo_Area_Shifted,
  ];
};

export const getPreset = (tag: string) => {
  return getAllPresets().find((p) => p.tags.includes(tag));
};

export const findPreset = (settings: Settings): Preset | undefined => {
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
// Chozo Settings
//-----------------------------------------------------------------

export const Preset_Chozo: Preset = {
  title: "Chozo",
  fileName: "Chozo",
  tags: ["chozo"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Chozo_Bozo: Preset = {
  title: "Chozo Bozo",
  fileName: "ChozoBozo",
  tags: ["chozo_bozo"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Shuffled,
  },
};

export const Preset_Chozo_Bozo_Area: Preset = {
  title: "Chozo Bozo Area",
  fileName: "ChozoBozoArea",
  tags: ["chozo_bozo_area"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shuffled,
  },
};

export const Preset_Chozo_Area_Shifted: Preset = {
  title: "Chozo Area Shifted",
  fileName: "ChozoAreaShifted",
  tags: ["chozo_area_shifted"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shifted,
  },
};

//-----------------------------------------------------------------
// SG Live 2023 Tournament Settings
//-----------------------------------------------------------------

export const Preset_SGL23: Preset = {
  title: "SGL23",
  fileName: "SGL23",
  tags: ["sgl23"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [Item.DoubleJump],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shifted,
  },
};

//-----------------------------------------------------------------
// Classic DASH Settings
//-----------------------------------------------------------------

export const Preset_Classic_MM: Preset = {
  title: "Classic M/M",
  fileName: "ClassicMM",
  tags: ["classic_mm", "standard_mm"],
  settings: {
    mapLayout: MapLayout.Classic,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
    beamMode: BeamMode.Starter,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Classic_Full: Preset = {
  title: "Classic Full",
  fileName: "ClassicFull",
  tags: ["classic_full", "standard_full"],
  settings: {
    mapLayout: MapLayout.Classic,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
    beamMode: BeamMode.Starter,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

//-----------------------------------------------------------------
// DASH Recall Settings
//-----------------------------------------------------------------

export const Preset_Recall_MM: Preset = {
  title: "Recall M/M",
  fileName: "RecallMM",
  tags: ["recall_mm", "mm"],
  settings: {
    mapLayout: MapLayout.Recall,
    majorDistribution: MajorDistributionMode.Recall,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.HeatShield, Item.PressureValve],
    beamMode: BeamMode.StarterPlus,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

export const Preset_Recall_Full: Preset = {
  title: "Recall Full",
  fileName: "RecallFull",
  tags: ["recall_full", "full"],
  settings: {
    mapLayout: MapLayout.Recall,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [Item.DoubleJump, Item.HeatShield, Item.PressureValve],
    beamMode: BeamMode.StarterPlus,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.On,
    randomizeAreas: false,
    bossMode: BossMode.Vanilla,
  },
};

//-----------------------------------------------------------------
// 2017 Settings (similar to Total and VARIA vanilla seeds)
//-----------------------------------------------------------------

export const Preset_2017_MM: Preset = {
  title: "Throwback 2017",
  fileName: "2017MM",
  tags: ["2017_mm"],
  settings: {
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
