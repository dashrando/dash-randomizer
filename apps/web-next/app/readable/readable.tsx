import "@/public/styles/dash.css";
import "@/public/styles/readable.css";
import styles from "./readable.module.css";

import { Logic } from "core";
import Link from "next/link";

type Token = {
  name: string;
  criteria: string;
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

const Navigation = ({ selected }: { selected: string }) => {
  return (
    <div className={styles.nav_bar}>
      <span className={styles.nav_title}>Select Logic:</span>
      <span className={`${styles.nav_link} ${selected == "recall" ? `${styles.selected}` : ""}`}>
        <Link href="/readable/recall">Recall</Link>
      </span>
      <span className={`${styles.nav_link} ${selected == "standard" ? `${styles.selected}` : ""}`}>
        <Link href="/readable/standard">Standard</Link>
      </span>
    </div>
  );
};

export default function ReadableLogic({ logicType }: { logicType: string }) {
  const { title, tokens } = loadLogic(logicType);

const Criteria = ({ value }: { value: string}) => {
  const formatWord = (word: string) => {
    if (tokens.some(t => t.name == word)) {
      return (
        <span className={styles.token_reference}>
          {word+" "}
        </span>
      )
    }
    return (
      word+" "
    );
  }
  return (
    <div className={styles.token_criteria}>
    {value.split(" ").map(w => formatWord(w))}
    </div>
  )
}

  return (
    <>
      <div id="wrapper">
        <div id="header">
          <a href="/">
            <img
              src="/images/dashLogo-noBG.png"
              alt="Super Metroid DASH Randomizer"
            />
          </a>
        </div>

        <Navigation selected={logicType} />

        <hr />
        <div className={styles.logic_title}>{title}</div>
        <hr />
        <div id="logic">
          {tokens.map((t: Token) => {
            return (
              <div key={t.name} className={styles.token}>
                <div className={styles.token_name}>{t.name}</div>
                <Criteria value={t.criteria} />
              </div>
            );
          })}
        </div>
        <hr />
        <br />
        <br />
      </div>
    </>
  );
}
