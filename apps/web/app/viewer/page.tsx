"use client";

import { Item } from "core/data";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { ItemLocation, Portal, getItemProgression, readRom } from "core";

export default function ItemViewer() {
  const test = useRef<HTMLInputElement>(null);
  const [bytes, setBytes] = useState(new Uint8Array());

  const loadRom = () => {
    if (test.current == undefined || test.current.files == undefined) {
      return;
    }
    let romData = test.current.files[0];
    let reader = new FileReader();

    reader.onload = async () => {
      setBytes(new Uint8Array(reader.result as ArrayBuffer));
      //ShowItems(romData.name, bytes);
    };
    reader.readAsArrayBuffer(romData);
  };

  const getProgression = (bytes: Uint8Array) => {
    try {
      const { params, graph } = readRom(bytes);
      if (graph === undefined || graph === undefined) {
        return undefined;
      }
      return getItemProgression(graph, params.settings);
    } catch {
      return undefined;
    }
  };

  const getPortals = (bytes: Uint8Array) => {
    try {
      const { portals } = readRom(bytes);
      return portals;
    } catch {
      return undefined;
    }
  };

  const ItemList = () => {
    const progression = getProgression(bytes);

    if (progression == undefined) {
      return <div>Invalid ROM</div>;
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
        {progression.map((p) => {
          return (
            <div key={p.locationName}>
              <span className={styles.location}>{getLocationName(p)}</span>
              <span className={getStyle(p)}>{p.itemName}</span>
            </div>
          );
        })}
      </div>
      </>
    );
  };

  const PortalList = () => {
    const portals = getPortals(bytes);

    if (portals == undefined) {
      return <div>Invalid ROM</div>;
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

  return (
    <div>
      <input
        ref={test}
        type="file"
        id="rom_file"
        name="rom_file"
        onChange={(_) => loadRom()}
      />
      {bytes.length > 0 && (
        <>
          <ItemList />
          <PortalList />
        </>
      )}
    </div>
  );
}
