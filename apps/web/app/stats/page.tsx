"use client";

import styles from "./page.module.css";
import { generateSeed } from "core/data";
import { useState } from "react";
import {
  computeCRC32,
  encodeSeed,
  getPreset,
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

function getHash(encodedSeeds: string[]) {
  const combined = encodedSeeds.join('');
  const bytes = Buffer.from(combined, 'base64')
  return computeCRC32(bytes).toString(16).toUpperCase();
}

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "20%",
        height: "16px",
        position: "relative",
        top: "3px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "green",
          transition: "width 0.2s ease",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

const Parameters = ({ value, update, loading }: { value: Params; update: any, loading: boolean }) => {
  return (
    <>
      <select
        name="game_mode"
        id="game_mode"
        className={styles.mode_selector}
        value={value.gameMode}
        disabled={loading}
        onChange={(e) =>
          update({
            gameMode: e.target.value,
            logic: value.logic,
            startSeed: value.startSeed,
            numSeeds: value.numSeeds,
          })
        }
      >
        <option value="mm_area_shuffled">M/M Area Shuffled</option>
        <option value="sgl24">SGL24 - M/M - Boss Surprise</option>
        <option value="spring24">Spring 24 - Chozo Area</option>
        <option value="chozo_surprise">Chozo Surprise</option>
        <option value="surprise_surprise">Surprise Surprise</option>
        <option value="mm_area_surprise">MM Area Surprise</option>
        <option value="mm_surprise">MM Surprise</option>
        <option value="chozo">Chozo</option>
        <option value="chozo_bozo">Chozo Bozo</option>
        <option value="sgl23">SGL23 - Full - Boss+Area</option>
        <option value="standard_mm">Standard - Major / Minor</option>
        <option value="standard_full">Standard - Full</option>
        <option value="recall_mm">Recall - Major / Minor</option>
      </select>
      <select
        name="logic"
        id="logic"
        className={styles.mode_selector}
        value={value.logic}
        disabled={loading}
        onChange={(e) =>
          update({
            gameMode: value.gameMode,
            logic: e.target.value,
            startSeed: value.startSeed,
            numSeeds: value.numSeeds
          })
        }
      >
        <option value="standard">Standard Logic</option>
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
        disabled={loading}
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
        disabled={loading}
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
    gameMode: "spring24",
    logic: "standard",
    startSeed: 1,
    numSeeds: 100,
  });
  const [panel, setPanel] = useState("majors");
  const [encodedSeeds, setEncodedSeeds] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [generateTimes, setGenerateTimes] = useState({
    start: 0,
    end: 0
  });

  const generateSeeds = async () => {
    const { gameMode, logic, startSeed, numSeeds } = params;
    const endSeed = startSeed + numSeeds - 1;

    const preset = getPreset(gameMode);
    if (preset == undefined) {
      throw new Error(`Unknown preset: ${gameMode}`);
    }

    clearResults();
    setGenerateTimes({ start: Date.now(), end: 0 });
    await new Promise((resolve) => setTimeout(resolve, 50));

    const encoded: string[] = [];
    const { settings, options } = preset;
    options.RelaxedLogic = logic == "relaxed";

    const processChunk = async (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        const graph = generateSeed(i, settings, options);
        encoded.push(encodeSeed({ seed: i, settings, options }, graph));
      }
      return end + 1
    }

    let i = startSeed;
    while (i < endSeed) {
      i = await processChunk(i, Math.min(i + 20, endSeed))
      setProgress(100 * ((i - startSeed + 1) / numSeeds))
      // Yield control to the event loop to avoid freezing the UI
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
    updateResults(encoded);
  };

  const clearResults = () => {
    setEncodedSeeds([]);
    setGenerateTimes({ start: 0, end: 0 });
    setProgress(0)
  };

  const updateResults = (encoded: string[]) => {
    setEncodedSeeds(encoded);
    setGenerateTimes((current) => {
      return {
        start: current.start,
        end: Date.now()
      }
    });
  }

  const updateParams = (newParams: Params) => {
    if (newParams.gameMode != params.gameMode) {
      clearResults();
    }
    setParams(newParams);
  };

  const totalTime = generateTimes.end - generateTimes.start;
  const loading = totalTime < 0 ? true : false;
  const seedCount = encodedSeeds.length;
  const n1 = (n: number) => n.toFixed(1);

  return (
    <div id="stats">
      <div className={styles.stats_nav}>
        <Parameters value={params} update={updateParams} loading={loading} />
        <input
          type="button"
          value="Generate"
          id="gen_seeds"
          onClick={generateSeeds}
          disabled={loading}
        />
        <input
          type="button"
          value="Clear"
          id="clear_table"
          onClick={clearResults}
          disabled={loading}
        />
        <div id="action_status" style={{ paddingLeft: "8px", display: 'inline-block', width: '50%' }}>
          {loading ? (
            <ProgressBar progress={progress} />
          ) : totalTime === 0 ? '' : (
            `${seedCount} seeds ${totalTime}ms [ ${n1(totalTime / seedCount)}
              ms avg] ${getHash(encodedSeeds)}`
          )}
        </div>
        <span id="right_side" className={styles.right_side}>
          <span className={styles.panel_selector}>
            <label htmlFor="panel_selection">Panel:</label>
            <select
              name="panel_seletion"
              id="panel_selection"
              value={panel}
              onChange={(e) => setPanel(e.target.value)}
              disabled={loading}
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
          <MajorItemTable encodedSeeds={encodedSeeds} />
        )}
        {panel == "areas" && (
          <AreaDoorTable encodedSeeds={encodedSeeds} />
        )}
        {/*panel == "progression" && (
          <ProgressionStats itemProgression={status.progression} />
        )*/}
        {/*panel == "noteworthy" && (
          <NoteworthyStats itemProgression={status.progression} />
        )*/}
      </div>
    </div>
  );
}
