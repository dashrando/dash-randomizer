//-----------------------------------------------------------------
// Edge definitions.
//-----------------------------------------------------------------

const UpperNorfair_CathedralEntrance_to_BubbleMountainMain = {
  edges: ["CathedralEntrance", "BubbleMountainMain"],
  requires: () => HellRunTanks >= 3 && CanOpenGreenDoors,
};

//-----------------------------------------------------------------
// Exports.
//-----------------------------------------------------------------

export const ChozoEdgeUpdates = [
  UpperNorfair_CathedralEntrance_to_BubbleMountainMain
];
