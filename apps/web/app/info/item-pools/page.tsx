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
            An important part of generating a DASH seed is the random creation
            of the <strong>Item Pool</strong>: the list of items to be
            placed in the game. Generally speaking, the Item Pool is divided
            into two item categories: <strong>Majors</strong> (Morph Ball,
            Gravity Suit, Energy/Reserve Tanks, etc.) and Minors (Missiles,
            Super Missiles, and Power Bombs). Major Items in the Item Pool can
            be affected by both the chosen <strong>Item Split</strong> and
            {' '}<strong>Extra DASH Items</strong>.
          </p>
          <Spacer y={12} />
          <h2 className={styles.title}>Item Split</h2>
          <p>
            The Item Split determines the valid locations where major items can
            be placed. DASH currently offers three Item Split options:{' '}
            <strong>Major/Minor</strong>, <strong>Recall Major/Minor</strong>,
            and <strong>Full</strong>.
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
              <Spacer y={8} />
            </li>
            <li>
              <header>
                <h3>
                  Recall Major/Minor
                </h3>
                <div className={styles.locationCount}>
                  36 major item locations
                </div>
              </header>
              <p>
                Similar to normal{' '}
                <strong>Major/Minor</strong> with a few tweaks. Mickey Mouse
                Missiles, Watering Hole Supers, and Sky Missiles are now
                considered major item locations. Kraid Energy Tank is considered a
                minor item location.
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
          </ul>
          <Spacer y={12} />
          <h2 className={styles.title}>Extra DASH Items</h2>

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
                  <strong>Full</strong> - Add 14 energy
                  tanks and 4 reserve tanks
                </p>

                <p>
                  <strong>Major/Minor</strong> - With
                  only 34 major locations, we limit the number of energy and
                  reserve tanks to fit. We want to place all 14 energy tanks
                  so we initially reduce the number of reserve tanks down to a
                  minimum of 2. We then add energy tanks until we have exactly
                  34 major items in the pool.
                </p>

                <p>
                  <strong>Recall Major/Minor</strong> -
                  In general, this Item Split works like normal Major/Minor
                  but with 36 major item locations. However, it is possible
                  that we may end up with less than 36 major items even with 4
                  reserve tanks and 14 energy tanks. In that case, Super
                  Missile packs are added as major items.
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
