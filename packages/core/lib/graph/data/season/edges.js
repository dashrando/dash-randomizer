import { CommonEdgeUpdates } from "../common/edges";

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

const Crocomire_PostCroc_to_EnergyTank = {
  edges: ["PostCroc", "EnergyTank_Croc"],
  requires: () => HasSpaceJump || HasGrapple || EnvDamageTanks >= 2,
};

const Crocomire_EnergyTank_to_PostCroc = {
  edges: ["EnergyTank_Croc", "PostCroc"],
  requires: () => HasSpaceJump || HasGrapple || EnvDamageTanks >= 3,
};

const RedBrinstar_Xray_Hallway_to_Scope = {
  edges: ["XrayHallway", "XrayScope"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (EnvDamageTanks >= 6 &&
        (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

const RedBrinstar_Xray_Scope_to_Hallway = {
  edges: ["XrayScope", "XrayHallway"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (EnvDamageTanks >= 6 &&
        (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonEdgeUpdates = CommonEdgeUpdates.concat([
  Crateria_ClimbSupers_to_Climb,
  Crateria_Gauntlet_Pre_to_EnergyTank,
  Crateria_Gauntlet_EnergyTank_to_BackSideLeftDoor,
  Crocomire_PostCroc_to_EnergyTank,
  Crocomire_EnergyTank_to_PostCroc,
  RedBrinstar_Xray_Hallway_to_Scope,
  RedBrinstar_Xray_Scope_to_Hallway,
]);
