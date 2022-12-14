class Item {
   constructor(code, id, name) {
      this.code = code;
      this.name = name;
      this.id = id;
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
const items = [
   new Item(0xeed7, 18, "Energy Tank"),
   new Item(0xeedb, 19, "Missile"),
   new Item(0xeedf, 20, "Super Missile"),
   new Item(0xeee3, 21, "Power Bomb"),
   new Item(0xeee7, 2, "Bomb"),
   new Item(0xeeeb, 3, "Charge Beam"),
   new Item(0xeeef, 4, "Ice Beam"),
   new Item(0xeef3, 10, "HiJump Boots"),
   new Item(0xeef7, 12, "Speed Booster"),
   new Item(0xeefb, 5, "Wave Beam"),
   new Item(0xeeff, 6, "Spazer"),
   new Item(0xef03, 14, "Spring Ball"),
   new Item(0xef07, 8, "Varia Suit"),
   new Item(0xef13, 7, "Plasma Beam"),
   new Item(0xef17, 16, "Grappling Beam"),
   new Item(0xef23, 1, "Morph Ball"),
   new Item(0xef27, 17, "Reserve Tank"),
   new Item(0xef0b, 9, "Gravity Suit"),
   new Item(0xef0f, 15, "Xray Scope"),
   new Item(0xef1b, 11, "Space Jump"),
   new Item(0xef1f, 13, "Screw Attack"),
];
