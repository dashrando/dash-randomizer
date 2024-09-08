import chalk from "chalk";
import { encodeSeed, getAllPresets, getPreset } from "core";
import { generateSeed } from "core/data";
import fs from "fs";
import path from "path";
import { getHtml_Majors } from "./lib/majors";
import { getHtml_Areas } from "./lib/areas";

export async function stats(presetName: string, numSeeds = 100) {
  const preset = getPreset(presetName);
  if (preset === undefined) {
    throw new Error(`unknown preset: ${presetName}`)
  }

  const { settings, options } = preset;
  const encodedSeeds: Uint8Array[] = [];
  for (let i = 0; i < numSeeds; i++) {
    const graph = generateSeed(i + 1, settings, options);
    encodedSeeds.push(encodeSeed({ seed: i, settings, options }, graph));
  }

  const dirPath = 'results'
  const fileName = path.resolve(dirPath, `stats_${preset.fileName}.html`);
  const style = fs.readFileSync(path.resolve(dirPath, "style.css"))

  let text = `
  <html>
    <head>
      <title>${presetName} - Stats</title>
      <style>${style}</style>
    </head><body>`;

  text += getHtml_Areas(encodedSeeds)
  text += getHtml_Majors(encodedSeeds)

  text += '</body></html>';
  fs.writeFileSync(fileName, text)

  console.log('Wrote:', fileName)
}

export async function verify(numSeeds = 50, batchSize = 5, writeFrequency = 10) {
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
} else if (args[0] === "stats") {
  if (args.length <= 1) {
    console.log("Please specify preset name")
  } else {
    if (args.length > 2) {
      //TODO: Verify numeric input for num seeds
      stats(args[1], parseInt(args[2]))
    } else {
      stats(args[1])
    }
  }
} else {
  console.log("Invalid arguments:", args)
}