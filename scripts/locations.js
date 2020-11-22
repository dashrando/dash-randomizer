class Location {
    constructor(address,modifier,id,name) {
        this.address = address;
        this.modifier = modifier;
        this.name = name;
        this.id = id;
    }

    GetNameArray() {
        var nameArray = new Uint8Array(64);
        var upperName = " " + this.name.toUpperCase().padStart(30,'.') + " ";

        for (var i = 0; i < upperName.length; i++) {
            var idx = i * 2;
            if (upperName[i] == ' ') {
                nameArray[idx + 1] = 0x0;
                nameArray[idx] = 0x7f;
            } else {
                var charCode = upperName.charCodeAt(i) - 0x41;
                if (upperName[i] == '.') {
                    charCode = 0x1a;
                } else if (upperName[i] == ',') {
                    charCode = 0x1b;
                }
                nameArray[idx + 1] = 0x18; // color
                nameArray[idx] = charCode;
            }
        }

        return nameArray;
    }

    GetItemCode(bytes) {
        var code = ((bytes[this.address + 1] << 8) & 0xFF00) |
                    (bytes[this.address] & 0x00FF);
        return code - this.modifier;
    }

    SetItemCode(bytes,itemCode) {
        var code = itemCode + this.modifier;
        bytes[this.address + 1] = (code >> 8) & 0xff;
        bytes[this.address] = code & 0xff;
    }
}
const locations = [
    new Location(0x786DE, 0x00,   1, "Morphing Ball"),
    new Location(0x781CC, 0x00,   2, "Landing Site (PBs)"),
    new Location(0x781E8, 0x00,   3, "Ocean (Missiles)"),
    new Location(0x781EE, 0xA8,   4, "Sky (Missiles)"),
    new Location(0x781F4, 0x00,   5, "Outside WS Middle (Missiles)"),
    new Location(0x78248, 0x00,   6, "Moat (Missiles)"),
    new Location(0x78264, 0x00,   7, "Energy Tank, Gauntlet"),
    new Location(0x783EE, 0x00,   8, "Missile (Crateria Bottom)"),
    new Location(0x78404, 0x54,   9, "Bomb"),
    new Location(0x78432, 0x00,  10, "Energy Tank, Terminator"),
    new Location(0x78464, 0x00,  11, "Gauntlet Right (Missiles)"),
    new Location(0x7846A, 0x00,  12, "Gauntlet Left (Missiles)"),
    new Location(0x78478, 0x00,  13, "Climb (Supers)"),
    new Location(0x78486, 0x00,  14, "Missile (Crateria Middle)"),
    new Location(0x784AC, 0x54,  15, "Etecoons (PBs)"),
    new Location(0x784E4, 0x54,  16, "Spo Spo (Supers)"),
    new Location(0x78518, 0x00,  17, "Early Supers Bridge"),
    new Location(0x7851E, 0x00,  18, "Early Supers"),
    new Location(0x7852C, 0x54,  19, "Reserve Tank, Brinstar"),
    new Location(0x78532, 0xA8,  20, "Brinstar Reserve 2 (Missiles)"),
    new Location(0x78538, 0x00,  21, "Brinstar Reserve 1 (Missiles)"),
    new Location(0x78608, 0x00,  22, "Big Pink (Missiles)"),
    new Location(0x7860E, 0x00,  23, "Charge (Missiles)"),
    new Location(0x78614, 0x54,  24, "Charge Beam"),
    new Location(0x7865C, 0x00,  25, "Mission Impossible (PBs)"),
    new Location(0x78676, 0x00,  26, "Tube (Missiles)"),
    new Location(0x7874C, 0x00,  27, "Blue PBs"),
    new Location(0x78798, 0x00,  28, "Beta Missiles"),
    new Location(0x7879E, 0xA8,  29, "Energy Tank, Brinstar Ceiling"),
    new Location(0x787C2, 0x00,  30, "Energy Tank, Etecoons"),
    new Location(0x787D0, 0x00,  31, "Etecoons (Supers)"),
    new Location(0x787FA, 0x00,  32, "Energy Tank, Waterway"),
    new Location(0x78802, 0x54,  33, "Alpha Missiles"),
    new Location(0x78824, 0x00,  34, "Energy Tank, Brinstar Gate"),
    new Location(0x78836, 0x00,  35, "Billy Mays 1"),
    new Location(0x7883C, 0xA8,  36, "Billy Mays 2"),
    new Location(0x78876, 0x54,  37, "Xray Scope"),
    new Location(0x788CA, 0x00,  38, "Beta PBs"),
    new Location(0x7890E, 0x54,  39, "Alpha PBs"),
    new Location(0x78914, 0x00,  40, "Alpha PBs (Missiles)"),
    new Location(0x7896E, 0x54,  41, "Spazer"),
    new Location(0x7899C, 0xA8,  42, "Energy Tank, Kraid"),
    new Location(0x789EC, 0xA8,  43, "Kraid Missiles"),
    new Location(0x78ACA, 0x54,  44, "Varia Suit"),
    new Location(0x78AE4, 0xA8,  45, "Cathedral Missiles"),
    new Location(0x78B24, 0x54,  46, "Ice Beam"),
    new Location(0x78B46, 0xA8,  47, "Southern Missiles"),
    new Location(0x78BA4, 0x00,  48, "Energy Tank, Crocomire"),
    new Location(0x78BAC, 0x54,  49, "HiJump Boots"),
    new Location(0x78BC0, 0x00,  50, "Croc Escape"),
    new Location(0x78BE6, 0x00,  51, "HJB (Missiles)"),
    new Location(0x78BEC, 0x00,  52, "Energy Tank, Hi-Jump Boots"),
    new Location(0x78C04, 0x00,  53, "Croc PBs"),
    new Location(0x78C14, 0x00,  54, "Cosine Missiles"),
    new Location(0x78C2A, 0x00,  55, "Indiana Jones"),
    new Location(0x78C36, 0x54,  56, "Grapple Beam"),
    new Location(0x78C3E, 0x54,  57, "Reserve Tank, Norfair"),
    new Location(0x78C44, 0xA8,  58, "Norfair Reserve 2 (Missiles)"),
    new Location(0x78C52, 0x00,  59, "Norfair Reserve 1 (Missiles)"),
    new Location(0x78C66, 0x00,  60, "Bubble Mountain Missiles"),
    new Location(0x78C74, 0xA8,  61, "Speed Missiles"),
    new Location(0x78C82, 0x54,  62, "Speed Booster"),
    new Location(0x78CBC, 0x00,  63, "Wave Missiles"),
    new Location(0x78CCA, 0x54,  64, "Wave Beam"),
    new Location(0x78E6E, 0x00,  65, "GT Missiles"),
    new Location(0x78E74, 0xA8,  66, "GT Supers"),
    new Location(0x78F30, 0x00,  67, "Mickey Mouse Missiles"),
    new Location(0x78FCA, 0x00,  68, "Maze Missiles"),
    new Location(0x78FD2, 0x00,  69, "Maze PBs"),
    new Location(0x790C0, 0x00,  70, "PBs of Shame"),
    new Location(0x79100, 0x00,  71, "3 Muskateers"),
    new Location(0x79108, 0xA8,  72, "Energy Tank, Ridley"),
    new Location(0x79110, 0x54,  73, "Screw Attack"),
    new Location(0x79184, 0x00,  74, "Energy Tank, Firefleas"),
    new Location(0x7C265, 0x00,  75, "Spooky Missiles"),
    new Location(0x7C2E9, 0x54,  76, "Reserve Tank, Wrecked Ship"),
    new Location(0x7C2EF, 0x00,  77, "WS Reserve Missiles"),
    new Location(0x7C319, 0x00,  78, "WS Attic Missiles"),
    new Location(0x7C337, 0x00,  79, "Energy Tank, Wrecked Ship"),
    new Location(0x7C357, 0x00,  80, "WS Supers Left"),
    new Location(0x7C365, 0x00,  81, "Right Super, Wrecked Ship"),
    new Location(0x7C36D, 0x54,  82, "Gravity Suit"),
    new Location(0x7C437, 0x00,  83, "Mainstreet Missiles"),
    new Location(0x7C43D, 0x00,  84, "Crab Supers"),
    new Location(0x7C47D, 0x00,  85, "Energy Tank, Mama Turtle"),
    new Location(0x7C483, 0xA8,  86, "Mama Turtle Missiles"),
    new Location(0x7C4AF, 0x00,  87, "Watering Hole Supers"),
    new Location(0x7C4B5, 0x00,  88, "Watering Hole Missiles"),
    new Location(0x7C533, 0x00,  89, "Beach Missiles"),
    new Location(0x7C559, 0x54,  90, "Plasma Beam"),
    new Location(0x7C5DD, 0x00,  91, "Left Sand Pit (Missiles)"),
    new Location(0x7C5E3, 0x54,  92, "Reserve Tank, Maridia"),
    new Location(0x7C5EB, 0x00,  93, "Right Sand Pit (Missiles)"),
    new Location(0x7C5F1, 0x00,  94, "Right Sand Pit (PBs)"),
    new Location(0x7C603, 0x00,  95, "Aquaduct Missiles"),
    new Location(0x7C609, 0x00,  96, "Aquaduct Supers"),
    new Location(0x7C6E5, 0x54,  97, "Spring Ball"),
    new Location(0x7C74D, 0xA8,  98, "Precious Missiles"),
    new Location(0x7C755, 0x00,  99, "Energy Tank, Botwoon"),
    new Location(0x7C7A7, 0x54, 100, "Space Jump"),
];
