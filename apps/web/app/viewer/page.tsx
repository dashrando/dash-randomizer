"use client";

import { Item } from "core/data";
import { useRef, useState } from "react";
import styles from "./page.module.css"
import { ItemLocation, getItemProgression, readGraph, readParams } from "core";

export default function ItemViewer() {
   const test = useRef<HTMLInputElement>(null);
   const [ bytes, setBytes ] = useState(new Uint8Array());

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
   }

   const ItemList = () => {
      const { settings } = readParams(bytes);
      const graph = readGraph(bytes);

      if (graph == undefined || graph.length <= 0) {
         return <></>
      }

      const progression = getItemProgression(graph, settings)

      const getStyle = (n: ItemLocation) => {
         if (n.isMajor) {
            return styles.major_item;
         } else {
            switch(n.itemType) {
               case Item.DefeatedBrinstarBoss:
               case Item.DefeatedWreckedShipBoss:
               case Item.DefeatedMaridiaBoss:
               case Item.DefeatedNorfairBoss:
                  return styles.boss_item;
               default:
                  return styles.minor_item;
            }
         }
      }

      return (<div className={styles.item_list}>
         {progression.map(p => {
            return (
            <div key={p.locationName}>
               <span className={styles.location}>{p.locationName}</span>
               <span className={getStyle(p)}>{p.itemName}</span>
            </div>)
         })}
         </div>);
   }

   return (
      <div>
         <input
            ref={test}
            type="file"
            id="rom_file"
            name="rom_file"
            onChange={_ => loadRom()}
         />
         {bytes.length > 0 ? 
         <ItemList /> :
         <></>
         }
      </div>
   );
}