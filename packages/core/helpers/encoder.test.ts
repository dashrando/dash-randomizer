import { generateSeed } from "../data";
import { getAllPresets, getPreset } from "../lib/presets";
import { generateSeedPatch } from "../lib/sm-rando";
import { decodeSeed, encodeSeed, fromSafeString, toSafeString } from "./encoder";
import fs from "fs";
import path from "path";
import { patchToString } from "../lib/sm-rando.test";

describe("encoder", () => {
  test("simple", () => {
    const dirPath = path.resolve(__dirname, "../lib/graph/fixtures");
    const presets = getAllPresets();
    const existing = fs.readFileSync(path.resolve(dirPath, "first25.txt"), "utf-8");
    const encodings = existing.split("\n") ;
    let idx = 0;

    presets.forEach((p) => {
      for (let i = 0; i < 25; i++) {
        const seed = i + 1;
        const { settings, options } = p;
        const graph = generateSeed(seed, settings, options);
        const encoded = encodeSeed({ seed, settings, options }, graph);
        const decoded = decodeSeed(encoded);
        const recoded = encodeSeed(decoded.params, decoded.graph);
        expect(encodings[idx++]).toBe(toSafeString(recoded))

        const encodePatch = generateSeedPatch(
          seed,
          settings,
          graph,
          options,
          false
        );
        const recodePatch = generateSeedPatch(
          decoded.params.seed,
          decoded.params.settings,
          decoded.graph,
          decoded.params.options,
          false
        );
        expect(patchToString(recodePatch)).toBe(patchToString(encodePatch));
      }
    })
  });

  test("compressed string", () => {
    const presets = getAllPresets();
    presets.forEach(p => {
      const { settings, options } = p;
      for (let seed = 1; seed < 10; seed++) {
        const graph = generateSeed(seed, settings, options);
        const encoded = encodeSeed({ seed, settings, options }, graph);
        const toString = toSafeString(encoded)
        const fromString = fromSafeString(toString)
        expect(toString).toBe(toSafeString(fromString))
      }
    })
  })
});
