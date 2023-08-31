import styles from "./readable.module.css";

import Link from "next/link";

export const Seperator = () => (
  <div className={styles.seperator}>
    <hr />
  </div>
)

export const Entry = ({ name, children }: any) => {
  return (
    <div key={name} className={styles.token}>
      <div className={styles.token_name}>{name}</div>
      <div className={styles.token_criteria}>
      {children}
      </div>
    </div>
  );
};

export const Navigation = ({ selected }: { selected: string }) => {
  return (
    <div className={styles.nav_bar}>
      <span className={styles.nav_title}>Select Logic:</span>
      <span
        className={`${styles.nav_link} ${
          selected == "recall" ? `${styles.selected}` : ""
        }`}
      >
        <Link href="/readable/recall">Recall</Link>
      </span>
      <span
        className={`${styles.nav_link} ${
          selected == "standard" ? `${styles.selected}` : ""
        }`}
      >
        <Link href="/readable/standard">Standard</Link>
      </span>
    </div>
  );
};

export default function LogicPage({ type }: { type: string }) {
  return (
    <>
      <Navigation selected={type} />
    </>
  )
}
