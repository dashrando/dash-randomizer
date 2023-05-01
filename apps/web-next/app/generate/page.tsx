"use client";

import "@/public/styles/dash.css";
import "@/public/styles/generate.css";
import { useRef, useState } from "react";
import { RandomizeRom } from "@/../../packages/core";
import { saveAs } from "file-saver";
//import { vanilla } from "@/../../packages/core";

export default function GeneratePage() {
  const [seedMode, setSeedMode] = useState("random");
  const [fixedSeed, setFixedSeed] = useState(1);
  const [gameMode, setGameMode] = useState("rm");
  const [disableFanfare, setDisableFanfare] = useState(false);
  const [vanillaBytes, setVanillaBytes] = useState(new Uint8Array());
  const inputRef = useRef<HTMLInputElement>(null);

  const generateRom = async () => {
    console.log("game mode =", gameMode);
    console.log("seed mode =", seedMode);
    console.log("fanfare =", !disableFanfare);
    console.log("fixed =", fixedSeed);
    console.log(vanillaBytes);
    const seed = getSeed();
    const options = getOptions();
    const config = { vanillaBytes };
    const { data, name } = await RandomizeRom(seed, gameMode, options, config);
    console.log(data);
    console.log(name);
    saveAs(new Blob([data]), name);
  };

  const getOptions = () => {
    return {};
  };

  const getSeed = () => {
    return 1;
  };

  const hasValues = () => {
    return true;
  };

  const loadFile = (evt: any) => {
    if (evt.target != null) {
      let vanillaRom = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsArrayBuffer(vanillaRom);

      reader.onload = async function () {
        try {
          setVanillaBytes(new Uint8Array(reader.result));
        } catch (e) {
          console.error(e.message);
          alert(e.message);
        //el.value = "";
        }
      };

      reader.onerror = function () {
        alert("Failed to load file.");
      };
    }
  }

      //setVanillaBytes(e.target.files[0]);
    //}
  //};

  const toggleSeedMode = () => {
    setSeedMode(seedMode == "random" ? "fixed" : "random");
  };

  const unloadFile = (e: any) => {
    setVanillaBytes(new Uint8Array());
    if (inputRef.current != null) {
      inputRef.current.value = '';
    }
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
            onChange={loadFile}
            disabled={vanillaBytes.length > 0}
            ref={inputRef}
          />
          <div id="vanilla-rom-loaded">
            Vanilla ROM is loaded
            <button id="remove-vanilla-rom-btn" onClick={unloadFile}>
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
            min="1"
            max="999999"
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
        <div id="permalink-container">
          <p>
            Your Seed's URL: <span id="seed-permalink">&nbsp;</span>
          </p>
        </div>
      </div>
    </>
  );
}