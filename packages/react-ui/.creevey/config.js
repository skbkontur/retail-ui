const path = require('path');
const axios = require('axios');
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
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: process.env.GRID_URL,
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 10 : 0,
  babelOptions: (options) => ({
    ...options,
    extends: path.join(__dirname, '../.babelrc.js'),
  }),
  diffOptions: { threshold: 0, includeAA: false },
  browsers: {
    // chrome: {
    //   browserName: 'chrome',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME_OLD',
    //   },
    //   name: 'infrafront/chrome',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // chrome8px: {
    //   browserName: 'chrome',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME',
    //   },
    //   name: 'infrafront/chrome8px',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // chromeFlat: {
    //   browserName: 'chrome',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME_OLD',
    //   },
    //   name: 'infrafront/chromeFlat',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // chromeFlat8px: {
    //   browserName: 'chrome',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME',
    //   },
    //   name: 'infrafront/chromeFlat8px',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
      name: 'infrafront/firefox',
      browserVersion: '100.0',
      version: '100.0',
      enableVNC: true,
      enableVideo: true,
      ...capabilities,
    },
    // firefox8px: {
    //   browserName: 'firefox',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME',
    //   },
    //   name: 'infrafront/firefox8px',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // firefoxFlat: {
    //   browserName: 'firefox',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME_OLD',
    //   },
    //   name: 'infrafront/firefoxFlat',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // firefoxFlat8px: {
    //   browserName: 'firefox',
    //   viewport: { width: 1024, height: 720 },
    //   platformName: 'linux',
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME',
    //   },
    //   name: 'infrafront/firefoxFlat8px',
    //   browserVersion: '100.0',
    //   version: '100.0',
    //   ...capabilities,
    // },
    // ie11: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME_OLD',
    //   },
    //   name: 'infrafront/ie11',
    //   ...capabilities,
    //
    //   // NOTE Enable after switch new separate pool for IE to allow test hover
    //   // 'se:ieOptions': {
    //   //   enablePersistentHover: true,
    //   //   nativeEvents: true,
    //   //   requireWindowFocus: true,
    //   //   'ie.usePerProcessProxy': true,
    //   //   'ie.browserCommandLineSwitches': '-private',
    //   //   'ie.ensureCleanSession': true,
    //   // },
    // },
    // ie118px: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME',
    //   },
    //   name: 'infrafront/ie118px',
    //   ...capabilities,
    // },
    // ie11Flat: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME_OLD',
    //   },
    //   name: 'infrafront/ie11Flat',
    //   ...capabilities,
    // },
    // ie11Flat8px: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME',
    //   },
    //   name: 'infrafront/ie11Flat8px',
    //   ...capabilities,
    // },
  },
};

module.exports = config;
