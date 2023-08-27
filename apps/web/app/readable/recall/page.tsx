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
      <h2 style={{fontVariant: 'all-small-caps', fontSize: '2.0em'}}>Utilities</h2>
<Entry name="canHellRun">
  TotalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield
</Entry>

<Entry name="canAccessGreenBrinstar">
  CanDestroyBombWalls <span style={{color: "aqua"}}>OR </span> HasSpeed
</Entry>

<Entry name="canAccessRedBrinstar">
    HasMorph <span style={{color: "purple"}}>AND </span>
    CanOpenGreenDoors <span style={{color: "purple"}}>AND </span>
    (canAccessGreenBrinstar <span style={{color: "aqua"}}>OR </span> CanUsePowerBombs)
</Entry>

<Entry name="canAccessHeatedNorfair">
  canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canHellRun
</Entry>

<Entry name="canAccessLowerNorfair">
    canAccessHeatedNorfair <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    HasVaria <span style={{color: "purple"}}>AND </span>
    (HasHiJump <span style={{color: "aqua"}}>OR </span> HasGravity)
</Entry>

<Entry name="canPassWorstRoom">
    canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
    (CanFly <span style={{color: "aqua"}}>OR </span> HasHiJump <span style={{color: "aqua"}}>OR </span> HasSpringBall <span style={{color: "aqua"}}>OR </span> HasDoubleJump)
</Entry>

<Entry name="canAccessKraid">
  canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> CanPassBombPassages
</Entry>

<Entry name="canAccessCrocomire">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    (<br />&nbsp;&nbsp;(canHellRun <span style={{color: "purple"}}>AND </span> CanPassBombPassages) <span style={{color: "aqua"}}>OR </span>
      (HasSpeed <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 1))<br />)
</Entry>

<Entry name="canDoSuitlessMaridia">
    HasHiJump <span style={{color: "purple"}}>AND </span> HasGrapple <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpringBall)
</Entry>

<Entry name="canAccessBotwoon">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    (<br />&nbsp;&nbsp;(HasGravity <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpeed <span style={{color: "aqua"}}>OR </span> HasSpazer)) <span style={{color: "aqua"}}>OR </span>
      (canDoSuitlessMaridia <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpazer))<br />)
</Entry>

<Entry name="canDefeatDraygon">
  canAccessBotwoon <span style={{color: "purple"}}>AND </span> HasGravity
</Entry>

<Entry name="canAccessWreckedShip">
  CanUsePowerBombs <span style={{color: "purple"}}>AND </span> SuperPacks &#8805; 1;
</Entry>

<Entry name="canAccessWestMaridia">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
    (<br />&nbsp;&nbsp;HasGravity <span style={{color: "aqua"}}>OR </span>
      HasPressureValve <span style={{color: "aqua"}}>OR </span>
      (HasHiJump <span style={{color: "purple"}}>AND </span> (HasIce <span style={{color: "aqua"}}>OR </span> HasSpringBall))<br />)
</Entry>

<Entry name="canEnterAndLeaveGauntlet">
    (CanUseBombs <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 2) <span style={{color: "aqua"}}>OR </span>
    HasScrewAttack <span style={{color: "aqua"}}>OR </span>
    (CanUsePowerBombs <span style={{color: "purple"}}>AND </span> PowerPacks &#8805; 2 <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1)
</Entry>
      <h2 style={{fontVariant: 'all-small-caps', fontSize: '2.0em', paddingTop: '14px'}}>Locations</h2>
    <Entry name="Bombs">
      HasMorph <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Energy Tank (Brinstar Ceiling)">
      Always Accessible
    </Entry>

    <Entry name="Energy Tank (Gauntlet)">
      canEnterAndLeaveGauntlet
    </Entry>

    <Entry name="Energy Tank (Terminator)">
      CanDestroyBombWalls <span style={{color: "aqua"}}>OR </span> HasSpeed
    </Entry>

    <Entry name="Missiles (230)">
      CanPassBombPassages
    </Entry>

    <Entry name="Missiles (Alpha)">
      HasMorph
    </Entry>

    <Entry name="Missiles (Beta)">
      HasMorph
    </Entry>

    <Entry name="Missiles (Billy Mays 1)">
      CanUsePowerBombs
    </Entry>

    <Entry name="Missiles (Billy Mays 2)">
      CanUsePowerBombs
    </Entry>

    <Entry name="Missiles (Gauntlet Left)">
      canEnterAndLeaveGauntlet <span style={{color: "purple"}}>AND </span> CanPassBombPassages
    </Entry>

    <Entry name="Missiles (Gauntlet Right)">
      canEnterAndLeaveGauntlet <span style={{color: "purple"}}>AND </span> CanPassBombPassages
    </Entry>

    <Entry name="Missiles (Moat)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Mother Brain)">
      CanDestroyBombWalls
    </Entry>

    <Entry name="Morphing Ball">
      Always Accessible
    </Entry>

    <Entry name="Power Bombs (Landing Site)">
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        ((HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> CanFly)
    </Entry>

    <Entry name="Power Bombs (Morph)">
      CanUsePowerBombs
    </Entry>

    <Entry name="Supers (Climb)">
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        HasSpeed <span style={{color: "purple"}}>AND </span>
        EnergyTanks &#8805; 1 <span style={{color: "purple"}}>AND </span>
        (<br />&nbsp;&nbsp;(EnergyTanks &#8805; 2 <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 3) <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasSpaceJump<br />)
    </Entry>

    <Entry name="Energy Tank (Crocomire)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (TotalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> HasGrapple <span style={{color: "aqua"}}>OR </span> HasSpaceJump)
    </Entry>

    <Entry name="Grapple Beam">
      canAccessCrocomire
    </Entry>

    <Entry name="Missiles (Cosine)">
      canAccessCrocomire
    </Entry>

    <Entry name="Missiles (Indiana Jones)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          (CanUsePowerBombs <span style={{color: "purple"}}>AND </span> HasSpeed) <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump)
    </Entry>

    <Entry name="Power Bombs (Crocomire)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          (HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span>
          HasHiJump <span style={{color: "aqua"}}>OR </span>
          HasIce <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump)
    </Entry>

    <Entry name="Energy Tank (Botwoon)">
      canAccessBotwoon
    </Entry>

    <Entry name="Missiles (Aqueduct)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Missiles (Precious)">
      canDefeatDraygon
    </Entry>

    <Entry name="Missiles (Sand Pit Left)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Missiles (Sand Pit Right)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Plasma Beam">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span> (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve)
    </Entry>

    <Entry name="Power Bombs (Sand Pit Right)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Reserve Tank (Maridia)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Space Jump">
      canDefeatDraygon
    </Entry>

    <Entry name="Spring Ball">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span> (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve)
    </Entry>

    <Entry name="Supers (Aqueduct)">
      canAccessWestMaridia <span style={{color: "purple"}}>AND </span> HasGravity
    </Entry>

    <Entry name="Charge Beam">
        CanUsePowerBombs <span style={{color: "aqua"}}>OR </span>
        (CanOpenRedDoors <span style={{color: "purple"}}>AND </span> CanPassBombPassages)
    </Entry>

    <Entry name="Energy Tank (Etecoons)">
      CanUsePowerBombs
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
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> CanOpenRedDoors <span style={{color: "purple"}}>AND </span> HasMorph
    </Entry>

    <Entry name="Missiles (Brin Reserve 2)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        CanPassBombPassages
    </Entry>

    <Entry name="Missiles (Brin Tube)">
      canAccessRedBrinstar <span style={{color: "aqua"}}>OR </span> CanUsePowerBombs
    </Entry>

    <Entry name="Missiles (Charge)">
      canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Missiles (Early Bridge)">
      canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> CanOpenRedDoors
    </Entry>

    <Entry name="Power Bombs (Etecoons)">
      CanUsePowerBombs
    </Entry>

    <Entry name="Power Bombs (Mission Impossible)">
      CanUsePowerBombs <span style={{color: "purple"}}>AND </span> SuperPacks &#8805; 1
    </Entry>

    <Entry name="Reserve Tank (Brinstar)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (HasMorph <span style={{color: "aqua"}}>OR </span> HasSpeed)
    </Entry>

    <Entry name="Supers (Early Bridge)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        CanOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (HasMorph <span style={{color: "aqua"}}>OR </span> HasSpeed)
    </Entry>

    <Entry name="Supers (Etecoons)">
      CanUsePowerBombs <span style={{color: "purple"}}>AND </span> CanOpenGreenDoors
    </Entry>

    <Entry name="Supers (Spore Spawn)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        CanOpenGreenDoors <span style={{color: "purple"}}>AND </span>
        CanPassBombPassages
    </Entry>

    <Entry name="Energy Tank (Kraid)">
      canAccessKraid
    </Entry>

    <Entry name="Missiles (Kraid)">
      canAccessKraid <span style={{color: "purple"}}>AND </span> CanUsePowerBombs
    </Entry>

    <Entry name="Varia Suit">
      canAccessKraid
    </Entry>

    <Entry name="Energy Tank (Firefleas)">
      canPassWorstRoom
    </Entry>

    <Entry name="Energy Tank (Ridley)">
      canPassWorstRoom
    </Entry>

    <Entry name="Missiles (GT)">
      canAccessLowerNorfair <span style={{color: "purple"}}>AND </span> HasSpaceJump
    </Entry>

    <Entry name="Missiles (Maze)">
      canPassWorstRoom
    </Entry>

    <Entry name="Missiles (Mickey Mouse)">
      canPassWorstRoom
    </Entry>

    <Entry name="Missiles (Three Muskateers)">
      canPassWorstRoom
    </Entry>

    <Entry name="Power Bombs (Maze)">
      canPassWorstRoom
    </Entry>

    <Entry name="Power Bombs (Shame)">
      canPassWorstRoom
    </Entry>

    <Entry name="Screw Attack">
        canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          HasSpringBall <span style={{color: "aqua"}}>OR </span>
          HasSpeed)
    </Entry>

    <Entry name="Supers (GT)">
        canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          HasSpringBall <span style={{color: "aqua"}}>OR </span>
          HasSpeed)
    </Entry>

    <Entry name="Missiles (Alpha PBs)">
      canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> CanUsePowerBombs
    </Entry>

    <Entry name="Power Bombs (Alpha)">
      canAccessRedBrinstar
    </Entry>

    <Entry name="Power Bombs (Beta)">
      canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> CanUsePowerBombs
    </Entry>

    <Entry name="Spazer">
      canAccessRedBrinstar
    </Entry>

    <Entry name="Xray Scope">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (<br />&nbsp;&nbsp;HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasSpaceJump <span style={{color: "aqua"}}>OR </span>
          (HasDoubleJump <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4) <span style={{color: "aqua"}}>OR </span>
          <br />&nbsp;&nbsp;(HasHiJump <span style={{color: "purple"}}>AND </span> HasSpeed <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4) <span style={{color: "aqua"}}>OR </span>
          (HasIce <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 4)<br />)
    </Entry>

    <Entry name="Energy Tank (HJB)">
      canAccessRedBrinstar
    </Entry>

    <Entry name="HiJump Boots">
      canAccessRedBrinstar
    </Entry>

    <Entry name="Ice Beam">
        canAccessKraid <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2 <span style={{color: "aqua"}}>OR </span> HasHeatShield)
    </Entry>

    <Entry name="Missiles (Bubble Mountain)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        (canHellRun <span style={{color: "aqua"}}>OR </span> (HasSpeed <span style={{color: "purple"}}>AND </span> CanPassBombPassages))
    </Entry>

    <Entry name="Missiles (Cathedral)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Croc Escape)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (HasVaria <span style={{color: "aqua"}}>OR </span> HasHeatShield <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2) <span style={{color: "purple"}}>AND </span>
        (CanFly <span style={{color: "aqua"}}>OR </span>
          HasGrapple <span style={{color: "aqua"}}>OR </span>
          HasDoubleJump <span style={{color: "aqua"}}>OR </span>
          (HasHiJump <span style={{color: "purple"}}>AND </span> HasSpeed))
    </Entry>

    <Entry name="Missiles (Crumble Shaft)">
      canAccessKraid <span style={{color: "purple"}}>AND </span> CanUsePowerBombs <span style={{color: "purple"}}>AND </span> canHellRun
    </Entry>

    <Entry name="Missiles (HJB)">
      canAccessRedBrinstar
    </Entry>

    <Entry name="Missiles (Norfair Reserve 1)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Norfair Reserve 2)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Speed)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Wave)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Reserve Tank (Norfair)">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Speed Booster">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Wave Beam">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Energy Tank (Mama Turtle)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
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
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Missiles (Mainstreet)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve) <span style={{color: "purple"}}>AND </span>
        HasSpeed
    </Entry>

    <Entry name="Missiles (Mama Turtle)">
      canAccessWestMaridia
    </Entry>

    <Entry name="Missiles (Watering Hole)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Supers (Crab)">
      canAccessWestMaridia
    </Entry>

    <Entry name="Supers (Watering Hole)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        CanUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (HasGravity <span style={{color: "aqua"}}>OR </span> HasPressureValve <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Energy Tank (Wrecked Ship)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Gravity Suit">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Missiles (Attic)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Bowling)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Missiles (Ocean Bottom)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Ocean Middle)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Sky)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Spooky)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Reserve Tank (Wrecked Ship)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
        ((HasVaria <span style={{color: "purple"}}>AND </span> TotalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> TotalTanks &#8805; 2)
    </Entry>

    <Entry name="Supers (WS Left)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Supers (WS Right)">
      canAccessWreckedShip
    </Entry>
      </>
   )
}

export default RecallLogicPage
