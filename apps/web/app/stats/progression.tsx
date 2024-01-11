"use client";

import styles from "./progression.module.css";
import { ItemProgression } from "./page";
import { Item } from "core/data";
import { ItemLocation } from "core";

export default function ProgressionStats({
  itemProgression,
}: {
  itemProgression: ItemProgression[];
}) {
  let numSeeds = itemProgression.length;
  let firstSuper = itemProgression.map((p) =>
    p.find((c) => c.itemType == Item.Super)
  );
  let firstPB = itemProgression.map((p) =>
    p.find((c) => c.itemType == Item.PowerBomb)
  );
  const countUniqueLocations = (itemLocations: ItemLocation[]) => {
    let unique: { [key: string]: number } = {};
    itemLocations.forEach((i) => {
      if (unique.hasOwnProperty(i.locationName)) {
        unique[i.locationName] += 1;
      } else {
        unique[i.locationName] = 1;
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
      <p className={styles.header}>First Super</p>
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
      <p className={styles.header}>First Power Bomb</p>
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
