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
  Options
} from "./params";
import DotNetRandom from "./dotnet-random";

export type Preset = {
  title: string;
  fileName: string;
  tags: string[];
  settings: Settings;
  options: Options;
}

//-----------------------------------------------------------------
// Accessor Method
//-----------------------------------------------------------------

export const getAllPresets = () => {
  return [
    Preset_Classic_MM,
    Preset_SurpriseSurprise,
    Preset_Chozo_Bozo,
    Preset_2017_MM,
    Preset_SGL23,
    Preset_SGL24,
    Preset_SGL25,
    Preset_Spring_2024,
    Preset_MM_Surprise,
    Preset_MM_Area_Surprise,
    Preset_Full_Surprise,
    Preset_Chozo_Surprise,
    Preset_Chozo_Area_Surprise,
    Preset_Classic_Full,
    Preset_Chozo,
    Preset_Chozo_Bozo_Area,
    Preset_Chozo_Area_Shifted,
    Preset_MM_Area_Shuffled,
    Preset_Full_Area_Shuffled
  ];
};

export const getPreset = (tag: string) => {
  if (tag === 'mystery') {
    return generateMysteryPreset()
  }
  return getAllPresets().find((p) => p.tags.includes(tag));
};

export const findPreset = (
  settings: Settings,
  options: Options,
): Preset | undefined => {
  return getAllPresets().find((p) => {
    const ps = p.settings;
    const po = p.options;
    if (
      settings.mapLayout != ps.mapLayout ||
      settings.majorDistribution != ps.majorDistribution ||
      settings.minorDistribution != ps.minorDistribution ||
      JSON.stringify(settings.extraItems) !== JSON.stringify(ps.extraItems) ||
      settings.beamMode !== ps.beamMode ||
      settings.suitMode !== ps.suitMode ||
      settings.gravityHeatReduction !== ps.gravityHeatReduction ||
      settings.randomizeAreas !== ps.randomizeAreas ||
      settings.bossMode !== ps.bossMode ||
      options.DisableFanfare !== po.DisableFanfare ||
      options.RelaxedLogic !== po.RelaxedLogic
    ) {
      return false;
    }
    return true;
  });
};

type WeightedOption = {
  value: any;
  weight: number;
}


const generateMysteryPreset = (): Preset => {
  const MAX_SEED = 2000001
  const timestamp = Math.floor(Date.now() % MAX_SEED)
  const rnd = new DotNetRandom(timestamp)

  const getWeightedRandom = (options: WeightedOption[]) => {
    let sum = 0
    const draw = rnd.NextDouble()
    for (let i = 0; i < options.length; i++) {
      sum += options[i].weight
      if (draw < sum) {
        return options[i].value
      }
    }
    throw new Error('Invalid weights')
  }

  return {
    title: 'Mystery',
    fileName: 'Mystery',
    tags: ['mystery'],
    settings: {
      mapLayout: MapLayout.Standard,
      majorDistribution: getWeightedRandom([
        { value: MajorDistributionMode.Standard, weight: 0.34 },
        { value: MajorDistributionMode.Chozo, weight: 0.33 },
        { value: MajorDistributionMode.Full, weight: 0.33 },
      ]),
      minorDistribution: getWeightedRandom([
        { value: MinorDistributionMode.Standard, weight: 0.5 },
        { value: MinorDistributionMode.Dash, weight: 0.5 },
      ]),
      extraItems:
        [getWeightedRandom([
          { value: [], weight: 0.5 },
          { value: [Item.DoubleJump], weight: 0.5 },
        ])].concat(
          getWeightedRandom([
            { value: [], weight: 0.75 },
            { value: [Item.HeatShield], weight: 0.25 },
          ])
        ),
      beamMode: getWeightedRandom([
        { value: BeamMode.Vanilla, weight: 0.34 },
        { value: BeamMode.Starter, weight: 0.33 },
        { value: BeamMode.StarterPlus, weight: 0.33 },
      ]),
      suitMode: SuitMode.Dash,
      gravityHeatReduction: getWeightedRandom([
        { value: GravityHeatReduction.Off, weight: 0.75 },
        { value: GravityHeatReduction.On, weight: 0.25 },
      ]),
      randomizeAreas: getWeightedRandom([
        { value: true, weight: 0.67 },
        { value: false, weight: 0.33 },
      ]),
      bossMode: getWeightedRandom([
        { value: BossMode.Vanilla, weight: 0.3 },
        { value: BossMode.Shuffled, weight: 0.3 },
        { value: BossMode.Shifted, weight: 0.3 },
        { value: BossMode.Surprise, weight: 0.1 },
      ])
    },
    options: {
      DisableFanfare: false,
      RelaxedLogic: false,
      Mystery: true,
      Spoiler: false
    }
  }
}

export const Preset_MM_Surprise: Preset = {
  title: "MM Surprise",
  fileName: "MMSurprise",
  tags: ["mm_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_MM_Area_Surprise: Preset = {
  title: "MM Area Surprise",
  fileName: "MMAreaSurprise",
  tags: ["mm_area_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_MM_Area_Shuffled: Preset = {
  title: "MM Area Shuffled",
  fileName: "MMAreaShuffled",
  tags: ["mm_area_shuffled"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shuffled,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_Full_Area_Shuffled: Preset = {
  title: "Full Area Shuffled",
  fileName: "FullAreaShuffled",
  tags: ["full_area_shuffled"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shuffled,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_Full_Surprise: Preset = {
  title: "Full Surprise",
  fileName: "FullSurprise",
  tags: ["full_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_SurpriseSurprise: Preset = {
  title: "Surprise Surprise",
  fileName: "SurpriseSurprise",
  tags: ["surprise_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Full,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_Chozo_Surprise: Preset = {
  title: "Chozo Surprise",
  fileName: "ChozoSurprise",
  tags: ["chozo_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: false,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
};

export const Preset_Chozo_Area_Surprise: Preset = {
  title: "Chozo Area Surprise",
  fileName: "ChozoAreaSurprise",
  tags: ["chozo_area_surprise"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  }
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};

//-----------------------------------------------------------------
// Event / Tournament Settings
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};
export const Preset_SGL24: Preset = {
  title: "SGL24",
  fileName: "SGL24",
  tags: ["sgl24"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [Item.DoubleJump],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Surprise,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};

export const Preset_SGL25: Preset = {
  title: "SGL25",
  fileName: "SGL25",
  tags: ["sgl25"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Standard,
    minorDistribution: MinorDistributionMode.Standard,
    extraItems: [Item.DoubleJump],
    beamMode: BeamMode.Vanilla,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Shifted,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};

export const Preset_Spring_2024: Preset = {
  title: "Spring Invitational 2024",
  fileName: "Spring24",
  tags: ["spring24"],
  settings: {
    mapLayout: MapLayout.Standard,
    majorDistribution: MajorDistributionMode.Chozo,
    minorDistribution: MinorDistributionMode.Dash,
    extraItems: [],
    beamMode: BeamMode.StarterPlus,
    suitMode: SuitMode.Dash,
    gravityHeatReduction: GravityHeatReduction.Off,
    randomizeAreas: true,
    bossMode: BossMode.Vanilla,
  },
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};

//-----------------------------------------------------------------
// Classic DASH Settings
//-----------------------------------------------------------------

export const Preset_Classic_MM: Preset = {
  title: "Classic M/M",
  fileName: "ClassicMM",
  tags: ["classic", "classic_mm", "standard_mm"],
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};

//-----------------------------------------------------------------
// 2017 Settings (similar to Total and VARIA vanilla seeds)
//-----------------------------------------------------------------

export const Preset_2017_MM: Preset = {
  title: "Throwback 2017",
  fileName: "2017MM",
  tags: ["2017_mm", "mm"],
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
  options: {
    DisableFanfare: false,
    RelaxedLogic: false,
    Mystery: false,
    Spoiler: false
  },
};
