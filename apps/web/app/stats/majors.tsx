"use client";

import styles from "./majors.module.css";
import { getAreaString, getLocations, Item, ItemNames } from "core/data";
import { decodeSeedFromString, getItemLocations } from "core";

type ColumnData = {
  name: string;
  type: number;
  isMajor: boolean;
  isDashItem: boolean;
};

const col = (name: string, type: number, isMajor = true, isDashItem = false) => {
  return {
    name,
    type,
    isMajor,
    isDashItem
  }
}

const allColumns: ColumnData[] = [
  col("Heat Shield", Item.HeatShield, true, true),
  col("Varia", Item.Varia),
  col("Pressure Valve", Item.PressureValve, true, true),
  col("Gravity", Item.Gravity),
  col("Double Jump", Item.DoubleJump, true, true),
  col("Space Jump", Item.SpaceJump),
  col("Bombs", Item.Bombs),
  col("Speed", Item.Speed),
  col("Charge", Item.Charge),
  col("Beam Upgrade", Item.BeamUpgrade, true, true),
  col("Ice Beam", Item.Ice),
  col("HiJump Boots", Item.HJB),
  col("Wave Beam", Item.Wave),
  col("Spazer", Item.Spazer),
  col("Spring Ball", Item.SpringBall),
  col("Plasma", Item.Plasma),
  col("Grapple", Item.Grapple),
  col("Screw Attack", Item.ScrewAttack),
  col("Xray", Item.Xray),
  col("Morph", Item.Morph),
  col("Energy Tank", Item.EnergyTank),
  col("Reserve", Item.Reserve),
  col("Missile", Item.Missile, false),
  col("Super", Item.Super, false),
  col("Power Bomb", Item.PowerBomb, false),
];

export default function MajorItemTable({
  encodedSeeds,
}: {
  encodedSeeds: string[];
}) {
  const ALL_ITEMS = Object.values(Item)
    .filter((i) => i > 0xc000)
    .map((i) => {
      return {
        type: i as number,
        name: ItemNames.get(i) as string
      }
    })
  const locations = getLocations().sort((a, b) => a.address - b.address);

  const itemCounts = locations.map((l) => {
    return {
      name: l.name,
      area: l.area,
      item: new Map(ALL_ITEMS.map((i) => [i.type, 0])),
      hasMajors: false,
      hasItems: false
    };
  });

  encodedSeeds.forEach((s) => {
    const { graph } = decodeSeedFromString(s)
    getItemLocations(graph, true).forEach((v, i) => {
      if (v.item === null) {
        return;
      }
      const curr = itemCounts[i].item.get(v.item.type);
      if (curr === undefined) {
        return;
      }
      itemCounts[i].item.set(v.item.type, curr + 1);
      itemCounts[i].hasItems = true;
      if (v.item.isMajor) {
        itemCounts[i].hasMajors = true;
      }
    });
  });

  const showDash = false, showMinors = false;
  const columns = allColumns.filter((i) => {
    if (!showMinors && !i.isMajor) {
      return false;
    }
    if (!showDash && i.isDashItem) {
      return false;
    }
    return true;
  })

  return (
    <table className={styles.majors}>
      <tbody>
        <tr>
          <th className={styles.location}>Location</th>
          <th className={styles.area}>Area</th>
          {columns.map((i) => {
            return <th key={i.name}>{i.name}</th>;
          })}
        </tr>
        {itemCounts.map((i) => {
          if (!showMinors && i.hasMajors === false) {
            return <></>
          }
          return (
            <tr key={i.name}>
              <td>{i.name}</td>
              <td>{getAreaString(i.area)}</td>
              {columns.map((j, k) => {
                const key = i.name + k.toString();
                const count = i.item.get(j.type) as number;
                if (count === 0) {
                  return <td key={key} className={styles.gray_cell}></td>;
                }

                const percent = (100 * count) / encodedSeeds.length;
                const cellColor = percent > 5 ? styles.tan_cell : "";
                return (
                  <td key={key} className={cellColor}>
                    {percent.toFixed(1)}%
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
