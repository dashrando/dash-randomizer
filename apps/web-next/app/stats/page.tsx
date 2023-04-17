"use client";

import "./page.module.css";
import { Item } from "../../../../packages/core/lib/items";
import { getLocations } from "../../../../packages/core/lib/locations";
import ModeRecall from "../../../../packages/core/lib/modes/modeRecall";
import Loadout from "../../../../packages/core/lib/loadout";
import { useState } from "react";

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

export function MajorItemHeader(props: any) {
  return (
    <tr>
      <th>Location</th>
      {columns.map((c) => (
        <th>{c.header}</th>
      ))}
    </tr>
  );
}

export function MajorItemRow({ name = "" }: { name: string }) {
  return (
    <tr>
      <td>{name}</td>
    </tr>
  );
}

export default function StatsPage() {
  const [rows, setRows] = useState([] as RowData[]);

  const generateSeeds = () => {
    const temp: RowData[] = [];
    temp.push({ locationName: "a", itemTypes: [] });
    temp.push({ locationName: "b", itemTypes: [] });
    setRows(temp);
  };

  return (
    <div id="stats">
      <label htmlFor="game_mode">Mode:</label>
      <select name="game_mode" id="game_mode">
        <option value="sm">Standard - Major / Minor</option>
        <option value="sf">Standard - Full</option>
        <option value="rm" selected>
          Recall - Major / Minor
        </option>
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
        value="1"
      />

      <label htmlFor="end_seed">End</label>
      <input
        name="end_seed"
        id="end_seed"
        type="number"
        min="1"
        max="999999"
        step="100"
        value="1"
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
        <select name="panel_seletion" id="panel_selection">
          <option value="majors">Majors</option>
          <option value="minors">Minors</option>
          <option value="progression">Progression</option>
          <option value="noteworthy">Noteworthy</option>
        </select>
      </span>

      <div id="stats_panel">
        <table id="majorItemPlacement">
          <MajorItemHeader />
          {rows.map((r) => (
            <MajorItemRow key={r.locationName} name={r.locationName} />
          ))}
        </table>
      </div>
    </div>
  );
}
