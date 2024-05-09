import DotNetRandom from "../dotnet-random";
import { Item, ItemType } from "../items";
import { isGraphValid } from "./solver";
import { Graph, Vertex, cloneGraph, loadGraph } from "./init";
import { addItem, checkFlags, createLoadout } from "../loadout";
import { getItemPool } from "./itemPool";
import { MajorDistributionMode, Options, Settings } from "./params";
import { canReachVertex } from "./search";
import { getArea, getLocations } from "../locations";

//-----------------------------------------------------------------
// Utility routines.
//-----------------------------------------------------------------

const canPlaceItem_Full = (item: ItemType, vertex: Vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
      case "LowerNorfair":
        return false;
      default:
        break;
    }
  }
  return true;
};

const canPlaceItem_MajorMinor = (item: ItemType, vertex: Vertex) => {
  if (vertex.item != undefined) {
    return false;
  }
  if (item.isMajor != (vertex.type == "major")) {
    return false;
  }
  if (item.type == Item.Gravity) {
    switch (vertex.area) {
      case "Crateria":
        return false;
      default:
        break;
    }
  } else if (item.type == Item.Varia) {
    switch (vertex.area) {
      case "Crateria":
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

const getFullPrePool = (rnd: DotNetRandom) => {
  const prePool: number[] = [Item.Morph];

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

const getMajorMinorPrePool = (rnd: DotNetRandom) => {
  const prePool: number[] = [Item.Morph];

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
// Generates the default prefill pool for Chozo seeds.
//-----------------------------------------------------------------

const getChozoPrePool = (rnd: DotNetRandom) => {
  const prePool: number[] = [Item.Morph];

  switch (rnd.Next(10)) {
    case 0:
      prePool.push(Item.ScrewAttack);
      break;
    case 1:
      prePool.push(Item.Bombs);
      break;
    case 2:
    case 3:
      prePool.push(Item.PowerBomb);
      break;
    case 4:
    case 5:
    case 6:
      prePool.push(Item.Super);
      break;
    default:
      prePool.push(Item.Missile);
      break;
  }

  return prePool;
};

//-----------------------------------------------------------------
// Place items within the graph.
//-----------------------------------------------------------------

const graphFill = (
  seed: number,
  rnd: DotNetRandom,
  graph: Graph,
  settings: Settings,
  maxAttempts = 10,
) => {
  //-----------------------------------------------------------------
  // Extract parameters.
  //-----------------------------------------------------------------

  const restrictType = settings.majorDistribution != MajorDistributionMode.Full;

  //-----------------------------------------------------------------
  // Utility routines for shuffling arrays.
  //-----------------------------------------------------------------

  const swap = (arr: any[], x: number, y: number) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  const shuffle = (arr: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      swap(arr, i, rnd.NextInRange(i, arr.length));
    }
  };

  //-----------------------------------------------------------------
  // Shuffle item locations.
  //-----------------------------------------------------------------

  let itemVertices = graph
    .map((e) => e.from)
    .filter((v) => {
      return v.type == "major" || v.type == "minor";
    });
  const isUnique = (value: Vertex, index: number, array: Vertex[]) => {
    return array.indexOf(value) === index;
  };
  let shuffledLocations = itemVertices.filter(isUnique);
  shuffle(shuffledLocations);

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  //const bossVertices = graph
    //.map((e) => e.from)
    //.filter((v) => v.type == "boss")
    //.filter(isUnique)

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const canPlaceItem = restrictType
    ? canPlaceItem_MajorMinor
    : canPlaceItem_Full;

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const itemPool = getItemPool(seed, settings, shuffledLocations.length);

  //-----------------------------------------------------------------
  // Prefill locations with early items.
  //-----------------------------------------------------------------

  const getPrePool = restrictType
    ? settings.majorDistribution == MajorDistributionMode.Chozo
      ? getChozoPrePool
      : getMajorMinorPrePool
    : getFullPrePool;
  let prefillLoadout = createLoadout();
  const startVertex = graph[0].from;

  getPrePool(rnd).forEach((itemType) => {
    const itemIndex = itemPool.findIndex((i) => {
      if (settings.majorDistribution != MajorDistributionMode.Chozo) {
        return i.type == itemType;
      }
      return i.isMajor && i.type == itemType;
    });
    const item = itemPool.splice(itemIndex, 1)[0];
    const checker = checkFlags(prefillLoadout);
    const available = shuffledLocations.find(
      (v) =>
        canPlaceItem(item, v) &&
        canReachVertex(graph, startVertex, v, checker) &&
        canReachVertex(graph, v, startVertex, checker));

    if (available == undefined) {
      throw new Error("graphFill: failed to find available location for item")
    }
    available.item = item;
    addItem(prefillLoadout, itemType);
  });

  //-----------------------------------------------------------------
  // Utility routine for placing items.
  //-----------------------------------------------------------------

  const placeItems = (itemPool: ItemType[], vertices: Vertex[]) => {
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
  const emptyLoadout = createLoadout();

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

    if (isGraphValid(cloneGraph(graph), settings, emptyLoadout)) {
      //console.log('----')
      //bossVertices.forEach(b => console.log(b.name,b.area))
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

export const generateSeed = (
  seed: number,
  settings: Settings,
  options: Options,
) => {
  const maxOuterLoop = 20;
  let maxInnerLoop = 40;
  const rnd = new DotNetRandom(seed);

  if (settings.majorDistribution == MajorDistributionMode.Chozo) {
    maxInnerLoop *= 5;
  }
  if (!settings.randomizeAreas) {
    maxInnerLoop *= 10;
  }

  let attempts = 1;
  while (attempts < maxOuterLoop) {
    const graph = loadGraph(
      seed,
      attempts,
      settings.mapLayout,
      settings.majorDistribution,
      settings.randomizeAreas,
      options.RelaxedLogic,
      settings.bossMode,
    );

    try {
      graphFill(seed, rnd, graph, settings, maxInnerLoop);
      return graph;
    } catch (e) {
      attempts += 1;
    }
  }
  throw new Error(`Failed to generate seed ${seed}`);
};

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

export const getGraphLocations = (graph: Graph) => {
   return getLocations().map((l) => {
    const b = graph.find((e) => {
      return e.to.name === l.name && getArea(e.to.area) == l.area
    })
    //if (b == null) {
      //console.log(l)
    //}
    return b?.to;
  }).filter((n) => n != null)
}