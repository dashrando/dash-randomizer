import { Metadata } from "next"
import { Wrapper } from "@/app/components/wrapper";
import styles from "../info.module.css";
import Spacer from "@/app/components/spacer";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

export const metadata: Metadata = {
  title: 'HUD - DASH Randomizer',
  description: 'Description of the custom HUD used in DASH seeds.',
}

export default function HUDInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>Heads Up Display</h1>
          <p>
            DASH uses a customized in-game HUD to provide extra information to players.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hud-full.png" alt="DASH HUD" loading="eager" className={styles.full_hud} />
            The mini-map is replaced with several indicators of which there are 4 sections.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hud-with-labels-2.png" alt="DASH HUD" loading="eager" className={styles.hud_with_labels} />
          </p>
          <Spacer y={8} />

          <h2 className={styles.title}>Area</h2>
          <p>
            The top left corner shows the current area in which Samus is located. This information is always visible but is especially useful in seeds with Area Randomization.
          </p>
          <Spacer y={12} />

          <h2 className={styles.title}>Remaining Items in Area</h2>
          <p>
            The top right corner shows both the number of remaining major items and the number of remaining energy tanks in the current area. This section is currently only visible when running <strong>Full</strong> Item Split seeds.
          </p>
          <Spacer y={12} />
          <h2 className={styles.title}>DASH Items</h2>

          <p>
            The bottom left corner shows whether any custom DASH Items have been collected and if that item is active.
            For example, collecting Double Jump will show this icon{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/double-jump.png" alt="Double Jump" loading="eager" className={styles.inline_dash_item} /> 
            but that icon will be grayed out if Space Jump is collected or has already been collected. This is also true
            for Heat Shield and Pressure Valve.
          </p>
          <p>
            The top leftmost DASH Item indicator{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/grav-heat-reduction.png" alt="Gravity Heat Reduction" loading="eager" className={styles.inline_dash_item} /> 
            {" "}is active if Gravity Suit has been collected and the Gravity Heat Reduction setting is enabled. On seeds where that
            settings is not enabled, the icon shows grayed out when Gravity Suit is collected. This can be very useful when running Mystery seeds.
          </p>
          <Spacer y={12} />

          <h2 id="charge-damage" className={styles.title}>Charge Damage</h2>
          <p>
            The bottom right corner shows the current amount of damage that a charged shot would do based on the beams equipped and charge upgrades collected. With Starter/Starter+ beam modes, the values starts at <code>20</code> and with Vanilla charge the value starts at <code>60</code>.
          </p>

        </article>
      </div>
    </Wrapper>
  );
}
