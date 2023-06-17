export const crocomireEdges = {
  Door_Croc: {
    PostCroc: () => HasCharge || MissilePacks >= 2 || SuperPacks >= 2,
  },

  PostCroc: {
    Door_Croc: true,
    EnergyTank_Croc: () =>
      //TODO: need to ask Kipp how many tanks should put this in logic
      //TODO: also need to account for varia/gravity in tank count
      (EnergyTanks >= 3 && TotalTanks >= 4) || HasSpaceJump || HasGrapple,
    PBs_Croc: () =>
      CanOpenRedDoors &&
      (CanFly ||
        HasGrapple ||
        (HasSpeed && TotalTanks >= 1) ||
        HasHiJump ||
        HasIce ||
        HasDoubleJump),
    GrappleBeam: () =>
      SuperPacks >= 1 || (HasMorph && CanFly) || (CanUsePowerBombs && HasSpeed),
    Missiles_IndianaJones: () =>
      ((HasDoubleJump || CanFly) && (HasMorph || SuperPacks >= 1)) ||
      (CanUsePowerBombs && HasSpeed),
    Missiles_Cosine: () => CanOpenRedDoors,
  },

  EnergyTank_Croc: {
    PostCroc: true,
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
