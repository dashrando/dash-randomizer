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
    Muskateers: () =>
      (HasScrewAttack && HasMorph) || CanUseBombs || CanUsePowerBombs,
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
    WorstRoomTop: () => (HasGravity && TotalTanks >= 4) || TotalTanks >= 6,
    Missiles_Maze: true,
  },

  Wasteland: {
    PBs_Shame: () => CanDestroyBombWalls,
    Door_RidleyBoss: () => CanUsePowerBombs && CanOpenGreenDoors,
    RedKihunterShaftTop: () => CanPassBombPassages,
  },

  EnergyTank_Firefleas: {
    //RedKihunterShaftTop: () => CanFly || HasHiJump || HasSpringBall,
    RedKihunterShaftTop: true, // note: wall jump in logic
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
    //TODO: check for SJ, DJ, or SB if only PBs available?
    WorstRoomTop: () => HasMorph,
    Ruins: true,
  },

  Missiles_GT: {
    Supers_GT: () => CanDestroyBombWalls,
    ScrewAttack: () => CanKillGoldTorizo,
  },

  Supers_GT: {
    ScrewAttack: () => CanKillGoldTorizo,
  },

  ScrewAttack: {
    Supers_GT: () => CanDestroyBombWalls,
    PrePillars: () =>
      ((HasSpaceJump || HasDoubleJump) && CanDestroyBombWalls) ||
      ((CanUseBombs || HasSpringBall) && CanPassBombPassages) ||
      (HasSpeed && ((HasHiJump && CanDestroyBombWalls) || CanKillGoldTorizo)),
  },
};
