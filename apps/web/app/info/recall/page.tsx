import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'

export default function RecallInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>DASH: Recall</h1>
          <p>
            <strong>DASH: Recall</strong> is a reimagining and rebalancing of vanilla map with
            the goal of offering up even more routing possibilities in a variety of
            seeds and further diversity in how seeds can be completed within a
            competitive racing situation.
          </p>
          <p>
            At release, <strong>DASH: Recall</strong> was an all-in-one mode and
            changes associated with it could not be used with other configurations. Since
            then, the individual pieces have been split out to give runners greater
            flexibility when generating seeds.
          </p>
          <p>
            The <strong>DASH: Recall</strong> preset is maintained to allow for the
            generation of seeds following the original vision of the mode. The following
            is a breakdown of the changes:
         </p>
         <ol type="a">
            <li className={styles.list_item_spacer}>
               Progressive Charge Beam (aka <i>Starter+</i>)
               {/*<span class="suits_inverse">(Item Balance)</span>*/}
               <ul>
                  <li>2 Individual Charge Upgrades added to Major Item pool</li>
                  <li>Samus begins with <i>Starter Charge</i> which does the same damage as uncharged shots</li>
                  <li>Collecting the first Charge Upgrade causes charge shots to do 2x damage of uncharged shots</li>
                  <li>Collecting the second Charge Upgrade causes charge shots to do 3x damage of uncharged shots</li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               36 Major Item Locations: +2 Charge Upgrades, +3 New Items, -1 ETanks,
               -2 Reserves
               {/*<span class="misc_inverse">(Map Balance)</span>*/}
              <ul>
                <li>Kraid Etank removed from Major Item Location pool</li>
                <li>Sky Missile added to Major Item Location pool</li>
                <li>Watering Hole Missile added to Major Item Location pool</li>
                <li>Mickey Mouse Missile added to Major Item Location pool</li>
              </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Rebalanced WS Reserve Location
               {/*<span class="misc_inverse">(Map Balance)</span>*/}
               <ul>
                  <li>
                     All speed blocks removed from the bowling room (both at the
                     top for scouting and the singular block that
                     prevents access to the item)
                  </li>
                  <li>WS Reserve Item no longer in a capsule</li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Rebalanced Plasma Location
               {/*<span class="misc_inverse">(Map Balance)</span>*/}
               <ul>
                  <li>Plasma Gray door is now a blue door</li>
                  <li>Replaced pink pirates with green pirates</li>
                  <li>
                     Added a platform in the middle of the plasma room that
                     allows exit from the room without “can fly”
                  </li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Rebalanced Spring Ball Location
               {/*<span class="misc_inverse">(Map Balance)</span>*/}
               <ul>
                  <li>
                     Removed all 5 of the ceiling blocks from the pants room
                     before Shaktool (the grapple block and the other 4 blocks
                     on that “row”)
                  </li>
                  <li>Removed the sand from the Shaktool</li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Maridia Routing Updates
               {/*<span class="misc_inverse">(Map Balance)</span>*/}
               <ul>
                  <li>Removed green gate from Crab Tunnel room in Maridia</li>
                  <li>
                     Gray door to Cac Alley is now a blue door
                  </li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Pressure Valve
               {/*<span class="utility_inverse">(New Item)</span>*/}
               <ul>
                  <li>
                     Works like Gravity Suit in rooms with water other than East
                     Maridia
                  </li>
                  <li>
                     Note that there are now North and South Maridia zones where
                     Pressure Valve DOES work
                     (See <a href="/images/maridia_logic_sections_with_colors.png">
                        New Maridia Logic Map with Color Coding</a>)
                  </li>
                  <li>Does NOT work in lava or acid anywhere</li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Heat Shield
               {/*<span class="utility_inverse">(New Item)</span>*/}
               <ul>
                  <li>
                     Provides 100% reduction to heat damage in Upper Norfair
                     heated rooms
                  </li>
                  <li>
                     Provides 50% reduction to heat damage in Lower Norfair
                     heated rooms
                  </li>
                  <li>Does NOT stack heat reduction with Gravity Suit</li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Double Jump Item
               {/*<span class="utility_inverse">(New Item)</span>*/}
               <ul>
                  <li>
                     Like Space Jump but only one extra spin jump instead of
                     infinite
                  </li>
               </ul>
            </li>
            <li className={styles.list_item_spacer}>
               Rebalanced Gravity Suit
               {/*<span class="suits_inverse">(Item Balance)</span>*/}
               <ul>
                  <li>
                     Gravity Suit provides a flat 25% reduction to heat damage
                     in both Upper Norfair and Lower Norfair heated rooms (down
                     from 50% in Standard DASH)
                  </li>
                  <li>Does NOT stack with Heat Shield Item</li>
               </ul>
            </li>
         </ol>
        </article>
      </div>
    </Wrapper>
  )
}
