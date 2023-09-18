export const uppernorfairEdges = {
  Door_ElevatorEntry: {
    BusinessCenter: true,
  },

  BusinessCenter: {
    Door_ElevatorEntry: true,
    Door_KraidMouth: () => SuperPacks >= 1,
    "Ice Beam": () => CanOpenGreenDoors && HellRunTanks >= 2,
    "Missiles (Crumble Shaft)": () => CanUsePowerBombs && HellRunTanks >= 2,
    BusinessCenterTopRightDoor: true,
    BusinessCenterBottomRightDoor: true,
    "Energy Tank (HJB)": () => CanOpenRedDoors,
  },

  BusinessCenterTopRightDoor: {
    BusinessCenter: true,
    BubbleMountainMain: () => HellRunTanks >= 3 && CanOpenGreenDoors,
    "Missiles (Cathedral)": () => HellRunTanks >= 5 && CanOpenRedDoors,
  },

  BusinessCenterBottomRightDoor: {
    BusinessCenter: true,
    BubbleMountainBottomLeftDoor: () => HasSpeed,
  },

  "Energy Tank (HJB)": {
    BusinessCenter: true,
    "HiJump Boots": () => HasMorph,
  },

  "HiJump Boots": {
    "Missiles (HJB)": true,
  },

  "Missiles (HJB)": {
    "Energy Tank (HJB)": () => HasMorph,
  },

  "Missiles (Cathedral)": {
    BusinessCenterTopRightDoor: () => HellRunTanks >= 5,
    BubbleMountainMain: () => CanOpenGreenDoors && HellRunTanks >= 5,
  },

  BubbleMountainMain: {
    "Missiles (Bubble Mountain)": true,
    BubbleMountainKingCacLedge: true,
    BubbleMountainTopLeftDoor: () =>
      CanFly || HasIce || HasSpringBall || HasHiJump,
    BubbleMountainBottomLeftDoor: () => CanPassBombPassages,
    "Missiles (Cathedral)": () => HellRunTanks >= 6,
    BusinessCenterTopRightDoor: () => HellRunTanks >= 4,
  },

  BubbleMountainKingCacLedge: {
    BubbleMountainMain: true,
    BubbleMountainTopLeftDoor: true, //NOTE: dboost in logic
    Door_SingleChamber: () => false,
    "Missiles (Speed)": () =>
      HellRunTanks >= 3 || (HasSpeed && HellRunTanks >= 2),
    "Speed Booster": () => HellRunTanks >= 3 || (HasSpeed && HellRunTanks >= 2),
    "Missiles (Wave)": () => HellRunTanks >= 2,
    BubbleMountainBottomLeftDoor: () => HellRunTanks >= 8,
  },

  BubbleMountainTopLeftDoor: {
    BubbleMountainMain: true,
    "Missiles (Norfair Reserve 1)": () =>
      CanOpenGreenDoors && HellRunTanks >= 1,
  },

  BubbleMountainBottomLeftDoor: {
    BubbleMountainMain: () => CanPassBombPassages,
    BusinessCenterBottomRightDoor: () => HasSpeed,
    NutellaRefill: () => HellRunTanks >= 1 && (HasWave || CanOpenRedDoors),
    KronicBoostBottom: () => HellRunTanks >= 2,
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

  "Missiles (Wave)": {
    BubbleMountainKingCacLedge: () => HellRunTanks >= 3,
    "Wave Beam": () => HellRunTanks >= 3,
  },

  "Wave Beam": {
    BubbleMountainKingCacLedge: () => HellRunTanks >= 4,
  },

  "Missiles (Norfair Reserve 1)": {
    BubbleMountainTopLeftDoor: () => HellRunTanks >= 1,
    "Reserve Tank (Norfair)": () => HellRunTanks >= 2,
  },

  "Missiles (Norfair Reserve 2)": {
    "Missiles (Norfair Reserve 1)": () => HellRunTanks >= 3,
  },

  "Reserve Tank (Norfair)": {
    "Missiles (Norfair Reserve 2)": true,
  },

  Door_SingleChamber: {
    BubbleMountainKingCacLedge: () =>
      HellRunTanks >= 2 && CanDestroyBombWalls && HasMorph,
  },

  Door_LavaDive: {
    KronicBoostBottom: true,
  },

  "Missiles (Speed)": {
    BubbleMountainKingCacLedge: () =>
      HellRunTanks >= 4 || (HasSpeed && HellRunTanks >= 2),
  },

  "Speed Booster": {
    BubbleMountainKingCacLedge: () =>
      HellRunTanks >= 4 || (HasSpeed && HellRunTanks >= 2),
  },

  "Missiles (Bubble Mountain)": {
    BubbleMountainMain: true,
  },

  Door_KraidMouth: {
    BusinessCenter: () => SuperPacks >= 1,
  },

  "Ice Beam": {
    BusinessCenter: () => CanPassBombPassages && HellRunTanks >= 2,
  },

  "Missiles (Crumble Shaft)": {
    BusinessCenter: () => CanUsePowerBombs && HellRunTanks >= 2,
    PreCrocomire: () => HasSpeed && HellRunTanks >= 2,
  },

  PreCrocomire: {
    Door_CrocEntry: () => CanOpenGreenDoors,
    NutellaRefill: () => HellRunTanks >= 1,
    "Missiles (Croc Escape)": () =>
      HellRunTanks >= 2 &&
      (CanFly ||
        HasIce ||
        HasGrapple ||
        HasDoubleJump ||
        (HasHiJump && (HasSpringBall || HasSpeed))), //TODO: Remove getting across with ice
  },

  "Missiles (Croc Escape)": {
    BusinessCenter: () => CanOpenGreenDoors,
    PreCrocomire: () => HasMorph && HellRunTanks >= 2,
  },

  Door_CrocEntry: {
    PreCrocomire: true,
  },
};
