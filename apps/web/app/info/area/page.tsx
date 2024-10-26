import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'
import pageStyles from './page.module.css'
import { cn } from '@/lib/utils';
import Spacer from '@/app/components/spacer';

export default function AreaInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Area Randomization</h1>
          <p>
            <strong>Area Randomization</strong> uses 32 specific doors as portals and randomizes the portal connections, producing a unique map layout.
          </p>
        </article>
        <article className={pageStyles.section_sep}>
            <p>
            When traversing the map, there are 3 area types:
            </p>
            <ul>
              <li>
                <p>
                <strong>Hub</strong> areas have more than 2 portals: <u>Crateria</u>, <u>Green Brinstar</u>, <u>Red Brinstar</u>, <u>West Maridia</u>, <u>Upper Norfair</u>
                </p>
              </li>
              <li>
                <p>
                <strong>Duo</strong> areas have exactly 2 portals: <u>Wrecked Ship</u>, <u>East Maridia</u>, <u>Lower Norfair</u>
                </p>
              </li>
              <li>
                <p>
                <strong>Dead</strong> areas have exactly 1 portal: <u>Kraid&apos;s Lair</u>, <u>Crocomire&apos;s Lair</u>, <u>Tourian</u>
                </p>
              </li>
            </ul>
            <Spacer y={10}/>
            <p>
              DASH randomly connects areas when <a href="/info/verified-fill">generating a seed</a>, but a few restrictions are put in place to make for a better racing experience:
              <ul>
                <li>
                  <p>
                    At most one vanilla portal connection can be occur
                  </p>
                </li>
                <li>
                  <p>
                    At most one connection to another portal in the same area can occur
                  </p>
                </li>
                <li>
                  <p>
                    All three <strong>Duo</strong> areas cannot be connected to each other in a chain
                  </p>
                </li>
                <li>
                  <p>
                    Two connected <strong>Duo</strong> areas cannot be connected to a <strong>Dead</strong> area
                  </p>
                </li>
              </ul>
            </p>
          </article>

        <article className={pageStyles.section_sep}>
          <p>
            <table className={cn(styles.table, styles.mysteryTable)}>
              <thead>
                <tr>
                  <th>Portal</th>
                  <th>Area</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Retro PBs</td>
                  <td>Crateria</td>
                </tr>
                <tr>
                  <td>G4</td>
                  <td>Crateria</td>
                </tr>
                <tr>
                  <td>Kago</td>
                  <td>Crateria</td>
                </tr>
                <tr>
                  <td>Crateria Crabs</td>
                  <td>Crateria</td>
                </tr>
                <tr>
                  <td>Moat</td>
                  <td>Crateria</td>
                </tr>
                <tr>
                  <td>Green Elevator</td>
                  <td>Green Brinstar</td>
                </tr>
                <tr>
                  <td>Green Hills</td>
                  <td>Green Brinstar</td>
                </tr>
                <tr>
                  <td>Noob Bridge</td>
                  <td>Green Brinstar</td>
                </tr>
                <tr>
                  <td>Red Elevator</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Maridia Escape</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Red Tower</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Maridia Tube</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Red Tower to Maridia Map</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Red Tower to Kraid</td>
                  <td>Red Brinstar</td>
                </tr>
                <tr>
                  <td>Red Fish</td>
                  <td>West Maridia</td>
                </tr>
                <tr>
                  <td>Pre Aqueduct</td>
                  <td>West Maridia</td>
                </tr>
                <tr>
                  <td>Main Street</td>
                  <td>West Maridia</td>
                </tr>
                <tr>
                  <td>Maridia Map Station</td>
                  <td>West Maridia</td>
                </tr>
                <tr>
                  <td>Business Center Left</td>
                  <td>Upper Norfair</td>
                </tr>
                <tr>
                  <td>Business Center Right</td>
                  <td>Upper Norfair</td>
                </tr>
                <tr>
                  <td>Croc Entry</td>
                  <td>Upper Norfair</td>
                </tr>
                <tr>
                  <td>Single Chamber</td>
                  <td>Upper Norfair</td>
                </tr>
                <tr>
                  <td>Kronic Boost</td>
                  <td>Upper Norfair</td>
                </tr>
                <tr>
                  <td>Croc Exit</td>
                  <td>Crocomire&apos;s Lair</td>
                </tr>
                <tr>
                  <td>Kraid&apos;s Lair</td>
                  <td>Kraid&apos;s Lair</td>
                </tr>
                <tr>
                  <td>Ridley Mouth</td>
                  <td>Lower Norfair</td>
                </tr>
                <tr>
                  <td>3 Musketeers</td>
                  <td>Lower Norfair</td>
                </tr>
                <tr>
                  <td>Ocean</td>
                  <td>Wrecked Ship</td>
                </tr>
                <tr>
                  <td>Wrecked Ship Highway</td>
                  <td>Wrecked Ship</td>
                </tr>
                <tr>
                  <td>Aqueduct</td>
                  <td>East Maridia</td>
                </tr>
                <tr>
                  <td>East Maridia Highway</td>
                  <td>East Maridia</td>
                </tr>
                <tr>
                  <td>Tourian</td>
                  <td>Tourian</td>
                </tr>
              </tbody>
            </table>
        </p>
        </article>
      </div>
    </Wrapper>
  );
}
