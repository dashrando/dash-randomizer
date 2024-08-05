import { Wrapper } from '@/app/components/wrapper'
import styles from '../info.module.css'
import pageStyles from "./page.module.css"

export default function SurpriseInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Surprise Bosses</h1>
          <p>
            <strong>Surprise</strong> bosses allows any boss to be at any
            location <u>including duplicates</u>. Defeating a boss opens access
            to the area in which it is placed (example: Kraid&apos;s etank will
            be accessible after defeating whatever boss is in Kraid&apos;s
            Lair). At least one boss will not be at its vanilla location.
          </p>
          <p>
            Because <strong>Boss Surprise</strong> can introduce duplicates of
            bosses, it is possible that the number of item locations can change
            based on the number of Phantoons in the game. This is because
            Phantoon does not have an item location connected directly to the
            boss room. For example, having two Phantoons in a seed will result
            in 99 item locations instead of the vanilla 100 locations. With that
            in mind, the number of item locations are as follows:
          </p>

          <p>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>0 Phantoons</td>
                  <td>=</td>
                  <td>101 item locations</td>
                </tr>
                <tr>
                  <td>1 Phantoon </td>
                  <td>=</td>
                  <td>100 item locations</td>
                </tr>
                <tr>
                  <td>2 Phantoons </td>
                  <td>=</td>
                  <td>99 item locations</td>
                </tr>
                <tr>
                  <td>3 Phantoons </td>
                  <td>=</td>
                  <td>98 item locations</td>
                </tr>
                <tr>
                  <td>4 Phantoons </td>
                  <td>=</td>
                  <td>97 item locations</td>
                </tr>
              </tbody>
            </table>
          </p>
          <hr />
          <p>
            When using the <strong>Full</strong> Item Split, the potential impact is reduced
            because only minor items are randomly added or removed as needed to
            account for the different number of item locations.
          </p>
          <hr />
          <p>
            For <strong>Major / Minor </strong>Item Split, the item locations added/removed are
            major item locations. First it considers if extra DASH items (double
            jump, etc.) are included. If so, they can fill in an extra major
            item location in the 0 Phantoons case. Note that under normal
            circumstances, Reserve Tanks and Energy Tanks are dropped when extra
            DASH items are included, which can also play into the items in the
            major pool.
          </p>

          <p>
            If there are no extra DASH items, here is the breakdown of how the
            major item pool changes based on the different number of Phantoons:
          </p>

          <p>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td className={pageStyles.col_a}>0 Phantoons</td>
                  <td className={pageStyles.col_a}>101 locations</td>
                  <td>1 Energy Tank added</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>1 Phantoon</td>
                  <td className={pageStyles.col_a}>100 locations</td>
                  <td>No Change</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>2 Phantoons </td>
                  <td className={pageStyles.col_a}>99 locations</td>
                  <td>1 Reserve Tank removed</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>3 Phantoons</td>
                  <td className={pageStyles.col_a}>98 locations</td>
                  <td>2 Reserve Tanks removed</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>4 Phantoons </td>
                  <td className={pageStyles.col_a}>97 locations</td>
                  <td>2 Reserve Tanks & 1 Energy Tank removed</td>
                </tr>
              </tbody>
            </table>
          </p>

          <p>
              <u>NOTE</u>: All items in the Major Item pool can be placed at any major
              item location, not just at boss locations. This means that when
              there are 0 Phantoons in a seed, the extra energy tank
              can appear at any major location, not just in the boss room
              locations.
          </p>
          <hr />
          <p>
            For <strong>Chozo</strong> Item Split, the item locations are chozo item locations.
            There are normally 25 chozo item locations but that is also impacted
            by the number of Phantoons. Extra DASH items (Double Jump, etc.) are never placed at chozo item
            locations.
          </p>

          <p>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td className={pageStyles.col_a}>0 Phantoons</td>
                  <td className={pageStyles.col_a}>26 locations</td>
                  <td className={pageStyles.col_c}>1 Extra Chozo Energy Tank added (4 total)</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>1 Phantoon</td>
                  <td className={pageStyles.col_a}>25 locations</td>
                  <td className={pageStyles.col_c}>No Change</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>2 Phantoons </td>
                  <td className={pageStyles.col_a}>24 locations</td>
                  <td className={pageStyles.col_c}>Chozo Reserve placed at non-chozo location</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>3 Phantoons</td>
                  <td className={pageStyles.col_a}>23 locations</td>
                  <td className={pageStyles.col_c}>Chozo Reserve and 1 Chozo Missile
            Pack placed at non-chozo locations</td>
                </tr>
                <tr>
                  <td className={pageStyles.col_a}>4 Phantoons </td>
                  <td className={pageStyles.col_a}>22 locations</td>
                  <td className={pageStyles.col_c}>Chozo Reserve, 1 Chozo Missile Pack, and 1 Chozo Super 
            Pack placed at non-chozo locations</td>
                </tr>
              </tbody>
            </table>
          </p>

          <p>
            <u>NOTE</u>: We recognize that removing the missile pack and super missile
            pack for the 3+ Phantoon cases technically makes it required to
            gather non-Chozo minor items to finish the game due to the need to
            break Mother Brain’s glass. We chose this over moving other
            “traditional” major items out of the Chozo Item pool. We are open to
            player feedback about potential changes to this choice in the
            future.
          </p>
        </article>
      </div>
    </Wrapper>
  );
}
