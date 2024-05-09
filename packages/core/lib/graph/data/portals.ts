import DotNetRandom from "../../dotnet-random";
import { BossMode } from "../params";

export type Portal = {
  name: string;
  area: string;
};

export type PortalMapping = [Portal, Portal];

const samePortal = (a: Portal, b: Portal): boolean => {
  return a.name === b.name && a.area === b.area
}

const samePortals = (unshuffled: PortalMapping[], shuffled: PortalMapping[]) => {
  if (unshuffled.length != shuffled.length) {
    throw new Error(`Mismatch number of portals`);
  }

  for (const [u_left, u_right] of unshuffled) {
    for (const [s_left, s_right] of shuffled) {
      if (samePortal(u_left, s_left)) {
        if (samePortal(u_right, s_right)) {
          continue;
        }
        return false;
      }
      if (samePortal(u_right, s_left)) {
        if (samePortal(u_left, s_right)) {
          continue;
        }
        return false;
      }
    }
  }

  return true;
};

const areaLoopCount = (shuffled: PortalMapping[]) => {
  let numLoops = 0;
  shuffled.forEach((m) => {
    if (m[0].area === m[1].area) {
      numLoops += 1;
    }
  });
  return numLoops;
}

const vanillaCount = (vanilla: PortalMapping[], shuffled: PortalMapping[]) => {
  let count = 0;
  vanilla.forEach((p) => {
    shuffled.forEach((s) => {
      if (samePortal(s[0], p[0]) && samePortal(s[1], p[1])) {
        count += 1;
      } else if (samePortal(s[1], p[0]) && samePortal(s[0], p[1])) {
        count += 1;
      }
    });
  });
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

const getAreaPortals = (): Portal[] => {
  return [
    { name: "Door_RetroPBs", area: "Crateria" },
    { name: "Door_GreenHills", area: "GreenBrinstar" },
    { name: "Door_Moat", area: "Crateria" },
    { name: "Door_Ocean", area: "WreckedShip" },
    { name: "Door_G4", area: "Crateria" },
    { name: "Door_Tourian", area: "Tourian" },
    { name: "Door_Kago", area: "Crateria" },
    { name: "Door_GreenElevator", area: "GreenBrinstar" },
    { name: "Door_Crabs", area: "Crateria" },
    { name: "Door_RedElevator", area: "RedBrinstar" },
    { name: "Door_HighwayExit", area: "WreckedShip" },
    { name: "Door_Highway", area: "EastMaridia" },
    { name: "Door_NoobBridge", area: "GreenBrinstar" },
    { name: "Door_RedTower", area: "RedBrinstar" },
    { name: "Door_MaridiaEscape", area: "RedBrinstar" },
    { name: "Door_RedFish", area: "WestMaridia" },
    { name: "Door_MaridiaTube", area: "RedBrinstar" },
    { name: "Door_MainStreet", area: "WestMaridia" },
    { name: "Door_KraidEntry", area: "RedBrinstar" },
    { name: "Door_ElevatorEntry", area: "UpperNorfair" },
    { name: "Door_AboveKraid", area: "RedBrinstar" },
    { name: "Door_MaridiaMap", area: "WestMaridia" },
    { name: "Door_KraidMouth", area: "UpperNorfair" },
    { name: "Door_KraidsLair", area: "KraidsLair" },
    { name: "Door_CrocEntry", area: "UpperNorfair" },
    { name: "Door_Croc", area: "CrocomiresLair" },
    { name: "Door_SingleChamber", area: "UpperNorfair" },
    { name: "Door_Muskateers", area: "LowerNorfair" },
    { name: "Door_LavaDive", area: "UpperNorfair" },
    { name: "Door_RidleyMouth", area: "LowerNorfair" },
    { name: "Door_PreAqueduct", area: "WestMaridia" },
    { name: "Door_Aqueduct", area: "EastMaridia" },
  ]
}

const generateAreaPortals = (seed: number): PortalMapping[] => {
  const areaPortals = getAreaPortals();
  let areas: PortalMapping[] = [];
  for (let i = 0; i < areaPortals.length; i += 2) {
    areas.push([areaPortals[i], areaPortals[i + 1]])
  }

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

const getBossPortals = (): Portal[] => {
  return [
    { name: "Door_KraidBoss", area: "KraidsLair" },
    { name: "Exit_Kraid", area: "KraidsLair" },
    { name: "Door_PhantoonBoss", area: "WreckedShip" },
    { name: "Exit_Phantoon", area: "WreckedShip" },
    { name: "Door_DraygonBoss", area: "EastMaridia" },
    { name: "Exit_Draygon", area: "EastMaridia" },
    { name: "Door_RidleyBoss", area: "LowerNorfair" },
    { name: "Exit_Ridley", area: "LowerNorfair" },
  ]
}

const generateBossPortals = (mode: number, seed: number): PortalMapping[] => {
  const bossPortals = getBossPortals();
  let bosses: PortalMapping[] = [];
  for (let i = 0; i < bossPortals.length; i += 2) {
    bosses.push([bossPortals[i], bossPortals[i + 1]])
  }

  if (mode == BossMode.Vanilla) {
    return bosses;
  }

  const rng = new DotNetRandom(seed + 1e7);

  // Boss portals are specified in pairs
  const shuffleBosses = () => {
    // Split up the boss doors and exits
    const doorPortals = bosses.map((b) => b[0]);
    const exitPortals = bosses.map((b) => b[1]);

    // Randomly pick a boss for each door
    if (mode == BossMode.Surprise) {
      return doorPortals.map<PortalMapping>((d) => {
        const exit = {...exitPortals[rng.NextInRange(0, 4)]}
        return [d, exit]
      });
    }

    // Shuffle the exit portals and assign them to boss doors
    shuffle(rng, exitPortals);
    return doorPortals.map<PortalMapping>((d, idx) => [d, exitPortals[idx]]);
  };

  //
  let shuffled = shuffleBosses();
  while (samePortals(bosses, shuffled)) {
    shuffled = shuffleBosses();
  }

  if (mode !== BossMode.Shuffled) {
    shuffled.forEach(p => p[1].area = p[0].area)
  }
  
  return shuffled;
};

export const generatePortals = (seed: number, area: boolean, boss: number): PortalMapping[] => {
  if (seed == 0 && (area || boss)) {
    throw new Error("Seed of 0 with areas or bosses randomized");
  }
  const areaSeed = seed > 0 && area ? seed + 2e7 : 0;
  return generateAreaPortals(areaSeed).concat(generateBossPortals(boss, seed));
};

export const mapPortals = (
  areas: [string, string][],
  bosses: [string, string][],
): PortalMapping[] => {
  const areaPortals = getAreaPortals();
  const bossPortals = getBossPortals().slice(0, 8);
  const total = areaPortals.length + bossPortals.length;
  let mappedPortals: PortalMapping[] = [];

  const findPortal = (name: string): Portal => {
    const a = areaPortals.find((p) => p.name == name);
    if (a != undefined) {
      return a;
    }
    const b = bossPortals.find((p) => p.name == name);
    if (b != undefined) {
      return b;
    }
    throw new Error(`Failed to map portals: ${a} & ${b}`);
  };

  if (areas.length > 0) {
    for (const [a, b] of areas) {
      mappedPortals.push([findPortal(a), findPortal(b)]);
    }
  } else {
    mappedPortals = mappedPortals.concat(generateAreaPortals(0))
  }

  if (bosses.length > 0) {
    for (const [a, b] of bosses) {
      mappedPortals.push([findPortal(a), findPortal(b)]);
    }
  } else {
    mappedPortals = mappedPortals.concat(generateBossPortals(BossMode.Vanilla, 0))
  }

  if (2 * mappedPortals.length != total) {
    console.log(mappedPortals)
    throw new Error("Unmapped portals");
  }
  return mappedPortals;
};