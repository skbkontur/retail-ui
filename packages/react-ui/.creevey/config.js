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
        theme: 'DefaultOld',
      },
    },
    chrome8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'Default',
      },
    },
    chromeFlat: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'FlatOld',
      },
    },
    chromeFlat8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 2,
      _storybookGlobals: {
        theme: 'Flat',
      },
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DefaultOld',
      },
    },
    firefox8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'Default',
      },
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FlatOld',
      },
    },
    firefoxFlat8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'Flat',
      },
    },
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'DefaultOld',
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
        theme: 'Default',
      },
    },
    ie11Flat: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'FlatOld',
      },
    },
    ie11Flat8px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
      _storybookGlobals: {
        theme: 'Flat',
      },
    },
  },
};

module.exports = config;
