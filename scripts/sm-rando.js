const game_modes = [
   {
      name: "mm",
      prefix: "DASH_v11_SM_",
      patch: "patches/dash_mm.bps",
      seedAddress: 0x2fff00,
      spoilerAddress: 0x2f5240,
      spoilerSize: 2048,
   },
   {
      name: "full",
      prefix: "DASH_v11_SF_",
      patch: "patches/dash_mm.bps",
      seedAddress: 0x2fff00,
      spoilerAddress: 0x2f5240,
      spoilerSize: 2048,
   },
   {
      name: "rm",
      prefix: "DASH_v11_RM_",
      patch: "patches/dash_working.bps",
      seedAddress: 0x2f8000,
      spoilerAddress: 0x0,
      spoilerSize: 0,
   },
   {
      name: "rf",
      prefix: "DASH_v11_RF_",
      patch: "patches/dash_working.bps",
      seedAddress: 0x2f8000,
      spoilerAddress: 0x0,
      spoilerSize: 0,
   },
];

const encodeRepeating = (patch, offset, length, bytes) => {
   patch.push([offset, length, bytes]);
};

const encodeBytes = (patch, offset, bytes) => {
   encodeRepeating(patch, offset, 1, bytes);
};

const generateSeedPatch = (seed, gameMode, nodes) => {
   //-----------------------------------------------------------------
   // Encode the seed to show on the file select screen.
   //-----------------------------------------------------------------

   let seedPatch = [];
   const rnd = new DotNetRandom(seed);
   const seedInfo1 = rnd.Next(0xffff);
   const seedInfo2 = rnd.Next(0xffff);

   const seedData = new Uint8Array([
      seedInfo1 & 0xff,
      (seedInfo1 >> 8) & 0xff,
      seedInfo2 & 0xff,
      (seedInfo2 >> 8) & 0xff,
   ]);

   encodeBytes(seedPatch, gameMode.seedAddress, seedData);

   //-----------------------------------------------------------------
   // Write the items at the appropriate locations.
   //-----------------------------------------------------------------

   nodes.forEach((n) => {
      const itemBytes = n.location.GetItemBytes(n.item.code);
      encodeBytes(seedPatch, n.location.address, itemBytes);
   });

   //-----------------------------------------------------------------
   // Write the spoiler in the credits.
   //-----------------------------------------------------------------

   if (gameMode.spoilerAddress > 0) {
      const encodeItemSpoiler = (item, location, pos) => {
         const spoilerItem = gameMode.spoilerAddress + pos * 0x80;
         encodeBytes(seedPatch, spoilerItem, item.GetNameArray());

         const spoilerLocation = spoilerItem + 0x40;
         encodeBytes(seedPatch, spoilerLocation, location.GetNameArray());
      };
      nodes
         .filter((n) => n.item.inSpoiler)
         .forEach((n) => {
            encodeItemSpoiler(n.item, n.location, n.item.id - 1);
         });
      encodeRepeating(
         seedPatch,
         gameMode.spoilerAddress + gameMode.spoilerSize,
         4,
         new Uint8Array([0])
      );
   }
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
   let gameMode = null;

   if (preset == "mm") {
      gameMode = game_modes.find((mode) => mode.name == "mm");
      mode = new ModeStandard(seed, getItems(), getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "full") {
      gameMode = game_modes.find((mode) => mode.name == "full");
      mode = new ModeStandard(seed, getItems(), getLocations());
      logic = new FullLogic(seed, mode.nodes);
   } else if (preset == "recall_mm") {
      gameMode = game_modes.find((mode) => mode.name == "rm");
      mode = new ModeRecall(seed, getItems(), getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "recall_full") {
      gameMode = game_modes.find((mode) => mode.name == "rf");
      mode = new ModeRecall(seed, getItems(), getLocations());
      logic = new FullLogic(seed, mode.nodes);
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
   }

   logic.placeItems(mode.itemPool);
   const seedPatch = generateSeedPatch(seed, gameMode, logic.nodes);
   const fileName = getFileName(seed, gameMode.prefix);

   return [gameMode.patch, seedPatch, fileName];
};
