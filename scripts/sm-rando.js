const game_modes = [
   {
      name: "mm",
      prefix: "DASH_v11r_SM_",
      patch: "patches/dash_std.bps",
      mask: 0x11,
      title: "Standard - Major / Minor",
   },
   {
      name: "full",
      prefix: "DASH_v11r_SF_",
      patch: "patches/dash_std.bps",
      mask: 0x21,
      title: "Standard - Full",
   },
   {
      name: "rm",
      prefix: "DASH_v11r_RM_",
      patch: "patches/dash_working.bps",
      mask: 0x12,
      title: "Recall - Major / Minor",
   },
   {
      name: "rf",
      prefix: "DASH_v11r_RF_",
      patch: "patches/dash_working.bps",
      mask: 0x22,
      title: "Recall - Full",
   },
];

const generateSeedPatch = (seed, gameMode, nodes, options) => {
   //-----------------------------------------------------------------
   // Utility functions.
   //-----------------------------------------------------------------

   const encodeRepeating = (patch, offset, length, bytes) => {
      patch.push([offset, length, bytes]);
   };

   const encodeBytes = (patch, offset, bytes) => {
      encodeRepeating(patch, offset, 1, bytes);
   };

   const U16toBytes = (u16) => {
      return new Uint8Array(new Uint16Array([u16]).buffer);
   };

   const U32toBytes = (u32) => {
      return new Uint8Array(new Uint32Array([u32]).buffer);
   };

   //-----------------------------------------------------------------
   // Encode the seed to show on the file select screen.
   //-----------------------------------------------------------------

   let seedPatch = [];
   let seedFlags = gameMode.mask;
   const rnd = new DotNetRandom(seed);
   encodeBytes(seedPatch, 0x2f8000, U16toBytes(rnd.Next(0xffff)));
   encodeBytes(seedPatch, 0x2f8002, U16toBytes(rnd.Next(0xffff)));

   //-----------------------------------------------------------------
   // Write the items at the appropriate locations.
   //-----------------------------------------------------------------

   nodes.forEach((n) => {
      const itemBytes = n.location.GetItemBytes(n.item.type);
      encodeBytes(seedPatch, n.location.address, itemBytes);
   });

   //-----------------------------------------------------------------
   // Write area item counts.
   //-----------------------------------------------------------------

   const mapArea = (a) => {
      if (a == Area.BlueBrinstar) {
         return Area.Crateria;
      } else if (a == Area.GreenBrinstar) {
         return Area.PinkBrinstar;
      } else {
         return a;
      }
   };

   eTanks = nodes
      .filter((n) => n.item.type == Item.EnergyTank)
      .map((n) => mapArea(n.location.area));

   majors = nodes
      .filter(
         (n) =>
            n.item.isMajor &&
            n.item.type != Item.EnergyTank &&
            n.item.type != Item.Reserve
      )
      .map((n) => mapArea(n.location.area));

   AreaCounts.forEach((addr, area) => {
      const numTanks = eTanks.filter((p) => p == area).length;
      const numMajors = majors.filter((p) => p == area).length;
      encodeBytes(seedPatch, addr, new Uint8Array([numTanks, numMajors]));
   });

   //-----------------------------------------------------------------
   // Write the spoiler in the credits.
   //-----------------------------------------------------------------

   const sortedLocations = getLocations().sort((a, b) => a.address - b.address);

   nodes
      .filter((n) => n.item.spoilerAddress > 0)
      .forEach((n) => {
         locIndex = sortedLocations.findIndex(
            (l) => l.address == n.location.address
         );
         encodeBytes(
            seedPatch,
            n.item.spoilerAddress,
            U16toBytes(locIndex + 1)
         );
      });

   //-----------------------------------------------------------------
   // Other options.
   //-----------------------------------------------------------------

   if (options != null) {
      encodeBytes(seedPatch, 0x2f8b0b, U16toBytes(options.DisableFanfare));
      seedFlags |= options.DisableFanfare ? 0x0100 : 0x0000;
   }

   //-----------------------------------------------------------------
   // Encode seed flags from the website.
   //-----------------------------------------------------------------

   encodeBytes(seedPatch, 0x2f8b00, U32toBytes(seedFlags));

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

   if (preset == "std_mm") {
      gameMode = game_modes.find((mode) => mode.name == "mm");
      mode = new ModeStandard(seed, getLocations());
      getPrePool = getMajorMinorPrePool;
      canPlaceItem = isValidMajorMinor;
   } else if (preset == "std_full") {
      gameMode = game_modes.find((mode) => mode.name == "full");
      mode = new ModeStandard(seed, getLocations());
      getPrePool = getFullPrePool;
      canPlaceItem = isEmptyNode;
   } else if (preset == "mm" || preset == "recall_mm") {
      gameMode = game_modes.find((mode) => mode.name == "rm");
      mode = new ModeRecall(seed, getLocations());
      getPrePool = getMajorMinorPrePool;
      canPlaceItem = isValidMajorMinor;
   } else if (preset == "full" || preset == "recall_full") {
      gameMode = game_modes.find((mode) => mode.name == "rf");
      mode = new ModeRecall(seed, getLocations());
      getPrePool = getFullPrePool;
      canPlaceItem = isEmptyNode;
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
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

   const seedPatch = generateSeedPatch(seed, gameMode, mode.nodes, null);
   const fileName = getFileName(seed, gameMode.prefix, null);

   return [gameMode.patch, seedPatch, fileName];
};
