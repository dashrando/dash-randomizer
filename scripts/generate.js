var vanillaBytes = null;

function DisableFixedSeed() {
   var temp = document.getElementById("fixed_value");
   temp.disabled = true;
   temp.value = "";
}

function EnableFixedSeed() {
   var temp = document.getElementById("fixed_value");
   temp.disabled = false;
   temp.value = 1;
}

async function LoadFile(path) {
   let response = await fetch(path);
   let buffer = await response.arrayBuffer();
   return new Uint8Array(buffer);
}

async function RandomizeRom(gameModeName) {
   let gameMode = game_modes.find((mode) => mode.name == gameModeName);

   if (gameMode == null) {
      alert("Selected Game Mode is currently unsupported for web generation.");
      return;
   }

   var theSeed = 0;
   let fixedSeed = document.getElementById("fixed").checked;
   var fixedValueInput = document.getElementById("fixed_value");
   var minValue = 1;
   var maxValue = 999999;

   if (fixedSeed) {
      var fixedValue = Number(fixedValueInput.value);

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
      var randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);

      let numSeeds = maxValue - minValue + 1;
      let modSeed = randomArray[0] % numSeeds;
      theSeed = minValue + modSeed;
   }

   let logic = new MajorMinorLogic(theSeed, locations);

   const seedData = logic.placeItems(items);

   if (seedData == null) {
      alert("Failed to find data for seed " + theSeed);
      return;
   }

   // Apply the BPS patch associated with the game mode.
   var gamePatch = await BpsPatch.Load(gameMode.patch);
   var patchedBytes = gamePatch.Apply(vanillaBytes);

   // Adjust the item locations based on the seed.
   await ApplySeedData(patchedBytes, seedData);

   // Save the new file on the local system.
   saveAs(
      new Blob([patchedBytes]),
      gameMode.prefix + theSeed.toString().padStart(6, "0") + ".sfc"
   );
}

function RandomizeRomFromCombo() {
   let gameModeName = document.getElementById("game_mode").value;
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
         let randoBtn = document.getElementById("randomize");
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
