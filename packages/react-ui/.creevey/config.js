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
    chrome8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_8PX_OLD',
      },
      name: 'infrafront/chrome8px',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chromeFlat8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'FLAT_THEME_8PX_OLD',
      },
      name: 'infrafront/chromeFlat8px',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chrome: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
      name: 'infrafront/chrome',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chromeDark: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DARK_THEME',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/chromeDark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    chrome2022: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'THEME_2022',
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
        theme: 'THEME_2022_DARK',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/chrome2022Dark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefox8px: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_8PX_OLD',
      },
      name: 'infrafront/firefox8px',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefoxFlat8px: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'FLAT_THEME_8PX_OLD',
      },
      name: 'infrafront/firefoxFlat8px',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefox: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
      name: 'infrafront/firefox',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefoxDark: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DARK_THEME',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/firefoxDark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    firefox2022: {
      browserName: 'firefox',
      platformName: 'linux',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'THEME_2022',
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
        theme: 'THEME_2022_DARK',
      },
      backgrounds: { default: 'dark' },
      name: 'infrafront/firefox2022Dark',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
    // NOTE Enable after switch new separate pool for IE to allow test hover
    // 'se:ieOptions': {
    //   enablePersistentHover: true,
    //   nativeEvents: true,
    //   requireWindowFocus: true,
    //   'ie.usePerProcessProxy': true,
    //   'ie.browserCommandLineSwitches': '-private',
    //   'ie.ensureCleanSession': true,
    // },
    // ie118px: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME_8PX_OLD',
    //   },
    //   name: 'infrafront/ie118px',
    //   ...capabilities,
    // },
    // ie11Flat8px: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'FLAT_THEME_8PX_OLD',
    //   },
    //   name: 'infrafront/ie11Flat8px',
    //   ...capabilities,
    // },
    // ie11: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'DEFAULT_THEME',
    //   },
    //   name: 'infrafront/ie11',
    //   ...capabilities,
    // },
    // ie11Dark: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'DARK_THEME',
    //   },
    //   backgrounds: { default: 'dark' },
    //   name: 'infrafront/ie11Dark',
    //   ...capabilities,
    // },
    // ie112022: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'THEME_2022',
    //   },
    //   name: 'infrafront/ie112022',
    //   ...capabilities,
    // },
    // ie112022Dark: {
    //   browserName: 'internet explorer',
    //   viewport: { width: 1024, height: 720 },
    //   _storybookGlobals: {
    //     theme: 'THEME_2022_DARK',
    //   },
    //   backgrounds: { default: 'dark' },
    //   name: 'infrafront/ie112022Dark',
    //   ...capabilities,
    // },
    chromeMobile: {
      browserName: 'chrome',
      viewport: { width: 400, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_MOBILE',
      },
      name: 'infrafront/chromeMobile',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
  },
};

module.exports = config;
