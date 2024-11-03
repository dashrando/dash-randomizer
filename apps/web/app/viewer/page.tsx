"use client";

import { generateSeed, Item } from "core/data";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import {
  ItemLocation,
  Portal,
  PortalMapping,
  getAllPresets,
  getAreaTransitions,
  getBossTransitions,
  getItemProgression,
  getSeedNumber,
  readRom,
} from "core";

type GameData = {
  portals: PortalMapping[];
  progression: ItemLocation[];
}

const ItemList = ({ progression }: { progression: ItemLocation[] }) => {
  if (progression == undefined) {
    return <div>Invalid Game Data</div>;
  }

  const getLocationName = (itemLocation: ItemLocation) => {
    if (itemLocation.locationName === 'Power Bombs (Mission Impossible)') {
      return 'PBs (Mission Impossible)'
    }
    return itemLocation.locationName
  }

  const getStyle = (n: ItemLocation) => {
    if (n.isMajor) {
      return styles.major_item;
    } else {
      switch (n.itemType) {
        case Item.DefeatedBrinstarBoss:
        case Item.DefeatedWreckedShipBoss:
        case Item.DefeatedMaridiaBoss:
        case Item.DefeatedNorfairBoss:
          return styles.boss_item;
        default:
          return styles.minor_item;
      }
    }
  };

  return (
    <>
    <h2>Item Progression</h2>
    <div className={styles.item_list}>
      {progression.map((p, i) => {
        return (
          <div key={i}>
            <span className={styles.location}>{getLocationName(p)}</span>
            <span className={getStyle(p)}>{p.itemName}</span>
          </div>
        );
      })}
    </div>
    </>
  );
};

const PortalList = ({ portals }: { portals: PortalMapping[] }) => {
  if (portals == undefined) {
    return <div>Invalid Game Data</div>;
  }

  const PortalItem = ({ portal }: { portal: Portal }) => {
    let name = portal.name.slice(5)
    if (portal.name.startsWith("Exit_")) {
      return (
        <span className={`${styles.portal} ${styles.boss_item}`}>
          {`${name} @ ${portal.area}`}
        </span>
      )
    }
    return (
      <span className={`${styles.portal}`}>
        {`${name}`}
      </span>
    )
  }

  return (
    <>
    <h2>Portals</h2>
    <div className={styles.portal_list}>
      {portals.map((p) => {
        return (
          <div key={p[0].name + p[0].area}>
            <PortalItem portal={p[0]} />
            <span>&rarr;&nbsp;</span>
            <PortalItem portal={p[1]} />
          </div>
        );
      })}
    </div>
    </>
  );
};

export default function ItemViewer() {
  const test = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<GameData|null>(null)
  const [loaderMode, setLoaderMode] = useState('rom')

  const loadRom = () => {
    if (test.current == undefined || test.current.files == undefined) {
      return;
    }
    let romData = test.current.files[0];
    let reader = new FileReader();

    reader.onload = async () => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      const { params, graph, portals } = readRom(bytes);
      if (!graph || !params || !portals) {
        throw new Error('Invalid ROM')
      }
      setData({
        portals,
        progression: getItemProgression(graph, params.settings)
      })
    };
    reader.readAsArrayBuffer(romData);
  };

  const Generator = () => {
    const selection = useRef<HTMLSelectElement>(null);
    const [seedNum, setSeedNum] = useState(0);
    const presets = getAllPresets()
    return (
      <>
        <select ref={selection}>
          {presets.map((p) => {
            return <option key={p.title}>{p.title}</option>
          })}
        </select>
        <span onClick={(e) => {
          e.preventDefault()
          const preset = presets.find(p => p.title == selection.current?.value)
          if (!preset) {
            throw new Error('Invalid Preset')
          }
          const { settings, options } = preset;
          const seed = getSeedNumber(0)
          setSeedNum(seed)
          const graph = generateSeed(seed, settings, options)
          const portals = [ ...getBossTransitions(graph), ...getAreaTransitions(graph) ]
          setData({
            portals,
            progression: getItemProgression(graph, settings)
          })
        }}>Generate</span>
        <span>{seedNum}</span>
      </>
    )
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
      <select
        name="loader_mode"
        id="loader_mode"
        value={loaderMode}
        onChange={(e) => {
          setLoaderMode(e.target.value)
        }}
      >
        <option value="rom">ROM</option>
        <option value="generate">Generate</option>
      </select>
      {loaderMode === "rom" ? (
        <input
          ref={test}
          type="file"
          id="rom_file"
          name="rom_file"
          onChange={(_) => loadRom()}
        />
      ) : (
        <Generator />
      )}
      </form>
      {data !== null && (
        <>
          <ItemList progression={data.progression} />
          <PortalList portals={data.portals} />
        </>
      )}
    </div>
  );
}
