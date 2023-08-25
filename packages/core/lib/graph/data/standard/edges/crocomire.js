export const crocomireEdges = {
  Door_Croc: {
    PostCroc: () => CanKillCrocomire,
  },

  PostCroc: {
    Door_Croc: true,
    EnergyTank_Croc: () =>
      HasSpaceJump || HasGrapple || HasVaria || TotalTanks >= 2,
    PBs_Croc: () =>
      CanOpenRedDoors &&
      (CanFly ||
        HasGrapple ||
        (HasSpeed && TotalTanks >= 1) ||
        HasHiJump ||
        HasIce ||
        HasDoubleJump),
    GrappleBeam: () =>
      SuperPacks >= 1 ||
      (HasMorph && (CanFly || HasDoubleJump)) ||
      (CanUsePowerBombs && HasSpeed) ||
      (HasHiJump && (HasSpeed || (HasMorph && HasSpringBall))),
    Missiles_IndianaJones: () =>
      ((HasDoubleJump || CanFly) && (HasMorph || SuperPacks >= 1)) ||
      (CanUsePowerBombs && HasSpeed),
    Missiles_Cosine: () => CanOpenRedDoors,
  },

  EnergyTank_Croc: {
    PostCroc: () => HasSpaceJump || HasGrapple || HasVaria || TotalTanks >= 3,
  },

  PBs_Croc: {
    PostCroc: true,
  },

  GrappleBeam: {
    PostCroc: () => SuperPacks >= 1 || HasMorph,
  },

  Missiles_IndianaJones: {
    PostCroc: () => HasMorph || (CanFly && SuperPacks >= 1),
  },

  Missiles_Cosine: {
    PostCroc: true,
  },
};
