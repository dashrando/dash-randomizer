import type { Metadata, NextPage } from 'next'
import { Entry, Navigation, Seperator } from "../readable"
import styles from "../readable.module.css";

export const metadata: Metadata = {
  title: 'Readable Logic - DASH Recall',
  description: 'DASH Recall logic in a human readable format',
}

const RecallLogicPage: NextPage = () => {
   return (
      <>
      <Navigation selected="recall" />
      <Seperator />
      <div className={styles.logic_title}>Recall</div>
      <Seperator />
      <div style={{ border: '1px solid #222', backgroundColor: '#010101', display: 'inline-flex', padding: '8px 16px', borderRadius: '8px', margin: '16px 0', maxWidth: '440px', fontSize: '16px', lineHeight: '24px' }}>
        <p><strong style={{ color: '#fff' }}>Warning:</strong> The following logic does not account for Area Randomization or Boss Shuffle, both of which are in alpha.</p>
      </div>
      <h2>Utilities</h2>
<Entry name="canHellRun">
  TotalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield;
</Entry>

<Entry name="canAccessGreenBrinstar">
  CanDestroyBombWalls <span style={{color: "aqua"}}>OR </span> HasSpeed;
</Entry>

<Entry name="canAccessRedBrinstar">
    HasMorph <span style={{color: "purple"}}>AND </span>
    CanOpenGreenDoors <span style={{color: "purple"}}>AND </span>
    (canAccessGreenBrinstar(load) <span style={{color: "aqua"}}>OR </span> CanUsePowerBombs)
</Entry>

<Entry name="canAccessHeatedNorfair">
  canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span> canHellRun(load);
</Entry>

<Entry name="canAccessLowerNorfair">
    canAccessHeatedNorfair(load) <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    HasVaria <span style={{color: "purple"}}>AND </span>
    (HasHiJump <span style={{color: "aqua"}}>OR </span> HasGravity)
</Entry>

<Entry name="canPassWorstRoom">
    canAccessLowerNorfair(load) <span style={{color: "purple"}}>AND </span>
    (CanFly <span style={{color: "aqua"}}>OR </span> HasHiJump <span style={{color: "aqua"}}>OR </span> HasSpringBall <span style={{color: "aqua"}}>OR </span> HasDoubleJump)
</Entry>

<Entry name="canAccessKraid">
  canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span> CanPassBombPassages
</Entry>

<Entry name="canAccessCrocomire">
    canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
    ((canHellRun(load) <span style={{color: "purple"}}>AND </span> CanPassBombPassages) <span style={{color: "aqua"}}>OR </span>
      (HasSpeed <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 1)))
</Entry>

<Entry name="canDoSuitlessMaridia">
    HasHiJump <span style={{color: "purple"}}>AND </span> HasGrapple <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpringBall)
</Entry>

<Entry name="canAccessBotwoon">
    canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    ((HasGravity <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpeed <span style={{color: "aqua"}}>OR </span> HasSpazer)) <span style={{color: "aqua"}}>OR </span>
      (canDoSuitlessMaridia(load) <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpazer)))
</Entry>

<Entry name="canDefeatDraygon">
  canAccessBotwoon(load) <span style={{color: "purple"}}>AND </span> HasGravity
</Entry>

<Entry name="canAccessWreckedShip">
  CanUsePowerBombs <span style={{color: "purple"}}>AND </span> SuperPacks &#8805; 1;
</Entry>

<Entry name="canAccessWestMaridia">
    canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    (HasGravity <span style={{color: "aqua"}}>OR </span>
      HasPressureValve <span style={{color: "aqua"}}>OR </span>
      (HasHiJump <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpringBall)))
</Entry>

<Entry name="canEnterAndLeaveGauntlet">
    (CanUseBombs <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 2) <span style={{color: "aqua"}}>OR </span>
    HasScrewAttack <span style={{color: "aqua"}}>OR </span>
    (CanUsePowerBombs <span style={{color: "purple"}}>AND </span> PowerPacks &#8805; 2 <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1)
</Entry>
      <h2>Locations</h2>
    <Entry name="Bombs">
      HasMorph <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Energy Tank (Brinstar Ceiling)">
      true
    </Entry>

    <Entry name="Energy Tank (Gauntlet)">
      canEnterAndLeaveGauntlet(load)
    </Entry>

    <Entry name="Energy Tank (Terminator)">
      CanDestroyBombWalls <span style={{color: "aqua"}}>OR </span> HasSpeed
    </Entry>

    <Entry name="Missiles (230)">
      return CanPassBombPassages;
    </Entry>

    <Entry name="Missiles (Alpha)">
      return HasMorph;
    </Entry>

    <Entry name="Missiles (Beta)">
      return HasMorph;
    </Entry>

    <Entry name="Missiles (Billy Mays 1)">
      return CanUsePowerBombs;
    </Entry>

    <Entry name="Missiles (Billy Mays 2)">
      return CanUsePowerBombs;
    </Entry>

    <Entry name="Missiles (Gauntlet Left)">
      return canEnterAndLeaveGauntlet(load) <span style={{color: "purple"}}>AND </span> CanPassBombPassages;
    </Entry>

    <Entry name="Missiles (Gauntlet Right)">
      return canEnterAndLeaveGauntlet(load) <span style={{color: "purple"}}>AND </span> CanPassBombPassages;
    </Entry>

    <Entry name="Missiles (Moat)">
      return canAccessWreckedShip(load);
    </Entry>

    <Entry name="Missiles (Mother Brain)">
      return CanDestroyBombWalls;
    </Entry>

    <Entry name="Morphing Ball">
      return true;
    </Entry>

    <Entry name="Power Bombs (Landing Site)">
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        ((HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> CanFly)
    </Entry>

    <Entry name="Power Bombs (Morph)">
      return CanUsePowerBombs;
    </Entry>

    <Entry name="Supers (Climb)">
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        HasSpeed <span style={{color: "purple"}}>AND </span>
        EnergyTanks &#8805; 1 <span style={{color: "purple"}}>AND </span>
        ((EnergyTanks &#8805; 2 <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 3) <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasSpaceJump)
    </Entry>

    <Entry name="Energy Tank (Crocomire)">
        canAccessCrocomire(load) <span style={{color: "purple"}}>AND </span>
        (TotalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> HasGrapple <span style={{color: "aqua"}}>OR </span> HasSpaceJump)
    </Entry>

    <Entry name="Grapple Beam">
      return canAccessCrocomire(load);
    </Entry>

    <Entry name="Missiles (Cosine)">
      return canAccessCrocomire(load);
    </Entry>

    <Entry name="Missiles (Indiana Jones)">
        canAccessCrocomire(load) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          (CanUsePowerBombs <span style={{color: "purple"}}>AND </span> HasSpeed) <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump)
    </Entry>

    <Entry name="Power Bombs (Crocomire)">
        canAccessCrocomire(load) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          (HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span>
          HasHiJump <span style={{color: "aqua"}}>OR </span>
          HasIce <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump)
    </Entry>

    <Entry name="Energy Tank (Botwoon)">
      return canAccessBotwoon(load);
    </Entry>

    <Entry name="Missiles (Aqueduct)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Missiles (Precious)">
      return canDefeatDraygon(load);
    </Entry>

    <Entry name="Missiles (Sand Pit Left)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Missiles (Sand Pit Right)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Plasma Beam">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span> (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve)
    </Entry>

    <Entry name="Power Bombs (Sand Pit Right)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Reserve Tank (Maridia)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Space Jump">
      return canDefeatDraygon(load);
    </Entry>

    <Entry name="Spring Ball">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span> (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve)
    </Entry>

    <Entry name="Supers (Aqueduct)">
      return canAccessWestMaridia(load) <span style={{color: "purple"}}>AND </span> HasGravity;
    </Entry>

    <Entry name="Charge Beam">
        CanUsePowerBombs <span style={{color: "aqua"}}>OR </span>
        (CanOpenRedDoors <span style={{color: "purple"}}>AND </span> CanPassBombPassages)
    </Entry>

    <Entry name="Energy Tank (Etecoons)">
      return CanUsePowerBombs;
    </Entry>

    <Entry name="Energy Tank (Waterway)">
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (HasSpeed <span style={{color: "aqua"}}>OR </span> HasSpazer)
    </Entry>

    <Entry name="Energy Tank (Wave Gate)">
      CanUsePowerBombs <span style={{color: "purple"}}>AND </span> (HasWave <span style={{color: "aqua"}}>OR </span> SuperPacks &#8805; 1)
    </Entry>

    <Entry name="Missiles (Big Pink)">
        CanUsePowerBombs <span style={{color: "aqua"}}>OR </span>
        (CanOpenRedDoors <span style={{color: "purple"}}>AND </span> (HasSpeed <span style={{color: "aqua"}}>OR </span> CanDestroyBombWalls))
    </Entry>

    <Entry name="Missiles (Brin Reserve 1)">
        canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span> CanOpenRedDoors <span style={{color: "purple"}}>AND </span> HasMorph
    </Entry>

    <Entry name="Missiles (Brin Reserve 2)">
        canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        CanPassBombPassages
    </Entry>

    <Entry name="Missiles (Brin Tube)">
      canAccessRedBrinstar(load) <span style={{color: "aqua"}}>OR </span> CanUsePowerBombs
    </Entry>

    <Entry name="Missiles (Charge)">
      canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Missiles (Early Bridge)">
      canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Power Bombs (Etecoons)">
      CanUsePowerBombs
    </Entry>

    <Entry name="Power Bombs (Mission Impossible)">
      CanUsePowerBombs <span style={{color: "purple"}}>AND </span> SuperPacks &#8805; 1
    </Entry>

    <Entry name="Reserve Tank (Brinstar)">
        canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (HasMorph <span style={{color: "aqua"}}>OR </span> HasSpeed)
    </Entry>

    <Entry name="Supers (Early Bridge)">
        canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (HasMorph <span style={{color: "aqua"}}>OR </span> HasSpeed)
    </Entry>

    <Entry name="Supers (Etecoons)">
      CanUsePowerBombs <span style={{color: "purple"}}>AND </span> CanOpenGreenDoors
    </Entry>

    <Entry name="Supers (Spore Spawn)">
        canAccessGreenBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanOpenGreenDoors <span style={{color: "purple"}}>AND </span>
        CanPassBombPassages
    </Entry>

    <Entry name="Energy Tank (Kraid)">
      return canAccessKraid(load);
    </Entry>

    <Entry name="Missiles (Kraid)">
      return canAccessKraid(load) <span style={{color: "purple"}}>AND </span> CanUsePowerBombs;
    </Entry>

    <Entry name="Varia Suit">
      return canAccessKraid(load);
    </Entry>

    <Entry name="Energy Tank (Firefleas)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Energy Tank (Ridley)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Missiles (GT)">
      return canAccessLowerNorfair(load) <span style={{color: "purple"}}>AND </span> HasSpaceJump;
    </Entry>

    <Entry name="Missiles (Maze)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Missiles (Mickey Mouse)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Missiles (Three Muskateers)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Power Bombs (Maze)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Power Bombs (Shame)">
      return canPassWorstRoom(load);
    </Entry>

    <Entry name="Screw Attack">
        canAccessLowerNorfair(load) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          HasSpringBall <span style={{color: "aqua"}}>OR </span>
          HasSpeed)
    </Entry>

    <Entry name="Supers (GT)">
        canAccessLowerNorfair(load) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          HasSpringBall <span style={{color: "aqua"}}>OR </span>
          HasSpeed)
    </Entry>

    <Entry name="Missiles (Alpha PBs)">
      return canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span> CanUsePowerBombs;
    </Entry>

    <Entry name="Power Bombs (Alpha)">
      return canAccessRedBrinstar(load);
    </Entry>

    <Entry name="Power Bombs (Beta)">
      return canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span> CanUsePowerBombs;
    </Entry>

    <Entry name="Spazer">
      return canAccessRedBrinstar(load);
    </Entry>

    <Entry name="Xray Scope">
        canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasSpaceJump <span style={{color: "aqua"}}>OR </span>
          (HasDoubleJump <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4) <span style={{color: "aqua"}}>OR </span>
          (HasHiJump <span style={{color: "purple"}}>AND </span> HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4) <span style={{color: "aqua"}}>OR </span>
          (HasIce <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4))
    </Entry>

    <Entry name="Energy Tank (HJB)">
      return canAccessRedBrinstar(load);
    </Entry>

    <Entry name="HiJump Boots">
      return canAccessRedBrinstar(load);
    </Entry>

    <Entry name="Ice Beam">
        canAccessKraid(load) <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2 <span style={{color: "aqua"}}>OR </span> HasHeatShield)
    </Entry>

    <Entry name="Missiles (Bubble Mountain)">
        canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
        (canHellRun(load) <span style={{color: "aqua"}}>OR </span> (HasSpeed <span style={{color: "purple"}}>AND </span> CanPassBombPassages))
    </Entry>

    <Entry name="Missiles (Cathedral)">
      return canAccessHeatedNorfair(load);
    </Entry>

    <Entry name="Missiles (Croc Escape)">
        canAccessCrocomire(load) <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          (HasHiJump <span style={{color: "purple"}}>AND </span> HasSpeed))
    </Entry>

    <Entry name="Missiles (Crumble Shaft)">
      return canAccessKraid(load) <span style={{color: "purple"}}>AND </span> CanUsePowerBombs <span style={{color: "purple"}}>AND </span> canHellRun(load);
    </Entry>

    <Entry name="Missiles (HJB)">
      return canAccessRedBrinstar(load);
    </Entry>

    <Entry name="Missiles (Norfair Reserve 1)">
      return canAccessHeatedNorfair(load);
    </Entry>

    <Entry name="Missiles (Norfair Reserve 2)">
      return canAccessHeatedNorfair(load);
    </Entry>

    <Entry name="Missiles (Speed)">
      return canAccessHeatedNorfair(load);
    </Entry>

    <Entry name="Missiles (Wave)">
      canAccessHeatedNorfair(load)
    </Entry>

    <Entry name="Reserve Tank (Norfair)">
      canAccessHeatedNorfair(load)
    </Entry>

    <Entry name="Speed Booster">
      canAccessHeatedNorfair(load)
    </Entry>

    <Entry name="Wave Beam">
      canAccessHeatedNorfair(load)
    </Entry>

    <Entry name="Energy Tank (Mama Turtle)">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span>
          HasPressureValve <span style={{color: "aqua"}}>OR </span>
          (HasHiJump <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpringBall))) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          (HasSpeed <span style={{color: "purple"}}>AND </span> (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve)) <span style={{color: "aqua"}}>OR </span>
          HasSpringBall <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump)
    </Entry>

    <Entry name="Missiles (Beach)">
        canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia(load))
    </Entry>

    <Entry name="Missiles (Mainstreet)">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve) <span style={{color: "purple"}}>AND </span>
        HasSpeed
    </Entry>

    <Entry name="Missiles (Mama Turtle)">
      canAccessWestMaridia(load)
    </Entry>

    <Entry name="Missiles (Watering Hole)">
        canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia(load))
    </Entry>

    <Entry name="Supers (Crab)">
      canAccessWestMaridia(load)
    </Entry>

    <Entry name="Supers (Watering Hole)">
        canAccessRedBrinstar(load) <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia(load))
    </Entry>

    <Entry name="Energy Tank (Wrecked Ship)">
      canAccessWreckedShip(load)
    </Entry>

    <Entry name="Gravity Suit">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Missiles (Attic)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Missiles (Bowling)">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Missiles (Ocean Bottom)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Missiles (Ocean Middle)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Missiles (Sky)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Missiles (Spooky)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Reserve Tank (Wrecked Ship)">
        canAccessWreckedShip(load) <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Supers (WS Left)">
      canAccessWreckedShip(load);
    </Entry>

    <Entry name="Supers (WS Right)">
      canAccessWreckedShip(load);
    </Entry>
      </>
   )
}

export default RecallLogicPage
