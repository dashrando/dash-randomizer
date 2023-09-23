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
import { mapPortals } from "./data/portals";
import { bossItem, Item } from "../items";
import DotNetRandom from "../dotnet-random";

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

const getAllVertices = () => {
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

const allEdges = Object.entries(getStandardEdges())
  .map(([_, v]) => {
    return Object.entries(v)
      .map(([from, w]) => {
        return Object.entries(w).map(([to, condition]) => {
          return {
            from: from,
            to: to,
            condition: condition,
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

export const createGraph = (
  portalMapping,
  vertexUpdates,
  edgeUpdates,
  startVertex
) => {
  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const allVertices = getAllVertices();

  const findVertex = (name) => {
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
  //
  //-----------------------------------------------------------------

  if (startVertex != undefined) {
    findVertex(startVertex).pathToStart = true;
  } else {
    findVertex("Ship").pathToStart = true;
  }

  //-----------------------------------------------------------------
  //
  //-----------------------------------------------------------------

  const edges = allEdges
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
  // Update boss areas.
  //-----------------------------------------------------------------

  //const updateArea = (entry, newArea) => {

  //}

  return edges;
};

export const cloneGraph = (graph) => {
  const newVertices = getAllVertices();
  const remap = (vertex) => {
    return newVertices.find((v) => v.name == vertex.name);
  };

  newVertices.forEach((v) => {
    const orig = graph.map((o) => o.from).find((t) => t.name == v.name);
    v.type = orig.type;
    v.area = orig.area;
    v.pathToStart = orig.pathToStart;
    if (orig.item != undefined) {
      v.item = {
        type: orig.item.type,
        name: orig.item.name,
        isMajor: orig.item.isMajor,
        spoilerAddress: orig.item.spoilerAddress,
      };
    }
  });

  return graph.map((e) => {
    return {
      from: remap(e.from),
      to: remap(e.to),
      condition: e.condition,
    };
  });
};

const getEdgeUpdates = (mapLayout, areaShuffle) => {
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

const addBossItems = (graph, mode) => {
  const isUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };
  const bosses = graph
    .filter((e) => e.from.type == "boss")
    .map((e) => e.from)
    .filter(isUnique);

  if (mode == BossMode.Vanilla || mode == BossMode.ShuffleStandard) {
    bosses.forEach((b) => {
      switch (b.name) {
        case "Boss_Kraid":
          b.item = bossItem(Item.DefeatedBrinstarBoss);
          b.area = "KraidsLair";
          break;
        case "Boss_Phantoon":
          b.item = bossItem(Item.DefeatedWreckedShipBoss);
          b.area = "WreckedShip";
          break;
        case "Boss_Draygon":
          b.item = bossItem(Item.DefeatedMaridiaBoss);
          b.area = "EastMaridia";
          break;
        case "Boss_Ridley":
          b.item = bossItem(Item.DefeatedNorfairBoss);
          b.area = "LowerNorfair";
          break;
      }
      const exitVertex = graph.find(
        (e) => e.from.name.startsWith("Exit_") && e.to == b
      ).from;
      exitVertex.area = b.area;
      const itemEdge = graph.find((e) => e.from == b && e.to.type == "major");
      if (itemEdge != undefined) {
        itemEdge.to.area = b.area;
      }
    });
  } else if (mode == BossMode.ShuffleDash) {
    bosses.forEach((b) => {
      const exitVertex = graph.find(
        (e) => e.from.name.startsWith("Exit_") && e.to == b
      ).from;
      const doorVertex = graph.find(
        (e) => e.from.name.startsWith("Door_") && e.to == exitVertex
      ).from;

      const itemEdge = graph.find((e) => e.from == b && e.to.type == "major");
      if (itemEdge != undefined) {
        itemEdge.to.area = doorVertex.area;
      }

      exitVertex.area = doorVertex.area;
      b.area = doorVertex.area;
      switch (doorVertex.name) {
        case "Door_KraidBoss":
          b.item = bossItem(Item.DefeatedBrinstarBoss);
          break;
        case "Door_PhantoonBoss":
          b.item = bossItem(Item.DefeatedWreckedShipBoss);
          break;
        case "Door_DraygonBoss":
          b.item = bossItem(Item.DefeatedMaridiaBoss);
          break;
        case "Door_RidleyBoss":
          b.item = bossItem(Item.DefeatedNorfairBoss);
          break;
      }
    });
  } else {
    throw new Error("True boss rando not implemented yet");
  }
};

export const loadGraph = (
  seed,
  attempt,
  mapLayout,
  majorDistributionMode,
  areaShuffle = false,
  bossMode = BossMode.Vanilla,
  portals = undefined
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
  const edgeUpdates = getEdgeUpdates(mapLayout, areaShuffle);
  const vertexUpdates =
    majorDistributionMode == MajorDistributionMode.Recall
      ? RecallVertexUpdates
      : [];

  if (portals != undefined) {
    const g = createGraph(portals, vertexUpdates, edgeUpdates);
    addBossItems(g, bossMode);
    return g;
  }

  const g = createGraph(
    mapPortals(getSeed(), areaShuffle, bossMode),
    vertexUpdates,
    edgeUpdates
  );
  addBossItems(g, bossMode);
  return g;
};
