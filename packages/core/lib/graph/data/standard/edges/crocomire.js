export const crocomireEdges = {
  Door_Croc: {
    PostCroc: () => CanKillCrocomire,
  },

  PostCroc: {
    Door_Croc: true,
    "Energy Tank (Crocomire)": () =>
      HasSpaceJump || HasGrapple || HasVaria || TotalTanks >= 2,
    "Power Bombs (Crocomire)": () =>
      CanOpenRedDoors &&
      (CanFly ||
        HasGrapple ||
        (HasSpeed && TotalTanks >= 1) ||
        HasHiJump ||
        HasIce ||
        HasDoubleJump),
    "Grapple Beam": () =>
      SuperPacks >= 1 ||
      (HasMorph && (CanFly || HasDoubleJump)) ||
      (CanUsePowerBombs && HasSpeed) ||
      (HasHiJump && (HasSpeed || (HasMorph && HasSpringBall))),
    "Missiles (Indiana Jones)": () =>
      ((HasDoubleJump || CanFly) && (HasMorph || SuperPacks >= 1)) ||
      (CanUsePowerBombs && HasSpeed),
    "Missiles (Cosine)": () => CanOpenRedDoors,
  },

  "Energy Tank (Crocomire)": {
    PostCroc: () => HasSpaceJump || HasGrapple || HasVaria || TotalTanks >= 3,
  },

  "Power Bombs (Crocomire)": {
    PostCroc: true,
  },

  "Grapple Beam": {
    PostCroc: () => SuperPacks >= 1 || HasMorph,
  },

  "Missiles (Indiana Jones)": {
    PostCroc: () => HasMorph || (CanFly && SuperPacks >= 1),
  },

  "Missiles (Cosine)": {
    PostCroc: true,
  },
};
