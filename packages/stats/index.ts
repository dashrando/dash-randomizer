import chalk from "chalk";
import { encodeSeed, getAllPresets, getItemLocations, getPreset } from "core";
import { generateSeed, getLocations, Area, Item, ItemNames } from "core/data";
import fs from "fs";
import path from "path";

export async function stats(presetName: string, numSeeds = 100) {
  const preset = getPreset(presetName);
  if (preset === undefined) {
    throw new Error(`unknown preset: ${presetName}`)
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

  const { settings, options } = preset;
  //const areaPortals = getAreaPortals();
  //const bossCount = 4;
  const locations = getLocations();
  const itemTypes = Object.values(Item).filter((i) => i > 0xc000);
  const itemCounts = locations.map((l) => {
    return {
      name: l.name,
      area: l.area,
      item: new Map<string, number>(itemTypes.map((i) => {
        return [
          ItemNames.get(i),
          0
        ]
      }))
    };
  });

  for (let i = 0; i < numSeeds; i++) {
    const graph = generateSeed(i + 1, settings, options)
    const itemLocations = getItemLocations(graph, true);
    itemLocations.forEach((val) => {
      if (val.item === undefined) {
        return;
      }
      const rec = itemCounts.find(
        (p) => p.name === val.location.name && p.area === val.location.area
      );
      if (rec === undefined) {
        console.error("a")
        return;
      }
      const sub = rec.item.get(val.item.name)
      if (sub === undefined) {
        console.error("b")
        return;
      }
      rec.item.set(val.item.name, sub + 1)
    })
  }

  const areaNames = Object.keys(Area);
  text += `
    <table class="majors">
      <tr>
        <th class="thin_border location">Location</th>
        <th class="thin_border area">Area</th>`;
  itemTypes.forEach((i) => {
    const name = ItemNames.get(i);
    text += `<th class="thin_border">${name}</th>`
  })
  text += '</tr>'

  itemCounts.forEach((i) => {
    let hasItems = ' zero';
    let hasMajors = ' zero';
    const mapped = itemTypes.map((j) => {
      const itemName = ItemNames.get(j)
      const count = i.item.get(itemName)
      if (count > 0) {
        if (j != Item.Missile && j != Item.Super && j != Item.PowerBomb) {
          hasMajors = '';
        }
        hasItems = '';
      }
      return count
    })

    text += `<tr class="${hasItems} ${hasMajors}">
    <td class="thin_border">${i.name}</td>
    <td class="thin_border">${areaNames[i.area]}</td>
    `
    mapped.forEach((j) => {
      const percent = (100 * j / numSeeds)
      const cellColor = j == 0 ? " gray_cell" : percent > 5 ? " tan_cell" : "";
      text += `<td class="center thin_border ${cellColor}">${percent.toFixed(
        1
      )}%</td>`;
    });
    text += '</tr>'
  })

  text += '</table>';

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