import { standardVertices } from "./data/standard/vertex";
import { crateriaEdges } from "./data/standard/edges/crateria";
import { greenbrinstarEdges } from "./data/standard/edges/greenbrinstar";
import { redbrinstarEdges } from "./data/standard/edges/redbrinstar";
import { kraidslairEdges } from "./data/standard/edges/kraid";
import { crocomireEdges } from "./data/standard/edges/crocomire";
import { westmaridiaEdges } from "./data/standard/edges/westmaridia";
import { eastmaridiaEdges } from "./data/standard/edges/eastmaridia";
import { uppernorfairEdges } from "./data/standard/edges/uppernorfair";
import { lowernorfairEdges } from "./data/standard/edges/lowernorfair";
import { wreckedshipEdges } from "./data/standard/edges/wreckedship";
import { bossEdges } from "./data/standard/edges/boss";
import { BossMode, MapLayout, MajorDistributionMode } from "./params";
import { RecallVertexUpdates } from "./data/recall/vertex";
import { RecallEdgeUpdates } from "./data/recall/edges";
import { StandardAreaEdgeUpdates } from "./data/standard/area";
import { mapPortals, PortalMapping } from "./data/portals";
import { bossItem, Item, ItemType } from "../items";
import DotNetRandom from "../dotnet-random";
import { ChozoVertexUpdates } from "./data/chozo/vertex";
import { RelaxedEdgeUpdates } from "./data/relaxed/edges";

export type Condition = boolean | (() => any);

export type Vertex = {
  name: string;
  type: string;
  area: string;
  item: ItemType | undefined;
  pathToStart: boolean;
}

type VertexUpdate = {
  name: string;
  type: string;
}

export type Edge = {
  from: Vertex;
  to: Vertex;
  condition: Condition;
}

type EdgeUpdate = {
  edges: string[];
  requires: Condition;
}

export type Graph = Edge[];

//-----------------------------------------------------------------
// Returns a structure containing all edges grouped by area.
//-----------------------------------------------------------------

const getStandardEdges = () => {
  return {
    Crateria: crateriaEdges,
    GreenBrinstar: greenbrinstarEdges,
    RedBrinstar: redbrinstarEdges,
    KraidsLair: kraidslairEdges,
    Crocomire: crocomireEdges,
    WestMaridia: westmaridiaEdges,
    EastMaridia: eastmaridiaEdges,
    UpperNorfair: uppernorfairEdges,
    LowerNorfair: lowernorfairEdges,
    WreckedShip: wreckedshipEdges,
    Bosses: bossEdges,
  };
};

//-----------------------------------------------------------------
// Returns an array of all vertices on the game world.
//-----------------------------------------------------------------

const getAllVertices = (): Vertex[] => {
  return Object.entries(standardVertices)
    .map(([k, v]) => {
      return Object.entries(v).map(([name, type]) => {
        return {
          name: name,
          type: type,
          area: k,
          item: undefined,
          pathToStart: false,
        };
      });
    })
    .reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
};

//-----------------------------------------------------------------
// Converts the edge data into an array of edges which will be
// used to actually create graph objects. This code runs only
// once when the module is loaded.
//-----------------------------------------------------------------

const allEdges = Object.entries(getStandardEdges())
  .map(([_, v]) => {
    return Object.entries(v)
      .map(([from, w]) => {
        return Object.entries(w).map(([to, condition]) => {
          return {
            from: from,
            to: to,
            condition: condition as Condition,
          };
        });
      })
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, []);
  })
  .reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

//-----------------------------------------------------------------
// Build a graph representing the game world.
//-----------------------------------------------------------------

const createGraph = (
  portalMapping: PortalMapping[],
  vertexUpdates: VertexUpdate[],
  edgeUpdates: EdgeUpdate[],
  startVertex?: string
): Graph => {
  //-----------------------------------------------------------------
  // Get all vertices for the graph. Vertices represent locations
  // within the game world.
  //-----------------------------------------------------------------

  const allVertices = getAllVertices();

  const findVertex = (name: string) => {
    const vertex = allVertices.find((v) => v.name == name);
    if (vertex == undefined) {
      throw new Error(`createGraph: could not find vertex, ${name}`);
    }
    return vertex;
  };

  //-----------------------------------------------------------------
  // Apply specified vertex updates. Currently restricted to type
  // but may include other options eventually.
  //-----------------------------------------------------------------

  vertexUpdates.forEach((v) => {
    findVertex(v.name).type = v.type;
  });

  //-----------------------------------------------------------------
  // Set a flag on the start vertex. This flag exists on all
  // vertices and is used for caching to speed up solving.
  //-----------------------------------------------------------------

  if (startVertex != undefined) {
    findVertex(startVertex).pathToStart = true;
  } else {
    findVertex("Ship").pathToStart = true;
  }

  //-----------------------------------------------------------------
  // Get all edges for the graph. Edges establish the condition to
  // travel from one vertex to another.
  //-----------------------------------------------------------------

  const edges: Edge[] = allEdges
    .map((e) => {
      return {
        from: findVertex(e.from),
        to: findVertex(e.to),
        condition: e.condition,
      };
    })
    .concat(
      portalMapping.map((a) => {
        return {
          from: findVertex(a[0]),
          to: findVertex(a[1]),
          condition: true,
        };
      })
    )
    .concat(
      portalMapping.map((a) => {
        return {
          from: findVertex(a[1]),
          to: findVertex(a[0]),
          condition: true,
        };
      })
    );

  //-----------------------------------------------------------------
  // Apply specified edge updates. This could simply be a logic
  // change or could include edits to the map.
  //-----------------------------------------------------------------

  edgeUpdates.forEach((c) => {
    const [from, to] = c.edges;
    const edge = edges.find((n) => n.from.name == from && n.to.name == to);
    if (edge == null) {
      throw new Error(`Could not find edge from ${from} to ${to}`);
    }
    edge.condition = c.requires;
  });

  //-----------------------------------------------------------------
  // Return all valid edges. Some edges are placeholders and may
  // not be available for the current graph. There is no reason
  // to include those as it will slow down solving.
  //-----------------------------------------------------------------

  return edges.filter(e => e.condition !== false);
};

//-----------------------------------------------------------------
// Creates a copy of the graph. New memory is allocated for the
// vertices and edges so that changes can be made to the cloned
// graph without changing the original.
//-----------------------------------------------------------------

export const cloneGraph = (graph: Graph): Graph => {
  const newVertices = getAllVertices();

  const remap = (orig: Vertex) => {
    let v = newVertices.find((v) => v.name == orig.name);
    if (v == undefined) {
      throw new Error('cloneGraph: missing vertex to remap')
    }
    v.type = orig.type;
    v.area = orig.area;
    v.pathToStart = orig.pathToStart;
    if (orig.item != undefined) {
      v.item = {...orig.item};
    }
    return v;
  }

  return graph.map((e) => {
    return {
      from: remap(e.from),
      to: remap(e.to),
      condition: e.condition,
    };
  });
};

//-----------------------------------------------------------------
// Gets an array of edge updates based on the settings.
//-----------------------------------------------------------------

const getEdgeUpdates = (mapLayout: number, areaShuffle: boolean): EdgeUpdate[] => {
  switch (mapLayout) {
    case MapLayout.Standard:
    case MapLayout.Classic:
      if (areaShuffle) {
        return StandardAreaEdgeUpdates;
      }
      return [];
    case MapLayout.Recall:
      if (areaShuffle) {
        return RecallEdgeUpdates.concat(StandardAreaEdgeUpdates);
      }
      return RecallEdgeUpdates;
    default:
      throw new Error(`Unknown map layout: ${mapLayout}`);
  }
};

//-----------------------------------------------------------------
// Gets an array of vertex updates based on the settings.
//-----------------------------------------------------------------

const getVertexUpdates = (mode: number): VertexUpdate[] => {
  switch(mode) {
    case MajorDistributionMode.Recall:
      return RecallVertexUpdates;
    case MajorDistributionMode.Chozo:
      return ChozoVertexUpdates;
    default:
      return [];
  }
}

//-----------------------------------------------------------------
// Adds pseudo items to a graph for defeating bosses based on the
// settings provided. Updates the areas of boss nodes and related
// nodes like the exit and prize nodes.
//-----------------------------------------------------------------

const addBossItems = (graph: Graph, mode: number) => {
  const isUnique = (value: Vertex, index: number, array: Vertex[]) => {
    return array.indexOf(value) === index;
  };
  const bosses = graph
    .filter((e) => e.from.type == "boss")
    .map((e) => e.from)
    .filter(isUnique);

  const addItem = (boss: Vertex) => {
    switch (boss.area) {
      case "KraidsLair":
        boss.item = bossItem(Item.DefeatedBrinstarBoss);
        break;
      case "WreckedShip":
        boss.item = bossItem(Item.DefeatedWreckedShipBoss);
        break;
      case "EastMaridia":
        boss.item = bossItem(Item.DefeatedMaridiaBoss);
        break;
      case "LowerNorfair":
        boss.item = bossItem(Item.DefeatedNorfairBoss);
        break;
    }
  }

  const getAdjacent = (boss: Vertex) => {
    const exit = graph.find(
      (e) => e.from.type == "exit" && e.to == boss
    )?.from;

    if (exit == undefined) {
      throw new Error('getAdjacent: missing boss exit edge')
    }

    const doorEdge = graph.find((e) => e.from != boss && e.to == exit);

    if (doorEdge == undefined) {
      throw new Error('getAdjacent: missing boss door edge')
    }

    return {
      exit,
      door: doorEdge.from,
      prize: graph.find((e) => e.from == boss && e.to.type == "major")?.to
    }
  }

  if (mode == BossMode.Shuffled) {
    bosses.forEach((b) => {
      const { exit, door } = getAdjacent(b);

      //-----------------------------------------------------------------
      // Add the pseudo item for defeating the boss before updating the
      // area associated with the boss node because defeating the boss
      // will unlock its vanilla area.
      //-----------------------------------------------------------------

      addItem(b);

      //-----------------------------------------------------------------
      // Update the area of the boss and exit nodes to match the area
      // of the boss door. The prize node is NOT updated because it
      // should reference its vanilla area.
      //-----------------------------------------------------------------

      exit.area = door.area;
      b.area = door.area;
    });
  } else {
    bosses.forEach((b) => {
      const { exit, door, prize } = getAdjacent(b);

      //-----------------------------------------------------------------
      // Update the area of the boss, prize, and exit nodes to match
      // the area of the boss door.
      //-----------------------------------------------------------------

      if (prize != undefined) {
        prize.area = door.area;
      }

      exit.area = door.area;
      b.area = door.area;

      //-----------------------------------------------------------------
      // Add the pseudo item for defeating the boss after updating the
      // area associated with the boss node because defeating the boss
      // will unlock the area where it is located.
      //-----------------------------------------------------------------

      addItem(b);
    });
  }
};

//-----------------------------------------------------------------
// Loads a graph using the specified settings.
//-----------------------------------------------------------------

export const loadGraph = (
  seed: number,
  attempt: number,
  mapLayout: number,
  majorDistributionMode: number,
  areaShuffle = false,
  relaxed = false,
  bossMode = BossMode.Vanilla,
  portals?: PortalMapping[]
) => {
  const getSeed = () => {
    if (attempt == 1) {
      return seed;
    }

    const seedGen = new DotNetRandom(-seed);
    for (let i = 0; i < attempt - 2; i++) {
      seedGen.InternalSample();
    }
    return seedGen.NextInRange(1, 1000000);
  };

  const getPortals = () =>
    portals ? portals : mapPortals(getSeed(), areaShuffle, bossMode);

  const edgeUpdates: EdgeUpdate[] = relaxed ? RelaxedEdgeUpdates : [];

  const g = createGraph(
    getPortals(),
    getVertexUpdates(majorDistributionMode),
    edgeUpdates.concat(getEdgeUpdates(mapLayout, areaShuffle))
  );
  addBossItems(g, bossMode);
  return g;
};
