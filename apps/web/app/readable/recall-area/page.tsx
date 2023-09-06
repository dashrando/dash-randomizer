import type { Metadata, NextPage } from "next";
import { EdgeContent, Navigation, Seperator, mapArea } from "../readable";
import styles from "../readable.module.css";
import { loadGraph } from "core";
import { MajorDistributionMode, MapLayout } from "core/params";

export const metadata: Metadata = {
  title: "Readable Logic - DASH Recall Area",
  description: "DASH Recall Area logic in a human readable format",
};

const RecallAreaLogicPage: NextPage = () => {
  const graph = loadGraph(
    1,
    1,
    MapLayout.Recall,
    MajorDistributionMode.Recall,
    true
  );

let area = "";

const Edge = ({ edge }: any) => {
  // Hide constant conditions unless they are to get an item
  if (
    edge.to.type != "major" &&
    edge.to.type != "minor" &&
    (edge.condition === true || edge.condition === false)
  ) {
    return <></>;
  }
  const edgeArea = mapArea(edge.from.area);
  const showArea = edgeArea != area;
  area = edgeArea;
  return (
    <>
      {showArea ? <h2>{area}</h2> : <></>}
      <EdgeContent edge={edge} />
    </>
  );
};

  return (
    <>
      <Navigation selected="recall-area" />
      <Seperator />
      <div className={styles.logic_title}>Recall Area</div>
      <Seperator />
      {graph.map((e) => (
        <Edge edge={e} />
      ))}
    </>
  );
};

export default RecallAreaLogicPage;
