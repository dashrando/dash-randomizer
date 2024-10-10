import { Item } from "./items";
import {
  BeamMode,
  BossMode,
  GravityHeatReduction,
  MajorDistributionMode,
  MapLayout,
  MinorDistributionMode,
  stringToParams,
  SuitMode,
} from "./params";

describe("stringToParams", () => {
  test("Verify", () => {
    expect(stringToParams("")).toStrictEqual({
      options: { DisableFanfare: true, RelaxedLogic: false, Mystery: false },
      seed: 0,
      settings: {
        beamMode: BeamMode.Vanilla,
        bossMode: BossMode.Vanilla,
        extraItems: [],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Standard,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Standard,
        randomizeAreas: false,
        suitMode: 0, // unsupported vanilla suit mode
      },
    });

    expect(stringToParams("tV8MSAOg")).toStrictEqual({
      options: { DisableFanfare: false, RelaxedLogic: false, Mystery: false },
      seed: 810933,
      settings: {
        beamMode: BeamMode.Vanilla,
        bossMode: BossMode.Surprise,
        extraItems: [],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Full,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Standard,
        randomizeAreas: true,
        suitMode: SuitMode.Dash,
      },
    });

    expect(stringToParams("LfsFSBKg")).toStrictEqual({
      options: { DisableFanfare: false, RelaxedLogic: false, Mystery: false },
      seed: 391981,
      settings: {
        beamMode: BeamMode.Vanilla,
        bossMode: BossMode.Shifted,
        extraItems: [Item.DoubleJump],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Full,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Standard,
        randomizeAreas: true,
        suitMode: SuitMode.Dash,
      },
    });

    expect(stringToParams("28MOXACs")).toStrictEqual({
      options: { DisableFanfare: false, RelaxedLogic: false, Mystery: false },
      seed: 967643,
      settings: {
        beamMode: BeamMode.StarterPlus,
        bossMode: BossMode.Vanilla,
        extraItems: [],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Chozo,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Dash,
        randomizeAreas: true,
        suitMode: SuitMode.Dash,
      },
    });

    expect(stringToParams("AAAAXACs")).toStrictEqual({
      options: { DisableFanfare: false, RelaxedLogic: false, Mystery: false },
      seed: 0,
      settings: {
        beamMode: BeamMode.StarterPlus,
        bossMode: BossMode.Vanilla,
        extraItems: [],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Chozo,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Dash,
        randomizeAreas: true,
        suitMode: SuitMode.Dash,
      },
    });

    expect(stringToParams("AQAAXACs")).toStrictEqual({
      options: { DisableFanfare: false, RelaxedLogic: false, Mystery: false },
      seed: 1,
      settings: {
        beamMode: BeamMode.StarterPlus,
        bossMode: BossMode.Vanilla,
        extraItems: [],
        gravityHeatReduction: GravityHeatReduction.Off,
        majorDistribution: MajorDistributionMode.Chozo,
        mapLayout: MapLayout.Standard,
        minorDistribution: MinorDistributionMode.Dash,
        randomizeAreas: true,
        suitMode: SuitMode.Dash,
      },
    });
  });
});
