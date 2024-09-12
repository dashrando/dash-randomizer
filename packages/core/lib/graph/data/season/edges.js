//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const EastMaridia_Plasma_to_PrePlasma = {
  edges: ["Plasma Beam", "PrePlasmaBeam"],
  requires: () => 
    (HasScrewAttack || HasPlasma ||
      (HasGravity && HasCharge && TotalTanks >= 2)) &&
      (CanFly || HasHiJump || HasSpeed || HasSpringBall),
};

const UpperNorfair_SpeedBooster_to_KingCacLedge = {
  edges: ["Speed Booster", "BubbleMountainKingCacLedge"],
  requires: () => HellRunTanks >= 3 || (HasSpeed && HellRunTanks >= 2),
};

const LowerNorfair_GoldTorizoFight_to_DefeatedGoldTorizo = {
  edges: ["GoldTorizoFight", "DefeatedGoldTorizo"],
  requires: () => HasCharge || SuperPacks >= 6,
};

const Crateria_SupersClimb_to_Climb = {
  edges: ["Supers (Climb)", "Climb"],
  requires: () =>
    HasGrapple ||
    HasSpaceJump ||
    (EnergyTanks >= 1 && (HasVaria || TotalTanks >= 2)),
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonEdgeUpdates = [
  EastMaridia_Plasma_to_PrePlasma,
  UpperNorfair_SpeedBooster_to_KingCacLedge,
  LowerNorfair_GoldTorizoFight_to_DefeatedGoldTorizo,
  Crateria_SupersClimb_to_Climb
];
