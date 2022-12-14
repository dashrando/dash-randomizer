class Loadout {
   items = [];

   hasBombs = false;
   hasMorph = false;
   hasGravity = false;
   hasVaria = false;
   hasHiJump = false;
   hasSpaceJump = false;
   hasScrewAttack = false;
   hasSpringBall = false;
   hasSpeed = false;

   hasIce = false;
   hasWave = false;
   hasCharge = false;
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
      this.items.forEach((i) => copy.add(i));
      return copy;
   }

   add(item) {
      this.items.push(item);

      switch (item) {
         case "Bomb":
            this.hasBombs = true;
            break;
         case "Morph Ball":
            this.hasMorph = true;
            break;
         case "Gravity Suit":
            this.hasGravity = true;
            break;
         case "Varia Suit":
            this.hasVaria = true;
            break;
         case "HiJump Boots":
            this.hasHiJump = true;
            break;
         case "Space Jump":
            this.hasSpaceJump = true;
            break;
         case "Screw Attack":
            this.hasScrewAttack = true;
            break;
         case "Spring Ball":
            this.hasSpringBall = true;
            break;
         case "Speed Booster":
            this.hasSpeed = true;
            break;

         case "Ice Beam":
            this.hasIce = true;
            break;
         case "Wave Beam":
            this.hasWave = true;
            break;
         case "Charge Beam":
            this.hasCharge = true;
            break;
         case "Plasma Beam":
            this.hasPlasma = true;
            break;
         case "Grappling Beam":
            this.hasGrapple = true;
            break;

         case "Missile":
            this.missilePacks += 1;
            break;
         case "Super Missile":
            this.superPacks += 1;
            break;
         case "Power Bomb":
            this.powerPacks += 1;
            break;

         case "Energy Tank":
            this.energyTanks += 1;
            this.totalTanks += 1;
            break;
         case "Reserve Tank":
            this.reserveTanks += 1;
            this.totalTanks += 1;
            break;
      }

      this.canUseBombs |= this.hasMorph && this.hasBombs;
      this.canUsePowerBombs |= this.hasMorph && this.powerPacks > 0;
      this.canPassBombPassages |= this.canUseBombs || this.canUsePowerBombs;
      this.canDestroyBombWalls |=
         this.canPassBombPassages || this.hasScrewAttack;

      this.canOpenGreenDoors |= this.superPacks > 0;
      this.canOpenRedDoors |= this.missilePacks > 0 || this.superPacks > 0;
      this.canOpenYellowDoors |= this.canUsePowerBombs;

      this.canFly |= this.canUseBombs || this.hasSpaceJump;
      this.canCrystalFlash |=
         this.missilePacks > 1 && this.superPacks > 1 && this.powerPacks > 2;
   }
}
