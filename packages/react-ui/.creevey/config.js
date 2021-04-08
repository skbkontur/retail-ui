const path = require('path');

const config = {
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: 'http://screen:shot@grid.testkontur.ru/wd/hub',
  storybookUrl: 'http://localhost:6060',
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 10 : 0,
  browsers: {
    chrome: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      limit: 8,
    },
    chrome8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6061',
      platformName: 'linux',
      limit: 8,
    },
    chromeFlat: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6062',
      platformName: 'linux',
      limit: 8,
    },
    chromeFlat8px: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6063',
      platformName: 'linux',
      limit: 8,
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      limit: 8,
    },
    firefox8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6061',
      limit: 8,
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6062',
      limit: 8,
    },
    firefoxFlat8px: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6063',
      limit: 8,
    },
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 8,

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
      storybookUrl: 'http://localhost:6061',
      limit: 8,
    },
    ie11Flat: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6062',
      limit: 8,
    },
    ie11Flat8px: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6063',
      limit: 8,
    },
  },
};

module.exports = config;
