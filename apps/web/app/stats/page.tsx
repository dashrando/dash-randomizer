"use client";

import styles from "./page.module.css";
import { Item } from "@/../../packages/core/lib/items";
import { getLocations, Location } from "@/../../packages/core/lib/locations";
import ModeRecall from "@/../../packages/core/lib/modes/modeRecall";
import ModeStandard from "@/../../packages/core/lib/modes/modeStandard";
import Loadout from "@/../../packages/core/lib/loadout";
import { useState } from "react";
import { getItemNodes } from "core";
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
import { graphFill } from "@/../../packages/core/lib/graph/fill";
import { ClassicPreset } from "@/../../packages/core/lib/graph/data/classic/preset";
import { RecallPreset } from "@/../../packages/core/lib/graph/data/recall/preset";
import { loadGraph } from "@/../../packages/core/lib/graph/init";

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

type SeedStatus = {
  progression: ItemProgression[];
  totalTime: number;
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
  const [params, setParams] = useState({
    gameMode: "rm",
    startSeed: 1,
    endSeed: 100,
  });
  const [fill, setFill] = useState("graph");
  const [panel, setPanel] = useState("majors");
  const [status, setStatus] = useState<SeedStatus>({
    progression: [],
    totalTime: 1,
  });

  const generateSeeds = () => {
    const { startSeed, endSeed } = params;
    clearResults();
    for (let i = startSeed; i <= endSeed; i += 100) {
      generateStep(i, Math.min(endSeed, i + 99));
    }
  };

  const generateStep = async (start: number, end: number) => {
    if (fill == "graph") {
      generateGraphFill(start, end);
    } else {
      generateVerifiedFill(start, end);
    }
  };

  const generateGraphFill = (startSeed: number, endSeed: number) => {
    const { gameMode } = params;
    const progression: ItemProgression[] = [];
    const start = Date.now();

    for (let i = startSeed; i <= endSeed; i++) {
      const preset = gameMode[0] == "s" ? ClassicPreset : RecallPreset;
      const restrictType = gameMode[1] == "m";

      const { mapLayout, itemPoolParams, settings } = preset;
      const { majorDistribution } = itemPoolParams;
      const graph = loadGraph(i, mapLayout, majorDistribution.mode);
      graphFill(i, graph, itemPoolParams, settings, restrictType);

      progression.push(getItemNodes(graph));
    }

    const delta = Date.now() - start;
    setStatus((current: SeedStatus) => {
      return {
        progression: current.progression.concat(progression),
        totalTime: current.totalTime + delta,
      };
    });
  };

  const generateVerifiedFill = (startSeed: number, endSeed: number) => {
    const { gameMode } = params;
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
      if (gameMode[0] == "r") {
        initLoad.add(Item.Charge);
      }

      performVerifiedFill(
        i,
        mode.nodes,
        mode.itemPool,
        prePool,
        initLoad,
        canPlaceItem
      );
      const log: ItemLocation[] = [];
      verifyItemProgression(initLoad, mode.nodes, log);
      progression.push(log);
    }

    const delta = Date.now() - start;
    setStatus((current: SeedStatus) => {
      return {
        progression: current.progression.concat(progression),
        totalTime: current.totalTime + delta,
      };
    });
  };

  const clearResults = () => {
    setStatus({ progression: [], totalTime: 1 });
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
        <span id="action_status">
          {status.progression.length <= 0
            ? ""
            : `${status.progression.length} seeds ${status.totalTime}ms [ ${
                status.totalTime / status.progression.length
              }ms avg]`}
        </span>
        <span id="right_side" className={styles.right_side}>
          <span className={styles.fill_selector}>
            <label htmlFor="fill_selection">Fill:</label>
            <select
              name="fill_seletion"
              id="fill_selection"
              value={fill}
              onChange={(e) => setFill(e.target.value)}
            >
              <option value="graph">Graph</option>
              <option value="verified">Verified</option>
            </select>
          </span>
          <span className={styles.panel_selector}>
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
        </span>
      </div>
      <div id="stats_panel" className={styles.stats_panel}>
        {panel == "majors" && (
          <MajorItemTable itemProgression={status.progression} />
        )}
        {panel == "progression" && (
          <ProgressionStats itemProgression={status.progression} />
        )}
        {panel == "noteworthy" && (
          <NoteworthyStats itemProgression={status.progression} />
        )}
      </div>
    </div>
  );
}
