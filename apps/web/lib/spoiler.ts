import { parseSettings } from '@/lib/settings';
import { Graph, Vertex, stringToParams } from 'core';
import { generateSeed, isAreaEdge, isBossEdge } from 'core/data';

const getAreaTransitions = (graph: Graph) => {
  const areaEdges = graph.filter(isAreaEdge)

  const getTransition = (from: string) => {
    const edge = areaEdges.find(p => p.from.name === `Door_${from}`)
    if (!edge) {
      return ''
    }
    return edge.to.name
  }

  return {
    "Door_RetroPBs": getTransition('RetroPBs'),
    "Door_GreenHills": getTransition('GreenHills'),
    "Door_Moat": getTransition('Moat'),
    "Door_Ocean": getTransition('Ocean'),
    "Door_G4": getTransition('G4'),
    "Door_Tourian": getTransition('Tourian'),
    "Door_Kago": getTransition('Kago'),
    "Door_GreenElevator": getTransition('GreenElevator'),
    "Door_Crabs": getTransition('Crabs'),
    "Door_RedElevator": getTransition('RedElevator'),
    "Door_HighwayExit": getTransition('HighwayExit'),
    "Door_Highway": getTransition('Highway'),
    "Door_NoobBridge": getTransition('NoobBridge'),
    "Door_RedTower": getTransition('RedTower'),
    "Door_MaridiaEscape": getTransition('MaridiaEscape'),
    "Door_RedFish": getTransition('RedFish'),
    "Door_MaridiaTube": getTransition('MaridiaTube'),
    "Door_MainStreet": getTransition('MainStreet'),
    "Door_KraidEntry": getTransition('KraidEntry'),
    "Door_ElevatorEntry": getTransition('ElevatorEntry'),
    "Door_AboveKraid": getTransition('AboveKraid'),
    "Door_MaridiaMap": getTransition('MaridiaMap'),
    "Door_KraidMouth": getTransition('KraidMouth'),
    "Door_KraidsLair": getTransition('KraidsLair'),
    "Door_CrocEntry": getTransition('CrocEntry'),
    "Door_Croc": getTransition('Croc'),
    "Door_SingleChamber": getTransition('SingleChamber'),
    "Door_Muskateers": getTransition('Muskateers'),
    "Door_LavaDive": getTransition('LavaDive'),
    "Door_RidleyMouth": getTransition('RidleyMouth'),
    "Door_PreAqueduct": getTransition('PreAqueduct'),
    "Door_Aqueduct": getTransition('Aqueduct'),
  }
}

const getBosses = (graph: Graph) => {
  const bossEdges = graph.filter(isBossEdge).filter(p => p.to.type == 'exit')

  const getBoss = (location: string) => {
    const edge = bossEdges.find(p => p.from.name === `Door_${location}Boss`)
    if (!edge) {
      return ''
    }
    return edge.to.name.slice(5)
  }
  return {
    "Kraid's Lair": getBoss('Kraid'),
    "Wrecked Ship": getBoss('Phantoon'),
    "East Maridia": getBoss('Draygon'),
    "Lower Norfair": getBoss('Ridley'),
  }
}

const getItems = (graph: Graph) => {
  const isUnique = (value: Vertex, index: number, array: Vertex[]) => {
    return array.indexOf(value) === index;
  };
  const itemVertices = graph
    .map((e) => e.from)
    .filter((v) => {
      return v.type == "major" || v.type == "minor";
    }).filter(isUnique);

  const getItemsByArea = (area: string) => {
    const vertices = itemVertices.filter(p => p.area === area).sort((a, b) => {
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type)
      }
      return a.name.localeCompare(b.name)
  })
    const obj: any = {}
    for (let i = 0; i < vertices.length; i++) {
      obj[vertices[i].name] = vertices[i].item?.name
    }
    return obj
  }

  return {
    'Crateria': getItemsByArea('Crateria'),
    'Green Brinstar': getItemsByArea('GreenBrinstar'),
    'Red Brinstar': getItemsByArea('RedBrinstar'),
    "Kraid's Lair": getItemsByArea('KraidsLair'),
    "Crocomire's Lair": getItemsByArea('CrocomiresLair'),
    'Wrecked Ship': getItemsByArea('WreckedShip'),
    'West Maridia': getItemsByArea('WestMaridia'),
    'East Maridia': getItemsByArea('EastMaridia'),
    'Upper Norfair': getItemsByArea('UpperNorfair'),
    'Lower Norfair': getItemsByArea('LowerNorfair'),
  }
}

const getMeta = (params: any) => {
  const parsedSettings = parseSettings(params)
  const { randomizeParams, settingsParams, optionsParams } = parsedSettings

  const getValue = (array: any[], label: string) => {
    const param = array.find(p => p.label == label)
    if (!param) {
      return ''
    }
    return param.value
  }

  return {
    'Item Split': getValue(randomizeParams, 'Item Split'),
    'Boss Locations': getValue(randomizeParams, 'Boss Locations'),
    'Map Layout': getValue(randomizeParams, 'Map Layout'),
    'Minor Item Distribution': getValue(settingsParams, 'Minor Item Distribution'),
    'Environment Updates': getValue(settingsParams, 'Environment Updates'),
    'Charge Beam': getValue(settingsParams, 'Charge Beam'),
    'Gravity Heat Reduction': getValue(settingsParams, 'Gravity Heat Reduction'),
    'Double Jump': getValue(settingsParams, 'Double Jump'),
    'Heat Shield': getValue(settingsParams, 'Heat Shield'),
    'Pressure Valve': getValue(settingsParams, 'Pressure Valve'),
    'Logic': getValue(optionsParams, 'Logic'),
  }
}

export function getSpoiler(seedHash: string) {
  const parameters = stringToParams(seedHash)
  const { seed, settings, options } = parameters
  const graph = generateSeed(seed, settings, options)
  
  return {
    'Bosses': getBosses(graph),
    'Area Transitions': getAreaTransitions(graph),
    'Items': getItems(graph),
    'Meta': getMeta(parameters),
  }
}