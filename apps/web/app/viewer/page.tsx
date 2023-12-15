"use client";

import { ItemNames } from "core/data";
import { useRef, useState } from "react";
import styles from "./page.module.css"
import { getItemProgression, readGraph, readParams } from "core";

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

      const bosses = graph.filter(e => e.from.type == "exit" && e.to.type == "boss");
      const exits = graph.filter(e => e.from.type == "exit" && e.to.type != "boss");
      const progression = getItemProgression(graph, settings)

      return (<div className={styles.item_list}>
         {progression.map(p => {
            let itemStyle = p.isMajor ? styles.major_item : styles.minor_item;
            let locationName = p.locationName;
            let boss = bosses.find((e: any) => {
               if (e.to.item == undefined) {
                  return false;
               }
               return e.to.item.type == p.itemType;
            }) as any;
            if (boss != undefined) {
               const bossName = boss.to.name.substring(5)
               const exit = exits.find(e => e.from == boss.from) as any;
               const door = exit.to;
               locationName = `${bossName} at ${door.area}`;
               itemStyle = styles.boss_item;
            }
            return (
            <div key={locationName}>
               <span className={styles.location}>{locationName}</span>
               <span className={itemStyle}>{ItemNames.get(p.itemType)}</span>
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