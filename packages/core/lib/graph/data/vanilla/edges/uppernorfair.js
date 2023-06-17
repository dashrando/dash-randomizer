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
    CathedralEntranceMain: () => CanHellRun,
  },

  CathedralEntranceMain: {
    CathedralEntranceLeftDoor: () => CanHellRun,
    CathedralEntranceRightDoor: () =>
      CanHellRun && (HasHiJump || CanFly || HasSpeed),
  },

  CathedralEntranceRightDoor: {
    Missiles_Cathedral: () => CanHellRun && CanOpenRedDoors,
    CathedralEntranceMain: () => CanHellRun,
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
    CathedralEntranceRightDoor: () => CanHellRun,
    BubbleMountainMain: () => CanOpenGreenDoors && CanHellRun,
  },

  BubbleMountainMain: {
    Missiles_BubbleMountain: true,
    BubbleMountainKingCacLedge: true,
    BubbleMountainTopLeftDoor: () =>
      CanFly || HasIce || HasSpringBall || HasHiJump,
    BubbleMountainBottomLeftDoor: () => CanPassBombPassages,
    Missiles_Cathedral: () => CanHellRun,
  },

  BubbleMountainKingCacLedge: {
    BubbleMountainMain: true,
    BubbleMountainTopLeftDoor: true, //NOTE: dboost in logic
    Door_SingleChamber: () => false,
    Missiles_SpeedBooster: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
    KronicBoostTop: () => HasVaria && (HasGravity || TotalTanks >= 2),
  },

  BubbleMountainTopLeftDoor: {
    BubbleMountainMain: true,
    BubbleMountainKingCacLedge: true, //TODO: update?
    Missiles_NorfairReserve1: () => CanOpenGreenDoors && HellRunTanks >= 1,
  },

  BubbleMountainBottomLeftDoor: {
    BubbleMountainMain: () => CanPassBombPassages,
    BusinessCenterBottomRightDoor: () => HasSpeed,
    NutellaRefill: () => HellRunTanks >= 1 && (HasWave || CanOpenGreenDoors),
    KronicBoostTop: () => CanHellRun,
  },

  KronicBoostTop: {
    BubbleMountainKingCacLedge: () => HasVaria,
    BubbleMountainBottomLeftDoor: () => CanHellRun,
    NutellaRefill: () =>
      HasMorph &&
      (HasWave || CanOpenGreenDoors) &&
      (HasGrapple || HasSpaceJump) &&
      CanHellRun,
    Door_LavaDive: () => CanUsePowerBombs && CanHellRun,
  },

  NutellaRefill: {
    BubbleMountainBottomLeftDoor: () => HellRunTanks >= 1,
    KronicBoostTop: () =>
      CanHellRun && HasMorph && (HasGrapple || HasSpaceJump),
    PreCrocomire: () => HellRunTanks >= 1,
  },

  Missiles_Wave: {
    BubbleMountainKingCacLedge: () => CanHellRun,
    WaveBeam: () => CanHellRun,
  },

  WaveBeam: {
    BubbleMountainKingCacLedge: () => CanHellRun,
    Missiles_Wave: () => CanHellRun,
  },

  Missiles_NorfairReserve1: {
    BubbleMountainTopLeftDoor: () => HellRunTanks >= 1,
    Missiles_NorfairReserve2: () => CanHellRun,
  },

  Missiles_NorfairReserve2: {
    Missiles_NorfairReserve1: () => CanHellRun,
    ReserveTank_Norfair: () => CanHellRun,
  },

  ReserveTank_Norfair: {
    Missiles_NorfairReserve2: () => CanHellRun,
  },

  Door_SingleChamber: {
    BubbleMountainKingCacLedge: () =>
      CanHellRun && CanDestroyBombWalls && HasMorph,
  },

  Door_LavaDive: {
    KronicBoostTop: () => CanHellRun,
  },

  Missiles_SpeedBooster: {
    BubbleMountainKingCacLedge: () => CanHellRun,
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
    PreCrocomire: () => HasVaria && HasSpeed,
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
