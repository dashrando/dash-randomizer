"use client";

import "@/public/styles/dash.css";
import "@/public/styles/seed.css";

export default function SeedPage() {
   return (
    <main id="seed-container">
      <h1>DASH Randomizer</h1>
      <div id="seed-signature">
        BEETOM
        BULL
        YARD
        GAMET
      </div>
      <div id="seed-error">
        <p>
          <span style={{fontWeight: 600, color: "#b32020"}}>Missing Parameter</span>
          <br />
          Something went wrong when sharing this seed.
        </p>
        <p>
          Please try to <a href="/generate">generate the seed</a> again.
        </p>
      </div>
      <div id="seed-settings">
        <ul>
          <li>
            <span className="settings-label">Game Mode</span>
            <span className="settings-value" id="settings-mode">
              <span className="settings-mdash">&mdash;</span>
            </span>
          </li>
          <li>
            <span className="settings-label">Seed</span>
            <span className="settings-value" id="settings-seed">
              <span className="settings-mdash">&mdash;</span>
            </span>
          </li>
        </ul>
      </div>
      <div id="download">
        <button id="download-btn" className="btn" disabled>Download DASH_v00r_AA_000000.sfc</button>
        <label id="vanilla-btn" className="btn" htmlFor="vanilla-file-input">Enter your Vanilla ROM
          <input type="file" id="vanilla-file-input" name="vanilla-file" />
        </label>
      </div>
      <footer id="seed-footer">
        <p>
          This seed was generated by<br />
          <a href="/">DASH Randomizer</a>
        </p>
      </footer>
    </main>
   )
}