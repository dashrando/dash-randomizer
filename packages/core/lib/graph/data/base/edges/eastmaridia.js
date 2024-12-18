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
    AboveMaridiaMap: () => HasGravity,
    // Ice clip in logic
    "Spring Ball": () =>
      HasGravity &&
      CanUsePowerBombs &&
      ((HasGrapple && (CanFly || HasHiJump)) || HasIce),
    OasisTop: () => CanUsePowerBombs || CanUseBombs ||
      (HasGravity && HasScrewAttack),
    Aqueduct: false,
  },

  OasisTop: {
    PlasmaSparkRoomTop: () => CanOpenGreenDoors,
    OasisBottom: () => CanUsePowerBombs || CanUseBombs ||
      (HasGravity && HasScrewAttack),
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
    "Supers (Aqueduct)": true,
  },

  "Supers (Aqueduct)": {
    Aqueduct: true,
  },

  Door_EMHighway: {
    MaridiaHighway: true,
  },

  MaridiaHighway: {
    Door_EMHighway: true,
    PlasmaSparkRoomTop: () => HasGravity || HasHiJump || HasSpaceJump,
  },
};
