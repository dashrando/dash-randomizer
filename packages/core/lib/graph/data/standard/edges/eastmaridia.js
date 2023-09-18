/***
 * I might've been more thorough than I needed to be,
 * since some things are very easy to do but not technically in logic.
 * With that being said, you can traverse between both entrances with just hijump and supers/pbs,
 * which is non-trivial for area rando purposes
 *  - AJ
 ***/

export const eastmaridiaEdges = {
  Door_Aqueduct: {
    Aqueduct: () => CanUsePowerBombs,
  },

  Aqueduct: {
    //TODO: Snail climb is technically in logic
    Door_Aqueduct: () =>
      (HasGravity || HasHiJump) &&
      (CanUseBombs || CanUsePowerBombs || (HasGravity && HasScrewAttack)),
    //TODO: Snail clip is technically in logic
    Missiles_Aqueduct: () => HasGravity,
    Supers_Aqueduct: () => HasGravity,
    //TODO: Snail climb is technically in logic
    BotwoonHallwayLeft: () => HasGravity || HasHiJump,
    LeftSandPitBottom: () => HasGravity,
    RightSandPitBottom: () => HasGravity,
    OasisBottom: () => HasGravity,
  },

  LeftSandPitBottom: {
    Missiles_LeftSandPit: () =>
      HasGravity &&
      HasMorph &&
      (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    ReserveTank_LeftSandPit: () =>
      HasGravity &&
      HasMorph &&
      (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    OasisBottom: () => HasGravity,
  },

  RightSandPitBottom: {
    Missiles_RightSandPit: () => HasGravity,
    PBs_RightSandPit: () => HasGravity && HasMorph,
    OasisBottom: () => HasGravity,
  },

  BotwoonHallwayLeft: {
    BotwoonHallwayRight: () => (HasGravity && HasSpeed) || HasIce,
    Aqueduct: true,
    Door_Aqueduct: () =>
      CanUseBombs || CanUsePowerBombs || (HasGravity && HasScrewAttack),
  },

  Missiles_LeftSandPit: {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  ReserveTank_LeftSandPit: {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  Missiles_RightSandPit: {
    RightSandPitBottom: () => HasGravity,
  },

  PBs_RightSandPit: {
    RightSandPitBottom: () => HasGravity && HasMorph,
  },

  OasisBottom: {
    MainStreet: () => (HasGravity || HasHiJump) && HasMorph,
    "Spring Ball": () =>
      HasGravity &&
      CanUsePowerBombs &&
      ((HasGrapple && (CanFly || HasHiJump)) || HasIce),
    OasisTop: () =>
      CanUsePowerBombs || CanUseBombs || (HasGravity && HasScrewAttack),
    Aqueduct: () => false,
  },

  OasisTop: {
    PlasmaSparkRoomTop: () => CanOpenGreenDoors,
    OasisBottom: () =>
      CanUsePowerBombs || CanUseBombs || (HasGravity && HasScrewAttack),
  },

  PlasmaSparkRoomTop: {
    OasisTop: () => CanOpenGreenDoors,
    PrePlasmaBeam: () => HasDefeatedMaridiaBoss,
    MaridiaHighway: () => HasGravity || HasHiJump || HasSpaceJump,
    PlasmaSparkRoomBottom: true,
  },

  PlasmaSparkRoomBottom: {
    PlasmaSparkRoomTop: () => HasGravity,
    ColosseumTopLeft: () => HasDefeatedMaridiaBoss && HasGravity,
  },

  PrePlasmaBeam: {
    "Plasma Beam": true,
    PlasmaSparkRoomTop: true,
  },

  "Plasma Beam": {
    PrePlasmaBeam: () =>
      (HasScrewAttack ||
        HasPlasma ||
        (HasGravity && HasCharge && TotalTanks >= 3)) &&
      (CanFly || HasHiJump || HasSpeed || HasSpringBall),
  },

  "Spring Ball": {
    OasisBottom: () => HasGravity && HasMorph,
  },

  BotwoonHallwayRight: {
    PostBotwoon: () => CanKillBotwoon,
  },

  PostBotwoon: {
    Aqueduct: true,
    EnergyTank_Botwoon: () => HasMorph && (HasGravity || HasHiJump),
    ColosseumTopLeft: () => HasGravity && HasSpeed,
  },

  EnergyTank_Botwoon: {
    PostBotwoon: true, // if we got here, we can get back
    ColosseumTopLeft: () => HasMorph && HasGravity,
  },

  ColosseumTopLeft: {
    PostBotwoon: () => HasGravity && HasSpeed,
    EnergyTank_Botwoon: () =>
      HasMorph && (HasGravity || HasHiJump || HasSpringBall),
    ColosseumTopRight: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
    PlasmaSparkRoomBottom: () =>
      HasDefeatedMaridiaBoss && (HasGravity || (HasHiJump && HasSpaceJump)),
  },

  ColosseumTopRight: {
    Missiles_Precious: () => CanOpenGreenDoors,
    ColosseumTopLeft: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
  },

  Missiles_Precious: {
    ColosseumTopRight: () => HasGravity || CanDoSuitlessMaridia,
    Door_DraygonBoss: () => CanOpenRedDoors,
  },

  Door_DraygonBoss: {
    Missiles_Precious: () => HasGravity || (HasHiJump && HasSpringBall),
  },

  Missiles_Aqueduct: {
    Aqueduct: true,
    Supers_Aqueduct: true,
  },

  Supers_Aqueduct: {
    Missiles_Aqueduct: true,
    Aqueduct: true,
  },

  Door_Highway: {
    MaridiaHighway: true,
  },

  MaridiaHighway: {
    Door_Highway: true,
    PlasmaSparkRoomTop: () => HasGravity || HasHiJump || HasSpaceJump,
  },
};
