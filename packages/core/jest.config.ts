/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(j|t)s$": "ts-jest",
  },
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
