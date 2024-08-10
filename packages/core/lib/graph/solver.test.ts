import { computeCRC32, Graph, loadGraph, readGraph, readParams, readPortals } from "../..";
import { getAllPresets } from "../presets";
import { generateSeed, getGraphLocations } from "./fill";
import fs from "fs";
import path from "path";
import { isGraphValid } from "./solver";
import { createLoadout } from "../loadout";
import { PortalMapping } from "./data/portals";
import { Params } from "../params";
import { ItemNames, ItemType, minorItem } from "../items";

type SeedData = {
  params: Params,
  portals: PortalMapping[],
  itemLocations: { location: string, area: string, item: string }[]
}

const computeChecksum = (array: any[]) => {
  const s = JSON.stringify(array)
  const e = new TextEncoder()
  return computeCRC32(e.encode(s))
}

const computeGraphChecksum = (graph: Graph) => {
  return (
    computeChecksum(
      getGraphLocations(graph).map((n) => n.item)
    )
  )
}

const loadSeed = (filePath: string) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const info = JSON.parse(data) as SeedData;
  const { mapLayout, majorDistribution, randomizeAreas, bossMode } = info.params.settings;
  const { RelaxedLogic } = info.params.options;

  const graph = loadGraph(info.params.seed, 1, mapLayout, majorDistribution, randomizeAreas, RelaxedLogic, bossMode, info.portals)
  info.itemLocations.forEach((i) => {
    let code: number = 0
    ItemNames.forEach((v, k) => {
      if (v == i.item) {
        code = k
      }
    })
    placeItem(graph, i.location, i.area, minorItem(0x0, code))
  })
  return { 
    params: info.params,
    graph
  }
}

const placeItem = (graph: Graph, location: string, area: string, item: ItemType) => {
  const part = graph.find((n) => n.from.name == location && n.from.area == area);
  if (part == null) {
    console.error("missing part", location);
  } else if (part.from.type == "major") {
    item.isMajor = true;
  }
  part.from.item = item;
};

const saveSeed = (filePath: string, graph: Graph, portals: PortalMapping[], params: Params) => {
  const locations = getGraphLocations(graph);
  const itemLocations = locations
    .filter((l) => l.item != undefined)
    .sort((a, b) => a.name.localeCompare(b.name));
  const seed = {
    params,
    portals: portals,
    itemLocations: itemLocations.map((l) => {
      return {
        location: l.name,
        area: l.area,
        item: l.item.name,
        code: l.item.type
      }
    })
  }
  fs.writeFileSync(filePath, JSON.stringify(seed, null, 2))
}

describe("solver", () => {
  test("first 10", () => {
    const checksums = []
    const presets = getAllPresets()
    presets.forEach((p) => {
      for (let i = 0; i < 10; i++) {
        const g = generateSeed(i + 1, p.settings, p.options)
        checksums.push(computeGraphChecksum(g))
      }
    })
    expect(computeChecksum(checksums)).toBe(0xC7904B44)
  });

  test("known invalid seeds", () => {
    const dirPath = path.resolve(__dirname, "fixtures/invalid")
    const entries = fs.readdirSync(dirPath)
    entries.forEach((e) => {
      const full = path.resolve(dirPath, e);
      const stats = fs.statSync(full);
      if (stats.isFile()) {
        if (full.endsWith(".sfc")) {
          // Read parameters and graph from the ROM
          const rom = fs.readFileSync(full);
          const bytes = new Uint8Array(rom);
          const params = readParams(bytes)
          const portals = readPortals(bytes)
          const graph = readGraph(bytes)
          saveSeed(`${full}.json`, graph, portals, params);
          expect(isGraphValid(graph, params.settings, createLoadout())).toBe(false)
        } else if (full.endsWith(".json")) {
          // Read directly from a JSON file
          const { params, graph } = loadSeed(full);
          expect(isGraphValid(graph, params.settings, createLoadout())).toBe(false)
        }
      } else if (stats.isDirectory()) {
      }
    })
  })
});