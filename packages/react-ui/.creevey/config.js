const path = require('path');

const axios = require('axios');
const { hybridStoriesProvider } = require('creevey');

require('dotenv').config({ path: '../../.env' });

/**
 * Debuggin instructions: https://wiki.skbkontur.ru/pages/viewpage.action?pageId=418699157
 * Instructions for Windows nodes: https://git.skbkontur.ru/ke/keweb.front/-/blob/f25788b0c0fce83b762e1b51553683e4d30484bd/.creevey/readme.md#debug
 */

const debug = process.env.DEBUG_SCREENSHOTS;

const capabilities = debug
  ? {
      enableVNC: true,
      enableVideo: true,
    }
  : {};

const resolverStorybookUrl = (port) => ({
  storybookUrl: `http://localhost:${port}`,
  resolveStorybookUrl:
    process.env.GET_IP_URL && (() => axios(process.env.GET_IP_URL).then((res) => `http://${res.data}:${port}`)),
});

const config = {
  ...resolverStorybookUrl(6060),
  storiesProvider: hybridStoriesProvider,
  testsDir: path.join(__dirname, '../'),
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: process.env.GRID_URL,
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 5 : 0,
  babelOptions: (options) => ({
    ...options,
    extends: path.join(__dirname, '../.babelrc.js'),
  }),
  diffOptions: { threshold: 0, includeAA: false },
  browsers: {
    chrome2022: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'LIGHT_THEME',
      },
      name: 'infrafront/chrome2022',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chrome2022Dark: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DARK_THEME',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/chrome2022Dark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefox2022: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'LIGHT_THEME',
      },
      name: 'infrafront/firefox2022',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefox2022Dark: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DARK_THEME',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/firefox2022Dark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chromeMobile: {
      browserName: 'chrome',
      viewport: { width: 400, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'LIGHT_THEME_MOBILE',
      },
      name: 'infrafront/chromeMobile',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
  },
};

module.exports = config;
