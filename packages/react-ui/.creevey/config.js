const path = require('path');

const config = {
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: 'https://frontinfra:frontinfra@grid.testkontur.ru/wd/hub',
  storybookUrl: 'http://localhost:6060',
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 10 : 0,
  babelOptions: options => ({
    ...options,
    extends: path.join(__dirname, '../.babelrc.js'),
  }),
  browsers: {
    chrome: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
    },
    chrome8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
    },
    chromeFlat: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
    },
    chromeFlat8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
      },
    },
    firefox8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
    },
    firefoxFlat8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
    },
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME_OLD',
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
    },
    ie118px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DEFAULT_THEME',
      },
    },
    ie11Flat: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME_OLD',
      },
    },
    ie11Flat8px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FLAT_THEME',
      },
    },
  },
};

module.exports = config;
