import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'
import pageStyles from './page.module.css'
import { cn } from '@/lib/utils';
import Spacer from '@/app/components/spacer';
import Image from 'next/image';

const PortalRow = ({ name, area, image }: { image: string; name: string; area: string }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{area}</td>
      <td style={{textAlign: 'right' }}>
        <Image
          src={`/images/portals/${image}.png`}
          alt={name}
          width="584"
          height="448"
          style={{ maxWidth: "160px", height: "auto" }}
        />
      </td>
    </tr>
  );
}

export default function AreaInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Area Randomization</h1>
          <p>
            <strong>Area Randomization</strong> uses 32 specific doors as
            portals and randomizes the portal connections, producing a unique
            map layout.
          </p>
        </article>
        <article className={cn(styles.article, pageStyles.section_sep)}>
          <p>When traversing the map, there are 3 area types:</p>
          <ul>
            <li>
              <p>
                <strong>Hub</strong> areas have more than 2 portals:{" "}
                <u>Crateria</u>, <u>Green Brinstar</u>, <u>Red Brinstar</u>,{" "}
                <u>West Maridia</u>, <u>Upper Norfair</u>
              </p>
            </li>
            <li>
              <p>
                <strong>Duo</strong> areas have exactly 2 portals:{" "}
                <u>Wrecked Ship</u>, <u>East Maridia</u>, <u>Lower Norfair</u>
              </p>
            </li>
            <li>
              <p>
                <strong>Dead</strong> areas have exactly 1 portal:{" "}
                <u>Kraid&apos;s Lair</u>, <u>Crocomire&apos;s Lair</u>,{" "}
                <u>Tourian</u>
              </p>
            </li>
          </ul>
          <Spacer y={10} />
          <p>
            DASH randomly connects areas when{" "}
            <a href="/info/verified-fill">generating a seed</a>, but a few
            restrictions are put in place to make for a better racing
            experience:
          </p>
          <ul>
            <li>
              <p>At most one vanilla portal connection can be occur</p>
            </li>
            <li>
              <p>
                At most one connection to another portal in the same area can
                occur
              </p>
            </li>
            <li>
              <p>
                All three <strong>Duo</strong> areas cannot be connected to each
                other in a chain
              </p>
            </li>
            <li>
              <p>
                Two connected <strong>Duo</strong> areas cannot be connected to
                a <strong>Dead</strong> area
              </p>
            </li>
          </ul>
        </article>

        <article className={cn(styles.article, pageStyles.section_sep)}>
          <p>
            <table className={cn(styles.table, styles.mysteryTable)}>
              <thead>
                <tr>
                  <th>Portal</th>
                  <th>Area</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <PortalRow
                  name="Retro PBs"
                  area="Crateria"
                  image="crateria_sidehoppers"
                ></PortalRow>
                <PortalRow
                  name="G4"
                  area="Crateria"
                  image="crateria_green-pirates-shaft"
                ></PortalRow>
                <PortalRow
                  name="Kago"
                  area="Crateria"
                  image="crateria_lower-mushrooms"
                ></PortalRow>
                <PortalRow
                  name="Crateria Crabs"
                  area="Crateria"
                  image="crateria_kihunter-room"
                ></PortalRow>
                <PortalRow
                  name="Moat"
                  area="Crateria"
                  image="crateria_moat"
                ></PortalRow>
                <PortalRow
                  name="Green Elevator"
                  area="Green Brinstar"
                  image="green-brinstar_entrance"
                ></PortalRow>
                <PortalRow
                  name="Green Hills"
                  area="Green Brinstar"
                  image="green-brinstar_green-hill-zone"
                ></PortalRow>
                <PortalRow
                  name="Noob Bridge"
                  area="Green Brinstar"
                  image="green-brinstar_exit"
                ></PortalRow>
                <PortalRow
                  name="Red Elevator"
                  area="Red Brinstar"
                  image="red-brinstar_top"
                ></PortalRow>
                <PortalRow
                  name="Maridia Escape"
                  area="Red Brinstar"
                  image="red-brinstar_maridia-escape"
                ></PortalRow>
                <PortalRow
                  name="Red Tower"
                  area="Red Brinstar"
                  image="red-brinstar_red-tower"
                ></PortalRow>
                <PortalRow
                  name="Maridia Tube"
                  area="Red Brinstar"
                  image="red-brinstar_maridia-tube"
                ></PortalRow>
                <PortalRow
                  name="Red Tower to Maridia Map"
                  area="Red Brinstar"
                  image="red_tower_to_maridia_map"
                ></PortalRow>
                <PortalRow
                  name="Red Tower to Kraid"
                  area="Red Brinstar"
                  image="red_tower_to_kraid"
                ></PortalRow>
                <PortalRow
                  name="Red Fish"
                  area="West Maridia"
                  image="red_fish"
                ></PortalRow>
                <PortalRow
                  name="Pre Aqueduct"
                  area="West Maridia"
                  image="west-maridia_crab-shaft"
                ></PortalRow>
                <PortalRow
                  name="Main Street"
                  area="West Maridia"
                  image="west-maridia_main-street"
                ></PortalRow>
                <PortalRow
                  name="Maridia Map Station"
                  area="West Maridia"
                  image="west-maridia_crab-hole"
                ></PortalRow>
                <PortalRow
                  name="Business Center Left"
                  area="Upper Norfair"
                  image="upper-norfair_entrance"
                ></PortalRow>
                <PortalRow
                  name="Business Center Right"
                  area="Upper Norfair"
                  image="upper-norfair_kraid-entrance"
                ></PortalRow>
                <PortalRow
                  name="Crocomire Entry"
                  area="Upper Norfair"
                  image="upper-norfair_crocomire-entrance"
                ></PortalRow>
                <PortalRow
                  name="Single Chamber"
                  area="Upper Norfair"
                  image="upper-norfair_lower-norfair-escape"
                ></PortalRow>
                <PortalRow
                  name="Kronic Boost"
                  area="Upper Norfair"
                  image="upper-norfair_kronic-boost"
                ></PortalRow>
                <PortalRow
                  name="Crocomire Exit"
                  area="Crocomire's Lair"
                  image="crocomire_crocomire"
                ></PortalRow>
                <PortalRow
                  name="Kraid's Lair"
                  area="Kraid's Lair"
                  image="kraid_kraid"
                ></PortalRow>
                <PortalRow
                  name="Ridley Mouth"
                  area="Lower Norfair"
                  image="lower-norfair_entrance"
                ></PortalRow>
                <PortalRow
                  name="3 Musketeers"
                  area="Lower Norfair"
                  image="lower-norfair_exit"
                ></PortalRow>
                <PortalRow
                  name="Ocean"
                  area="Wrecked Ship"
                  image="wrecked-ship_west-ocean"
                ></PortalRow>
                <PortalRow
                  name="Wrecked Ship Highway"
                  area="Wrecked Ship"
                  image="wrecked-ship_forgotten-highway"
                ></PortalRow>
                <PortalRow
                  name="Aqueduct"
                  area="East Maridia"
                  image="east-maridia_aqueduct"
                ></PortalRow>
                <PortalRow
                  name="East Maridia Highway"
                  area="East Maridia"
                  image="east-maridia_elevator"
                ></PortalRow>
                <PortalRow
                  name="Tourian"
                  area="Tourian"
                  image="tourian_tourian"
                ></PortalRow>
              </tbody>
            </table>
          </p>
        </article>
      </div>
    </Wrapper>
  );
}
