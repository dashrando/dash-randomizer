"use client";

import styles from "./page.module.css";
import { Item } from "@/../../packages/core/lib/items";
import { getLocations, Location } from "@/../../packages/core/lib/locations";
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
import MajorItemTable from "./majors";

export type ItemLocation = {
  location: Location;
  item: any;
};

export type ItemProgression = ItemLocation[];

export default function StatsPage() {
  const [itemProgression, setItemProgression] = useState(
    [] as ItemProgression[]
  );
  const [status, setStatus] = useState("");
  const [startSeed, setStartSeed] = useState(1);
  const [endSeed, setEndSeed] = useState(100);
  const [gameMode, setGameMode] = useState("rm");
  const [panel, setPanel] = useState("majors");

  const generateSeeds = () => {
    const progression: ItemProgression[] = [];
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
      const log: ItemLocation[] = [];
      verifyItemProgression(mode.nodes, log);
      progression.push(log);
    }

    const delta = Date.now() - start;
    setItemProgression(progression);

    const num = progression.length;
    const avg = (delta / num).toFixed(1);
    setStatus(`${num} seeds ${delta}ms [ ${avg}ms avg ]`);
  };

  const clearResults = () => {
    setItemProgression([] as ItemProgression[]);
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
        <span id="action_status">{status}</span>
        <span id="panels" className={styles.panel_selector}>
          <label htmlFor="panel_selection">Panel:</label>
          <select
            name="panel_seletion"
            id="panel_selection"
            value={panel}
            onChange={(e) => setPanel(e.target.value)}
          >
            <option value="majors">Majors</option>
            <option value="progression">Progression</option>
            <option value="noteworthy">Noteworthy</option>
          </select>
        </span>
      </div>

      <div id="stats_panel" className={styles.stats_panel}>
        {panel == "majors" && (
          <MajorItemTable itemProgression={itemProgression} />
        )}
      </div>
    </div>
  );
}
