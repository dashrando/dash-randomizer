import { canReachStart, canReachVertex, searchAndCache } from "./search";
import { Item, ItemNames } from "../items";
import { cloneGraph } from "./init";

/*const getFlags = (load) => {
  const {
    CanUseBombs,
    CanUsePowerBombs,
    CanOpenRedDoors,
    CanOpenGreenDoors,
    HasCharge,
    HasDoubleJump,
    HasGravity,
    HasGrapple,
    HasHeatShield,
    HasHiJump,
    HasIce,
    HasMorph,
    HasPlasma,
    HasPressureValve,
    HasScrewAttack,
    HasSpazer,
    HasSpaceJump,
    HasSpeed,
    HasSpringBall,
    HasVaria,
    HasWave,
    EnergyTanks,
    MissilePacks,
    PowerBombPacks,
    SuperPacks,
    TotalTanks,
    HellRunTanks,
    CanFly,
    CanDoSuitlessMaridia,
    CanPassBombPassages,
    CanDestroyBombWalls,
    CanMoveInWestMaridia,
    CanKillKraid,
    CanKillPhantoon,
    CanKillDraygon,
    CanKillRidley,
    CanKillSporeSpawn,
    CanKillCrocomire,
    CanKillBotwoon,
    CanKillGoldTorizo,
    HasDefeatedBrinstarBoss,
    HasDefeatedWreckedShipBoss,
    HasDefeatedMaridiaBoss,
    HasDefeatedNorfairBoss,
  } = load.getFlags();
};

const getBody = (func) => {
  const full = func.toString().replace(/[\n\r]/g, "");
  return full.slice(full.indexOf("{") + 1, full.lastIndexOf("}"));
};

const criteriaFunction = Function(
  "criteria",
  `"use strict";` +
    `const x = Function("load",` +
    `"${getBody(getFlags)} return (" + criteria + ")();");` +
    `return x(this);`
);

const checkCriteria = (load, criteria) => {
  return criteriaFunction.call(load, criteria);
};*/

class GraphSolver {
  constructor(graph, settings, logMethods) {
    this.graph = graph;
    this.settings = settings;
    this.startVertex = graph[0].from;
    if (logMethods != undefined) {
      this.printAvailableItems = logMethods.printAvailableItems;
      this.printCollectedItems = logMethods.printCollectedItems;
      this.printDefeatedBoss = logMethods.printDefeatedBoss;
      this.printUncollectedItems = logMethods.printUncollectedItems;
      this.printMsg = logMethods.printMsg;
    }
  }

  checkFlags(load) {
    const {
      CanUseBombs,
      CanUsePowerBombs,
      CanOpenRedDoors,
      CanOpenGreenDoors,
      HasCharge,
      HasDoubleJump,
      HasGravity,
      HasGrapple,
      HasHeatShield,
      HasHiJump,
      HasIce,
      HasMorph,
      HasPlasma,
      HasPressureValve,
      HasScrewAttack,
      HasSpazer,
      HasSpaceJump,
      HasSpeed,
      HasSpringBall,
      HasVaria,
      HasWave,
      EnergyTanks,
      MissilePacks,
      PowerBombPacks,
      SuperPacks,
      TotalTanks,
      HellRunTanks,
      CanFly,
      CanDoSuitlessMaridia,
      CanPassBombPassages,
      CanDestroyBombWalls,
      CanMoveInWestMaridia,
      CanKillKraid,
      CanKillPhantoon,
      CanKillDraygon,
      CanKillRidley,
      CanKillSporeSpawn,
      CanKillCrocomire,
      CanKillBotwoon,
      CanKillGoldTorizo,
      HasDefeatedBrinstarBoss,
      HasDefeatedWreckedShipBoss,
      HasDefeatedMaridiaBoss,
      HasDefeatedNorfairBoss,
    } = load.getFlags();

    return (condition) => eval(`(${condition.toString()})()`);
  }

  /*checkFlags(load) {
    return (condition) => checkCriteria(load, condition);
  }*/

  isVertexAvailable(vertex, load, itemType, legacyMode = false) {
    if (
      !canReachVertex(
        this.graph,
        this.startVertex,
        vertex,
        this.checkFlags(load)
      )
    ) {
      return false;
    }
    if (legacyMode || itemType == undefined) {
      return canReachVertex(
        this.graph,
        vertex,
        this.startVertex,
        this.checkFlags(load)
      );
    }
    let temp = load.clone();
    temp.add(itemType);
    return canReachVertex(
      this.graph,
      vertex,
      this.startVertex,
      this.checkFlags(temp)
    );
  }

  isValid(initLoad, legacyMode = false) {
    let samus = initLoad.clone();

    const printBoss = (item) => {
      const bossVertex = this.graph.find((e) => e.to.item == item).to;
      const exitVertex = this.graph.find(
        (e) => e.from.name.startsWith("Exit_") && e.to == bossVertex
      ).from;
      const doorVertex = this.graph.find(
        (e) => e.from.name.startsWith("Door_") && e.to == exitVertex
      ).from;

      this.printDefeatedBoss(
        `Defeated ${ItemNames.get(item.type)} - ${bossVertex.name} @ ${
          doorVertex.name
        }`
      );
    };

    const findAll = () =>
      searchAndCache(this.graph, this.startVertex, this.checkFlags(samus));

    //-----------------------------------------------------------------
    // Collects all items where there is a round trip back to the
    // ship. All these items are collected at the same time.
    //-----------------------------------------------------------------

    const collectEasyItems = (itemLocations) => {
      let items = [];

      itemLocations.forEach((p) => {
        if (legacyMode) {
          if (!canReachStart(this.graph, p, this.checkFlags(samus))) {
            return;
          }
          samus.add(p.item.type);
        } else {
          const load = samus.clone();
          load.add(p.item.type);
          if (!canReachStart(this.graph, p, this.checkFlags(load))) {
            return;
          }
          samus = load;
        }

        items.push(p.item);
        if (this.printDefeatedBoss && p.type == "boss") {
          printBoss(p.item);
        }

        p.item = undefined;
      });

      if (items.length == 0) {
        //-----------------------------------------------------------------
        // Utility function that attempts to reverse solve the remaining
        // paths on the graph.
        //-----------------------------------------------------------------

        const reverseSolve = (filteredItemLocations) => {
          for (let i = 0; i < filteredItemLocations.length; i++) {
            const p = filteredItemLocations[i];
            //console.log("try:", p.name);
            const clonedGraph = cloneGraph(this.graph);
            clonedGraph.forEach((e) => (e.from.pathToStart = false));
            const clonedVertex = clonedGraph.find(
              (e) => e.from.name == p.name
            ).from;
            clonedVertex.pathToStart = true;
            const reverseSolver = new GraphSolver(clonedGraph, {
              ...this.settings,
            });
            reverseSolver.startVertex = clonedVertex;
            try {
              if (reverseSolver.isValid(samus)) {
                if (this.printCollectedItems) {
                  this.printCollectedItems([p.item], true);
                }
                // Collect the item
                samus.add(p.item.type);
                p.item = undefined;
                return true;
              }
            } catch (e) {
              console.log("sub:", e);
            }
          }
          return false;
        };

        //-----------------------------------------------------------------
        // Try to reverse solve the majors first and then the reset.
        //-----------------------------------------------------------------

        const IsSingleton = (item) => {
          switch (item.type) {
            case Item.Super:
            case Item.PowerBomb:
            case Item.Missile:
            case Item.EnergyTank:
            case Item.Reserve:
              return false;
            default:
              return true;
          }
        };

        if (!legacyMode) {
          if (reverseSolve(itemLocations.filter((p) => IsSingleton(p.item)))) {
            return true;
          }
          if (reverseSolve(itemLocations.filter((p) => !IsSingleton(p.item)))) {
            return true;
          }
        }

        if (this.printUncollectedItems != undefined) {
          this.printUncollectedItems(this.graph);
        }
        throw new Error("no round trip locations");
      } else if (this.printCollectedItems) {
        this.printCollectedItems(items);
      }

      return true;
    };

    try {
      while (true) {
        const all = findAll();
        const uncollected = all.filter((v) => v.item != undefined);
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

      if (this.graph.filter((n) => n.from.item != undefined).length > 0) {
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
