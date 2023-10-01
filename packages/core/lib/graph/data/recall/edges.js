//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const WreckedShip_Bowling_Missiles_to_Reserve = {
  edges: ["Missiles (Bowling)", "Reserve Tank (Wrecked Ship)"],
  requires: () => CanUsePowerBombs,
};

const WreckedShip_RearExit_to_HighwayExit = {
  edges: ["ShipRearExit", "Door_HighwayExit"],
  requires: () => CanMoveInWestMaridia,
};

const WestMaridia_MainStreet_to_OasisBottom = {
  edges: ["MainStreet", "OasisBottom"],
  requires: () => CanOpenRedDoors && CanMoveInWestMaridia,
};

const WestMaridia_OasisBottom_to_MainStreet = {
  edges: ["OasisBottom", "MainStreet"],
  requires: () => CanMoveInWestMaridia,
};

const EastMaridia_OasisBottom_to_SpringBall = {
  edges: ["OasisBottom", "Spring Ball"],
  requires: () => CanMoveInWestMaridia && CanUsePowerBombs,
};

const EastMaridia_SpringBall_to_OasisBottom = {
  edges: ["Spring Ball", "OasisBottom"],
  requires: () => CanMoveInWestMaridia && HasMorph,
};

const EastMaridia_PlasmaSparkRoomTop_to_PrePlasmaBeam = {
  edges: ["PlasmaSparkRoomTop", "PrePlasmaBeam"],
  requires: true,
};

const EastMaridia_PlasmaBeam_to_PrePlasmaBeam = {
  edges: ["Plasma Beam", "PrePlasmaBeam"],
  requires: true,
};

const EastMaridia_BotwoonHallway_Left_to_Right = {
  edges: ["BotwoonHallwayLeft", "BotwoonHallwayRight"],
  requires: () => (HasGravity && HasSpeed) || HasIce || HasSpazer,
};

const GreenBrinstar_ChargeBeam_to_Waterway = {
  edges: ["Charge Beam", "Energy Tank (Waterway)"],
  requires: () =>
    CanUsePowerBombs && CanOpenRedDoors && (HasSpeed || HasSpazer),
};

const UpperNorfair_PreCrocomire_to_CrocEntry = {
  edges: ["PreCrocomire", "Door_CrocEntry"],
  requires: true,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const RecallEdgeUpdates = [
  WreckedShip_Bowling_Missiles_to_Reserve,
  WreckedShip_RearExit_to_HighwayExit,
  WestMaridia_MainStreet_to_OasisBottom,
  WestMaridia_OasisBottom_to_MainStreet,
  EastMaridia_OasisBottom_to_SpringBall,
  EastMaridia_SpringBall_to_OasisBottom,
  EastMaridia_PlasmaBeam_to_PrePlasmaBeam,
  EastMaridia_PlasmaSparkRoomTop_to_PrePlasmaBeam,
  GreenBrinstar_ChargeBeam_to_Waterway,
  EastMaridia_BotwoonHallway_Left_to_Right,
  UpperNorfair_PreCrocomire_to_CrocEntry,
];
