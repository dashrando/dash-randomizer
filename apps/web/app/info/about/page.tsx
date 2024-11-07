import { Wrapper } from "@/app/components/wrapper";
import styles from "../info.module.css";

export default function AboutInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>About DASH</h1>
          <p>
            <strong>DASH</strong> is an item randomizer for the classic video
            game Super Metroid with a specific focus of achieving competitive
            balance for racing. At the time of inception, our team was excited
            about the growth in popularity of racing Super Metroid randomizer
            seeds but felt that matches were too <em>swingy</em> due to the hard
            gating requirements of certain items and that clear metas were
            forming. With DASH, we want to experiment with increased options to
            complete seeds given the wide range of skill in the community.
          </p>
          <h2>Credits</h2>
          <p>
            DASH is actively maintained by <code>Kipp</code>,{" "}
            <code>MassHesteria</code>, <code>cassidymoen</code>,{" "}
            <code>kupppo</code>, <code>PapaSchmo</code>, and <code>derp</code>
          </p>
          <p>
            Initial ROM patches for <strong>DASH: Classic</strong> were
            developed by <code>Smiley</code>
          </p>
          <p>
            DASH was originally based on the{" "}
            <a href="https://itemrando.supermetroid.run/">
              Super Metroid Item Randomizer
            </a>{" "}
            developed by <code>Total</code> and featured in the 2017 Super Metroid Randomizer
            Tournament.
          </p>
        </article>
      </div>
    </Wrapper>
  );
}
