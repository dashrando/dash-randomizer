import { canReachStart, searchAndCache } from "./search";
import { isFungible } from "../items";
import { cloneGraph } from "./init";
import { MajorDistributionMode } from "./params";
import {
  addItem,
  checkFlags,
  cloneLoadout,
  copyLoadout,
  createLoadout
} from "../loadout";

export const isGraphValid = (graph, settings, loadout, progression) => {
  const solver = new GraphSolver(graph, settings);
  return solver.isValid(loadout, progression);
};

export const getItemProgression = (graph, settings, loadout) => {
  const initLoad = loadout != undefined ? loadout : createLoadout();
  const itemProgression = [], progression = [];
  if (isGraphValid(cloneGraph(graph), settings, initLoad, progression)) {
    progression.forEach(step => {
      step.collected.forEach(item => {
        itemProgression.push(item);
      })
    });
  }
  return itemProgression;
}

const revSolve = (solver, load, node) => {
  // Setup a graph with the item location as the start vertex
  const clonedGraph = cloneGraph(solver.graph);
  clonedGraph.forEach((e) => (e.from.pathToStart = false));
  const clonedVertex = clonedGraph.find(
    (e) => e.from.name == node.name
  ).from;
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

const getProgressionLocation = (itemNode) => {
  if (itemNode.type == "boss") {
    const bossName = itemNode.name.substring(5)
    return `${bossName} @ ${itemNode.area}`;
  }
  return itemNode.name;
}

const getProgressionEntry = (itemNode) => {
  return {
    itemName: itemNode.item.name,
    itemType: itemNode.item.type,
    locationName: getProgressionLocation(itemNode),
    isMajor: itemNode.item.isMajor,
  };
}

class GraphSolver {
  constructor(graph, settings) {
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

  isValid(initLoad, progression) {
    let samus = cloneLoadout(initLoad);
    let step = -1;

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, checkFlags(samus));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // start node. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectItem = (p) => {
      if (step >= 0) {
        progression[step].collected.push(getProgressionEntry(p));
      }
      p.item = undefined;
    }

    const collectSafeItems = (itemLocations) => {
      const load = cloneLoadout(samus);
      let collectedItem = false;

      itemLocations.forEach((p) => {
        addItem(load, p.item.type);
        if (!canReachStart(this.graph, p, checkFlags(load))) {
          copyLoadout(load, samus);
          return;
        }
        addItem(samus, p.item.type);
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

      const reverseSolve = (filtered) => {
        const p = filtered.find(n => revSolve(this, samus, n));

        if (p == undefined) {
          return false;
        }

        // Collect the item
        addItem(samus, p.item.type);
        collectItem(p);
        return true;
      };

      //-----------------------------------------------------------------
      // Try to reverse solve the majors first and then the rest.
      //-----------------------------------------------------------------

      if (reverseSolve(itemLocations.filter((p) => !isFungible(p.item.type)))) {
        return true;
      }
      if (reverseSolve(itemLocations.filter((p) => isFungible(p.item.type)))) {
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
          available: uncollected.map(getProgressionEntry),
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