export const kraidslairEdges = {
  Door_KraidsLair: {
    "Energy Tank (Kraid)": () =>
      HasDefeatedBrinstarBoss && (CanOpenRedDoors || CanDestroyBombWalls),
    KraidsHallway: () => CanPassBombPassages,
  },

  "Energy Tank (Kraid)": {
    Door_KraidsLair: true,
  },

  KraidsHallway: {
    Door_KraidsLair: () => CanPassBombPassages,
    "Missiles (Kraid)": () => CanUsePowerBombs,
    Door_KraidBoss: () => CanOpenRedDoors,
  },

  "Missiles (Kraid)": {
    KraidsHallway: true,
  },

  Door_KraidBoss: {
    KraidsHallway: true,
  },
};
