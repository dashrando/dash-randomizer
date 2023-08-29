"use client";

import styles from "./majors.module.css";
import { Item } from "core/data";
import { ItemProgression } from "./page";

const columns = [
  { header: "Heat Shield", item: Item.HeatShield },
  { header: "Varia", item: Item.Varia },
  { header: "Pressure Valve", item: Item.PressureValve },
  { header: "Gravity", item: Item.Gravity },
  { header: "Double Jump", item: Item.DoubleJump },
  { header: "Space Jump", item: Item.SpaceJump },
  { header: "Bombs", item: Item.Bombs },
  { header: "Speed", item: Item.Speed },
  { header: "Charge", item: Item.Charge },
  { header: "Beam Upgrade", item: Item.BeamUpgrade },
  { header: "Ice Beam", item: Item.Ice },
  { header: "HiJump Boots", item: Item.HJB },
  { header: "Wave Beam", item: Item.Wave },
  { header: "Spazer", item: Item.Spazer },
  { header: "Spring Ball", item: Item.SpringBall },
  { header: "Plasma", item: Item.Plasma },
  { header: "Grapple", item: Item.Grapple },
  { header: "Screw Attack", item: Item.ScrewAttack },
  { header: "Xray", item: Item.Xray },
  { header: "Morph", item: Item.Morph },
  { header: "Energy Tank", item: Item.EnergyTank },
  { header: "Reserve", item: Item.Reserve },
];

type MajorRowData = {
  locationName: string;
  itemTypes: any[];
};

function MajorItemHeader(props: any) {
  return (
    <tr id="header">
      <th key="location" className={styles.thin_border}>
        Location
      </th>
      {columns.map((c) => (
        <th key={c.header} className={styles.thin_border}>
          {c.header}
        </th>
      ))}
    </tr>
  );
}

function MajorItemRow({
  row = { locationName: "", itemTypes: [] },
  numSeeds = 1,
}: {
  row: MajorRowData;
  numSeeds: number;
}) {
  return (
    <tr className="majorItemRow">
      <td
        key={`location_${row.locationName}`}
        id="location"
        className={styles.thin_border}
      >
        {row.locationName}
      </td>
      {columns.map((c) => {
        const count = row.itemTypes.filter((t) => t == c.item).length;
        const percent = (count / numSeeds) * 100;
        let rowStyle = styles.thin_border;
        if (percent > 5) {
          rowStyle += " " + styles.tan_cell;
        } else if (percent == 0) {
          rowStyle += " " + styles.gray_cell;
        }
        return (
          <td key={`${c.header}_${row.locationName}`} className={rowStyle}>
            {percent.toFixed(2) + "%"}
          </td>
        );
      })}
    </tr>
  );
}

export default function MajorItemTable({
  itemProgression,
}: {
  itemProgression: ItemProgression[];
}) {
  const numSeeds = itemProgression.length;
  let majorLocations: MajorRowData[] = [];

  itemProgression.forEach((p) => {
    p.filter(c => c.item.isMajor).forEach((c) => {
      const locationEntry = majorLocations.find(
        (m) => m.locationName == c.location.name
      );
      if (locationEntry == undefined) {
        majorLocations.push({
          // copy string to avoid memory growth
          locationName: c.location.name.slice(),
          itemTypes: [c.item.type],
        });
      } else {
        locationEntry.itemTypes.push(c.item.type);
      }
    });
  });

  majorLocations = majorLocations.sort((a, b) => {
    return a.locationName.localeCompare(b.locationName);
  });

  return (
    <table className={styles.legacy_style}>
      <tbody>
        <MajorItemHeader />
        {majorLocations
          .filter((r) =>
            r.itemTypes.some((t) => columns.findIndex((c) => c.item == t) >= 0)
          )
          .map((r) => (
            <MajorItemRow key={r.locationName} row={r} numSeeds={numSeeds} />
          ))}
      </tbody>
    </table>
  );
}
