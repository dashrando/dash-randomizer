"use client";

import styles from "./page.module.css";
import { Item } from "@/../../packages/core/lib/items";
import { getLocations } from "@/../../packages/core/lib/locations";
import ModeRecall from "@/../../packages/core/lib/modes/modeRecall";
import ModeStandard from "@/../../packages/core/lib/modes/modeStandard";
import Loadout from "@/../../packages/core/lib/loadout";
import { useState } from "react";
import {
  getFullPrePool,
  getMajorMinorPrePool,
  isEmptyNode,
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

export default function StatsPage() {
  const [rows, setRows] = useState([] as RowData[]);
  const [status, setStatus] = useState("");
  const [startSeed, setStartSeed] = useState(1);
  const [endSeed, setEndSeed] = useState(100);
  const [numSeeds, setNumSeeds] = useState(0);
  const [gameMode, setGameMode] = useState("rm");

  const generateSeeds = () => {
    let itemProgression = [];
    const start = Date.now();
    for (let i = startSeed; i <= endSeed; i++) {
      let mode =
        gameMode[0] == "s"
          ? new ModeStandard(i, getLocations())
          : new ModeRecall(i, getLocations());

      const [prePool, canPlaceItem] =
        gameMode[1] == "m"
          ? [getMajorMinorPrePool, isValidMajorMinor]
          : [getFullPrePool, isEmptyNode];

      let initLoad = new Loadout();
      initLoad.add(Item.Charge);

      performVerifiedFill(
        i,
        mode.nodes,
        mode.itemPool,
        prePool,
        initLoad,
        canPlaceItem
      );
      let log: any[] = [];
      verifyItemProgression(mode.nodes, log);
      itemProgression.push(log);
    }
    const delta = Date.now() - start;

    let majorLocations: RowData[] = [];

    itemProgression.forEach((p) => {
      p.forEach((c) => {
        if (c.item.isMajor) {
          const locationEntry = majorLocations.find(
            (m) => m.locationName == c.location.name
          );
          if (locationEntry == undefined) {
            majorLocations.push({
              locationName: c.location.name,
              itemTypes: [c.item.type],
            });
          } else {
            locationEntry.itemTypes.push(c.item.type);
          }
        }
      });
    });

    majorLocations = majorLocations.sort((a, b) => {
      return a.locationName.localeCompare(b.locationName);
    });

    setRows(majorLocations);
    const localNumSeeds = endSeed - startSeed + 1;
    setNumSeeds(localNumSeeds);
    setStatus(
      localNumSeeds +
        " seeds " +
        delta +
        "ms [ " +
        (delta / localNumSeeds).toFixed(1) +
        "ms avg] " /*+
                  majorLocations.length +
                  " major locs with " +
                  uniqueMajors.length +
                  " unique major combos"*/
    );
  };

  const clearResults = () => {
    setRows([] as RowData[]);
    setStatus("");
  };

  return (
    <div id="stats">
      <div className={styles.stats_nav}>
        <label htmlFor="game_mode">Mode</label>
        <select
          name="game_mode"
          id="game_mode"
          value={gameMode}
          onChange={(e) => setGameMode(e.target.value)}
        >
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
          value={startSeed}
          onChange={(e) => setStartSeed(Number(e.target.value))}
        />

        <label htmlFor="end_seed">End</label>
        <input
          name="end_seed"
          id="end_seed"
          type="number"
          min="1"
          max="999999"
          step="100"
          value={endSeed}
          onChange={(e) => setEndSeed(Number(e.target.value))}
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
          onClick={() => clearResults()}
        />
        <span id="stats_status"></span>
        <span id="action_status">{status}</span>
        <span id="panels" className={styles.panel_selector}>
          <label htmlFor="panel_selection">Panel:</label>
          <select
            name="panel_seletion"
            id="panel_selection"
            defaultValue="majors"
          >
            <option value="majors">Majors</option>
            <option value="progression">Progression</option>
            <option value="noteworthy">Noteworthy</option>
          </select>
        </span>
      </div>

      <div id="stats_panel" className={styles.stats_panel}>
        <table className={styles.legacy_style}>
          <tbody>
            <MajorItemHeader />
            {rows
              .filter((r) =>
                r.itemTypes.some(
                  (t) => columns.findIndex((c) => c.item == t) >= 0
                )
              )
              .map((r) => (
                <MajorItemRow
                  key={r.locationName}
                  row={r}
                  numSeeds={numSeeds}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
