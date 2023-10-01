const MODES = [
  {
    name: "sm",
    prefix: "DASH_v12a_SM_",
    patch: "patches/dash_std.bps",
    mask: 0x11,
    title: "Standard - Major / Minor",
  },
  {
    name: "sf",
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

export default MODES;
