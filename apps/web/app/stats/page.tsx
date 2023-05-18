"use client";

import styles from "./page.module.css";
import { Item } from "@/../../packages/core/lib/items";
import { getLocations, Location } from "@/../../packages/core/lib/locations";
import ModeRecall from "@/../../packages/core/lib/modes/modeRecall";
import ModeStandard from "@/../../packages/core/lib/modes/modeStandard";
import Loadout from "@/../../packages/core/lib/loadout";
import { useState } from "react";
import { getSignature } from "core";
import { Buffer } from "buffer";
import {
  getFullPrePool,
  getMajorMinorPrePool,
  isEmptyNode,
  isValidMajorMinor,
  performVerifiedFill,
  verifyItemProgression,
} from "@/../../packages/core/lib/itemPlacement";
import MajorItemTable from "./majors";
import ProgressionStats from "./progression";
import NoteworthyStats from "./noteworthy";

export type ItemLocation = {
  location: Location;
  item: any;
};

export type ItemProgression = ItemLocation[];

export type Params = {
  gameMode: string;
  startSeed: number;
  endSeed: number;
};

const Parameters = ({ value, update }: { value: Params; update: any }) => {
  return (
    <>
      <label htmlFor="game_mode">Mode</label>
      <select
        name="game_mode"
        id="game_mode"
        value={value.gameMode}
        onChange={(e) =>
          update({
            gameMode: e.target.value,
            startSeed: value.startSeed,
            endSeed: value.endSeed,
          })
        }
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
        value={value.startSeed}
        onChange={(e) =>
          update({
            gameMode: value.gameMode,
            startSeed: e.target.valueAsNumber,
            endSeed: value.endSeed,
          })
        }
      />

      <label htmlFor="end_seed">End</label>
      <input
        name="end_seed"
        id="end_seed"
        type="number"
        min="1"
        max="999999"
        step="100"
        value={value.endSeed}
        onChange={(e) =>
          update({
            gameMode: value.gameMode,
            startSeed: value.startSeed,
            endSeed: e.target.valueAsNumber,
          })
        }
      />
    </>
  );
};

export default function StatsPage() {
  const [itemProgression, setItemProgression] = useState(
    [] as ItemProgression[]
  );
  const [params, setParams] = useState({
    gameMode: "rm",
    startSeed: 1,
    endSeed: 100,
  });
  const [panel, setPanel] = useState("majors");
  const [status, setStatus] = useState("");

  const generateSeeds = () => {
    const { gameMode, startSeed, endSeed } = params;
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
    getSignature(Buffer.from(JSON.stringify(progression))).then((s) =>
      console.log(s)
    );

    const num = progression.length;
    const avg = (delta / num).toFixed(1);
    setStatus(`${num} seeds ${delta}ms [ ${avg}ms avg ]`);
  };

  const clearResults = () => {
    setItemProgression([] as ItemProgression[]);
    setStatus("");
  };

  const updateParams = (newParams: Params) => {
    setParams(newParams);
  };

  return (
    <div id="stats">
      <div className={styles.stats_nav}>
        <Parameters value={params} update={updateParams} />
        <input
          type="button"
          value="Generate"
          id="gen_seeds"
          onClick={generateSeeds}
        />
        <input
          type="button"
          value="Clear"
          id="clear_table"
          onClick={clearResults}
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
        {panel == "progression" && (
          <ProgressionStats itemProgression={itemProgression} />
        )}
        {panel == "noteworthy" && (
          <NoteworthyStats itemProgression={itemProgression} />
        )}
      </div>
    </div>
  );
}
