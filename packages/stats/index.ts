import chalk from "chalk";
import { encodeSeed, getAllPresets, getPreset, readRomAsString } from "core";
import { checkSeeds } from "./lib/validate";
import { generateSeed } from "core/data";
import fs from "fs";
import path from "path";

export async function stats(presetName: string, numSeeds = 100) {
  const preset = getPreset(presetName);
  if (preset === undefined) {
    throw new Error(`unknown preset: ${presetName}`);
  }

  const startSeed = 1,
    endSeed = numSeeds;
  const { settings, options } = preset;
  const encodedSeeds: string[] = [];
  for (let i = startSeed; i <= endSeed; i++) {
    const graph = generateSeed(i, settings, options);
    encodedSeeds.push(encodeSeed({ seed: i, settings, options }, graph));
  }

  const dirPath = "results";
  const pn = (n: number) => n.toFixed(0).padStart(7, "0");
  const fileName = `seeds_${preset.fileName}_${pn(startSeed)}_${pn(
    endSeed
  )}.enc`;

  fs.writeFileSync(path.resolve(dirPath, fileName), encodedSeeds.join("\n"));

  console.log("Wrote:", fileName);
}

export async function verify(
  startSeed: number,
  endSeed: number,
  writeFrequency: number
) {
  const presets = getAllPresets();
  const batchSize = presets.length * writeFrequency;
  const start = Date.now();
  let step = start;

  const checkSeed = (seed: number) => {
    presets.forEach((p) => {
      try {
        generateSeed(seed, p.settings, p.options);
      } catch (_) {
        console.log(chalk.red(`Invalid seed #${seed} for ${p.title}`));
      }
    });
  };

  const timeString = (val: number) => `${val.toFixed(2)} ms`;
  for (let i = startSeed; i <= endSeed; i++) {
    checkSeed(i);

    if (i % writeFrequency !== 0) {
      continue;
    }

    const curr = Date.now();
    const total = presets.length * (i - startSeed + 1);
    console.log(
      `${i.toString().padStart(2, "0")} -`,
      chalk.cyan.underline("Batch:"),
      `${batchSize} in ${curr - step} ms`,
      chalk.yellow.underline("Total:"),
      `${total} in ${curr - start} ms`,
      `[avg: ${timeString((curr - start) / total)}]`
    );
    step = curr;
  }

  const delta = Date.now() - start;
  const total = presets.length * (endSeed - startSeed + 1);
  console.log(
    `Total Time: ${delta} ms [${total} seeds, `,
    `avg ${(delta / total).toFixed(2)} ms]`
  );
}

export function validate(dirPath: string) {
  const start = Date.now();
  const num = checkSeeds(dirPath, true);
  const sec = (Date.now() - start) / 1000.0;
  console.log(
    chalk.green(`Validated ${num} seeds in ${sec.toFixed(1)} seconds`)
  );
}

const args = process.argv.slice(2);

if (args.length <= 0) {
  console.log("No arguments");
  process.exit(0);
}

if (args[0] === "verify") {
  if (args.length == 1) {
    verify(1, 100, 20);
  } else if (args.length == 4) {
    verify(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
  } else {
    console.log("Please specify preset name");
  }
} else if (args[0] === "validate") {
  validate(args[1]);
} else if (args[0] === "stats") {
  if (args.length <= 1) {
    console.log("Please specify preset name");
  } else {
    if (args.length > 2) {
      //TODO: Verify numeric input for num seeds
      stats(args[1], parseInt(args[2]));
    } else {
      stats(args[1]);
    }
  }
} else if (args[0] === "encode") {
  if (args.length <= 1) {
    console.log("Please specify one or more ROM file");
  } else {
    args.slice(1).forEach((name) => {
      const rom = new Uint8Array(fs.readFileSync(name));
      console.log(readRomAsString(rom));
    });
  }
} else {
  console.log("Invalid arguments:", args);
}
