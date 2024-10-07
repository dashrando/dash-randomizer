import { generateSeed } from "../data";
import { getAllPresets, getPreset } from "../lib/presets";
import { generateSeedPatch } from "../lib/sm-rando";
import { decodeSeedFromString, encodeSeedAsString } from "./encoder";
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
        const encoded = encodeSeedAsString({ seed, settings, options }, graph);
        const decoded = decodeSeedFromString(encoded);
        const recoded = encodeSeedAsString(decoded.params, decoded.graph);
        expect(encodings[idx++]).toBe(recoded)

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
});
