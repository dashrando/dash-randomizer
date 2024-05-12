import { getAreaPortals, getBossPortals } from "../lib/graph/data/portals";
import { Edge } from "../lib/graph/init";
import { AREA_DOORS as area, BOSS_DOORS as boss } from "./interface";

export type DoorTransition = {
  door: string;
  area: string;
  from: string;
  to: string;
  address: number | undefined;
  vector: number;   // Vector to get to that door
}

// This array contains all of the area and boss transitions that can
// be updated by the randomizer. Note the absence of transitions from
// new bosses (i.e., copies of bosses in each area) to the their
// entry doors. These are not needed because those transitions do
// not need to change. For example, leaving the copy of Kraid in
// Lower Norfair always takes you to the pre Ridley room.
//
// This is also why the transitions to the copied bosses have their
// addresses undefined. We really only need to know the vector for
// those so we use the undefined address for a flag of sorts.
const DOORS: DoorTransition[] = [
  {
    door: "Door_KraidBoss",
    area: "KraidsLair",
    from: "right",
    to: "left",
    address: boss.DoorToKraidBoss,
    vector: boss.DoorVectorToPreKraid,
  },
  {
    door: "Exit_Kraid",
    area: "KraidsLair",
    from: "left",
    to: "right",
    address: boss.DoorFromKraidInBrinstar,
    vector: boss.DoorVectorToKraidInBrinstar,
  },
  {
    door: "Exit_Kraid",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToKraidInWreckedShip,
  },
  {
    door: "Exit_Kraid",
    area: "EastMaridia",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToKraidInMaridia,
  },
  {
    door: "Exit_Kraid",
    area: "LowerNorfair",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToKraidInNorfair,
  },
  {
    door: "Door_PhantoonBoss",
    area: "WreckedShip",
    from: "right",
    to: "left",
    address: boss.DoorToPhantoonBoss,
    vector: boss.DoorVectorToPrePhantoon,
  },
  {
    door: "Exit_Phantoon",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: boss.DoorFromPhantoonInWreckedShip,
    vector: boss.DoorVectorToPhantoonInWreckedShip,
  },
  {
    door: "Exit_Phantoon",
    area: "KraidsLair",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToPhantoonInBrinstar,
  },
  {
    door: "Exit_Phantoon",
    area: "EastMaridia",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToPhantoonInMaridia,
  },
  {
    door: "Exit_Phantoon",
    area: "LowerNorfair",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToPhantoonInNorfair,
  },
  {
    door: "Door_DraygonBoss",
    area: "EastMaridia",
    from: "left",
    to: "right",
    address: boss.DoorToDraygonBoss,
    vector: boss.DoorVectorToPreDraygon,
  },
  {
    door: "Exit_Draygon",
    area: "EastMaridia",
    from: "right",
    to: "left",
    address: boss.DoorFromDraygonInMaridia,
    vector: boss.DoorVectorToDraygonInMaridia,
  },
  {
    door: "Exit_Draygon",
    area: "KraidsLair",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToDraygonInBrinstar,
  },
  {
    door: "Exit_Draygon",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToDraygonInWreckedShip,
  },
  {
    door: "Exit_Draygon",
    area: "LowerNorfair",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToDraygonInNorfair,
  },
  {
    door: "Door_RidleyBoss",
    area: "LowerNorfair",
    from: "left",
    to: "right",
    address: boss.DoorToRidleyBoss,
    vector: boss.DoorVectorToPreRidley,
  },
  {
    door: "Exit_Ridley",
    area: "LowerNorfair",
    from: "right",
    to: "left",
    address: boss.DoorFromRidleyInNorfair,
    vector: boss.DoorVectorToRidleyInNorfair,
  },
  {
    door: "Exit_Ridley",
    area: "KraidsLair",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToRidleyInBrinstar,
  },
  {
    door: "Exit_Ridley",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: undefined,
    vector: boss.DoorVectorToRidleyInWreckedShip,
  },
  {
    door: "Exit_Ridley",
    area: "EastMaridia",
    from: "right",
    to: "left",
    address: undefined,
    vector: boss.DoorVectorToRidleyInMaridia,
  },
  {
    door: "Door_RetroPBs",
    area: "Crateria",
    from: "left",
    to: "right",
    address: area.Door_RetroPBs,
    vector: area.DoorVectorToRetroPBs,
  },
  {
    door: "Door_GreenHills",
    area: "GreenBrinstar",
    from: "right",
    to: "left",
    address: area.Door_GreenHills,
    vector: area.DoorVectorToGreenHills,
  },
  {
    door: "Door_Moat",
    area: "Crateria",
    from: "right",
    to: "left",
    address: area.Door_Moat,
    vector: area.DoorVectorToMoat,
  },
  {
    door: "Door_Ocean",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: area.Door_Ocean,
    vector: area.DoorVectorToOcean,
  },
  {
    door: "Door_G4",
    area: "Crateria",
    from: "right",
    to: "left",
    address: area.Door_G4,
    vector: area.DoorVectorToG4,
  },
  {
    door: "Door_Tourian",
    area: "Tourian",
    from: "left",
    to: "right",
    address: area.Door_Tourian,
    vector: area.DoorVectorToTourian,
  },
  {
    door: "Door_Kago",
    area: "Crateria",
    from: "left",
    to: "right",
    address: area.Door_Kago,
    vector: area.DoorVectorToKago,
  },
  {
    door: "Door_GreenElevator",
    area: "GreenBrinstar",
    from: "right",
    to: "left",
    address: area.Door_GreenElevator,
    vector: area.DoorVectorToGreenElevator,
  },
  {
    door: "Door_Crabs",
    area: "Crateria",
    from: "bottom",
    to: "top",
    address: area.Door_Crabs,
    vector: area.DoorVectorToCrabs,
  },
  {
    door: "Door_RedElevator",
    area: "RedBrinstar",
    from: "top",
    to: "bottom",
    address: area.Door_RedElevator,
    vector: area.DoorVectorToRedElevator,
  },
  {
    door: "Door_HighwayExit",
    area: "WreckedShip",
    from: "left",
    to: "right",
    address: area.Door_HighwayExit,
    vector: area.DoorVectorToHighwayExit,
  },
  {
    door: "Door_Highway",
    area: "EastMaridia",
    from: "right",
    to: "left",
    address: area.Door_Highway,
    vector: area.DoorVectorToHighway,
  },
  {
    door: "Door_NoobBridge",
    area: "GreenBrinstar",
    from: "right",
    to: "left",
    address: area.Door_NoobBridge,
    vector: area.DoorVectorToNoobBridge,
  },
  {
    door: "Door_RedTower",
    area: "RedBrinstar",
    from: "left",
    to: "right",
    address: area.Door_RedTower,
    vector: area.DoorVectorToRedTower,
  },
  {
    door: "Door_MaridiaEscape",
    area: "RedBrinstar",
    from: "right",
    to: "left",
    address: area.Door_MaridiaEscape,
    vector: area.DoorVectorToMaridiaEscape,
  },
  {
    door: "Door_RedFish",
    area: "WestMaridia",
    from: "left",
    to: "right",
    address: area.Door_RedFish,
    vector: area.DoorVectorToRedFish,
  },
  {
    door: "Door_MaridiaTube",
    area: "RedBrinstar",
    from: "top",
    to: "bottom",
    address: area.Door_MaridiaTube,
    vector: area.DoorVectorToMaridiaTube,
  },
  {
    door: "Door_MainStreet",
    area: "WestMaridia",
    from: "bottom",
    to: "top",
    address: area.Door_MainStreet,
    vector: area.DoorVectorToMainStreet,
  },
  {
    door: "Door_KraidEntry",
    area: "RedBrinstar",
    from: "right",
    to: "left",
    address: area.Door_KraidEntry,
    vector: area.DoorVectorToKraidEntry,
  },
  {
    door: "Door_ElevatorEntry",
    area: "UpperNorfair",
    from: "left",
    to: "right",
    address: area.Door_ElevatorEntry,
    vector: area.DoorVectorToElevatorEntry,
  },
  {
    door: "Door_AboveKraid",
    area: "RedBrinstar",
    from: "right",
    to: "left",
    address: area.Door_AboveKraid,
    vector: area.DoorVectorToAboveKraid,
  },
  {
    door: "Door_MaridiaMap",
    area: "WestMaridia",
    from: "left",
    to: "right",
    address: area.Door_MaridiaMap,
    vector: area.DoorVectorToMaridiaMap,
  },
  {
    door: "Door_KraidMouth",
    area: "UpperNorfair",
    from: "right",
    to: "left",
    address: area.Door_KraidMouth,
    vector: area.DoorVectorToKraidMouth,
  },
  {
    door: "Door_KraidsLair",
    area: "KraidsLair",
    from: "left",
    to: "right",
    address: area.Door_KraidsLair,
    vector: area.DoorVectorToKraidsLair,
  },
  {
    door: "Door_CrocEntry",
    area: "UpperNorfair",
    from: "bottom",
    to: "top",
    address: area.Door_CrocEntry,
    vector: area.DoorVectorToCrocEntry,
  },
  {
    door: "Door_Croc",
    area: "CrocomiresLair",
    from: "top",
    to: "bottom",
    address: area.Door_Croc,
    vector: area.DoorVectorToCroc,
  },
  {
    door: "Door_SingleChamber",
    area: "UpperNorfair",
    from: "right",
    to: "left",
    address: area.Door_SingleChamber,
    vector: area.DoorVectorToSingleChamber,
  },
  {
    door: "Door_Muskateers",
    area: "LowerNorfair",
    from: "left",
    to: "right",
    address: area.Door_Muskateers,
    vector: area.DoorVectorToMuskateers,
  },
  {
    door: "Door_LavaDive",
    area: "UpperNorfair",
    from: "left",
    to: "right",
    address: area.Door_LavaDive,
    vector: area.DoorVectorToLavaDive,
  },
  {
    door: "Door_RidleyMouth",
    area: "LowerNorfair",
    from: "right",
    to: "left",
    address: area.Door_RidleyMouth,
    vector: area.DoorVectorToRidleyMouth,
  },
  {
    door: "Door_PreAqueduct",
    area: "WestMaridia",
    from: "right",
    to: "left",
    address: area.Door_PreAqueduct,
    vector: area.DoorVectorToPreAqueduct,
  },
  {
    door: "Door_Aqueduct",
    area: "EastMaridia",
    from: "left",
    to: "right",
    address: area.Door_Aqueduct,
    vector: area.DoorVectorToAqueduct,
  },
];

export const isAreaEdge = (edge: Edge) => {
  const doors = getAreaPortals().map(p => p.name)
  if (undefined == doors.find((d) => d == edge.from.name)) {
    return false;
  }
  if (undefined == doors.find((d) => d == edge.to.name)) {
    return false;
  }
  return true;
};

export const isBossEdge = (edge: Edge) => {
  const doors = getBossPortals().map(p => p.name)
  if (undefined == doors.find((d) => d == edge.from.name)) {
    return false;
  }
  if (undefined == doors.find((d) => d == edge.to.name)) {
    return false;
  }
  return true;
};

export default DOORS;
