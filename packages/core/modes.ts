import * as RecallExports from "./lib/modes/modeRecall";

export type ModeExports = {
  checks: Function[];
  locations: any[];
  source: string;
};

async function getMode() {
  return {
    checks: RecallExports.LogicChecks,
    locations: [],
    path: 'packages/core/lib/modes/modeRecall.js'
  };
}

export default async function Modes() {
  const recall = await getMode();
  return {
    recall,
  };
}
