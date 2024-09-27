import DotNetRandom from "../dotnet-random";
import { Item, majorItem, minorItem } from "../items";
import {
  BeamMode,
  MajorDistributionMode,
  MinorDistributionMode,
  Settings,
} from "../params";

export const getItemPool = (seed: number, settings: Settings, count: number) => {
  const { majorDistribution, minorDistribution, extraItems, beamMode } =
    settings;
  const rnd = new DotNetRandom(seed);

  //-----------------------------------------------------------------
  // Add one of each vanilla item.
  //-----------------------------------------------------------------

  let itemPool = [
    majorItem(Item.EnergyTank),
    minorItem(Item.Missile),
    minorItem(Item.Super),
    minorItem(Item.PowerBomb),
    majorItem(Item.Bombs),
    majorItem(Item.Ice),
    majorItem(Item.HJB),
    majorItem(Item.Speed),
    majorItem(Item.Wave),
    majorItem(Item.Spazer),
    majorItem(Item.SpringBall),
    majorItem(Item.Varia),
    majorItem(Item.Plasma),
    majorItem(Item.Grapple),
    majorItem(Item.Morph),
    majorItem(Item.Reserve),
    majorItem(Item.Gravity),
    majorItem(Item.Xray),
    majorItem(Item.SpaceJump),
    majorItem(Item.ScrewAttack),
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
      itemPool.push(majorItem(Item.Charge));
      break;
    case BeamMode.Starter:
      itemPool.push(majorItem(Item.BeamUpgrade));
      break;
    case BeamMode.DashRecall:
      itemPool.push(
        majorItem(Item.BeamUpgrade),
        extraItem(Item.BeamUpgrade),
        extraItem(Item.BeamUpgrade),
        extraItem(Item.BeamUpgrade)
      );
      break;
    case BeamMode.StarterPlus:
      itemPool.push(
        majorItem(Item.BeamUpgrade),
        extraItem(Item.BeamUpgrade)
      );
      break;
  }

  //-----------------------------------------------------------------
  // Add extra majors to the pool.
  //-----------------------------------------------------------------

  extraItems.forEach((i: number) => {
    if (i == Item.DoubleJump) {
      itemPool.push(extraItem(Item.DoubleJump));
    } else if (i == Item.PressureValve) {
      itemPool.push(extraItem(Item.PressureValve));
    } else if (i == Item.HeatShield) {
      itemPool.push(extraItem(Item.HeatShield));
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
    let majorEnergyTanks = count > 100 ? 4 : 3;
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

    setAmountInPool(Item.EnergyTank, majorEnergyTanks, true);
    setAmountInPool(Item.Missile, majorMissiles, true);
    setAmountInPool(Item.Super, majorSupers, true);

    itemPool.push(minorItem(Item.EnergyTank));
    setAmountInPool(Item.EnergyTank, 14 - majorEnergyTanks, false);

    itemPool.push(minorItem(Item.Reserve));
    setAmountInPool(Item.EnergyTank, 3, false);

    // Add one of each ammo pack as a minor item so that our
    // logic for placing minors works correctly
    itemPool.push(
      minorItem(Item.Missile),
      minorItem(Item.Super),
      minorItem(Item.PowerBomb)
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
    const maxEnergyTanks = count > 100 ? 15 : 14;    

    const numReserves = Math.max(2, Math.min(4, numMajors - numNonTanks - 14));
    setAmountInPool(Item.Reserve, numReserves, true);

    const numEnergyTanks = Math.min(maxEnergyTanks, numMajors - numNonTanks - numReserves);
    setAmountInPool(Item.EnergyTank, numEnergyTanks, true);
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
