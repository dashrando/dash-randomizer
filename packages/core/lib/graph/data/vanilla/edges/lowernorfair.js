export const lowernorfairEdges = {
  Door_RidleyMouth: {
    Ruins: () => HasVaria && (HasGravity || HasHiJump),
  },

  Door_Muskateers: {
    Muskateers: () => HasVaria,
  },

  Muskateers: {
    Door_Muskateers: true,
    Missiles_Muskateers: () => HasMorph && CanDestroyBombWalls,
    Missiles_Maze: () => HasMorph,
  },

  Missiles_Muskateers: {
    Muskateers: () => CanUseBombs || CanUsePowerBombs,
  },

  Ruins: {
    Door_RidleyMouth: true,
    Missiles_GT: () => HasSpaceJump && CanUsePowerBombs,
    PrePillars: () => CanUsePowerBombs,
  },

  PrePillars: {
    Ruins: () => CanUsePowerBombs,
    ScrewAttack: () => SuperPacks >= 1 && CanDestroyBombWalls,
    WorstRoomBottom: () => CanDestroyBombWalls || HasSpeed,
  },

  WorstRoomBottom: {
    PrePillars: () => CanDestroyBombWalls,
    WorstRoomTop: () =>
      //TODO: include killing pirates
      CanUseBombs ||
      (HasScrewAttack && (HasSpaceJump || HasDoubleJump)) ||
      (CanUsePowerBombs &&
        (HasHiJump || HasSpringBall || HasSpaceJump || HasDoubleJump)),
  },

  WorstRoomTop: {
    WorstRoomBottom: () => CanDestroyBombWalls,
    Missiles_MickeyMouse: () => CanDestroyBombWalls && HasMorph,
    Ruins: () => CanDestroyBombWalls,
    RedKihunterShaftTop: true,
  },

  RedKihunterShaftTop: {
    Wasteland: () => CanUsePowerBombs,
    EnergyTank_Firefleas: true,
    WorstRoomTop: () =>
      (HasGravity && EnergyTanks >= 3 && TotalTanks >= 6) || EnergyTanks >= 6,
    Missiles_Maze: true,
  },

  Wasteland: {
    PBs_Shame: () => CanDestroyBombWalls,
    Door_RidleyBoss: () => CanUsePowerBombs && CanOpenGreenDoors,
    RedKihunterShaftTop: () => CanPassBombPassages,
  },

  EnergyTank_Firefleas: {
    RedKihunterShaftTop: () => CanFly || HasHiJump || HasSpringBall,
  },

  Missiles_Maze: {
    RedKihunterShaftTop: true,
    PBs_Maze: () => CanPassBombPassages,
    Muskateers: () => HasMorph,
  },

  PBs_Maze: {
    RedKihunterShaftTop: true,
  },

  PBs_Shame: {
    Wasteland: () => CanPassBombPassages,
  },

  Door_RidleyBoss: {
    //don't think escaping ridley with 1 PB pack is in logic, but this line implies it
    Wasteland: () => CanUsePowerBombs,
  },

  Missiles_MickeyMouse: {
    WorstRoomTop: () => HasHiJump || CanFly,
    Ruins: true,
  },

  Missiles_GT: {
    Supers_GT: () => HasScrewAttack || CanUsePowerBombs,
    ScrewAttack: () => CanKillGoldTorizo,
  },

  Supers_GT: {
    ScrewAttack: () => CanKillGoldTorizo,
  },

  ScrewAttack: {
    Supers_GT: () => HasScrewAttack || CanUsePowerBombs,
    PrePillars: () =>
      (HasSpaceJump && (HasScrewAttack || CanUsePowerBombs)) ||
      ((CanUseBombs || HasSpringBall) && CanPassBombPassages) ||
      (HasSpeed && ((HasHiJump && CanDestroyBombWalls) || CanKillGoldTorizo)),
  },
};
