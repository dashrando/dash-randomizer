import { canReachStart, searchAndCache } from "./search";
import { Item } from "../items";
import { cloneGraph } from "./init";
import { MajorDistributionMode } from "./params";
import { addItem, cloneLoadout, checkFlags, copyLoadout } from "../loadout";

const isFungible = (item) => {
  switch (item.type) {
    case Item.Super:
    case Item.PowerBomb:
    case Item.Missile:
    case Item.EnergyTank:
    case Item.Reserve:
      return true;
    default:
      return false;
  }
};

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

class GraphSolver {
  constructor(graph, settings, logMethods) {
    this.graph = graph;
    this.settings = settings;
    this.startVertex = graph[0].from;
    this.trackProgression = false;
    this.progression = [];
    if (settings.majorDistribution == MajorDistributionMode.Chozo) {
      this.checkItem = v => v.item != undefined && v.type != "minor";
    } else {
      this.checkItem = v => v.item != undefined;
    }
    if (logMethods != undefined) {
      this.printAvailableItems = logMethods.printAvailableItems;
      this.printCollectedItems = logMethods.printCollectedItems;
      this.printDefeatedBoss = logMethods.printDefeatedBoss;
      this.printUncollectedItems = logMethods.printUncollectedItems;
      this.printMsg = logMethods.printMsg;
    }
  }

  recordProgression(itemNode) {
    if (!this.trackProgression) {
      return;
    }
    let locationName = itemNode.name;

    if (itemNode.type == "boss") {
      const bossName = itemNode.name.substring(5)
      locationName = `${bossName} @ ${itemNode.area}`;
    }

    this.progression.push({
      itemName: itemNode.item.name,
      itemType: itemNode.item.type,
      locationName: locationName,
      isMajor: itemNode.item.isMajor,
    })
  }

  isValid(initLoad, legacyMode = false) {
    let samus = cloneLoadout(initLoad);
    let collected = [];

    this.progression = [];

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, checkFlags(samus));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // ship. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectItem = (p) => {
      this.recordProgression(p);
      if (this.printDefeatedBoss && p.type == "boss") {
        this.printDefeatedBoss(`Defeated ${p.item.name} (${p.name}) in ${p.area}`);
      }
      p.item = undefined;
    }

    const collectEasyItems = (itemLocations) => {
      const load = cloneLoadout(samus);

      collected.length = 0;

      itemLocations.forEach((p) => {
        if (legacyMode) {
          if (!canReachStart(this.graph, p, checkFlags(samus))) {
            return;
          }
          addItem(samus, p.item.type);
        } else {
          addItem(load, p.item.type);
          if (!canReachStart(this.graph, p, checkFlags(load))) {
            copyLoadout(load, samus);
            return;
          }
          addItem(samus, p.item.type);
        }

        collected.push(p.item);
        collectItem(p);
      });

      if (collected.length > 0) {
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
        collected.push(p.item);
        collectItem(p);
        return true;
      };

      //-----------------------------------------------------------------
      // Try to reverse solve the majors first and then the rest.
      //-----------------------------------------------------------------

      if (!legacyMode) {
        if (reverseSolve(itemLocations.filter((p) => !isFungible(p.item)))) {
          return true;
        }
        if (reverseSolve(itemLocations.filter((p) => isFungible(p.item)))) {
          return true;
        }
      }

      throw new Error("no round trip locations");
    };

    try {
      while (true) {
        const all = findAll();
        const uncollected = all.filter((v) => this.checkItem(v));
        if (uncollected.length == 0) {
          break;
        }
        if (this.printAvailableItems != undefined) {
          this.printAvailableItems(uncollected);
        }

        // Collect all items where we can make a round trip back to the start
        if (collectEasyItems(uncollected)) {
          if (this.printCollectedItems) {
            this.printCollectedItems(collected);
          }
          continue;
        }

        throw new Error("one way ticket");
      }

      //-----------------------------------------------------------------
      // Check for uncollected items. This indicates an invalid graph.
      //-----------------------------------------------------------------

      const leftovers = this.graph.filter((n) => this.checkItem(n.from));
      if (leftovers.length > 0) {
        if (this.printUncollectedItems != undefined) {
          this.printUncollectedItems(this.graph);
        }
        throw new Error("Uncollected items");
      }
    } catch (e) {
      if (this.printMsg) {
        this.printMsg(e);
      }
      return false;
    }
    return true;
  }
}

export default GraphSolver;
