export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: true,
  },

  MainStreet: {
    Door_MainStreet: true,
    "Missiles (Mainstreet)": () => CanMoveInWestMaridia && HasSpeed,
    "Supers (Crab)": () =>
      HasMorph && (CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall))),
    "Missiles (Mama Turtle)": () => CanOpenRedDoors &&
      (CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall))),
    Door_MaridiaMap: () => HasMorph && CanOpenGreenDoors,
    EverestTopRight: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
    OasisBottom: () => CanOpenGreenDoors && CanMoveInWestMaridia,
    Door_RedFish: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
  },

  "Missiles (Mainstreet)": {
    MainStreet: true,
  },

  EverestTopRight: {
    MainStreet: true,
    "Missiles (Beach)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Door_PreAqueduct: () => CanOpenGreenDoors,
    "Missiles (Mama Turtle)": () =>
      CanOpenRedDoors && (CanMoveInWestMaridia || HasHiJump),
  },

  Door_PreAqueduct: {
    EverestTopRight: () => CanMoveInWestMaridia || HasHiJump,
  },

  "Missiles (Beach)": {
    EverestTopRight: true,
    "Supers (Watering Hole)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
  },

  "Missiles (Watering Hole)": {
    "Missiles (Beach)": true,
  },

  "Supers (Watering Hole)": {
    "Missiles (Watering Hole)": true,
  },

  Door_MaridiaMap: {
    MainStreet: () =>
      HasMorph && CanOpenGreenDoors &&
      (CanMoveInWestMaridia || (HasHiJump && HasIce)),
  },

  "Supers (Crab)": {
    MainStreet: () => HasMorph,
  },

  Door_RedFish: {
    MainStreet: () => HasMorph,
    "Missiles (Mama Turtle)": () =>
      HasMorph && CanOpenRedDoors && (CanMoveInWestMaridia || HasHiJump),
    EverestTopRight: () => HasMorph || (CanMoveInWestMaridia || HasGrapple),
    "Supers (Crab)": () => HasMorph,
  },

  "Missiles (Mama Turtle)": {
    "Energy Tank (Mama Turtle)": () =>
      CanFly ||
      (CanMoveInWestMaridia && HasSpeed) ||
      (HasMorph && HasSpringBall) ||
      HasGrapple ||
      HasDoubleJump,
    MainStreet: () => CanMoveInWestMaridia || HasHiJump,
  },

  "Energy Tank (Mama Turtle)": {
    "Missiles (Mama Turtle)": true,
  },
};
