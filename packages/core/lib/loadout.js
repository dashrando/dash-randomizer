import { BeamMode, SuitMode } from "./graph/params";
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

  hasDefeatedKraid = false;
  hasDefeatedPhantoon = false;
  hasDefeatedDraygon = false;
  hasDefeatedRidley = false;
  hasDefeatedSporeSpawn = false;
  hasDefeatedCrocomire = false;
  hasDefeatedBotwoon = false;
  hasDefeatedGoldTorizo = false;

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

  constructor(inventory = {}) {
    const self = this;
    const keys = Object.keys(inventory);
    keys.forEach((key) => {
      const value = inventory[key];
      self[key] = value;
    });
  }

  static canDestroyBombWalls(load) {
    return Loadout.canPassBombPassages(load) || load.hasScrewAttack;
  }

  static canFly(load) {
    return Loadout.canUseBombs(load) || load.hasSpaceJump;
  }

  static canUseBombs(load) {
    return load.hasBombs && load.hasMorph;
  }

  static canUsePowerBombs(load) {
    return load.powerPacks > 0 && load.hasMorph;
  }

  static canPassBombPassages(load) {
    return Loadout.canUseBombs(load) || Loadout.canUsePowerBombs(load);
  }

  static canOpenGreenDoors(load) {
    return load.superPacks > 0;
  }

  static canOpenRedDoors(load) {
    return load.missilePacks > 0 || load.superPacks > 0;
  }

  static canOpenYellowDoors(load) {
    return Loadout.canUsePowerBombs(load);
  }

  static totalTanks(load) {
    return load.energyTanks + load.reserveTanks;
  }

  clone() {
    const state = { ...this };
    return new Loadout(state);
  }

  add(itemType) {
    switch (itemType) {
      case Item.Bombs:
        this.hasBombs = true;
        this.canUseBombs = Loadout.canUseBombs(this);
        this.canPassBombPassages = Loadout.canPassBombPassages(this);
        this.canDestroyBombWalls = Loadout.canDestroyBombWalls(this);
        this.canFly = Loadout.canFly(this);
        break;
      case Item.Morph:
        this.hasMorph = true;
        this.canUseBombs = Loadout.canUseBombs(this);
        this.canUsePowerBombs = Loadout.canUsePowerBombs(this);
        this.canPassBombPassages = Loadout.canPassBombPassages(this);
        this.canDestroyBombWalls = Loadout.canDestroyBombWalls(this);
        this.canFly = Loadout.canFly(this);
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
        this.canFly = Loadout.canFly(this);
        break;
      case Item.ScrewAttack:
        this.hasScrewAttack = true;
        this.canDestroyBombWalls = Loadout.canDestroyBombWalls(this);
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
        this.canOpenRedDoors = Loadout.canOpenRedDoors(this);
        break;
      case Item.Super:
        this.superPacks += 1;
        this.canOpenRedDoors = Loadout.canOpenRedDoors(this);
        this.canOpenGreenDoors = Loadout.canOpenGreenDoors(this);
        break;
      case Item.PowerBomb:
        this.powerPacks += 1;
        this.canUsePowerBombs = Loadout.canUsePowerBombs(this);
        this.canPassBombPassages = Loadout.canPassBombPassages(this);
        this.canDestroyBombWalls = Loadout.canDestroyBombWalls(this);
        break;

      case Item.EnergyTank:
        this.energyTanks += 1;
        this.totalTanks = Loadout.totalTanks(this);
        break;
      case Item.Reserve:
        this.reserveTanks += 1;
        this.totalTanks = Loadout.totalTanks(this);
        break;

      case Item.BeamUpgrade:
      case Item.Xray:
        break;

      case Item.DefeatedBotwoon:
        this.hasDefeatedBotwoon = true;
        break;
      case Item.DefeatedCrocomire:
        this.hasDefeatedCrocomire = true;
        break;
      case Item.DefeatedDraygon:
        this.hasDefeatedDraygon = true;
        break;
      case Item.DefeatedKraid:
        this.hasDefeatedKraid = true;
        break;
      case Item.DefeatedPhantoon:
        this.hasDefeatedPhantoon = true;
        break;
      case Item.DefeatedRidley:
        this.hasDefeatedRidley = true;
        break;
      case Item.DefeatedGoldTorizo:
        this.hasDefeatedGoldTorizo = true;
        break;
      case Item.DefeatedSporeSpawn:
        this.hasDefeatedSporeSpawn = true;
        break;

      default:
        console.error("[Loadout] Unknown item type:", ItemNames.get(itemType));
        break;
    }
  }

  getFlags(settings) {
    const starterChargeInLogic = settings.beamMode == BeamMode.DashRecall;
    const canDamageBosses =
      starterChargeInLogic || this.hasCharge || this.canOpenRedDoors;
    const isHeatProof =
      this.hasVaria ||
      this.hasHeatShield ||
      (settings.suitMode == SuitMode.Vanilla && this.hasGravity);
    const ballisticPacks = this.superPacks + this.missilePacks;
    const ridleyAmmoDamage =
      this.missilePacks * 500 + this.superPacks * 3000 + this.powerPacks * 1000;

    const getEnvDamageTanks = () => {
      if (settings.suitMode == SuitMode.Standard) {
        if (this.hasVaria) {
          return Math.floor(this.totalTanks * 2.5);
        }
        return this.totalTanks;
      }
      if (settings.suitMode == SuitMode.Dash) {
        if (this.hasVaria && this.hasGravity) {
          return Math.floor(this.totalTanks * 2.5);
        }
        if (this.hasVaria || this.hasGravity) {
          return this.totalTanks * 2;
        }
        return this.totalTanks;
      }
      if (this.hasGravity) {
        return Math.floor(this.totalTanks * 2.5);
      }
      if (this.hasVaria) {
        return this.totalTanks * 2;
      }
      return this.totalTanks;
    };

    return {
      CanUseBombs: this.canUseBombs,
      CanUsePowerBombs: this.canUsePowerBombs,
      CanOpenRedDoors: this.canOpenRedDoors,
      CanOpenGreenDoors: this.canOpenGreenDoors,
      HasCharge: this.hasCharge || starterChargeInLogic,
      HasDoubleJump: this.hasDoubleJump,
      HasGravity: this.hasGravity,
      HasGrapple: this.hasGrapple,
      HasHeatShield: this.hasHeatShield,
      HasHiJump: this.hasHiJump,
      HasIce: this.hasIce,
      HasMorph: this.hasMorph,
      HasPlasma: this.hasPlasma,
      HasPressureValve: this.hasPressureValve,
      HasScrewAttack: this.hasScrewAttack,
      HasSpaceJump: this.hasSpaceJump,
      HasSpazer: this.hasSpazer,
      HasSpeed: this.hasSpeed,
      HasSpringBall: this.hasSpringBall,
      HasVaria: this.hasVaria,
      HasWave: this.hasWave,
      EnergyTanks: this.energyTanks,
      MissilePacks: this.missilePacks,
      PowerBombPacks: this.powerPacks,
      SuperPacks: this.superPacks,
      TotalTanks: this.totalTanks,
      HellRunTanks: isHeatProof
        ? 9999
        : settings.suitMode == SuitMode.Dash && this.hasGravity
        ? this.totalTanks * 2
        : this.totalTanks,
      EnvDamageTanks: getEnvDamageTanks(),
      CanFly: this.canFly,
      CanDoSuitlessMaridia:
        this.hasHiJump &&
        this.hasGrapple &&
        (this.hasIce || this.hasSpringBall),
      CanPassBombPassages: this.canPassBombPassages,
      CanDestroyBombWalls: this.canDestroyBombWalls,
      CanMoveInWestMaridia: this.hasGravity || this.hasPressureValve,
      CanKillKraid: canDamageBosses,
      CanKillPhantoon: canDamageBosses,
      CanKillDraygon: canDamageBosses,
      CanKillRidley:
        this.hasVaria && (this.hasCharge || ridleyAmmoDamage >= 19000),
      CanKillSporeSpawn: canDamageBosses,
      CanKillCrocomire: this.hasCharge || ballisticPacks >= 2,
      CanKillBotwoon: this.hasCharge || this.superPacks >= 3,
      CanKillGoldTorizo: this.hasVaria && canDamageBosses,
      HasDefeatedBotwoon: this.hasDefeatedBotwoon,
      HasDefeatedCrocomire: this.hasDefeatedCrocomire,
      HasDefeatedDraygon: this.hasDefeatedDraygon,
      HasDefeatedKraid: this.hasDefeatedKraid,
      HasDefeatedPhantoon: this.hasDefeatedPhantoon,
      HasDefeatedRidley: this.hasDefeatedRidley,
      HasDefeatedGoldTorizo: this.hasDefeatedGoldTorizo,
      HasDefeatedSporeSpawn: this.hasDefeatedSporeSpawn,
    };
  }
}

export default Loadout;

export const Checks = Object.getOwnPropertyNames(Loadout).filter(
  (name) => name.startsWith("can") && typeof Loadout[name] === "function"
);
