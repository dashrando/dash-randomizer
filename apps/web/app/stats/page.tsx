"use client";

import styles from "./page.module.css";
import {
  isAreaEdge,
  isBossEdge,
  Location,
  generateSeed
} from "core/data";
import { useState } from "react";
import { getItemNodes, getPreset } from "core";
import MajorItemTable from "./majors";
import ProgressionStats from "./progression";
import NoteworthyStats from "./noteworthy";
import AreaDoorTable, { Transition } from "./areas";

export type ItemLocation = {
  location: Location;
  item: any;
};

export type ItemProgression = ItemLocation[];

export type Params = {
  gameMode: string;
  startSeed: number;
  numSeeds: number;
};

type SeedStatus = {
  progression: ItemProgression[];
  bosses: Transition[];
  areas: Transition[];
  totalTime: number;
  attempts: number;
};

const Parameters = ({ value, update }: { value: Params; update: any }) => {
  return (
    <>
      <select
        name="game_mode"
        id="game_mode"
        className={styles.mode_selector}
        value={value.gameMode}
        onChange={(e) =>
          update({
            gameMode: e.target.value,
            startSeed: value.startSeed,
            numSeeds: value.numSeeds,
          })
        }
      >
        <option value="sgl23">SGL23 - Full - Boss+Area</option>
        <option value="recall_area_mm">Recall - M/M - Boss+Area</option>
        <option value="standard_mm">Standard - Major / Minor</option>
        <option value="standard_full">Standard - Full</option>
        <option value="recall_mm">Recall - Major / Minor</option>
        <option value="recall_full">Recall - Full</option>
      </select>

      <label htmlFor="start_seed" style={{ paddingRight: '4px' }}>Start</label>
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
            numSeeds: value.numSeeds,
          })
        }
      />

      <label htmlFor="num_seeds" style={{ padding: '0px 4px' }}>Count</label>
      <input
        name="num_seeds"
        id="num_seeds"
        type="number"
        min="1"
        max="999999"
        step="100"
        value={value.numSeeds}
        onChange={(e) =>
          update({
            gameMode: value.gameMode,
            startSeed: value.startSeed,
            numSeeds: e.target.valueAsNumber,
          })
        }
      />
    </>
  );
};

export default function StatsPage() {
  const [params, setParams] = useState({
    gameMode: "sgl23",
    startSeed: 1,
    numSeeds: 100,
  });
  const [panel, setPanel] = useState("majors");
  const [status, setStatus] = useState<SeedStatus>({
    progression: [],
    bosses: [],
    areas: [],
    totalTime: 1,
    attempts: 0,
  });

  const generateSeeds = () => {
    const { startSeed, numSeeds } = params;
    const endSeed = startSeed + numSeeds - 1;
    clearResults();
    for (let i = startSeed; i <= endSeed; i += 100) {
      generateStep(i, Math.min(endSeed, i + 99));
    }
  };

  const generateStep = async (start: number, end: number) => {
    generateGraphFill(start, end);
  };

  const generateGraphFill = (startSeed: number, endSeed: number) => {
    const { gameMode } = params;
    const preset = getPreset(gameMode);

    if (preset == undefined) {
      throw new Error(`Unknown preset: ${gameMode}`);
    }

    let totalAttempts = 0;
    const progression: ItemProgression[] = [];
    let bosses: Transition[] = [];
    let areas: Transition[] = [];
    const start = Date.now();

    const getAreaTransitions = (graph: any) => {
      const graphAreas: Transition[] = [];
      graph
        .filter((n: any) => isAreaEdge(n))
        .forEach((n: any) => {
          graphAreas.push({
            from: n.from.name.slice(),
            to: n.to.name.slice(),
          });
        });
      return graphAreas;
    };

    const getBossTransitions = (graph: any) => {
      const graphBosses: Transition[] = [];
      graph
        .filter((n: any) => isBossEdge(n))
        .forEach((n: any) => {
          graphBosses.push({
            from: n.from.name.slice(),
            to: n.to.name.slice(),
          });
        });
      return graphBosses;
    };

    for (let i = startSeed; i <= endSeed; i++) {
      try {
        const graph = generateSeed(i, preset.settings);
        progression.push(getItemNodes(graph));
        bosses = bosses.concat(getBossTransitions(graph));
        areas = areas.concat(getAreaTransitions(graph));
      } catch (e) {
        console.log(e);
        continue;
      }
    }

    const delta = Date.now() - start;
    setStatus((current: SeedStatus) => {
      return {
        progression: current.progression.concat(progression),
        bosses: current.bosses.concat(bosses),
        areas: current.areas.concat(areas),
        totalTime: current.totalTime + delta,
        attempts: current.attempts + totalAttempts,
      };
    });
  };

  const clearResults = () => {
    setStatus({
      progression: [],
      bosses: [],
      areas: [],
      totalTime: 1,
      attempts: 0,
    });
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
        <span id="action_status" style={{ paddingLeft: '8px' }}>
          {status.progression.length <= 0
            ? ""
            : `${status.progression.length} seeds ${status.totalTime}ms [ ${(
                status.totalTime / status.progression.length
              ).toFixed(1)}ms avg] [avg attempts ${(
                status.attempts / status.progression.length
              ).toFixed(1)}]`}
        </span>
        <span id="right_side" className={styles.right_side}>
          <span className={styles.panel_selector}>
            <label htmlFor="panel_selection">Panel:</label>
            <select
              name="panel_seletion"
              id="panel_selection"
              value={panel}
              onChange={(e) => setPanel(e.target.value)}
            >
              <option value="majors">Majors</option>
              <option value="areas">Areas</option>
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
        {panel == "areas" && (
          <AreaDoorTable areas={status.areas} bosses={status.bosses} seeds={status.progression.length} />
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
