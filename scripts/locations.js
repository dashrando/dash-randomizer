const Area = Object.freeze({
   Crateria: 0,
   BlueBrinstar: 1,
   GreenBrinstar: 2,
   PinkBrinstar: 3,
   RedBrinstar: 4,
   Kraid: 5,
   Crocomire: 6,
   WreckedShip: 7,
   EastMaridia: 8,
   WestMaridia: 9,
   UpperNorfair: 10,
   LowerNorfair: 11,
});

class Location {
   constructor(address, modifier, area, name) {
      this.address = address;
      this.modifier = modifier;
      this.area = area;
      this.name = name;
   }

   GetNameArray() {
      var nameArray = new Uint8Array(64);
      var upperName = " " + this.name.toUpperCase().padStart(30, ".") + " ";

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
            nameArray[idx + 1] = 0x18; // color
            nameArray[idx] = charCode;
         }
      }

      return nameArray;
   }

   GetItemBytes(itemCode) {
      const code = itemCode + this.modifier;
      return new Uint8Array([code & 0xff, (code >> 8) & 0xff]);
   }

   GetItemCode(bytes) {
      var code =
         ((bytes[this.address + 1] << 8) & 0xff00) |
         (bytes[this.address] & 0x00ff);
      return code - this.modifier;
   }
}

const loc = (addr, modifier, area, id, name) => {
   return new Location(addr, modifier, area, name);
};

const getLocations = () => [
   loc(0x786de, 0x00, Area.BlueBrinstar, 1, "Morphing Ball"),
   loc(0x781cc, 0x00, Area.Crateria, 2, "Landing Site (PBs)"),
   loc(0x781e8, 0x00, Area.Crateria, 3, "Ocean (Missiles)"),
   loc(0x781ee, 0xa8, Area.WreckedShip, 4, "Sky (Missiles)"),
   loc(0x781f4, 0x00, Area.Crateria, 5, "Outside WS Middle (Missiles)"),
   loc(0x78248, 0x00, Area.Crateria, 6, "Moat (Missiles)"),
   loc(0x78264, 0x00, Area.Crateria, 7, "Energy Tank, Gauntlet"),
   loc(0x783ee, 0x00, Area.Crateria, 8, "Missile (Crateria Bottom)"),
   loc(0x78404, 0x54, Area.Crateria, 9, "Bomb"),
   loc(0x78432, 0x00, Area.Crateria, 10, "Energy Tank, Terminator"),
   loc(0x78464, 0x00, Area.Crateria, 11, "Gauntlet Right (Missiles)"),
   loc(0x7846a, 0x00, Area.Crateria, 12, "Gauntlet Left (Missiles)"),
   loc(0x78478, 0x00, Area.Crateria, 13, "Climb (Supers)"),
   loc(0x78486, 0x00, Area.Crateria, 14, "Missile (Crateria Middle)"),
   loc(0x784ac, 0x54, Area.GreenBrinstar, 15, "Etecoons (PBs)"),
   loc(0x784e4, 0x54, Area.PinkBrinstar, 16, "Spo Spo (Supers)"),
   loc(0x78518, 0x00, Area.GreenBrinstar, 17, "Early Supers Bridge"),
   loc(0x7851e, 0x00, Area.GreenBrinstar, 18, "Early Supers"),
   loc(0x7852c, 0x54, Area.GreenBrinstar, 19, "Reserve Tank, Brinstar"),
   loc(0x78532, 0xa8, Area.GreenBrinstar, 20, "Brinstar Reserve 2 (Missiles)"),
   loc(0x78538, 0x00, Area.GreenBrinstar, 21, "Brinstar Reserve 1 (Missiles)"),
   loc(0x78608, 0x00, Area.PinkBrinstar, 22, "Big Pink (Missiles)"),
   loc(0x7860e, 0x00, Area.PinkBrinstar, 23, "Charge (Missiles)"),
   loc(0x78614, 0x54, Area.PinkBrinstar, 24, "Charge Beam"),
   loc(0x7865c, 0x00, Area.PinkBrinstar, 25, "Mission Impossible (PBs)"),
   loc(0x78676, 0x00, Area.GreenBrinstar, 26, "Tube (Missiles)"),
   loc(0x7874c, 0x00, Area.BlueBrinstar, 27, "Blue PBs"),
   loc(0x78798, 0x00, Area.BlueBrinstar, 28, "Beta Missiles"),
   loc(0x7879e, 0xa8, Area.BlueBrinstar, 29, "Energy Tank, Brinstar Ceiling"),
   loc(0x787c2, 0x00, Area.GreenBrinstar, 30, "Energy Tank, Etecoons"),
   loc(0x787d0, 0x00, Area.GreenBrinstar, 31, "Etecoons (Supers)"),
   loc(0x787fa, 0x00, Area.PinkBrinstar, 32, "Energy Tank, Waterway"),
   loc(0x78802, 0x54, Area.BlueBrinstar, 33, "Alpha Missiles"),
   loc(0x78824, 0x00, Area.PinkBrinstar, 34, "Energy Tank, Brinstar Gate"),
   loc(0x78836, 0x00, Area.BlueBrinstar, 35, "Billy Mays 1"),
   loc(0x7883c, 0xa8, Area.BlueBrinstar, 36, "Billy Mays 2"),
   loc(0x78876, 0x54, Area.RedBrinstar, 37, "Xray Scope"),
   loc(0x788ca, 0x00, Area.RedBrinstar, 38, "Beta PBs"),
   loc(0x7890e, 0x54, Area.RedBrinstar, 39, "Alpha PBs"),
   loc(0x78914, 0x00, Area.RedBrinstar, 40, "Alpha PBs (Missiles)"),
   loc(0x7896e, 0x54, Area.RedBrinstar, 41, "Spazer"),
   loc(0x7899c, 0xa8, Area.Kraid, 42, "Energy Tank, Kraid"),
   loc(0x789ec, 0xa8, Area.Kraid, 43, "Kraid Missiles"),
   loc(0x78aca, 0x54, Area.Kraid, 44, "Varia Suit"),
   loc(0x78ae4, 0xa8, Area.UpperNorfair, 45, "Cathedral Missiles"),
   loc(0x78b24, 0x54, Area.UpperNorfair, 46, "Ice Beam"),
   loc(0x78b46, 0xa8, Area.UpperNorfair, 47, "Southern Missiles"),
   loc(0x78ba4, 0x00, Area.Crocomire, 48, "Energy Tank, Crocomire"),
   loc(0x78bac, 0x54, Area.UpperNorfair, 49, "HiJump Boots"),
   loc(0x78bc0, 0x00, Area.UpperNorfair, 50, "Croc Escape"),
   loc(0x78be6, 0x00, Area.UpperNorfair, 51, "HJB (Missiles)"),
   loc(0x78bec, 0x00, Area.UpperNorfair, 52, "Energy Tank, Hi-Jump Boots"),
   loc(0x78c04, 0x00, Area.Crocomire, 53, "Croc PBs"),
   loc(0x78c14, 0x00, Area.Crocomire, 54, "Cosine Missiles"),
   loc(0x78c2a, 0x00, Area.Crocomire, 55, "Indiana Jones"),
   loc(0x78c36, 0x54, Area.Crocomire, 56, "Grapple Beam"),
   loc(0x78c3e, 0x54, Area.UpperNorfair, 57, "Reserve Tank, Norfair"),
   loc(0x78c44, 0xa8, Area.UpperNorfair, 58, "Norfair Reserve 2 (Missiles)"),
   loc(0x78c52, 0x00, Area.UpperNorfair, 59, "Norfair Reserve 1 (Missiles)"),
   loc(0x78c66, 0x00, Area.UpperNorfair, 60, "Bubble Mountain Missiles"),
   loc(0x78c74, 0xa8, Area.UpperNorfair, 61, "Speed Missiles"),
   loc(0x78c82, 0x54, Area.UpperNorfair, 62, "Speed Booster"),
   loc(0x78cbc, 0x00, Area.UpperNorfair, 63, "Wave Missiles"),
   loc(0x78cca, 0x54, Area.UpperNorfair, 64, "Wave Beam"),
   loc(0x78e6e, 0x00, Area.LowerNorfair, 65, "GT Missiles"),
   loc(0x78e74, 0xa8, Area.LowerNorfair, 66, "GT Supers"),
   loc(0x78f30, 0x00, Area.LowerNorfair, 67, "Mickey Mouse Missiles"),
   loc(0x78fca, 0x00, Area.LowerNorfair, 68, "Maze Missiles"),
   loc(0x78fd2, 0x00, Area.LowerNorfair, 69, "Maze PBs"),
   loc(0x790c0, 0x00, Area.LowerNorfair, 70, "PBs of Shame"),
   loc(0x79100, 0x00, Area.LowerNorfair, 71, "3 Muskateers"),
   loc(0x79108, 0xa8, Area.LowerNorfair, 72, "Energy Tank, Ridley"),
   loc(0x79110, 0x54, Area.LowerNorfair, 73, "Screw Attack"),
   loc(0x79184, 0x00, Area.LowerNorfair, 74, "Energy Tank, Firefleas"),
   loc(0x7c265, 0x00, Area.WreckedShip, 75, "Spooky Missiles"),
   loc(0x7c2e9, 0x54, Area.WreckedShip, 76, "Reserve Tank, Wrecked Ship"),
   loc(0x7c2ef, 0x00, Area.WreckedShip, 77, "WS Reserve Missiles"),
   loc(0x7c319, 0x00, Area.WreckedShip, 78, "WS Attic Missiles"),
   loc(0x7c337, 0x00, Area.WreckedShip, 79, "Energy Tank, Wrecked Ship"),
   loc(0x7c357, 0x00, Area.WreckedShip, 80, "WS Supers Left"),
   loc(0x7c365, 0x00, Area.WreckedShip, 81, "Right Super, Wrecked Ship"),
   loc(0x7c36d, 0x54, Area.WreckedShip, 82, "Gravity Suit"),
   loc(0x7c437, 0x00, Area.WestMaridia, 83, "Mainstreet Missiles"),
   loc(0x7c43d, 0x00, Area.WestMaridia, 84, "Crab Supers"),
   loc(0x7c47d, 0x00, Area.WestMaridia, 85, "Energy Tank, Mama Turtle"),
   loc(0x7c483, 0xa8, Area.WestMaridia, 86, "Mama Turtle Missiles"),
   loc(0x7c4af, 0x00, Area.WestMaridia, 87, "Watering Hole Supers"),
   loc(0x7c4b5, 0x00, Area.WestMaridia, 88, "Watering Hole Missiles"),
   loc(0x7c533, 0x00, Area.WestMaridia, 89, "Beach Missiles"),
   loc(0x7c559, 0x54, Area.EastMaridia, 90, "Plasma Beam"),
   loc(0x7c5dd, 0x00, Area.EastMaridia, 91, "Left Sand Pit (Missiles)"),
   loc(0x7c5e3, 0x54, Area.EastMaridia, 92, "Reserve Tank, Maridia"),
   loc(0x7c5eb, 0x00, Area.EastMaridia, 93, "Right Sand Pit (Missiles)"),
   loc(0x7c5f1, 0x00, Area.EastMaridia, 94, "Right Sand Pit (PBs)"),
   loc(0x7c603, 0x00, Area.EastMaridia, 95, "Aquaduct Missiles"),
   loc(0x7c609, 0x00, Area.EastMaridia, 96, "Aquaduct Supers"),
   loc(0x7c6e5, 0x54, Area.EastMaridia, 97, "Spring Ball"),
   loc(0x7c74d, 0xa8, Area.EastMaridia, 98, "Precious Missiles"),
   loc(0x7c755, 0x00, Area.EastMaridia, 99, "Energy Tank, Botwoon"),
   loc(0x7c7a7, 0x54, Area.EastMaridia, 100, "Space Jump"),
];
