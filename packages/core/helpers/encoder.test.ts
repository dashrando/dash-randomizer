import { generateSeed } from "../data";
import { getAllPresets, getPreset } from "../lib/presets";
import { generateSeedPatch } from "../lib/sm-rando";
import { decodeSeed, encodeSeed, toSafeString } from "./encoder";
import fs from "fs";
import path from "path";
import { patchToString } from "../lib/sm-rando.test";

function sortLines(inputString: string) {
  // Split the input string into an array of lines
  const lines = inputString.split("\n");

  // Sort the lines
  lines.sort();

  // Join the sorted lines back into a single string with newlines
  return lines.join("\n");
}

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
      }
    })

    const seed = 0xDEAD;
    const { settings, options } = getPreset("sgl23");
    const graph = generateSeed(seed, settings, options);
    const encoded = encodeSeed({ seed, settings, options }, graph);
    const decoded = decodeSeed(encoded);

    const encodePatch = generateSeedPatch(
      seed,
      settings,
      graph,
      options,
      false
    );
    const encodeLines = sortLines(patchToString(encodePatch));

    const recodePatch = generateSeedPatch(
      decoded.params.seed,
      decoded.params.settings,
      decoded.graph,
      decoded.params.options,
      false
    );
    const recodeLines = sortLines(patchToString(recodePatch));

    /*fs.writeFileSync(
      path.resolve(dirPath, "seed_patches", "sgl23_DEAD_encode.txt"),
      encodeLines
    );
    fs.writeFileSync(
      path.resolve(dirPath, "seed_patches", "sgl23_DEAD_recode.txt"),
      recodeLines
    );*/

    expect(recodeLines).toBe(encodeLines);
  });
});
