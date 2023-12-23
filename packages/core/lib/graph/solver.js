import { canReachStart, canReachVertex, searchAndCache } from "./search";
import { Item } from "../items";
import { cloneGraph } from "./init";
import { MajorDistributionMode } from "./params";
import { checkFlags } from "../loadout";

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

class GraphSolver {
  constructor(graph, settings, logMethods) {
    this.graph = graph;
    this.settings = settings;
    this.startVertex = graph[0].from;
    this.trackProgression = false;
    this.progression = [];
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

  isVertexAvailable(vertex, load, itemType, legacyMode = false) {
    if (
      !canReachVertex(
        this.graph,
        this.startVertex,
        vertex,
        checkFlags(load)
      )
    ) {
      return false;
    }
    if (legacyMode || itemType == undefined) {
      return canReachVertex(
        this.graph,
        vertex,
        this.startVertex,
        checkFlags(load)
      );
    }
    let temp = load.clone();
    temp.add(itemType);
    return canReachVertex(
      this.graph,
      vertex,
      this.startVertex,
      checkFlags(temp)
    );
  }

  isValid(initLoad, legacyMode = false) {
    let samus = initLoad.clone();

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
      let items = [];

      itemLocations.forEach((p) => {
        if (legacyMode) {
          if (!canReachStart(this.graph, p, checkFlags(samus))) {
            return;
          }
          samus.add(p.item.type);
        } else {
          const load = samus.clone();
          load.add(p.item.type);
          if (!canReachStart(this.graph, p, checkFlags(load))) {
            return;
          }
          samus = load;
        }

        items.push(p.item);
        collectItem(p);
      });

      if (items.length > 0) {
        if (this.printCollectedItems) {
          this.printCollectedItems(items);
        }
        return true;
      }

      //-----------------------------------------------------------------
      // Utility function that determines if collecting an available
      // item that does not have a round trip to the starting vertex
      // would result in a valid graph.
      //-----------------------------------------------------------------

      const reverseSolve = (filteredItemLocations) => {
        for (let i = 0; i < filteredItemLocations.length; i++) {
          const p = filteredItemLocations[i];

          // Setup a graph with the item location as the start vertex
          const clonedGraph = cloneGraph(this.graph);
          clonedGraph.forEach((e) => (e.from.pathToStart = false));
          const clonedVertex = clonedGraph.find(
            (e) => e.from.name == p.name
          ).from;
          clonedVertex.pathToStart = true;

          // Create a solver for the new graph
          const reverseSolver = new GraphSolver(clonedGraph, {
            ...this.settings,
          });
          reverseSolver.startVertex = clonedVertex;

          // Collect the item if the graph can be solved
          try {
            if (reverseSolver.isValid(samus)) {
              if (this.printCollectedItems) {
                this.printCollectedItems([p.item], true);
              }
              // Collect the item
              samus.add(p.item.type);
              collectItem(p);
              return true;
            }
          } catch (e) {
            console.log("sub:", e);
          }
        }
        return false;
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

    const checkItem = (v) => {
      if (this.settings.majorDistribution == MajorDistributionMode.Chozo) {
        return v.item != undefined && v.type != "minor";
      }
      return v.item != undefined;
    }

    try {
      while (true) {
        const all = findAll();
        const uncollected = all.filter((v) => checkItem(v));
        if (uncollected.length == 0) {
          break;
        }
        if (this.printAvailableItems != undefined) {
          this.printAvailableItems(uncollected);
        }

        // Collect all items where we can make a round trip back to the start
        if (collectEasyItems(uncollected)) {
          continue;
        }

        throw new Error("one way ticket");
      }

      //-----------------------------------------------------------------
      // Check for uncollected items. This indicates an invalid graph.
      //-----------------------------------------------------------------

      const leftovers = this.graph.filter((n) => checkItem(n.from));
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
