import { Wrapper } from "@/app/components/wrapper";
import styles from "../info.module.css";

export default function ClassicInfoPage() {
  return (
    <Wrapper>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <article className={styles.article}>
          <h1 className={styles.headline}>DASH: Classic</h1>
          <p>
            The original version of the <strong>DASH Randomizer</strong>{" "}
            generated one type of seed. We wanted to experiment with adding 
            additional utility to certain items and opening up some hard gated
            locations.
          </p>
          <p>
            As an additional wrinkle, these updates were not taken into account
            by the seed generation logic. The intent was to reduce linearity in
            seeds and let players make more decisions when playing.
          </p>
          <p>
            The <strong>DASH: Classic</strong> preset is maintained to allow for
            the generation of seeds following the original vision of that mode.
            The following is a breakdown of the changes:
          </p>
          <p>
            <ul>
              <li>
                Samus begins the game with a Starter Charge Beam which does the
                same damage as uncharged shots
              </li>
              <li>
                Gravity Suit provides partial damage reduction in heated rooms
              </li>
              <li>
                Spazer Beam can be used to access the Waterway Energy Tank
                location and traverse through Botwoon Hallway
              </li>
              <li>
                Bombs can be used to access the Wrecked Ship Reserve Tank
                location
              </li>
            </ul>
          </p>
        </article>
      </div>
    </Wrapper>
  );
}
