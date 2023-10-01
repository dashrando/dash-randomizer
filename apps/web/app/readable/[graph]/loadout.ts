const LoadoutChecks = [
  {
    name: 'CanUseBombs',
    condition: 'HasMorph AND HasBombs',
  },
  {
    name: 'CanUsePowerBombs',
    condition: 'HasMorph AND PowerBombPacks >= 1',
  },
  {
    name: 'CanPassBombPassages',
    condition: 'CanUseBombs OR CanUsePowerBombs',
  },
  {
    name: 'CanDestroyBombWalls',
    condition: 'CanPassBombPassages OR HasScrewAttack',
  },
  {
    name: 'CanFly',
    condition: 'CanUseBombs OR HasSpaceJump',
  },
  {
    name: 'CanOpenRedDoors',
    condition: 'MissilePacks >= 1 OR SuperPacks >= 1',
  },
  {
    name: 'CanOpenGreenDoors',
    condition: 'SuperPacks >= 1',
  },
  {
    name: 'CanOpenYellowDoors',
    condition: 'CanUsePowerBombs'
  },
  {
    name: 'TotalTanks',
    condition: 'EnergyTanks + ReserveTanks'
  },
  {
    name: 'HellRunTanks',
    condition:
      'if (HasVaria OR HasHeatShield) {\n  return 9999\n} else {\n   return TotalTanks\n}'
  },
  {
    name: 'CanDoSuitlessMaridia',
    condition: 'HasHiJump AND HasGrapple AND (HasIce OR HasSpringBall)'
  },
  {
    name: 'CanMoveInWestMaridia',
    condition: 'HasGravity OR HasPressureValve'
  },
  {
    name: 'CanKillKraid',
    condition: 'HasCharge OR MissilePacks >= 1 OR SuperPacks >= 1'
  },
  {
    name: 'CanKillPhantoon',
    condition: 'HasCharge OR MissilePacks >= 1 OR SuperPacks >= 1'
  },
  {
    name: 'CanKillDraygon',
    condition: 'HasCharge OR MissilePacks >= 1 OR SuperPacks >= 1'
  },
  {
    name: 'CanEscapeDraygon',
    condition: 'HasGravity'
  },
  {
    name: 'CanKillRidley',
    condition: 'HasVaria AND (HasCharge OR (\n  MissilePacks * 500 +\n  SuperPacks * 3000 +\n  PowerBombPacks * 1000\n  >= 19000))'
  },
  {
    name: 'CanKillSporeSpawn',
    condition: 'HasCharge OR MissilePacks >= 1 OR SuperPacks >= 1'
  },
  {
    name: 'CanKillCrocomire',
    condition: 'HasCharge OR (MissilePacks + SuperPacks >= 2)'
  },
  {
    name: 'CanKillBotwoon',
    condition: 'HasCharge OR\n  MissilePacks * 500 + SuperPacks * 1500 >= 6000'
  },
  {
    name: 'CanKillGoldTorizo',
    condition: 'HasVaria AND TotalTanks >= 4 AND\n  (HasCharge OR SuperPacks >= 3)'
  },
]

export default LoadoutChecks