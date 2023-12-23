// @ts-nocheck
import { Item } from "./items";

export function createLoadout(): Loadout {
  return new Loadout();
}

export function cloneLoadout(load: Loadout): Loadout {
  return load.clone();
}

export function addItem(load: Loadout, itemType: number) {
  load.add(itemType);
}

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

  hasDefeatedBrinstarBoss = false;
  hasDefeatedWreckedShipBoss = false;
  hasDefeatedMaridiaBoss = false;
  hasDefeatedNorfairBoss = false;
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

  constructor() {
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
    return load.hasMorph && (load.hasBombs || load.powerPacks > 0);
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
    const copy = new Loadout();
    Object.entries(this).forEach(a => {
      copy[a[0]] = a[1];
    })
    return copy;
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
        this.hasCharge = true;
        break;
      case Item.Xray:
        break;

      case Item.DefeatedBotwoon:
        this.hasDefeatedBotwoon = true;
        break;
      case Item.DefeatedCrocomire:
        this.hasDefeatedCrocomire = true;
        break;
      case Item.DefeatedMaridiaBoss:
        this.hasDefeatedMaridiaBoss = true;
        break;
      case Item.DefeatedBrinstarBoss:
        this.hasDefeatedBrinstarBoss = true;
        break;
      case Item.DefeatedWreckedShipBoss:
        this.hasDefeatedWreckedShipBoss = true;
        break;
      case Item.DefeatedNorfairBoss:
        this.hasDefeatedNorfairBoss = true;
        break;
      case Item.DefeatedGoldTorizo:
        this.hasDefeatedGoldTorizo = true;
        break;
      case Item.DefeatedSporeSpawn:
        this.hasDefeatedSporeSpawn = true;
        break;

      default:
        console.error("[Loadout] Unknown item type:", itemType);
        break;
    }
  }
}

//-----------------------------------------------------------------
// Generates a function capable of evaluating a condition for
// traversing an edge from one vertex to another.
//-----------------------------------------------------------------

export const checkFlags = (load: Loadout) => {
  const canDamageBosses = load.hasCharge || load.canOpenRedDoors;

  const CanUseBombs = load.canUseBombs;
  const CanUsePowerBombs = load.canUsePowerBombs;
  const CanOpenRedDoors = load.canOpenRedDoors;
  const CanOpenGreenDoors = load.canOpenGreenDoors;
  const HasCharge = load.hasCharge;
  const HasDoubleJump = load.hasDoubleJump;
  const HasGravity = load.hasGravity;
  const HasGrapple = load.hasGrapple;
  const HasHeatShield = load.hasHeatShield;
  const HasHiJump = load.hasHiJump;
  const HasIce = load.hasIce;
  const HasMorph = load.hasMorph;
  const HasPlasma = load.hasPlasma;
  const HasPressureValve = load.hasPressureValve;
  const HasScrewAttack = load.hasScrewAttack;
  const HasSpaceJump = load.hasSpaceJump;
  const HasSpazer = load.hasSpazer;
  const HasSpeed = load.hasSpeed;
  const HasSpringBall = load.hasSpringBall;
  const HasVaria = load.hasVaria;
  const HasWave = load.hasWave;
  const EnergyTanks = load.energyTanks;
  const MissilePacks = load.missilePacks;
  const PowerBombPacks = load.powerPacks;
  const SuperPacks = load.superPacks;
  const TotalTanks = load.totalTanks;
  const HellRunTanks =
    load.hasVaria || load.hasHeatShield ? 9999 : load.totalTanks;
  const CanFly = load.canFly;
  const CanDoSuitlessMaridia =
    load.hasHiJump &&
    load.hasGrapple &&
    (load.hasIce || load.hasSpringBall);
  const CanPassBombPassages = load.canPassBombPassages;
  const CanDestroyBombWalls = load.canDestroyBombWalls;
  const CanMoveInWestMaridia = load.hasGravity || load.hasPressureValve;
  const CanKillKraid = canDamageBosses;
  const CanKillPhantoon = canDamageBosses;
  const CanKillDraygon = load.hasGravity && canDamageBosses;
  const CanKillRidley =
    load.hasVaria &&
    (load.hasCharge ||
      load.missilePacks * 500 +
        load.superPacks * 3000 +
        load.powerPacks * 1000 >=
        19000);
  //const CanKillSporeSpawn = canDamageBosses;
  const CanKillCrocomire =
    load.hasCharge ||
    load.superPacks * 1500 + load.missilePacks * 500 >= 5000;
  const CanKillBotwoon =
    load.hasCharge ||
    load.superPacks * 1500 + load.missilePacks * 500 >= 6000;
  const CanKillGoldTorizo =
    load.hasVaria &&
    load.totalTanks >= 4 &&
    (load.hasCharge || load.superPacks >= 3);
  //const HasDefeatedBotwoon = load.hasDefeatedBotwoon;
  //const HasDefeatedCrocomire = load.hasDefeatedCrocomire;
  const HasDefeatedMaridiaBoss = load.hasDefeatedMaridiaBoss;
  const HasDefeatedBrinstarBoss = load.hasDefeatedBrinstarBoss;
  const HasDefeatedWreckedShipBoss = load.hasDefeatedWreckedShipBoss;
  const HasDefeatedNorfairBoss = load.hasDefeatedNorfairBoss;
  //const HasDefeatedGoldTorizo = load.hasDefeatedGoldTorizo;
  //const HasDefeatedSporeSpawn = load.hasDefeatedSporeSpawn;

  return (condition: any) => eval(`(${condition.toString()})()`);
};

export default Loadout;

export const Checks = Object.getOwnPropertyNames(Loadout).filter(
  (name) => name.startsWith("can") && typeof Loadout[name] === "function",
);
