"use client";

import styles from "./page.module.css";
import { generateSeed } from "core/data";
import { useRef, useState } from "react";
import {
  computeCRC32,
  encodeSeed,
  getPreset,
  ItemLocation
} from "core";
import MajorItemTable from "./majors";
import ProgressionStats from "./progression";
import NoteworthyStats from "./noteworthy";
import AreaDoorTable from "./areas";

export type ItemProgression = ItemLocation[];

function formatTime(ms: number) {
  // Calculate hours, minutes, seconds, and remaining milliseconds
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = ((ms % (1000 * 60)) / 1000).toFixed(1);

  let formattedTime = '';

  // Only include hours if it's more than 0
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  // Only include minutes if it's more than 0
  if (minutes > 0 || hours > 0) {  // Include minutes if hours are shown, even if minutes are 0
    formattedTime += `${minutes}m `;
  }

  // Always include seconds
  formattedTime += `${seconds}s`;

  return formattedTime.trim();
}

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

export default function StatsPage() {
  const [gameMode, setGameMode] = useState('spring24');
  const [logic, setLogic] = useState('standard');
  const startSeedRef = useRef<HTMLInputElement>(null);
  const numSeedsRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);

  const [panel, setPanel] = useState("majors");
  const [encodedSeeds, setEncodedSeeds] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [generateTimes, setGenerateTimes] = useState({
    start: 0,
    end: 0,
    hash: ''
  });

  const generateSeeds = async () => {
    const startSeed = startSeedRef!.current!.valueAsNumber;
    const numSeeds = numSeedsRef!.current!.valueAsNumber;
    const endSeed = startSeed + numSeeds - 1;

    const preset = getPreset(gameMode);
    if (preset == undefined) {
      throw new Error(`Unknown preset: ${gameMode}`);
    }

    clearResults();
    setGenerateTimes({ start: Date.now(), end: 0, hash: '' });
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
    while (i <= endSeed && !cancelRef.current) {
      i = await processChunk(i, Math.min(i + 20, endSeed))
      setProgress(100 * ((i - startSeed + 1) / numSeeds))
      // Yield control to the event loop to avoid freezing the UI
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    cancelRef.current = false;
    await new Promise((resolve) => setTimeout(resolve, 50));
    updateResults(encoded);
  };

  const totalTime = generateTimes.end - generateTimes.start;
  const loading = totalTime < 0 ? true : false;
  const seedCount = encodedSeeds.length;

  const clearResults = () => {
    if (loading) {
      cancelRef.current = true;
      return;
    }
    cancelRef.current = false;
    setEncodedSeeds([]);
    setGenerateTimes({ start: 0, end: 0, hash: '' });
    setProgress(0)
  };

  const updateResults = (encoded: string[]) => {
    setEncodedSeeds(encoded);
    setGenerateTimes((current) => {
      return {
        start: current.start,
        end: Date.now(),
        hash: getHash(encoded)
      }
    });
  }

  return (
    <div id="stats">
      <div className={styles.stats_nav}>
        <select
          name="game_mode"
          id="game_mode"
          className={styles.mode_selector}
          value={gameMode}
          disabled={loading}
          onChange={(e) => {
            clearResults();
            setGameMode(e.target.value);
          }}
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
        </select>
        <select
          name="logic"
          id="logic"
          className={styles.mode_selector}
          value={logic}
          disabled={loading}
          onChange={(e) => {
            setLogic(e.target.value);
          }}
        >
          <option value="standard">Standard Logic</option>
          <option value="relaxed">Relaxed Logic</option>
        </select>

        <label htmlFor="start_seed" style={{ paddingRight: "4px" }}>
          Start
        </label>
        <input
          name="start_seed"
          id="start_seed"
          type="number"
          min="1"
          max="9999999"
          disabled={loading}
          ref={startSeedRef}
          defaultValue={1}
        />

        <label htmlFor="num_seeds" style={{ padding: "0px 4px" }}>
          Count
        </label>
        <input
          name="num_seeds"
          id="num_seeds"
          type="number"
          min="1"
          max="9999999"
          disabled={loading}
          ref={numSeedsRef}
          defaultValue={100}
        />

        <input
          type="button"
          value="Generate"
          id="gen_seeds"
          onClick={generateSeeds}
          disabled={loading}
        />
        <input
          type="button"
          value={loading ? "Stop" : "Clear"}
          id="clear_table"
          onClick={clearResults}
        />
        <div
          id="action_status"
          style={{ paddingLeft: "8px", display: "inline-block", width: "50%" }}
        >
          {loading ? (
            <ProgressBar progress={progress} />
          ) : totalTime === 0 ? (
            ""
          ) : (
            `${seedCount} seeds ${formatTime(totalTime)} [ ${(
              totalTime / seedCount
            ).toFixed(1)}
              ms avg] ${generateTimes.hash}`
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
        {panel == "majors" && <MajorItemTable encodedSeeds={encodedSeeds} />}
        {panel == "areas" && <AreaDoorTable encodedSeeds={encodedSeeds} />}
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
