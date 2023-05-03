"use client";

import "@/public/styles/dash.css";
import "@/public/styles/seed.css";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  flagsToOptions,
  gameModes,
  getPresetOptions,
  RandomizeRom,
  vanilla,
} from "core";

// These signatures are taken from:
// https://github.com/dashrando/dash-template-asm/blob/main/src/fileselect/gameoptions.asm#L85-L117
const SIGNATURE_VALUES = [
  "GEEMER  ",
  "RIPPER  ",
  "ATOMIC  ",
  "POWAMP  ",
  "SCISER  ",
  "NAMIHE  ",
  "PUROMI  ",
  "ALCOON  ",
  "BEETOM  ",
  "OWTCH   ",
  "ZEBBO   ",
  "ZEELA   ",
  "HOLTZ   ",
  "VIOLA   ",
  "WAVER   ",
  "RINKA   ",
  "BOYON   ",
  "CHOOT   ",
  "KAGO    ",
  "SKREE   ",
  "COVERN  ",
  "EVIR    ",
  "TATORI  ",
  "OUM     ",
  "PUYO    ",
  "YARD    ",
  "ZOA     ",
  "FUNE    ",
  "GAMET   ",
  "GERUTA  ",
  "SOVA    ",
  "BULL    ",
];

function getSeedOpts(): {
  num: number;
  mode: string;
  options: {};
  download: boolean;
} {
  const url = new URL(document.URL);
  const flags = url.searchParams.get("flags");
  const { mode, options } = (
    !flags
      ? getPresetOptions(url.searchParams.get("preset"))
      : flagsToOptions(flags)
  ) as { mode: string; options: {} };

  return {
    num: Number(url.searchParams.get("num")),
    mode: mode,
    options: options,
    download: url.searchParams.get("download") !== null,
  };
}

function downloadFile(data: any, name: string) {
  saveAs(new Blob([data]), name);
}

function fetchSignature(data: any) {
  // the signature is stored in 4 bytes at 0x2f8000 - 0x2f8003
  // use bit mask of 0x1f to get the index in the signatures array
  // then trim the string to remove the extra spaces
  const mask = 0x1f;
  const addresses = [0x2f8000, 0x2f8001, 0x2f8002, 0x2f8003]
    .map((addr) => data[addr] & mask)
    .map((index) => SIGNATURE_VALUES[index].trim());
  return addresses.join(" ");
}

export default function SeedPage() {
  const [settings, setSettings] = useState({
    gameMode: "",
    seedNum: 0,
    options: {},
  });
  const [signature, setSignature] = useState("BEETOM BULL YARD GAMET");
  const [containerClass, setContainerClass] = useState("");
  const [romData, setRomData] = useState({
    data: null,
    name: "DASH_v00r_AA_000000.sfc",
  });

  const updateSettings = (num: number, mode: string, options: {}) => {
    const gameMode = gameModes.find(({ name }) => name === mode);
    if (gameMode != null) {
      setSettings({
        gameMode: gameMode.title,
        seedNum: num,
        options: options,
      });
    }
  };

  useEffect(() => {
    async function startup() {
      try {
        new vanilla.vanillaROM();
        const { num, mode, options, download: autoDownload } = getSeedOpts();
        if (!num || !mode) {
          const missingEvt = new CustomEvent("seed:params-missing");
          document.dispatchEvent(missingEvt);
          return null;
        }

        const vanillaBytes = await vanilla.getVanilla();
        if (!vanillaBytes) {
          const vanillaEvt = new CustomEvent("seed:vanilla-missing", {
            detail: { num, mode, options },
          });
          document.dispatchEvent(vanillaEvt);
          return null;
        }
        const { data, name } = (await RandomizeRom(num, mode, options, {
          vanillaBytes,
        })) as { data: any; name: string };
        const signature = fetchSignature(data);
        const readyEvt = new CustomEvent("seed:ready", {
          detail: { data, name, num, mode, options, autoDownload, signature },
        });
        document.dispatchEvent(readyEvt);

        if (autoDownload) {
          setTimeout(() => {
            downloadFile(data, name);
            const downloadEvt = new CustomEvent("seed:download", {
              detail: { name },
            });
            document.dispatchEvent(downloadEvt);
          }, 850);
        }
      } catch (e) {
        const message = (e as Error).message;
        console.error(message);
      }
    }

    document.addEventListener("seed:params-missing", (_) => {
      setContainerClass("params-missing");
    });

    document.addEventListener("seed:vanilla-missing", (evt: any) => {
      const { num, mode, options } = evt.detail;
      updateSettings(num, mode, options);
      setContainerClass("vanilla-missing loaded");

      document.addEventListener("vanillaRom:set", async (evt: any) => {
        const vanillaBytes = evt.detail.data;
        const { data, name } = (await RandomizeRom(num, mode, options, {
          vanillaBytes,
        })) as { data: any; name: string };
        const signature = fetchSignature(data);
        setSignature(signature);
        setRomData({ data: data, name: name });
        setContainerClass("loaded");
        downloadFile(data, name);
      });
    });

    document.addEventListener("seed:ready", (evt: any) => {
      setRomData({ data: evt.detail.data, name: evt.detail.name });
      updateSettings(evt.detail.num, evt.detail.mode, evt.detail.options);
      setSignature(evt.detail.signature);
      setContainerClass("loaded");
    });

    startup();
  }, []);

  const DownloadButton = () => {
    return (
      <div id="download">
        <button
          id="download-btn"
          className="btn"
          disabled={romData.data == null}
          onClick={() => {
            if (romData.data != null) {
              downloadFile(romData.data, romData.name);
            }
          }}
        >
          Download {romData.name}
        </button>
        <label id="vanilla-btn" className="btn" htmlFor="vanilla-file-input">
          Enter your Vanilla ROM
          <input
            type="file"
            id="vanilla-file-input"
            name="vanilla-file"
            onChange={(e) => vanilla.inputVanillaRom(e.target)}
          />
        </label>
      </div>
    );
  };

  const SeedError = () => {
    return (
      <div id="seed-error">
        <p>
          <span style={{ fontWeight: 600, color: "#b32020" }}>
            Missing Parameter
          </span>
          <br />
          Something went wrong when sharing this seed.
        </p>
        <p>
          Please try to <a href="/generate">generate the seed</a> again.
        </p>
      </div>
    );
  };

  const SeedFooter = () => {
    return (
      <footer id="seed-footer">
        <p>
          This seed was generated by
          <br />
          <a href="/">DASH Randomizer</a>
        </p>
      </footer>
    );
  };

  const SeedOptions = ({ opts }: { opts: any }) => {
    return (
      <div id="seed-settings">
        <h4>Options</h4>
        <ul>
          <li>
            <span className="settings-label">Item Fanfare</span>
            <span className="settings-value" id="options-fanfare">
              {opts != null && opts.DisableFanfare != null ? (
                opts.DisableFanfare ? (
                  "Off"
                ) : (
                  "On"
                )
              ) : (
                <span className="settings-mdash">&mdash;</span>
              )}
            </span>
          </li>
          <li></li>
        </ul>
      </div>
    );
  };

  const SeedSettings = ({ mode, num }: { mode: string; num: number }) => {
    return (
      <div id="seed-settings">
        <h4>Settings</h4>
        <ul>
          <li>
            <span className="settings-label">Game Mode</span>
            <span className="settings-value" id="settings-mode">
              {mode.length > 0 ? (
                mode
              ) : (
                <span className="settings-mdash">&mdash;</span>
              )}
            </span>
          </li>
          <li>
            <span className="settings-label">Seed</span>
            <span className="settings-value" id="settings-seed">
              {num > 0 ? (
                num.toString().padStart(6, "0")
              ) : (
                <span className="settings-mdash">&mdash;</span>
              )}
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const SeedSignature = ({ sig }: { sig: string }) => {
    return <div id="seed-signature">{sig}</div>;
  };

  return (
    <main id="seed-container" className={containerClass}>
      <h1>DASH Randomizer</h1>
      <SeedSignature sig={signature} />
      <DownloadButton />
      <SeedError />
      <SeedSettings mode={settings.gameMode} num={settings.seedNum} />
      <SeedOptions opts={settings.options} />
      <SeedFooter />
    </main>
  );
}
