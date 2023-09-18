//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_PreMoat_to_Crabs = {
  edges: ["PreMoat", "Door_Crabs"],
  requires: true,
};

const Crateria_Terminator_to_G4 = {
  edges: ["Energy Tank (Terminator)", "Door_G4"],
  requires: true,
};

const GreenBrinstar_Tube_to_GreenHillsPortal = {
  edges: ["Missiles (Brin Tube)", "Door_GreenHills"],
  requires: true,
};

const GreenBrinstar_Tube_to_NoobBridgePortal = {
  edges: ["Missiles (Brin Tube)", "Door_NoobBridge"],
  requires: true,
};

const GreenBrinstar_NoobBridgePortal_to_Tube = {
  edges: ["Door_NoobBridge", "Missiles (Brin Tube)"],
  requires: true,
};

const UpperNorfair_PreCrocomire_to_CrocEntry = {
  edges: ["PreCrocomire", "Door_CrocEntry"],
  requires: true,
};

const UpperNorfair_KingCacLedge_to_SingleChamberPortal = {
  edges: ["BubbleMountainKingCacLedge", "Door_SingleChamber"],
  requires: () => HasMorph && CanDestroyBombWalls && HellRunTanks >= 2,
};

const UpperNorfair_KronicBoostBottom_to_LavaDivePortal = {
  edges: ["KronicBoostBottom", "Door_LavaDive"],
  requires: true,
};

const RedBrinstar_RedTowerElevator_to_MaridiaEscapePortal = {
  edges: ["RedTowerElevatorRoom", "Door_MaridiaEscape"],
  requires: true,
};

const RedBrinstar_MaridiaEscapePortal_to_RedTowerElevator = {
  edges: ["Door_MaridiaEscape", "RedTowerElevatorRoom"],
  requires: true,
};

const RedBrinstar_RedTowerBottom_to_AboveKraidPortal = {
  edges: ["RedTowerBottom", "Door_AboveKraid"],
  requires: true,
};

const RedBrinstar_AboveKraidPortal_to_RedTowerBottom = {
  edges: ["Door_AboveKraid", "RedTowerBottom"],
  requires: true,
};

const WreckedShip_ShipHallway_to_SpongeBath = {
  edges: ["ShipHallway", "SpongeBathLeft"],
  requires: true,
};

const WreckedShip_RearExit_to_Highway = {
  edges: ["ShipRearExit", "Door_HighwayExit"],
  requires: () => (HasHiJump || HasGravity) && HasMorph,
};

const EastMaridia_OasisBottom_to_Aqueduct = {
  edges: ["OasisBottom", "Aqueduct"],
  requires: () => HasGravity,
};

const EastMaridia_AqueductPortal_to_Aqueduct = {
  edges: ["Door_Aqueduct", "Aqueduct"],
  requires: () =>
    CanUseBombs || CanUsePowerBombs || (HasGravity && HasScrewAttack),
};

const EastMaridia_OasisBottom_to_MainStreet = {
  edges: ["OasisBottom", "MainStreet"],
  requires: () => false,
};

const WestMaridia_MainStreet_to_OasisBottom = {
  edges: ["MainStreet", "OasisBottom"],
  requires: () => false,
};

const WestMaridia_MainStreet_to_MaridiaMapPortal = {
  edges: ["MainStreet", "Door_MaridiaMap"],
  requires: () => HasMorph,
};

const WestMaridia_EverestTopRight_to_PreAqueductPortal = {
  edges: ["Door_EverestTopRight", "Door_PreAqueduct"],
  requires: true,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const StandardAreaEdgeUpdates = [
  Crateria_PreMoat_to_Crabs,
  Crateria_Terminator_to_G4,
  GreenBrinstar_Tube_to_GreenHillsPortal,
  GreenBrinstar_Tube_to_NoobBridgePortal,
  GreenBrinstar_NoobBridgePortal_to_Tube,
  UpperNorfair_KingCacLedge_to_SingleChamberPortal,
  UpperNorfair_KronicBoostBottom_to_LavaDivePortal,
  UpperNorfair_PreCrocomire_to_CrocEntry,
  RedBrinstar_RedTowerElevator_to_MaridiaEscapePortal,
  RedBrinstar_RedTowerBottom_to_AboveKraidPortal,
  RedBrinstar_MaridiaEscapePortal_to_RedTowerElevator,
  RedBrinstar_AboveKraidPortal_to_RedTowerBottom,
  WreckedShip_ShipHallway_to_SpongeBath,
  WreckedShip_RearExit_to_Highway,
  EastMaridia_OasisBottom_to_Aqueduct,
  EastMaridia_OasisBottom_to_MainStreet,
  WestMaridia_MainStreet_to_OasisBottom,
  WestMaridia_MainStreet_to_MaridiaMapPortal,
  WestMaridia_EverestTopRight_to_PreAqueductPortal,
  EastMaridia_AqueductPortal_to_Aqueduct,
];
