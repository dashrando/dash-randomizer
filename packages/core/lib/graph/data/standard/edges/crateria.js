export const crateriaEdges = {
  Ship: {
    "Power Bombs (Landing Site)": () =>
      (CanFly || HasSpeed) && CanUsePowerBombs,
    PreGauntlet: () => CanDestroyBombWalls,
    PreMoat: () => CanOpenGreenDoors,
    Parlor: true,
  },

  "Power Bombs (Landing Site)": {
    Ship: true,
  },

  PreMoat: {
    Ship: true,
    "Missiles (Moat)": () => CanUsePowerBombs,
    Door_Crabs: () => CanUsePowerBombs,
  },

  Door_Crabs: {
    PreMoat: true,
  },

  "Missiles (Moat)": {
    Door_Crabs: true,
    Door_Moat: true,
  },

  Door_Moat: {
    "Missiles (Moat)": true,
  },

  PreGauntlet: {
    //more specifically, the door from landing site to gauntlet
    Ship: () => CanDestroyBombWalls,
    "Energy Tank (Gauntlet)": () =>
      (CanUseBombs && (TotalTanks >= 2 || HasVaria)) ||
      (HasMorph && PowerBombPacks >= 2 && (TotalTanks >= 1 || HasVaria)) ||
      HasScrewAttack ||
      (TotalTanks >= 3 && HasSpeed),
  },

  "Energy Tank (Gauntlet)": {
    PreGauntlet: () =>
      (CanUseBombs && TotalTanks >= 2) ||
      (HasMorph && PowerBombPacks >= 2 && TotalTanks >= 1) ||
      HasScrewAttack,
    GauntletBackSideLeftDoor: () => CanPassBombPassages,
  },

  GauntletBackSideLeftDoor: {
    "Energy Tank (Gauntlet)": () => CanPassBombPassages,
    "Missiles (Gauntlet Left)": true,
  },

  "Missiles (Gauntlet Left)": {
    "Missiles (Gauntlet Right)": true,
  },

  "Missiles (Gauntlet Right)": {
    "Energy Tank (Terminator)": true,
  },

  "Energy Tank (Terminator)": {
    Parlor: () => CanDestroyBombWalls || HasSpeed,
    Door_G4: () => CanOpenRedDoors,
    Door_Kago: true,
  },

  Door_G4: {
    "Energy Tank (Terminator)": true,
  },

  Door_Kago: {
    "Energy Tank (Terminator)": true,
  },

  Parlor: {
    "Energy Tank (Terminator)": () => CanDestroyBombWalls || HasSpeed,
    Bombs: () => HasMorph && CanOpenRedDoors,
    Climb: true,
    "Missiles (230)": () => CanPassBombPassages,
    Ship: true,
  },

  Bombs: {
    Parlor: () => HasMorph,
  },

  "Missiles (230)": {
    Parlor: () => HasMorph,
  },

  Climb: {
    Parlor: true,
    ClimbSupersBottom: () => CanUsePowerBombs,
    "Missiles (Mother Brain)": () => CanDestroyBombWalls,
    "Morphing Ball": true,
  },

  ClimbSupersBottom: {
    Climb: () => CanPassBombPassages,
    "Supers (Climb)": () => HasSpeed && EnergyTanks >= 1,
  },

  "Supers (Climb)": {
    Climb: () =>
      HasGrapple || HasSpaceJump || (EnergyTanks >= 1 && TotalTanks >= 2),
  },

  "Missiles (Mother Brain)": {
    Climb: () => CanDestroyBombWalls,
  },

  "Morphing Ball": {
    Climb: true,
    "Power Bombs (Morph)": () => CanUsePowerBombs,
    "Construction Zone": true,
  },

  "Construction Zone": {
    "Missiles (Alpha)": () => HasMorph,
    "Missiles (Beta)": () => HasMorph,
    BoulderRoom: () => CanUsePowerBombs,
    "Energy Tank (Brinstar Ceiling)": true,
    "Morphing Ball": true,
  },

  "Power Bombs (Morph)": {
    "Morphing Ball": () => CanUsePowerBombs,
    Door_RetroPBs: () => CanPassBombPassages,
  },

  Door_RetroPBs: {
    "Power Bombs (Morph)": () => CanPassBombPassages,
  },

  "Missiles (Alpha)": {
    "Morphing Ball": () => HasMorph,
  },

  "Energy Tank (Brinstar Ceiling)": {
    "Construction Zone": true,
  },

  "Missiles (Beta)": {
    "Construction Zone": () => HasMorph,
  },

  BoulderRoom: {
    "Missiles (Billy Mays 1)": () => true,
    "Missiles (Billy Mays 2)": () => true,
    "Construction Zone": () =>
      CanUseBombs || CanUsePowerBombs || (HasScrewAttack && HasMorph),
  },

  "Missiles (Billy Mays 1)": {
    BoulderRoom: true,
  },

  "Missiles (Billy Mays 2)": {
    BoulderRoom: true,
  },
};
