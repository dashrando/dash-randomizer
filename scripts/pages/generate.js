import RandomizeRom from '../lib/randomize';
import { saveAs } from 'file-saver';
import vanillaROM, { clearVanillaRom } from '../lib/vanilla/storage';
import inputVanillaRom from '../lib/vanilla/input';

let vanillaBytes = null;

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

const updatePermalink = (seed, mode) => {
   const permalink = `${window.location.origin}/seed.html?seed=${seed}&mode=${mode}`;
   const permalinkEl = document.getElementById('seed-permalink');
   permalinkEl.innerHTML = `<a href="${permalink}">${permalink}</a>`;
}

const getOptions = () => {
   const options = {};

   // Enable or disable item fanfares.
   const fanfare_options = document.getElementsByName("fanfare_mode");
   fanfare_options.forEach((i) => {
      if (i.checked && i.value == "Off") {
         options.DisableFanfare = 1;
      }
   });
   return options;
}

async function GetRandomizedRom() {
   const seed = getSeed();
   const mode = document.getElementById("game_mode").value
   const options = getOptions();
   const config = { vanillaBytes }
   const { data, name } = await RandomizeRom(seed, mode, options, config);

   // Save the new file on the local system.
   saveAs(new Blob([data]), name);
   updatePermalink(seed, mode)
   document.getElementById('permalink-container').classList.add('visible');
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
 
 document.addEventListener('vanillaRom:cleared', (_evt) => {
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

  document.addEventListener('seed:fixed', (evt) => {
      const fixed = evt.detail.fixed
      const el = document.getElementById('fixed_value')
      if (fixed) {
         el.disabled = false
         el.value = el.value || 1
      } else {
         el.disabled = true
         el.value = null
      }
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

   const fixedSeedEl = document.getElementById('fixed')
   fixedSeedEl.addEventListener('click', (_evt) => {
      const evt = new CustomEvent('seed:fixed', { detail: { fixed: true } })
      document.dispatchEvent(evt)
   })

   const randomSeedEl = document.getElementById('random')
   randomSeedEl.addEventListener('click', (_evt) => {
      const evt = new CustomEvent('seed:fixed', { detail: { fixed: false } })
      document.dispatchEvent(evt)
   })

   const randoEl = document.getElementById('randomize_button')
   randoEl.addEventListener('click', (evt) => {
      evt.preventDefault()
      GetRandomizedRom()
   })

  new vanillaROM()
}

document.addEventListener('DOMContentLoaded', setupUI)
