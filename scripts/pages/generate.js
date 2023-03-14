import { Modes as game_modes } from '../data';
import BpsPatch from '../lib/bps-patch';
import { saveAs } from 'file-saver';
import vanillaROM, { clearVanillaRom } from '../lib/vanilla/storage';
import inputVanillaRom from '../lib/vanilla/input';

let vanillaBytes = null;

// Used in generate.html UI
function DisableFixedSeed() {
   let temp = document.getElementById("fixed_value");
   temp.disabled = true;
   temp.value = "";
}

// Used in generate.html UI
function EnableFixedSeed() {
   let temp = document.getElementById("fixed_value");
   temp.disabled = false;
   temp.value = 1;
}

function getSeed() {
   let seed = 0;
   const fixedSeed = document.getElementById("fixed").checked;
   const fixedValueInput = document.getElementById("fixed_value");
   const minValue = Number(fixedValueInput.min);
   const maxValue = Number(fixedValueInput.max);
   if (fixedSeed) {
      const fixedValue = Number(fixedValueInput.value);

      if (
         !Number.isInteger(fixedValue) ||
         fixedValue < minValue ||
         fixedValue > maxValue
      ) {
         alert("Invalid seed specified.");
         return;
      }
      seed = fixedValue;
   } else {
      let randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);

      let numSeeds = maxValue - minValue + 1;
      let modSeed = randomArray[0] % numSeeds;
      seed = minValue + modSeed;
   }
   return seed;
}

// Used in generate.html UI
async function GetRandomizedRom() {
   const seed = getSeed();
   const mode = document.getElementById("game_mode").value
   
   // Enable or disable item fanfares.
   const options = {};
   const fanfare_options = document.getElementsByName("fanfare_mode");
   fanfare_options.forEach((i) => {
      if (i.checked && i.value == "Off") {
         options.DisableFanfare = 1;
      }
   });

   const config = {
      vanillaBytes,
   }
   const { data, name } = await RandomizeRom(seed, mode, options, config);

   // Save the new file on the local system.
   saveAs(new Blob([data]), name);

   // Update the UI with permalink to the new seed
   const permalink = `${window.location.origin}/seed.html?seed=${seed}&mode=${mode}`;
   const permalinkEl = document.getElementById('seed-permalink');
   permalinkEl.innerHTML = `<a href="${permalink}">${permalink}</a>`;

   document.getElementById('permalink-container').classList.add('visible');
}

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

   function setOtherRandoSettings(areaSettings, bossSettings) {
      areaElements = document.getElementsByName(areaSettings);
      bossElements = document.getElementsByName(bossSettings);

      //Get area rando setting
      for (i = 0; i < areaElements.length; i++) {
         if (areaElements[i].checked) {
            switch (areaElements[i].value) {
               case "Full":
                  //Call area rando setup function with Full parameter
                  //or set area rando variable
                  console.log("Full Area Randomization");
                  break;
               case "Light":
                  //Call area rando setup function with Light parameter
                  //or set area rando variable
                  console.log("Light Area Randomization");
                  break;
               case "None":
                  //Do nothing for now.
                  console.log("No Area Randomization");
                  break;
               default:
               //Do nothing.
            }
         }
      }

      //Get boss rando setting
      for (i = 0; i < bossElements.length; i++) {
         if (bossElements[i].checked) {
            switch (bossElements[i].value) {
               case "On":
                  //Call boss rando setup function with Full parameter
                  //or set boss rando variable
                  console.log("Boss Randomization On");
                  break;
               case "Off":
                  //Call boss rando setup function with Light parameter
                  //or set boss rando variable
                  console.log("Boss Randomization Off");
                  break;
               default:
               //Do nothing.
            }
         }
      }
   }

   setOtherRandoSettings("area_type", "boss_type");

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

function setupUI() {

  document.addEventListener('vanillaRom:set', (evt) => {
    let randoBtn = document.getElementById("randomize_button");
    if (randoBtn === null) {
       return;
    }
    if (randoBtn != null) {
       randoBtn.disabled = false;
    }
 
    let vanillaRomInput = document.getElementById("vanilla-rom");
    vanillaRomInput.disabled = true;
    vanillaBytes = evt.detail.data;
  })
 
 document.addEventListener('vanillaRom:cleared', (evt) => {
    let randoBtn = document.getElementById("randomize_button");
    if (randoBtn === null) {
       return;
    }
    if (randoBtn != null) {
       randoBtn.disabled = true;
    }
 
    let vanillaRomInput = document.getElementById("vanilla-rom");
    vanillaRomInput.disabled = false;
    vanillaRomInput.value = '';
    vanillaBytes = null;
  })

  // Listen to when the vanilla rom is set.
  const vanillaRomEl = document.getElementById("vanilla-rom")
  vanillaRomEl.addEventListener('change', (evt) => {
    inputVanillaRom(evt.target)
  })

  // Listen to when the vanilla rom is cleared.
  const removeEl = document.getElementById('remove-vanilla-rom-btn')
  removeEl.addEventListener('click', (_evt) => {
    clearVanillaRom()
  })

  new vanillaROM()
}

document.addEventListener('DOMContentLoaded', setupUI)
