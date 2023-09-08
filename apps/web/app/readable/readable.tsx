import styles from "./readable.module.css";
import * as prettier from "prettier";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

export const mapArea = (graphArea: string) => {
  switch (graphArea) {
    case "BlueBrinstar":
      return "Crateria";
    case "GreenBrinstar":
      return "Green Brinstar";
    case "WreckedShip":
      return "Wrecked Ship";
    case "LowerNorfair":
      return "Lower Norfair";
    case "UpperNorfair":
      return "Upper Norfair";
    case "EastMaridia":
      return "East Maridia";
    case "WestMaridia":
      return "West Maridia";
    case "RedBrinstar":
      return "Red Brinstar";
    case "CrocomiresLair":
      return "Crocomire's Lair";
    case "KraidsLair":
      return "Kraid's Lair";
    default:
      return graphArea;
  }
};

const getBody = (func: any): string => {
  const full = func.toString();
  if (full.indexOf("{") < 0) {
    return full;
  }
  return full
    .slice(full.indexOf("{") + 1, full.lastIndexOf("}"))
    .replace(/return /g, "")
    .replace(/;/g, "")
    .replace(/\/\/.*/g, "")
    .replace(/[\n\r]/g, "")
    .trim();
};

export const EdgeContent = ({ edge }: any) => {
  const e = edge;

  let condition = getBody(e.condition);
  if (condition.startsWith("()=>")) {
    condition = condition.slice(4);
  }
  condition = prettier.format(condition, { semi: false, parser: "babel", printWidth: 68 });
  if (condition[0] == ";") {
    condition = condition.slice(1);
  }
  condition = condition.replace(/\|\|/g, "OR");
  condition = condition.replace(/&&/g, "AND");
  return (
    <div className={styles.edge}>
      From <strong>{e.from.name}</strong> to <strong>{e.to.name}</strong>
      <pre>
        <code>{condition}</code>
      </pre>
    </div>
  );
};

export const Navigation = ({ selected }: { selected: string }) => {
  const options = [
    {
      name: 'Standard',
      slug: 'standard',
    },
    {
      name: 'Standard Area',
      slug: 'standard-area',
    },
    {
      name: 'Recall',
      slug: 'recall',
    },
    {
      name: 'Recall Area',
      slug: 'recall-area',
    }
  ]
  return (
    <nav className={styles.nav_bar}>
      <ul>
        {options.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/readable/${slug}`} className={cn(slug === selected && styles.active)}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
