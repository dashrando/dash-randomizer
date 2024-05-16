import Badge from '@/app/components/badge'
import Link from 'next/link'
import { Wrapper } from '@/app/components/wrapper'
import { Link as LinkIcon } from 'react-feather'
import styles from '../info.module.css'
import Spacer from '@/app/components/spacer'
import { cn } from '@/lib/utils'

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

type MysteryValue = {
  label: string
  value: number
}

const MysteryTable = ({ title, values }: { title: string, values: MysteryValue[] }) => (
  <>
    <h4>{title}</h4>
    <table className={cn(styles.table, styles.mysteryTable)}>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {values.map((value: MysteryValue, index: number) => (
          <tr key={index}>
            <td>{value.label}</td>
            <td>{value.value * 100}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Spacer y={8} />
  </>
)

const mysteryPercentages = [
  {
    title: 'Item Split',
    values: [
      { label: 'Full', value: 0.33 },
      { label: 'Chozo', value: 0.33 },
      { label: 'Major/Minor', value: 0.34 },
    ]
  },
  {
    title: 'Boss Locations',
    values: [
      { label: 'Surprise', value: 0.25 },
      { label: 'Shuffled', value: 0.3 },
      { label: 'Shifted', value: 0.3 },
      { label: 'Vanilla', value: 0.15 },
    ]
  },
  {
    title: 'Map Layout',
    values: [
      { label: 'Area Randomization', value: 0.7 },
      { label: 'Vanilla', value: 0.3 },
    ]
  },
  {
    title: 'Minor Item Distribution',
    values: [
      { label: 'Standard - 3:2:1', value: 0.6 },
      { label: 'DASH - 2:1:1', value: 0.4 },
    ]
  },
  {
    title: 'Charge Beam',
    values: [
      { label: 'Vanilla', value: 0.5 },
      { label: 'Starter', value: 0.3 },
      { label: 'Starter+', value: 0.2 },
    ]
  },
  {
    title: 'Environment Updates',
    values: [
      { label: 'Standard', value: 0.85 },
      { label: 'DASH', value: 0.15 },
    ]
  },
  {
    title: 'Gravity Heat Reduction',
    values: [
      { label: 'Off', value: 0.7 },
      { label: 'On', value: 0.3 },
    ]
  },
  {
    title: 'Double Jump',
    values: [
      { label: 'Off', value: 0.65 },
      { label: 'On', value: 0.35 },
    ]
  },
  {
    title: 'Heat Shield',
    values: [
      { label: 'Off', value: 0.85 },
      { label: 'On', value: 0.15 },
    ]
  },
]

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
          <p><strong>Mode</strong> is the combination of <a href="#item-split">Item Split</a>, <a href="#boss-locations">Boss Locations</a> and <a href="#map-layout">Map Layout</a> parameters. DASH provides a few curated modes by default, but also allows you to change any of these values to create your own custom mode.</p>
          <p>A special mode called <strong>Mystery</strong> will generate a seed with a mix of all randomization parameters and settings.</p>
          <details>
            <summary>Mystery percentages</summary>
            {mysteryPercentages.map((mystery, index) =>
              <MysteryTable key={index} title={mystery.title} values={mystery.values} />
            )}
            <p>
              <em>Note: All Mystery seeds will use Standard Logic and have Item Fanfare enabled.</em>
            </p>
          </details>
        </Article>
        <Article id="item-split" title="Item Split">
          <p><strong>Item Split</strong> determines the available locations where major items can be placed.</p>
          <ul>
            {/*<li>
              <p>
                <strong>Recall Major/Minor</strong>:{' '}
                Major item upgrades, energy tanks, and reserve tanks are placed at the standard major item locations, with a few changes, dictated by the logic. Changes include the removal of the Kraid&apos;s Etank location and the additions of the Sky Missile, Watering Hole, and Mickey Mouse Missile locations.
              </p>
            </li>*/}
            <li>
              <p>
                <strong>Major/Minor</strong>:{' '}
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
            <li>
              <p>
                <strong>Chozo</strong>: Sufficient items to beat the game are placed at Chozo item locations. This includes each unique major item plus 3 energy tanks, 1 reserve tank, 2 missile packs, 2 super missile packs, and 1 power bomb pack.
              </p>
              <details>
                <summary>Chozo Locations</summary>
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
                      <td>Morph Pedestal</td>
                      <td>Crateria</td>
                      <td>Morph Ball</td>
                    </tr>
                    <tr>
                      <td>Missiles (Alpha)</td>
                      <td>Crateria</td>
                      <td>Missile Pack</td>
                    </tr>
                    <tr>
                      <td>Missiles (230)</td>
                      <td>Crateria</td>
                      <td>Missile Pack</td>
                    </tr>
                    <tr>
                      <td>Bomb Torizo</td>
                      <td>Crateria</td>
                      <td>Bombs</td>
                    </tr>
                    <tr>
                      <td>Energy Tank (Gauntlet)</td>
                      <td>Crateria</td>
                      <td>Energy Tank</td>
                    </tr>
                    <tr>
                      <td>Grapple Beam</td>
                      <td>Crocomire</td>
                      <td>Grapple Beam</td>
                    </tr>
                    <tr>
                      <td>Space Jump</td>
                      <td>East Maridia</td>
                      <td>Space Jump</td>
                    </tr>
                    <tr>
                      <td>Brinstar Reserve</td>
                      <td>Green Brinstar</td>
                      <td>Reserve Tank</td>
                    </tr>
                    <tr>
                      <td>Charge Beam</td>
                      <td>Green Brinstar</td>
                      <td>Charge Beam</td>
                    </tr>
                    <tr>
                      <td>Spo Spo Supers</td>
                      <td>Green Brinstar</td>
                      <td>Super Missile</td>
                    </tr>
                    <tr>
                      <td>Varia Suit</td>
                      <td>Kraid&apos;s Lair</td>
                      <td>Varia Suit</td>
                    </tr>
                    <tr>
                      <td>Ridley Energy Tank</td>
                      <td>Lower Norfair</td>
                      <td>Energy Tank</td>
                    </tr>
                    <tr>
                      <td>Screw Attack</td>
                      <td>Lower Norfair</td>
                      <td>Screw Attack</td>
                    </tr>
                    <tr>
                      <td>X-Ray</td>
                      <td>Red Brinstar</td>
                      <td>X-Ray Scope</td>
                    </tr>
                    <tr>
                      <td>Alpha Power Bombs</td>
                      <td>Red Brinstar</td>
                      <td>Power Bomb Pack</td>
                    </tr>
                    <tr>
                      <td>Spazer Beam</td>
                      <td>Red Brinstar</td>
                      <td>Spazer Beam</td>
                    </tr>
                    <tr>
                      <td>Ice Beam</td>
                      <td>Upper Norfair</td>
                      <td>Ice Beam</td>
                    </tr>
                    <tr>
                      <td>High Jump Boots</td>
                      <td>Upper Norfair</td>
                      <td>High Jump Boots</td>
                    </tr>
                    <tr>
                      <td>Speed Booster</td>
                      <td>Upper Norfair</td>
                      <td>Speed Booster</td>
                    </tr>
                    <tr>
                      <td>Wave Beam </td>
                      <td>Upper Norfair</td>
                      <td>Wave Beam</td>
                    </tr>
                    <tr>
                      <td>Plasma Beam</td>
                      <td>West Maridia</td>
                      <td>Plasma Beam</td>
                    </tr>
                    <tr>
                      <td>Spring Ball</td>
                      <td>West Maridia</td>
                      <td>Spring Ball</td>
                    </tr>
                    <tr>
                      <td>Right Side Supers</td>
                      <td>Wrecked Ship</td>
                      <td>Super Missile Pack</td>
                    </tr>
                    <tr>
                      <td>Wrecked Ship Energy Tank</td>
                      <td>Wrecked Ship</td>
                      <td>Energy Tank</td>
                    </tr>
                    <tr>
                      <td>Bowling Missiles</td>
                      <td>Wrecked Ship</td>
                      <td>Missile Pack</td>
                    </tr>
                  </tbody>
                </table>
              </details>
            </li>
          </ul>
        </Article>
        <Article
          id="boss-locations"
          badge={<Badge variant="beta">Beta</Badge>}
          title="Boss Locations"
        >
          <p>
            <strong>Boss Locations</strong> can be updated for the G4 bosses. For example, going to the boss location in Lower Norfair might lead to Kraid, Phantoon, Draygon or Ridley.
          </p>
          <ul>
            <li>
              <p>
                <strong>Vanilla </strong> bosses are found in their normal locations.
              </p>
            </li>
            <li>
              <p>
                <strong>Shifted</strong> bosses open access to the area in which they are placed (example: Kraid&apos;s etank will be accessible after defeating whatever boss is in Kraid&apos;s Lair). At least two bosses will not be at their vanilla locations.
              </p>
            </li>
            <li>
              <p>
                <strong>Shuffled</strong> bosses open access to their vanilla area regardless of where they are placed (example: Kraid&apos;s etank will only be accessible after defeating Kraid). At least two bosses will not be at their vanilla locations.
              </p>
            </li>
            <li>
              <p>
                <strong>Surprise</strong> bosses allows any boss to be at any location <u>including duplicates</u>. Defeating a boss opens access to the area in which it is placed (example: Kraid&apos;s etank will be accessible after defeating whatever boss is in Kraid&apos;s Lair). At least one boss will not be at its vanilla location.
              </p>
            </li>
            {/*<li>
              <p style={{ marginBottom: 0 }}>
                <strong>Known</strong> ensures at least two G4 bosses will not be at their vanilla locations, but the player will have the boss locations viewable from the pause screen.
              </p>
              <span style={{ display: 'block', height: 'var(--spacer-2x)' }} />
              <Badge>Coming soon</Badge>
            </li>*/}
          </ul>
        </Article>
        <Article
          id="map-layout"
          badge={<Badge variant="beta">Beta</Badge>}
          title="Map Layout"
        >
          <p>
            <strong>Map Layout</strong> determines how the doors around the map are connected.
          </p>
          <ul>
            <li>
              <p>
                <strong>Area Randomization</strong> uses 32 specific doors as portals and randomizes the portal connections, producing a unique map layout.
              </p>
            </li>
            <li>
              <p>
                <strong>DASH: Recall</strong> rebalances vanilla map by unlocking certain doors and removing obstacles.
              </p>
              <details>
                <summary>View all map changes for DASH: Recall</summary>
                <ul className={styles.list_disc}>
                  <li>
                    All speed blocks removed from the bowling room (both at the
                    top for scouting and the singular block that
                    prevents access to the item)
                  </li>
                  <li>WS Reserve Item no longer in a capsule</li>
                  <li>Plasma Gray door is now a blue door</li>
                  <li>Replaced pink pirates with green pirates</li>
                  <li>
                    Added a platform in the middle of the plasma room that
                    allows exit from the room without “can fly”
                  </li>
                  <li>
                    Removed all 5 of the ceiling blocks from the pants room
                    before Shaktool (the grapple block and the other 4 blocks
                    on that “row”)
                  </li>
                  <li>Removed the sand from the Shaktool hallway</li>
                  <li>Removed green gate from Crab Tunnel room in Maridia</li>
                  <li>
                    Gray door to Cac Alley is now a blue door
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <p>
                <strong>Vanilla</strong> makes no changes to the door connections.
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
          id="environment"
          title="Environment Updates"
        >
          <p>
            <strong>Environment Updates</strong> applies various tweaks, anti-soft lock patches and other quality of life improvements.
          </p>
          <ul>
            <li>
              <p>
                <strong>Standard</strong> has the normal map that most randomizers use, such as Total&apos;s Randomizer and VARIA.
              </p>
            </li>
            <li>
              <p>
                <strong>DASH</strong> includes everything from Standard plus the following:
                <ul className={styles.list_disc}>
                  <li>Spazer-breakable blocks at the Waterway location and Botwoon&apos;s Hallway</li>
                  <li>Allows the speed block at the Wrecked Ship Reserve location to be broken by the Bombs major item.</li>
                </ul>
              </p>
            </li>
          </ul>
        </Article>
        <Article
          id="charge-beam"
          title="Charge Beam"
        >
          <p>
            DASH supports adjusting how charge beam is managed in the game.
          </p>
          <ul>
            <li>
              <p>
                <strong>Vanilla</strong> does not modify Charge Beam in any way.
              </p>
            </li>
            <li>
              <p>
                <strong>Starter</strong> provides a baseline Charge Beam that does regular beam damage. There is one Charge Beam upgrade in the game that will upgrade to the standard 3x beam damage from the vanilla game.
              </p>
            </li>
            <li>
              <p>
                <strong>Starter+</strong> is the same except it includes two Charge Beam upgrades that increase the Charge Beam damage to 2x and 3x progressively.
              </p>
            </li>
            {/*<li>
              <p>
                <strong>Recall</strong> includes the Starter Charge Beam and 4 Charge Upgrades which scale the damage up to a maximum of 5x. Recall also includes updated beam damage tables in an attempt to improve balance.
              </p>
          </li>*/}
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
            <strong>Heat Shield</strong> is a new item introduced in DASH Recall. When equipped, it reduces heat damage from heated rooms.
          </p>
          <ul>
            <li>
              <p>
                Provides 100% reduction to heat damage in Upper Norfair heated rooms.
              </p>
            </li>
            <li>
              <p>
                Provides 50% reduction to heat damage in Lower Norfair heated rooms.
              </p>
            </li>
            <li>
              <p>
                Does NOT stack heat reduction with Gravity Suit.
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
        {/*<Article
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
            </Article>*/}
        <Article
          id="logic"
          title="Logic"
        >
          <p>
            <strong>Logic</strong> refers to the set of conditions required to navigate from place to place in the game.
          </p>
          <ul>
            <li><strong>Normal</strong> is the primary logic curated by the DASH team which is optimized for competive racing.</li>
            <li><strong>Relaxed</strong> is very similar but removes the potential for Hell Runs, Suitless Maridia, Snail Clip, and Ice Clip for Spring Ball. This is recommended for newer runners.</li>
          </ul>
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
