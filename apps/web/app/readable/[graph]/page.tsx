import Spacer from "@/app/components/spacer";
import { EdgeContent, Navigation, mapArea } from "../readable";
import styles from "../readable.module.css";
import { Edge, loadGraph } from "core";
import { MajorDistributionMode, MapLayout } from "core/params";
import LoadoutChecks from "./loadout";
import { cn } from "@/lib/utils";

export async function generateMetadata ({ params }: { params: { graph: string } }) {
  const name = getGraphName(params.graph)
  return {
    title: `Readable Logic - ${name} - DASH`,
    description: `${name} logic in a human readable format`,
  }
};

export async function generateStaticParams() {
  return [
    { graph: 'standard' },
    { graph: 'area' },
  ]
}

const getGraphName = (graph: string) => {
  switch (graph) {
    case 'standard':
      return 'Standard';
    case 'area':
      return 'Area Rando';
  }
}

const getMajorMode = (graph: string) => {
  switch (graph) {
    case 'standard':
    case 'area':
      return MajorDistributionMode.Standard
    default:
      throw Error('Invalid graph')
  }
}

const LogicPage = ({ params }: { params: { graph: string }}) => {
  const hasArea = params.graph.includes('area')
  const majorMode = getMajorMode(params.graph)
  const graph = loadGraph(
    1,
    1,
    MapLayout.Standard,
    majorMode,
    hasArea
  );

  let area = "";

  const Edge = ({ edge }: { edge: Edge }) => {
    // Hide constant conditions unless they are to get an item
    const notMajorMinor = edge.to.type != "major" && edge.to.type != "minor"
    const hideConstant = (edge.condition === true || edge.condition === false)
    const hideBoss = edge.from.type == "boss"
    const hideEdge = (notMajorMinor && hideConstant) || hideBoss
    if (hideEdge) {
      return null
    }

    const edgeArea = mapArea(edge.from.area);
    const showArea = edgeArea != area;
    area = edgeArea;
    return (
      <>
        {showArea && <h2 className={styles.areaTitle}>{area}</h2>}
        <EdgeContent edge={edge} />
      </>
    );
  };

  const displayName = getGraphName(params.graph)
  return (
    <div style={{ maxWidth: '628px', margin: '0 auto' }}>
      <div className={styles.logic_title}>{displayName} Logic</div>
      <Navigation selected={params.graph} />
      <Spacer y={12} />
      <h2 className={styles.areaTitle}>Utility Checks</h2>
      {LoadoutChecks.map((check) => (
        <div key={check.name} className={cn(styles.edge, styles.utilityCheck)}>
          <strong>{check.name}</strong>
          <pre>
            <code>{check.condition}</code>
          </pre>
        </div>
      ))}
      
      {graph.map((e, index) => (
        <Edge key={index} edge={e} />
      ))}
    </div>
  );
};

export default LogicPage;
