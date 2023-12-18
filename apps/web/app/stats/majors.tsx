"use client";

import styles from "./majors.module.css";
import { Item } from "core/data";
import { ItemProgression } from "./page";
import { getAllPresets } from "core";
import { BeamMode, MajorDistributionMode } from "core/params";

type ColumnData = {
  header: string;
  itemType: number;
};

const allColumns: ColumnData[] = [
  { header: "Heat Shield", itemType: Item.HeatShield },
  { header: "Varia", itemType: Item.Varia },
  { header: "Pressure Valve", itemType: Item.PressureValve },
  { header: "Gravity", itemType: Item.Gravity },
  { header: "Double Jump", itemType: Item.DoubleJump },
  { header: "Space Jump", itemType: Item.SpaceJump },
  { header: "Bombs", itemType: Item.Bombs },
  { header: "Speed", itemType: Item.Speed },
  { header: "Charge", itemType: Item.Charge },
  { header: "Beam Upgrade", itemType: Item.BeamUpgrade },
  { header: "Ice Beam", itemType: Item.Ice },
  { header: "HiJump Boots", itemType: Item.HJB },
  { header: "Wave Beam", itemType: Item.Wave },
  { header: "Spazer", itemType: Item.Spazer },
  { header: "Spring Ball", itemType: Item.SpringBall },
  { header: "Plasma", itemType: Item.Plasma },
  { header: "Grapple", itemType: Item.Grapple },
  { header: "Screw Attack", itemType: Item.ScrewAttack },
  { header: "Xray", itemType: Item.Xray },
  { header: "Morph", itemType: Item.Morph },
  { header: "Energy Tank", itemType: Item.EnergyTank },
  { header: "Reserve", itemType: Item.Reserve },
  { header: "Missile", itemType: Item.Missile },
  { header: "Super", itemType: Item.Super },
  { header: "Power Bomb", itemType: Item.PowerBomb },
];

type MajorRowData = {
  locationName: string;
  itemTypes: number[];
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
        const count = row.itemTypes.filter((t) => t == c.itemType).length;
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
          .map((r) => (
            <MajorItemRow key={r.locationName} row={r} numSeeds={numSeeds} columns={columns} />
          ))}
      </tbody>
    </table>
  );
}
