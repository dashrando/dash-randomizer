// Out of a desire to maximize randomness, DASH employs a fill method which involves placing very few initial items (details below) and then randomly placing all other items within the game based on an item pool consisting of the vanilla major item upgrades (morph, varia, gravity, etc.) and a randomly derived number of minor items (missiles, supers, power bombs). Once all items within the pool have been placed, a solver is used to verify that the seed can be completed. Internally we have referred to this as the Verified Fill method, but it is also commonly referred to as the Random Fill method.

import Badge from '@/app/components/badge'
import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'
import Spacer from '@/app/components/spacer'

export default function VerifiedFillInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Verified Fill</h1>
          <p>Out of a desire to maximize randomness, DASH uses a fill method which places a few items in early locations and then randomly places all remaining items. With items placed, a solver verifies the seed can be completed. We refer to this as the <strong>Verified Fill</strong> method, but it is also commonly known as <strong>Random Fill</strong>.</p>
          <h2>Item Pool</h2>
          <p>The available item pool consists of the vanilla major items, a randomly derived number of minor items, and (optionally) any new DASH major items.</p>
          <h2>Early Item Placement</h2>
          <h3>Major/Minor + Recall</h3>
          <ol>
            <li>
              Morph Ball
              <ul>
                <li>Placed at either vanilla location or Blue Brinstar ceiling</li>
              </ul>
            </li>
            <li style={{ marginTop: '10px' }}>
              Missile pack or Super Missile pack
              <ul>
                <li>65% chance of Missile pack</li>
                <li>35% chance of Super Missile pack</li>
              </ul>
            </li>
            <li style={{ marginTop: '10px' }}>
              Item to break the blocks in Parlor
              <ul>
                <li>46.3% chance of Power Bombs</li>
                <li>30.7% chance of Bombs</li>
                <li>7.7% chance of Speed Booster</li>
                <li>5.3% chance of Screw Attack</li>
              </ul>
            </li>
          </ol>
          <h3>Full</h3>
          <ol>
            <li>
              Morph Ball
              <ul>
                <li>Placed at either vanilla location or Blue Brinstar ceiling</li>
              </ul>
            </li>
            <li style={{ marginTop: '10px' }}>
              Missile pack or Super Missile pack
              <ul>
                <li>65% chance of Missile pack</li>
                <li>35% chance of Super Missile pack</li>
              </ul>
            </li>
            <li style={{ marginTop: '10px' }}>
              Movement item which can also break blocks in Parlor
              <ul>
                <li>76.9% chance of <i>No Item</i></li>
                <li>7.7% chance of Screw Attack</li>
                <li>7.7% chance of Speed Booster</li>
                <li>7.7% chance of Bombs</li>
              </ul>
            </li>
            <li style={{ marginTop: '10px' }}>Power Bomb pack</li>
          </ol>
          <h2>Remaining Items</h2>
          <p>With early items placed, a process similar to shuffling a deck of cards occurs to place the other items. The DASH solver ensures that all item locations within the game will be accessible for a seed to be considered valid.</p>
          <h2>Boss/Area Randomization</h2>
          <p>This same approach is used when randomizing bosses and area transitions. Combinations of bosses and area portals are generated randomly, and the DASH solver is used to verify the seed.</p>
          <h2>Seed Generation</h2>
          <p>Steps for generating a seed:</p>
          <ol>
            <li>Initialize solver with selected settings</li>
            <li>Randomize boss locations</li>
            <li>Randomize area transitions</li>
            <li>Place early items</li>
            <li>Place remaining items</li>
            <li>
              Verify seed can be completed
              <ul>
                <li>Return to step 5 if the seed cannot be completed</li>
                <li>Return to step 2 after steps 5-6 have been repeated 10 times</li>
                <li>Return to step 1 after steps 2-6 have been repeated 20 times and select a new initial seed</li>
              </ul>
            </li>
          </ol>
        </article>
      </div>
    </Wrapper>
  )
}
