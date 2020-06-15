import path from 'path';
import { CreeveyConfig } from 'creevey';

const config: CreeveyConfig = {
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
      limit: 2,
    },
    chromeFlat: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6061',
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6061',
    },
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      limit: 2,
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
    ie11Flat: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
      storybookUrl: 'http://localhost:6061',
    },
  },
};

export default config;
