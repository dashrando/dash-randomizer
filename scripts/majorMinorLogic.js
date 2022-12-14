//-----------------------------------------------------------------
// Class representing an item location for Major / Minor logic.
//-----------------------------------------------------------------

class Node {
   constructor(location, isMajor, available) {
      this.location = location;
      this.isMajor = isMajor;
      this.sortWeight = 0;
      this.available = available;
      this.item = undefined;
   }
   GetWeight() {
      if (this.location.area == Area.LowerNorfair) {
         return 11;
      } else if (this.location.area == Area.WreckedShip) {
         return 12;
      }
      return 0;
   }
   SetItem(item) {
      this.item = item;
   }
}

//-----------------------------------------------------------------
// Class to randomize items using Major / Minor logic.
//-----------------------------------------------------------------

class MajorMinorLogic {
   nodes = [];

   constructor(seed, locations) {
      this.seed = seed;
      this.setupNodes(locations);
   }

   getSeedData() {
      let seedData = new Uint8Array(104);

      const rnd = new DotNetRandom(this.seed);
      const seedInfo1 = rnd.Next(0xffff);
      const seedInfo2 = rnd.Next(0xffff);

      seedData[0] = seedInfo1 & 0xff;
      seedData[1] = (seedInfo1 >> 8) & 0xff;
      seedData[2] = seedInfo2 & 0xff;
      seedData[3] = (seedInfo2 >> 8) & 0xff;

      for (let i = 0; i < locations.length; i++) {
         const node = this.nodes.find((n) => n.location == locations[i]);
         seedData[4 + i] = node.item.id;
      }

      return seedData;
   }

   isMajor(item) {
      return item.id < 19;
   }

   isProgression(item) {
      switch (item.id) {
         case 3:
         case 6:
         case 15:
         case 18:
         case 19:
         case 20:
         case 21:
            return false;
         default:
            return true;
      }
   }

   canPlaceAtLocation(item, node) {
      if (node.item != undefined) {
         return false;
      }
      if (this.isMajor(item) != node.isMajor) {
         return false;
      }
      const notFirstThree = (node) => {
         const name = node.location.name;
         return (
            name != "Morphing Ball" &&
            name != "Beta Missiles" &&
            name != "Energy Tank, Brinstar Ceiling"
         );
      };
      const area = node.location.area;
      if (item.name == "Gravity Suit") {
         if (area == Area.Crateria) {
            return false;
         }
         return notFirstThree(node);
      } else if (item.name == "Varia Suit") {
         if (area == Area.LowerNorfair || area == Area.Crateria) {
            return false;
         }
         return notFirstThree(node);
      } else if (item.name == "Speed Booster") {
         return notFirstThree(node);
      } else if (item.name == "Screw Attack") {
         return notFirstThree(node);
      }
      return true;
   }

   //-----------------------------------------------------------------
   // Method that places all items in random locations.
   //-----------------------------------------------------------------

   placeItems(items) {
      const rnd = new DotNetRandom(this.seed);

      //-----------------------------------------------------------------
      // Setup the pool of items that will be placed.
      //-----------------------------------------------------------------

      let itemPool = [...items];

      const setAmountInPool = (name, count) => {
         const item = items.find((i) => i.name == name);
         while (itemPool.filter((i) => i == item).length < count) {
            itemPool.unshift(item);
         }
      };

      const numSupers = 12 + rnd.Next(7);
      const numPBs = 14 + rnd.Next(7);
      const numMissiles = 66 - numSupers - numPBs;

      setAmountInPool("Reserve Tank", 4);
      setAmountInPool("Energy Tank", 14);
      setAmountInPool("Missile", numMissiles);
      setAmountInPool("Super Missile", numSupers);
      setAmountInPool("Power Bomb", numPBs);

      //-----------------------------------------------------------------
      // Routine used to place the early progression items.
      //-----------------------------------------------------------------

      let prefillLoadout = new Loadout();

      let prefill = (name) => {
         const itemIndex = itemPool.findIndex((i) => i.name == name);
         const item = itemPool.splice(itemIndex, 1)[0];

         const available = this.nodes.filter(
            (n) =>
               n.available(prefillLoadout) && this.canPlaceAtLocation(item, n)
         );

         const index = rnd.Next(available.length);
         available[index].SetItem(item);
         prefillLoadout.add(item.name);
      };

      //-----------------------------------------------------------------
      // Prefill locations with early items.
      //-----------------------------------------------------------------

      prefill("Morph Ball");

      if (rnd.Next(100) < 65) {
         prefill("Missile");
      } else {
         prefill("Super Missile");
      }

      switch (rnd.Next(13)) {
         case 0:
            prefill("Speed Booster");
            break;
         case 1:
         case 2:
            prefill("Screw Attack");
            break;
         case 3:
         case 4:
         case 5:
         case 6:
            prefill("Bomb");
            break;
         default:
            prefill("Power Bomb");
            break;
      }

      if (prefillLoadout.superPacks < 1) {
         prefill("Super Missile");
      }

      if (prefillLoadout.powerPacks < 1) {
         prefill("Power Bomb");
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

      const firstSuit = rnd.Next(2) == 0 ? "Varia Suit" : "Gravity Suit";
      const suitIndex = shuffledItems.findIndex((i) => i.name == firstSuit);
      shuffledItems.unshift(shuffledItems.splice(suitIndex, 1)[0]);

      //-----------------------------------------------------------------
      // Routine that computes the assumed loadout that will be
      // available given the prefilled items and the remaining
      // shuffled items. Used when placing progression items.
      //-----------------------------------------------------------------

      const getAssumedLoadout = () => {
         let itemLocations = this.nodes.filter((p) => p.item != undefined);

         let assumedLoadout = prefillLoadout.clone();
         shuffledItems.forEach((i) => assumedLoadout.add(i.name));

         let accessibleNodes = itemLocations.filter((p) => {
            return p.available(assumedLoadout);
         });

         accessibleNodes.forEach((n) => assumedLoadout.add(n.item.name));
         return assumedLoadout;
      };

      //-----------------------------------------------------------------
      // Place progression items.
      //-----------------------------------------------------------------

      let firstProgression;
      while (
         0 <=
         (firstProgression = shuffledItems.findIndex((p) =>
            this.isProgression(p)
         ))
      ) {
         let item = shuffledItems.splice(firstProgression, 1)[0];

         const assumedLoadout = getAssumedLoadout();

         let availableLocations = shuffledLocations.filter(
            (n) =>
               n.available(assumedLoadout) && this.canPlaceAtLocation(item, n)
         );

         availableLocations[0].SetItem(item);
      }

      //-----------------------------------------------------------------
      // Place the rest of the items in the pool.
      //-----------------------------------------------------------------

      const getCurrentLoadout = () => {
         let current = new Loadout();
         this.nodes.forEach((n) => {
            if (n.item != undefined) {
               current.add(n.item.name);
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

         current.add(item.name);
         let newLocations = getAvailableLocations(current);

         const canPlaceItem = (locations) => {
            return (
               undefined !=
               locations.find((n) => this.canPlaceAtLocation(item, n))
            );
         };

         if (!canPlaceItem(oldLocations)) {
            return false;
         }

         if (undefined == newLocations.find((n) => n.isMajor)) {
            return false;
         }

         if (newLocations.length <= oldLocations.length) {
            return false;
         }

         return true;
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

      return this.getSeedData();
   }

   //-----------------------------------------------------------------
   // Method sets up the logic required to access the different
   // item locations.
   //-----------------------------------------------------------------

   setupNodes(locations) {
      //-----------------------------------------------------------------
      // Routines for registering item locations.
      //-----------------------------------------------------------------

      let add = (name, isMajor, available) => {
         let loc = locations.find((p) => p.name == name);
         this.nodes.push(new Node(loc, isMajor, available));
      };
      let major = (n, a) => add(n, true, a);
      let minor = (n, a) => add(n, false, a);

      //-----------------------------------------------------------------
      // Common logic used at item locations.
      //-----------------------------------------------------------------

      const canHellRun = (load) => {
         return load.totalTanks > 2 || load.hasVaria;
      };

      const canAccessRedBrinstar = (load) => {
         return (
            load.superPacks > 0 &&
            (load.canUsePowerBombs ||
               (load.canDestroyBombWalls && load.hasMorph))
         );
      };

      const canAccessHeatedNorfair = (load) => {
         return canAccessRedBrinstar(load) && canHellRun(load);
      };

      const canAccessLowerNorfair = (load) => {
         return (
            canAccessHeatedNorfair(load) &&
            load.canUsePowerBombs &&
            load.hasVaria &&
            (load.hasHiJump || load.hasGravity)
         );
      };

      const canPassWorstRoom = (load) => {
         return (
            canAccessLowerNorfair(load) &&
            (load.canFly ||
               load.hasHiJump ||
               load.hasSpringBall ||
               (load.hasIce && load.hasCharge))
         );
      };

      const canAccessKraid = (load) => {
         return canAccessRedBrinstar(load) && load.canPassBombPassages;
      };

      const canAccessCrocomire = (load) => {
         return (
            canAccessHeatedNorfair(load) ||
            (canAccessKraid(load) &&
               load.canUsePowerBombs &&
               load.hasSpeed &&
               load.totalTanks > 1)
         );
      };

      const canDoSuitlessMaridia = (load) => {
         return (
            load.hasHiJump &&
            load.hasGrapple &&
            (load.hasIce || load.hasSpringBall)
         );
      };

      const canDefeatBotwoon = (load) => {
         return (
            canAccessRedBrinstar(load) &&
            load.canUsePowerBombs &&
            (load.hasIce || load.hasSpeed) &&
            (load.hasGravity || (canDoSuitlessMaridia(load) && load.hasIce))
         );
      };

      const canDefeatDraygon = (load) => {
         return canDefeatBotwoon(load) && load.hasGravity;
      };

      const canAccessWreckedShip = (load) => {
         return load.canUsePowerBombs && load.superPacks > 0;
      };

      const canAccessOuterMaridia = (load) => {
         return (
            canAccessRedBrinstar(load) &&
            load.canUsePowerBombs &&
            (load.hasGravity ||
               (load.hasHiJump && (load.hasIce || load.hasSpringBall)))
         );
      };

      const canAccessInnerMaridia = (load) => {
         return (
            canAccessRedBrinstar(load) &&
            load.canUsePowerBombs &&
            load.hasGravity
         );
      };

      const canEnterAndLeaveGauntlet = (load) => {
         return (
            load.canUseBombs ||
            load.hasScrewAttack ||
            (load.canUsePowerBombs && load.powerPacks > 1) ||
            (load.hasSpeed && load.canUsePowerBombs && load.totalTanks > 1)
         );
      };

      //-----------------------------------------------------------------
      // Logic for each item location.
      //-----------------------------------------------------------------

      minor("Landing Site (PBs)", (load) => {
         return load.canUsePowerBombs && (load.hasSpeed || load.canFly);
      });

      minor("Ocean (Missiles)", (load) => {
         return canAccessWreckedShip(load);
      });

      minor("Sky (Missiles)", (load) => {
         return canAccessWreckedShip(load);
      });

      minor("Outside WS Middle (Missiles)", (load) => {
         return canAccessWreckedShip(load);
      });

      minor("Moat (Missiles)", (load) => {
         return canAccessWreckedShip(load);
      });

      major("Energy Tank, Gauntlet", (load) => {
         return canEnterAndLeaveGauntlet(load);
      });

      minor("Missile (Crateria Bottom)", (load) => {
         return load.canDestroyBombWalls;
      });

      major("Bomb", (load) => {
         return load.hasMorph && load.canOpenRedDoors;
      });

      major("Energy Tank, Terminator", (load) => {
         return load.canDestroyBombWalls || load.hasSpeed;
      });

      minor("Gauntlet Right (Missiles)", (load) => {
         return canEnterAndLeaveGauntlet(load) && load.canPassBombPassages;
      });

      minor("Gauntlet Left (Missiles)", (load) => {
         return canEnterAndLeaveGauntlet(load) && load.canPassBombPassages;
      });

      minor("Climb (Supers)", (load) => {
         return (
            load.canUsePowerBombs &&
            load.hasSpeed &&
            load.energyTanks > 1 &&
            load.totalTanks > 2
         );
      });

      minor("Missile (Crateria Middle)", (load) => {
         return load.canPassBombPassages;
      });

      minor("Etecoons (PBs)", (load) => {
         return load.canUsePowerBombs;
      });

      minor("Spo Spo (Supers)", (load) => {
         return load.canPassBombPassages && load.superPacks > 0;
      });

      minor("Early Supers Bridge", (load) => {
         return (
            load.canOpenRedDoors && (load.hasSpeed || load.canDestroyBombWalls)
         );
      });

      minor("Early Supers", (load) => {
         return (
            load.canOpenRedDoors &&
            (load.hasSpeed || load.canDestroyBombWalls) &&
            (load.hasMorph || load.hasSpeed)
         );
      });

      major("Reserve Tank, Brinstar", (load) => {
         return (
            load.canOpenRedDoors &&
            (load.hasSpeed || load.canDestroyBombWalls) &&
            (load.hasMorph || load.hasSpeed)
         );
      });

      minor("Brinstar Reserve 2 (Missiles)", (load) => {
         return load.canOpenRedDoors && load.canPassBombPassages;
      });

      minor("Brinstar Reserve 1 (Missiles)", (load) => {
         return (
            load.canOpenRedDoors && load.canDestroyBombWalls && load.hasMorph
         );
      });

      minor("Big Pink (Missiles)", (load) => {
         return (
            load.canUsePowerBombs ||
            (load.canOpenRedDoors &&
               (load.hasSpeed || load.canDestroyBombWalls))
         );
      });

      minor("Charge (Missiles)", (load) => {
         return (
            load.canUsePowerBombs ||
            (load.canOpenRedDoors &&
               (load.hasSpeed || load.canDestroyBombWalls))
         );
      });

      major("Charge Beam", (load) => {
         return (
            load.canUsePowerBombs ||
            (load.canOpenRedDoors && load.canPassBombPassages)
         );
      });

      minor("Mission Impossible (PBs)", (load) => {
         return load.canUsePowerBombs && load.superPacks > 0;
      });

      minor("Tube (Missiles)", (load) => {
         return (
            load.canUsePowerBombs ||
            (load.canPassBombPassages && load.canOpenGreenDoors)
         );
      });

      major("Morphing Ball", (load) => {
         return true;
      });

      minor("Blue PBs", (load) => {
         return load.canUsePowerBombs;
      });

      minor("Beta Missiles", (load) => {
         return load.hasMorph;
      });

      major("Energy Tank, Brinstar Ceiling", (load) => {
         return true;
      });

      major("Energy Tank, Etecoons", (load) => {
         return load.canUsePowerBombs;
      });

      minor("Etecoons (Supers)", (load) => {
         return load.canUsePowerBombs && load.canOpenGreenDoors;
      });

      major("Energy Tank, Waterway", (load) => {
         return load.canUsePowerBombs && load.canOpenRedDoors && load.hasSpeed;
      });

      minor("Alpha Missiles", (load) => {
         return load.hasMorph;
      });

      major("Energy Tank, Brinstar Gate", (load) => {
         return load.canUsePowerBombs && (load.hasWave || load.superPacks > 0);
      });

      minor("Billy Mays 1", (load) => {
         return load.canUsePowerBombs;
      });

      minor("Billy Mays 2", (load) => {
         return load.canUsePowerBombs;
      });

      major("Xray Scope", (load) => {
         return (
            canAccessRedBrinstar(load) &&
            load.canUsePowerBombs &&
            (load.hasGrapple ||
               load.hasSpaceJump ||
               load.totalTanks > 5 ||
               (load.hasVaria && load.totalTanks > 3))
         );
      });

      minor("Beta PBs", (load) => {
         return canAccessRedBrinstar(load) && load.canUsePowerBombs;
      });

      minor("Alpha PBs", (load) => {
         return canAccessRedBrinstar(load) && load.canUsePowerBombs;
      });

      minor("Alpha PBs (Missiles)", (load) => {
         return canAccessRedBrinstar(load) && load.canUsePowerBombs;
      });

      major("Spazer", (load) => {
         return canAccessRedBrinstar(load);
      });

      major("Energy Tank, Kraid", (load) => {
         return canAccessKraid(load);
      });

      minor("Kraid Missiles", (load) => {
         return canAccessKraid(load) && load.canUsePowerBombs;
      });

      major("Varia Suit", (load) => {
         return canAccessKraid(load);
      });

      minor("Cathedral Missiles", (load) => {
         return canAccessHeatedNorfair(load);
      });

      major("Ice Beam", (load) => {
         return canAccessKraid(load) && (load.hasVaria || load.totalTanks > 1);
      });

      minor("Southern Missiles", (load) => {
         return (
            canAccessKraid(load) && load.canUsePowerBombs && canHellRun(load)
         );
      });

      major("Energy Tank, Crocomire", (load) => {
         return canAccessCrocomire(load);
      });

      major("HiJump Boots", (load) => {
         return canAccessRedBrinstar(load);
      });

      minor("Croc Escape", (load) => {
         return (
            canAccessCrocomire(load) &&
            (load.canFly ||
               load.hasGrapple ||
               load.hasIce ||
               (load.hasHiJump && load.hasSpeed))
         );
      });

      minor("HJB (Missiles)", (load) => {
         return canAccessRedBrinstar(load);
      });

      minor("Energy Tank, Hi-Jump Boots", (load) => {
         return canAccessRedBrinstar(load);
      });

      minor("Croc PBs", (load) => {
         return canAccessCrocomire(load);
      });

      minor("Cosine Missiles", (load) => {
         return canAccessCrocomire(load);
      });

      minor("Indiana Jones", (load) => {
         return (
            canAccessCrocomire(load) &&
            (load.canFly || load.hasGrapple || load.hasSpeed)
         );
      });

      major("Grapple Beam", (load) => {
         return canAccessCrocomire(load);
      });

      major("Reserve Tank, Norfair", (load) => {
         return (
            canAccessHeatedNorfair(load) &&
            (load.canFly ||
               load.hasGrapple ||
               load.hasIce ||
               load.hasSpringBall ||
               load.hasHiJump)
         );
      });

      minor("Norfair Reserve 2 (Missiles)", (load) => {
         return (
            canAccessHeatedNorfair(load) &&
            (load.canFly ||
               load.hasGrapple ||
               load.hasIce ||
               load.hasSpringBall ||
               load.hasHiJump)
         );
      });

      minor("Norfair Reserve 1 (Missiles)", (load) => {
         return (
            canAccessHeatedNorfair(load) &&
            (load.canFly ||
               load.hasGrapple ||
               load.hasIce ||
               load.hasSpringBall ||
               load.hasHiJump)
         );
      });

      minor("Bubble Mountain Missiles", (load) => {
         return canAccessHeatedNorfair(load);
      });

      minor("Speed Missiles", (load) => {
         return canAccessHeatedNorfair(load);
      });

      major("Speed Booster", (load) => {
         return canAccessHeatedNorfair(load);
      });

      minor("Wave Missiles", (load) => {
         return canAccessHeatedNorfair(load);
      });

      major("Wave Beam", (load) => {
         return canAccessHeatedNorfair(load);
      });

      minor("GT Missiles", (load) => {
         return canAccessLowerNorfair(load) && load.hasSpaceJump;
      });

      minor("GT Supers", (load) => {
         return canAccessLowerNorfair(load);
      });

      minor("Mickey Mouse Missiles", (load) => {
         return canPassWorstRoom(load);
      });

      minor("Maze Missiles", (load) => {
         return canPassWorstRoom(load);
      });

      minor("Maze PBs", (load) => {
         return canPassWorstRoom(load);
      });

      minor("PBs of Shame", (load) => {
         return canPassWorstRoom(load);
      });

      minor("3 Muskateers", (load) => {
         return canPassWorstRoom(load);
      });

      major("Energy Tank, Ridley", (load) => {
         return canPassWorstRoom(load);
      });

      major("Screw Attack", (load) => {
         return (
            canAccessLowerNorfair(load) &&
            (load.canFly || load.hasSpringBall || load.hasSpeed)
         );
      });

      major("Energy Tank, Firefleas", (load) => {
         return canPassWorstRoom(load);
      });

      minor("Spooky Missiles", (load) => {
         return canAccessWreckedShip(load);
      });

      major("Reserve Tank, Wrecked Ship", (load) => {
         return (
            canAccessWreckedShip(load) &&
            load.hasSpeed &&
            ((load.hasVaria && load.totalTanks > 0) || load.totalTanks > 1)
         );
      });

      minor("WS Reserve Missiles", (load) => {
         return (
            canAccessWreckedShip(load) && (load.hasVaria || load.totalTanks > 0)
         );
      });

      minor("WS Attic Missiles", (load) => {
         return canAccessWreckedShip(load);
      });

      major("Energy Tank, Wrecked Ship", (load) => {
         return (
            canAccessWreckedShip(load) &&
            (load.canUseBombs ||
               load.canUsePowerBombs ||
               load.hasHiJump ||
               load.hasSpaceJump ||
               load.hasSpeed ||
               load.hasSpringBall)
         );
      });

      minor("WS Supers Left", (load) => {
         return canAccessWreckedShip(load);
      });

      major("Right Super, Wrecked Ship", (load) => {
         return canAccessWreckedShip(load);
      });

      major("Gravity Suit", (load) => {
         return (
            canAccessWreckedShip(load) && (load.hasVaria || load.totalTanks > 0)
         );
      });

      minor("Mainstreet Missiles", (load) => {
         return (
            canAccessRedBrinstar(load) &&
            load.canUsePowerBombs &&
            load.hasGravity &&
            load.hasSpeed
         );
      });

      minor("Crab Supers", (load) => {
         return canAccessOuterMaridia(load);
      });

      major("Energy Tank, Mama Turtle", (load) => {
         return (
            canAccessOuterMaridia(load) &&
            (load.canFly || load.hasSpeed || load.hasGrapple)
         );
      });

      minor("Mama Turtle Missiles", (load) => {
         return canAccessOuterMaridia(load);
      });

      minor("Watering Hole Supers", (load) => {
         return canAccessInnerMaridia(load);
      });

      minor("Watering Hole Missiles", (load) => {
         return canAccessInnerMaridia(load);
      });

      minor("Beach Missiles", (load) => {
         return canAccessInnerMaridia(load);
      });

      major("Plasma Beam", (load) => {
         return (
            canDefeatDraygon(load) &&
            ((load.hasCharge && load.totalTanks >= 3) ||
               load.hasScrewAttack ||
               load.hasPlasma) &&
            (load.hasHiJump ||
               load.hasSpringBall ||
               load.canFly ||
               load.hasSpeed)
         );
      });

      minor("Left Sand Pit (Missiles)", (load) => {
         return (
            canAccessOuterMaridia(load) &&
            (canDoSuitlessMaridia(load) || load.hasGravity)
         );
      });

      major("Reserve Tank, Maridia", (load) => {
         return (
            canAccessOuterMaridia(load) &&
            (canDoSuitlessMaridia(load) || load.hasGravity)
         );
      });

      minor("Right Sand Pit (Missiles)", (load) => {
         return canAccessInnerMaridia(load);
      });

      minor("Right Sand Pit (PBs)", (load) => {
         return canAccessOuterMaridia(load) && load.hasGravity;
      });

      minor("Aquaduct Missiles", (load) => {
         return canAccessOuterMaridia(load) && load.hasGravity;
      });

      minor("Aquaduct Supers", (load) => {
         return canAccessOuterMaridia(load) && load.hasGravity;
      });

      major("Spring Ball", (load) => {
         return (
            canAccessInnerMaridia(load) &&
            (load.hasIce ||
               (load.hasGrapple && (load.canFly || load.hasHiJump)))
         );
      });

      minor("Precious Missiles", (load) => {
         return canDefeatDraygon(load);
      });

      major("Energy Tank, Botwoon", (load) => {
         return canDefeatBotwoon(load);
      });

      major("Space Jump", (load) => {
         return canDefeatDraygon(load);
      });
   }
}
