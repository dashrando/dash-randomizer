import { canReachStart, searchAndCache } from "./search";
import { isFungible } from "../items";
import { cloneGraph, Graph, Vertex } from "./init";
import { MajorDistributionMode, Settings } from "./params";
import {
  addItem,
  checkFlags,
  cloneLoadout,
  copyLoadout,
  createLoadout,
  Loadout
} from "../loadout";

export type ItemLocation = {
  itemName: string;
  itemType: number;
  locationName: string;
  isMajor: boolean;
}

type Progression = {
  available: ItemLocation[];
  collected: ItemLocation[];
}

export const isGraphValid = (graph: Graph, settings: Settings, loadout: Loadout, progression?: Progression[]) => {
  const solver = new GraphSolver(graph, settings);
  return solver.isValid(loadout, progression);
};

export const getItemProgression = (graph: Graph, settings: Settings, loadout?: Loadout) => {
  const initLoad = loadout != undefined ? loadout : createLoadout();
  const itemProgression: ItemLocation[] = [], progression: Progression[] = [];
  if (isGraphValid(cloneGraph(graph), settings, initLoad, progression)) {
    progression.forEach(step => {
      step.collected.forEach(item => {
        itemProgression.push(item);
      })
    });
  }
  return itemProgression;
}

const revSolve = (solver: GraphSolver, load: Loadout, node: Vertex) => {
  // Setup a graph with the item location as the start vertex
  const clonedGraph = cloneGraph(solver.graph);
  clonedGraph.forEach((e) => (e.from.pathToStart = false));
  const clonedVertex = clonedGraph.find(
    (e) => e.from.name == node.name
  )?.from;

  if (clonedVertex == undefined) {
    throw new Error("revSolve: missing start vertex")
  }
  clonedVertex.pathToStart = true;

  // Create a solver for the new graph
  const reverseSolver = new GraphSolver(clonedGraph, solver.settings);
  reverseSolver.startVertex = clonedVertex;

  try {
    if (reverseSolver.isValid(load)) {
      return true;
    }
  } catch (e) {
  }
  return false;
};

const getProgressionLocation = (itemNode: Vertex) => {
  if (itemNode.type == "boss") {
    const bossName = itemNode.name.substring(5)
    return `${bossName} @ ${itemNode.area}`;
  }
  return itemNode.name;
}

const getItemLocation = (itemNode: Vertex): ItemLocation => {
  if (itemNode.item == undefined) {
    throw new Error("getItemLocation: missing item");
  }
  return {
    itemName: itemNode.item.name,
    itemType: itemNode.item.type,
    locationName: getProgressionLocation(itemNode),
    isMajor: itemNode.item.isMajor,
  };
}

class GraphSolver {
  graph: Graph;
  settings: Settings;
  startVertex: Vertex;

  constructor(graph: Graph, settings: Settings) {
    this.graph = graph;
    this.settings = settings;
    this.startVertex = graph[0].from;
    if (settings.majorDistribution == MajorDistributionMode.Chozo) {
      this.graph.forEach(n => {
        if (n.from.item != undefined && n.from.type == "minor") {
          n.from.item = undefined;
        }
      });
    }
  }

  isValid(initLoad: Loadout, progression?: Progression[]) {
    let samus = cloneLoadout(initLoad);
    let step = -1;

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, checkFlags(samus));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // start node. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectItem = (p: Vertex) => {
      if (progression != undefined) {
        progression[step].collected.push(getItemLocation(p));
      }
      p.item = undefined;
    }

    const collectSafeItems = (itemLocations: Vertex[]) => {
      const load = cloneLoadout(samus);
      let collectedItem = false;

      itemLocations.forEach((p) => {
        addItem(load, p.item!.type);
        if (!canReachStart(this.graph, p, checkFlags(load))) {
          copyLoadout(load, samus);
          return;
        }
        addItem(samus, p.item!.type);
        collectedItem = true;
        collectItem(p);
      });

      if (collectedItem) {
        return true;
      }

      //-----------------------------------------------------------------
      // Utility function that determines if collecting an available
      // item that does not have a round trip to the starting vertex
      // would result in a valid graph.
      //-----------------------------------------------------------------

      const reverseSolve = (filtered: Vertex[]) => {
        const p = filtered.find(n => revSolve(this, samus, n));

        if (p == undefined) {
          return false;
        }

        // Collect the item
        addItem(samus, p.item!.type);
        collectItem(p);
        return true;
      };

      //-----------------------------------------------------------------
      // Try to reverse solve the majors first and then the rest.
      //-----------------------------------------------------------------

      if (reverseSolve(itemLocations.filter((p) => !isFungible(p.item!.type)))) {
        return true;
      }
      if (reverseSolve(itemLocations.filter((p) => isFungible(p.item!.type)))) {
        return true;
      }

      return false;
    };

    while (true) {
      // Find all available items
      const all = findAll();
      const uncollected = all.filter((v) => v.item != undefined);

      // No items available? All done
      if (uncollected.length == 0) {
        break;
      }

      // Add a new entry if recording progression
      if (progression != undefined) {
        progression.push({
          available: uncollected.map(getItemLocation),
          collected: []
        });
        step = progression.length - 1;
      }

      // Collect all items where we can make a round trip to the start node
      if (!collectSafeItems(uncollected)) {
        return false;
      }
    }

    //-----------------------------------------------------------------
    // Check for uncollected items. This indicates an invalid graph.
    //-----------------------------------------------------------------

    return !this.graph.some((n) => n.from.item != undefined);
  }
}