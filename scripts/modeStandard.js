class ModeStandard {
   nodes = [];
   constructor(seed, locations) {
      this.itemPool = this.setupItemPool(seed);
      this.setupNodes(locations);
   }

   setupItemPool(seed) {
      const rnd = new DotNetRandom(seed);

      //-----------------------------------------------------------------
      // Setup the pool of items that will be placed.
      //-----------------------------------------------------------------

      let itemPool = [
         majorItem(0x000000, Item.EnergyTank, false),
         minorItem(0x000000, Item.Missile),
         minorItem(0x000000, Item.Super),
         minorItem(0x000000, Item.PowerBomb),
         majorItem(0x2f8107, Item.Bombs),
         majorItem(0x2f8987, Item.Charge, false),
         majorItem(0x2f8187, Item.Ice),
         majorItem(0x2f8487, Item.HJB),
         majorItem(0x2f8587, Item.Speed),
         majorItem(0x2f8207, Item.Wave),
         majorItem(0x2f8287, Item.Spazer, false),
         majorItem(0x2f8687, Item.SpringBall),
         majorItem(0x2f8387, Item.Varia),
         majorItem(0x2f8307, Item.Plasma),
         majorItem(0x2f8787, Item.Grapple),
         majorItem(0x2f8087, Item.Morph),
         majorItem(0x000000, Item.Reserve),
         majorItem(0x2f8407, Item.Gravity),
         majorItem(0x2f8707, Item.Xray, false),
         majorItem(0x2f8507, Item.SpaceJump),
         majorItem(0x2f8607, Item.ScrewAttack),
      ];

      const setAmountInPool = (type, count) => {
         const item = itemPool.find((i) => i.type == type);
         while (itemPool.filter((i) => i == item).length < count) {
            itemPool.unshift(item);
         }
      };

      const numSupers = 12 + rnd.Next(7);
      const numPBs = 14 + rnd.Next(7);
      const numMissiles = 66 - numSupers - numPBs;

      setAmountInPool(Item.Reserve, 4);
      setAmountInPool(Item.EnergyTank, 14);
      setAmountInPool(Item.Missile, numMissiles);
      setAmountInPool(Item.Super, numSupers);
      setAmountInPool(Item.PowerBomb, numPBs);

      return itemPool;
   }

   setupNodes(locations) {
      //-----------------------------------------------------------------
      // Routines for registering item locations.
      //-----------------------------------------------------------------

      let add = (name, isMajor, available) => {
         let loc = locations.find((p) => p.name == name);
         this.nodes.push(new Node(name, loc, isMajor, available));
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
         return canAccessOuterMaridia(load) && load.hasGravity;
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
