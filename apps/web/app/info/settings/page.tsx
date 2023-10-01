import Badge from '@/app/components/badge'
import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import { Link as LinkIcon } from 'react-feather'
import styles from '../info.module.css'
import Spacer from '@/app/components/spacer'

const Title = ({ id, children }: { id: string, children: React.ReactNode }) => (
  <h2 className={styles.title}>
    <Link href={`#${id}`}>
      {children}
      <span className={styles.link_icon}>
        <LinkIcon size={14} />
      </span>
    </Link>
  </h2>
)

const Article = ({
  id,
  title,
  badge,
  children
}: {
  id: string,
  title: string,
  badge?: React.ReactNode,
  children: React.ReactNode
}) => (
  <article className={styles.article} id={id}>
    <header>
      {badge ? (
        <div className={styles.titleWithBadge}>
          <span>
            <Title id={id}>{title}</Title>
          </span>
          {badge}
        </div>
      ) : (
        <Title id={id}>{title}</Title>
      )}
    </header>
    {children}
  </article>
)

export default function SettingsInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <h1 className={styles.headline}>Settings</h1>
        <Article id="vanilla" title="Vanilla">
          <p><strong>Vanilla</strong> refers to the original and unmodified Super Metroid game. The vanilla game will either be NTSC or PAL and will also be headered or unheadered. DASH uses an unheadered NTSC vanilla file in order to generate a seed.</p>
          <p>The <strong>header</strong> is the first 512 bytes of data in many .sfc and .smc files. This contains miscellaneous data that is unused. If you upload a headered file, DASH will attempt to remove the header automatically.</p>
          <p><strong>NTSC</strong> and <strong>PAL</strong> are video standards. NTSC is most commonly used today as it runs at 60Hz whereas PAL runs at 50Hz.</p>
        </Article>
        <Article id="mode" title="Mode">
          <p><strong>Mode</strong> is the combination of <a href="#item-split">Item Split</a>, <a href="#boss">Boss Randomization</a> and <a href="#area">Area Randomization</a>. DASH provides a few curated modes by default, but also allows you to change any of these values to create your own custom mode.</p>
        </Article>
        <Article id="item-split" title="Item Split">
          <p><strong>Item Split</strong> determines the available locations where major items can be placed.</p>
          <ul>
            <li>
              <p>
                <strong>Recall Major/Minor</strong>:{' '}
                Major item upgrades, energy tanks, and reserve tanks are placed at the standard major item locations, with a few changes, dictated by the logic. Changes include the removal of the Kraid&apos;s Etank location and the additions of the Sky Missile, Watering Hole, and Mickey Mouse Missile locations.
              </p>
              {/* <details>
                <summary>Locations</summary>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Area</th>
                      <th>Vanilla Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bomb Torizo</td>
                      <td>Crateria</td>
                      <td>Bombs</td>
                    </tr>
                    <tr>
                      <td>Morph Pedestal</td>
                      <td>Crateria</td>
                      <td>Morph Ball</td>
                    </tr>
                    <tr>
                      <td>Ceiling E-Tank</td>
                      <td>Crateria</td>
                      <td>E-Tank</td>
                    </tr>
                  </tbody>
                </table>
              </details>
              <Spacer y={4} />
              <details>
                <summary>Items</summary>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ minWidth: '160px' }}>Name</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Morphing Ball</td>
                      <td>Must be in either Morph Pedestal or Ceiling E-Tank in Crateria.</td>
                    </tr>
                    <tr>
                      <td>Varia</td>
                      <td>Cannot be in Crateria.</td>
                    </tr>
                    <tr>
                      <td>E-Tank</td>
                      <td>There are 12 total E-Tanks in this split.</td>
                    </tr>
                  </tbody>
                </table>
              </details> */}
            </li>
            <li>
              <p>
                <strong>Standard Major/Minor</strong>:{' '}
                Major item upgrades, energy tanks, and reserve tanks are placed at the standard major item locations dictated by the logic.
              </p>
              {/* <details>
                <summary>Locations</summary>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Area</th>
                      <th>Vanilla Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bomb Torizo</td>
                      <td>Crateria</td>
                      <td>Bombs</td>
                    </tr>
                    <tr>
                      <td>Morph Pedestal</td>
                      <td>Crateria</td>
                      <td>Morph Ball</td>
                    </tr>
                    <tr>
                      <td>Ceiling E-Tank</td>
                      <td>Crateria</td>
                      <td>E-Tank</td>
                    </tr>
                  </tbody>
                </table>
              </details>
              <Spacer y={4} />
              <details>
                <summary>Items</summary>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ minWidth: '160px' }}>Name</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Morphing Ball</td>
                      <td>Must be in either Morph Pedestal or Ceiling E-Tank in Crateria.</td>
                    </tr>
                    <tr>
                      <td>Varia</td>
                      <td>Cannot be in Crateria.</td>
                    </tr>
                    <tr>
                      <td>E-Tank</td>
                      <td>There are 12 total E-Tanks in this split.</td>
                    </tr>
                  </tbody>
                </table>
              </details> */}
            </li>
            <li>
              <p>
                <strong>Full</strong>: All items are able to be placed in any location dictated by the logic.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="boss"
          badge={<Badge variant="alpha">Alpha</Badge>}
          title="Boss Shuffle"
        >
          <p>
            <strong>Boss Randomization</strong> can shift the G4 bosses found at a given boss location. For example, going to the boss location at Kraid&apos; warehouse might lead to Kraid, Phantoon, Draygon or Ridley. While the encountered boss might be at its expected location, at least two of the G4 bosses will not be in their vanilla location.
          </p>
          <ul>
            <li>
              <p>
                <strong>Standard</strong> disables this randomization and all G4 bosses will be at their vanilla locations.
              </p>
            </li>
            <li>
              <p>
                <strong>Randomized</strong> enables this randomization. At least two G4 bosses will not be at its vanilla location.
              </p>
            </li>
            <li>
              <p style={{ marginBottom: 0 }}>
                <strong>Known</strong> ensures at least two G4 bosses will not be at their vanilla locations, but the player will have the boss locations viewable from the pause screen.
              </p>
              <span style={{ display: 'block', height: 'var(--spacer-2x)' }} />
              <Badge>Coming soon</Badge>
            </li>
          </ul>
          <p>NOTE: By design, bosses shifted in DASH unlock the area in which they are located instead of their vanilla areas. For example, defeating Ridley at Wrecked Ship will awaken the ship.</p>
        </Article>
        <Article
          id="area"
          badge={<Badge variant="alpha">Alpha</Badge>}
          title="Area"
        >
          <p>
            <strong>Area Randomization</strong> will randomize connecting doors between Crateria, Green Brinstar, Red Brinstar, Kraid&apos;s Lair, Wrecked Ship, Upper Norfair, Crocomire, Lower Norfair, West Maridia, East Maridia and Tourian.
          </p>
          <ul>
            <li>
              <p>
                <strong>Randomized</strong> enables this randomization. While the connections to areas are randomized, there is still a path to beating the game dictated by the logic.
              </p>
            </li>
            <li>
              <p>
                <strong>Standard</strong> disables this randomization and all areas connect as in the vanilla game.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="minors"
          title="Minor Item Distribution"
        >
          <p>
            <strong>Minor Item Distribution</strong> determines the ratio of minor items placed throughout the game.
          </p>
          <ul>
            <li>
              <p>
                <strong>DASH</strong> provides 2 Missiles for every 1 Super Missile and 1 Power Bomb.
              </p>
            </li>
            <li>
              <p>
                <strong>Standard</strong> provides 3 Missiles for every 2 Super Missiles and 1 Power Bomb.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="map-layout"
          title="Map Layout"
        >
          <p>
            <strong>Map Layout</strong> applies various tweaks, anti-soft lock patches and other quality of life improvements.
          </p>
          <ul>
            <li>
              <p>
                <strong>Standard</strong> has the &quot;vanilla&quot; map that most randomizers use, such as Total&apos;s Randomizer and VARIA.
              </p>
            </li>
            <li>
              <p>
                <strong>DASH Recall</strong> has everything included in Standard, but also includes a few changes specific to the DASH Recall logic.
              </p>
            </li>
            <li>
              <p>
                <strong>DASH Classic</strong> has everything included in Standard, and also includes accessing Waterway and Botwoon Hallway using Spazer beam plus accessing Wrecked Ship Reserve with Bombs.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="charge-beam"
          title="Chage Beam"
        >
          <p>
            DASH supports adjusting how beam damage is handled in the game. All modes other than Vanilla have Samus begin the game with a Starter Charge beam which does the same damage as uncharged shots while still allowing bosses to be damaged.
          </p>
          <ul>
            <li>
              <p>
                <strong>Vanilla</strong> does not modify beams in any way.
              </p>
            </li>
            <li>
              <p>
                <strong>Starter</strong> includes the Starter Charge beam and 1 Charge Upgrade which scales the damage up to 3x. The vanilla beam damage tables are used.
              </p>
            </li>
            <li>
              <p>
                <strong>Starter+</strong> includes the Starter Charge beam and 2 Charge Upgrades which scale the damage up to a maximum of 3x. The vanilla beam damage tables are used.
              </p>
            </li>
            <li>
              <p>
                <strong>Recall</strong> includes the Starter Charge beam and 4 Charge Upgrades which scale the damage up to a maximum of 5x. Recall also includes updated beam damage tables in an attempt to improve balance.
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="gravity-heat-reduction"
          title="Gravity Heat Reduction"
        >
          <p>
              Enabling <strong>Gravity Heat Reduction</strong> causes Samus to receive 25% less environmental damage from heated rooms when Gravity Suit is equipped without Varia Suit. Note that Gravity Heat Reduction is not considered for logical item progression.
          </p>
        </Article>
        <Article
          id="double-jump"
          title="Double Jump"
        >
          <p>
            <strong>Double Jump</strong> is a new item introduced in DASH Recall. When equipped, it allows Samus to make one additional mid-air jump. This behaves like a single-use Space Jump.
          </p>
        </Article>
        <Article
          id="heat-shield"
          title="Heat Shield"
        >
          <p>
            <strong>Heat Shield</strong> is a new item introduced in DASH Recall. When equipped, it reduces environmental damage from heated rooms.
          </p>
          <ul>
            <li>
              <p>
                In Upper Norfair, environmental damage is reduced 100%.
              </p>
            </li>
            <li>
              <p>
                In Lower Norfair, environmental damage from heated rooms is reduced by 50%.
              </p>
            </li>
            <li>
              <p>
                If <a href="#gravity-heat-reduction">Gravity Heat Reduction</a> is enabled, Heat Shield can be paired with Gravity Suit for a total of 75% damage reduction.
              </p>
            </li>
          </ul>
          <p>Heat Shield is superseded by Varia Suit, and will become unavailable on the pause menu once Varia Suit has been picked up.</p>
        </Article>
        <Article
          id="pressure-valve"
          title="Pressure Valve"
        >
          <p>
            <strong>Pressure Valve</strong> is a new item introduced in DASH Recall. When equipped, it allows for seamless underwater movement like Gravity Suit. However, it has no effect in Aqueduct and other rooms in East Maridia. It also offers no damage reduction.
          </p>
          <p>Pressure Valve is superseded by Gravity Suit, and will become unavailable once Gravity Suit has been picked up.</p>
        </Article>
        <Article
          id="seed-mode"
          title="Seed Mode"
        >
          <p>
            <strong>Seed Mode</strong> determines how the random number generator used when shuffling areas, doors, and item locations is initialized.
          <ul>
            <li>
              <p>
                <strong>Random</strong> chooses the initial seed randomly. This is the default.
              </p>
            </li>
            <li>
              <p>
                <strong>Fixed</strong> allows the user to provide a seed.
              </p>
            </li>
          </ul>
          </p>
        </Article>
        <Article
          id="fanfare"
          title="Item Fanfare"
        >
          <p>
            <strong>Item Fanfare</strong> is the ~7 second period after Samus acquires a new item in which the player loses control while heroic music plays. DASH supports disabling Item Fanfare, but they are enabled by default.
          </p>
        </Article>
      </div>
    </Wrapper>
  )
}
