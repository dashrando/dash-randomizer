const game_modes = [
   {
      name: "mm",
      prefix: "DASH_v11_SM_",
      patch: "patches/dash_mm.bps",
   },
   {
      name: "full",
      prefix: "DASH_v11_SF_",
      patch: "patches/dash_mm.bps",
   },
];

const encodeRepeating = (patch, offset, length, bytes) => {
   patch.push([offset, length, bytes]);
};

const encodeBytes = (patch, offset, bytes) => {
   encodeRepeating(patch, offset, 1, bytes);
};

const generateSeedPatch = (seedData) => {
   const spoilerStart = 0x2f5240;
   const spoilerEnd = spoilerStart + 0x80 * 16;
   const seedInfo = 0x2fff00;

   let seedPatch = [];
   encodeBytes(seedPatch, seedInfo, seedData.slice(0, 4));

   const items = getItems();
   const locations = getLocations();
   for (var i = 0; i < seedData.length - 4; i++) {
      const id = seedData[i + 4] & 0x7f;
      const loc = locations[i];
      const item = items.find((item) => item.id == id);

      const itemBytes = loc.GetItemBytes(item.code);
      encodeBytes(seedPatch, loc.address, itemBytes);

      if (id < 17) {
         const spoilerItem = spoilerStart + (id - 1) * 0x80;
         encodeBytes(seedPatch, spoilerItem, item.GetNameArray());

         const spoilerLocation = spoilerItem + 0x40;
         encodeBytes(seedPatch, spoilerLocation, loc.GetNameArray());
      }
   }

   encodeRepeating(seedPatch, spoilerEnd, 4, new Uint8Array([0]));
   return seedPatch;
};

const getFileName = (seed, prefix) =>
   prefix + seed.toString().padStart(6, "0") + ".sfc";

const patchRom = (vanillaRom, basePatch, seedPatch) => {
   let rom = basePatch.Apply(vanillaRom);

   seedPatch.forEach((p) => {
      const [off, cnt, pay] = p;

      for (let i = 0; i < cnt; i++) {
         rom.set(pay, off + i * pay.length);
      }
   });

   return rom;
};

const generateFromPreset = (preset) => {
   const timestamp = Math.floor(new Date().getTime() / 1000);
   const RNG = new DotNetRandom(timestamp);
   const seed = RNG.NextInRange(1, 1000000);
   let basePatchUrl = "";

   if (preset == "mm") {
      const gameMode = game_modes.find((mode) => mode.name == "mm");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      logic = new MajorMinorLogic(seed, getLocations());
   } else if (preset == "full") {
      const gameMode = game_modes.find((mode) => mode.name == "full");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      logic = new FullLogic(seed, getLocations());
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
   }

   const seedData = logic.placeItems(getItems());
   const seedPatch = generateSeedPatch(seedData);
   const fileName = getFileName(seed, fileNamePrefix);

   return [basePatchUrl, seedPatch, fileName];
};
