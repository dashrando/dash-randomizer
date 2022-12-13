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
   Show() {
      let output =
         '<span style="color: red">' + this.location.name + ": </span>";

      if (this.item == undefined) {
         return output + "<i>NO ITEM</i>";
      }
      return output + "<i>" + this.item.name + "</i>";
   }
}

class MajorMinorLogic {
   nodes = [];

   // Testing variables
   prefilledNodes = [];
   progressNodes = [];

   preShuffleLocations = [];
   postShuffleLocations = [];
   weightedLocations = [];

   preShuffleItems = [];
   postShuffleItems = [];
   weightedItems = [];

   constructor(seed, locations) {
      this.seed = seed;
      this.rnd = new DotNetRandom(this.seed);
      this.setupNodes(locations);
      this.seedInfo = [0, 0, 0, 0];
   }

   getSeedData() {
      let seedData = new Uint8Array(104);

      let rnd = new DotNetRandom(this.seed);
      let seedInfo1 = rnd.Next(0xffff);
      let seedInfo2 = rnd.Next(0xffff);

      seedData[0] = seedInfo1 & 0xff;
      seedData[1] = (seedInfo1 >> 8) & 0xff;
      seedData[2] = seedInfo2 & 0xff;
      seedData[3] = (seedInfo2 >> 8) & 0xff;

      for (let i = 0; i < locations.length; i++) {
         let item = this.nodes.find(
            (n) => n.location.name == locations[i].name
         ).item;
         seedData[4 + i] = item.id;
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
            name != "Missile (blue Brinstar middle)" &&
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

   prefill(load, item) {
      let available = this.nodes.filter(
         (n) => n.available(load) && this.canPlaceAtLocation(item, n)
      );
      let i = this.rnd.Next(available.length);
      available[i].SetItem(item);
      load.add(item.name);
   }

   placeItems(items) {
      this.rnd = new DotNetRandom(this.seed);

      let loadout = new Loadout();
      let itemPool = [...items];

      const addItems = (name, count) => {
         let newItems = new Array(count);
         newItems.fill(
            items.find((p) => p.name == name),
            0,
            count
         );
         itemPool = newItems.concat(itemPool);
      };

      addItems("Reserve Tank", 3);
      addItems("Energy Tank", 13);

      let numSupers = 11 + this.rnd.Next(7);
      let numPBs = 13 + this.rnd.Next(7);
      let numMissiles = 63 - numSupers - numPBs;

      addItems("Missile", numMissiles);
      addItems("Super Missile", numSupers);
      addItems("Power Bomb", numPBs);

      let pre = (name) => {
         this.prefill(
            loadout,
            items.find((p) => p.name == name)
         );

         for (let i = 0; i < itemPool.length; i++) {
            if (itemPool[i].name == name) {
               itemPool.splice(i, 1);
               break;
            }
         }
      };

      pre("Morph Ball");

      if (this.rnd.Next(100) < 65) {
         pre("Missile");
      } else {
         pre("Super Missile");
      }

      switch (this.rnd.Next(13)) {
         case 0:
            pre("Speed Booster");
            break;
         case 1:
         case 2:
            pre("Screw Attack");
            break;
         case 3:
         case 4:
         case 5:
         case 6:
            pre("Bomb");
            break;
         default:
            pre("Power Bomb");
            break;
      }

      if (loadout.superPacks < 1) {
         pre("Super Missile");
      }

      if (loadout.powerPacks < 1) {
         pre("Power Bomb");
      }

      // Make note of the prefilled item locations
      this.prefilledNodes = this.nodes.filter((node) => node.item != undefined);

      //-----------------------------------------------------------------

      const swap = (arr, x, y) => {
         let tmp = arr[x];
         arr[x] = arr[y];
         arr[y] = tmp;
      };

      const shuffle = (arr) => {
         for (let i = 0; i < arr.length; i++) {
            swap(arr, i, this.rnd.NextInRange(i, arr.length));
         }
      };

      //-----------------------------------------------------------------

      this.preShuffleLocations = this.nodes.filter((n) => n.isMajor);

      let shuffledLocations = [...this.preShuffleLocations];
      shuffle(shuffledLocations);

      this.postShuffleLocations = [...shuffledLocations];

      let num = 100;
      shuffledLocations.forEach((n) => {
         n.sortWeight = num - n.GetWeight();
         num += 10;
      });

      shuffledLocations.sort((a, b) => {
         return a.sortWeight - b.sortWeight;
      });

      this.weightedLocations = [...shuffledLocations];

      //-----------------------------------------------------------------

      this.preShuffleItems = [...itemPool];

      let shuffledItems = itemPool;
      shuffle(shuffledItems);

      this.postShuffleItems = [...shuffledItems];

      let firstSuit = this.rnd.Next(2) == 0 ? "Varia Suit" : "Gravity Suit";
      shuffledItems.splice(
         shuffledItems.findIndex((p) => p.name == firstSuit),
         1
      );
      shuffledItems.unshift(items.find((p) => p.name == firstSuit));

      this.weightedItems = [...shuffledItems];

      //-----------------------------------------------------------------

      let prefilled = this.nodes
         .filter((n) => {
            return n.item != undefined;
         })
         .map((p) => p.item);

      const getAssumedItems = (item) => {
         let items = shuffledItems.concat(prefilled);
         let itemLocations = this.nodes.filter((p) => p.item != undefined);

         let localLoad = new Loadout();
         items.forEach((p) => localLoad.add(p.name));

         let accessibleNodes = itemLocations.filter((p) => {
            return p.available(localLoad);
         });

         let accessibleItems = accessibleNodes
            .map((p) => p.item)
            .filter((i) => !prefilled.includes(i));
         return items.concat(accessibleItems);
      };

      for (let x = 0; x < shuffledItems.length; x++) {
         let firstProgression = shuffledItems.findIndex((p) =>
            this.isProgression(p)
         );

         if (firstProgression < 0) {
            break;
         }

         let item = shuffledItems.splice(firstProgression, 1)[0];

         let assumedItems = getAssumedItems(item);
         let assumedLoadout = new Loadout();
         assumedItems.forEach((a) => assumedLoadout.add(a.name));

         let availableLocations = shuffledLocations.filter(
            (n) =>
               n.available(assumedLoadout) && this.canPlaceAtLocation(item, n)
         );

         availableLocations[0].SetItem(item);
      }

      // Make note of the progression item locations
      this.progressNodes = this.nodes.filter((node) => node.item != undefined);

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
            if (
               undefined !=
               locations.find((n) => this.canPlaceAtLocation(item, n))
            ) {
               return true;
            }
            return false;
         };

         const newLocationsHasMajor =
            undefined != newLocations.find((n) => n.isMajor);

         if (!canPlaceItem(oldLocations)) {
            return false;
         }

         if (!newLocationsHasMajor) {
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
               return itemPool[this.rnd.Next(itemPool.length)];
            } else {
               return possibleItems[this.rnd.Next(possibleItems.length)];
            }
         };

         let item = selectItem();
         let availableLocations = getAvailableLocations(
            getCurrentLoadout()
         ).filter((n) => this.canPlaceAtLocation(item, n));

         availableLocations[this.rnd.Next(availableLocations.length)].SetItem(
            item
         );
         return item;
      };

      while (itemPool.length > 0) {
         let item = placeItem();
         itemPool.splice(
            itemPool.findIndex((p) => p == item),
            1
         );
      }

      return this.getSeedData();
   }

   setupNodes(locations) {
      let add = (name, isMajor, available) => {
         let loc = locations.find((p) => p.name == name);
         this.nodes.push(new Node(loc, isMajor, available));
      };
      let major = (n, a) => add(n, true, a);
      let minor = (n, a) => add(n, false, a);

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
