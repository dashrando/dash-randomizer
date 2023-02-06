// prettier-ignore
const Item = Object.freeze({
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
});

// prettier-ignore
const ItemNames = new Map([
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
]);

const itemNameToBytes = (name) => {
   var nameArray = new Uint8Array(64);
   var upperName = " " + name.toUpperCase().padEnd(31, " ");

   for (var i = 0; i < upperName.length; i++) {
      var idx = i * 2;
      if (upperName[i] == " ") {
         nameArray[idx + 1] = 0x0;
         nameArray[idx] = 0x7f;
      } else {
         var charCode = upperName.charCodeAt(i) - 0x41;
         if (upperName[i] == ".") {
            charCode = 0x1a;
         } else if (upperName[i] == ",") {
            charCode = 0x1b;
         }
         nameArray[idx + 1] = 0x04; // color
         nameArray[idx] = charCode;
      }
   }

   return nameArray;
};

const majorItem = (spoilerAddress, type, isProgression = true) => {
   return {
      type: type,
      name: ItemNames.get(type),
      isMajor: true,
      isProgression: isProgression,
      spoilerAddress: spoilerAddress,
   };
};

const minorItem = (spoilerAddress, type, isProgression = false) => {
   return {
      type: type,
      name: ItemNames.get(type),
      isMajor: false,
      isProgression: isProgression,
      spoilerAddress: spoilerAddress,
   };
};
