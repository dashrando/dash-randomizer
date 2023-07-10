import DotNetRandom from "../dotnet-random";
import { Item, majorItem, minorItem } from "../items";
import {
  BeamMode,
  MajorDistributionMode,
  MinorDistributionMode,
} from "./params";

export const getItemPool = (
  seed,
  majorDistribution,
  minorDistribution,
  beamMode
) => {
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
  // Add the correct number of charge upgrades.
  //-----------------------------------------------------------------

  switch (beamMode) {
    case BeamMode.Vanilla:
    case BeamMode.DashClassic:
      itemPool.push(majorItem(0x2f802b, Item.Charge));
      break;

    case BeamMode.DashRecall:
      itemPool.push(
        majorItem(0x2f802d, Item.BeamUpgrade),
        majorItem(0x2f802f, Item.BeamUpgrade),
        majorItem(0x2f8031, Item.BeamUpgrade),
        majorItem(0x2f8033, Item.BeamUpgrade)
      );
      break;
    case BeamMode.New:
      itemPool.push(
        majorItem(0x2f802d, Item.BeamUpgrade),
        majorItem(0x2f802f, Item.BeamUpgrade)
      );
      break;
  }

  //-----------------------------------------------------------------
  // Add extra majors to the pool.
  //-----------------------------------------------------------------

  majorDistribution.extraItems.forEach((i) => {
    if (i == Item.DoubleJump) {
      itemPool.push(majorItem(0x2f8029, Item.DoubleJump));
    } else if (i == Item.PressureValve) {
      itemPool.push(majorItem(0x2f8027, Item.PressureValve));
    } else if (i == Item.HeatShield) {
      itemPool.push(majorItem(0x2f8025, Item.HeatShield));
    }
  });

  const setAmountInPool = (type, count) => {
    const item = itemPool.find((i) => i.type == type);
    while (itemPool.filter((i) => i == item).length < count) {
      itemPool.unshift(item);
    }
  };

  if (majorDistribution.mode == MajorDistributionMode.Full) {
    setAmountInPool(Item.Reserve, 2);
    setAmountInPool(Item.EnergyTank, 14);
  } else {
    const numMajors = majorDistribution.mode;
    const numNonTanks = itemPool.filter((i) => i.isMajor).length - 2;

    const numReserves = Math.max(2, Math.min(4, numMajors - numNonTanks - 14));
    setAmountInPool(Item.Reserve, numReserves);

    const numEnergyTanks = Math.min(14, numMajors - numNonTanks - numReserves);
    setAmountInPool(Item.EnergyTank, numEnergyTanks);

    const numMajorSupers =
      numMajors - numNonTanks - numEnergyTanks - numReserves;
    for (let i = 0; i < numMajorSupers; i++) {
      itemPool.push(majorItem(0x0, Item.Super));
    }
    //console.log(
    //`majors: ${numMajors} reserves: ${numReserves} ` +
    //`tanks: ${numEnergyTanks} supers: ${numMajorSupers}`
    //);
  }

  if (minorDistribution.mode == MinorDistributionMode.Dash) {
    const { supers, powerbombs } = minorDistribution;
    const numSupers = supers.min + rnd.Next(supers.max - supers.min + 1);
    const numPBs =
      powerbombs.min + rnd.Next(powerbombs.max - powerbombs.min + 1);
    const numMissiles = 100 - (itemPool.length - 3) - numSupers - numPBs;

    setAmountInPool(Item.Missile, numMissiles);
    setAmountInPool(Item.Super, numSupers);
    setAmountInPool(Item.PowerBomb, numPBs);
  } else if (minorDistribution.mode == MinorDistributionMode.Standard) {
    let numMissiles = 1;
    let numSupers = 1;
    let numPBs = 1;
    let itemCount = itemPool.length;

    const { missiles, supers, powerbombs } = minorDistribution;
    const distribution = [
      missiles,
      missiles + supers,
      missiles + supers + powerbombs,
    ];
    while (itemCount < 100) {
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
    setAmountInPool(Item.Missile, numMissiles);
    setAmountInPool(Item.Super, numSupers);
    setAmountInPool(Item.PowerBomb, numPBs);
  } else {
    throw new Error("Invalid minor distribution");
  }

  if (itemPool.length != 100) {
    throw new Error("Not 100 items");
  }

  return itemPool;
};
