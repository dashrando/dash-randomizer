import styles from "./areas.module.css";

export type Transition = {
  from: string;
  to: string;
};

type TransitionRow = {
  from: string;
  to: string;
  count: number;
};

const getNumLoops = (areas: Transition[]) => {
  const zones = [
    ["Crateria", [
      "Door_RetroPBs",
      "Door_Moat",
      "Door_G4",
      "Door_Kago",
      "Door_Crabs"
    ]],
    ["Green Brinstar", [
      "Door_GreenHills",
      "Door_GreenElevator",
      "Door_NoobBridge"
    ]],
    ["Red Brinstar", [
      "Door_RedElevator",
      "Door_RedTower",
      "Door_MaridiaEscape",
      "Door_MaridiaTube",
      "Door_KraidEntry",
      "Door_AboveKraid",
    ]],
    ["Upper Norfair", [
      "Door_ElevatorEntry",
      "Door_KraidMouth",
      "Door_CrocEntry", 
      "Door_SingleChamber",
      "Door_LavaDive",
    ]],
    ["Lower Norfair", [
      "Door_Muskateers",
      "Door_RidleyMouth",
    ]],
    ["Wrecked Ship", [
      "Door_Ocean",
      "Door_HighwayExit",
    ]],
    ["West Maridia", [
      "Door_PreAqueduct",
      "Door_RedFish",
      "Door_MainStreet",
      "Door_MaridiaMap",
    ]],
    ["East Maridia", [
      "Door_Aqueduct",
      "Door_Highway",
    ]],
    ["Kraid's Lair", [
      "Door_KraidsLair",
    ]],
    ["Crocomire's Lair", [
      "Door_Croc"
    ]],
    ["Tourian", [
      "Door_Tourian"
    ]]
  ]

  let numLoops = 0;
  zones.forEach(z => {
    for (let i = 0; i < z[1].length - 1; i++) {
      areas.forEach(t => {
        if (t.from != z[1][i]) {
          return;
        }
        for (let j = i + 1; j < z[1].length; j++) {
          if (t.to == z[1][j]) {
            numLoops += 1;
          }
        }
      });
    }
  })
  return numLoops;
}

const getNumVanilla = (areas: Transition[]) => {
  const vanilla = [
    // Crateria / Blue Brinstar
    ["Door_RetroPBs", "Door_GreenHills"],
    ["Door_Moat", "Door_Ocean"],
    ["Door_G4", "Door_Tourian"],
    ["Door_Kago", "Door_GreenElevator"],
    ["Door_Crabs", "Door_RedElevator"],
    // Wrecked Ship
    ["Door_HighwayExit", "Door_Highway"],
    // Green / Pink Brinstar
    ["Door_NoobBridge", "Door_RedTower"],
    // Red Brinstar
    ["Door_MaridiaEscape", "Door_RedFish"],
    ["Door_MaridiaTube", "Door_MainStreet"],
    ["Door_KraidEntry", "Door_ElevatorEntry"],
    ["Door_AboveKraid", "Door_MaridiaMap"],
    // Upper Norfair
    ["Door_KraidMouth", "Door_KraidsLair"],
    ["Door_CrocEntry", "Door_Croc"],
    ["Door_SingleChamber", "Door_Muskateers"],
    ["Door_LavaDive", "Door_RidleyMouth"],
    // West Maridia
    ["Door_PreAqueduct", "Door_Aqueduct"],
  ];
  let count = 0;
  vanilla.forEach((p) => {
    areas.forEach((t,i) => {
      if (t.from == p[0] && t.to == p[1]) {
        count += 1;
      } else if (t.to == p[0] && t.from == p[1]) {
        count += 1;
      }
    });
  });
  return count / 2;
}

function TransitionTable({
  transitions,
  columnHeaders,
  rowHeaders,
  seeds,
  condense,
}: {
  transitions: Transition[];
  columnHeaders: string[];
  rowHeaders: string[];
  seeds: number;
  condense: boolean;
}) {
  const temp: TransitionRow[] = [];
  let total = 0;

  columnHeaders.forEach(c => {
    rowHeaders.forEach(r => {
      temp.push({
        from: c,
        to: r,
        count: 0
      })
    })
  });

  const cols = transitions.filter(t => columnHeaders.includes(t.from));

  cols.forEach((t) => {
    let existing = temp.find((r) => r.from == t.from && r.to == t.to);
    if (existing != undefined) {
      existing.count += 1;
      total += 1;
    }
  });

  total /= columnHeaders.length;

  const getColumns = (row: string) => {
    const columns: TransitionRow[] = [];
    columnHeaders.forEach((c) => {
      const cell = temp.find((t) => t.from == c && t.to == row);
      if (cell != undefined) {
        columns.push(cell);
      }
    });
    return columns;
  };

  const def_style = `${styles.thin_border}` +
    (condense ? ` ${styles.condensed_cell}` : "");

  return (
    <div>
      <table className={`${styles.legacy_style} ${styles.fixed_table}`}>
        <tbody>
          {!condense ? 
          <tr key="columnHeader">
            <th className={`${def_style} ${styles.area_cell}`}></th>
            {columnHeaders.map((c) => (
              <th key={c} className={styles.thin_border}>
                {c.substring(5)}
              </th>
            ))}
          </tr>
          : <></>
          }
          {rowHeaders.map((r) => (
            <tr key={r}>
              {!condense ? 
              <td className={styles.thin_border}>{r}</td>
              : <></>
              }
              {getColumns(r).map((c) => (
                <td key={`${r}_${c.from}`}
                  className={c.count == 0 ?
                    `${def_style} ${styles.gray_cell}` :
                    `${def_style} ${styles.area_cell}`}
                  title={`${r} to ${c.from.substring(5)}`}>
                {`${
                  total == 0 ? "" : (c.count / total * 100).toFixed(1) + "%"
                  /*+ "  " + c.count + "   " + total*/
                }`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AreaDoorTable({
  bosses,
  areas,
  seeds
}: {
  bosses: Transition[];
  areas: Transition[];
  seeds: number;
}) {
  const bossColumns = [
    "Exit_Kraid",
    "Exit_Phantoon",
    "Exit_Draygon",
    "Exit_Ridley"
  ]
  const bossRows = [
    "Door_KraidBoss",
    "Door_PhantoonBoss",
    "Door_DraygonBoss",
    "Door_RidleyBoss"
  ]
  const areaDoors = [
    "Door_RetroPBs", "Door_GreenHills",
    "Door_Moat", "Door_Ocean",
    "Door_G4", "Door_Tourian",
    "Door_Kago", "Door_GreenElevator",
    "Door_Crabs", "Door_RedElevator",
    "Door_HighwayExit", "Door_Highway",
    "Door_NoobBridge", "Door_RedTower",
    "Door_MaridiaEscape", "Door_RedFish",
    "Door_MaridiaTube", "Door_MainStreet",
    "Door_KraidEntry", "Door_ElevatorEntry",
    "Door_AboveKraid", "Door_MaridiaMap",
    "Door_KraidMouth", "Door_KraidsLair",
    "Door_CrocEntry", "Door_Croc",
    "Door_SingleChamber", "Door_Muskateers",
    "Door_LavaDive", "Door_RidleyMouth",
    "Door_PreAqueduct", "Door_Aqueduct",
  ]
  return (
    <div>
      <h3>Bosses</h3>
      <TransitionTable
        transitions={bosses}
        columnHeaders={bossColumns}
        rowHeaders={bossRows}
        seeds={seeds}
        condense={false} />
      <h3>Areas</h3>
      <p>
        <span>Total Transitions: {areas.length}</span>
        <span style={{paddingLeft: '20px'}}>Intra-Area Count: {getNumLoops(areas)}</span>
        <span style={{paddingLeft: '20px'}}>Vanilla Count: {getNumVanilla(areas)}</span>
      </p>
      <TransitionTable
        transitions={areas}
        columnHeaders={areaDoors}
        rowHeaders={areaDoors}
        seeds={seeds}
        condense={true} />
    </div>
  );
}
