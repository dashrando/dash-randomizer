import chalk from "chalk";
import { encodeSeed, getAllPresets } from "core";
import { generateSeed } from "core/data";

type SeedData = {
  seed: number;
  hash: string;
}

export async function verify(numSeeds = 20, batchSize = 2, writeFrequency = 2) {
  const presets = getAllPresets();
  let valid = 0;
  const start = Date.now();
  let step = start;

  const checkSeed = async (seed: number) => {
    const results: Uint8Array[] = [];
    presets.forEach((p) => {
      try {
        const { settings, options } = p;
        const graph = generateSeed(seed, settings, options);
        results.push(encodeSeed({ seed, settings, options }, graph));
      } catch(_) {
        console.log(chalk.red(`Invalid seed #${seed} for ${p.title}`))
      }
    })
    return results;
  }

  const timeString = (val: number) => `${val.toFixed(2)} ms`;
  let freqPos = 0;
  let stepPos = 0;
  let i = 0;
  while (i < numSeeds) {
    const pending: Promise<Uint8Array[]>[] = [];
    for (let j = 1; j <= batchSize; j++) {
      pending.push(checkSeed(i + j))
    }
    i += batchSize;
    const results = await Promise.all(pending);

    const num = results.reduce((p, c) => p + c.length, 0)
    valid += num;

    if (++freqPos < writeFrequency) {
      continue;
    }
    freqPos = 0;

    const curr = Date.now();
    console.log(
      `${i.toString().padStart(2, "0")} -`,
      chalk.cyan.underline('Batch:'), `${num} in ${curr - step} ms`,
      chalk.yellow.underline('Total:'), `${valid} in ${curr - start} ms`,
      `[avg: ${timeString((curr - start) / valid)}]`
    );
    stepPos = i;
    step = curr;
  }
  //const stuff = presets.map(checkPreset);
  //const results = await Promise.all(stuff);
  //valid = results.reduce((p, c) => p + c, 0)
  //presets.forEach((p) => {
    //for (let i = 1; i <= 100; i++) {
      //try {
      //generateSeed(i, p.settings, p.options);
      //valid += 1;
      //} catch(_) {
      //invalid += 1;
      //}
    //}
  //})

const delta = Date.now() - start;
console.log(`Total Time: ${delta} ms [${valid} seeds, `,
  `avg ${(delta / valid).toFixed(2)} ms]`);
}

export function validate() {
  console.log(chalk.magenta('validate'));
}

const args = process.argv.slice(2);

if (args.length <= 0) {
  console.log("No arguments")
  process.exit(0)
}

if (args[0] === "verify") {
  verify();
} else if (args[0] === "validate") {
  validate();
} else {
  console.log("Invalid arguments:", args)
}