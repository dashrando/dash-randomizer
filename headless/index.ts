#!/usr/bin/env node

import fs from "fs";
import crypto from "crypto";
import { program } from "commander";
import { patchRom } from "../scripts/helpers/patcher";
import BpsPatch from "../scripts/lib/bps-patch";
import got, { HTTPError } from 'got';
import chalk from 'chalk';
import path from 'path';

export type SeedAPIResponse = {
  basePatchUrl: string;
  seedPatch: SeedPatchPart[];
  fileName: string;
  preset: string;
}

export type SeedPatchPart = [
  number,
  number,
  {
    [key: number]: number;
  }
]

export type SeedPatchRequestBody = {
  preset: string;
}

export type HeadlessOptions = {
  baseUrl: string;
}

const vanillaHash =
    "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72";
  const headeredHash =
    "9a4441809ac9331cdbc6a50fba1a8fbfd08bc490bc8644587ee84a4d6f924fea";

const verify = (rom) => {
  let hash = crypto.createHash("sha256");
  hash.update(rom);
  const signature = hash.digest("hex");
  if (signature === vanillaHash) {
    return rom;
  } else if (signature === headeredHash) {
    console.warn(
      `${chalk.yellow('You have entered a headered ROM')}. The header will now be removed.`
    );
    const unheaderedContent = rom.slice(512);
    return verify(unheaderedContent);
  }
  throw Error("Invalid vanilla ROM");
};

function getVanilla(vanillaPath: string) {
  const fileExists = fs.existsSync(vanillaPath);
  if (!fileExists) {
    throw new Error(`Could not find ROM: ${vanillaPath}`);
  }
  const contents = fs.readFileSync(vanillaPath)
  return verify(contents);
}

const fetchSeedData = async (input: SeedPatchRequestBody, options) => {
  try {
    const url = new URL('/api/seed', options.baseUrl);
    const res: SeedAPIResponse = await got.post(url.href, {
      json: input,
    })
      .json();
    return res;
  } catch (err: HTTPError | unknown) {
    if (err instanceof HTTPError) {
      const error = err as HTTPError;
      const body = JSON.parse(error.response.body as any);
      if (typeof body.error == 'object') {
        throw new Error(JSON.stringify(body.error));
      } else {
        const msg = body.error || 'Error fetching seed data';
        throw new Error(msg);
      }
    } else {
      const error = err as Error;
      const msg = error.message || 'Error fetching seed data';
      throw new Error(msg)
    }
  }
}

const fetchBasePatch = async (basePatchUrl: string, baseUrl: string) => {
  const url = new URL(basePatchUrl, baseUrl).href;
  const { body } = await got.get(url, { responseType: 'buffer' });
  return body
}

const createFile = async (vanilla, seedPatch, basePatch, fileName) => {
  const seedData = seedPatch.map(
    (h: any[]) => (
      (
        [
          h[0],
          h[1],
          new Uint8Array(
            Object.values(h[2])
          )
        ]
      )
    )
  )

  const rom = patchRom(
    vanilla,
    new BpsPatch(new Uint8Array(basePatch)),
    seedData
  );
  fs.writeFileSync(fileName, rom);
  const filePath = path.join(process.cwd(), fileName)
  console.log(`Generated ${chalk.cyan(fileName)} at ${chalk.magenta(filePath)}`);
}

async function main() {
  // Setup CLI with arguments and options
  program
    .argument("<vanillaRom>", "path to vanilla rom")
    .argument("<preset>", "preset to use")
    .option('-b --base-url <url>', 'base url for rolling the seed', 'https://dashrando.net/');
  program.parse();

  const [vanillaPath, preset] = program.args;
  const options = program.opts();

  // Check and verify `vanillaRom`
  const vanilla = await getVanilla(vanillaPath);

  // Setup options for fetching patch
  const seedData = await fetchSeedData({ preset }, options);
  const basePatch = await fetchBasePatch(seedData.basePatchUrl, options.baseUrl);
  await createFile(vanilla, seedData.seedPatch, basePatch, seedData.fileName);
  
  return 0;
}

main()
  .then((code: number) => {
    process.exit(code);
  })
  .catch((e) => {
    console.error(chalk.red(e.message));
    process.exit(1);
  });
