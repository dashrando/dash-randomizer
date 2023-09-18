export const bossEdges = {
  Exit_Kraid: {
    Boss_Kraid: true,
  },

  Boss_Kraid: {
    Exit_Kraid: () => CanKillKraid,
    "Varia Suit": () => CanKillKraid,
  },

  "Varia Suit": {
    Boss_Kraid: true,
  },

  Exit_Phantoon: {
    Boss_Phantoon: true,
  },

  Boss_Phantoon: {
    Exit_Phantoon: () => CanKillPhantoon,
  },

  Exit_Draygon: {
    Boss_Draygon: true,
  },

  Boss_Draygon: {
    Exit_Draygon: () => CanKillDraygon && HasGravity,
    SpaceJump: () => CanKillDraygon,
  },

  SpaceJump: {
    Boss_Draygon: true,
  },

  Exit_Ridley: {
    Boss_Ridley: true,
  },

  Boss_Ridley: {
    Exit_Ridley: () => CanKillRidley,
    EnergyTank_Ridley: () => CanKillRidley,
  },

  EnergyTank_Ridley: {
    Boss_Ridley: true,
  },
};
