"use client";

import styles from "./progression.module.css";
import { ItemLocation, ItemProgression } from "./page";
import { Item } from "core/data";

export default function ProgressionStats({
  itemProgression,
}: {
  itemProgression: ItemProgression[];
}) {
  let numSeeds = itemProgression.length;
  let firstSuper = itemProgression.map((p) =>
    p.find((c) => c.item.type == Item.Super)
  );
  let firstPB = itemProgression.map((p) =>
    p.find((c) => c.item.type == Item.PowerBomb)
  );
  const countUniqueLocations = (itemLocations: ItemLocation[]) => {
    let unique: { [key: string]: number } = {};
    itemLocations.forEach((i) => {
      if (unique.hasOwnProperty(i.location.name)) {
        unique[i.location.name] += 1;
      } else {
        unique[i.location.name] = 1;
      }
    });

    return Object.entries(unique).sort((a, b) => {
      const [a_key, a_value] = a;
      const [b_key, b_value] = b;
      return b_value - a_value;
    });
  };
  const supers = countUniqueLocations(firstSuper as ItemLocation[]);
  const bombs = countUniqueLocations(firstPB as ItemLocation[]);

  return (
    <div>
      <p>First Super</p>
      <div className={styles.progression_table}>
        {supers.map((s) => {
          return (
            <div key={s[0]}>
              <span className={styles.location_cell}>{s[0]}</span>
              <span className={styles.count_cell}>
                {s[1]} ({((100 * s[1]) / numSeeds).toFixed(2)}%)
              </span>
            </div>
          );
        })}
      </div>
      <p>First PB</p>
      <div className={styles.progression_table}>
        {bombs.map((s) => {
          return (
            <div key={s[0]}>
              <span className={styles.location_cell}>{s[0]}</span>
              <span className={styles.count_cell}>
                {s[1]} ({((100 * s[1]) / numSeeds).toFixed(2)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
