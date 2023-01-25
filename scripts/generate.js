let vanillaBytes = null;

function DisableFixedSeed() {
   let temp = document.getElementById("fixed_value");
   temp.disabled = true;
   temp.value = "";
}

function EnableFixedSeed() {
   let temp = document.getElementById("fixed_value");
   temp.disabled = false;
   temp.value = 1;
}

async function LoadFile(path) {
   let response = await fetch(path);
   let buffer = await response.arrayBuffer();
   return new Uint8Array(buffer);
}

async function RandomizeRom() {
   let theSeed = 0;
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
      theSeed = fixedValue;
   } else {
      let randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);

      let numSeeds = maxValue - minValue + 1;
      let modSeed = randomArray[0] % numSeeds;
      theSeed = minValue + modSeed;
   }

   //Set the logic and the nodes (items and locations) based on user input.
   let logic;
   let mode;
   let gameModeName;

   switch (document.getElementById("game_mode").value) {
      case "sm":
         mode = new ModeStandard(theSeed, getItems(), getLocations());
         logic = new MajorMinorLogic(theSeed, mode.nodes);
         gameModeName = "mm";
         break;

      /*
      Add in more cases here as they come online for the other game modes:
      Standard Full ("sf") 
      Recall M/M ("rm")
      Recall Full ("rf") 
      */

      default:
         mode = new ModeStandard(theSeed, getItems(), getLocations());
         logic = new MajorMinorLogic(theSeed, mode.nodes);
         break;
   }

   let gameMode = game_modes.find((mode) => mode.name == gameModeName);

   if (gameMode == null) {
      alert("Selected Game Mode is currently unsupported for web generation.");
      return;
   }

   const seedData = logic.placeItems(mode.itemPool);

   if (seedData == null) {
      alert("Failed to find data for seed " + theSeed);
      return;
   }

   // Apply the BPS patch associated with the game mode.
   const gamePatch = await BpsPatch.Load(gameMode.patch);
   let patchedBytes = gamePatch.Apply(vanillaBytes);

   // Adjust the item locations based on the seed.
   await ApplySeedData(patchedBytes, seedData);

   // Save the new file on the local system.
   saveAs(
      new Blob([patchedBytes]),
      gameMode.prefix + theSeed.toString().padStart(6, "0") + ".sfc"
   );
}

function RandomizeRomFromCombo() {
   let gameModeName = document.getElementById("select_mode").value;
   RandomizeRom(gameModeName);
}

function ToHexString(byteArray) {
   return Array.from(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
   }).join("");
}

function VerifyVanillaRom() {
   let vanillaRomInput = document.getElementById("vanilla-rom");
   let vanillaRom = vanillaRomInput.files[0];
   let reader = new FileReader();
   reader.readAsArrayBuffer(vanillaRom);

   reader.onload = async function () {
      let check = await window.crypto.subtle.digest("SHA-256", reader.result);
      if (
         ToHexString(new Uint8Array(check)) ==
         "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72"
      ) {
         let randoBtn = document.getElementById("randomize_button");
         if (randoBtn != null) {
            randoBtn.disabled = false;
            randoBtn.style.visibility = "visible";
         }

         let romBtn = document.getElementById("select-rom");
         if (romBtn != null) {
            romBtn.style.opacity = 0.5;
            romBtn.style.pointerEvents = "none";
            romBtn.value = "Verified";
         }

         vanillaRomInput.disabled = true;
         vanillaBytes = new Uint8Array(reader.result);
      } else {
         alert("Vanilla Rom does not match checksum.");
         vanillaRomInput.value = "";
      }
   };

   reader.onerror = function () {
      alert("Failed to load file.");
   };
}
