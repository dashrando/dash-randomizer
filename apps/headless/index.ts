#!/usr/bin/env node

import fs from "fs";
import crypto from "crypto";
import { program } from "commander";
import { BpsPatch, patchRom } from "core";
import got, { HTTPError, RequestError } from "got";
import chalk from "chalk";
import path from "path";

export type SeedAPIResponse = {
  basePatchUrl: string;
  seedPatch: SeedPatchPart[];
  fileName: string;
  preset: string;
};

export type SeedPatchPart = [
  number,
  number,
  {
    [key: number]: number;
  }
];

export type SeedPatchRequestBody = {
  preset: string;
  seedNumber: number;
};

export type HeadlessOptions = {
  baseUrl: string;
};

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
      `${chalk.yellow(
        "You have entered a headered ROM"
      )}. The header will now be removed.`
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
  const contents = fs.readFileSync(vanillaPath);
  return verify(contents);
}

const fetchSeedData = async (input: SeedPatchRequestBody, options) => {
  const url = new URL("/api/seed", options.baseUrl);
  try {
    const res: SeedAPIResponse = await got
      .post(url.href, {
        json: input,
      })
      .json();
    return res;
  } catch (err: HTTPError | unknown) {
    if (err instanceof HTTPError) {
      const error = err as HTTPError;
      const body = JSON.parse(error.response.body as any);
      if (typeof body.error == "object") {
        throw new Error(`${body.error.code}: ${url.href}`);
      } else {
        const msg = body.error || "Error fetching seed data";
        throw new Error(msg);
      }
    } else if (err instanceof RequestError) {
      const error = err as RequestError;
      let msg;
      switch (true) {
        case error.code === "ECONNREFUSED":
          msg = `Could not connect to server: ${options.baseUrl}`;
          break;
        default:
          msg = error.message || "Error fetching seed data";
          break;
      }
      throw new Error(msg);
    } else {
      const error = err as Error;
      const msg = error.message || "Error fetching seed data";
      throw new Error(msg);
    }
  }
};

const fetchBasePatch = async (basePatchUrl: string, baseUrl: string) => {
  const url = new URL(basePatchUrl, baseUrl).href;
  const { body } = await got.get(url, { responseType: "buffer" });
  return body;
};

const createFile = async (vanilla, seedPatch, basePatch, fileName) => {
  const seedData = seedPatch.map((h: any[]) => [
    h[0],
    h[1],
    new Uint8Array(Object.values(h[2])),
  ]);

  const rom = patchRom(
    vanilla,
    new BpsPatch(new Uint8Array(basePatch)),
    seedData
  );
  fs.writeFileSync(fileName, rom);
  const filePath = path.join(process.cwd(), fileName);
  console.log(
    `Generated ${chalk.cyan(fileName)} at ${chalk.magenta(filePath)}`
  );
};

async function main() {
  // Setup CLI with arguments and options
  program
    .name("dash.headless.js")
    .usage(`-r <vanillaRom> -p <preset> [options]`)
    .description("Generate a randomized DASH seed from the command line")
    .requiredOption("-r --vanillaPath <vanillaRom>", "path to vanilla rom")
    .requiredOption("-p --preset <preset>", "preset to use")
    .option("-s --seed <seedNumber>", "number between 1 - 999999", "")
    .option(
      "-b --base-url <url>",
      "base url for rolling the seed",
      "https://dashrando.net/"
    );
  program.parse();

  const options = program.opts();
  const { vanillaPath, preset, baseUrl, seed } = options;

  const seedNumber: number = parseInt(seed, 10);
  if (seed && (isNaN(seedNumber) || seedNumber < 1 || seedNumber > 999999)) {
    throw new Error("seed must be an integer between 1 - 999999");
  }

  // Check and verify `vanillaRom`
  const vanilla = await getVanilla(vanillaPath);

  // Setup options for fetching patch
  const seedData = await fetchSeedData({ preset, seedNumber }, options);
  const basePatch = await fetchBasePatch(seedData.basePatchUrl, baseUrl);
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
