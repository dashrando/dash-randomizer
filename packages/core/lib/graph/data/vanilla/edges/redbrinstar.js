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
        (((HasHiJump && HasSpeed) || HasIce) && TotalTanks >= 4)),
  },

  XrayScope: {
    XrayHallway: () =>
      (CanUseBombs || CanUsePowerBombs) &&
      (HasSpaceJump ||
        HasGrapple ||
        (((HasHiJump && HasSpeed) || HasIce) && TotalTanks >= 4)),
  },

  Door_AboveKraid: {
    RedTowerBottom: () => SuperPacks >= 1,
  },

  Door_KraidEntry: {
    RedTowerBottom: true,
  },

  Spazer: {
    RedTowerBottom: () => HasMorph && CanOpenGreenDoors,
  },

  Door_MaridiaTube: {
    RedTowerBottom: () => HasMorph,
  },

  RedBrinstarElevatorRoom: {
    Door_RedElevator: () => CanUsePowerBombs,
    RedTowerElevatorRoom: true,
  },

  RedTowerElevatorRoom: {
    Door_MaridiaEscape: (_) => false, //for future use
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
    RedTowerMid: () => HasIce || HasHiJump || HasSpaceJump,
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
