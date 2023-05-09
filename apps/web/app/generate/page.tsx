"use client";

import "@/public/styles/dash.css";
import "@/public/styles/generate.css";
import styles from "./page.module.css";

import { useEffect, useRef, useState } from "react";
import { optionsToFlags, RandomizeRom, vanilla } from "core";
import { saveAs } from "file-saver";
import Link from "next/link";
import Header from "../components/header";

const SectionLabel = (props: any) => {
  return (
    <div id="section_label">
      {props.children ? props.children : <></>}
      <hr />
    </div>
  );
};

const Welcome = () => {
  return (
    <div className={styles.welcome_section}>
      <SectionLabel />
      <div className={styles.welcome_msg}>
        Generating a seed: load the vanilla rom, select a game mode along with
        any extra settings, and then click Randomize!
      </div>
    </div>
  );
};

const Permalink = ({ url }: { url: string }) => {
  if (url.length <= 0) {
    return <></>;
  }
  return (
    <div id="permalink-container">
      <p>
        Your Seed's URL:
        <span id="seed-permalink">
          <Link href={url}>{url}</Link>
        </span>
      </p>
    </div>
  );
};

export default function GeneratePage() {
  const [seedMode, setSeedMode] = useState("random");
  const [fixedSeed, setFixedSeed] = useState(1);
  const [gameMode, setGameMode] = useState("rm");
  const [disableFanfare, setDisableFanfare] = useState(false);
  const [vanillaBytes, setVanillaBytes] = useState(new Uint8Array());
  const [permalink, setPermalink] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [minSeed, maxSeed] = [1, 999999];

  useEffect(() => {
    document.addEventListener("vanillaRom:set", (evt: any) => {
      setVanillaBytes(evt.detail.data);
    });
    document.addEventListener("vanillaRom:cleared", (evt: any) => {
      setVanillaBytes(new Uint8Array());
      if (inputRef.current != null) {
        inputRef.current.value = "";
      }
    });
    new vanilla.vanillaROM();
  }, []);

  const generateRom = async () => {
    const seed = getSeed();
    const options = getOptions();
    const config = { vanillaBytes };
    try {
      const { data, name } = (await RandomizeRom(
        seed,
        gameMode,
        options,
        config
      )) as { data: any; name: string };
      saveAs(new Blob([data]), name);
      updatePermalink(seed, optionsToFlags(gameMode, options));
    } catch (e) {
      const message = (e as Error).message;
      console.error(message);
      alert(message);
    }
  };

  const getOptions = () => {
    return {
      DisableFanfare: disableFanfare,
    };
  };

  const getSeed = () => {
    if (seedMode == "fixed") {
      return fixedSeed;
    }

    const numSeeds = maxSeed - minSeed + 1;
    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return minSeed + (randomArray[0] & numSeeds);
  };

  const hasValues = () => {
    return vanillaBytes.length > 0;
  };

  const toggleSeedMode = () => {
    setSeedMode(seedMode == "random" ? "fixed" : "random");
  };

  const updatePermalink = (seed: number, flags: string) => {
    setPermalink(`${window.location.origin}/seed?num=${seed}&flags=${flags}`);
  };

  const VanillaRom = () => {
    return (
      <div className={styles.input_section}>
        <SectionLabel>Enter Your Vanilla Rom</SectionLabel>
        <div id="rom_load">
          <input
            id="vanilla-rom"
            type="file"
            onChange={(e) => vanilla.inputVanillaRom(e.target)}
            disabled={vanillaBytes.length > 0}
            ref={inputRef}
          />
          <div id="vanilla-rom-loaded">
            Vanilla ROM is loaded
            <button
              id="remove-vanilla-rom-btn"
              onClick={() => vanilla.clearVanillaRom()}
            >
              x
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RandomizeButton = () => {
    return (
      <button
        id="randomize_button"
        disabled={!hasValues()}
        onClick={() => generateRom()}
      >
        Randomize!
      </button>
    );
  };

  return (
    <div id="wrapper">
      <Header />
      <Welcome />
      <VanillaRom />
      <div className={styles.input_section}>
        <SectionLabel>
          Select Your Game Mode &emsp;
          <Link
            href={
              gameMode.startsWith("r")
                ? "/readable/recall"
                : "/readable/standard"
            }
          >
            What's in the logic for each game mode?
          </Link>
        </SectionLabel>
        <div id="select_mode">
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
        </div>
      </div>
      <div className={styles.input_section}>
        <SectionLabel>Select Any Other Settings</SectionLabel>
        <div id="topic">Item Fanfare:</div>
        <div id="select_fanfare">
          <input
            type="radio"
            id="on"
            name="disable_fanfare"
            value="On"
            checked={!disableFanfare}
            onChange={() => setDisableFanfare((prev) => !prev)}
          />
          <label htmlFor="on">On</label>
          <input
            type="radio"
            id="off"
            name="disable_fanfare"
            checked={disableFanfare}
            onChange={() => setDisableFanfare((prev) => !prev)}
          />
          <label htmlFor="off">Off</label>
        </div>
      </div>
      <div className={styles.input_section}>
        <SectionLabel>Seed Settings:</SectionLabel>
        <div id="select_seed">
          <input
            type="radio"
            id="random"
            name="seed_type"
            value="random"
            checked={seedMode == "random"}
            onChange={() => toggleSeedMode()}
          />
          <label htmlFor="random">Random</label>
          <input
            type="radio"
            id="fixed"
            name="seed_type"
            value="fixed"
            checked={seedMode == "fixed"}
            onChange={() => toggleSeedMode()}
          />
          <label htmlFor="fixed">Fixed</label>
          <input
            className={styles.fixed_value}
            type="number"
            min={minSeed}
            max={maxSeed}
            step="1"
            value={seedMode == "fixed" ? fixedSeed : ""}
            disabled={seedMode != "fixed"}
            onChange={(e) => setFixedSeed(e.target.valueAsNumber)}
          />
        </div>
      </div>
      <RandomizeButton />
      <Permalink url={permalink} />
    </div>
  );
}
