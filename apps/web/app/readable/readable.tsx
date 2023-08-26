import styles from "./readable.module.css";

import { Logic } from "core";
import Link from "next/link";

type Token = {
  name: string;
  criteria: string;
};

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

const formatCriteria = (criteria: string): string => {
  const formatted = criteria
    .replace("=>", "")
    .replace(/\(load\)/g, "")
    .replace(/load\./g, "")
    .replace("return", "")
    .replace(/{|}|;/g, "")
    .replace(/&&/g, "AND")
    .replace(/\|\|/g, "OR")
    .replace(/(\r\n|\r|\n)/g, "")
    .replace(/\s+/g, " ")
    .replace(/true/g, "Always Accessible")
    .replace(/>=/g, "is greater than or equal to")
    .replace(/>/g, "is greater than")
    .trim();

  if (
    formatted.length > 2 &&
    formatted[0] == "(" &&
    formatted[formatted.length - 1] == ")"
  ) {
    return formatted.substring(1, formatted.length - 2).trim();
  } else {
    return formatted;
  }
};

const tokenizeLogic = (logic: any): Token[] => {
  const nodeToToken = (node: any): Token => {
    const type = node.isMajor ? "Major" : "Minor";
    const func = node.available.toString();
    return {
      name: `${type} Item - ${node.name}`,
      criteria: formatCriteria(func),
    };
  };

  const funcToToken = (func: any): Token => {
    return {
      name: func[0],
      criteria: formatCriteria(func[1].toString()),
    };
  };

  return Object.entries(logic.LogicChecks)
    .map((n: any) => funcToToken(n))
    .concat(logic.LogicLocations.map((n: any) => nodeToToken(n)));
};

const loadLogic = (logicType: string): { title: string; tokens: Token[] } => {
  if (logicType == "recall") {
    return {
      title: "DASH - Recall Logic",
      tokens: tokenizeLogic(Logic.recall),
    };
  } else {
    return {
      title: "DASH - Standard Logic",
      tokens: tokenizeLogic(Logic.standard),
    };
  }
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

const ReadableLogic = ({ type }: { type: string }) => {
  const { title, tokens } = loadLogic(type);

  const Criteria = ({ value }: { value: string }) => {
    let parts: string[] = [" "];

    value.split(/\s|\)|\(/).forEach((w: string) => {
      if (tokens.some((t) => t.name == w)) {
        parts.push(w);
        parts.push(" ");
      } else {
        parts[parts.length - 1] += w + " ";
      }
    });

    return (
      <div className={styles.token_criteria}>
        {parts.map((p) => {
          if (p.startsWith(" ")) {
            return p;
          }
          return <Popup key={p} reference={p} />;
        })}
      </div>
    );
  };

  const Popup = ({ reference }: { reference: string }) => {
    const def = tokens.find((t) => t.name == reference);
    return (
      <span className={`${styles.token_reference} ${styles.popup}`}>
        <span className={styles.popuptext}>{def?.criteria}</span>
        {reference}
      </span>
    );
  };

  return (
    <>
      <Seperator />
      <div className={styles.logic_title}>{title}</div>
      <Seperator />
      <div style={{ border: '1px solid #222', backgroundColor: '#010101', display: 'inline-flex', padding: '8px 16px', borderRadius: '8px', margin: '16px 0', maxWidth: '440px', fontSize: '16px', lineHeight: '24px' }}>
        <p><strong style={{ color: '#fff' }}>Warning:</strong> The following logic does not account for Area Randomization or Boss Shuffle, both of which are in alpha.</p>
      </div>
      <div className={styles.logic}>
        {tokens.map((t: Token) => {
          return (
            <div key={t.name} className={styles.token}>
              <div className={styles.token_name}>{t.name}</div>
              <Criteria value={t.criteria} />
            </div>
          );
        })}
      </div>
      <Seperator />
    </>
  );
};

export default function LogicPage({ type }: { type: string }) {
  return (
    <>
      <Navigation selected={type} />
      <ReadableLogic type={type} />
    </>
  )
}
