const path = require('path');

/**
 * Debuggin instruction: https://wiki.skbkontur.ru/pages/viewpage.action?pageId=418699157
 * Connecting to Windows nodes via VNC: https://git.skbkontur.ru/ke/keweb.front/-/blob/f25788b0c0fce83b762e1b51553683e4d30484bd/.creevey/readme.md#debug
 */

const debug = true;

const capabilities = debug
  ? {
      enableVNC: true,
      enableVideo: true,
    }
  : {};

const config = {
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: 'https://frontinfra:frontinfra@grid.testkontur.ru/wd/hub',
  storybookUrl: 'http://localhost:6060',
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 10 : 0,
  babelOptions: (options) => ({
    ...options,
    extends: path.join(__dirname, '../.babelrc.js'),
  }),
  diffOptions: {
    // threshold: 0.01,
    includeAA: false,
  },
  browsers: {
    chrome: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
      name: 'infrafront/chrome',
      ...capabilities,
    },
    chrome8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
      name: 'infrafront/chrome8px',
      ...capabilities,
    },
    chromeFlat: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
      name: 'infrafront/chromeFlat',
      ...capabilities,
    },
    chromeFlat8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
      name: 'infrafront/chromeFlat8px',
      ...capabilities,
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
      name: 'infrafront/firefox',
      ...capabilities,
    },
    firefox8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
      name: 'infrafront/firefox8px',
      ...capabilities,
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
      name: 'infrafront/firefoxFlat',
      ...capabilities,
    },
    firefoxFlat8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
      name: 'infrafront/firefoxFlat8px',
      ...capabilities,
    },
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
      name: 'infrafront/ie11',
      ...capabilities,

      // NOTE Enable after switch new separate pool for IE to allow test hover
      // 'se:ieOptions': {
      //   enablePersistentHover: true,
      //   nativeEvents: true,
      //   requireWindowFocus: true,
      //   'ie.usePerProcessProxy': true,
      //   'ie.browserCommandLineSwitches': '-private',
      //   'ie.ensureCleanSession': true,
      // },
    },
    ie118px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
      name: 'infrafront/ie118px',
      ...capabilities,
    },
    ie11Flat: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
      name: 'infrafront/ie11Flat',
      ...capabilities,
    },
    ie11Flat8px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
      name: 'infrafront/ie11Flat8px',
      ...capabilities,
    },
  },
};

module.exports = config;
