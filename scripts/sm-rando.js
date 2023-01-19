async function ApplySeedData(bytes, seedArray) {
   bytes[0x2fff00] = seedArray[0];
   bytes[0x2fff01] = seedArray[1];
   bytes[0x2fff02] = seedArray[2];
   bytes[0x2fff03] = seedArray[3];

   const sortedItems = getItems().sort((a, b) => {
      return a.id - b.id;
   });

   const locations = getLocations();
   for (var i = 0; i < seedArray.length - 4; i++) {
      var id = seedArray[i + 4] & 0x7f;
      var item = sortedItems.find((item) => item.id == id);
      locations[i].SetItemCode(bytes, item.code);
   }

   var majors = sortedItems.filter((item) => item.id < 17);
   var addr = 0x2f5240;
   for (var i = 0; i < majors.length; i++) {
      var itemName = majors[i].GetNameArray();
      for (var j = 0; j < itemName.length; j++) {
         bytes[addr + j] = itemName[j];
      }
      addr += 0x40;

      var itemCode = majors[i].code;
      var loc = locations.find((loc) => loc.GetItemCode(bytes) == itemCode);
      var locName = loc.GetNameArray();
      for (var j = 0; j < locName.length; j++) {
         bytes[addr + j] = locName[j];
      }
      addr += 0x40;
   }

   bytes[addr] = 0;
   bytes[addr + 1] = 0;
   bytes[addr + 2] = 0;
   bytes[addr + 3] = 0;
}
