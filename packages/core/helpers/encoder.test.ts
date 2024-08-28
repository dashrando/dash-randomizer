import { generateSeed } from "../data";
import { getPreset } from "../lib/presets";
import { generateSeedPatch } from "../lib/sm-rando";
import { decodeSeed, encodeSeed, toSafeString } from "./encoder";
import fs from "fs";
import path from "path";
import { patchToString } from "../lib/sm-rando.test";

describe("encoder", () => {
  test.skip("simple", () => {
    const dirPath = path.resolve(__dirname, "../lib/fixtures");
    const seed = 0xdead;
    const preset = getPreset("sgl23");
    const { settings, options } = preset;
    const graph = generateSeed(seed, settings, options);
    const encoded = encodeSeed({ seed, settings, options }, graph);
    const decoded = decodeSeed(encoded);
    const recoded = encodeSeed(decoded.params, decoded.graph);
    expect(toSafeString(recoded)).toBe(toSafeString(encoded));
    const data = fs.readFileSync(
      path.resolve(dirPath, "seed_patches", "sgl23_DEAD.txt"),
      "utf-8"
    );
    const patch = generateSeedPatch(
      decoded.params.seed,
      decoded.params.settings,
      decoded.graph,
      decoded.params.options,
      false
    );
    //TODO: Use sorted lines?
    expect(patchToString(patch)).toBe(data);
  });
});
