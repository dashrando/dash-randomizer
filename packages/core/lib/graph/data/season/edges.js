//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_ClimbSupers_to_Climb = {
  edges: ["Supers_Climb", "Climb"],
  requires: () =>
    HasGrapple || HasSpaceJump || (EnergyTanks >= 1 && TotalTanks >= 2),
};

const Crateria_Gauntlet_Pre_to_EnergyTank = {
  edges: ["PreGauntlet", "EnergyTank_Gauntlet"],
  requires: () =>
    CanUseBombs ||
    (HasMorph && PowerBombPacks >= 2) ||
    HasScrewAttack ||
    (TotalTanks >= 3 && HasSpeed),
};

const Crateria_Gauntlet_EnergyTank_to_BackSideLeftDoor = {
  edges: ["EnergyTank_Gauntlet", "GauntletBackSideLeftDoor"],
  requires: () =>
    CanUseBombs ||
    (HasMorph && PowerBombPacks >= 2) ||
    HasScrewAttack ||
    (TotalTanks >= 3 && HasSpeed),
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonEdgeUpdates = [
  Crateria_ClimbSupers_to_Climb,
  Crateria_Gauntlet_Pre_to_EnergyTank,
  Crateria_Gauntlet_EnergyTank_to_BackSideLeftDoor,
];
