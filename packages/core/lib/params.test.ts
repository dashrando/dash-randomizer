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
    const options = {
      DisableFanfare: true,
      RelaxedLogic: false,
      Mystery: false,
      Spoiler: false,
    };
    expect(stringToParams("")).toStrictEqual({
      options,
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
    options.DisableFanfare = false;

    expect(stringToParams("tV8MSAOg")).toStrictEqual({
      options,
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
      options,
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
      options,
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
      options,
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
      options,
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
