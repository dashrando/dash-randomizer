import { Graph, Vertex } from "./init";
import { PortalMapping } from "./data/portals";
import { isAreaEdge, isBossEdge } from "../../data";
import { Location, getArea, getLocations } from "../locations";
import { ItemType } from "../items";

export type PlacedItem = {
  location: Location;
  item: ItemType|null;
};

export const getAreaTransitions = (graph: Graph): PortalMapping[] => {
  return graph
    .filter((n) => isAreaEdge(n))
    .map((n) => {
      return [
        { name: n.from.name.slice(), area: n.from.area.slice() },
        { name: n.to.name.slice(), area: n.to.area.slice() },
      ];
    });
};

export const getBossTransitions = (graph: Graph): PortalMapping[] => {
  return graph
    .filter((n) => isBossEdge(n) && n.from.type == "exit")
    .map((n) => {
      return [
        { name: n.from.name.slice(), area: n.from.area.slice() },
        { name: n.to.name.slice(), area: n.to.area.slice() },
      ];
    });
};

export const getItemLocations = (graph: Graph, sorted: boolean): PlacedItem[] => {
  const nodes: PlacedItem[] = [];

  const getItem = (vertex: Vertex|undefined) => {
    if (vertex === undefined || vertex.item === undefined) {
      return null;
    }
    return vertex.item
  }

  getLocations().forEach((l) => {
    const vertex = graph.find((e) => {
      return e.from.name == l.name && getArea(e.from.area) == l.area
    })?.from;
    nodes.push({
      location: l,
      item: getItem(vertex)
    })
  })

  if (!sorted) {
    return nodes;
  }

  return nodes.sort((a, b) => a.location.address - b.location.address);
};