import DotNetRandom from "../dotnet-random";
import { Item } from "../items";
import GraphSolver from "./solver";
import { cloneGraph, loadGraph } from "./init";
import Loadout from "../loadout";
import { getItemPool } from "./itemPool";
import { BossMode, MajorDistributionMode } from "./params";

//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const canPlaceItem_Full = (item, vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
      case "LowerNorfair":
        return false;
      default:
        break;
    }
  }
  return true;
};

const canPlaceItem_MajorMinor = (item, vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.isMajor != (vertex.type == "major")) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
      case "BlueBrinstar":
      case "LowerNorfair":
        return false;
      default:
        break;
    }
  }
  return true;
};

//-----------------------------------------------------------------
// Generates the default prefill pool for Full seeds.
//-----------------------------------------------------------------

const getFullPrePool = (rnd) => {
  const prePool = [Item.Morph];

  if (rnd.Next(100) < 65) {
    prePool.push(Item.Missile);
  } else {
    prePool.push(Item.Super);
  }

  switch (rnd.Next(13)) {
    case 0:
      prePool.push(Item.Missile, Item.ScrewAttack);
      break;
    case 1:
      prePool.push(Item.Missile, Item.Speed);
      break;
    case 2:
      prePool.push(Item.Missile, Item.Bombs);
      break;
    default:
      break;
  }

  prePool.push(Item.PowerBomb);

  return prePool;
};

//-----------------------------------------------------------------
// Generates the default prefill pool for M/M seeds.
//-----------------------------------------------------------------

const getMajorMinorPrePool = (rnd) => {
  const prePool = [Item.Morph];

  if (rnd.Next(100) < 65) {
    prePool.push(Item.Missile);
  } else {
    prePool.push(Item.Super);
  }

  switch (rnd.Next(13)) {
    case 0:
      prePool.push(Item.Speed);
      break;
    case 1:
    case 2:
      prePool.push(Item.ScrewAttack);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
      prePool.push(Item.Bombs);
      break;
    default:
      prePool.push(Item.PowerBomb);
      break;
  }

  return prePool;
};

//-----------------------------------------------------------------
// Place items within the graph.
//-----------------------------------------------------------------

const graphFill = (seed, graph, settings, maxAttempts = 10) => {
  const solver = new GraphSolver(graph, settings);
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Extract parameters.
  //-----------------------------------------------------------------

  const restrictType = settings.majorDistribution != MajorDistributionMode.Full;

  //-----------------------------------------------------------------
  // Utility routines for shuffling arrays.
  //-----------------------------------------------------------------

  const swap = (arr, x, y) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      swap(arr, i, rnd.NextInRange(i, arr.length));
    }
  };

  //-----------------------------------------------------------------
  // Shuffle item locations.
  //-----------------------------------------------------------------

  let itemVertices = graph.map((e) => e.from).filter((v) => v.type != "");
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  let shuffledLocations = itemVertices.filter(isUnique);
  shuffle(shuffledLocations);

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const canPlaceItem = restrictType
    ? canPlaceItem_MajorMinor
    : canPlaceItem_Full;

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const itemPool = getItemPool(seed, settings);

  //-----------------------------------------------------------------
  // Prefill locations with early items.
  //-----------------------------------------------------------------

  const getPrePool = restrictType ? getMajorMinorPrePool : getFullPrePool;
  let prefillLoadout = new Loadout();

  getPrePool(rnd).forEach((itemType) => {
    const itemIndex = itemPool.findIndex((i) => i.type == itemType);
    const item = itemPool.splice(itemIndex, 1)[0];
    const available = shuffledLocations.find(
      (v) =>
        canPlaceItem(item, v) &&
        solver.isVertexAvailable(v, prefillLoadout, itemType, settings)
    );

    available.item = item;
    prefillLoadout.add(itemType);
  });

  //-----------------------------------------------------------------
  // Utility routine for placing items.
  //-----------------------------------------------------------------

  const placeItems = (itemPool, vertices) => {
    //-----------------------------------------------------------------
    // Create a shuffled list of items to place.
    //-----------------------------------------------------------------

    let shuffledItems = [...itemPool];
    shuffle(shuffledItems);

    //-----------------------------------------------------------------
    // Blindly place items in valid locations.
    //-----------------------------------------------------------------

    for (let j = 0; j < vertices.length; j++) {
      let v = vertices[j];

      const itemIndex = shuffledItems.findIndex((i) => canPlaceItem(i, v));
      if (itemIndex < 0) {
        return false;
      }
      v.item = shuffledItems.splice(itemIndex, 1)[0];
    }
    return true;
  };

  //-----------------------------------------------------------------
  // Make a copy of the non-prefilled nodes.
  //-----------------------------------------------------------------

  const nonPrefilled = shuffledLocations.filter((n) => n.item == undefined);

  //-----------------------------------------------------------------
  // Randomly place items until seed is verified.
  //-----------------------------------------------------------------

  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts += 1;

    nonPrefilled.forEach((n) => (n.item = undefined));

    if (!placeItems(itemPool, nonPrefilled)) {
      continue;
    }

    const tempSolver = new GraphSolver(cloneGraph(graph), settings);
    if (tempSolver.isValid(new Loadout())) {
      return attempts;
    }
  }
  throw new Error(
    `Failed to fill graph for seed ${seed} after ${attempts} attempts`
  );
};

//-----------------------------------------------------------------
// Performs multiple passes to generate a seed using a graph.
//-----------------------------------------------------------------

export const generateSeed = (seed, settings) => {
  const maxOuterLoop = 20;
  let maxInnerLoop = 10;

  if (!settings.randomizeAreas) {
    maxInnerLoop *= 10;
  }
  if (settings.bossMode == BossMode.Vanilla) {
    maxInnerLoop *= 2;
  }

  let attempts = 1;
  while (attempts < maxOuterLoop) {
    const graph = loadGraph(
      seed,
      attempts,
      settings.mapLayout,
      settings.majorDistribution,
      settings.randomizeAreas,
      settings.bossMode
    );

    try {
      graphFill(seed, graph, settings, maxInnerLoop);
      return graph;
    } catch (e) {
      attempts += 1;
    }
  }
  throw new Error(`Failed to generate seed ${seed}`);
};
