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
const reportFilePath = path.resolve(__dirname, '..', 'reports');
const config: CreeveyConfig = {
  storybookUrl,
  resolveStorybookUrl,
  webdriver: SeleniumWebdriver,
  storiesProvider: hybridStoriesProvider,
  testsRegex: /\.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, '../'),
  reportDir: reportFilePath,
  screenDir: path.join(__dirname, 'images'),
  reporter: process.env.GITLAB_CI ? 'junit' : process.env.TEAMCITY_VERSION ? 'teamcity' : undefined,
  reporterOptions: {
    outputFile: process.env.GITLAB_CI ? path.join(reportFilePath, 'junit.xml') : undefined,
  },
  gridUrl: process.env.GRID_URL,
  maxRetries: process.env.GITLAB_CI || process.env.TEAMCITY_VERSION ? 5 : 0,
  diffOptions: { threshold: 0, includeAA: false },
  browsers: {
    chrome2022: {
      browserName: 'chrome',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '127.0',
        name: 'infrafront/chrome2022',
        'se:teamname': 'front_infra',
        ...capabilities,
      },
      limit: 4,
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: { theme: 'LIGHT_THEME' },
    },
    chrome2022Dark: {
      browserName: 'chrome',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '127.0',
        name: 'infrafront/chrome2022Dark',
        'se:teamname': 'front_infra',
        ...capabilities,
      },
      limit: 4,
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: { theme: 'DARK_THEME' },
      // backgrounds: { default: 'dark' },
    },
    firefox2022: {
      browserName: 'firefox',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '128.0',
        name: 'infrafront/firefox2022',
        'se:teamname': 'front_infra',
        ...capabilities,
      },
      limit: 4,
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: { theme: 'LIGHT_THEME' },
    },
    firefox2022Dark: {
      browserName: 'firefox',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '128.0',
        name: 'infrafront/firefox2022Dark',
        'se:teamname': 'front_infra',
        ...capabilities,
      },
      limit: 4,
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: { theme: 'DARK_THEME' },
      // backgrounds: { default: 'dark' },
    },
    chromeMobile: {
      browserName: 'chrome',
      seleniumCapabilities: {
        platformName: 'linux',
        browserVersion: '127.0',
        name: 'infrafront/chromeMobile',
        'se:teamname': 'front_infra',
        ...capabilities,
      },
      viewport: { width: 400, height: 720 },
      _storybookGlobals: { theme: 'LIGHT_THEME_MOBILE' },
    },
  },
};

export default config;
