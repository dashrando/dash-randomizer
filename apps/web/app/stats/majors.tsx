"use client";

import styles from "./majors.module.css";
import { Item } from "core/data";
import { ItemProgression } from "./page";
import { getAllPresets } from "core";
import { BeamMode, MajorDistributionMode } from "core/params";

type ColumnData = {
  header: string;
  item: number;
};

const allColumns: ColumnData[] = [
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
  { header: "Missile", item: Item.Missile },
  { header: "Super", item: Item.Super },
  { header: "Power Bomb", item: Item.PowerBomb },
];

type MajorRowData = {
  locationName: string;
  itemTypes: any[];
};

function getColumns(preset: string) {
  const presets = getAllPresets();
  const data = presets.find(p => p.tags.includes(preset));
  if (data == null) {
    return [...allColumns];
  }
  return [...allColumns].filter(c => {
    if (c.header == "Charge" &&
      data.settings.beamMode != BeamMode.Vanilla) {
      return false;
    }
    if (c.header == "Beam Upgrade" &&
      data.settings.beamMode == BeamMode.Vanilla) {
      return false;
    }
    if (c.header == "Heat Shield" &&
      !data.settings.extraItems.includes(Item.HeatShield)) {
      return false;
    }
    if (c.header == "Pressure Valve" &&
      !data.settings.extraItems.includes(Item.PressureValve)) {
      return false;
    }
    if (c.header == "Double Jump" &&
      !data.settings.extraItems.includes(Item.DoubleJump)) {
      return false;
    }
    if ((c.header == "Missile" || c.header == "Super" ||
      c.header == "Power Bomb") && data.settings.majorDistribution != MajorDistributionMode.Chozo) {
      return false;
    }
    return true;
  })
}

function MajorItemHeader({
  columns
}: {
  columns: ColumnData[];
}) {
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
  columns = [],
}: {
  row: MajorRowData;
  numSeeds: number;
  columns: ColumnData[];
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
  preset
}: {
  itemProgression: ItemProgression[];
  preset: string;
}) {
  const numSeeds = itemProgression.length;
  let majorLocations: MajorRowData[] = [];
  const columns = getColumns(preset);

  itemProgression.forEach((p) => {
    p.filter(c => c.isMajor).forEach((c) => {
      const locationEntry = majorLocations.find(
        (m) => m.locationName == c.locationName
      );
      if (locationEntry == undefined) {
        majorLocations.push({
          // copy string to avoid memory growth
          locationName: c.locationName.slice(),
          itemTypes: [c.itemType],
        });
      } else {
        locationEntry.itemTypes.push(c.itemType);
      }
    });
  });

  majorLocations = majorLocations.sort((a, b) => {
    return a.locationName.localeCompare(b.locationName);
  });

  return (
    <table className={styles.legacy_style}>
      <tbody>
        <MajorItemHeader columns={columns} />
        {majorLocations
          .filter((r) =>
            r.itemTypes.some((t) => columns.findIndex((c) => c.item == t) >= 0)
          )
          .map((r) => (
            <MajorItemRow key={r.locationName} row={r} numSeeds={numSeeds} columns={columns} />
          ))}
      </tbody>
    </table>
  );
}
