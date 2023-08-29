"use client";

import { getLocations, Location } from "core/data";
import { ItemNames } from "core/data";
import { useRef, useState } from "react";
import styles from "./page.module.css"

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

   const getItemAtLocation = (location: Location) => {
      const itemCode = location.GetItemCode(bytes);
      const itemName = ItemNames.get(itemCode as any);
      return itemName;
   }

   const ItemList = () => {
      return (<div>
         {getLocations().map(l => {
            return (
            <div key={l.name}>
               <span className={styles.location}>{l.name}</span>
               <span className={styles.item}>{getItemAtLocation(l)}</span>
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