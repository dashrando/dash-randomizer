//*********************************************
// DO NOT EDIT - THIS FILE IS GENERATED
//*********************************************

import { crateriaEdges } from "./edges/crateria";
import { greenbrinstarEdges } from "./edges/greenbrinstar";
import { redbrinstarEdges } from "./edges/redbrinstar";
import { kraidslairEdges } from "./edges/kraid";
import { crocomireEdges } from "./edges/crocomire";
import { westmaridiaEdges } from "./edges/westmaridia";
import { eastmaridiaEdges } from "./edges/eastmaridia";
import { uppernorfairEdges } from "./edges/uppernorfair";
import { lowernorfairEdges } from "./edges/lowernorfair";
import { wreckedshipEdges } from "./edges/wreckedship";
import { ItemType } from "../../../items";

export { bossEdges } from "./edges/boss";

export type Vertex = {
  name: string;
  type: string;
  area: string;
  item?: ItemType; //TODO: maybe don't use ItemType here
  pathToStart: boolean;
  progression: number;
}

export const getAllVertices = (): Vertex[] => {
  return [
  {
    "name": "Ship",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Power Bombs (Landing Site)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "PreGauntlet",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Energy Tank (Gauntlet)",
    "type": "major",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "GauntletBackSideLeftDoor",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Gauntlet Left)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Gauntlet Right)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Moat)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_Moat",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Parlor",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (230)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Bombs",
    "type": "major",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Terminator)",
    "type": "major",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_G4",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_Kago",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_CrateriaCrabs",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "PreMoat",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Climb",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "ClimbSupersBottom",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Supers (Climb)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Mother Brain)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Construction Zone",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Morphing Ball",
    "type": "major",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_RetroPBs",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Power Bombs (Morph)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Alpha)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Brinstar Ceiling)",
    "type": "major",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Beta)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "BoulderRoom",
    "type": "",
    "area": "Crateria",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Billy Mays 1)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Billy Mays 2)",
    "type": "minor",
    "area": "Crateria",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_GreenElevator",
    "type": "",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Supers (Early Bridge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Early Bridge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Reserve Tank (Brinstar)",
    "type": "major",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Brin Reserve 1)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Brin Reserve 2)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Etecoons)",
    "type": "major",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (Etecoons)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Etecoons)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "DachoraRoomLeft",
    "type": "",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "DachoraRoomRight",
    "type": "",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Big Pink)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Mission Impossible)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Wave Gate)",
    "type": "major",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (Spore Spawn)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Charge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Charge Beam",
    "type": "major",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Waterway)",
    "type": "major",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_GreenHills",
    "type": "",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Brin Tube)",
    "type": "minor",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_NoobBridge",
    "type": "",
    "area": "GreenBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RedTower",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Spazer",
    "type": "major",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Alpha)",
    "type": "minor",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Alpha PBs)",
    "type": "minor",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Beta)",
    "type": "minor",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Xray Scope",
    "type": "major",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "XrayHallway",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RedElevator",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_MaridiaEscape",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_MaridiaTube",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RedTowerToMaridiaMap",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RedTowerToKraid",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedTowerTop",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedTowerMid",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedTowerBottom",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedTowerElevatorRoom",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedBrinstarElevatorRoom",
    "type": "",
    "area": "RedBrinstar",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_BusinessCenterLeft",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_BusinessCenterRight",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Ice Beam",
    "type": "major",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Crumble Shaft)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (HJB)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "HiJump Boots",
    "type": "major",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (HJB)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Croc Escape)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Cathedral)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Bubble Mountain)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Reserve Tank (Norfair)",
    "type": "major",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Norfair Reserve 1)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Norfair Reserve 2)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Speed Booster",
    "type": "major",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Speed)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Wave Beam",
    "type": "major",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Wave)",
    "type": "minor",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_CrocEntry",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_SingleChamber",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_KronicBoost",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "PreCrocomire",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BubbleMountainMain",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BubbleMountainBottomLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BubbleMountainKingCacLedge",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BubbleMountainTopLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "KronicBoostBottom",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "NutellaRefill",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BusinessCenter",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "CathedralEntrance",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BusinessCenterSaveStation",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "IceBeamGatesTopLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "IceBeamGatesBottomLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "SingleChamberTopRightDoor",
    "type": "",
    "area": "UpperNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RidleyMouth",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_Musketeers",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Ruins",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (GT)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (GT)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Screw Attack",
    "type": "major",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "PrePillars",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RidleyBoss",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "WorstRoomBottom",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "WorstRoomTop",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Mickey Mouse)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "RedKihunterShaftTop",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Wasteland",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Energy Tank (Firefleas)",
    "type": "major",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Maze)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Maze)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Three Musketeers)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Musketeers",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Power Bombs (Shame)",
    "type": "minor",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "GoldTorizoFight",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "DefeatedGoldTorizo",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "ScrewAttackTop",
    "type": "",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "LowerNorfair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_KraidsLair",
    "type": "",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Energy Tank (Kraid)",
    "type": "major",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "KraidsHallway",
    "type": "",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Kraid)",
    "type": "minor",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_KraidBoss",
    "type": "",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "KraidsLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_Ocean",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Ocean Bottom)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "ShipHallway",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "ShipRearExit",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Spooky)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_PhantoonBoss",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Supers (WS Left)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (WS Right)",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Wrecked Ship)",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Reserve Tank (Wrecked Ship)",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Gravity Suit",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Attic)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Bowling)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Ocean Middle)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Sky)",
    "type": "minor",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_WSHighway",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "SpongeBathLeft",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "SpongeBathRight",
    "type": "",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "WreckedShip",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_MainStreet",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "MainStreet",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Mainstreet)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (Crab)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Mama Turtle)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Mama Turtle)",
    "type": "major",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_MaridiaMap",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "AboveMaridiaMap",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "EverestTopRight",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_RedFish",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Beach)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Watering Hole)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (Watering Hole)",
    "type": "minor",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_PreAqueduct",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RedFish",
    "type": "",
    "area": "WestMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_DraygonBoss",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_Aqueduct",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Door_EMHighway",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BotwoonHallwayLeft",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "BotwoonHallwayRight",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Aqueduct",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "ColosseumTopLeft",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "ColosseumTopRight",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "MaridiaHighway",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Spring Ball",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Plasma Beam",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "PrePlasmaBeam",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "PlasmaSparkRoomTop",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "PlasmaSparkRoomBottom",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "OasisTop",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "OasisBottom",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "LeftSandPitBottom",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "RightSandPitBottom",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Missiles (Sand Pit Left)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Reserve Tank (Maridia)",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Sand Pit Right)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Sand Pit Right)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Botwoon)",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Precious)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Aqueduct)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Supers (Aqueduct)",
    "type": "minor",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "PostBotwoon",
    "type": "",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "EastMaridia",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_CrocsLair",
    "type": "",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "PostCroc",
    "type": "",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": -1
  },
  {
    "name": "Energy Tank (Crocomire)",
    "type": "major",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Power Bombs (Crocomire)",
    "type": "minor",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Grapple Beam",
    "type": "major",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Indiana Jones)",
    "type": "minor",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Missiles (Cosine)",
    "type": "minor",
    "area": "CrocomiresLair",
    "pathToStart": false,
    "progression": 0
  },
  {
    "name": "Door_Tourian",
    "type": "",
    "area": "Tourian",
    "pathToStart": false,
    "progression": -1
  }
];
}

//-----------------------------------------------------------------
// Returns a structure containing all edges grouped by area.
//-----------------------------------------------------------------

export const getStandardEdges = () => {
  return [
    crateriaEdges,
    greenbrinstarEdges,
    redbrinstarEdges,
    kraidslairEdges,
    crocomireEdges,
    westmaridiaEdges,
    eastmaridiaEdges,
    uppernorfairEdges,
    lowernorfairEdges,
    wreckedshipEdges,
  ]
}
