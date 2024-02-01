import { Graph, Vertex, Condition } from "./init"

//-----------------------------------------------------------------
// Finds accessible vertices and caches open edges.
//-----------------------------------------------------------------

export const searchAndCache = (
  graph: Graph,
  vertex: Vertex,
  test: (condition: Condition) => any,
) => {
  // Use breadth first search
  let queue = [vertex];
  let pos = 0;

  while (pos < queue.length) {
    const v = queue[pos++];

    const connections = graph.filter((c) => c.from == v);
    connections.forEach((c) => {
      if (c.condition === true || test(c.condition)) {
        // Cache that the edge is open
        c.condition = true;
        if (!queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    });
  }

  return queue;
};

export const canReachStart = (
  graph: Graph,
  vertex: Vertex,
  test: (condition: Condition) => any,
) => {
  if (vertex.pathToStart) {
    return true;
  }

  let queue = [vertex];
  let pos = 0;

  while (pos < queue.length) {
    const v = queue[pos++];

    const connections = graph.filter((c) => c.from == v);
    for (let i = 0; i < connections.length; i++) {
      const c = connections[i];
      if (c.condition === true || test(c.condition)) {
        if (c.to.pathToStart) {
          c.from.pathToStart = true;
          return true;
        }
        if (!queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    }
  }

  return false;
};

export const canReachVertex = (
  graph: Graph,
  startVertex: Vertex,
  endVertex: Vertex,
  test: (condition: Condition) => any,
) => {
  if (startVertex == endVertex) {
    return true;
  }

  let queue = [startVertex];
  let pos = 0;

  while (pos < queue.length) {
    const v = queue[pos++];

    const connections = graph.filter((c) => c.from == v);
    for (let i = 0; i < connections.length; i++) {
      const c = connections[i];
      if (c.condition === true || test(c.condition)) {
        if (c.to == endVertex) {
          return true;
        }
        if (!queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    }
  }

  return false;
};