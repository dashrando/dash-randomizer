"use client";

import "@/public/styles/dash.css";
import "@/public/styles/readable.css";
import styles from "./page.module.css";

import { useState } from "react";
import { Logic } from "core";

type Token = {
  name: string;
  criteria: string;
};

const formatCriteria = (criteria: string): string => {
  const formatted = criteria
    .replace("(load) => ", "")
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
  /*const nodeToToken = (node: any): Token => {
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
    */
   return logic.LogicChecks.concat(logic.LogicLocations);
};

const loadLogic = (logicType: string): { title: string; tokens: any } => {
  if (logicType == "rml") {
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

export default function ReadableLogicPage() {
  const [logicType, setLogicType] = useState("rml");

  const { title, tokens } = loadLogic(logicType);

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
        <div id="select_logic_dropdown">
          <label htmlFor="logic_type">Select Logic:</label>
          <select
            name="logic_type"
            id="logic_type"
            value={logicType}
            onChange={(e) => setLogicType(e.target.value)}
          >
            <option value="sml">DASH - Standard</option>
            <option value="rml">DASH - Recall</option>
          </select>
        </div>
        <hr />
        <div id="logic_title">{title}</div>
        <hr />
        <div id="logic">
          {tokens.map((t: Token) => {
            return (
              <div key={t.name} className={styles.token}>
                <div className={styles.token_name}>{t.name}</div>
                <div className={styles.token_criteria}>{t.criteria}</div>
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
