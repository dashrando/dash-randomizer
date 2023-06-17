export const kraidslairEdges = {
  Door_KraidsLair: {
    //beetoms are bomb walls and green doors, trust me
    EnergyTank_Kraid: () => HasDefeatedKraid && (CanOpenGreenDoors || CanDestroyBombWalls),
    KraidsHallway: () => CanPassBombPassages,
  },

  EnergyTank_Kraid: {
    Door_KraidsLair: true,
  },

  KraidsHallway: {
    Door_KraidsLair: () => CanPassBombPassages,
    Missiles_Kraid: () => CanUsePowerBombs,
    Door_KraidBoss: () => CanOpenRedDoors,
  },

  Missiles_Kraid: {
    KraidsHallway: true,
  },

  Door_KraidBoss: {
    KraidsHallway: true,
  },
};
