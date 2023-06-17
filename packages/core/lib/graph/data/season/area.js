import { SeasonEdgeUpdates } from "./edges";

//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const Crateria_PreMoat_to_Crabs = {
  edges: ["PreMoat", "Door_Crabs"],
  requires: true,
};

const GreenBrinstar_Tube_to_GreenHillsPortal = {
  edges: ["Missiles_Tube", "Door_GreenHills"],
  requires: true,
};

const UpperNorfair_KingCacLedge_to_SingleChamberPortal = {
  edges: ["BubbleMountainKingCacLedge", "Door_SingleChamber"],
  requires: () => HasMorph && CanDestroyBombWalls && CanHellRun,
};

const RedBrinstar_RedTowerElevator_to_MaridiaEscapePortal = {
  edges: ["RedTowerElevatorRoom", "Door_MaridiaEscape"],
  requires: true,
};

const RedBrinstar_RedTowerBottom_to_AboveKraidPortal = {
  edges: ["RedTowerBottom", "Door_AboveKraid"],
  requires: true,
};

const WreckedShip_ShipHallway_to_SpongeBath = {
  edges: ["ShipHallway", "SpongeBathLeft"],
  requires: true,
};

const EastMaridia_OasisBottom_to_Aqueduct = {
  edges: ["OasisBottom", "Aqueduct"],
  requires: () => HasGravity,
};

const EastMaridia_OasisBottom_to_MainStreet = {
  edges: ["OasisBottom", "MainStreet"],
  requires: () => false,
};

const WestMaridia_MainStreet_to_OasisBottom = {
  edges: ["MainStreet", "OasisBottom"],
  requires: () => false,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const SeasonAreaEdgeUpdates = SeasonEdgeUpdates.concat([
  Crateria_PreMoat_to_Crabs,
  GreenBrinstar_Tube_to_GreenHillsPortal,
  UpperNorfair_KingCacLedge_to_SingleChamberPortal,
  RedBrinstar_RedTowerElevator_to_MaridiaEscapePortal,
  RedBrinstar_RedTowerBottom_to_AboveKraidPortal,
  WreckedShip_ShipHallway_to_SpongeBath,
  EastMaridia_OasisBottom_to_Aqueduct,
  EastMaridia_OasisBottom_to_MainStreet,
  WestMaridia_MainStreet_to_OasisBottom,
]);
