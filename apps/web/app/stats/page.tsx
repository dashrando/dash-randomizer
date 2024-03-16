"use client";

import styles from "./page.module.css";
import {
  isAreaEdge,
  isBossEdge,
  generateSeed,
} from "core/data";
import { useState } from "react";
import {
  computeCRC32,
  getItemProgression,
  getPreset,
  Graph,
  ItemLocation
} from "core";
import MajorItemTable from "./majors";
import ProgressionStats from "./progression";
import NoteworthyStats from "./noteworthy";
import AreaDoorTable, { Transition } from "./areas";

export type ItemProgression = ItemLocation[];

export type Params = {
  gameMode: string;
  logic: string;
  startSeed: number;
  numSeeds: number;
};

type SeedStatus = {
  progression: ItemProgression[];
  bosses: Transition[];
  areas: Transition[];
  totalTime: number;
};

function getHash(status: SeedStatus) {
  const encoder = new TextEncoder();
  const data = encoder.encode(
    JSON.stringify(status.progression) +
    JSON.stringify(status.bosses) + 
    JSON.stringify(status.areas));
  return computeCRC32(data).toString(16).toUpperCase();
}

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
            logic: value.logic,
            startSeed: value.startSeed,
            numSeeds: value.numSeeds,
          })
        }
      >
        <option value="chozo">Chozo</option>
        <option value="chozo_bozo">Chozo Bozo</option>
        <option value="sgl23">SGL23 - Full - Boss+Area</option>
        <option value="recall_area_mm">Recall - M/M - Boss+Area</option>
        <option value="standard_mm">Standard - Major / Minor</option>
        <option value="standard_full">Standard - Full</option>
        <option value="recall_mm">Recall - Major / Minor</option>
        <option value="recall_full">Recall - Full</option>
      </select>
      <select
        name="logic"
        id="logic"
        className={styles.mode_selector}
        value={value.logic}
        onChange={(e) =>
          update({
            gameMode: value.gameMode,
            logic: e.target.value,
            startSeed: value.startSeed,
            numSeeds: value.numSeeds
          })
        }
      >
        <option value="normal">Normal Logic</option>
        <option value="relaxed">Relaxed Logic</option>
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
            logic: value.logic,
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
            logic: value.logic,
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
    gameMode: "chozo",
    logic: "normal",
    startSeed: 1,
    numSeeds: 100,
  });
  const [panel, setPanel] = useState("majors");
  const [status, setStatus] = useState<SeedStatus>({
    progression: [],
    bosses: [],
    areas: [],
    totalTime: 1,
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
    const { gameMode, logic } = params;
    const preset = getPreset(gameMode);

    if (preset == undefined) {
      throw new Error(`Unknown preset: ${gameMode}`);
    }

    const progression: ItemProgression[] = [];
    let bosses: Transition[] = [];
    let areas: Transition[] = [];
    const start = Date.now();

    const getAreaTransitions = (graph: Graph) => {
      const graphAreas: Transition[] = [];
      graph
        .filter((n) => isAreaEdge(n))
        .forEach((n) => {
          graphAreas.push({
            from: n.from.name.slice(),
            to: n.to.name.slice(),
          });
        });
      return graphAreas;
    };

    const getBossTransitions = (graph: Graph) => {
      const graphBosses: Transition[] = [];
      graph
        .filter((n) => isBossEdge(n))
        .forEach((n) => {
          graphBosses.push({
            from: n.from.name.slice(),
            to: n.to.name.slice(),
          });
        });
      return graphBosses;
    };

    const options = preset.options;
    options.RelaxedLogic = logic == "relaxed";

    for (let i = startSeed; i <= endSeed; i++) {
      try {
        const graph = generateSeed(i, preset.settings, options);
        progression.push(getItemProgression(graph, preset.settings));
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
      };
    });
  };

  const clearResults = () => {
    setStatus({
      progression: [],
      bosses: [],
      areas: [],
      totalTime: 1,
    });
  };

  const updateParams = (newParams: Params) => {
    if (newParams.gameMode != params.gameMode) {
      clearResults();
    }
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
              ).toFixed(1)}ms avg] ${getHash(status)}`}
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
          <MajorItemTable itemProgression={status.progression} preset={params.gameMode}/>
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
