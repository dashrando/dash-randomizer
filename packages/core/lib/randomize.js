import BpsPatch from "./bps-patch";
import ModeRecall from "./modes/modeRecall";
import ModeStandard from "./modes/modeStandard";
import game_modes from "../data/modes";
import { getFileName, generateSeedPatch } from "./sm-rando";
import {
  getFullPrePool,
  isEmptyNode,
  getMajorMinorPrePool,
  isValidMajorMinor,
  performVerifiedFill,
} from "./itemPlacement";
import { getLocations } from "./locations";
import Loadout from "./loadout";
import { patchRom } from "../helpers/patcher";

async function RandomizeRom(seed = 0, gameModeName, opts = {}, config = {}) {
  let getPrePool;
  let canPlaceItem;
  let mode;

  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  switch (gameModeName) {
    case "sm":
      mode = new ModeStandard(seed, getLocations());
      getPrePool = getMajorMinorPrePool;
      canPlaceItem = isValidMajorMinor;
      break;

    case "sf":
      mode = new ModeStandard(seed, getLocations());
      getPrePool = getFullPrePool;
      canPlaceItem = isEmptyNode;
      break;

    case "rm":
      mode = new ModeRecall(seed, getLocations());
      getPrePool = getMajorMinorPrePool;
      canPlaceItem = isValidMajorMinor;
      break;

    case "rf":
      mode = new ModeRecall(seed, getLocations());
      getPrePool = getFullPrePool;
      canPlaceItem = isEmptyNode;
      break;

    default:
      throw Error("Invalid game mode specified");
  }

  let gameMode = game_modes.find((mode) => mode.name == gameModeName);
  if (gameMode == null) {
    throw Error("Unknown game mode:" + gameModeName);
  }

  // Setup the initial loadout.
  let initLoad = new Loadout();
  initLoad.hasCharge = true;

  // Place the items.
  performVerifiedFill(
    seed,
    mode.nodes,
    mode.itemPool,
    getPrePool,
    initLoad,
    canPlaceItem
  );

  // Load the base patch associated with this game mode.
  const basePatch = await BpsPatch.Load(gameMode.patch);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch = generateSeedPatch(seed, gameMode, mode.nodes, options);

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(seed, gameMode.prefix, options),
  };
}

export default RandomizeRom;
