import DotNetRandom from "../../dotnet-random";
import { BossMode } from "../params";

const samePortals = (unshuffled, shuffled) => {
  if (unshuffled.length != shuffled.length) {
    throw new Error(`Mismatch number of portals`);
  }

  for (let i = 0; i < unshuffled.length; i++) {
    const pair = unshuffled[i];
    const left = pair[0];
    const right = pair[1];

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

const shuffle = (rng, arr) => {
  const swap = (arr, x, y) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  for (let i = 0; i < arr.length; i++) {
    swap(arr, i, rng.NextInRange(i, arr.length));
  }
};

const getAreaPortals = (seed) => {
  const areas = [
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

  const shuffleAreas = () => {
    const all = [];
    areas.forEach((a) => {
      all.push(a[0]);
      all.push(a[1]);
    });
    //console.log(all);
    shuffle(rng, all);
    //console.log(all);

    const shuffled = [];
    for (let i = 0; i < all.length; i += 2) {
      shuffled.push([all[i], all[i + 1]]);
    }
    return shuffled;
  };

  //
  let shuffled = shuffleAreas();
  while (samePortals(areas, shuffled)) {
    shuffled = shuffleAreas();
  }

  return shuffled;
};

const getBossPortals = (mode, seed) => {
  const bosses = [
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
    return doorPortals.map((d, idx) => [d, exitPortals[idx]]);
  };

  //
  let shuffled = shuffleBosses();
  while (samePortals(bosses, shuffled)) {
    shuffled = shuffleBosses();
  }

  return shuffled;
};

export const mapPortals = (seed, area, boss) => {
  if (seed == 0 && (area || boss)) {
    throw new Error("Seed of 0 with areas or bosses randomized");
  }
  const areaSeed = seed > 0 && area ? seed + 2e7 : 0;
  return getAreaPortals(areaSeed).concat(getBossPortals(boss, seed));
};
