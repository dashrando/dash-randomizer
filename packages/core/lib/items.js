// prettier-ignore
export const Item = Object.freeze({
   // Vanilla items
   EnergyTank:    0xeed7,
   Missile:       0xeedb,
   Super:         0xeedf,
   PowerBomb:     0xeee3,
   Bombs:         0xeee7,
   Charge:        0xeeeb,
   Ice:           0xeeef,
   HJB:           0xeef3,
   Speed:         0xeef7,
   Wave:          0xeefb,
   Spazer:        0xeeff,
   SpringBall:    0xef03,
   Varia:         0xef07,
   Plasma:        0xef13,
   Grapple:       0xef17,
   Morph:         0xef23,
   Reserve:       0xef27,
   Gravity:       0xef0b,
   Xray:          0xef0f,
   SpaceJump:     0xef1b,
   ScrewAttack:   0xef1f,
   // Custom DASH items
   DoubleJump:    0xefe0,
   PressureValve: 0xefe8,
   HeatShield:    0xefe4,
   BeamUpgrade:   0xefec,
   // Pseudo items for bosses
   DefeatedKraid: 0xb055,
   DefeatedPhantoon: 0xb056,
   DefeatedDraygon: 0xb057,
   DefeatedRidley: 0xb058,
   DefeatedSporeSpawn: 0xb059,
   DefeatedCrocomire: 0xb05a,
   DefeatedBotwoon: 0xb05b,
   DefeatedGoldTorizo: 0xb05c
});

// prettier-ignore
export const ItemNames = new Map([
   [Item.EnergyTank,    "Energy Tank"],
   [Item.Missile,       "Missile"],
   [Item.Super,         "Super Missile"],
   [Item.PowerBomb,     "Power Bomb"],
   [Item.Bombs,         "Bomb"],
   [Item.Charge,        "Charge Beam"],
   [Item.Ice,           "Ice Beam"],
   [Item.HJB,           "HiJump Boots"],
   [Item.Speed,         "Speed Booster"],
   [Item.Wave,          "Wave Beam"],
   [Item.Spazer,        "Spazer"],
   [Item.SpringBall,    "Spring Ball"],
   [Item.Varia,         "Varia Suit"],
   [Item.Plasma,        "Plasma Beam"],
   [Item.Grapple,       "Grappling Beam"],
   [Item.Morph,         "Morph Ball"],
   [Item.Reserve,       "Reserve Tank"],
   [Item.Gravity,       "Gravity Suit"],
   [Item.Xray,          "Xray Scope"],
   [Item.SpaceJump,     "Space Jump"],
   [Item.ScrewAttack,   "Screw Attack"],
   [Item.DoubleJump,    "Double Jump"],
   [Item.PressureValve, "Pressure Valve"],
   [Item.HeatShield,    "Heat Shield"],
   [Item.BeamUpgrade,   "Beam Upgrade"],
   [Item.DefeatedKraid, "Kraid"],
   [Item.DefeatedPhantoon, "Phantoon"],
   [Item.DefeatedDraygon, "Draygon"],
   [Item.DefeatedRidley, "Ridley"],
   [Item.DefeatedSporeSpawn, "Spore Spawn"],
   [Item.DefeatedCrocomire, "Crocomire"],
   [Item.DefeatedBotwoon, "Botwoon"],
   [Item.DefeatedGoldTorizo, "Gold Torizo"],
]);

export const bossItem = (type) => {
  return newItem(type, false, 0x0);
};

export const majorItem = (spoilerAddress, type) => {
  return newItem(type, true, spoilerAddress);
};

export const minorItem = (spoilerAddress, type) => {
  return newItem(type, false, spoilerAddress);
};

const newItem = (type, isMajor, spoilerAddress) => {
  return {
    type: type,
    name: ItemNames.get(type),
    isMajor: isMajor,
    spoilerAddress: spoilerAddress,
  };
};
