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

// prettier-ignore
const AreaCounts = new Map([
   [Area.Crateria,     0x2f8039],
   [Area.PinkBrinstar, 0x2f803b],
   [Area.UpperNorfair, 0x2f803d],
   [Area.WreckedShip,  0x2f803f],
   [Area.EastMaridia,  0x2f8041],
   [Area.RedBrinstar,  0x2f8049],
   [Area.Kraid,        0x2f804b],
   [Area.WestMaridia,  0x2f804d],
   [Area.LowerNorfair, 0x2f804f],
   [Area.Crocomire,    0x2f8051],
]);

class Location {
   constructor(address, modifier, area, name) {
      this.address = address;
      this.modifier = modifier;
      this.area = area;
      this.name = name;
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
   loc(0x781cc, 0x00, Area.Crateria, 2, "Power Bombs (Landing Site)"),
   loc(0x781e8, 0x00, Area.Crateria, 3, "Missiles (Ocean Bottom)"),
   loc(0x781ee, 0xa8, Area.WreckedShip, 4, "Missiles (Sky)"),
   loc(0x781f4, 0x00, Area.Crateria, 5, "Missiles (Ocean Middle)"),
   loc(0x78248, 0x00, Area.Crateria, 6, "Missiles (Moat)"),
   loc(0x78264, 0x00, Area.Crateria, 7, "Energy Tank (Gauntlet)"),
   loc(0x783ee, 0x00, Area.Crateria, 8, "Missiles (Mother Brain)"),
   loc(0x78404, 0x54, Area.Crateria, 9, "Bombs"),
   loc(0x78432, 0x00, Area.Crateria, 10, "Energy Tank (Terminator)"),
   loc(0x78464, 0x00, Area.Crateria, 11, "Missiles (Gauntlet Right)"),
   loc(0x7846a, 0x00, Area.Crateria, 12, "Missiles (Gauntlet Left)"),
   loc(0x78478, 0x00, Area.Crateria, 13, "Supers (Climb)"),
   loc(0x78486, 0x00, Area.Crateria, 14, "Missiles (230)"),
   loc(0x784ac, 0x54, Area.GreenBrinstar, 15, "Power Bombs (Etecoons)"),
   loc(0x784e4, 0x54, Area.PinkBrinstar, 16, "Supers (Spore Spawn)"),
   loc(0x78518, 0x00, Area.GreenBrinstar, 17, "Missiles (Early Bridge)"),
   loc(0x7851e, 0x00, Area.GreenBrinstar, 18, "Supers (Early Bridge)"),
   loc(0x7852c, 0x54, Area.GreenBrinstar, 19, "Reserve Tank (Brinstar)"),
   loc(0x78532, 0xa8, Area.GreenBrinstar, 20, "Missiles (Brin Reserve 2)"),
   loc(0x78538, 0x00, Area.GreenBrinstar, 21, "Missiles (Brin Reserve 1)"),
   loc(0x78608, 0x00, Area.PinkBrinstar, 22, "Missiles (Big Pink)"),
   loc(0x7860e, 0x00, Area.PinkBrinstar, 23, "Missiles (Charge)"),
   loc(0x78614, 0x54, Area.PinkBrinstar, 24, "Charge Beam"),
   loc(
      0x7865c,
      0x00,
      Area.PinkBrinstar,
      25,
      "Power Bombs (Mission Impossible)"
   ),
   loc(0x78676, 0x00, Area.GreenBrinstar, 26, "Missiles (Brin Tube)"),
   loc(0x7874c, 0x00, Area.BlueBrinstar, 27, "Power Bombs (Morph)"),
   loc(0x78798, 0x00, Area.BlueBrinstar, 28, "Missiles (Beta)"),
   loc(0x7879e, 0xa8, Area.BlueBrinstar, 29, "Energy Tank (Brinstar Ceiling)"),
   loc(0x787c2, 0x00, Area.GreenBrinstar, 30, "Energy Tank (Etecoons)"),
   loc(0x787d0, 0x00, Area.GreenBrinstar, 31, "Supers (Etecoons)"),
   loc(0x787fa, 0x00, Area.PinkBrinstar, 32, "Energy Tank (Waterway)"),
   loc(0x78802, 0x54, Area.BlueBrinstar, 33, "Missiles (Alpha)"),
   loc(0x78824, 0x00, Area.PinkBrinstar, 34, "Energy Tank (Wave Gate)"),
   loc(0x78836, 0x00, Area.BlueBrinstar, 35, "Missiles (Billy Mays 1)"),
   loc(0x7883c, 0xa8, Area.BlueBrinstar, 36, "Missiles (Billy Mays 2)"),
   loc(0x78876, 0x54, Area.RedBrinstar, 37, "Xray Scope"),
   loc(0x788ca, 0x00, Area.RedBrinstar, 38, "Power Bombs (Beta)"),
   loc(0x7890e, 0x54, Area.RedBrinstar, 39, "Power Bombs (Alpha)"),
   loc(0x78914, 0x00, Area.RedBrinstar, 40, "Missiles (Alpha PBs)"),
   loc(0x7896e, 0x54, Area.RedBrinstar, 41, "Spazer"),
   loc(0x7899c, 0xa8, Area.Kraid, 42, "Energy Tank (Kraid)"),
   loc(0x789ec, 0xa8, Area.Kraid, 43, "Missiles (Kraid)"),
   loc(0x78aca, 0x54, Area.Kraid, 44, "Varia Suit"),
   loc(0x78ae4, 0xa8, Area.UpperNorfair, 45, "Missiles (Cathedral)"),
   loc(0x78b24, 0x54, Area.UpperNorfair, 46, "Ice Beam"),
   loc(0x78b46, 0xa8, Area.UpperNorfair, 47, "Missiles (Crumble Shaft)"),
   loc(0x78ba4, 0x00, Area.Crocomire, 48, "Energy Tank (Crocomire)"),
   loc(0x78bac, 0x54, Area.UpperNorfair, 49, "HiJump Boots"),
   loc(0x78bc0, 0x00, Area.UpperNorfair, 50, "Missiles (Croc Escape)"),
   loc(0x78be6, 0x00, Area.UpperNorfair, 51, "Missiles (HJB)"),
   loc(0x78bec, 0x00, Area.UpperNorfair, 52, "Energy Tank (HJB)"),
   loc(0x78c04, 0x00, Area.Crocomire, 53, "Power Bombs (Crocomire)"),
   loc(0x78c14, 0x00, Area.Crocomire, 54, "Missiles (Cosine)"),
   loc(0x78c2a, 0x00, Area.Crocomire, 55, "Missiles (Indiana Jones)"),
   loc(0x78c36, 0x54, Area.Crocomire, 56, "Grapple Beam"),
   loc(0x78c3e, 0x54, Area.UpperNorfair, 57, "Reserve Tank (Norfair)"),
   loc(0x78c44, 0xa8, Area.UpperNorfair, 58, "Missiles (Norfair Reserve 2)"),
   loc(0x78c52, 0x00, Area.UpperNorfair, 59, "Missiles (Norfair Reserve 1)"),
   loc(0x78c66, 0x00, Area.UpperNorfair, 60, "Missiles (Bubble Mountain)"),
   loc(0x78c74, 0xa8, Area.UpperNorfair, 61, "Missiles (Speed)"),
   loc(0x78c82, 0x54, Area.UpperNorfair, 62, "Speed Booster"),
   loc(0x78cbc, 0x00, Area.UpperNorfair, 63, "Missiles (Wave)"),
   loc(0x78cca, 0x54, Area.UpperNorfair, 64, "Wave Beam"),
   loc(0x78e6e, 0x00, Area.LowerNorfair, 65, "Missiles (GT)"),
   loc(0x78e74, 0xa8, Area.LowerNorfair, 66, "Supers (GT)"),
   loc(0x78f30, 0x00, Area.LowerNorfair, 67, "Missiles (Mickey Mouse)"),
   loc(0x78fca, 0x00, Area.LowerNorfair, 68, "Missiles (Maze)"),
   loc(0x78fd2, 0x00, Area.LowerNorfair, 69, "Power Bombs (Maze)"),
   loc(0x790c0, 0x00, Area.LowerNorfair, 70, "Power Bombs (Shame)"),
   loc(0x79100, 0x00, Area.LowerNorfair, 71, "Missiles (Three Muskateers)"),
   loc(0x79108, 0xa8, Area.LowerNorfair, 72, "Energy Tank (Ridley)"),
   loc(0x79110, 0x54, Area.LowerNorfair, 73, "Screw Attack"),
   loc(0x79184, 0x00, Area.LowerNorfair, 74, "Energy Tank (Firefleas)"),
   loc(0x7c265, 0x00, Area.WreckedShip, 75, "Missiles (Spooky)"),
   loc(0x7c2e9, 0x54, Area.WreckedShip, 76, "Reserve Tank (Wrecked Ship)"),
   loc(0x7c2ef, 0x00, Area.WreckedShip, 77, "Missiles (Bowling)"),
   loc(0x7c319, 0x00, Area.WreckedShip, 78, "Missiles (Attic)"),
   loc(0x7c337, 0x00, Area.WreckedShip, 79, "Energy Tank (Wrecked Ship)"),
   loc(0x7c357, 0x00, Area.WreckedShip, 80, "Supers (WS Left)"),
   loc(0x7c365, 0x00, Area.WreckedShip, 81, "Supers (WS Right)"),
   loc(0x7c36d, 0x54, Area.WreckedShip, 82, "Gravity Suit"),
   loc(0x7c437, 0x00, Area.WestMaridia, 83, "Missiles (Mainstreet)"),
   loc(0x7c43d, 0x00, Area.WestMaridia, 84, "Supers (Crab)"),
   loc(0x7c47d, 0x00, Area.WestMaridia, 85, "Energy Tank (Mama Turtle)"),
   loc(0x7c483, 0xa8, Area.WestMaridia, 86, "Missiles (Mama Turtle)"),
   loc(0x7c4af, 0x00, Area.WestMaridia, 87, "Supers (Watering Hole)"),
   loc(0x7c4b5, 0x00, Area.WestMaridia, 88, "Missiles (Watering Hole)"),
   loc(0x7c533, 0x00, Area.WestMaridia, 89, "Missiles (Beach)"),
   loc(0x7c559, 0x54, Area.EastMaridia, 90, "Plasma Beam"),
   loc(0x7c5dd, 0x00, Area.EastMaridia, 91, "Missiles (Sand Pit Left)"),
   loc(0x7c5e3, 0x54, Area.EastMaridia, 92, "Reserve Tank (Maridia)"),
   loc(0x7c5eb, 0x00, Area.EastMaridia, 93, "Missiles (Sand Pit Right)"),
   loc(0x7c5f1, 0x00, Area.EastMaridia, 94, "Power Bombs (Sand Pit Right)"),
   loc(0x7c603, 0x00, Area.EastMaridia, 95, "Missiles (Aqueduct)"),
   loc(0x7c609, 0x00, Area.EastMaridia, 96, "Supers (Aqueduct)"),
   loc(0x7c6e5, 0x54, Area.EastMaridia, 97, "Spring Ball"),
   loc(0x7c74d, 0xa8, Area.EastMaridia, 98, "Missiles (Precious)"),
   loc(0x7c755, 0x00, Area.EastMaridia, 99, "Energy Tank (Botwoon)"),
   loc(0x7c7a7, 0x54, Area.EastMaridia, 100, "Space Jump"),
];
