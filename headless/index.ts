#!/usr/bin/env node

import fs from "fs";
import http from "http";
import crypto from "crypto";
import { program } from "commander";
import { patchRom } from "../scripts/helpers/patcher";
import BpsPatch from "../scripts/lib/bps-patch";

async function main() {
  //-----------------------------------------------------------------
  // Setup command line arguments.
  //-----------------------------------------------------------------
  program
    .argument("<vanillaRom>", "path to vanilla rom")
    .argument("<preset>", "preset to use");

  program.parse();

  const [vanillaPath, preset] = program.args;

  //-----------------------------------------------------------------
  // Make sure the vanilla ROM path is correct.
  //-----------------------------------------------------------------

  if (!fs.existsSync(vanillaPath)) {
    throw new Error("Could not find ROM: " + vanillaPath);
  }

  //-----------------------------------------------------------------
  // Read the vanilla ROM and establish the base URL.
  //-----------------------------------------------------------------

  const baseUrl = "https://dashrando.net/";
  const userRom = fs.readFileSync(vanillaPath);
  const vanillaHash =
    "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72";
  const headeredHash =
    "9a4441809ac9331cdbc6a50fba1a8fbfd08bc490bc8644587ee84a4d6f924fea";

  //-----------------------------------------------------------------
  // Verify the vanilla ROM checksum.
  //-----------------------------------------------------------------
  const verifyAndSetRom = (rom) => {
    let hash = crypto.createHash("sha256");
    hash.update(rom);
    const signature = hash.digest("hex");
    if (signature === vanillaHash) {
      return rom;
    } else if (signature === headeredHash) {
      console.warn(
        "You have entered a headered ROM. The header will now be removed."
      );
      const unheaderedContent = rom.slice(512);
      return verifyAndSetRom(unheaderedContent);
    }
    throw Error("Invalid vanilla ROM");
  };

  const vanillaRom = verifyAndSetRom(userRom);

  const postData = JSON.stringify({
    preset: preset,
  });

  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/api/seed",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    let data = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const seedData = JSON.parse(data);
      const { basePatchUrl, seedPatch, fileName } = seedData;

      if (!basePatchUrl || !seedPatch || !fileName) {
        console.log("Failed to generate preset:", preset);
        process.exit(1);
      }

      const patch = seedPatch.map((h: any[]) => {
        return [h[0], h[1], new Uint8Array(Object.values(h[2]))];
      });

      fetch(baseUrl + basePatchUrl)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          const rom = patchRom(
            vanillaRom,
            new BpsPatch(new Uint8Array(buffer)),
            patch
          );
          fs.writeFileSync(fileName, rom);
          console.log("Generated: " + fileName);
        });
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // // Write data to request body
  req.write(postData);
  req.end();
  return 0;
}

main()
  .then((code: number) => {
    if (code != 0) {
      process.exit(code);
    }
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
