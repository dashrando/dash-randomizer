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
   {
      name: "rm",
      prefix: "DASH_v11_RM_",
      patch: "patches/dash_working.bps",
   },
   {
      name: "rf",
      prefix: "DASH_v11_RF_",
      patch: "patches/dash_working.bps",
   },
];

const encodeRepeating = (patch, offset, length, bytes) => {
   patch.push([offset, length, bytes]);
};

const encodeBytes = (patch, offset, bytes) => {
   encodeRepeating(patch, offset, 1, bytes);
};

const generateSeedPatch = (seed, nodes) => {
   const spoilerStart = 0x2f5240;
   const spoilerEnd = spoilerStart + 0x80 * 16;
   const seedInfo = 0x2fff00;

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

   encodeBytes(seedPatch, seedInfo, seedData);

   for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      const itemBytes = node.location.GetItemBytes(node.item.code);
      encodeBytes(seedPatch, node.location.address, itemBytes);

      if (node.item.id < 17) {
         const spoilerItem = spoilerStart + (node.item.id - 1) * 0x80;
         encodeBytes(seedPatch, spoilerItem, node.item.GetNameArray());

         const spoilerLocation = spoilerItem + 0x40;
         encodeBytes(seedPatch, spoilerLocation, node.location.GetNameArray());
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
      mode = new ModeStandard(seed, getItems(), getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "full") {
      const gameMode = game_modes.find((mode) => mode.name == "full");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      mode = new ModeStandard(seed, getItems(), getLocations());
      logic = new FullLogic(seed, mode.nodes);
   } else if (preset == "recall_mm") {
      const gameMode = game_modes.find((mode) => mode.name == "rm");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      mode = new ModeRecall(seed, getItems(), getLocations());
      logic = new MajorMinorLogic(seed, mode.nodes);
   } else if (preset == "recall_full") {
      const gameMode = game_modes.find((mode) => mode.name == "rf");
      basePatchUrl = gameMode.patch;
      fileNamePrefix = gameMode.prefix;
      mode = new ModeRecall(seed, getItems(), getLocations());
      logic = new FullLogic(seed, mode.nodes);
   } else {
      console.log("UNKNOWN PRESET: " + preset);
      return ["", null, ""];
   }

   logic.placeItems(mode.itemPool);
   const seedPatch = generateSeedPatch(seed, logic.nodes);
   const fileName = getFileName(seed, fileNamePrefix);

   return [basePatchUrl, seedPatch, fileName];
};
