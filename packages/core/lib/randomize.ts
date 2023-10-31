import BpsPatch from "./bps-patch";
import { getBasePatch, getFileName, generateSeedPatch, getItemNodes } from "./sm-rando";
import { generateSeed } from "./graph/fill";
import { patchRom } from "../helpers/patcher";
import { getLocations } from "./locations";

export type Opts = {
  DisableFanfare: number
}

export type Config = {
  onUpdate?: any
  onSuccess?: any
  vanillaBytes: Uint8Array
}

export type Settings = {
  mapLayout: number,
  majorDistribution: number,
  minorDistribution: number,
  extraItems: number[],
  beamMode: number
  bossMode: number
  gravityHeatReduction: number
  preset: string
  randomizeAreas: boolean
  suitMode: number
}

const ITEM_TYPES: { [id:string] : number }  = {
  "Missile": 0,
  "Super Missile": 1,
  "Power Bomb": 2,
  "Morph Ball": 3,
  "Wave Beam": 4,
  "Plasma Beam": 5,
  "Ice Beam": 6,
  "Charge Beam": 7,
  "Energy Tank": 8,
  "Reserve Tank": 9,
  "Varia Suit": 10,
  "Gravity Suit": 11,
  "Grappling Beam": 12,
  "Space Jump": 13,
  "Screw Attack": 14,
  "Spring Ball": 15,
  "Bomb": 16,
  "Spazer": 17,
  "Xray Scope": 18,
  "HiJump Boots": 19,
  "Speed Booster": 20
}

async function RandomizeRom(
  seed: number = 0,
  settings: Settings,
  opts: Opts = {
    DisableFanfare: 0
  },
  config: Config
) {
  if (!config.vanillaBytes) {
    throw Error("No vanilla ROM data found");
  }

  // Place the items.
  const graph = generateSeed(seed, settings);
  const nodes = getItemNodes(graph)

  let encoded = ''
  getLocations().forEach(l => {
    const node = nodes.find(n => n.location.name == l.name);
    if (node == undefined) {
      return;
    }
    encoded += String.fromCharCode(65 + ITEM_TYPES[node.item.name])
  })

  // Load the base patch associated with the map layout.
  const patch = getBasePatch(settings);
  const basePatch: any = await BpsPatch.Load(`/patches/${patch}`);

  // Process options with defaults.
  const defaultOptions = {
    DisableFanfare: 0,
  };
  const options = { ...defaultOptions, ...opts };

  // Generate the seed specific patch (item placement, etc.)
  const seedPatch: any = generateSeedPatch(
    seed, settings, graph, options);

  // Create the rom by patching the vanilla rom.
  return {
    data: patchRom(config.vanillaBytes, basePatch, seedPatch),
    name: getFileName(seed, settings, options),
    locs: encoded
  };
}

export default RandomizeRom;
