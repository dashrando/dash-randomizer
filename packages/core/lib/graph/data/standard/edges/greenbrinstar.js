export const greenbrinstarEdges = {
  Door_GreenElevator: {
    "Missiles (Early Bridge)": () => CanOpenRedDoors,
    "Energy Tank (Etecoons)": () => CanUsePowerBombs,
    DachoraRoomLeft: true,
  },

  "Missiles (Early Bridge)": {
    Door_GreenElevator: true,
    "Supers (Early Bridge)": () => HasMorph || HasSpeed,
  },

  "Supers (Early Bridge)": {
    "Missiles (Early Bridge)": true,
    "Reserve Tank (Brinstar)": () => CanOpenRedDoors,
  },

  "Reserve Tank (Brinstar)": {
    "Supers (Early Bridge)": true,
    "Missiles (Brin Reserve 1)": () => HasMorph,
  },

  "Missiles (Brin Reserve 1)": {
    "Reserve Tank (Brinstar)": () => HasMorph,
    "Missiles (Brin Reserve 2)": () => CanUseBombs || CanUsePowerBombs,
  },

  "Missiles (Brin Reserve 2)": {
    "Missiles (Brin Reserve 1)": true,
    "Reserve Tank (Brinstar)": () => HasMorph,
  },

  "Energy Tank (Etecoons)": {
    Door_GreenElevator: () => CanUsePowerBombs,
    "Supers (Etecoons)": () => CanOpenGreenDoors,
    "Power Bombs (Etecoons)": () => HasMorph,
  },

  "Supers (Etecoons)": {
    "Energy Tank (Etecoons)": true,
  },

  "Power Bombs (Etecoons)": {
    "Energy Tank (Etecoons)": () => HasMorph,
  },

  DachoraRoomLeft: {
    Door_GreenElevator: true,
    DachoraRoomRight: () => CanDestroyBombWalls || HasSpeed,
  },

  DachoraRoomRight: {
    DachoraRoomLeft: () => CanDestroyBombWalls || HasSpeed,
    "Missiles (Big Pink)": true,
  },

  "Missiles (Big Pink)": {
    DachoraRoomRight: true,
    "Missiles (Charge)": true,
    "Energy Tank (Wave Gate)": () =>
      CanUsePowerBombs && (SuperPacks >= 1 || HasWave),
    "Supers (Spore Spawn)": () => CanOpenRedDoors,
    "Power Bombs (Mission Impossible)": () =>
      CanUsePowerBombs && CanOpenGreenDoors,
  },

  "Power Bombs (Mission Impossible)": {
    "Missiles (Big Pink)": () => CanPassBombPassages,
  },

  "Supers (Spore Spawn)": {
    "Missiles (Big Pink)": () => CanPassBombPassages && CanOpenGreenDoors,
  },

  "Missiles (Charge)": {
    "Missiles (Big Pink)": true,
    "Charge Beam": () => CanPassBombPassages,
    "Missiles (Brin Tube)": () => CanOpenGreenDoors,
  },

  "Charge Beam": {
    "Missiles (Charge)": () => CanPassBombPassages,
    "Energy Tank (Waterway)": () =>
      CanUsePowerBombs && CanOpenRedDoors && HasSpeed,
  },

  "Energy Tank (Waterway)": {
    "Charge Beam": () => CanUsePowerBombs,
  },

  "Missiles (Brin Tube)": {
    "Missiles (Charge)": true,
    Door_NoobBridge: () => CanOpenGreenDoors,
    Door_GreenHills: () => CanUsePowerBombs,
  },

  Door_GreenHills: {
    "Missiles (Brin Tube)": true,
  },

  Door_NoobBridge: {
    "Missiles (Brin Tube)": () => CanOpenRedDoors || HasWave,
  },

  "Energy Tank (Wave Gate)": {
    "Missiles (Big Pink)": true,
  },
};
