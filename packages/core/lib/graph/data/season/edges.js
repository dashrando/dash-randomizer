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

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonEdgeUpdates = [
  EastMaridia_Plasma_to_PrePlasma,
  UpperNorfair_SpeedBooster_to_KingCacLedge,
];
