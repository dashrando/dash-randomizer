class Item {
    constructor(code,id,name) {
        this.code = code;
        this.name = name;
        this.id = id;
    }

    GetNameArray() {
        var nameArray = new Uint8Array(64);
        var upperName = ' ' + this.name.toUpperCase().padEnd(31, ' ');

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
                nameArray[idx + 1] = 0x04; // color
                nameArray[idx] = charCode;
            }
        }

        return nameArray;
    }
}
const items = [
    new Item(0xEF23,  1, "Morph Ball"),
    new Item(0xEEE7,  2, "Bomb"),
    new Item(0xEEEB,  3, "Charge Beam"),
    new Item(0xEEEF,  4, "Ice Beam"),
    new Item(0xEEFB,  5, "Wave Beam"),
    new Item(0xEEFF,  6, "Spazer"),
    new Item(0xEF13,  7, "Plasma Beam"),
    new Item(0xEF07,  8, "Varia Suit"),
    new Item(0xEF0B,  9, "Gravity Suit"),
    new Item(0xEEF3, 10, "HiJump Boots"),
    new Item(0xEF1B, 11, "Space Jump"),
    new Item(0xEEF7, 12, "Speed Booster"),
    new Item(0xEF1F, 13, "Screw Attack"),
    new Item(0xEF03, 14, "Spring Ball"),
    new Item(0xEF0F, 15, "Xray Scope"),
    new Item(0xEF17, 16, "Grappling Beam"),
    new Item(0xEF27, 17, "Reserve Tank"),
    new Item(0xEED7, 18, "Energy Tank"),
    new Item(0xEEDB, 19, "Missile"),
    new Item(0xEEDF, 20, "Super Missile"),
    new Item(0xEEE3, 21, "Power Bomb"),
]