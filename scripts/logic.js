//-----------------------------------------------------------------
// Class representing an item location.
//-----------------------------------------------------------------

class Node {
   constructor(name, location, isMajor, available) {
      this.name = name;
      this.location = location;
      this.isMajor = isMajor;
      this.sortWeight = 0;
      this.available = available;
      this.item = undefined;
   }
   Clone() {
      let copy = new Node(
         this.name,
         this.location,
         this.isMajor,
         this.available
      );
      copy.sortWeight = this.sortWeight;
      copy.item = this.item;
      return copy;
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
