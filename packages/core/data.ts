import Loadout from "./lib/loadout";

export { Loadout };

export { generateSeed } from "./lib/graph/fill";
export * from "./data/doors";
export { Item, ItemNames } from "./lib/items";
export { getLocations, Location } from "./lib/locations";

export const Vanilla = {
  headered: "9a4441809ac9331cdbc6a50fba1a8fbfd08bc490bc8644587ee84a4d6f924fea",
  unheadered:
    "12b77c4bc9c1832cee8881244659065ee1d84c70c3d29e6eaf92e6798cc2ca72",
  headeredLength: 512,
};

export const Modes = [
  {
    name: "mm",
    prefix: "DASH_v12a_SM_",
    patch: "patches/dash_std.bps",
    mask: 0x11,
    title: "Standard - Major / Minor",
  },
  {
    name: "full",
    prefix: "DASH_v12a_SF_",
    patch: "patches/dash_std.bps",
    mask: 0x21,
    title: "Standard - Full",
  },
  {
    name: "rm",
    prefix: "DASH_v12a_RM_",
    patch: "patches/dash_working.bps",
    mask: 0x12,
    title: "Recall - Major / Minor",
  },
  {
    name: "rf",
    prefix: "DASH_v12a_RF_",
    patch: "patches/dash_working.bps",
    mask: 0x22,
    title: "Recall - Full",
  },
];
