var vanillaBytes = null;

function DisableFixedSeed() {
    var temp = document.getElementById('fixed_value');
    temp.disabled = true;
    temp.value = "";
}

function EnableFixedSeed() {
    var temp = document.getElementById('fixed_value');
    temp.disabled = false;
    temp.value = 1000000;
}

async function LoadFile(path) {
  let response = await fetch(path);
  let buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function RandomizeRom() {
    let gameMode = document.getElementById("game_mode").value;
    let fixedSeed = document.getElementById("fixed").checked;
    var patchFile = null;
    var seedFile = null;
    var savePrefix = null;
    
    if (gameMode == "sgl20") {
        patchFile = 'patches/DASH_SGL20_seed.ips';
        seedFile = 'patches/sgl20.seeds.br';
        savePrefix = 'DASH_SGL20_';
    } else {
        alert("Selected Game Mode is currently unsupported for web generation.");
        return;
    }

    var theSeed = 0;
    var fixedValueInput = document.getElementById("fixed_value");
    var minValue = Number(fixedValueInput.min);
    var maxValue = Number(fixedValueInput.max);

    if (fixedSeed) {
        var fixedValue = Number(fixedValueInput.value);

        if (!Number.isInteger(fixedValue) || fixedValue < minValue || fixedValue > maxValue) {
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

    var gamePatch = await IpsPatch.Load(patchFile);
    var patchedBytes = gamePatch.Apply(vanillaBytes);

    var seedData = await GetSeedData(seedFile,theSeed);
    await ApplySeedData(patchedBytes,seedData);
    saveAs(new Blob([patchedBytes]), savePrefix + theSeed + '.sfc');
}

function ToHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

function VerifyVanillaRom() {
  let vanillaRomInput = document.getElementById("vanilla-rom");
  let vanillaRom = vanillaRomInput.files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(vanillaRom);

  reader.onload = async function () {
    let check = await window.crypto.subtle.digest('SHA-256', reader.result);
    if (ToHexString(new Uint8Array(check)) == "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72") {
        let randoBtn = document.getElementById("randomize");
        randoBtn.disabled = false;
        vanillaRomInput.disabled = true;
        vanillaBytes = new Uint8Array(reader.result);
    } else {
        alert('Vanilla Rom does not match checksum.');
        vanillaRomInput.value = '';
    }
  };

  reader.onerror = function () {
    alert('Failed to load file.');
  };
}