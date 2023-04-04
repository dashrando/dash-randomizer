import * as RecallExports from "./lib/modes/modeRecall";

function getSourcePath() {
  const branch = process.env.GIT_BRANCH;
  const repo = process.env.GIT_REPO;
  return `https://raw.githubusercontent.com/${repo}/${branch}/packages/core/lib/modes/modeRecall.js`;
}

export type ModeExports = {
  checks: Function[];
  locations: any[];
  source: string;
};

async function getMode() {
  return {
    checks: RecallExports.LogicChecks,
    locations: [],
    source: getSourcePath(),
  };
}

export default async function Modes() {
  const recall = await getMode();
  return {
    recall,
  };
}
