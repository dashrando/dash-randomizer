"use client";

import styles from "./page.module.css";
import { Item } from "@/../../packages/core/lib/items";
import { getLocations } from "@/../../packages/core/lib/locations";
import ModeRecall from "@/../../packages/core/lib/modes/modeRecall";
import Loadout from "@/../../packages/core/lib/loadout";
import { useState } from "react";
import {
  getMajorMinorPrePool,
  isValidMajorMinor,
  performVerifiedFill,
  verifyItemProgression,
} from "@/../../packages/core/lib/itemPlacement";

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

type RowData = {
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
  row: RowData;
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
        return (
          <td
            key={`${c.header}_${row.locationName}`}
            className={styles.thin_border}
          >
            {count / numSeeds}
          </td>
        );
      })}
    </tr>
  );
}

export default function StatsPage() {
  const [rows, setRows] = useState([] as RowData[]);

  const generateSeeds = () => {
    let mode = new ModeRecall(1, getLocations());
    let initLoad = new Loadout();
    performVerifiedFill(
      1,
      mode.nodes,
      mode.itemPool,
      getMajorMinorPrePool,
      initLoad,
      isValidMajorMinor
    );
    let log: any[] = [];
    verifyItemProgression(mode.nodes, log);
    const temp: RowData[] = log.map((l) => {
      const { item, location } = l;
      return { locationName: location.name, itemTypes: [item.type] };
    });

    setRows(temp);
  };

  return (
    <div id="stats">
      <label htmlFor="game_mode">Mode:</label>
      <select name="game_mode" id="game_mode" defaultValue="rm">
        <option value="sm">Standard - Major / Minor</option>
        <option value="sf">Standard - Full</option>
        <option value="rm">Recall - Major / Minor</option>
        <option value="rf">Recall - Full</option>
      </select>

      <label htmlFor="start_seed">Start</label>
      <input
        name="start_seed"
        id="start_seed"
        type="number"
        min="1"
        max="999999"
        step="100"
        defaultValue="1"
      />

      <label htmlFor="end_seed">End</label>
      <input
        name="end_seed"
        id="end_seed"
        type="number"
        min="1"
        max="999999"
        step="100"
        defaultValue="1"
      />
      <input
        type="button"
        value="Generate"
        id="gen_seeds"
        onClick={() => generateSeeds()}
      />
      <input
        type="button"
        value="Clear"
        id="clear_table"
        onClick={() => setRows([] as RowData[])}
      />
      <span id="stats_status"></span>
      <span id="action_status"></span>
      <span id="panels">
        <label htmlFor="panel_selection">Panel:</label>
        <select
          name="panel_seletion"
          id="panel_selection"
          defaultValue="majors"
        >
          <option value="majors">Majors</option>
          <option value="minors">Minors</option>
          <option value="progression">Progression</option>
          <option value="noteworthy">Noteworthy</option>
        </select>
      </span>

      <div id="stats_panel">
        <table>
          <tbody>
            <MajorItemHeader />
            {rows
              .filter((r) =>
                r.itemTypes.some(
                  (t) => columns.findIndex((c) => c.item == t) >= 0
                )
              )
              .map((r) => (
                <MajorItemRow key={r.locationName} row={r} numSeeds={1} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
