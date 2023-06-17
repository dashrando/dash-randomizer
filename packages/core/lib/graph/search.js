//-----------------------------------------------------------------
// Finds accessible vertices and caches open edges.
//-----------------------------------------------------------------

export const searchAndCache = (graph, vertex, test) => {
  // Use breadth first search
  let queue = [vertex];
  let visited = [];

  while (queue.length > 0) {
    const v = queue.shift();
    visited.push(v);

    const connections = graph.filter((c) => c.from == v);
    connections.forEach((c) => {
      if (c.condition === true || test(c.condition)) {
        // Cache that the edge is open
        c.condition = true;
        if (!visited.includes(c.to) && !queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    });
  }

  return visited;
};

export const canReachStart = (graph, vertex, test) => {
  if (vertex.pathToStart) {
    return true;
  }

  let queue = [vertex];
  let visited = [];

  while (queue.length > 0) {
    const v = queue.shift();
    visited.push(v);

    const connections = graph.filter((c) => c.from == v);
    for (let i = 0; i < connections.length; i++) {
      const c = connections[i];
      if (c.condition === true || test(c.condition)) {
        if (c.to.pathToStart) {
          c.from.pathToStart = true;
          return true;
        }
        if (!visited.includes(c.to) && !queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    }
  }

  return false;
};
export const canReachVertex = (graph, startVertex, endVertex, test) => {
  if (startVertex == endVertex) {
    return true;
  }

  let queue = [startVertex];
  let visited = [];

  while (queue.length > 0) {
    const v = queue.shift();
    visited.push(v);

    const connections = graph.filter((c) => c.from == v);
    for (let i = 0; i < connections.length; i++) {
      const c = connections[i];
      if (c.condition === true || test(c.condition)) {
        if (c.to == endVertex) {
          return true;
        }
        if (!visited.includes(c.to) && !queue.includes(c.to)) {
          queue.push(c.to);
        }
      }
    }
  }

  return false;
};

export const mergeGraph = (graph, vertex, load) => {
  for (let i = 0; i < graph.length; i++) {
    // Skip all item vertices
    if (graph[i].to.type != "" || graph[i].from.type != "") {
      continue;
    }
    // Not a connection from the specified vertex?
    if (graph[i].from != vertex || !graph[i].condition(load)) {
      continue;
    }
    // Find the connection that goes back to our vertex
    const back = graph.findIndex((n) => n.from == graph[i].to && n.to == vertex);
    if (back >= 0 && graph[back].condition(load)) {
      graph.forEach((n, idx) => {
        if (idx == i || idx == back) {
          return;
        }
        if (n.from == graph[i].to) {
          n.from = vertex;
        }
        if (n.to == graph[i].to) {
          n.to = vertex;
        }
      });
      if (back > i) {
        graph.splice(back, 1);
        graph.splice(i, 1);
      } else {
        graph.splice(i, 1);
        graph.splice(back, 1);
      }
      mergeGraph(graph, vertex, load);
      return;
    }
  }
};
