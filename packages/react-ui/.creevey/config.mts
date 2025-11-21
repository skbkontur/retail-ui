import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenv } from 'dotenv';
import { hybridStoriesProvider, CreeveyConfig } from 'creevey';
import { PlaywrightWebdriver } from 'creevey/playwright';
import type { LaunchOptions } from 'playwright-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv({ path: '../../.env' });

/**
 * Debugging instructions: run 'creevey --debug' for record full trace in report
 * find in logs broken test, example [chrome2022:36368], and find folder 36368 in reports/traces folder,
 * and see trace in https://trace.playwright.dev, docs: https://playwright.dev/docs/trace-viewer
 */

const isCI = Boolean(process.env.CI) || Boolean(process.env.GITLAB_CI);
const reportFilePath = path.resolve(__dirname, '..', 'reports');
const browsersLimit = Number(process.env.CREEVEY_BROWSERS_LIMIT) || (isCI ? 1 : 3);
const playwrightOptions: LaunchOptions = {
  ignoreDefaultArgs: ['--hide-scrollbars'],
};
const config: CreeveyConfig = {
  useDocker: !isCI,
  webdriver: PlaywrightWebdriver,
  storybookAutorunCmd: 'yarn storybook',
  storiesProvider: hybridStoriesProvider,
  testsRegex: /\.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, '../'),
  reportDir: reportFilePath,
  screenDir: path.join(__dirname, 'images'),
  maxRetries: 3,
  reporter: isCI ? 'junit' : undefined,
  reporterOptions: {
    outputFile: isCI ? path.join(reportFilePath, 'junit.xml') : undefined,
  },
  diffOptions: { threshold: 0.005, includeAA: false },
  browsers: {
    chrome2022: {
      browserName: 'chromium',
      viewport: { width: 1024, height: 720 },
      limit: browsersLimit,
      _storybookGlobals: { theme: 'LIGHT_THEME' },
      playwrightOptions,
    },
    chrome2022Dark: {
      browserName: 'chromium',
      viewport: { width: 1024, height: 720 },
      limit: browsersLimit,
      _storybookGlobals: { theme: 'DARK_THEME' },
      playwrightOptions,
    },
    firefox2022: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: browsersLimit,
      _storybookGlobals: { theme: 'LIGHT_THEME' },
      playwrightOptions,
    },
    firefox2022Dark: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: browsersLimit,
      _storybookGlobals: { theme: 'DARK_THEME' },
      playwrightOptions,
    },
    chromeMobile: {
      browserName: 'chromium',
      viewport: { width: 500, height: 720 },
      _storybookGlobals: { theme: 'LIGHT_THEME_MOBILE' },
    },
  },
  experimental: {
    npmRegistry: process.env.PACKAGE_REGISTRY,
    reportOnlyFailedTests: isCI,
  },
};

export default config;
