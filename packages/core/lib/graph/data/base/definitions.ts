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
  item: ItemType | undefined; // don't use ItemType here
  pathToStart: boolean;
}

export const getAllVertices = (): Vertex[] => {
  return [
  {
    "name": "Ship",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Landing Site)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PreGauntlet",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Gauntlet)",
    "type": "major",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "GauntletBackSideLeftDoor",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Gauntlet Left)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Gauntlet Right)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Moat)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Moat",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Parlor",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (230)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Bombs",
    "type": "major",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Terminator)",
    "type": "major",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_G4",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Kago",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_CrateriaCrabs",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PreMoat",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Climb",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ClimbSupersBottom",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Climb)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Mother Brain)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Construction Zone",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Morphing Ball",
    "type": "major",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RetroPBs",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Morph)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Alpha)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Brinstar Ceiling)",
    "type": "major",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Beta)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BoulderRoom",
    "type": "",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Billy Mays 1)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Billy Mays 2)",
    "type": "minor",
    "area": "Crateria",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_GreenElevator",
    "type": "",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Early Bridge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Early Bridge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Reserve Tank (Brinstar)",
    "type": "major",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Brin Reserve 1)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Brin Reserve 2)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Etecoons)",
    "type": "major",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Etecoons)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Etecoons)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "DachoraRoomLeft",
    "type": "",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "DachoraRoomRight",
    "type": "",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Big Pink)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Mission Impossible)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Wave Gate)",
    "type": "major",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Spore Spawn)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Charge)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Charge Beam",
    "type": "major",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Waterway)",
    "type": "major",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_GreenHills",
    "type": "",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Brin Tube)",
    "type": "minor",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_NoobBridge",
    "type": "",
    "area": "GreenBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RedTower",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Spazer",
    "type": "major",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Alpha)",
    "type": "minor",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Alpha PBs)",
    "type": "minor",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Beta)",
    "type": "minor",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Xray Scope",
    "type": "major",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "XrayHallway",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RedElevator",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_MaridiaEscape",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_MaridiaTube",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RedTowerToMaridiaMap",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RedTowerToKraid",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedTowerTop",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedTowerMid",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedTowerBottom",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedTowerElevatorRoom",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedBrinstarElevatorRoom",
    "type": "",
    "area": "RedBrinstar",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_BusinessCenterLeft",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_BusinessCenterRight",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Ice Beam",
    "type": "major",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Crumble Shaft)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (HJB)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "HiJump Boots",
    "type": "major",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (HJB)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Croc Escape)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Cathedral)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Bubble Mountain)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Reserve Tank (Norfair)",
    "type": "major",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Norfair Reserve 1)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Norfair Reserve 2)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Speed Booster",
    "type": "major",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Speed)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Wave Beam",
    "type": "major",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Wave)",
    "type": "minor",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_CrocEntry",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_SingleChamber",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_KronicBoost",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PreCrocomire",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BubbleMountainMain",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BubbleMountainBottomLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BubbleMountainKingCacLedge",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BubbleMountainTopLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "KronicBoostBottom",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "NutellaRefill",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BusinessCenter",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "CathedralEntrance",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BusinessCenterSaveStation",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "IceBeamGatesTopLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "IceBeamGatesBottomLeftDoor",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "SingleChamberTopRightDoor",
    "type": "",
    "area": "UpperNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RidleyMouth",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Musketeers",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Ruins",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (GT)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (GT)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Screw Attack",
    "type": "major",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PrePillars",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RidleyBoss",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "WorstRoomBottom",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "WorstRoomTop",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Mickey Mouse)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedKihunterShaftTop",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Wasteland",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Firefleas)",
    "type": "major",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Maze)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Maze)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Three Musketeers)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Musketeers",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Shame)",
    "type": "minor",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "GoldTorizoFight",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "DefeatedGoldTorizo",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ScrewAttackTop",
    "type": "",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "LowerNorfair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_KraidsLair",
    "type": "",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Kraid)",
    "type": "major",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "KraidsHallway",
    "type": "",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Kraid)",
    "type": "minor",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_KraidBoss",
    "type": "",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "KraidsLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Ocean",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Ocean Bottom)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ShipHallway",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ShipRearExit",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Spooky)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_PhantoonBoss",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (WS Left)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (WS Right)",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Wrecked Ship)",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Reserve Tank (Wrecked Ship)",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Gravity Suit",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Attic)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Bowling)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Ocean Middle)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Sky)",
    "type": "minor",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_WSHighway",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "SpongeBathLeft",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "SpongeBathRight",
    "type": "",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "WreckedShip",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_MainStreet",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "MainStreet",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Mainstreet)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Crab)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Mama Turtle)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Mama Turtle)",
    "type": "major",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_MaridiaMap",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "AboveMaridiaMap",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "EverestTopRight",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_RedFish",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Beach)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Watering Hole)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Watering Hole)",
    "type": "minor",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_PreAqueduct",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RedFish",
    "type": "",
    "area": "WestMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_DraygonBoss",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Aqueduct",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_EMHighway",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BotwoonHallwayLeft",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "BotwoonHallwayRight",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Aqueduct",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ColosseumTopLeft",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "ColosseumTopRight",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "MaridiaHighway",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Spring Ball",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Plasma Beam",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PrePlasmaBeam",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PlasmaSparkRoomTop",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PlasmaSparkRoomBottom",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "OasisTop",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "OasisBottom",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "LeftSandPitBottom",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "RightSandPitBottom",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Sand Pit Left)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Reserve Tank (Maridia)",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Sand Pit Right)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Sand Pit Right)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Botwoon)",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Precious)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Aqueduct)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Supers (Aqueduct)",
    "type": "minor",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PostBotwoon",
    "type": "",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Draygon",
    "type": "exit",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Draygon",
    "type": "boss",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Space Jump",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Kraid",
    "type": "exit",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Kraid",
    "type": "boss",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Varia Suit",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Phantoon",
    "type": "exit",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Phantoon",
    "type": "boss",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Exit_Ridley",
    "type": "exit",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Boss_Ridley",
    "type": "boss",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Ridley)",
    "type": "major",
    "area": "EastMaridia",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_CrocsLair",
    "type": "",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "PostCroc",
    "type": "",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Energy Tank (Crocomire)",
    "type": "major",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Power Bombs (Crocomire)",
    "type": "minor",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Grapple Beam",
    "type": "major",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Indiana Jones)",
    "type": "minor",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Missiles (Cosine)",
    "type": "minor",
    "area": "CrocomiresLair",
    "item": null,
    "pathToStart": false
  },
  {
    "name": "Door_Tourian",
    "type": "",
    "area": "Tourian",
    "item": null,
    "pathToStart": false
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
