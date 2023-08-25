export const westmaridiaEdges = {
  Door_MainStreet: {
    MainStreet: true,
  },

  MainStreet: {
    Door_MainStreet: true,
    Missiles_MainStreet: () => CanMoveInWestMaridia && HasSpeed,
    Supers_Crab: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Missiles_MamaTurtle: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Door_MaridiaMap: () => CanOpenGreenDoors,
    Door_EverestTopRight: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
    OasisBottom: () => CanOpenGreenDoors && HasGravity,
  },

  Missiles_MainStreet: {
    MainStreet: true,
  },

  Door_EverestTopRight: {
    Supers_Crab: true,
    Missiles_Beach: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Door_PreAqueduct: () => CanOpenGreenDoors,
  },

  Door_PreAqueduct: {
    Door_EverestTopRight: () => CanMoveInWestMaridia || HasHiJump,
  },

  Missiles_Beach: {
    Door_EverestTopRight: true,
    Missiles_WateringHole: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
    Supers_WateringHole: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
  },

  Missiles_WateringHole: {
    Missiles_Beach: true,
    Supers_WateringHole: true,
  },

  Supers_WateringHole: {
    Missiles_Beach: true,
    Missiles_WateringHole: true,
  },

  Door_MaridiaMap: {
    MainStreet: () =>
      CanMoveInWestMaridia || (HasHiJump && (HasIce || HasSpringBall)),
  },

  Supers_Crab: {
    MainStreet: () => HasMorph,
    Missiles_MamaTurtle: () => HasMorph,
    Door_RedFish: () => CanMoveInWestMaridia || CanDoSuitlessMaridia,
  },

  Door_RedFish: {
    Supers_Crab: () => HasMorph,
  },

  Missiles_MamaTurtle: {
    EnergyTank_MamaTurtle: () =>
      CanFly ||
      (CanMoveInWestMaridia && HasSpeed) ||
      (HasMorph && HasSpringBall) ||
      HasGrapple ||
      HasDoubleJump,
    MainStreet: () => CanMoveInWestMaridia || HasHiJump,
  },

  EnergyTank_MamaTurtle: {
    Missiles_MamaTurtle: true,
  },
};
