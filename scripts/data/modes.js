const MODES = [
  {
     name: "mm",
     prefix: "DASH_v11r_SM_",
     patch: "patches/dash_std.bps",
     mask: 0x11,
     title: "Standard - Major / Minor",
  },
  {
     name: "full",
     prefix: "DASH_v11r_SF_",
     patch: "patches/dash_std.bps",
     mask: 0x21,
     title: "Standard - Full",
  },
  {
     name: "rm",
     prefix: "DASH_v11r_RM_",
     patch: "patches/dash_working.bps",
     mask: 0x12,
     title: "Recall - Major / Minor",
  },
  {
     name: "rf",
     prefix: "DASH_v11r_RF_",
     patch: "patches/dash_working.bps",
     mask: 0x22,
     title: "Recall - Full",
  },
];

export default MODES
