import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenv } from 'dotenv';
import { hybridStoriesProvider, CreeveyConfig } from 'creevey';
import { SeleniumWebdriver } from 'creevey/selenium';
import { storybookUrl, resolveStorybookUrl } from './storybook-url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  resolveStorybookUrl,
  webdriver: SeleniumWebdriver,
  storiesProvider: hybridStoriesProvider,
  testsRegex: /.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, '../'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: process.env.GRID_URL,
  maxRetries: process.env.TEAMCITY_VERSION ? 5 : 0,
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
