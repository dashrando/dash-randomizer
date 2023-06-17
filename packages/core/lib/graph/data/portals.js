import DotNetRandom from "../../dotnet-random";

const shufflePortals = (seed, unshuffled) => {
  if (seed == 0) {
    return unshuffled;
  }

  const rng = new DotNetRandom(seed);
  const swap = (arr, x, y) => {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
  };

  const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      swap(arr, i, rng.NextInRange(i, arr.length));
    }
  };

  const left = unshuffled.map((b) => b[0]);
  while (left.every((value, index) => value == unshuffled[index][0])) {
    shuffle(left);
  }
  const shuffled = new Array(left.length);
  for (let i = 0; i < left.length; i++) {
    shuffled[i] = [left[i], unshuffled[i][1]];
  }
  return shuffled;
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
  return shufflePortals(seed, areas);
};

const getBossPortals = (seed) => {
  const bosses = [
    ["Door_KraidBoss", "Exit_Kraid"],
    ["Door_PhantoonBoss", "Exit_Phantoon"],
    ["Door_DraygonBoss", "Exit_Draygon"],
    ["Door_RidleyBoss", "Exit_Ridley"],
  ];
  return shufflePortals(seed, bosses);
};

export const mapPortals = (seed, area, boss) => {
  const areaSeed = seed > 0 && area ? seed + 2e9 : 0;
  const bossSeed = seed > 0 && boss ? seed + 1e9 : 0;
  return getAreaPortals(areaSeed).concat(getBossPortals(bossSeed));
};
