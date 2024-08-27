import { generateSeed } from "../data";
import { getPreset } from "../lib/presets"
import { encodeSeed, toSafeString } from "./encoder";

describe("encoder", () => {
  test("derp", () => {
    const seed = 0xDEAD;
    const preset = getPreset('sgl23');
    const { settings, options } = preset;
    const graph = generateSeed(seed, settings, options);
    const encoded = encodeSeed({ seed, settings, options }, graph);
    expect(toSafeString(encoded)).toBe('')
  })
})