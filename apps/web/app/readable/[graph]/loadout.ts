const LoadoutChecks = [
  {
    name: 'canDestroyBombWalls',
    condition: 'canPassBombPassages OR hasScrewAttack',
  },
  {
    name: 'canFly',
    condition: 'canUseBombs OR hasSpaceJump',
  },
  {
    name: 'canUseBombs',
    condition: 'hasBombs && hasMorph',
  },
  {
    name: 'canUsePowerBombs',
    condition: 'powerPacks > 0 && hasMorph',
  },
  {
    name: 'canPassBombPassages',
    condition: 'canUseBomb OR canUsePowerBombs',
  },
  {
    name: 'canOpenGreenDoors',
    condition: 'superPacks > 0',
  },
  {
    name: 'canOpenRedDoors',
    condition: 'missilePacks > 0 OR superPacks > 0',
  },
  {
    name: 'canOpenYellowDoors',
    condition: 'canUsePowerBombs'
  },
  {
    name: 'totalTanks',
    condition: 'energyTanks + reserveTanks'
  }
]

export default LoadoutChecks