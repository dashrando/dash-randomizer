"use client";

import "@/public/styles/dash.css";
import "@/public/styles/readable.css";

export default function ReadableLogicPage() {
  return (
    <>
      <div id="wrapper">
        <div id="header">
          <a href="/">
            <img
              src="/images/dashLogo-noBG.png"
              alt="Super Metroid DASH Randomizer"
            />
          </a>
        </div>
        <div id="select_logic_dropdown">
          <label htmlFor="logic_type">Select Logic:</label>
          <select name="logic_type" id="logic_type" defaultValue="rml">
            <option value="sml">DASH - Standard</option>
            <option value="rml">DASH - Recall</option>
          </select>
        </div>
        <hr />
        <div id="logic_title">No Logic</div>
        <hr />
        <div id="logic"></div>
        <hr />
        <br />
        <br />
      </div>
    </>
  );
}
