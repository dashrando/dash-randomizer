"use client";

import "@/public/styles/dash.css";
import "@/public/styles/seed.css";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  stringToParams,
  RandomizeRom,
  vanilla,
  fetchSignature,
} from "core";
import { MajorDistributionMode, MapLayout, MinorDistributionMode } from "core/params";

type SeedParams = {
  seed: string
}

function downloadFile(data: any, name: string) {
  saveAs(new Blob([data]), name);
}

export default function SeedPage({ params }: { params: SeedParams}) {
  const [pageSettings, setPageSettings] = useState({
    mapLayout: 0,
    itemPoolParams: {},
    settings: {},
    seedNum: 0,
    options: {},
  });
  const [signature, setSignature] = useState("BEETOM BULL YARD GAMET");
  const [containerClass, setContainerClass] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [romData, setRomData] = useState({
    data: null,
    name: "DASH_Custom_AA000000.sfc",
  });

  useEffect(() => {
    async function startup() {
      try {
        new vanilla.vanillaROM();
        const{ seed, mapLayout, itemPoolParams, settings, options } = stringToParams(params.seed);
        Object.assign(settings, {preset: "Custom"});
        if (!seed || !mapLayout || !itemPoolParams || !settings || !options) {
          const missingEvt = new CustomEvent("seed:params-missing");
          document.dispatchEvent(missingEvt);
          return null;
        }

        const vanillaBytes = await vanilla.getVanilla();
        if (!vanillaBytes) {
          const vanillaEvt = new CustomEvent("seed:vanilla-missing", {
            detail: { seed, mapLayout, itemPoolParams, settings, options },
          });
          document.dispatchEvent(vanillaEvt);
          return null;
        }
        const { data, name } = (await RandomizeRom(
          seed, mapLayout, itemPoolParams, settings, options, {
          vanillaBytes,
        })) as { data: any; name: string };
        const signature = fetchSignature(data);
        const autoDownload = true;
        const readyEvt = new CustomEvent("seed:ready", {
          detail: { data, name, seed, mapLayout, itemPoolParams,
                    settings, options, autoDownload, signature },
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
      const { seed, mapLayout, itemPoolParams, settings, options } = evt.detail;
      setPageSettings({
        seedNum: seed,
        mapLayout: mapLayout,
        itemPoolParams: itemPoolParams,
        settings: {...settings, preset: "Custom"},
        options: options
      });
      setContainerClass("vanilla-missing loaded");

      document.addEventListener("vanillaRom:set", async (evt: any) => {
        const vanillaBytes = evt.detail.data;
        const { data, name } = (await RandomizeRom(seed, mapLayout,
          itemPoolParams, settings, options, {
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
      if (evt.detail.autoDownload) {
        setDownloading(true);
      }
      setRomData({ data: evt.detail.data, name: evt.detail.name });
      const { seed, mapLayout, itemPoolParams, settings, options } = evt.detail;
      setPageSettings({
        seedNum: seed,
        mapLayout: mapLayout,
        itemPoolParams: itemPoolParams,
        settings: settings,
        options: options
      });
      setSignature(evt.detail.signature);
      setContainerClass("loaded");
    });

    document.addEventListener("seed:download", (evt: any) => {
      setDownloading(false);
    });

    startup();
  }, []);

  const DownloadButton = () => {
    const btnText = downloading ? "Downloading..." : `Download ${romData.name}`;
    return (
      <div id="download">
        <button
          id="download-btn"
          className={downloading ? "btn downloading" : "btn"}
          disabled={romData.data == null}
          onClick={() => {
            if (romData.data != null) {
              downloadFile(romData.data, romData.name);
            }
          }}
        >
          {btnText}
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
  
  const SeedOptions = ({ opts, num }: { opts: any; num: number }) => {
    const numString = num <= 0 ? "" : num.toString().padStart(6, "0");
    let fanfareString = "";

    if (opts != null) {
      fanfareString = opts.DisableFanfare ? "Off" : "On";
    }

    return (
      <SeedParamList header="Options">
        <SeedParam name="Item Fanfare" value={fanfareString} />
        <SeedParam name="Seed" value={numString} />
        <SeedSpacer />
      </SeedParamList>
    );
  };
  
  const SeedSettings = ({ mapLayout, itemPoolParams, settings }:
    { mapLayout: number, itemPoolParams: any, settings: any }) => {
    const mapString = mapLayout == MapLayout.Recall ? "Recall" : "Standard";
    const majorMode = itemPoolParams?.majorDistribution?.mode;
    const minorMode = itemPoolParams?.minorDistribution?.mode;
    const itemSplit =
      majorMode == MajorDistributionMode.Standard ? "Major/Minor" :
      majorMode == MajorDistributionMode.Recall ? "Recall Major/Minor" :
      "Full"
    let minorSplit = "Unknown";
    if (minorMode ==MinorDistributionMode.Standard) {
      const minorDistro = itemPoolParams.minorDistribution;
      if (minorDistro.missiles == 2 && minorDistro.supers == 1 && minorDistro.powerbombs == 1) {
        minorSplit = "DASH 2:1:1";
      } else if (minorDistro.missiles == 2 && minorDistro.supers == 1 && minorDistro.powerbombs == 1) {
        minorSplit = "Standard 3:2:1";
      }
      else {
        minorSplit = `${minorDistro.missiles}:${minorDistro.supers}:${minorDistro.powerbombs}`;
      }
    } 

    return (
      <SeedParamList header="Settings">
        <SeedParam name="Item Split" value={itemSplit} />
        <SeedParam name="Map Layout" value={mapString} />
        <SeedParam name="Minor Distro" value={minorSplit} />
      </SeedParamList>
    );
  };

  const SeedSignature = ({ sig }: { sig: string }) => {
    return <div id="seed-signature">{sig}</div>;
  };

  const SeedParam = ({ name, value }: { name: string; value: string }) => {
    return (
      <li>
        <span className="settings-label">{name}</span>
        <span className="settings-value">
          {value.length > 0 ? (
            value
          ) : (
            <span className="settings-mdash">&mdash;</span>
          )}
        </span>
      </li>
    );
  };

  const SeedParamList = ({
    header,
    children,
  }: {
    header: string;
    children: any;
  }) => {
    return (
      <div id="seed-settings">
        <h4>{header}</h4>
        <ul>{children}</ul>
      </div>
    );
  };
  
  const SeedSpacer = () => {
    return <li></li>;
  };

  return (
    <main id="seed-container" className={containerClass}>
      <h1>DASH Randomizer</h1>
      <SeedSignature sig={signature} />
      <DownloadButton />
      <SeedError />
      <SeedSettings mapLayout={pageSettings.mapLayout}
                    itemPoolParams={pageSettings.itemPoolParams}
                    settings={pageSettings.settings} />
      <SeedOptions opts={pageSettings.options} num={pageSettings.seedNum} />
      <SeedFooter />
    </main>
  );
}
