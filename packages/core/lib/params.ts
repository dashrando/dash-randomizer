import { Buffer } from "buffer";
import { Item } from "./items";
import { safeToBase64 } from "../helpers/converters";

export const ENCODED_PARAMS_SIZE = 7;

export type Settings = {
  mapLayout: number;
  majorDistribution: number;
  minorDistribution: number;
  extraItems: number[];
  randomizeAreas: boolean;
  bossMode: number;
  beamMode: number;
  suitMode: number;
  gravityHeatReduction: number;
}

export type Options = {
  DisableFanfare: boolean;
  RelaxedLogic: boolean;
  Mystery: boolean;
  Spoiler: boolean;
}

export type Params = {
  seed: number;
  settings: Settings;
  options: Options;
}

//-----------------------------------------------------------------
// Parameter types
//-----------------------------------------------------------------

export const MapLayout = {
  Standard: 1,
  Classic: 2,
};

export const MajorDistributionMode = {
  Chozo: 25,
  Standard: 34,
  Full: 38,
};

export const MinorDistributionMode = {
  Standard: 0, // 3:2:1
  Dash: 1, // 2:1:1
};

export const BeamMode = {
  Vanilla: 0,
  Starter: 1,
  DashRecall: 2,
  StarterPlus: 3,
};

export const SuitMode = {
  Standard: 1,
  Dash: 2,
};

export const GravityHeatReduction = {
  Off: 0x4000,
  On: 0x3000,
};

export const BossMode = {
  Vanilla: 0,
  Shuffled: 1,
  Shifted: 2,
  Surprise: 3,
};

//-----------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------

const majorModeToBits = (mode: number) => {
  switch (mode) {
    case MajorDistributionMode.Standard:
      return 0x0;
    case MajorDistributionMode.Full:
      return 0x2;
    case MajorDistributionMode.Chozo:
      return 0x3;
  }
  throw new Error("unknown major mode");
};

const bitsToMajorMode = (bits: number) => {
  switch (bits) {
    case 0x0:
      return MajorDistributionMode.Standard;
    case 0x2:
      return MajorDistributionMode.Full;
    case 0x3:
      return MajorDistributionMode.Chozo;
  }
  throw new Error("unknown major mode");
};

const minorModeToBits = (minorDistribution: number) => {
  switch (minorDistribution) {
    case MinorDistributionMode.Standard:
      return 0;
    case MinorDistributionMode.Dash:
      return 1;
    default:
      throw new Error("unknown minor mode");
  }
};

const bitsToMinorMode = (bits: number) => {
  switch (bits) {
    case 0x0:
      return MinorDistributionMode.Standard;
    case 0x1:
      return MinorDistributionMode.Dash;
  }
  throw new Error("unknown minor mode");
};

const mapLayoutToBits = (layout: number) => {
  switch (layout) {
    case MapLayout.Standard:
      return 0;
    case MapLayout.Classic:
      return 2;
  }
  throw new Error("unknown map layout");
};

const bitsToMapLayout = (bits: number) => {
  switch (bits) {
    case 0x0:
      return MapLayout.Standard;
    case 0x2:
      return MapLayout.Classic;
  }
  throw new Error("unknown map layout");
};

//-----------------------------------------------------------------
// Parameter encoding (12 bytes available)
//
// bytes 0-2 = 24-bit seed number
//
// byte 3 = rr-ii-aa-vv
//    r: randomize areas
//    i: minor distribution mode
//    a: major distribution mode
//    v: version
//
// byte 4 = pp-h-d-bbbb
//    p: pressurve valve
//    h: heat shield
//    d: double jump
//    b: boss mode
//
// byte 5 = f-g-ss-bb-mm
//    f: fanfare
//    g: gravity heat reduction
//    s: suit mode
//    b: beam mode
//    m: map layout
//
// byte 6 = ll-pppppp
//    l: logic
//    p: padding
//-----------------------------------------------------------------

export const paramsToBytes = (seed: number, settings: Settings, options: Options) => {
  const { mapLayout, majorDistribution, minorDistribution, extraItems } =
    settings;

  // Place the seed number in the first 3 bytes (max=16777215)
  let bytes = new Uint8Array(ENCODED_PARAMS_SIZE);
  bytes[0] = seed & 0xff;
  bytes[1] = (seed >> 8) & 0xff;
  bytes[2] = (seed >> 16) & 0xff;

  const version = 0;
  const major = majorModeToBits(majorDistribution) << 2;
  const minor = minorModeToBits(minorDistribution) << 4;
  const area = (settings.randomizeAreas ? 0x1 : 0x0) << 6;
  bytes[3] = version | major | minor | area;

  const boss = settings.bossMode;
  const extra = extraItems;
  const doubleJump = extra.filter((i) => i == Item.DoubleJump).length;
  const heatShield = extra.filter((i) => i == Item.HeatShield).length;
  const pressureValve = extra.filter((i) => i == Item.PressureValve).length;
  const dash = (doubleJump | (heatShield << 1) | (pressureValve << 2)) << 4;
  bytes[4] = boss | dash;

  const map = mapLayoutToBits(mapLayout);
  const beam = settings.beamMode << 2;
  const suit = settings.suitMode << 4;
  const gravity =
    (settings.gravityHeatReduction == GravityHeatReduction.On ? 0x1 : 0x0) << 6;
  const fanfare = (options.DisableFanfare ? 0x0 : 0x1) << 7;
  bytes[5] = map | beam | suit | gravity | fanfare;

  const relaxed = (options.RelaxedLogic ? 0x1 : 0x0) << 6;
  const mystery = (options.Mystery ? 0x1 : 0x0) << 5;
  const spoiler = (options.Spoiler ? 0x1 : 0x0) << 4;
  bytes[6] = relaxed | mystery | spoiler;

  return bytes;
};

export const bytesToParams = (input: Uint8Array): Params => {
  const bytes = new Uint8Array(ENCODED_PARAMS_SIZE).fill(0x0);
  if (input.length > ENCODED_PARAMS_SIZE) {
    bytes.set(input.subarray(0, ENCODED_PARAMS_SIZE));
  } else {
    bytes.set(input);
  }
  const seed = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16);
  const fanfare = (bytes[5] >> 7) & 0x1;
  const gravity = (bytes[5] >> 6) & 0x1;
  const area = (bytes[3] >> 6) & 0x3;
  const boss = bytes[4] & 0xf;
  const mapLayout = bitsToMapLayout(bytes[5] & 0x3);
  const beam = (bytes[5] >> 2) & 0x3;
  const suit = (bytes[5] >> 4) & 0x3;
  const doubleJump = (bytes[4] >> 4) & 0x1;
  const heatShield = (bytes[4] >> 5) & 0x1;
  const pressureValve = (bytes[4] >> 6) & 0x3;
  const relaxed = (bytes[6] >> 6) & 0x3;
  const mystery = (bytes[6] >> 5) & 0x1;
  const spoiler = (bytes[6] >> 4) & 0x1;

  const major = bitsToMajorMode((bytes[3] >> 2) & 0x3);
  const minor = bitsToMinorMode((bytes[3] >> 4) & 0x3);
  const extra: number[] = [];
  if (doubleJump != 0x0) {
    extra.push(Item.DoubleJump);
  }
  if (heatShield != 0x0) {
    extra.push(Item.HeatShield);
  }
  if (pressureValve != 0x0) {
    extra.push(Item.PressureValve);
    if (pressureValve > 0x1) {
      extra.push(Item.PressureValve);
    }
  }

  return {
    seed: seed,
    settings: {
      mapLayout: mapLayout,
      majorDistribution: major,
      minorDistribution: minor,
      extraItems: extra,
      randomizeAreas: area == 0x1,
      bossMode: boss,
      beamMode: beam,
      suitMode: suit,
      gravityHeatReduction:
        gravity == 0x0 ? GravityHeatReduction.Off : GravityHeatReduction.On,
    },
    options: {
      DisableFanfare: fanfare == 0x0,
      RelaxedLogic: relaxed == 0x1,
      Mystery: mystery == 0x1,
      Spoiler: spoiler == 0x1
    },
  };
};

export const stringToParams = (str: string): Params => {
  const bytes = Buffer.from(safeToBase64(str), "base64")
  return bytesToParams(bytes);
};
