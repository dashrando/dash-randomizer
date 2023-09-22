export const wreckedshipEdges = {
  Door_Ocean: {
    "Missiles (Ocean Bottom)": true,
  },

  "Missiles (Ocean Bottom)": {
    Door_Ocean: true,
    ShipHallway: () => CanOpenGreenDoors,
  },

  ShipHallway: {
    "Missiles (Ocean Bottom)": true,
    "Missiles (Spooky)": () => CanPassBombPassages,
    Door_PhantoonBoss: () =>
      CanOpenGreenDoors && (HasSpeed || CanPassBombPassages),
    "Supers (WS Left)": () => HasDefeatedWreckedShipBoss,
    "Supers (WS Right)": () =>
      HasDefeatedWreckedShipBoss && CanPassBombPassages,
    "Missiles (Attic)": () => HasDefeatedWreckedShipBoss,
    SpongeBathLeft: () => HasDefeatedWreckedShipBoss,
  },

  SpongeBathLeft: {
    SpongeBathRight: () =>
      !HasDefeatedWreckedShipBoss ||
      (HasDefeatedWreckedShipBoss &&
        (CanFly || CanUsePowerBombs || HasSpeed || HasHiJump || HasGravity)),
    ShipHallway: true,
  },

  SpongeBathRight: {
    SpongeBathLeft: true,
    ShipRearExit: true,
  },

  "Missiles (Spooky)": {
    ShipHallway: true,
  },

  ShipRearExit: {
    "Energy Tank (Wrecked Ship)": () => HasDefeatedWreckedShipBoss,
    SpongeBathRight: true,
    Door_HighwayExit: () =>
      CanUsePowerBombs &&
      (HasGravity || (HasHiJump && (HasSpaceJump || HasSpringBall))),
  },

  "Energy Tank (Wrecked Ship)": {
    ShipRearExit: true,
  },

  Door_HighwayExit: {
    ShipRearExit: () => (HasGravity || HasHiJump) && HasMorph,
  },

  "Missiles (Attic)": {
    ShipHallway: true,
    "Missiles (Sky)": true,
    "Missiles (Ocean Middle)": () => SuperPacks >= 1 && HasMorph,
    "Gravity Suit": () =>
      HasMorph &&
      (CanPassBombPassages || HasSpringBall) &&
      (HasGrapple || HasSpaceJump || TotalTanks >= 1 || HasVaria),
  },

  "Missiles (Sky)": {
    "Missiles (Attic)": true,
  },

  "Missiles (Ocean Middle)": {
    "Missiles (Attic)": () => HasMorph && SuperPacks >= 1,
    "Missiles (Ocean Bottom)": () => HasMorph,
  },

  "Gravity Suit": {
    "Missiles (Bowling)": () => CanDestroyBombWalls,
    "Missiles (Ocean Bottom)": true,
  },

  "Missiles (Bowling)": {
    "Reserve Tank (Wrecked Ship)": () => CanUsePowerBombs && HasSpeed,
    "Gravity Suit": () => CanPassBombPassages,
  },

  "Reserve Tank (Wrecked Ship)": {
    "Missiles (Bowling)": true,
  },

  Door_PhantoonBoss: {
    ShipHallway: () => CanPassBombPassages,
  },

  "Supers (WS Left)": {
    ShipHallway: true,
  },

  "Supers (WS Right)": {
    ShipHallway: () => CanPassBombPassages,
  },
};
