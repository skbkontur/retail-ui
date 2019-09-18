import { CreeveyConfig } from 'creevey';

const flatComponents = [
  'Button',
  'Checkbox',
  'Input',
  'Radio',
  'Textarea',
  'Toggle',
  'InputLikeText',
  'Switcher',
  'TokenInput',
];
const flatRegex = new RegExp(`(\\/|\\\\)(${flatComponents.join('|')})\\.ts$`);

const config: CreeveyConfig = {
  gridUrl: 'http://screen:shot@grid.testkontur.ru/wd/hub',
  address: 'http://localhost:6060',
  threshold: 0,
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
      testRegex: flatRegex,
      address: 'http://localhost:6061',
    },
    firefox: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
    },
    firefoxFlat: {
      browserName: 'firefox',
      viewport: { width: 1024, height: 720 },
      testRegex: flatRegex,
      address: 'http://localhost:6061',
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
      testRegex: flatRegex,
      address: 'http://localhost:6061',
    },
  },
};

module.exports = config;
