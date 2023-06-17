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

const UpperNorfair_CathedralEntrance_Main_to_TopRightDoor = {
  edges: ["CathedralEntranceMain", "CathedralEntranceRightDoor"],
  requires: () => CanHellRun,
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
  UpperNorfair_CathedralEntrance_Main_to_TopRightDoor,
  UpperNorfair_HiJumpEnergyTankRoom_Missiles_to_EnergyTank,
];
