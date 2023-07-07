import { Buffer } from "buffer";
import { Item } from "../items";

//-----------------------------------------------------------------
// Parameter types
//-----------------------------------------------------------------

export const MapLayout = {
  Vanilla: 0,
  Standard: 1,
  Recall: 3,
};

export const MajorDistributionMode = {
  Standard: 34,
  Recall: 36,
  Full: 38,
};

export const MinorDistributionMode = {
  Standard: 0,
  Dash: 1,
};

export const BeamMode = {
  Vanilla: 0,
  DashClassic: 1,
  DashRecall: 2,
  New: 3,
};

export const SuitMode = {
  Vanilla: 0,
  Standard: 1,
  Dash: 2,
};

export const GravityHeatReduction = {
  Off: 0x4000,
  On: 0x3000,
};

//-----------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------

const majorModeToBits = (mode) => {
  switch (mode) {
    case MajorDistributionMode.Standard:
      return 0;
    case MajorDistributionMode.Recall:
      return 1;
    case MajorDistributionMode.Full:
      return 2;
  }
  throw new Error("unknown major mode");
};

const minorModeToBits = (mode) => {
  switch (mode) {
    case MinorDistributionMode.Standard:
      return 0;
    case MinorDistributionMode.Dash:
      return 1;
  }
  throw new Error("unknown minor mode");
};

const mapLayoutToBits = (layout) => {
  switch (layout) {
    case MapLayout.Standard:
      return 0;
    case MapLayout.Recall:
      return 1;
  }
  throw new Error("unknown map layout");
};

//-----------------------------------------------------------------
// Parameter encoding
//-----------------------------------------------------------------

export const paramsToBytes = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  options
) => {
  const { majorDistribution, minorDistribution } = itemPoolParams;

  // Place the seed number in the first 3 bytes (max=16777215)
  let bytes = new Uint8Array(6);
  bytes[0] = seed & 0xff;
  bytes[1] = (seed >> 8) & 0xff;
  bytes[2] = (seed >> 16) & 0xff;

  const version = 0;
  const major = majorModeToBits(majorDistribution.mode) << 2;
  const minor = minorModeToBits(minorDistribution.mode) << 4;
  const area = (settings.randomizeAreas ? 0x1 : 0x0) << 6;
  bytes[3] = version | major | minor | area;

  const boss = settings.randomizeBosses ? 0x1 : 0x0;
  const extra = majorDistribution.extraItems;
  const doubleJump = extra.filter((i) => i == Item.DoubleJump).length;
  const heatShield = extra.filter((i) => i == Item.HeatShield).length;
  const pressureValve = extra.filter((i) => i == Item.PressureValve).length;
  const dash = (doubleJump | (heatShield << 1) | (pressureValve << 2)) << 4;
  bytes[4] = boss | dash;

  const map = mapLayoutToBits(mapLayout);
  const beam = settings.beamMode << 2;
  const suit = settings.suitMode << 4;
  const gravity =
    (settings.gravityHeatReduction == GravityHeatReduction.On ? 0x1 : 0x0) << 5;
  const fanfare = (options.DisableFanfare ? 0x0 : 0x1) << 6;
  bytes[5] = map | beam | suit | gravity | fanfare;

  return bytes;
};

export const paramsToString = (
  seed,
  mapLayout,
  itemPoolParams,
  settings,
  options
) => {
  const bytes = paramsToBytes(
    seed,
    mapLayout,
    itemPoolParams,
    settings,
    options
  );
  return Buffer.from(bytes).toString("base64");
};
