import { EdgeContent, Navigation, Seperator, mapArea } from "../readable";
import styles from "../readable.module.css";
import { loadGraph } from "core";
import { MajorDistributionMode, MapLayout } from "core/params";

export async function generateMetadata ({ params }: { params: { graph: string } }) {
  const name = getGraphName(params.graph)
  return {
    title: `Readable Logic - DASH ${name}`,
    description: `DASH ${name} logic in a human readable format`,
  }
};

export async function generateStaticParams() {
  return [
    { graph: 'standard' },
    { graph: 'standard-area' },
    { graph: 'recall' },
    { graph: 'recall-area' },
  ]
}

const getGraphName = (graph: any) => {
  switch (graph) {
    case 'standard':
      return 'Standard';
    case 'standard-area':
      return 'Standard Area';
    case 'recall':
      return 'Recall';
    case 'recall-area':
      return 'Recall Area';
  }
}

const getMode = (graph: string) => {
  switch (graph) {
    case 'standard':
    case 'standard-area':
      return 'Standard';
    case 'recall':
      case 'recall-area':
      return 'Recall';
    default:
      throw Error('Invalid graph')
  }
}

const LogicPage = ({ params }: { params: { graph: string }}) => {
  const hasArea = params.graph.includes('area')
  const mode = getMode(params.graph)
  const graph = loadGraph(
    1,
    1,
    MapLayout[mode],
    MajorDistributionMode[mode],
    hasArea
  );

  let area = "";

  const Edge = ({ edge }: any) => {
    // Hide constant conditions unless they are to get an item
    if (
      edge.to.type != "major" &&
      edge.to.type != "minor" &&
      (edge.condition === true || edge.condition === false)
    ) {
      return null
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

  const displayName = getGraphName(params.graph)
  return (
    <>
      <Navigation selected={params.graph} />
      <Seperator />
      <div className={styles.logic_title}>{displayName}</div>
      <Seperator />
      {graph.map((e, index) => (
        <Edge key={index} edge={e} />
      ))}
    </>
  );
};

export default LogicPage;
