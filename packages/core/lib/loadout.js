import { Item, ItemNames } from "./items";

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

  constructor(inventory = {}) {
    const self = this
    const keys = Object.keys(inventory)
    keys.forEach((key) => {
      const value = inventory[key]
      self[key] = value
    })
  }

  clone() {
    const loadoutState = Object.getOwnPropertyNames(this)
    return new Loadout(loadoutState)
  }

  add(itemType) {
    switch (itemType) {
      case Item.Bombs:
        this.hasBombs = true;
        this.canUseBombs = this.hasMorph;
        this.canPassBombPassages |= this.canUseBombs;
        this.canDestroyBombWalls |= this.canPassBombPassages;
        this.canFly |= this.canUseBombs;
        break;
      case Item.Morph:
        this.hasMorph = true;
        this.canUseBombs = this.hasBombs;
        this.canUsePowerBombs = this.powerPacks > 0;
        this.canPassBombPassages = this.canUseBombs || this.canUsePowerBombs;
        this.canDestroyBombWalls |= this.canPassBombPassages;
        this.canFly |= this.canUseBombs;
        break;
      case Item.Gravity:
        this.hasGravity = true;
        break;
      case Item.PressureValve:
        this.hasPressureValve = true;
        break;
      case Item.HeatShield:
        this.hasHeatShield = true;
        break;
      case Item.Varia:
        this.hasVaria = true;
        break;
      case Item.HJB:
        this.hasHiJump = true;
        break;
      case Item.DoubleJump:
        this.hasDoubleJump = true;
        break;
      case Item.SpaceJump:
        this.hasSpaceJump = true;
        this.canFly = true;
        break;
      case Item.ScrewAttack:
        this.hasScrewAttack = true;
        this.canDestroyBombWalls = true;
        break;
      case Item.SpringBall:
        this.hasSpringBall = true;
        break;
      case Item.Speed:
        this.hasSpeed = true;
        break;

      case Item.Ice:
        this.hasIce = true;
        break;
      case Item.Wave:
        this.hasWave = true;
        break;
      case Item.Charge:
        this.hasCharge = true;
        break;
      case Item.Spazer:
        this.hasSpazer = true;
        break;
      case Item.Plasma:
        this.hasPlasma = true;
        break;
      case Item.Grapple:
        this.hasGrapple = true;
        break;

      case Item.Missile:
        this.missilePacks += 1;
        this.canOpenRedDoors = true;
        this.canCrystalFlash =
          this.missilePacks > 1 && this.superPacks > 1 && this.powerPacks > 2;
        break;
      case Item.Super:
        this.superPacks += 1;
        this.canOpenGreenDoors = true;
        this.canOpenRedDoors = true;
        this.canCrystalFlash =
          this.missilePacks > 1 && this.superPacks > 1 && this.powerPacks > 2;
        break;
      case Item.PowerBomb:
        this.powerPacks += 1;
        this.canUsePowerBombs = this.hasMorph;
        this.canPassBombPassages |= this.canUsePowerBombs;
        this.canDestroyBombWalls |= this.canPassBombPassages;
        this.canCrystalFlash =
          this.missilePacks > 1 && this.superPacks > 1 && this.powerPacks > 2;
        break;

      case Item.EnergyTank:
        this.energyTanks += 1;
        this.totalTanks += 1;
        break;
      case Item.Reserve:
        this.reserveTanks += 1;
        this.totalTanks += 1;
        break;

      case Item.BeamUpgrade:
      case Item.Xray:
        break;

      default:
        console.error("[Loadout] Unknown item type:", ItemNames.get(itemType));
        break;
    }
  }
}

export default Loadout;
