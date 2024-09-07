import { standardVertices } from './vertex.mjs';
import fs from "fs";

const allVertices = Object.entries(standardVertices)
  .map(([k, v]) => {
    return Object.entries(v).map(([name, type]) => {
      return {
        name: name,
        type: type,
        area: k,
        item: null,
        pathToStart: false,
      };
    });
  })
  .reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

fs.writeFileSync('lib/graph/data/base/definitions.ts',
  `//*********************************************
// DO NOT EDIT - THIS FILE IS GENERATED
//*********************************************

import { crateriaEdges } from "./edges/crateria";
import { greenbrinstarEdges } from "./edges/greenbrinstar";
import { redbrinstarEdges } from "./edges/redbrinstar";
import { kraidslairEdges } from "./edges/kraid";
import { crocomireEdges } from "./edges/crocomire";
import { westmaridiaEdges } from "./edges/westmaridia";
import { eastmaridiaEdges } from "./edges/eastmaridia";
import { uppernorfairEdges } from "./edges/uppernorfair";
import { lowernorfairEdges } from "./edges/lowernorfair";
import { wreckedshipEdges } from "./edges/wreckedship";
import { ItemType } from "../../../items";

export { bossEdges } from "./edges/boss";

export type Vertex = {
  name: string;
  type: string;
  area: string;
  item: ItemType | undefined; // don't use ItemType here
  pathToStart: boolean;
}

export const getAllVertices = (): Vertex[] => {
  return ${JSON.stringify(allVertices, null, 2)};
}

//-----------------------------------------------------------------
// Returns a structure containing all edges grouped by area.
//-----------------------------------------------------------------

export const getStandardEdges = () => {
  return [
    crateriaEdges,
    greenbrinstarEdges,
    redbrinstarEdges,
    kraidslairEdges,
    crocomireEdges,
    westmaridiaEdges,
    eastmaridiaEdges,
    uppernorfairEdges,
    lowernorfairEdges,
    wreckedshipEdges,
  ]
}
`
)