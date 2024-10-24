import { getPreset } from "./presets";
import { generateSeedPatch, getSeedNumber, Patch } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import fs from "fs";
import path from "path";

export const patchToString = (patch: Patch) => {
  const arrayToString = (array: Uint8Array) => {
    return Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };
  return patch
    .map((p) => {
      const addr = p[0].toString(16).padStart(6, "0");
      const len = p[1] === 1 ? "" : ` ${p[1]}`;
      return `${addr}${len} ${arrayToString(p[2])}`;
    })
    .join("\n");
};

function sortLines(inputString: string) {
  // Split the input string into an array of lines
  const lines = inputString.split("\n");

  // Sort the lines
  lines.sort();

  // Join the sorted lines back into a single string with newlines
  return lines.join("\n");
}

describe("getSeedNumber", () => {
  const MAX_SEED = 1000000;

  test("Should return random number with no input", () => {
    const seedNumber = getSeedNumber();
    expect(seedNumber).toBeGreaterThan(0);
    expect(seedNumber).toBeLessThan(MAX_SEED);
  });

  test("Should generate a random number on 0", () => {
    const seedNumber = getSeedNumber(0);
    expect(seedNumber).toBeGreaterThan(0);
    expect(seedNumber).toBeLessThan(MAX_SEED);
  });

  test("Should return the same number if input is valid", () => {
    const seedNumber = getSeedNumber(12345);
    expect(seedNumber).toBe(12345);
  });

  test("Should throw an error if seed number is invalid", () => {
    const overMaxSeed = MAX_SEED + 1;
    const underMinSeed = -1;
    expect(() => getSeedNumber(overMaxSeed)).toThrow(
      `Invalid seed number: ${overMaxSeed}`
    );
    expect(() => getSeedNumber(underMinSeed)).toThrow(
      `Invalid seed number: ${underMinSeed}`
    );
  });

  test("Should return different results when called in quick succession", async () => {
    const seedNumber1 = getSeedNumber();
    await new Promise((resolve) => setTimeout(resolve, 2));
    const seedNumber2 = getSeedNumber();
    await new Promise((resolve) => setTimeout(resolve, 2));
    const seedNumber3 = getSeedNumber();
    await new Promise((resolve) => setTimeout(resolve, 2));
    const seedNumber4 = getSeedNumber();
    const seedNumbers = [seedNumber1, seedNumber2, seedNumber3, seedNumber4];
    expect(new Set(seedNumbers).size).toBe(seedNumbers.length);
  });
});

describe("generateSeedPath", () => {
  test("simple", () => {
    const dirPath = path.resolve(__dirname, "fixtures");

    const testPreset = (name: string, seed: number, fileName: string) => {
      const preset = getPreset(name);
      const { settings, options } = preset;
      const graph = generateSeed(seed, settings, options);
      const patch = generateSeedPatch(seed, settings, graph, options, false, '');
      //fs.writeFileSync(
        //path.resolve(dirPath, "seed_patches", fileName),
        //patchToString(patch)
      //);
      const data = fs.readFileSync(
        path.resolve(dirPath, "seed_patches", fileName),
        "utf-8"
      );
      expect(patchToString(patch)).toBe(data);
    };

    testPreset("sgl23", 0xabcd, "sgl23_ABCD.txt");
    testPreset("sgl23", 0xdead, "sgl23_DEAD.txt");
    testPreset("spring24", 0xabcd, "spring24_ABCD.txt");
    testPreset("spring24", 0xdead, "spring24_DEAD.txt");
    testPreset("chozo_bozo", 0xabcd, "chozo_bozo_ABCD.txt");
    testPreset("chozo_bozo", 0xdead, "chozo_bozo_DEAD.txt");
    testPreset("surprise_surprise", 0xabcd, "surprise_surprise_ABCD.txt");
    testPreset("surprise_surprise", 0xdead, "surprise_surprise_DEAD.txt");
    testPreset("recall", 0xabcd, "recall_ABCD.txt");
    testPreset("recall", 0xdead, "recall_DEAD.txt");
    testPreset("classic", 0xabcd, "classic_ABCD.txt");
    testPreset("classic", 0xdead, "classic_DEAD.txt");
    testPreset("2017_mm", 0xabcd, "2017_mm_ABCD.txt");
    testPreset("2017_mm", 0xdead, "2017_mm_DEAD.txt");
  });
});
