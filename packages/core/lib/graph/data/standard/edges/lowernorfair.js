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
    Muskateers: true, // If we got here, we can get back
  },

  Ruins: {
    Door_RidleyMouth: true,
    Missiles_GT: () => CanUsePowerBombs, // Space Jump not required
    PrePillars: () => CanUsePowerBombs,
  },

  PrePillars: {
    Ruins: () => CanUsePowerBombs,
    ScrewAttackTop: () => SuperPacks >= 1,
    WorstRoomBottom: () => CanDestroyBombWalls || HasSpeed,
  },

  WorstRoomBottom: {
    PrePillars: () => CanDestroyBombWalls,
    WorstRoomTop: () =>
      CanUseBombs ||
      (HasScrewAttack && (HasSpaceJump || HasDoubleJump)) ||
      (CanUsePowerBombs &&
        (HasHiJump || HasSpringBall || HasSpaceJump || HasDoubleJump)), //TODO: include killing pirates
  },

  WorstRoomTop: {
    WorstRoomBottom: () => CanDestroyBombWalls,
    "Missiles (Mickey Mouse)": () => CanDestroyBombWalls && HasMorph,
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

  "Missiles (Mickey Mouse)": {
    //TODO: check for SJ, DJ, or SB if only PBs available?
    WorstRoomTop: () => HasMorph,
    Ruins: true,
  },

  Missiles_GT: {
    GoldTorizoFight: true,
  },

  Supers_GT: {
    GoldTorizoFight: true,
  },

  GoldTorizoFight: {
    Supers_GT: () => CanDestroyBombWalls,
    DefeatedGoldTorizo: () => CanKillGoldTorizo,
  },

  DefeatedGoldTorizo: {
    ScrewAttack: true,
    ScrewAttackTop: () => HasSpeed, // Charge a spark in GT room
  },

  ScrewAttackTop: {
    ScrewAttack: () => CanDestroyBombWalls,
    PrePillars: () => SuperPacks >= 1,
  },

  ScrewAttack: {
    ScrewAttackTop: () =>
      ((HasSpaceJump || HasDoubleJump) && CanDestroyBombWalls) ||
      ((CanUseBombs || HasSpringBall) && CanPassBombPassages) ||
      (HasSpeed && HasHiJump && HasScrewAttack),
    GoldTorizoFight: true,
  },
};
