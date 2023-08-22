//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_ConstructionZoneToTacoTank = {
  edges: ["ConstructionZone", "TacoTankRoom"],
  requires: true,
};

const RedBrinstar_RedBrinstarElevatorRoomToPreMoat = {
  edges: ["RedBrinstarElevatorRoom", "Door_RedElevator"],
  requires: true,
};

const RedBrinstar_RedTower_Bottom_to_Mid = {
  edges: ["RedTowerBottom", "RedTowerMid"],
  requires: true,
};

const UpperNorfair_BusinessCenter_to_BubbleMountain = {
  edges: ["BusinessCenterTopRightDoor", "BubbleMountainMain"],
  requires: () => HellRunTanks >= 3 && CanOpenGreenDoors,
};

const UpperNorfair_BusinessCenter_to_Cathedral = {
  edges: ["BusinessCenterTopRightDoor", "Missiles_Cathedral"],
  requires: () => HellRunTanks >= 5 && CanOpenRedDoors,
};

const UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank = {
  edges: ["Missiles_HiJump", "EnergyTank_HiJump"],
  requires: () => HasMorph,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const CommonEdgeUpdates = [
  Crateria_ConstructionZoneToTacoTank,
  RedBrinstar_RedBrinstarElevatorRoomToPreMoat,
  RedBrinstar_RedTower_Bottom_to_Mid,
  UpperNorfair_BusinessCenter_to_BubbleMountain,
  UpperNorfair_BusinessCenter_to_Cathedral,
  UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank,
];
