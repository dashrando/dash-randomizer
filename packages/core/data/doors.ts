import { AREA_DOORS as area, BOSS_DOORS as boss } from "./interface";

const DOORS = [
  {
    door: "Door_KraidBoss",
    from: "right",
    to: "left",
    address: boss.DoorToKraidBoss,
    vector: boss.DoorVectorToPreKraid,
  },
  {
    door: "Exit_Kraid",
    from: "left",
    to: "right",
    address: boss.DoorFromKraidInBrinstar,
    vector: boss.DoorVectorToKraidInBrinstar,
  },
  {
    door: "Door_PhantoonBoss",
    from: "right",
    to: "left",
    address: boss.DoorToPhantoonBoss,
    vector: boss.DoorVectorToPrePhantoon,
  },
  {
    door: "Exit_Phantoon",
    from: "left",
    to: "right",
    address: boss.DoorFromPhantoonInWreckedShip,
    vector: boss.DoorVectorToPhantoonInWreckedShip,
  },
  {
    door: "Door_DraygonBoss",
    from: "left",
    to: "right",
    address: boss.DoorToDraygonBoss,
    vector: boss.DoorVectorToPreDraygon,
  },
  {
    door: "Exit_Draygon",
    from: "right",
    to: "left",
    address: boss.DoorFromDraygonInMaridia,
    vector: boss.DoorVectorToDraygonInMaridia,
  },
  {
    door: "Door_RidleyBoss",
    from: "left",
    to: "right",
    address: boss.DoorToRidleyBoss,
    vector: boss.DoorVectorToPreRidley,
  },
  {
    door: "Exit_Ridley",
    from: "right",
    to: "left",
    address: boss.DoorFromRidleyInNorfair,
    vector: boss.DoorVectorToRidleyInNorfair,
  },
  {
    door: "Door_RetroPBs",
    from: "left",
    to: "right",
    address: area.Door_RetroPBs,
    vector: area.DoorVectorToRetroPBs,
  },
  {
    door: "Door_GreenHills",
    from: "right",
    to: "left",
    address: area.Door_GreenHills,
    vector: area.DoorVectorToGreenHills,
  },
  {
    door: "Door_Moat",
    from: "right",
    to: "left",
    address: area.Door_Moat,
    vector: area.DoorVectorToMoat,
  },
  {
    door: "Door_Ocean",
    from: "left",
    to: "right",
    address: area.Door_Ocean,
    vector: area.DoorVectorToOcean,
  },
  {
    door: "Door_G4",
    from: "right",
    to: "left",
    address: area.Door_G4,
    vector: area.DoorVectorToG4,
  },
  {
    door: "Door_Tourian",
    from: "left",
    to: "right",
    address: area.Door_Tourian,
    vector: area.DoorVectorToTourian,
  },
  {
    door: "Door_Kago",
    from: "left",
    to: "right",
    address: area.Door_Kago,
    vector: area.DoorVectorToKago,
  },
  {
    door: "Door_GreenElevator",
    from: "right",
    to: "left",
    address: area.Door_GreenElevator,
    vector: area.DoorVectorToGreenElevator,
  },
  {
    door: "Door_Crabs",
    from: "bottom",
    to: "top",
    address: area.Door_Crabs,
    vector: area.DoorVectorToCrabs,
  },
  {
    door: "Door_RedElevator",
    from: "top",
    to: "bottom",
    address: area.Door_RedElevator,
    vector: area.DoorVectorToRedElevator,
  },
  {
    door: "Door_HighwayExit",
    from: "left",
    to: "right",
    address: area.Door_HighwayExit,
    vector: area.DoorVectorToHighwayExit,
  },
  {
    door: "Door_Highway",
    from: "right",
    to: "left",
    address: area.Door_Highway,
    vector: area.DoorVectorToHighway,
  },
  {
    door: "Door_NoobBridge",
    from: "right",
    to: "left",
    address: area.Door_NoobBridge,
    vector: area.DoorVectorToNoobBridge,
  },
  {
    door: "Door_RedTower",
    from: "left",
    to: "right",
    address: area.Door_RedTower,
    vector: area.DoorVectorToRedTower,
  },
  {
    door: "Door_MaridiaEscape",
    from: "right",
    to: "left",
    address: area.Door_MaridiaEscape,
    vector: area.DoorVectorToMaridiaEscape,
  },
  {
    door: "Door_RedFish",
    from: "left",
    to: "right",
    address: area.Door_RedFish,
    vector: area.DoorVectorToRedFish,
  },
  {
    door: "Door_MaridiaTube",
    from: "top",
    to: "bottom",
    address: area.Door_MaridiaTube,
    vector: area.DoorVectorToMaridiaTube,
  },
  {
    door: "Door_MainStreet",
    from: "bottom",
    to: "top",
    address: area.Door_MainStreet,
    vector: area.DoorVectorToMainStreet,
  },
  {
    door: "Door_KraidEntry",
    from: "right",
    to: "left",
    address: area.Door_KraidEntry,
    vector: area.DoorVectorToKraidEntry,
  },
  {
    door: "Door_ElevatorEntry",
    from: "left",
    to: "right",
    address: area.Door_ElevatorEntry,
    vector: area.DoorVectorToElevatorEntry,
  },
  {
    door: "Door_AboveKraid",
    from: "right",
    to: "left",
    address: area.Door_AboveKraid,
    vector: area.DoorVectorToAboveKraid,
  },
  {
    door: "Door_MaridiaMap",
    from: "left",
    to: "right",
    address: area.Door_MaridiaMap,
    vector: area.DoorVectorToMaridiaMap,
  },
  {
    door: "Door_KraidMouth",
    from: "right",
    to: "left",
    address: area.Door_KraidMouth,
    vector: area.DoorVectorToKraidMouth,
  },
  {
    door: "Door_KraidsLair",
    from: "left",
    to: "right",
    address: area.Door_KraidsLair,
    vector: area.DoorVectorToKraidsLair,
  },
  {
    door: "Door_CrocEntry",
    from: "bottom",
    to: "top",
    address: area.Door_CrocEntry,
    vector: area.DoorVectorToCrocEntry,
  },
  {
    door: "Door_Croc",
    from: "top",
    to: "bottom",
    address: area.Door_Croc,
    vector: area.DoorVectorToCroc,
  },
  {
    door: "Door_SingleChamber",
    from: "right",
    to: "left",
    address: area.Door_SingleChamber,
    vector: area.DoorVectorToSingleChamber,
  },
  {
    door: "Door_Muskateers",
    from: "left",
    to: "right",
    address: area.Door_Muskateers,
    vector: area.DoorVectorToMuskateers,
  },
  {
    door: "Door_LavaDive",
    from: "left",
    to: "right",
    address: area.Door_LavaDive,
    vector: area.DoorVectorToLavaDive,
  },
  {
    door: "Door_RidleyMouth",
    from: "right",
    to: "left",
    address: area.Door_RidleyMouth,
    vector: area.DoorVectorToRidleyMouth,
  },
  {
    door: "Door_PreAqueduct",
    from: "right",
    to: "left",
    address: area.Door_PreAqueduct,
    vector: area.DoorVectorToPreAqueduct,
  },
  {
    door: "Door_Aqueduct",
    from: "left",
    to: "right",
    address: area.Door_Aqueduct,
    vector: area.DoorVectorToAqueduct,
  },
];

// @ts-ignore
export const isAreaEdge = (edge) => {
  const doors = [
    "Door_RetroPBs",
    "Door_GreenHills",
    "Door_Moat",
    "Door_Ocean",
    "Door_G4",
    "Door_Tourian",
    "Door_Kago",
    "Door_GreenElevator",
    "Door_Crabs",
    "Door_RedElevator",
    "Door_HighwayExit",
    "Door_Highway",
    "Door_NoobBridge",
    "Door_RedTower",
    "Door_MaridiaEscape",
    "Door_RedFish",
    "Door_MaridiaTube",
    "Door_MainStreet",
    "Door_KraidEntry",
    "Door_ElevatorEntry",
    "Door_AboveKraid",
    "Door_MaridiaMap",
    "Door_KraidMouth",
    "Door_KraidsLair",
    "Door_CrocEntry",
    "Door_Croc",
    "Door_SingleChamber",
    "Door_Muskateers",
    "Door_LavaDive",
    "Door_RidleyMouth",
    "Door_PreAqueduct",
    "Door_Aqueduct",
  ];
  if (undefined == doors.find((d) => d == edge.from.name)) {
    return false;
  }
  if (undefined == doors.find((d) => d == edge.to.name)) {
    return false;
  }
  return true;
};

// @ts-ignore
export const isBossEdge = (edge) => {
  const doors = [
    "Door_KraidBoss",
    "Exit_Kraid",
    "Door_PhantoonBoss",
    "Exit_Phantoon",
    "Door_DraygonBoss",
    "Exit_Draygon",
    "Door_RidleyBoss",
    "Exit_Ridley",
  ];
  if (undefined == doors.find((d) => d == edge.from.name)) {
    return false;
  }
  if (undefined == doors.find((d) => d == edge.to.name)) {
    return false;
  }
  return true;
};

export default DOORS;
