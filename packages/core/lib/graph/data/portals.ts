import DotNetRandom from "../../dotnet-random";
import { BossMode } from "../params";

type PortalMapping = [string, string];

const samePortals = (unshuffled: PortalMapping[], shuffled: PortalMapping[]) => {
  if (unshuffled.length != shuffled.length) {
    throw new Error(`Mismatch number of portals`);
  }

  for (let i = 0; i < unshuffled.length; i++) {
    const [ left, right ] = unshuffled[i];

    for (let j = 0; j < shuffled.length; j++) {
      if (shuffled[j][0] == left) {
        if (shuffled[j][1] == right) {
          continue;
        }
        return false;
      } else if (shuffled[j][1] == left) {
        if (shuffled[j][0] == right) {
          continue;
        }
        return false;
      }
    }
  }

  return true;
};

const areaLoopCount = (shuffled: PortalMapping[]) => {
  const zones = [
    ["Door_RetroPBs", "Door_Moat", "Door_G4", "Door_Kago", "Door_Crabs"],
    ["Door_GreenHills", "Door_GreenElevator", "Door_NoobBridge"],
    [
      "Door_RedElevator",
      "Door_RedTower",
      "Door_MaridiaEscape",
      "Door_MaridiaTube",
      "Door_KraidEntry",
      "Door_AboveKraid",
    ],
    [
      "Door_ElevatorEntry",
      "Door_KraidMouth",
      "Door_CrocEntry",
      "Door_SingleChamber",
      "Door_LavaDive",
    ],
    ["Door_Muskateers", "Door_RidleyMouth"],
    ["Door_Ocean", "Door_HighwayExit"],
    [
      "Door_PreAqueduct",
      "Door_RedFish",
      "Door_MainStreet",
      "Door_MaridiaMap",
    ],
    ["Door_Aqueduct", "Door_Highway"],
    //["Door_KraidsLair"],
    //["Door_Croc"],
    //["Door_Tourian"],
  ];

  //console.log("---");
  let numLoops = 0;
  zones.forEach((z) => {
    for (let i = 0; i < z.length - 1; i++) {
      const first = z[i];
      shuffled.forEach((t) => {
        let second = "";
        if (t[0] == first) {
          second = t[1];
        } else if (t[1] == first) {
          second = t[0];
        } else {
          return;
        }
        for (let j = i + 1; j < z.length; j++) {
          //console.log("check", first, "->", z[j]);
          if (second == z[j]) {
            numLoops += 1;
          }
        }
      });
    }
  });
  return numLoops;
};

const vanillaCount = (vanilla: PortalMapping[], shuffled: PortalMapping[]) => {
  let count = 0;
  vanilla.forEach((p) => {
    shuffled.forEach((s) => {
      if (s[0] == p[0] && s[1] == p[1]) {
        count += 1;
      } else if (s[1] == p[0] && s[0] == p[1]) {
        count += 1;
      }
    });
  });
  //if (count > 1) {
  //console.log(count);
  //}
  return count;
};

const shuffle = (rng: DotNetRandom, arr: any[]) => {
  const swap = (arr: any[], x: number, y: number) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  for (let i = 0; i < arr.length; i++) {
    swap(arr, i, rng.NextInRange(i, arr.length));
  }
};

const getAreaPortals = (seed: number): PortalMapping[] => {
  const areas: PortalMapping[] = [
    // Crateria / Blue Brinstar
    ["Door_RetroPBs", "Door_GreenHills"],
    ["Door_Moat", "Door_Ocean"],
    ["Door_G4", "Door_Tourian"],
    ["Door_Kago", "Door_GreenElevator"],
    ["Door_Crabs", "Door_RedElevator"],
    // Wrecked Ship
    ["Door_HighwayExit", "Door_Highway"],
    // Green / Pink Brinstar
    ["Door_NoobBridge", "Door_RedTower"],
    // Red Brinstar
    ["Door_MaridiaEscape", "Door_RedFish"],
    ["Door_MaridiaTube", "Door_MainStreet"],
    ["Door_KraidEntry", "Door_ElevatorEntry"],
    ["Door_AboveKraid", "Door_MaridiaMap"],
    // Upper Norfair
    ["Door_KraidMouth", "Door_KraidsLair"],
    ["Door_CrocEntry", "Door_Croc"],
    ["Door_SingleChamber", "Door_Muskateers"],
    ["Door_LavaDive", "Door_RidleyMouth"],
    // West Maridia
    ["Door_PreAqueduct", "Door_Aqueduct"],
  ];

  if (seed == 0) {
    return areas;
  }

  const rng = new DotNetRandom(seed);

  const maxIntra = rng.NextDouble() < 0.1 ? 1 : 0;
  const maxVanilla = rng.NextDouble() < 0.1 ? 1 : 0;

  const shuffleAreas = () => {
    const all = areas.flat();
    shuffle(rng, all);

    const shuffled: PortalMapping[] = [];
    for (let i = 0; i < all.length; i += 2) {
      shuffled.push([all[i], all[i + 1]]);
    }
    return shuffled;
  };

  //
  let shuffled = shuffleAreas();
  while (
    samePortals(areas, shuffled) ||
    vanillaCount(areas, shuffled) > maxVanilla ||
    areaLoopCount(shuffled) > maxIntra
  ) {
    shuffled = shuffleAreas();
  }

  if (vanillaCount(areas, shuffled) > 1) {
    console.error("Too many vanilla connections!");
  }

  if (areaLoopCount(shuffled) > 1) {
    console.error("Too many area loops!");
  }

  return shuffled;
};

const getBossPortals = (mode: number, seed: number): PortalMapping[] => {
  const bosses: PortalMapping[] = [
    ["Door_KraidBoss", "Exit_Kraid"],
    ["Door_PhantoonBoss", "Exit_Phantoon"],
    ["Door_DraygonBoss", "Exit_Draygon"],
    ["Door_RidleyBoss", "Exit_Ridley"],
  ];

  if (mode == BossMode.Vanilla) {
    return bosses;
  }
  if (mode == BossMode.Randomized) {
    throw new Error("True boss rando not implemented yet");
  }

  const rng = new DotNetRandom(seed + 1e7);

  // Boss portals are specified in pairs
  const shuffleBosses = () => {
    // Split up the boss doors and exits
    const doorPortals = bosses.map((b) => b[0]);
    const exitPortals = bosses.map((b) => b[1]);

    // Shuffle the exit portals and assign them to boss doors
    shuffle(rng, exitPortals);
    return doorPortals.map<PortalMapping>((d, idx) => [d, exitPortals[idx]]);
  };

  //
  let shuffled = shuffleBosses();
  while (samePortals(bosses, shuffled)) {
    shuffled = shuffleBosses();
  }

  return shuffled;
};

export const mapPortals = (seed: number, area: boolean, boss: number): PortalMapping[] => {
  if (seed == 0 && (area || boss)) {
    throw new Error("Seed of 0 with areas or bosses randomized");
  }
  const areaSeed = seed > 0 && area ? seed + 2e7 : 0;
  return getAreaPortals(areaSeed).concat(getBossPortals(boss, seed));
};
