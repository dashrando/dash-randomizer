import { generateSeed } from "../data";
import { getPreset } from "../lib/presets"
import { decodeSeed, encodeSeed, toSafeString } from "./encoder";

describe("encoder", () => {
  test("simple", () => {
    const seed = 0xDEAD;
    const preset = getPreset('sgl23');
    const { settings, options } = preset;
    const graph = generateSeed(seed, settings, options);
    const encoded = encodeSeed({ seed, settings, options }, graph);
    const decoded = decodeSeed(encoded);
    const recoded = encodeSeed(decoded.params, decoded.graph)
    expect(toSafeString(recoded)).toBe(toSafeString(encoded))
    //TODO: Need to test generated patch because spoiler isn't populated currently
  })
})