const game_modes = [
   {
      name: "mm",
      prefix: "DASH_v11_SM_",
      patch: "patches/dash_mm.bps",
   },
];

function ApplySeedData(bytes, seedArray) {
   bytes[0x2fff00] = seedArray[0];
   bytes[0x2fff01] = seedArray[1];
   bytes[0x2fff02] = seedArray[2];
   bytes[0x2fff03] = seedArray[3];

   let sortedItems = items.sort((a, b) => {
      return a.id - b.id;
   });

   for (var i = 0; i < seedArray.length - 4; i++) {
      var id = seedArray[i + 4] & 0x7f;
      var item = sortedItems.find((item) => item.id == id);
      locations[i].SetItemCode(bytes, item.code);
   }

   var majors = sortedItems.filter((item) => item.id < 17);
   var addr = 0x2f5240;
   for (var i = 0; i < majors.length; i++) {
      var itemName = majors[i].GetNameArray();
      for (var j = 0; j < itemName.length; j++) {
         bytes[addr + j] = itemName[j];
      }
      addr += 0x40;

      var itemCode = majors[i].code;
      var loc = locations.find((loc) => loc.GetItemCode(bytes) == itemCode);
      var locName = loc.GetNameArray();
      for (var j = 0; j < locName.length; j++) {
         bytes[addr + j] = locName[j];
      }
      addr += 0x40;
   }

   bytes[addr] = 0;
   bytes[addr + 1] = 0;
   bytes[addr + 2] = 0;
   bytes[addr + 3] = 0;
}

const generateSeedPatch = (seedData) => seedData;

const getFileName = (seed, prefix) =>
   prefix + seed.toString().padStart(6, "0") + ".sfc";

const patchRom = (vanillaRom, basePatch, seedPatch) => {
   let rom = basePatch.Apply(vanillaRom);
   ApplySeedData(rom, seedPatch);
   return rom;
};

const generateFromPreset = (preset) => {
   const timestamp = Math.floor(new Date().getTime() / 10000);
   const RNG = new DotNetRandom(timestamp);
   const seed = RNG.NextInRange(1, 1000000);
   let basePatchUrl = "";

   if (preset == "mm") {
      const gameMode = game_modes.find((mode) => mode.name == "mm");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      logic = new MajorMinorLogic(seed, locations);
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
   }

   const seedData = logic.placeItems(items);
   const seedPatch = generateSeedPatch(seedData);
   const fileName = getFileName(seed, fileNamePrefix);

   return [basePatchUrl, seedPatch, fileName];
};
