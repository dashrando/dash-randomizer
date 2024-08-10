import { computeCRC32 } from "../..";
import { getAllPresets } from "../presets";
import { generateSeed, getGraphLocations } from "./fill";

const computeChecksum = (array: any[]) => {
  const s = JSON.stringify(array)
  const e = new TextEncoder()
  return computeCRC32(e.encode(s))
}

const computeGraphChecksum = (graph) => {
  return (
    computeChecksum(
      getGraphLocations(graph).map((n) => n.item)
    )
  )
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
});