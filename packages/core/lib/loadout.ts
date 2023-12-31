import { Item } from "./items";

type Loadout = {
  hasBombs: boolean;
  hasMorph: boolean;
  hasGravity: boolean;
  hasVaria: boolean;
  hasHiJump: boolean;
  hasSpaceJump: boolean;
  hasScrewAttack: boolean;
  hasSpringBall: boolean;
  hasSpeed: boolean;

  hasHeatShield: boolean;
  hasPressureValve: boolean;
  hasDoubleJump: boolean;

  hasIce: boolean;
  hasWave: boolean;
  hasCharge: boolean;
  hasSpazer: boolean;
  hasPlasma: boolean;
  hasGrapple: boolean;

  hasDefeatedBrinstarBoss: boolean;
  hasDefeatedWreckedShipBoss: boolean;
  hasDefeatedMaridiaBoss: boolean;
  hasDefeatedNorfairBoss: boolean;
  hasDefeatedSporeSpawn: boolean;
  hasDefeatedCrocomire: boolean;
  hasDefeatedBotwoon: boolean;
  hasDefeatedGoldTorizo: boolean;

  missilePacks: number;
  superPacks: number;
  powerPacks: number;

  energyTanks: number;
  reserveTanks: number;
  totalTanks: number;

  canUseBombs: boolean;
  canUsePowerBombs: boolean;
  canPassBombPassages: boolean;
  canDestroyBombWalls: boolean;
  canOpenGreenDoors: boolean;
  canOpenRedDoors: boolean;
  canFly: boolean;
}

export function createLoadout(): Loadout {
  return {
    hasBombs: false,
    hasMorph: false,
    hasGravity: false,
    hasVaria: false,
    hasHiJump: false,
    hasSpaceJump: false,
    hasScrewAttack: false,
    hasSpringBall: false,
    hasSpeed: false,

    hasHeatShield: false,
    hasPressureValve: false,
    hasDoubleJump: false,

    hasIce: false,
    hasWave: false,
    hasCharge: false,
    hasSpazer: false,
    hasPlasma: false,
    hasGrapple: false,

    hasDefeatedBrinstarBoss: false,
    hasDefeatedWreckedShipBoss: false,
    hasDefeatedMaridiaBoss: false,
    hasDefeatedNorfairBoss: false,
    hasDefeatedSporeSpawn: false,
    hasDefeatedCrocomire: false,
    hasDefeatedBotwoon: false,
    hasDefeatedGoldTorizo: false,

    missilePacks: 0,
    superPacks: 0,
    powerPacks: 0,

    energyTanks: 0,
    reserveTanks: 0,
    totalTanks: 0,

    canUseBombs: false,
    canUsePowerBombs: false,
    canPassBombPassages: false,
    canDestroyBombWalls: false,
    canOpenGreenDoors: false,
    canOpenRedDoors: false,
    canFly: false,
  }
}

export function cloneLoadout(load: Loadout): Loadout {
  return {...load};
}

export function copyLoadout(destination: Loadout, source: Loadout) {
  destination.hasBombs = source.hasBombs;
  destination.hasMorph = source.hasMorph;
  destination.hasGravity = source.hasGravity;
  destination.hasVaria = source.hasVaria;
  destination.hasHiJump = source.hasHiJump;
  destination.hasSpaceJump = source.hasSpaceJump;
  destination.hasScrewAttack = source.hasScrewAttack;
  destination.hasSpringBall = source.hasSpringBall;
  destination.hasSpeed = source.hasSpeed;
  destination.hasHeatShield = source.hasHeatShield;
  destination.hasPressureValve = source.hasPressureValve;
  destination.hasDoubleJump = source.hasDoubleJump;
  destination.hasIce = source.hasIce;
  destination.hasWave = source.hasWave;
  destination.hasCharge = source.hasCharge;
  destination.hasSpazer = source.hasSpazer;
  destination.hasPlasma = source.hasPlasma;
  destination.hasGrapple = source.hasGrapple;
  destination.hasDefeatedBrinstarBoss = source.hasDefeatedBrinstarBoss;
  destination.hasDefeatedWreckedShipBoss = source.hasDefeatedWreckedShipBoss;
  destination.hasDefeatedMaridiaBoss = source.hasDefeatedMaridiaBoss;
  destination.hasDefeatedNorfairBoss = source.hasDefeatedNorfairBoss;
  destination.hasDefeatedSporeSpawn = source.hasDefeatedSporeSpawn;
  destination.hasDefeatedCrocomire = source.hasDefeatedCrocomire;
  destination.hasDefeatedBotwoon = source.hasDefeatedBotwoon;
  destination.hasDefeatedGoldTorizo = source.hasDefeatedGoldTorizo;
  destination.missilePacks = source.missilePacks;
  destination.superPacks = source.superPacks;
  destination.powerPacks = source.powerPacks;
  destination.energyTanks = source.energyTanks;
  destination.reserveTanks = source.reserveTanks;
  destination.totalTanks = source.totalTanks;
  destination.canUseBombs = source.canUseBombs;
  destination.canUsePowerBombs = source.canUsePowerBombs;
  destination.canPassBombPassages = source.canPassBombPassages;
  destination.canDestroyBombWalls = source.canDestroyBombWalls;
  destination.canOpenGreenDoors = source.canOpenGreenDoors;
  destination.canOpenRedDoors = source.canOpenRedDoors;
  destination.canFly = source.canFly;
}

function canDestroyBombWalls(load: Loadout) {
  return canPassBombPassages(load) || load.hasScrewAttack;
}

function canFly(load: Loadout) {
  return canUseBombs(load) || load.hasSpaceJump;
}

function canUseBombs(load: Loadout) {
  return load.hasBombs && load.hasMorph;
}

//function canUsePowerBombs(load: Loadout) {
  //return load.powerPacks > 0 && load.hasMorph;
//}

function canPassBombPassages(load: Loadout) {
  return load.hasMorph && (load.hasBombs || load.powerPacks > 0);
}

//function canOpenGreenDoors(load: Loadout) {
  //return load.superPacks > 0;
//}

//function canOpenRedDoors(load: Loadout) {
  //return load.missilePacks > 0 || load.superPacks > 0;
//}

//function canOpenYellowDoors(load: Loadout) {
  //return canUsePowerBombs(load);
//}

//function totalTanks(load: Loadout) {
  //return load.energyTanks + load.reserveTanks;
//}

export function addItem(load: Loadout, itemType: number) {
  switch (itemType) {
    case Item.Bombs:
      load.hasBombs = true;
      load.canUseBombs = load.hasMorph;
      load.canPassBombPassages = canPassBombPassages(load);
      load.canDestroyBombWalls = canDestroyBombWalls(load);
      load.canFly = canFly(load);
      break;
    case Item.Morph:
      load.hasMorph = true;
      load.canUseBombs = load.hasBombs;
      load.canUsePowerBombs = load.powerPacks > 0;
      load.canPassBombPassages = canPassBombPassages(load);
      load.canDestroyBombWalls = canDestroyBombWalls(load);
      load.canFly = canFly(load);
      break;
    case Item.Gravity:
      load.hasGravity = true;
      break;
    case Item.PressureValve:
      load.hasPressureValve = true;
      break;
    case Item.HeatShield:
      load.hasHeatShield = true;
      break;
    case Item.Varia:
      load.hasVaria = true;
      break;
    case Item.HJB:
      load.hasHiJump = true;
      break;
    case Item.DoubleJump:
      load.hasDoubleJump = true;
      break;
    case Item.SpaceJump:
      load.hasSpaceJump = true;
      load.canFly = true;
      break;
    case Item.ScrewAttack:
      load.hasScrewAttack = true;
      load.canDestroyBombWalls = true;
      break;
    case Item.SpringBall:
      load.hasSpringBall = true;
      break;
    case Item.Speed:
      load.hasSpeed = true;
      break;

    case Item.Ice:
      load.hasIce = true;
      break;
    case Item.Wave:
      load.hasWave = true;
      break;
    case Item.Charge:
    case Item.BeamUpgrade:
      load.hasCharge = true;
      break;
    case Item.Spazer:
      load.hasSpazer = true;
      break;
    case Item.Plasma:
      load.hasPlasma = true;
      break;
    case Item.Grapple:
      load.hasGrapple = true;
      break;

    case Item.Missile:
      load.missilePacks += 1;
      load.canOpenRedDoors = true;
      break;
    case Item.Super:
      load.superPacks += 1;
      load.canOpenRedDoors = true;
      load.canOpenGreenDoors = true;
      break;
    case Item.PowerBomb:
      load.powerPacks += 1;
      load.canUsePowerBombs = load.hasMorph;
      load.canPassBombPassages = canPassBombPassages(load);
      load.canDestroyBombWalls = canDestroyBombWalls(load);
      break;

    case Item.EnergyTank:
      load.energyTanks += 1;
      load.totalTanks += 1;
      break;
    case Item.Reserve:
      load.reserveTanks += 1;
      load.totalTanks += 1;
      break;
    case Item.Xray:
      break;

    case Item.DefeatedBotwoon:
      load.hasDefeatedBotwoon = true;
      break;
    case Item.DefeatedCrocomire:
      load.hasDefeatedCrocomire = true;
      break;
    case Item.DefeatedMaridiaBoss:
      load.hasDefeatedMaridiaBoss = true;
      break;
    case Item.DefeatedBrinstarBoss:
      load.hasDefeatedBrinstarBoss = true;
      break;
    case Item.DefeatedWreckedShipBoss:
      load.hasDefeatedWreckedShipBoss = true;
      break;
    case Item.DefeatedNorfairBoss:
      load.hasDefeatedNorfairBoss = true;
      break;
    case Item.DefeatedGoldTorizo:
      load.hasDefeatedGoldTorizo = true;
      break;
    case Item.DefeatedSporeSpawn:
      load.hasDefeatedSporeSpawn = true;
      break;

    default:
      console.error("[Loadout] Unknown item type:", itemType);
      break;
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