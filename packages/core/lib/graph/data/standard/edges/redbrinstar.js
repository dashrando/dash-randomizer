export const redbrinstarEdges = {
  Door_RedTower: {
    RedTowerMid: true,
  },

  XrayHallway: {
    RedTowerMid: () => CanUsePowerBombs,
    "Xray Scope": () =>
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

  "Xray Scope": {
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
    "Power Bombs (Alpha)": () => CanOpenGreenDoors,
    "Power Bombs (Beta)": () => CanOpenGreenDoors && CanUsePowerBombs,
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

  "Power Bombs (Alpha)": {
    RedTowerElevatorRoom: true,
    "Missiles (Alpha PBs)": () => CanUsePowerBombs,
  },

  "Missiles (Alpha PBs)": {
    "Power Bombs (Alpha)": true,
  },

  "Power Bombs (Beta)": {
    RedTowerElevatorRoom: true,
  },

  Door_MaridiaEscape: {
    RedTowerElevatorRoom: () => HasMorph && SuperPacks >= 1,
  },
};
