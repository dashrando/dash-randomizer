export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: true,
    Door_KraidMouth: () => SuperPacks >= 1,
    IceBeam: () => CanOpenGreenDoors && HellRunTanks >= 2,
    Missiles_CrumbleShaft: () => CanUsePowerBombs && HellRunTanks >= 2,
    BusinessCenterTopRightDoor: true,
    BusinessCenterBottomRightDoor: true,
    EnergyTank_HiJump: () => CanOpenRedDoors,
  },

  BusinessCenterTopRightDoor: {
    BusinessCenter: true,
    CathedralEntranceLeftDoor: true,
  },

  BusinessCenterBottomRightDoor: {
    BusinessCenter: true,
    BubbleMountainBottomLeftDoor: () => HasSpeed,
  },

  CathedralEntranceLeftDoor: {
    BusinessCenterTopRightDoor: true,
    CathedralEntranceMain: () => HellRunTanks >= 1,
  },

  CathedralEntranceMain: {
    CathedralEntranceLeftDoor: () => HellRunTanks >= 3,
    CathedralEntranceRightDoor: () =>
      HellRunTanks >= 2 && (HasHiJump || CanFly || HasSpeed),
  },

  CathedralEntranceRightDoor: {
    Missiles_Cathedral: () => HellRunTanks >= 3 && CanOpenRedDoors,
    CathedralEntranceMain: true,
  },

  EnergyTank_HiJump: {
    BusinessCenter: true,
    HiJumpBoots: () => HasMorph,
  },

  HiJumpBoots: {
    Missiles_HiJump: true,
  },

  Missiles_HiJump: {
    EnergyTank_HiJump: () => CanPassBombPassages,
  },

  Missiles_Cathedral: {
    CathedralEntranceRightDoor: () => HellRunTanks >= 3,
    BubbleMountainMain: () => CanOpenGreenDoors && HellRunTanks >= 3,
  },

  BubbleMountainMain: {
    Missiles_BubbleMountain: true,
    BubbleMountainKingCacLedge: true,
    BubbleMountainTopLeftDoor: () =>
      CanFly || HasIce || HasSpringBall || HasHiJump,
    BubbleMountainBottomLeftDoor: () => CanPassBombPassages,
    Missiles_Cathedral: () => HellRunTanks >= 3,
  },

  BubbleMountainKingCacLedge: {
    BubbleMountainMain: true,
    BubbleMountainTopLeftDoor: true, //NOTE: dboost in logic
    Door_SingleChamber: () => false,
    Missiles_SpeedBooster: () =>
      HellRunTanks >= 3 || (HasSpeed && HellRunTanks >= 2),
    Missiles_Wave: () => HellRunTanks >= 3,
    BubbleMountainBottomLeftDoor: () => HellRunTanks >= 8,
  },

  BubbleMountainTopLeftDoor: {
    BubbleMountainMain: true,
    Missiles_NorfairReserve1: () => CanOpenGreenDoors && HellRunTanks >= 1,
  },

  BubbleMountainBottomLeftDoor: {
    BubbleMountainMain: () => CanPassBombPassages,
    BusinessCenterBottomRightDoor: () => HasSpeed,
    NutellaRefill: () => HellRunTanks >= 1 && (HasWave || CanOpenRedDoors),
    KronicBoostBottom: () => HellRunTanks >= 3,
    BubbleMountainKingCacLedge: () => HellRunTanks >= 6,
  },

  KronicBoostBottom: {
    BubbleMountainBottomLeftDoor: () => HellRunTanks >= 2, //TODO: pretty aggressive
    Door_LavaDive: () => CanUsePowerBombs,
    //TODO: could probably remove this because going around requires less
    //NutellaRefill: () =>
    //HasMorph &&
    //(HasWave || CanOpenGreenDoors) &&
    //(HasGrapple || HasSpaceJump) &&
    //HellRunTanks >= 3,
  },

  NutellaRefill: {
    BubbleMountainBottomLeftDoor: () => HellRunTanks >= 1,
    KronicBoostBottom: () =>
      HellRunTanks >= 2 && HasMorph && (HasGrapple || HasSpaceJump),
    PreCrocomire: () => HellRunTanks >= 1,
  },

  Missiles_Wave: {
    BubbleMountainKingCacLedge: () => HellRunTanks >= 4,
    WaveBeam: () => HellRunTanks >= 4,
  },

  WaveBeam: {
    BubbleMountainKingCacLedge: () => HellRunTanks >= 4,
  },

  Missiles_NorfairReserve1: {
    BubbleMountainTopLeftDoor: () => HellRunTanks >= 1,
    ReserveTank_Norfair: () => HellRunTanks >= 2,
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: () => HellRunTanks >= 4,
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: true,
  },

  Door_SingleChamber: {
    BubbleMountainKingCacLedge: () =>
      HellRunTanks >= 3 && CanDestroyBombWalls && HasMorph,
  },

  Door_LavaDive: {
    KronicBoostBottom: true,
  },

  Missiles_SpeedBooster: {
    BubbleMountainKingCacLedge: () =>
      HellRunTanks >= 4 || (HasSpeed && HellRunTanks >= 3),
    SpeedBooster: true,
  },

  SpeedBooster: {
    Missiles_SpeedBooster: true,
  },

  Missiles_BubbleMountain: {
    BubbleMountainMain: true,
  },

  Door_KraidMouth: {
    BusinessCenter: () => SuperPacks >= 1,
  },

  IceBeam: {
    BusinessCenter: () => CanPassBombPassages && HellRunTanks >= 2,
  },

  Missiles_CrumbleShaft: {
    BusinessCenter: () => CanUsePowerBombs && HellRunTanks >= 3,
    PreCrocomire: () => HasSpeed && HellRunTanks >= 2,
  },

  PreCrocomire: {
    Door_CrocEntry: () => CanOpenGreenDoors,
    NutellaRefill: () => HellRunTanks >= 1,
    Missiles_CrocEscape: () =>
      HellRunTanks >= 2 &&
      (CanFly ||
        HasIce || //TODO: Remove getting across with ice
        HasGrapple ||
        HasDoubleJump ||
        (HasHiJump && (HasSpringBall || HasSpeed))),
  },

  Missiles_CrocEscape: {
    BusinessCenter: () => CanOpenGreenDoors,
    PreCrocomire: () => HasMorph && HellRunTanks >= 2,
  },

  Door_CrocEntry: {
    PreCrocomire: true,
  },
};
