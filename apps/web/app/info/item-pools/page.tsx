// Out of a desire to maximize randomness, DASH employs a fill method which involves placing very few initial items (details below) and then randomly placing all other items within the game based on an item pool consisting of the vanilla major item upgrades (morph, varia, gravity, etc.) and a randomly derived number of minor items (missiles, supers, power bombs). Once all items within the pool have been placed, a solver is used to verify that the seed can be completed. Internally we have referred to this as the Verified Fill method, but it is also commonly referred to as the Random Fill method.

import { Metadata } from "next"
import { Wrapper } from "@/app/components/wrapper";
import styles from "../info.module.css";
import Spacer from "@/app/components/spacer";

export const metadata: Metadata = {
  title: 'Item Pools - DASH Randomizer',
  description: 'A brief explanation of the Item Pool in DASH and how it is used in the seed rolling logic.',
}

export default function ItemPoolsInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Item Pools</h1>
          <p>
            The list of items randomly placed in a seed is known as the <strong>Item Pool</strong>.
            Generally speaking, items in the Item Pool are divided
            into two categories: <strong>Majors</strong> (Morph Ball,
            Gravity Suit, Energy Tanks, etc.) and Minors (Missiles,
            Super Missiles, and Power Bombs). Major Items in the Item Pool are
            affected by the <a href="/info/settings#item-split">Item Split</a>,{' '}
            <a href="/info/settings#map-layout">Map Layout</a>, and the inclusion of {' '}
            <a href="/info/item-pools#extra-dash-items">Extra DASH Items</a>.
          </p>
          <Spacer y={12} />
          <h2 className={styles.title}>Item Split</h2>
          <p>
            The Item Split determines the valid locations where major items can
            be placed. DASH currently offers three <strong>Item Split</strong> options:{' '}
            <strong>Major/Minor</strong>, <strong>Full</strong>, and <strong>Chozo</strong>.
          </p>
          <Spacer y={12} />
          <ul>
            <li>
              <header>
                <h3>
                  Major/Minor
                </h3>
                <div className={styles.locationCount}>
                  34 major item locations
                </div>
              </header>
              <p>
                Major items can be placed at any of the vanilla major item
                locations. For balance, the Energy Tank location at HiJump Boots
                is considered a minor location and the Right Side Super Missile
                location in Wrecked Ship is considered a major location.
              </p>
              <p>
                Using the <strong>DASH: Recall</strong> Map Layout with the Major/Minor Item Split increases the number
                of major locations to 36 by adding Mickey Mouse
                Missiles, Watering Hole Supers, and Sky Missiles. Kraid Energy Tank is
                considered a minor item location.
              </p>
              <Spacer y={8} />
            </li>
            <li>
              <header>
                <h3>
                  Full
                </h3>
                <div className={styles.locationCount}>
                  100 major item locations
                </div>
              </header>
              <p>
                Any location can hold a major item.
              </p>
              <Spacer y={8} />
            </li>
            <li>
              <header>
                <h3>
                  Chozo
                </h3>
                <div className={styles.locationCount}>
                  25 major item locations
                </div>
              </header>
              <p>
                Sufficient items to beat the game are placed at Chozo statues and boss reward locations. This includes each unique major item plus 3 energy tanks, 1 reserve tank, 2 missile packs, 2 super missile packs, and 1 power bomb pack. These items are considered major items by the randomizer.
              </p>
              <Spacer y={8} />
            </li>
          </ul>
          <Spacer y={12} />
          <h2 id="extra-dash-items" className={styles.title}>Extra DASH Items</h2>

          <p>
            DASH introduces new major items which can optionally be included in
            the item pool. This includes Double Jump, Heat Shield, Pressure
            Valve, and Charge Upgrades for certain Beam Modes.
          </p>

          <Spacer y={12} />
          <h2 className={styles.title}>Building Item Pools</h2>

          <p>This is the process followed when building an item pool:</p>
          <ol>
            <li>
              <p>
                Add one of every vanilla item type to the item pool except for
                Charge Beam (all vanilla majors, 1 energy tank, 1 reserve tank,
                1 missile, 1 super missile, 1 power bomb)
              </p>
            </li>
            <li>
              <p>
                Either add Charge Beam to the item pool or the appropriate
                number of Charge Upgrades based on the Beam Mode
              </p>
            </li>
            <li>
              <p>
                Add any extra DASH items to the pool (Double Jump, Heat Shield,
                or Pressure Valve)
              </p>
            </li>
            <li>
              <p>
                Add energy tanks and reserve tanks based on the Item Split
              </p>
              <div>
                <p>
                  <strong>Full</strong> - Item
                  pool will contain a total of 14 energy tanks and 4 reserve tanks.
                </p>

                <p>
                  <strong>Major/Minor</strong> - With
                  limited major locations, the number of energy and
                  reserve tanks can vary. We want to place all 14 energy tanks
                  so we initially reduce the number of reserve tanks down to a
                  minimum of 2 if needed. Energy tanks are added to fill in the rest.
                </p>

                <p>
                  <strong>Chozo</strong> - 3 energy tanks and 1 reserve tank
                  are added as major items. Additional tanks
                  are added as minor items so that we end up with 14 total energy tanks and 4 total reserve tanks in the pool.
                </p>
              </div>
            </li>
            <li>
              <p>
                Add minor items to the item pool based on the selected ratio
                (3:2:1 or 2:1:1) until there are 100 items. Given a 3:2:1 ratio,
                every item added to the pool has a 3/6 chance of being a
                missile, 2/6 chance of being a super, and 1/6 chance of being a
                power bomb.
              </p>
            </li>
          </ol>
        </article>
      </div>
    </Wrapper>
  );
}
