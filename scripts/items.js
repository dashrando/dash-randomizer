// prettier-ignore
const Item = {
   // Vanilla items
   Energy:  { code: 0xeed7, name: "Energy Tank" },
   Missile: { code: 0xeedb, name: "Missile" },
   Super:   { code: 0xeedf, name: "Super Missile" },
   Power:   { code: 0xeee3, name: "Power Bomb" },
   Bombs:   { code: 0xeee7, name: "Bomb" },
   Charge:  { code: 0xeeeb, name: "Charge Beam" },
   Ice:     { code: 0xeeef, name: "Ice Beam" },
   HJB:     { code: 0xeef3, name: "HiJump Boots" },
   Speed:   { code: 0xeef7, name: "Speed Booster" },
   Wave:    { code: 0xeefb, name: "Wave Beam" },
   Spazer:  { code: 0xeeff, name: "Spazer" },
   Spring:  { code: 0xef03, name: "Spring Ball" },
   Varia:   { code: 0xef07, name: "Varia Suit" },
   Plasma:  { code: 0xef13, name: "Plasma Beam" },
   Grapple: { code: 0xef17, name: "Grappling Beam" },
   Morph:   { code: 0xef23, name: "Morph Ball" },
   Reserve: { code: 0xef27, name: "Reserve Tank" },
   Gravity: { code: 0xef0b, name: "Gravity Suit" },
   Xray:    { code: 0xef0f, name: "Xray Scope" },
   Space:   { code: 0xef1b, name: "Space Jump" },
   Screw:   { code: 0xef1f, name: "Screw Attack" },
   // Custom DASH items
   Double:  { code: 0xefe0, name: "Double Jump" },
   Valve:   { code: 0xefe8, name: "Pressure Valve" },
   Shield:  { code: 0xefe4, name: "Heat Shield" },
};

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
      code: type.code,
      name: type.name,
      isMajor: true,
      isProgression: isProgression,
      spoilerAddress: spoilerAddress,
   };
};

const minorItem = (spoilerAddress, type, isProgression = false) => {
   return {
      code: type.code,
      name: type.name,
      isMajor: false,
      isProgression: isProgression,
      spoilerAddress: spoilerAddress,
   };
};
