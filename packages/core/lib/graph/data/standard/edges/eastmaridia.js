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
    "Missiles (Aqueduct)": () => HasGravity,
    "Supers (Aqueduct)": () => HasGravity,
    //TODO: Snail climb is technically in logic
    BotwoonHallwayLeft: () => HasGravity || HasHiJump,
    LeftSandPitBottom: () => HasGravity,
    RightSandPitBottom: () => HasGravity,
    OasisBottom: () => HasGravity,
  },

  LeftSandPitBottom: {
    "Missiles (Sand Pit Left)": () =>
      HasGravity &&
      HasMorph &&
      (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    "Reserve Tank (Maridia)": () =>
      HasGravity &&
      HasMorph &&
      (CanUseBombs || CanUsePowerBombs || HasSpringBall),
    OasisBottom: () => HasGravity,
  },

  RightSandPitBottom: {
    "Missiles (Sand Pit Right)": () => HasGravity,
    "Power Bombs (Sand Pit Right)": () => HasGravity && HasMorph,
    OasisBottom: () => HasGravity,
  },

  BotwoonHallwayLeft: {
    BotwoonHallwayRight: () => (HasGravity && HasSpeed) || HasIce,
    Aqueduct: true,
    Door_Aqueduct: () =>
      CanUseBombs || CanUsePowerBombs || (HasGravity && HasScrewAttack),
  },

  "Missiles (Sand Pit Left)": {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  "Reserve Tank (Maridia)": {
    LeftSandPitBottom: () => HasGravity && HasMorph,
  },

  "Missiles (Sand Pit Right)": {
    RightSandPitBottom: () => HasGravity,
  },

  "Power Bombs (Sand Pit Right)": {
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
    "Energy Tank (Botwoon)": () => HasMorph && (HasGravity || HasHiJump),
    ColosseumTopLeft: () => HasGravity && HasSpeed,
  },

  "Energy Tank (Botwoon)": {
    PostBotwoon: true, // if we got here, we can get back
    ColosseumTopLeft: () => HasMorph && HasGravity,
  },

  ColosseumTopLeft: {
    PostBotwoon: () => HasGravity && HasSpeed,
    "Energy Tank (Botwoon)": () =>
      HasMorph && (HasGravity || HasHiJump || HasSpringBall),
    ColosseumTopRight: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
    PlasmaSparkRoomBottom: () =>
      HasDefeatedMaridiaBoss && (HasGravity || (HasHiJump && HasSpaceJump)),
  },

  ColosseumTopRight: {
    "Missiles (Precious)": () => CanOpenGreenDoors,
    ColosseumTopLeft: () => HasGravity || HasSpaceJump || CanDoSuitlessMaridia,
  },

  "Missiles (Precious)": {
    ColosseumTopRight: () => HasGravity || CanDoSuitlessMaridia,
    Door_DraygonBoss: () => CanOpenRedDoors,
  },

  Door_DraygonBoss: {
    "Missiles (Precious)": () => HasGravity || (HasHiJump && HasSpringBall),
  },

  "Missiles (Aqueduct)": {
    Aqueduct: true,
    "Supers (Aqueduct)": true,
  },

  "Supers (Aqueduct)": {
    "Missiles (Aqueduct)": true,
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
