import BpsPatch from "./bps-patch";
import ModeRecall from "./modes/modeRecall";
import ModeStandard from "./modes/modeStandard";
import game_modes from "../data/modes";
import { getFileName, generateSeedPatch, patchRom } from "./sm-rando";
import { getMajorMinorPrePool, isValidMajorMinor, performVerifiedFill } from "./itemPlacement";
import { getLocations } from "./locations";
import Loadout from "./loadout";

async function RandomizeRom(seed=0, game_mode, opts={}, config={}) {
  let getPrePool;
  let canPlaceItem;
  let mode;
  let gameModeName;

  if (!config.vanillaBytes) {
     throw Error('No vanilla ROM data found')
  }

  switch (game_mode) {
     case "sm":
        mode = new ModeStandard(seed, getLocations());
        getPrePool = getMajorMinorPrePool;
        canPlaceItem = isValidMajorMinor;
        gameModeName = "mm";
        break;

     case "sf":
        mode = new ModeStandard(seed, getLocations());
        getPrePool = getFullPrePool;
        canPlaceItem = isEmptyNode;
        gameModeName = "full";
        break;

     case "rm":
        mode = new ModeRecall(seed, getLocations());
        getPrePool = getMajorMinorPrePool;
        canPlaceItem = isValidMajorMinor;
        gameModeName = "rm";
        break;

     case "rf":
        mode = new ModeRecall(seed, getLocations());
        getPrePool = getFullPrePool;
        canPlaceItem = isEmptyNode;
        gameModeName = "rf";
        break;

     default:
        mode = new ModeStandard(seed, getLocations());
        getPrePool = getMajorMinorPrePool;
        canPlaceItem = isValidMajorMinor;
        gameModeName = "mm";
        break;
  }

  let gameMode = game_modes.find((mode) => mode.name == gameModeName);
  if (gameMode == null) {
     alert("Selected Game Mode is currently unsupported for web generation.");
     return;
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
  }
  const options = { ...defaultOptions, ...opts}

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch = generateSeedPatch(seed, gameMode, mode.nodes, options);

  // Create the rom by patching the vanilla rom.
  return {
     data: patchRom(config.vanillaBytes, basePatch, seedPatch),
     name: getFileName(seed, gameMode.prefix, options),
  }
}

export default RandomizeRom;
