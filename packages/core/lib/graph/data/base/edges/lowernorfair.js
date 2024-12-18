export const lowernorfairEdges = {
  Door_RidleyMouth: {
    Ruins: () =>
      HasVaria &&
      (HasGravity ||
        (HasHiJump && TotalTanks >= 2) ||
        (HasPressureValve && TotalTanks >= 3)),
  },

  Door_Musketeers: {
    Musketeers: () =>
      HasVaria &&
      (HasScrewAttack ||
        HasPlasma ||
        HasCharge ||
        HasWave ||
        HasIce ||
        HasSpazer ||
        TotalTanks >= 2 ||
        (HasGravity && TotalTanks >= 1)),
  },

  Musketeers: {
    Door_Musketeers: true,
    "Missiles (Three Musketeers)": () => HasMorph && CanDestroyBombWalls,
    "Missiles (Maze)": () => HasMorph,
  },

  "Missiles (Three Musketeers)": {
    Musketeers: true, // If we got here, we can get back
  },

  Ruins: {
    Door_RidleyMouth: true,
    "Missiles (GT)": () => CanUsePowerBombs, // Space Jump not required
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
    "Energy Tank (Firefleas)": true,
    WorstRoomTop: () =>
      (CanMoveInWestMaridia && TotalTanks >= 4) || TotalTanks >= 6,
    "Missiles (Maze)": true,
  },

  Wasteland: {
    "Power Bombs (Shame)": () => CanDestroyBombWalls,
    Door_RidleyBoss: () => CanUsePowerBombs && CanOpenGreenDoors,
    RedKihunterShaftTop: () => CanPassBombPassages,
  },

  "Energy Tank (Firefleas)": {
    //RedKihunterShaftTop: () => CanFly || HasHiJump || HasSpringBall,
    RedKihunterShaftTop: true, // note: wall jump in logic
  },

  "Missiles (Maze)": {
    RedKihunterShaftTop: true,
    "Power Bombs (Maze)": () => CanPassBombPassages,
    Musketeers: () => HasMorph,
  },

  "Power Bombs (Maze)": {
    RedKihunterShaftTop: true,
  },

  "Power Bombs (Shame)": {
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

  "Missiles (GT)": {
    GoldTorizoFight: true,
  },

  "Supers (GT)": {
    GoldTorizoFight: true,
  },

  GoldTorizoFight: {
    "Supers (GT)": () => CanDestroyBombWalls,
    DefeatedGoldTorizo: () => CanKillGoldTorizo,
  },

  DefeatedGoldTorizo: {
    "Screw Attack": true,
    ScrewAttackTop: () => HasSpeed, // Charge a spark in GT room
  },

  ScrewAttackTop: {
    "Screw Attack": () => CanDestroyBombWalls,
    PrePillars: () => SuperPacks >= 1,
  },

  "Screw Attack": {
    ScrewAttackTop: () =>
      ((HasSpaceJump || HasDoubleJump) && CanDestroyBombWalls) ||
      ((CanUseBombs || HasSpringBall) && CanPassBombPassages) ||
      (HasSpeed && HasHiJump && HasScrewAttack),
    GoldTorizoFight: true,
  },
};
