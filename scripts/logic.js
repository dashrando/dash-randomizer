//-----------------------------------------------------------------
// Class representing an item location for Major / Minor logic.
//-----------------------------------------------------------------

class Node {
   constructor(location, isMajor, available) {
      this.location = location;
      this.isMajor = isMajor;
      this.sortWeight = 0;
      this.available = available;
      this.item = undefined;
   }
   GetWeight() {
      if (this.location.area == Area.LowerNorfair) {
         return 11;
      } else if (this.location.area == Area.WreckedShip) {
         return 12;
      }
      return 0;
   }
   SetItem(item) {
      this.item = item;
   }
}