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

function TransitionTable({
  transitions,
  columnHeaders,
  rowHeaders,
  seeds,
}: {
  transitions: Transition[];
  columnHeaders: string[];
  rowHeaders: string[];
  seeds: number;
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

  return (
    <div>
      <table className={`${styles.legacy_style} ${styles.fixed_table}`}>
        <tbody>
          <tr key="columnHeader">
            <th className={`${styles.thin_border} ${styles.area_cell}`}></th>
            {columnHeaders.map((c) => (
              <th key={c} className={styles.thin_border}>
                {c.substring(5)}
              </th>
            ))}
          </tr>
          {rowHeaders.map((r) => (
            <tr key={r}>
              <td className={styles.thin_border}>{r.substring(5)}</td>
              {getColumns(r).map((c) => (
                <td key={`${r}_${c.from}`} className={c.count == 0 ?
                  `${styles.thin_border} ${styles.gray_cell}` :
                  `${styles.thin_border} ${styles.area_cell}`}>
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
      <TransitionTable transitions={bosses} columnHeaders={bossColumns} rowHeaders={bossRows} seeds={seeds} />
      <TransitionTable transitions={areas} columnHeaders={areaDoors} rowHeaders={areaDoors} seeds={seeds} />
    </div>
  );
}
