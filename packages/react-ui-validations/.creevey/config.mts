import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenv } from 'dotenv';
import { hybridStoriesProvider, CreeveyConfig } from 'creevey';
import { SeleniumWebdriver } from 'creevey/selenium';
import { storybookUrl } from './storybook-url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportFilePath = path.resolve(__dirname, "..", 'reports');

dotenv({ path: '../../.env' });

/**
 * Debugging instructions: https://wiki.skbkontur.ru/pages/viewpage.action?pageId=418699157
 * Instructions for Windows nodes: https://git.skbkontur.ru/ke/keweb.front/-/blob/f25788b0c0fce83b762e1b51553683e4d30484bd/.creevey/readme.md#debug
 */

const debug = process.env.DEBUG_SCREENSHOTS;

const capabilities = debug
  ? {
      enableVNC: true,
      enableVideo: true,
    }
  : {};

const config: CreeveyConfig = {
  storybookUrl,
  webdriver: SeleniumWebdriver,
  storiesProvider: hybridStoriesProvider,
  testsRegex: /\.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, '../'),
  reportDir: reportFilePath,
  screenDir: path.join(__dirname, 'images'),
  gridUrl: process.env.GRID_URL,
  maxRetries: process.env.GITLAB_CI || process.env.TEAMCITY_VERSION ? 5 : 0,
  reporter: process.env.GITLAB_CI ? 'junit' : 'teamcity',
  reporterOptions: {
    outputFile: process.env.GITLAB_CI ? path.join(reportFilePath, 'junit.xml') : undefined,
  },
  diffOptions: { threshold: 0, includeAA: false },
  browsers: {
    chromeDefault: {
      browserName: 'chrome',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '127.0',
        ...capabilities,
      },
      viewport: { width: 1024, height: 720 },
    },
  },
};

export default config;
