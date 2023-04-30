"use client";

import "@/public/styles/dash.css";
import "@/public/styles/generate.css";

export default function GeneratePage() {
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
          <input id="vanilla-rom" type="file" />
          <div id="vanilla-rom-loaded">
            Vanilla ROM is loaded
            <button id="remove-vanilla-rom-btn">x</button>
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
          <select name="game_mode" id="game_mode" defaultValue="rm">
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
            name="fanfare_mode"
            value="On"
            defaultChecked
          />
          <label htmlFor="on">On</label>
          <input type="radio" id="off" name="fanfare_mode" value="Off" />
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
            defaultChecked
          />
          <label htmlFor="random">Random</label>
          <input type="radio" id="fixed" name="seed_type" value="fixed" />
          <label htmlFor="fixed">Fixed</label>
          <input
            name="fixed_value"
            id="fixed_value"
            type="number"
            min="1"
            max="999999"
            step="1"
            defaultValue=""
            disabled
          />
        </div>
        <br />
        <div id="randomize">
          <button id="randomize_button" disabled>
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
