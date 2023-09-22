export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: true,
  },

  MainStreet: {
    Door_MainStreet: true,
    "Missiles (Mainstreet)": () => CanMoveInWestMaridia && HasSpeed,
    "Supers (Crab)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    "Missiles (Mama Turtle)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Door_MaridiaMap: () => CanOpenGreenDoors,
    Door_EverestTopRight: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
    OasisBottom: () => CanOpenGreenDoors && HasGravity,
  },

  "Missiles (Mainstreet)": {
    MainStreet: true,
  },

  Door_EverestTopRight: {
    "Supers (Crab)": true,
    "Missiles (Beach)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Door_PreAqueduct: () => CanOpenGreenDoors,
  },

  Door_PreAqueduct: {
    Door_EverestTopRight: () => CanMoveInWestMaridia || HasHiJump,
  },

  "Missiles (Beach)": {
    Door_EverestTopRight: true,
    "Missiles (Watering Hole)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    "Supers (Watering Hole)": () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
  },

  "Missiles (Watering Hole)": {
    "Missiles (Beach)": true,
    "Supers (Watering Hole)": true,
  },

  "Supers (Watering Hole)": {
    "Missiles (Beach)": true,
    "Missiles (Watering Hole)": true,
  },

  Door_MaridiaMap: {
    MainStreet: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
  },

  "Supers (Crab)": {
    MainStreet: () => HasMorph,
    "Missiles (Mama Turtle)": () => HasMorph,
    Door_RedFish: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
  },

  Door_RedFish: {
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
