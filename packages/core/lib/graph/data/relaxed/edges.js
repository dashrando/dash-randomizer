//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const WestMaridia_DoorMainStreet_to_MainStreet = {
  edges: ["Door_MainStreet", "MainStreet"],
  requires: () => CanMoveInWestMaridia,
};

const WestMaridia_DoorPreAqueduct_to_EverestTopRight = {
  edges: ["Door_PreAqueduct", "EverestTopRight"],
  requires: () => CanMoveInWestMaridia,
};

const WestMaridia_DoorMaridiaMap_to_AboveMaridiaMap = {
  edges: ["Door_MaridiaMap", "AboveMaridiaMap"],
  requires: () => HasMorph && CanMoveInWestMaridia,
};

const WestMaridia_DoorRedFish_to_RedFish = {
  edges: ["Door_RedFish", "RedFish"],
  requires: () => HasMorph && CanMoveInWestMaridia,
};

const EastMaridia_DoorAqueduct_to_Aqueduct = {
  edges: ["Door_Aqueduct", "Aqueduct"],
  requires: () => CanUsePowerBombs && HasGravity,
};

const EastMaridia_DoorHighway_to_MaridiaHighway = {
  edges: ["Door_Highway", "MaridiaHighway"],
  requires: () => HasGravity,
};

const EastMaridia_Aqueduct_to_Missiles = {
  edges: ["Aqueduct", "Missiles (Aqueduct)"],
  requires: () => HasGravity && HasSpeed,
};

const EastMaridia_OasisBottom_to_SpringBall = {
  edges: ["OasisBottom", "Spring Ball"],
  requires: () => CanMoveInWestMaridia && CanUsePowerBombs &&
    HasGrapple && (CanFly || HasHiJump)
};

const UpperNorfair_BusinessCenter_to_TopRightDoor = {
  edges: ["BusinessCenter", "BusinessCenterTopRightDoor"],
  requires: () => HasVaria || HasHeatShield,
};

const UpperNorfair_BusinessCenter_to_BottomRightDoor = {
  edges: ["BusinessCenter", "BusinessCenterBottomRightDoor"],
  requires: () => HasVaria || HasHeatShield,
};

const UpperNorfair_DoorSingleChamber_to_TopRightDoor = {
  edges: ["Door_SingleChamber", "SingleChamberTopRightDoor"],
  requires: () => HasVaria || HasHeatShield,
};

const UpperNorfair_DoorLavaDive_to_KronicBoostBottom = {
  edges: ["Door_LavaDive", "KronicBoostBottom"],
  requires: () => HasVaria || HasHeatShield,
};

const UpperNorfair_DoorCrocEntry_to_PreCrocomire = {
  edges: ["Door_CrocEntry", "PreCrocomire"],
  requires: () => HasVaria || HasHeatShield,
};

const UpperNorfair_IceBeamGatesTopLeft_to_IceBeam = {
  edges: ["IceBeamGatesTopLeftDoor", "Ice Beam"],
  requires: () => HasMorph && (HasVaria || HasHeatShield),
};

const UpperNorfair_IceBeamGatesBottomLeft_to_CrumbleShaft = {
  edges: ["IceBeamGatesBottomLeftDoor", "Missiles (Crumble Shaft)"],
  requires: () => HasVaria || HasHeatShield,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const RelaxedEdgeUpdates = [
  WestMaridia_DoorMainStreet_to_MainStreet,
  WestMaridia_DoorPreAqueduct_to_EverestTopRight,
  WestMaridia_DoorMaridiaMap_to_AboveMaridiaMap,
  WestMaridia_DoorRedFish_to_RedFish,
  EastMaridia_DoorAqueduct_to_Aqueduct,
  EastMaridia_DoorHighway_to_MaridiaHighway,
  EastMaridia_Aqueduct_to_Missiles,
  EastMaridia_OasisBottom_to_SpringBall,
  UpperNorfair_BusinessCenter_to_TopRightDoor,
  UpperNorfair_BusinessCenter_to_BottomRightDoor,
  UpperNorfair_DoorSingleChamber_to_TopRightDoor,
  UpperNorfair_DoorLavaDive_to_KronicBoostBottom,
  UpperNorfair_DoorCrocEntry_to_PreCrocomire,
  UpperNorfair_IceBeamGatesTopLeft_to_IceBeam,
  UpperNorfair_IceBeamGatesBottomLeft_to_CrumbleShaft
]