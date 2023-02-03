class Loadout {
   hasBombs = false;
   hasMorph = false;
   hasGravity = false;
   hasVaria = false;
   hasHiJump = false;
   hasSpaceJump = false;
   hasScrewAttack = false;
   hasSpringBall = false;
   hasSpeed = false;

   hasHeatShield = false;
   hasPressureValve = false;
   hasDoubleJump = false;

   hasIce = false;
   hasWave = false;
   hasCharge = false;
   hasSpazer = false;
   hasPlasma = false;
   hasGrapple = false;

   missilePacks = 0;
   superPacks = 0;
   powerPacks = 0;

   energyTanks = 0;
   reserveTanks = 0;
   totalTanks = 0;

   canUseBombs = false;
   canUsePowerBombs = false;
   canPassBombPassages = false;
   canDestroyBombWalls = false;
   canOpenGreenDoors = false;
   canOpenRedDoors = false;
   canOpenYellowDoors = false;
   canFly = false;
   canCrystalFlash = false;

   clone() {
      let copy = new Loadout();

      copy.hasBombs = this.hasBombs;
      copy.hasMorph = this.hasMorph;
      copy.hasGravity = this.hasGravity;
      copy.hasVaria = this.hasVaria;
      copy.hasHiJump = this.hasHiJump;
      copy.hasSpaceJump = this.hasSpaceJump;
      copy.hasScrewAttack = this.hasScrewAttack;
      copy.hasSpringBall = this.hasSpringBall;
      copy.hasSpeed = this.hasSpeed;

      copy.hasHeatShield = copy.hasHeatShield;
      copy.hasPressureValve = copy.hasPressureValve;
      copy.hasDoubleJump = copy.hasDoubleJump;

      copy.hasIce = this.hasIce;
      copy.hasWave = this.hasWave;
      copy.hasCharge = this.hasCharge;
      copy.hasSpazer = this.hasSpazer;
      copy.hasPlasma = this.hasPlasma;
      copy.hasGrapple = this.hasGrapple;

      copy.missilePacks = this.missilePacks;
      copy.superPacks = this.superPacks;
      copy.powerPacks = this.powerPacks;

      copy.energyTanks = this.energyTanks;
      copy.reserveTanks = this.reserveTanks;
      copy.totalTanks = this.totalTanks;

      copy.canUseBombs = this.canUseBombs;
      copy.canUsePowerBombs = this.canUsePowerBombs;
      copy.canPassBombPassages = this.canPassBombPassages;
      copy.canDestroyBombWalls = this.canDestroyBombWalls;
      copy.canOpenGreenDoors = this.canOpenGreenDoors;
      copy.canOpenRedDoors = this.canOpenRedDoors;
      copy.canOpenYellowDoors = this.canOpenYellowDoors;
      copy.canFly = this.canFly;
      copy.canCrystalFlash = this.canCrystalFlash;

      return copy;
   }

   add(itemCode) {
      switch (itemCode) {
         case Item.Bombs.code:
            this.hasBombs = true;
            this.canUseBombs = this.hasMorph;
            this.canPassBombPassages |= this.canUseBombs;
            this.canDestroyBombWalls |= this.canPassBombPassages;
            this.canFly |= this.canUseBombs;
            break;
         case Item.Morph.code:
            this.hasMorph = true;
            this.canUseBombs = this.hasBombs;
            this.canUsePowerBombs = this.powerPacks > 0;
            this.canPassBombPassages =
               this.canUseBombs || this.canUsePowerBombs;
            this.canDestroyBombWalls |= this.canPassBombPassages;
            this.canFly |= this.canUseBombs;
            break;
         case Item.Gravity.code:
            this.hasGravity = true;
            break;
         case Item.Valve.code:
            this.hasPressureValve = true;
            break;
         case Item.Shield.code:
            this.hasHeatShield = true;
            break;
         case Item.Varia.code:
            this.hasVaria = true;
            break;
         case Item.HJB.code:
            this.hasHiJump = true;
            break;
         case Item.Double.code:
            this.hasDoubleJump = true;
            break;
         case Item.Space.code:
            this.hasSpaceJump = true;
            this.canFly = true;
            break;
         case Item.Screw.code:
            this.hasScrewAttack = true;
            this.canDestroyBombWalls = true;
            break;
         case Item.Spring.code:
            this.hasSpringBall = true;
            break;
         case Item.Speed.code:
            this.hasSpeed = true;
            break;

         case Item.Ice.code:
            this.hasIce = true;
            break;
         case Item.Wave.code:
            this.hasWave = true;
            break;
         case Item.Charge.code:
            this.hasCharge = true;
            break;
         case Item.Spazer.code:
            this.hasSpazer = true;
            break;
         case Item.Plasma.code:
            this.hasPlasma = true;
            break;
         case Item.Grapple.code:
            this.hasGrapple = true;
            break;

         case Item.Missile.code:
            this.missilePacks += 1;
            this.canOpenRedDoors = true;
            this.canCrystalFlash =
               this.missilePacks > 1 &&
               this.superPacks > 1 &&
               this.powerPacks > 2;
            break;
         case Item.Super.code:
            this.superPacks += 1;
            this.canOpenGreenDoors = true;
            this.canOpenRedDoors = true;
            this.canCrystalFlash =
               this.missilePacks > 1 &&
               this.superPacks > 1 &&
               this.powerPacks > 2;
            break;
         case Item.Power.code:
            this.powerPacks += 1;
            this.canUsePowerBombs = this.hasMorph;
            this.canPassBombPassages |= this.canUsePowerBombs;
            this.canDestroyBombWalls |= this.canPassBombPassages;
            this.canCrystalFlash =
               this.missilePacks > 1 &&
               this.superPacks > 1 &&
               this.powerPacks > 2;
            break;

         case Item.Energy.code:
            this.energyTanks += 1;
            this.totalTanks += 1;
            break;
         case Item.Reserve.code:
            this.reserveTanks += 1;
            this.totalTanks += 1;
            break;
      }
   }
}
