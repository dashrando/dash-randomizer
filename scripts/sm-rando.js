const game_modes = [
   {
      name: "mm",
      prefix: "DASH_v11h_SM_",
      patch: "patches/dash_std.bps",
      seedAddress: 0x2f8000,
      writeName: false,
   },
   {
      name: "full",
      prefix: "DASH_v11h_SF_",
      patch: "patches/dash_std.bps",
      seedAddress: 0x2f8000,
      writeName: false,
   },
   {
      name: "rm",
      prefix: "DASH_v11h_RM_",
      patch: "patches/dash_working.bps",
      seedAddress: 0x2f8000,
      writeName: false,
   },
   {
      name: "rf",
      prefix: "DASH_v11h_RF_",
      patch: "patches/dash_working.bps",
      seedAddress: 0x2f8000,
      writeName: false,
   },
];

const encodeRepeating = (patch, offset, length, bytes) => {
   patch.push([offset, length, bytes]);
};

const encodeBytes = (patch, offset, bytes) => {
   encodeRepeating(patch, offset, 1, bytes);
};

const generateSeedPatch = (seed, gameMode, nodes, options) => {
   //-----------------------------------------------------------------
   // Utility functions.
   //-----------------------------------------------------------------

   const U16toBytes = (u16) => {
      return new Uint8Array([u16 & 0xff, (u16 >> 8) & 0xff]);
   };

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
      const itemBytes = n.location.GetItemBytes(n.item.type);
      encodeBytes(seedPatch, n.location.address, itemBytes);
   });

   //-----------------------------------------------------------------
   // Write the spoiler in the credits.
   //-----------------------------------------------------------------

   nodes
      .filter((n) => n.item.spoilerAddress > 0)
      .forEach((n) => {
         if (gameMode.writeName) {
            const spoilerItem = n.item.spoilerAddress - 0x40;
            encodeBytes(seedPatch, spoilerItem, itemNameToBytes(n.item.name));
         }

         encodeBytes(
            seedPatch,
            n.item.spoilerAddress,
            n.location.GetNameArray()
         );
      });

   //-----------------------------------------------------------------
   // Other options.
   //-----------------------------------------------------------------

   if (options != null) {
      encodeBytes(seedPatch, 0x2f8b0b, U16toBytes(options.DisableFanfare));
   }

   return seedPatch;
};

const getFileName = (seed, prefix, options) => {
   let fileName = prefix + seed.toString().padStart(6, "0");

   if (options != null) {
      if (options.DisableFanfare == 1) {
         fileName += "_no_fan";
      }
   }

   return fileName + ".sfc";
};

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
      mode = new ModeStandard(seed, getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "full") {
      gameMode = game_modes.find((mode) => mode.name == "full");
      mode = new ModeStandard(seed, getLocations());
      logic = new FullLogic(seed, mode.nodes);
      /*} else if (preset == "recall_mm") {
      gameMode = game_modes.find((mode) => mode.name == "rm");
      mode = new ModeRecall(seed, getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "recall_full") {
      gameMode = game_modes.find((mode) => mode.name == "rf");
      mode = new ModeRecall(seed, getLocations());
      logic = new FullLogic(seed, mode.nodes);*/
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
   }

   logic.placeItems(mode.itemPool);
   const seedPatch = generateSeedPatch(seed, gameMode, logic.nodes, null);
   const fileName = getFileName(seed, gameMode.prefix, null);

   return [gameMode.patch, seedPatch, fileName];
};
