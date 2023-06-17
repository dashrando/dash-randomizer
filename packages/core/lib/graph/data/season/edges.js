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
  requires: () =>
    HasSpaceJump ||
    HasGrapple ||
    TotalTanks >= 2 ||
    (HasVaria && TotalTanks >= 1),
};

const Crocomire_EnergyTank_to_PostCroc = {
  edges: ["EnergyTank_Croc", "PostCroc"],
  requires: () =>
    HasSpaceJump ||
    HasGrapple ||
    TotalTanks >= 3 ||
    (HasVaria && TotalTanks >= 1),
};

const RedBrinstar_Xray_Hallway_to_Scope = {
  edges: ["XrayHallway", "XrayScope"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (TotalTanks >= 6 &&
        (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

const RedBrinstar_Xray_Scope_to_Hallway = {
  edges: ["XrayScope", "XrayHallway"],
  requires: () =>
    CanOpenRedDoors &&
    HasMorph &&
    (HasSpaceJump ||
      HasGrapple ||
      (TotalTanks >= 6 &&
        (HasIce || CanUseBombs || (HasHiJump && (HasSpeed || HasSpringBall))))),
};

const UpperNorfair_KingCacLedge_to_SpeedMissiles = {
  edges: ["BubbleMountainKingCacLedge", "Missiles_SpeedBooster"],
  requires: () => HellRunTanks >= 4 || (HasSpeed && HellRunTanks >= 3),
};

const UpperNorfair_SpeedMissiles_to_KingCacLedge = {
  edges: ["Missiles_SpeedBooster", "BubbleMountainKingCacLedge"],
  requires: () => HellRunTanks >= 4 || (HasSpeed && HellRunTanks >= 3),
};

const UpperNorfair_KingCacLedge_to_KronicBoostTop = {
  edges: ["BubbleMountainKingCacLedge", "KronicBoostTop"],
  requires: () => HellRunTanks >= 8,
};

const UpperNorfair_KronicBoostTop_to_KingCacLedge = {
  edges: ["KronicBoostTop", "BubbleMountainKingCacLedge"],
  requires: () => HellRunTanks >= 6,
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
  UpperNorfair_KingCacLedge_to_SpeedMissiles,
  UpperNorfair_SpeedMissiles_to_KingCacLedge,
  UpperNorfair_KingCacLedge_to_KronicBoostTop,
  UpperNorfair_KronicBoostTop_to_KingCacLedge,
]);
