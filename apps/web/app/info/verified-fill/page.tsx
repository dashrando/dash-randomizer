// Out of a desire to maximize randomness, DASH employs a fill method which involves placing very few initial items (details below) and then randomly placing all other items within the game based on an item pool consisting of the vanilla major item upgrades (morph, varia, gravity, etc.) and a randomly derived number of minor items (missiles, supers, power bombs). Once all items within the pool have been placed, a solver is used to verify that the seed can be completed. Internally we have referred to this as the Verified Fill method, but it is also commonly referred to as the Random Fill method.

import Badge from '@/app/components/badge'
import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'
import Spacer from '@/app/components/spacer'

export default function VerifiedFillInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Verified Fill</h1>
          <p>Out of a desire to maximize randomness, DASH employs a fill method which involves placing very few initial items (details below) and then randomly placing all other items within the game based on an item pool consisting of the vanilla major item upgrades (morph, varia, gravity, etc.) and a randomly derived number of minor items (missiles, supers, power bombs). Once all items within the pool have been placed, a solver is used to verify that the seed can be completed. Internally we have referred to this as the <strong>Verified Fill</strong> method, but it is also commonly referred to as the <strong>Random Fill</strong> method.</p>
          <p>Early items placed vary slightly between Major/Minor and Full item placement. For each type of item placement, here is the order in which these items are placed.</p>
          <h2>Major/Minor</h2>
          <ol>
            <li>
              Morph Ball
              <ol type="a">
                <li>Always placed at either its vanilla location or in the blue brinstar ceiling location</li>
              </ol>
            </li>
            <li>
              Either a Missile pack or Super Missile pack
              <ol type="a">
                <li>65% chance of Missile pack</li>
                <li>35% chance of Super Missile pack</li>
              </ol>
            </li>
            <li>
              An item to break the blocks in Parlor
              <ol type="a">
                <li>7.7% chance of Speed Booster</li>
                <li>5.3% chance of Screw Attack</li>
                <li>30.7% chance of Bombs</li>
                <li>46.3% chance of Power Bombs</li>
              </ol>
            </li>
          </ol>
          <h2>Full</h2>
          <ol>
            <li>
              Morph Ball
              <ol type="a">
                <li>Always placed at either its vanilla location or in the blue brinstar ceiling location</li>
              </ol>
            </li>
            <li>
              Either a Missile pack or Super Missile pack
              <ol type="a">
                <li>65% chance of Missile pack</li>
                <li>35% chance of Super Missile pack</li>
              </ol>
            </li>
            <li>
              A movement item which can break the blocks in Parlor
              <ol type="a">
                <li>7.7% chance of Screw Attack</li>
                <li>7.7% chance of Speed Booster</li>
                <li>7.7% chance of Bombs</li>
              </ol>
            </li>
            <li>Power Bomb pack</li>
          </ol>
          <p>Once these early items are placed, a process similar to shuffling a deck of cards occurs to place the other items. The DASH solver ensures that all item locations within the game will be accessible in order for a seed to be considered valid.</p>
          <p>This same approach is used for both Boss Shuffle and Area Randomization. Combinations of bosses and area portals are generated randomly, and the solver is used to verify that the seed is valid.</p>
          <p>The process for generating a seed goes in this order:</p>
          <ol>
            <li>Initialize the solver using the vanilla map</li>
            <li>Randomize boss locations</li>
            <li>Randomize area connections</li>
            <li>Place early items</li>
            <li>Place remaining items</li>
            <li>
              Verify seed can be solved
              <ol type="a">
                <li>Return to step 5 if the seed cannot be solved</li>
                <li>Return to step 1 using a new initial seed value after 150 failed attempts</li>
              </ol>
            </li>
          </ol>
        </article>
      </div>
    </Wrapper>
  )
}
