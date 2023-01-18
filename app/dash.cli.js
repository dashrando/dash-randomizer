const vm = require("node:vm");
const https = require("node:https");
const fs = require("node:fs");
const crypto = require("node:crypto");

//-----------------------------------------------------------------
// CLI usage information.
//-----------------------------------------------------------------

const printUsage = () => {
   console.log("node dash.cli.js -r <vanillaRom> -p <preset>");
};

//-----------------------------------------------------------------
// Process command line arguments.
//-----------------------------------------------------------------

if (process.argv.length != 6) {
   printUsage();
   return 1;
}

let vanillaPath = "";
let preset = "";

for (let i = 2; i < process.argv.length; i++) {
   if (process.argv[i] == "-r") {
      vanillaPath = process.argv[++i];
   } else if (process.argv[i] == "-p") {
      preset = process.argv[++i];
   } else {
      console.log("INVALID OPTION: ", process.argv[i]);
      printUsage();
      return 1;
   }
}

//-----------------------------------------------------------------
// Make sure the vanilla ROM path is correct.
//-----------------------------------------------------------------

if (!fs.existsSync(vanillaPath)) {
   console.log("COULD NOT FIND ROM:", vanillaPath);
   return 1;
}

//-----------------------------------------------------------------
// Read the vanilla ROM and establish the base URL.
//-----------------------------------------------------------------

const baseUrl = "https://dashrando.github.io/";
const vanillaRom = fs.readFileSync(vanillaPath);
const vanillaHash =
   "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72";

//-----------------------------------------------------------------
// Verify the vanilla ROM checksum.
//-----------------------------------------------------------------

let hash = crypto.createHash("sha256");
hash.update(vanillaRom);
if (hash.digest("hex") != vanillaHash) {
   console.log("INVALID VANILLA ROM:", vanillaPath);
   return 1;
}

//-----------------------------------------------------------------
// Utility routines for loading remote scripts and patches.
//-----------------------------------------------------------------

const processScript = (data) => {
   const script = new vm.Script(data);
   script.runInThisContext();
};

async function loadScript(url) {
   return new Promise((resolve) => {
      let data = "";

      https.get(baseUrl + url, (res) => {
         res.on("data", (chunk) => {
            data += chunk;
         });

         res.on("end", () => {
            resolve(processScript(data));
         });
      });
   });
}

async function loadBuffer(url, process) {
   return new Promise((resolve) => {
      https.get(url, (res) => {
         const chunks = [];
         res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
         res.on("end", () => {
            resolve(process(Buffer.concat(chunks)));
         });
      });
   });
}

//-----------------------------------------------------------------
// Generate a seed from the specified preset.
//-----------------------------------------------------------------

(async () => {
   await loadScript("app/dash.min.js");

   const [basePatchUrl, seedPatch, fileName] = generateFromPreset(preset);

   if (basePatchUrl.length == 0 || seedPatch == null || fileName.length == 0) {
      return 1;
   }

   await loadBuffer(baseUrl + basePatchUrl, (data) => {
      const rom = patchRom(vanillaRom, new BpsPatch(data), seedPatch);
      fs.writeFileSync(fileName, rom);
      console.log("Generated: " + fileName);
   });
})();
