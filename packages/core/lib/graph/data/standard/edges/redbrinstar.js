export const redbrinstarEdges = {
  Door_RedTower: {
    RedTowerMid: true,
  },

  XrayHallway: {
    RedTowerMid: () => CanUsePowerBombs,
    XrayScope: () =>
      CanOpenRedDoors &&
      HasMorph &&
      (HasSpaceJump ||
        HasGrapple ||
        ((TotalTanks >= 6 || (HasVaria && TotalTanks >= 2)) &&
          ((HasHiJump && (HasSpeed || HasSpringBall)) ||
            HasIce ||
            HasDoubleJump ||
            CanUseBombs))),
  },

  XrayScope: {
    XrayHallway: () =>
      CanPassBombPassages &&
      (HasSpaceJump ||
        HasGrapple ||
        TotalTanks >= 6 ||
        (HasVaria && TotalTanks >= 2)),
  },

  Door_AboveKraid: {
    RedTowerBottom: () => SuperPacks >= 1,
  },

  Door_KraidEntry: {
    RedTowerBottom: true,
  },

  Spazer: {
    RedTowerBottom: () => HasMorph,
  },

  Door_MaridiaTube: {
    RedTowerBottom: () => HasMorph,
  },

  RedBrinstarElevatorRoom: {
    Door_RedElevator: true,
    RedTowerElevatorRoom: true,
  },

  RedTowerElevatorRoom: {
    Door_MaridiaEscape: () => false, //for future use
    RedBrinstarElevatorRoom: true,
    RedTowerTop: () => CanUsePowerBombs,
    PBs_Alpha: () => CanOpenGreenDoors,
    PBs_Beta: () => CanOpenGreenDoors && CanUsePowerBombs,
  },

  RedTowerTop: {
    RedTowerElevatorRoom: true,
    RedTowerMid: true,
  },

  RedTowerMid: {
    Door_RedTower: true,
    RedTowerTop: true,
    RedTowerBottom: true,
    XrayHallway: () => CanUsePowerBombs,
  },

  RedTowerBottom: {
    Door_AboveKraid: () => false,
    Door_KraidEntry: true,
    Door_MaridiaTube: () =>
      CanUsePowerBombs && (HasHiJump || CanMoveInWestMaridia),
    RedTowerMid: true,
    Spazer: () => HasMorph && CanOpenGreenDoors,
  },

  Door_RedElevator: {
    RedBrinstarElevatorRoom: true,
  },

  PBs_Alpha: {
    RedTowerElevatorRoom: true,
    Missiles_AlphaPBs: () => CanUsePowerBombs,
  },

  Missiles_AlphaPBs: {
    PBs_Alpha: true,
  },

  PBs_Beta: {
    RedTowerElevatorRoom: true,
  },

  Door_MaridiaEscape: {
    RedTowerElevatorRoom: () => HasMorph && SuperPacks >= 1,
  },
};
