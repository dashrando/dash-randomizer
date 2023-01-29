class Item {
   constructor(code, id, name, isMajor, isProgression, spoilerAddress) {
      this.code = code;
      this.name = name;
      this.id = id;
      this.isMajor = isMajor;
      this.isProgression = isProgression;
      this.spoilerAddress = spoilerAddress;
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
