"use client";

import React from "react";
import styles from "./page.module.css";
import "./tracker.css";
import TrackerItemGrouping from "./components/trackerItemGrouping";
import trackerJson from "./checks";

function TrackerPage() {
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h2>Super Metroid: DASH Recall</h2>
        <div className="groups">
          {trackerJson.map((group, i) => (
            <TrackerItemGrouping
              groupIcon={group.groupIcon}
              groupedItems={group.groupedItems}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default TrackerPage;
