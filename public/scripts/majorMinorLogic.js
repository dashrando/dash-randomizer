//-----------------------------------------------------------------
// Class to randomize items using Major / Minor logic.
//-----------------------------------------------------------------

class MajorMinorLogic {
   nodes = [];

   constructor(seed, nodes) {
      this.seed = seed;
      this.nodes = nodes;
   }

   canPlaceAtLocation(item, node) {
      if (node.item != undefined) {
         return false;
      }
      if (item.isMajor != node.isMajor) {
         return false;
      }
      const notFirstThree = (node) => {
         const name = node.location.name;
         return (
            name != "Morphing Ball" &&
            name != "Missiles (Beta)" &&
            name != "Energy Tank (Brinstar Ceiling)"
         );
      };
      const area = node.location.area;
      if (item.type == Item.Gravity) {
         if (area == Area.Crateria) {
            return false;
         }
         return notFirstThree(node);
      } else if (item.type == Item.Varia) {
         if (area == Area.LowerNorfair || area == Area.Crateria) {
            return false;
         }
         return notFirstThree(node);
      }
      return true;
   }

   //-----------------------------------------------------------------
   // Method that places all items in random locations.
   //-----------------------------------------------------------------

   placeItems(itemPool) {
      const rnd = new DotNetRandom(this.seed);

      //-----------------------------------------------------------------
      // Skip two draws to align the random number generator.
      //-----------------------------------------------------------------

      rnd.Next(7);
      rnd.Next(7);

      //-----------------------------------------------------------------
      // Routine used to place the early progression items.
      //-----------------------------------------------------------------

      let prefillLoadout = new Loadout();
      prefillLoadout.hasCharge = true; // TODO: Populate based on flags

      let prefill = (itemType) => {
         const itemIndex = itemPool.findIndex((i) => i.type == itemType);
         const item = itemPool.splice(itemIndex, 1)[0];

         const available = this.nodes.filter(
            (n) =>
               n.available(prefillLoadout) && this.canPlaceAtLocation(item, n)
         );

         const index = rnd.Next(available.length);
         available[index].SetItem(item);
         prefillLoadout.add(itemType);
      };

      //-----------------------------------------------------------------
      // Prefill locations with early items.
      //-----------------------------------------------------------------

      prefill(Item.Morph);

      if (rnd.Next(100) < 65) {
         prefill(Item.Missile);
      } else {
         prefill(Item.Super);
      }

      switch (rnd.Next(13)) {
         case 0:
            prefill(Item.Speed);
            break;
         case 1:
         case 2:
            prefill(Item.ScrewAttack);
            break;
         case 3:
         case 4:
         case 5:
         case 6:
            prefill(Item.Bombs);
            break;
         default:
            prefill(Item.PowerBomb);
            break;
      }

      if (prefillLoadout.superPacks < 1) {
         prefill(Item.Super);
      }

      if (prefillLoadout.powerPacks < 1) {
         prefill(Item.PowerBomb);
      }

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
      // Shuffle major locations.
      //-----------------------------------------------------------------

      let shuffledLocations = this.nodes.filter((n) => n.isMajor);
      shuffle(shuffledLocations);

      //-----------------------------------------------------------------
      // Give extra weighting to certain areas.
      //-----------------------------------------------------------------

      let num = 100;
      shuffledLocations.forEach((n) => {
         n.sortWeight = num - n.GetWeight();
         num += 10;
      });

      shuffledLocations.sort((a, b) => {
         return a.sortWeight - b.sortWeight;
      });

      //-----------------------------------------------------------------
      // Shuffle items.
      //-----------------------------------------------------------------

      let shuffledItems = itemPool;
      shuffle(shuffledItems);

      //-----------------------------------------------------------------
      // Move a random suit to the front of the list to be placed first.
      //-----------------------------------------------------------------

      const firstSuit = rnd.Next(2) == 0 ? Item.Varia : Item.Gravity;
      const suitIndex = shuffledItems.findIndex((i) => i.type == firstSuit);
      shuffledItems.unshift(shuffledItems.splice(suitIndex, 1)[0]);

      //-----------------------------------------------------------------
      // Routine that computes the assumed loadout that will be
      // available given the prefilled items and the remaining
      // shuffled items. Used when placing progression items.
      //-----------------------------------------------------------------

      const getAssumedLoadout = () => {
         let itemLocations = this.nodes.filter((n) => n.item != undefined);

         let assumedLoadout = prefillLoadout.clone();
         shuffledItems.forEach((i) => assumedLoadout.add(i.type));

         let accessibleNodes = itemLocations.filter((n) => {
            return n.available(assumedLoadout);
         });

         accessibleNodes.forEach((n) => assumedLoadout.add(n.item.type));
         return assumedLoadout;
      };

      //-----------------------------------------------------------------
      // Place progression items.
      //-----------------------------------------------------------------

      let firstProgression;
      while (
         0 <=
         (firstProgression = shuffledItems.findIndex((p) => p.isProgression))
      ) {
         let item = shuffledItems.splice(firstProgression, 1)[0];

         const assumedLoadout = getAssumedLoadout();

         let firstLocation = shuffledLocations.find(
            (n) =>
               n.available(assumedLoadout) && this.canPlaceAtLocation(item, n)
         );
         firstLocation.SetItem(item);
      }

      //-----------------------------------------------------------------
      // Place the rest of the items in the pool.
      //-----------------------------------------------------------------

      const getCurrentLoadout = () => {
         let current = new Loadout();
         this.nodes.forEach((n) => {
            if (n.item != undefined) {
               current.add(n.item.type);
            }
         });
         return current;
      };

      const getAvailableLocations = (load) => {
         return this.nodes.filter(
            (n) => n.item == undefined && n.available(load)
         );
      };

      const checkItem = (item) => {
         let current = getCurrentLoadout();
         let oldLocations = getAvailableLocations(current);

         if (!oldLocations.some((n) => this.canPlaceAtLocation(item, n))) {
            return false;
         }

         current.add(item.type);
         let newLocations = getAvailableLocations(current);

         if (newLocations.length <= oldLocations.length) {
            return false;
         }

         return newLocations.some((n) => n.isMajor);
      };

      const getPossibleItems = () => {
         return itemPool.filter((i) => checkItem(i));
      };

      const placeItem = () => {
         let possibleItems = getPossibleItems();

         const selectItem = () => {
            if (possibleItems.length == 0) {
               return itemPool[rnd.Next(itemPool.length)];
            }
            return possibleItems[rnd.Next(possibleItems.length)];
         };

         let item = selectItem();
         let availableLocations = getAvailableLocations(
            getCurrentLoadout()
         ).filter((n) => this.canPlaceAtLocation(item, n));

         const locationIndex = rnd.Next(availableLocations.length);
         availableLocations[locationIndex].SetItem(item);
         return item;
      };

      while (itemPool.length > 0) {
         const item = placeItem();
         const itemIndex = itemPool.findIndex((i) => i == item);
         itemPool.splice(itemIndex, 1);
      }
   }
}
