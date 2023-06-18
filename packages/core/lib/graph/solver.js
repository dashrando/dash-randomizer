import { canReachStart, canReachVertex, searchAndCache } from "./search";
import { ItemNames } from "../items";

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
      CanHellRun,
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
      HasDefeatedKraid,
      HasDefeatedPhantoon,
      HasDefeatedDraygon,
      HasDefeatedRidley,
    } = load.getFlags(this.settings);

    return (condition) => eval(`(${condition.toString()})()`);
  }

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
    let remainingItemCount = 104; //TODO: set using graph

    const printBoss = (boss) => {
      const door = this.graph.find(
        (n) => n.to.name == `Exit_${boss}` && n.from.name.startsWith("Door_")
      ).from.name;
      this.printDefeatedBoss(`Defeated ${boss} @ ${door}`);
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
          printBoss(ItemNames.get(p.item.type));
        }

        p.item = undefined;
        remainingItemCount -= 1;
      });

      if (items.length == 0) {
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

      if (remainingItemCount != 0) {
        throw new Error(`Unplaced items: ${remainingItemCount}`);
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
