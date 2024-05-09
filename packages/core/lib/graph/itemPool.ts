import DotNetRandom from "../dotnet-random";
import { Item, majorItem, minorItem } from "../items";
import {
  BeamMode,
  MajorDistributionMode,
  MinorDistributionMode,
  Settings,
} from "./params";

export const getItemPool = (seed: number, settings: Settings, count: number) => {
  const { majorDistribution, minorDistribution, extraItems, beamMode } =
    settings;
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Add one of each vanilla item.
  //-----------------------------------------------------------------

  let itemPool = [
    majorItem(0x000000, Item.EnergyTank),
    minorItem(0x000000, Item.Missile),
    minorItem(0x000000, Item.Super),
    minorItem(0x000000, Item.PowerBomb),
    majorItem(0x2f8009, Item.Bombs),
    majorItem(0x2f800b, Item.Ice),
    majorItem(0x2f8017, Item.HJB),
    majorItem(0x2f801b, Item.Speed),
    majorItem(0x2f800d, Item.Wave),
    majorItem(0x2f800f, Item.Spazer),
    majorItem(0x2f801f, Item.SpringBall),
    majorItem(0x2f8013, Item.Varia),
    majorItem(0x2f8011, Item.Plasma),
    majorItem(0x2f8023, Item.Grapple),
    majorItem(0x2f8007, Item.Morph),
    majorItem(0x000000, Item.Reserve),
    majorItem(0x2f8015, Item.Gravity),
    majorItem(0x2f8021, Item.Xray),
    majorItem(0x2f8019, Item.SpaceJump),
    majorItem(0x2f801d, Item.ScrewAttack),
  ];

  //-----------------------------------------------------------------
  // Special processing for chozo.
  //-----------------------------------------------------------------

  let extraItem = majorItem;
  if (majorDistribution == MajorDistributionMode.Chozo) {
    itemPool.forEach(i => i.isMajor = true);
    extraItem = minorItem;
  }

  //-----------------------------------------------------------------
  // Add the correct number of charge upgrades.
  //-----------------------------------------------------------------

  switch (beamMode) {
    case BeamMode.Vanilla:
      itemPool.push(majorItem(0x2f802b, Item.Charge));
      break;
    case BeamMode.Starter:
      itemPool.push(majorItem(0x2f802d, Item.BeamUpgrade));
      break;
    case BeamMode.DashRecall:
      itemPool.push(
        majorItem(0x2f802d, Item.BeamUpgrade),
        extraItem(0x2f802f, Item.BeamUpgrade),
        extraItem(0x2f8031, Item.BeamUpgrade),
        extraItem(0x2f8033, Item.BeamUpgrade)
      );
      break;
    case BeamMode.StarterPlus:
      itemPool.push(
        majorItem(0x2f802d, Item.BeamUpgrade),
        extraItem(0x2f802f, Item.BeamUpgrade)
      );
      break;
  }

  //-----------------------------------------------------------------
  // Add extra majors to the pool.
  //-----------------------------------------------------------------

  extraItems.forEach((i: number) => {
    if (i == Item.DoubleJump) {
      itemPool.push(extraItem(0x2f8029, Item.DoubleJump));
    } else if (i == Item.PressureValve) {
      itemPool.push(extraItem(0x2f8027, Item.PressureValve));
    } else if (i == Item.HeatShield) {
      itemPool.push(extraItem(0x2f8025, Item.HeatShield));
    }
  });

  const setAmountInPool = (type: number, count: number, isMajor: boolean) => {
    const item = itemPool.find((i) => i.type == type && i.isMajor == isMajor);
    if (item == undefined) {
      throw new Error("setAmountInPool: failed to find item")
    }
    while (itemPool.filter((i) => i == item).length < count) {
      itemPool.unshift(item);
    }
  };

  if (majorDistribution == MajorDistributionMode.Full) {
    setAmountInPool(Item.Reserve, 4, true);
    setAmountInPool(Item.EnergyTank, 14, true);
  } else if (majorDistribution == MajorDistributionMode.Chozo) {
    let majorMissiles = 2;
    let majorSupers = 2;
    if (count < 100) {
      const r = itemPool.findIndex(i => i.isMajor && i.type == Item.Reserve);
      itemPool[r].isMajor = false;
      if (count < 99) {
        majorMissiles = 1;
        if (count < 98) {
          majorSupers = 1;
        }
      }
    }

    setAmountInPool(Item.EnergyTank, 3, true);
    setAmountInPool(Item.Missile, majorMissiles, true);
    setAmountInPool(Item.Super, majorSupers, true);

    itemPool.push(minorItem(0x000000, Item.EnergyTank));
    setAmountInPool(Item.EnergyTank, 11, false);

    itemPool.push(minorItem(0x000000, Item.Reserve));
    setAmountInPool(Item.EnergyTank, 3, false);

    // Add one of each ammo pack as a minor item so that our
    // logic for placing minors works correctly
    itemPool.push(
      minorItem(0x000000, Item.Missile),
      minorItem(0x000000, Item.Super),
      minorItem(0x000000, Item.PowerBomb)
    );
  } else {
    const getNumMajors = () => {
      switch (majorDistribution) {
        case MajorDistributionMode.Standard:
          return 34 - (100 - count);
        case MajorDistributionMode.Recall:
          return 36 - (100 - count);
        default:
          throw new Error("Unknown major distribution");
      }
    };
    const numMajors = getNumMajors();
    const numNonTanks = itemPool.filter((i) => i.isMajor).length - 2;

    const numReserves = Math.max(2, Math.min(4, numMajors - numNonTanks - 14));
    setAmountInPool(Item.Reserve, numReserves, true);

    const numEnergyTanks = Math.min(14, numMajors - numNonTanks - numReserves);
    setAmountInPool(Item.EnergyTank, numEnergyTanks, true);

    const numMajorSupers =
      numMajors - numNonTanks - numEnergyTanks - numReserves;
    for (let i = 0; i < numMajorSupers; i++) {
      itemPool.push(majorItem(0x0, Item.Super));
    }
  }

  let numMissiles = 1;
  let numSupers = 1;
  let numPBs = 1;
  let itemCount = itemPool.length;

  const getDistribution = () => {
    switch (minorDistribution) {
      case MinorDistributionMode.Standard:
        return [3, 5, 6];
      case MinorDistributionMode.Dash:
        return [2, 3, 4];
      default:
        throw new Error("Unknown minor distribution");
    }
  };
  const distribution = getDistribution();

  while (itemCount < count) {
    const draw = rnd.Next(distribution[distribution.length - 1]);
    if (draw < distribution[0]) {
      numMissiles += 1;
    } else if (draw < distribution[1]) {
      numSupers += 1;
    } else {
      numPBs += 1;
    }
    itemCount += 1;
  }
  setAmountInPool(Item.Missile, numMissiles, false);
  setAmountInPool(Item.Super, numSupers, false);
  setAmountInPool(Item.PowerBomb, numPBs, false);

  if (itemPool.length != count) {
    const msg = `Not ${count} items`
    throw new Error(msg);
  }

  return itemPool;
};
