import DotNetRandom from "../dotnet-random";
import { Item } from "../items";
import GraphSolver from "./solver";
import { cloneGraph } from "./init";
import Loadout from "../loadout";
import { getFullPrePool, getMajorMinorPrePool } from "../itemPlacement.js";
import { getItemPool } from "./items";
import { MajorDistributionMode } from "./params";

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

export const graphFill = (seed, graph, itemPoolParams, settings) => {
  const solver = new GraphSolver(graph, settings);
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Extract parameters.
  //-----------------------------------------------------------------

  const { beamMode } = settings;
  const { majorDistribution, minorDistribution } = itemPoolParams;
  const restrictType = majorDistribution.mode != MajorDistributionMode.Full;

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

  const itemPool = getItemPool(
    seed,
    majorDistribution,
    minorDistribution,
    beamMode
  );

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
  while (attempts < 10) {
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
