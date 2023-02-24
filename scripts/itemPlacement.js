//-----------------------------------------------------------------
// Checks if a node is empty.
//-----------------------------------------------------------------

const isEmptyNode = (_, node) => node.item == undefined;

//-----------------------------------------------------------------
// Checks if an item is allowed at the specified node in M/M.
//-----------------------------------------------------------------

const isValidMajorMinor = (item, node) => {
   if (!isEmptyNode(item, node)) {
      return false;
   }
   if (item.isMajor != node.isMajor) {
      return false;
   }
   if (item.type == Item.Gravity) {
      if (node.location.area == Area.Crateria) {
         return false;
      }
   } else if (item.type == Item.Varia) {
      if (
         node.location.area == Area.LowerNorfair ||
         node.location.area == Area.Crateria
      ) {
         return false;
      }
   } else {
      return true;
   }

   switch (node.location.address) {
      case 0x786de: // Morphing Ball
      case 0x78798: // Missiles (Beta)
      case 0x7879e: // Energy Tank (Brinstar Ceiling)
         return false;
      default:
         return true;
   }
};

//-----------------------------------------------------------------
// Generates the default prefill pool for Full seeds.
//-----------------------------------------------------------------

const getFullPrePool = (rnd) => {
   prePool = [Item.Morph];

   if (rnd.Next(100) < 65) {
      prePool.push(Item.Missile);
   } else {
      prePool.push(Item.Super);
   }

   switch (rnd.Next(13)) {
      case 0:
         prePool.push(Item.Missile, Item.ScrewAttack);
         break;
      case 1:
         prePool.push(Item.Missile, Item.Speed);
         break;
      case 2:
         prePool.push(Item.Missile, Item.Bombs);
         break;
      default:
         break;
   }

   prePool.push(Item.PowerBomb);

   return prePool;
};

//-----------------------------------------------------------------
// Generates the default prefill pool for M/M seeds.
//-----------------------------------------------------------------

const getMajorMinorPrePool = (rnd) => {
   prePool = [Item.Morph];

   if (rnd.Next(100) < 65) {
      prePool.push(Item.Missile);
   } else {
      prePool.push(Item.Super);
   }

   switch (rnd.Next(13)) {
      case 0:
         prePool.push(Item.Speed);
         break;
      case 1:
      case 2:
         prePool.push(Item.ScrewAttack);
         break;
      case 3:
      case 4:
      case 5:
      case 6:
         prePool.push(Item.Bombs);
         break;
      default:
         prePool.push(Item.PowerBomb);
         break;
   }

   return prePool;
};

//-----------------------------------------------------------------
// Places items in random locations and verifies the seed.
//-----------------------------------------------------------------

const performVerifiedFill = (
   seed,
   nodes,
   itemPool,
   getPrePool,
   initLoad,
   canPlaceItem
) => {
   const rnd = new DotNetRandom(seed);

   //-----------------------------------------------------------------
   // Utility routines for shuffling arrays.
   //-----------------------------------------------------------------

   const swap = (arr, x, y) => {
      const tmp = arr[x];
      arr[x] = arr[y];
      arr[y] = tmp;
   };

   const shuffle = (arr) => {
      for (let i = 0; i < arr.length; i++) {
         swap(arr, i, rnd.NextInRange(i, arr.length));
      }
   };

   //-----------------------------------------------------------------
   // Shuffle item locations.
   //-----------------------------------------------------------------

   let shuffledLocations = [...nodes];
   shuffle(shuffledLocations);

   //-----------------------------------------------------------------
   // Prefill locations with early items.
   //-----------------------------------------------------------------

   let prefillLoadout = initLoad.clone();

   getPrePool(rnd).forEach((itemType) => {
      const itemIndex = itemPool.findIndex((i) => i.type == itemType);
      const item = itemPool.splice(itemIndex, 1)[0];
      const available = shuffledLocations.find(
         (n) => n.available(prefillLoadout) && canPlaceItem(item, n)
      );

      available.SetItem(item);
      prefillLoadout.add(itemType);
   });

   //-----------------------------------------------------------------
   // Utility routine for placing items.
   //-----------------------------------------------------------------

   const placeItems = (itemPool, nodes) => {
      //-----------------------------------------------------------------
      // Create a shuffled list of items to place.
      //-----------------------------------------------------------------

      let shuffledItems = [...itemPool];
      shuffle(shuffledItems);

      //-----------------------------------------------------------------
      // Blindly place items in valid locations.
      //-----------------------------------------------------------------

      for (let j = 0; j < nodes.length; j++) {
         let n = nodes[j];

         const itemIndex = shuffledItems.findIndex((i) => canPlaceItem(i, n));
         if (itemIndex < 0) {
            return false;
         }
         n.item = shuffledItems.splice(itemIndex, 1)[0];
      }
      return true;
   };

   //-----------------------------------------------------------------
   // Make a copy of the non-prefilled nodes.
   //-----------------------------------------------------------------

   const nonPrefilled = shuffledLocations.filter((n) => n.item == undefined);

   //-----------------------------------------------------------------
   // Randomly place items until seed is verified.
   //-----------------------------------------------------------------

   let attempts = 0;
   while (attempts < 100) {
      attempts += 1;

      nonPrefilled.forEach((n) => (n.item = undefined));

      if (!placeItems(itemPool, nonPrefilled)) {
         continue;
      }

      if (!verifyItemProgression(nodes, null)) {
         continue;
      }

      break;
   }
};

//-----------------------------------------------------------------
// Verify seed can be completed.
//-----------------------------------------------------------------

const verifyItemProgression = (nodes, log) => {
   let load = new Loadout();
   let copy = [...nodes];

   while (copy.length > 0) {
      const nodeIndex = copy.findIndex((n) => n.available(load));
      if (nodeIndex < 0) {
         return false;
      }
      const node = copy.splice(nodeIndex, 1)[0];
      if (log != null) {
         log.push({ item: node.item, location: node.location });
      }
      load.add(node.item.type);
   }

   return true;
};
