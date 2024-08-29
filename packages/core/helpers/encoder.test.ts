import { generateSeed } from "../data";
import { getPreset } from "../lib/presets";
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
    const dirPath = path.resolve(__dirname, "../lib/fixtures");
    const seed = 0xdead;
    const preset = getPreset("sgl23");
    const { settings, options } = preset;
    const graph = generateSeed(seed, settings, options);
    const encoded = encodeSeed({ seed, settings, options }, graph);
    const decoded = decodeSeed(encoded);
    const recoded = encodeSeed(decoded.params, decoded.graph);
    expect(toSafeString(recoded)).toBe(toSafeString(encoded));

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
