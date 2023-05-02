"use client";

import "@/public/styles/dash.css";
import "@/public/styles/generate.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RandomizeRom } from "@/../../packages/core";
import { saveAs } from "file-saver";
import { vanilla } from "@/../../packages/core";

export default function GeneratePage() {
  const [seedMode, setSeedMode] = useState("random");
  const [fixedSeed, setFixedSeed] = useState(1);
  const [gameMode, setGameMode] = useState("rm");
  const [disableFanfare, setDisableFanfare] = useState(false);
  const [vanillaBytes, setVanillaBytes] = useState(new Uint8Array());
  const [permalink, setPermalink] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [minSeed, maxSeed] = [1, 999999];

  useLayoutEffect(() => {
    document.addEventListener('vanillaRom:set', (evt: any) => {
      setVanillaBytes(evt.detail.data);
    });
    document.addEventListener('vanillaRom:cleared', (evt: any) => {
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
      updatePermalink(seed, "ABCD");
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

  return (
    <>
      <div id="wrapper">
        <div id="header">
          <a href="/">
            <img
              src="images/dashLogo-noBG.png"
              alt="Super Metroid DASH Randomizer"
            />
          </a>
        </div>
        <div id="section_label">
          <hr />
        </div>
        <div id="welcome">
          Generating a seed: load the vanilla rom, select a game mode along with
          any extra settings, and then click Randomize!
        </div>
        <br />
        <br />
        <div id="section_label">
          Enter Your Vanilla Rom
          <hr />
        </div>
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
            <button id="remove-vanilla-rom-btn" onClick={() => vanilla.clearVanillaRom()}>
              x
            </button>
          </div>
        </div>
        <br />
        <br />
        <div id="section_label">
          Select Your Game Mode &emsp;
          <a href="/readable-logic">What's in the logic for each game mode?</a>
          <hr />
        </div>
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
        <br />
        <br />
        <div id="section_label">
          Select Any Other Settings
          <hr />
        </div>
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
        <br />
        <br />
        <div id="section_label">
          Seed Settings:
          <hr />
        </div>
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
            name="fixed_value"
            id="fixed_value"
            type="number"
            min={minSeed}
            max={maxSeed}
            step="1"
            value={seedMode == "fixed" ? fixedSeed : ""}
            disabled={seedMode != "fixed"}
            onChange={(e) => setFixedSeed(e.target.valueAsNumber)}
          />
        </div>
        <br />
        <div id="randomize">
          <button
            id="randomize_button"
            disabled={!hasValues()}
            onClick={() => generateRom()}
          >
            Randomize!
          </button>
        </div>

        {permalink.length > 0 && (
          <div id="permalink-container">
            <p>
              Your Seed's URL:{" "}
              <span id="seed-permalink">
                <a href={permalink}>{permalink}</a>
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
