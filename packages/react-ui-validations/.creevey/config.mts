import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenv } from 'dotenv';
import { hybridStoriesProvider, CreeveyConfig } from 'creevey';
import { PlaywrightWebdriver } from 'creevey/playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportFilePath = path.resolve(__dirname, '..', 'reports');

dotenv({ path: '../../.env' });

/**
 * Debugging instructions: run 'creevey --debug' for record full trace in report
 * find in logs broken test, example [chrome2022:36368], and find folder 36368 in reports/traces folder,
 * and see trace in https://trace.playwright.dev, docs: https://playwright.dev/docs/trace-viewer
 */

const isCI = Boolean(process.env.CI) || Boolean(process.env.GITLAB_CI);

const config: CreeveyConfig = {
  useDocker: !isCI,
  webdriver: PlaywrightWebdriver,
  storybookAutorunCmd: 'yarn storybook',
  storiesProvider: hybridStoriesProvider,
  testsRegex: /\.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, '../'),
  reportDir: reportFilePath,
  screenDir: path.join(__dirname, 'images'),
  maxRetries: isCI ? 5 : 0,
  reporter: isCI ? 'junit' : undefined,
  reporterOptions: {
    outputFile: isCI ? path.join(reportFilePath, 'junit.xml') : undefined,
  },
  diffOptions: { threshold: 0.005, includeAA: false },
  browsers: {
    chromeDefault: {
      browserName: 'chromium',
      viewport: { width: 1024, height: 720 },
    },
  },
  experimental: {
    npmRegistry: process.env.PACKAGE_REGISTRY,
    reportOnlyFailedTests: isCI,
  },
};

export default config;
