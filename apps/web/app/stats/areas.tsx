import { getAreaPortals, getBossPortals } from "core";
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
  const zones: [string, string[]][] = [
    ["Crateria", []],
    ["GreenBrinstar", []],
    ["RedBrinstar", []],
    ["UpperNorfair", []],
    ["LowerNorfair", []],
    ["WreckedShip", []],
    ["WestMaridia", []],
    ["EastMaridia", []],
    ["KraidsLair", []],
    ["CrocomiresLair", []],
    ["Tourian", []],
  ]
    
  getAreaPortals().forEach(p => {
    for (let j = 0; j < zones.length; j++) {
      if (zones[j][0] == p.area) {
        zones[j][1].push(p.name)
      }
    }
  })

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

const getNumSeeds_DuoToDead = (areas: Transition[],num: number) => {
  const duos = getAreaPortals()
    .filter(
      (p) =>
        p.area == "LowerNorfair" ||
        p.area == "EastMaridia" ||
        p.area == "WreckedShip"
    )
    .map((p) => p.name);
  const deads = getAreaPortals()
    .filter(
      (p) =>
        p.area == "KraidsLair" ||
        p.area == "CrocomiresLair" ||
        p.area == "Tourian"
    )
    .map((p) => p.name);

  let seeds = Array(areas.length).fill(0);
  areas.forEach((t,i) => {
    if (duos.includes(t.from)) {
      if (deads.includes(t.to)) {
        seeds[Math.floor(i / 32)] += 1;
      }
    } else if (duos.includes(t.to)) {
      if (deads.includes(t.from)) {
        seeds[Math.floor(i / 32)] += 1;
      }
    }
  })

  return seeds.reduce((partial, x) => partial + (x/2 == num ? 1 : 0), 0);
}

const getNumVanilla = (areas: Transition[]) => {
  const vanilla: any[][] = []
  getAreaPortals().forEach((v, i, arr) => {
    if (i % 2 == 1) {
      vanilla.push([arr[i-1].name, v.name])
    }
  })
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
  columnLabels,
  condense,
}: {
  transitions: Transition[];
  columnHeaders: string[];
  rowHeaders: string[];
  columnLabels: string[] | undefined;
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

  total /= rowHeaders.length;

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

  const getColumnLabels = (): string[] => {
    if (columnLabels) {
      return columnLabels
    }
    return columnHeaders
  }

  return (
    <div>
      <table className={`${styles.legacy_style} ${styles.fixed_table}`}>
        <tbody>
          {!condense ? 
          <tr key="columnHeader">
            <th className={`${def_style} ${styles.area_cell}`}></th>
            {getColumnLabels().map((c) => (
              <th key={c} className={styles.thin_border}>{c}</th>
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

function generateCombinations(
  letters: string,
  length: number,
  current: string = "",
  combinations: string[] = []
) {
  // If the current string has reached the desired length, add it to the combinations array
  if (current.length === length) {
    combinations.push(current);
    return;
  }

  // Loop through each letter in the original string and recursively build up the current string
  for (let i = 0; i < letters.length; i++) {
    generateCombinations(letters, length, current + letters[i], combinations);
  }
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
    "Exit_Kraid_KraidsLair",
    "Exit_Phantoon_KraidsLair",
    "Exit_Draygon_KraidsLair",
    "Exit_Ridley_KraidsLair",
    "Exit_Kraid_WreckedShip",
    "Exit_Phantoon_WreckedShip",
    "Exit_Draygon_WreckedShip",
    "Exit_Ridley_WreckedShip",
    "Exit_Kraid_EastMaridia",
    "Exit_Phantoon_EastMaridia",
    "Exit_Draygon_EastMaridia",
    "Exit_Ridley_EastMaridia",
    "Exit_Kraid_LowerNorfair",
    "Exit_Phantoon_LowerNorfair",
    "Exit_Draygon_LowerNorfair",
    "Exit_Ridley_LowerNorfair"
  ]
  const bossColumnLabels = [
    "Kraid Brin",
    "Phantoon Brin",
    "Draygon Brin",
    "Ridley Brin",
    "Kraid WS",
    "Phantoon WS",
    "Draygon WS",
    "Ridley WS",
    "Kraid EM",
    "Phantoon EM",
    "Draygon EM",
    "Ridley EM",
    "Kraid LN",
    "Phantoon LN",
    "Draygon LN",
    "Ridley LN"
  ]
  const bossRows = getBossPortals()
    .filter((p) => p.name.startsWith("Door_"))
    .map((p) => p.name);
  const areaDoors = getAreaPortals().map(p => p.name)

  const stringCombos: string[] = []
  generateCombinations('KPDR', 4, '', stringCombos)
  const bossCombos = stringCombos.map(s => {
    return {
      name: s,
      count: 0
    }
  })

  for (let i = 0; i < bosses.length; i += 4) {
    let combo = ''
    for (let j = 0; j < 4; j++) {
      if (bosses[i + j].from.startsWith('Exit_Kraid')) {
        combo += 'K'
      } else if (bosses[i + j].from.startsWith('Exit_Phantoon')) {
        combo += 'P'
      } else if (bosses[i + j].from.startsWith('Exit_Draygon')) {
        combo += 'D'
      } else if (bosses[i + j].from.startsWith('Exit_Ridley')) {
        combo += 'R'
      }
    }
    const obj = bossCombos.find(b => b.name == combo)
    if (obj) {
      obj.count += 1
    }
  }

  const toPercent = (count: number) => {
    return (count * 100 / seeds).toFixed(2) + '%'
  }

  return (
    <div>
      <h3>Bosses</h3>
      <p className={styles.boss_summary}>
        {bossCombos
          .sort((a, b) => b.count - a.count)
          .map((p, i) => {
            return (
              <span className={styles.boss_combo} key={p.name}>
                {p.name} {toPercent(p.count)}
              </span>
            );
          })}
      </p>
      <p>
        <span style={{ paddingLeft: "20px" }}>
          No Phantoon:{" "}
          {toPercent(
            bossCombos
              .filter((b) => !b.name.includes("P"))
              .map((b) => b.count)
              .reduce((p, c) => p + c, 0)
          )}
        </span>
        <span style={{ paddingLeft: "20px" }}>
          All Same:{" "}
          {toPercent(
            bossCombos
              .filter(
                (b) =>
                  b.name == "KKKK" ||
                  b.name == "PPPP" ||
                  b.name == "DDDD" ||
                  b.name == "RRRR"
              )
              .map((b) => b.count)
              .reduce((p, c) => p + c, 0)
          )}
        </span>
      </p>
      <TransitionTable
        transitions={bosses}
        columnHeaders={bossColumns}
        rowHeaders={bossRows}
        columnLabels={bossColumnLabels}
        condense={false}
      />
      <h3>Areas</h3>
      <p>
        <span>Total Transitions: {areas.length}</span>
        <span style={{ paddingLeft: "20px" }}>
          Intra-Area Count: {getNumLoops(areas)}
        </span>
        <span style={{ paddingLeft: "20px" }}>
          Vanilla Count: {getNumVanilla(areas)}
        </span>
        <span style={{ paddingLeft: "20px" }}>
          1 Duo-to-Dead Seeds: {getNumSeeds_DuoToDead(areas, 1)}
        </span>
        <span style={{ paddingLeft: "20px" }}>
          2 Duo-to-Dead Seeds: {getNumSeeds_DuoToDead(areas, 2)}
        </span>
        <span style={{ paddingLeft: "20px" }}>
          3 Duo-to-Dead Seeds: {getNumSeeds_DuoToDead(areas, 3)}
        </span>
      </p>
      <TransitionTable
        transitions={areas}
        columnHeaders={areaDoors}
        rowHeaders={areaDoors}
        columnLabels={undefined}
        condense={true}
      />
    </div>
  );
}
