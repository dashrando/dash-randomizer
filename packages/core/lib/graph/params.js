import { Buffer } from "buffer";
import { Item } from "../items";

//-----------------------------------------------------------------
// Parameter types
//-----------------------------------------------------------------

export const MapLayout = {
  Standard: 1,
  Classic: 2,
  Recall: 3,
};

export const MajorDistributionMode = {
  Standard: 34,
  Recall: 36,
  Full: 38,
};

export const MinorDistributionMode = {
  Standard: 0, // 3:2:1
  Dash: 1, // 2:1:1
};

export const BeamMode = {
  Vanilla: 0,
  DashClassic: 1,
  DashRecall: 2,
  New: 3,
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
  ShuffleStandard: 1,
  ShuffleDash: 2,
  Randomized: 3,
};

//-----------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------

const majorModeToBits = (mode) => {
  switch (mode) {
    case MajorDistributionMode.Standard:
      return 0x0;
    case MajorDistributionMode.Recall:
      return 0x1;
    case MajorDistributionMode.Full:
      return 0x2;
  }
  throw new Error("unknown major mode");
};

const bitsToMajorMode = (bits) => {
  switch (bits) {
    case 0x0:
      return MajorDistributionMode.Standard;
    case 0x1:
      return MajorDistributionMode.Recall;
    case 0x2:
      return MajorDistributionMode.Full;
  }
  throw new Error("unknown major mode");
};

const minorModeToBits = (minorDistribution) => {
  switch (minorDistribution) {
    case MinorDistributionMode.Standard:
      return 0;
    case MinorDistributionMode.Dash:
      return 1;
    default:
      throw new Error("unknown minor mode");
  }
};

const bitsToMinorMode = (bits) => {
  switch (bits) {
    case 0x0:
      return MinorDistributionMode.Standard;
    case 0x1:
      return MinorDistributionMode.Dash;
  }
  throw new Error("unknown minor mode");
};

const mapLayoutToBits = (layout) => {
  switch (layout) {
    case MapLayout.Standard:
      return 0;
    case MapLayout.Recall:
      return 1;
    case MapLayout.Classic:
      return 2;
  }
  throw new Error("unknown map layout");
};

const bitsToMapLayout = (bits) => {
  switch (bits) {
    case 0x0:
      return MapLayout.Standard;
    case 0x1:
      return MapLayout.Recall;
    case 0x2:
      return MapLayout.Classic;
  }
  throw new Error("unknown map layout");
};

//-----------------------------------------------------------------
// Parameter encoding
//-----------------------------------------------------------------

export const paramsToBytes = (seed, settings, options) => {
  const { mapLayout, majorDistribution, minorDistribution, extraItems } =
    settings;

  // Place the seed number in the first 3 bytes (max=16777215)
  let bytes = new Uint8Array(6);
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

  return bytes;
};

export const paramsToString = (seed, settings, options) => {
  const bytes = paramsToBytes(seed, settings, options);
  return Buffer.from(bytes)
    .toString("base64")
    .replaceAll("/", "_")
    .replaceAll("+", "-");
};

export const bytesToParams = (bytes) => {
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

  const major = bitsToMajorMode((bytes[3] >> 2) & 0x3);
  const minor = bitsToMinorMode((bytes[3] >> 4) & 0x3);
  const extra = [];
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
    options: { DisableFanfare: fanfare == 0 },
  };
};

export const stringToParams = (str) => {
  const bytes = Buffer.from(
    str.replaceAll("_", "/").replaceAll("-", "+"),
    "base64"
  );
  return bytesToParams(bytes);
};
