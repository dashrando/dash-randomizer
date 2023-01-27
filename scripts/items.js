class Item {
   constructor(code, id, name, isMajor, isProgression) {
      this.code = code;
      this.name = name;
      this.id = id;
      this.isMajor = isMajor;
      this.isProgression = isProgression;
   }

   GetNameArray() {
      var nameArray = new Uint8Array(64);
      var upperName = " " + this.name.toUpperCase().padEnd(31, " ");

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
   }
}

const getItems = () => [
   new Item(0xeed7, 18, "Energy Tank", true, false),
   new Item(0xeedb, 19, "Missile", false, false),
   new Item(0xeedf, 20, "Super Missile", false, false),
   new Item(0xeee3, 21, "Power Bomb", false, false),
   new Item(0xeee7, 2, "Bomb", true, true),
   new Item(0xeeeb, 3, "Charge Beam", true, false),
   new Item(0xeeef, 4, "Ice Beam", true, true),
   new Item(0xeef3, 10, "HiJump Boots", true, true),
   new Item(0xeef7, 12, "Speed Booster", true, true),
   new Item(0xeefb, 5, "Wave Beam", true, true),
   new Item(0xeeff, 6, "Spazer", true, false),
   new Item(0xef03, 14, "Spring Ball", true, true),
   new Item(0xef07, 8, "Varia Suit", true, true),
   new Item(0xef13, 7, "Plasma Beam", true, true),
   new Item(0xef17, 16, "Grappling Beam", true, true),
   new Item(0xef23, 1, "Morph Ball", true, true),
   new Item(0xef27, 17, "Reserve Tank", true, true),
   new Item(0xef0b, 9, "Gravity Suit", true, true),
   new Item(0xef0f, 15, "Xray Scope", true, false),
   new Item(0xef1b, 11, "Space Jump", true, true),
   new Item(0xef1f, 13, "Screw Attack", true, true),
];
