import type { Metadata, NextPage } from 'next'
import { Entry, Navigation, Seperator } from "../readable"
import styles from "../readable.module.css";

export const metadata: Metadata = {
  title: 'Readable Logic - DASH Standard',
  description: 'DASH Standard logic in a human readable format',
}

const StandardLogicPage: NextPage = () => {
   return (
      <>
      <Navigation selected="standard" />
      <Seperator />
      <div className={styles.logic_title}>Standard</div>
      <Seperator />
      <div style={{ border: '1px solid #222', backgroundColor: '#010101', display: 'inline-flex', padding: '8px 16px', borderRadius: '8px', margin: '16px 0', maxWidth: '440px', fontSize: '16px', lineHeight: '24px' }}>
        <p><strong style={{ color: '#fff' }}>Warning:</strong> The following logic does not account for Area Randomization or Boss Shuffle, both of which are in alpha.</p>
      </div>
      <h2>Utilities</h2>
<Entry name="canHellRun">
  totalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> hasVaria
</Entry>

<Entry name="canAccessGreenBrinstar">
  canDestroyBombWalls <span style={{color: "aqua"}}>OR </span> hasSpeed
</Entry>

<Entry name="canAccessRedBrinstar">
    hasMorph <span style={{color: "purple"}}>AND </span>
    canOpenGreenDoors <span style={{color: "purple"}}>AND </span>
    (canAccessGreenBrinstar <span style={{color: "aqua"}}>OR </span> canUsePowerBombs)
</Entry>

<Entry name="canAccessHeatedNorfair">
  canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canHellRun
</Entry>

<Entry name="canAccessLowerNorfair">
    canAccessHeatedNorfair <span style={{color: "purple"}}>AND </span>
    canUsePowerBombs <span style={{color: "purple"}}>AND </span>
    hasVaria <span style={{color: "purple"}}>AND </span>
    (hasHiJump <span style={{color: "aqua"}}>OR </span> hasGravity)
</Entry>

<Entry name="canPassWorstRoom">
    canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
    (canFly <span style={{color: "aqua"}}>OR </span> hasHiJump <span style={{color: "aqua"}}>OR </span> hasSpringBall)
</Entry>

<Entry name="canAccessKraid">
  canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canPassBombPassages
</Entry>

<Entry name="canAccessCrocomire">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    ((canHellRun <span style={{color: "purple"}}>AND </span> canPassBombPassages) <span style={{color: "aqua"}}>OR </span>
      (hasSpeed <span style={{color: "purple"}}>AND </span> (hasVaria <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 1)))
</Entry>

<Entry name="canDoSuitlessMaridia">
    hasHiJump <span style={{color: "purple"}}>AND </span> hasGrapple <span style={{color: "purple"}}>AND </span> (hasIce <span style={{color: "aqua"}}>OR </span> hasSpringBall)
</Entry>

<Entry name="canAccessBotwoon">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    canUsePowerBombs <span style={{color: "purple"}}>AND </span>
    ((hasGravity <span style={{color: "purple"}}>AND </span> (hasIce <span style={{color: "aqua"}}>OR </span> hasSpeed)) <span style={{color: "aqua"}}>OR </span>
      (canDoSuitlessMaridia <span style={{color: "purple"}}>AND </span> hasIce))
</Entry>

<Entry name="canDefeatDraygon">
  canAccessBotwoon <span style={{color: "purple"}}>AND </span> hasGravity
</Entry>

<Entry name="canAccessWreckedShip">
  canUsePowerBombs <span style={{color: "purple"}}>AND </span> superPacks &#8805; 1;
</Entry>

<Entry name="canAccessOuterMaridia">
    canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
    canUsePowerBombs <span style={{color: "purple"}}>AND </span>
    (hasGravity <span style={{color: "aqua"}}>OR </span> (hasHiJump <span style={{color: "purple"}}>AND </span> (hasIce <span style={{color: "aqua"}}>OR </span> hasSpringBall)))
</Entry>

<Entry name="canAccessInnerMaridia">
  canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canUsePowerBombs <span style={{color: "purple"}}>AND </span> hasGravity
</Entry>

<Entry name="canEnterAndLeaveGauntlet">
    (canUseBombs <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 2) <span style={{color: "aqua"}}>OR </span>
    hasScrewAttack <span style={{color: "aqua"}}>OR </span>
    (canUsePowerBombs <span style={{color: "purple"}}>AND </span> powerPacks &#8805; 2 <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 1)
</Entry>
      <h2>Locations</h2>
      <Entry name="Bombs">
         HasMorph <span style={{color: "purple"}}>AND </span>
         CanOpenRedDoors
      </Entry>
    <Entry name="Energy Tank (Brinstar Ceiling)">
      return true
    </Entry>

    <Entry name="Energy Tank (Gauntlet)">
      return canEnterAndLeaveGauntlet
    </Entry>

    <Entry name="Energy Tank (Terminator)">
      return canDestroyBombWalls <span style={{color: "aqua"}}>OR </span> hasSpeed
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
      canEnterAndLeaveGauntlet <span style={{color: "purple"}}>AND </span> canPassBombPassages
    </Entry>

    <Entry name="Missiles (Gauntlet Right)">
      canEnterAndLeaveGauntlet <span style={{color: "purple"}}>AND </span> canPassBombPassages
    </Entry>

    <Entry name="Missiles (Moat)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Mother Brain)">
      canDestroyBombWalls
    </Entry>

    <Entry name="Morphing Ball">
      return true
    </Entry>

    <Entry name="Power Bombs (Landing Site)">
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        ((hasSpeed <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> canFly)
    </Entry>

    <Entry name="Power Bombs (Morph)">
      canUsePowerBombs
    </Entry>

    <Entry name="Supers (Climb)">
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        hasSpeed <span style={{color: "purple"}}>AND </span>
        energyTanks &#8805; 1 <span style={{color: "purple"}}>AND </span>
        ((energyTanks &#8805; 2 <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 3) <span style={{color: "aqua"}}>OR </span>
          hasGrapple <span style={{color: "aqua"}}>OR </span>
          hasSpaceJump)
    </Entry>

    <Entry name="Energy Tank (Crocomire)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (totalTanks &#8805; 4 <span style={{color: "aqua"}}>OR </span> hasGrapple <span style={{color: "aqua"}}>OR </span> hasSpaceJump)
    </Entry>

    <Entry name="Grapple Beam">
      canAccessCrocomire
    </Entry>

    <Entry name="Missiles (Cosine)">
      canAccessCrocomire
    </Entry>

    <Entry name="Missiles (Indiana Jones)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span> (canUsePowerBombs <span style={{color: "purple"}}>AND </span> hasSpeed))
    </Entry>

    <Entry name="Power Bombs (Crocomire)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span>
          hasGrapple <span style={{color: "aqua"}}>OR </span>
          (hasSpeed <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span>
          hasHiJump <span style={{color: "aqua"}}>OR </span>
          hasIce)
    </Entry>

    <Entry name="Energy Tank (Botwoon)">
      canAccessBotwoon
    </Entry>

    <Entry name="Missiles (Aqueduct)">
      canAccessOuterMaridia <span style={{color: "purple"}}>AND </span> hasGravity
    </Entry>

    <Entry name="Missiles (Precious)">
      canDefeatDraygon
    </Entry>

    <Entry name="Missiles (Sand Pit Left)">
      canAccessOuterMaridia <span style={{color: "purple"}}>AND </span> hasGravity
    </Entry>

    <Entry name="Missiles (Sand Pit Right)">
      canAccessInnerMaridia
    </Entry>

    <Entry name="Plasma Beam">
        canDefeatDraygon <span style={{color: "purple"}}>AND </span>
        ((hasCharge <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 3) <span style={{color: "aqua"}}>OR </span>
          hasScrewAttack <span style={{color: "aqua"}}>OR </span>
          hasPlasma) <span style={{color: "purple"}}>AND </span>
        (hasHiJump <span style={{color: "aqua"}}>OR </span> hasSpringBall <span style={{color: "aqua"}}>OR </span> canFly <span style={{color: "aqua"}}>OR </span> hasSpeed)
    </Entry>

    <Entry name="Power Bombs (Sand Pit Right)">
      return canAccessOuterMaridia <span style={{color: "purple"}}>AND </span> hasGravity
    </Entry>

    <Entry name="Reserve Tank (Maridia)">
      return canAccessOuterMaridia <span style={{color: "purple"}}>AND </span> hasGravity
    </Entry>

    <Entry name="Space Jump">
      return canDefeatDraygon
    </Entry>

    <Entry name="Spring Ball">
        canAccessInnerMaridia <span style={{color: "purple"}}>AND </span>
        (hasIce <span style={{color: "aqua"}}>OR </span> (hasGrapple <span style={{color: "purple"}}>AND </span> (canFly <span style={{color: "aqua"}}>OR </span> hasHiJump)))
    </Entry>

    <Entry name="Supers (Aqueduct)">
      canAccessOuterMaridia <span style={{color: "purple"}}>AND </span> hasGravity
    </Entry>

    <Entry name="Charge Beam">
        canUsePowerBombs <span style={{color: "aqua"}}>OR </span>
        (canOpenRedDoors <span style={{color: "purple"}}>AND </span> canPassBombPassages)
    </Entry>

    <Entry name="Energy Tank (Etecoons)">
      return canUsePowerBombs
    </Entry>

    <Entry name="Energy Tank (Waterway)">
      canUsePowerBombs <span style={{color: "purple"}}>AND </span> canOpenRedDoors <span style={{color: "purple"}}>AND </span> hasSpeed
    </Entry>

    <Entry name="Energy Tank (Wave Gate)">
      canUsePowerBombs <span style={{color: "purple"}}>AND </span> (hasWave <span style={{color: "aqua"}}>OR </span> superPacks &#8805; 1)
    </Entry>

    <Entry name="Missiles (Big Pink)">
        canUsePowerBombs <span style={{color: "aqua"}}>OR </span>
        (canOpenRedDoors <span style={{color: "purple"}}>AND </span> (hasSpeed <span style={{color: "aqua"}}>OR </span> canDestroyBombWalls))
    </Entry>

    <Entry name="Missiles (Brin Reserve 1)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> canOpenRedDoors <span style={{color: "purple"}}>AND </span> hasMorph
    </Entry>

    <Entry name="Missiles (Brin Reserve 2)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        canOpenRedDoors <span style={{color: "purple"}}>AND </span>
        canPassBombPassages
    </Entry>

    <Entry name="Missiles (Brin Tube)">
      return canAccessRedBrinstar <span style={{color: "aqua"}}>OR </span> canUsePowerBombs
    </Entry>

    <Entry name="Missiles (Charge)">
      return canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> canOpenRedDoors
    </Entry>

    <Entry name="Missiles (Early Bridge)">
      return canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span> canOpenRedDoors
    </Entry>

    <Entry name="Power Bombs (Etecoons)">
      return canUsePowerBombs
    </Entry>

    <Entry name="Power Bombs (Mission Impossible)">
      return canUsePowerBombs <span style={{color: "purple"}}>AND </span> superPacks &#8805; 1;
    </Entry>

    <Entry name="Reserve Tank (Brinstar)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        canOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (hasMorph <span style={{color: "aqua"}}>OR </span> hasSpeed)
    </Entry>

    <Entry name="Supers (Early Bridge)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        canOpenRedDoors <span style={{color: "purple"}}>AND </span>
        (hasMorph <span style={{color: "aqua"}}>OR </span> hasSpeed)
    </Entry>

    <Entry name="Supers (Etecoons)">
      return canUsePowerBombs <span style={{color: "purple"}}>AND </span> canOpenGreenDoors
    </Entry>

    <Entry name="Supers (Spore Spawn)">
        canAccessGreenBrinstar <span style={{color: "purple"}}>AND </span>
        canOpenGreenDoors <span style={{color: "purple"}}>AND </span>
        canPassBombPassages
    </Entry>

    <Entry name="Energy Tank (Kraid)">
      return canAccessKraid
    </Entry>

    <Entry name="Missiles (Kraid)">
      return canAccessKraid <span style={{color: "purple"}}>AND </span> canUsePowerBombs
    </Entry>

    <Entry name="Varia Suit">
      return canAccessKraid
    </Entry>

    <Entry name="Energy Tank (Firefleas)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Energy Tank (Ridley)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Missiles (GT)">
      return canAccessLowerNorfair <span style={{color: "purple"}}>AND </span> hasSpaceJump
    </Entry>

    <Entry name="Missiles (Maze)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Missiles (Mickey Mouse)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Missiles (Three Muskateers)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Power Bombs (Maze)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Power Bombs (Shame)">
      return canPassWorstRoom
    </Entry>

    <Entry name="Screw Attack">
        canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span> hasSpringBall <span style={{color: "aqua"}}>OR </span> hasSpeed)
    </Entry>

    <Entry name="Supers (GT)">
        canAccessLowerNorfair <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span> hasSpringBall <span style={{color: "aqua"}}>OR </span> hasSpeed)
    </Entry>

    <Entry name="Missiles (Alpha PBs)">
      return canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canUsePowerBombs
    </Entry>

    <Entry name="Power Bombs (Alpha)">
      return canAccessRedBrinstar
    </Entry>

    <Entry name="Power Bombs (Beta)">
      return canAccessRedBrinstar <span style={{color: "purple"}}>AND </span> canUsePowerBombs
    </Entry>

    <Entry name="Spazer">
      return canAccessRedBrinstar
    </Entry>

    <Entry name="Xray Scope">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (hasGrapple <span style={{color: "aqua"}}>OR </span>
          hasSpaceJump <span style={{color: "aqua"}}>OR </span>
          (hasHiJump <span style={{color: "purple"}}>AND </span> hasSpeed <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 4) <span style={{color: "aqua"}}>OR </span>
          (hasIce <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 4))
    </Entry>

    <Entry name="Energy Tank (HJB)">
      return canAccessRedBrinstar
    </Entry>

    <Entry name="HiJump Boots">
      return canAccessRedBrinstar
    </Entry>

    <Entry name="Ice Beam">
      return canAccessKraid <span style={{color: "purple"}}>AND </span> (hasVaria <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 2);
    </Entry>

    <Entry name="Missiles (Bubble Mountain)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        (canHellRun <span style={{color: "aqua"}}>OR </span> (hasSpeed <span style={{color: "purple"}}>AND </span> canPassBombPassages))
    </Entry>

    <Entry name="Missiles (Cathedral)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Croc Escape)">
        canAccessCrocomire <span style={{color: "purple"}}>AND </span>
        (hasVaria <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 2) <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span> hasGrapple <span style={{color: "aqua"}}>OR </span> (hasHiJump <span style={{color: "purple"}}>AND </span> hasSpeed))
    </Entry>

    <Entry name="Missiles (Crumble Shaft)">
      return canAccessKraid <span style={{color: "purple"}}>AND </span> canUsePowerBombs <span style={{color: "purple"}}>AND </span> canHellRun
    </Entry>

    <Entry name="Missiles (HJB)">
      return canAccessRedBrinstar
    </Entry>

    <Entry name="Missiles (Norfair Reserve 1)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Norfair Reserve 2)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Speed)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Missiles (Wave)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Reserve Tank (Norfair)">
      return canAccessHeatedNorfair
    </Entry>

    <Entry name="Speed Booster">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Wave Beam">
      canAccessHeatedNorfair
    </Entry>

    <Entry name="Energy Tank (Mama Turtle)">
        canAccessOuterMaridia <span style={{color: "purple"}}>AND </span>
        (canFly <span style={{color: "aqua"}}>OR </span>
          (hasSpeed <span style={{color: "purple"}}>AND </span> hasGravity) <span style={{color: "aqua"}}>OR </span>
          hasSpringBall <span style={{color: "aqua"}}>OR </span>
          hasGrapple)
    </Entry>

    <Entry name="Missiles (Beach)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (hasGravity <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Missiles (Mainstreet)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        hasGravity <span style={{color: "purple"}}>AND </span>
        hasSpeed
    </Entry>

    <Entry name="Missiles (Mama Turtle)">
      canAccessOuterMaridia
    </Entry>

    <Entry name="Missiles (Watering Hole)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (hasGravity <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Supers (Crab)">
      canAccessOuterMaridia
    </Entry>

    <Entry name="Supers (Watering Hole)">
        canAccessRedBrinstar <span style={{color: "purple"}}>AND </span>
        canUsePowerBombs <span style={{color: "purple"}}>AND </span>
        (hasGravity <span style={{color: "aqua"}}>OR </span> canDoSuitlessMaridia)
    </Entry>

    <Entry name="Energy Tank (Wrecked Ship)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span>
        (canUseBombs <span style={{color: "aqua"}}>OR </span>
          canUsePowerBombs <span style={{color: "aqua"}}>OR </span>
          hasHiJump <span style={{color: "aqua"}}>OR </span>
          hasSpaceJump <span style={{color: "aqua"}}>OR </span>
          hasSpeed <span style={{color: "aqua"}}>OR </span>
          hasSpringBall)
    </Entry>

    <Entry name="Gravity Suit">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span> (hasVaria <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 1)
    </Entry>

    <Entry name="Missiles (Attic)">
      canAccessWreckedShip
    </Entry>

    <Entry name="Missiles (Bowling)">
        canAccessWreckedShip <span style={{color: "purple"}}>AND </span> (hasVaria <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 1)
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
        hasSpeed <span style={{color: "purple"}}>AND </span>
        ((hasVaria <span style={{color: "purple"}}>AND </span> totalTanks &#8805; 1) <span style={{color: "aqua"}}>OR </span> totalTanks &#8805; 2)
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

export default StandardLogicPage
