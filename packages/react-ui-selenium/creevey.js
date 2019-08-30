require('ts-node').register({ files: true, transpileOnly: true });

const defaultAddress = {
  host: 'localhost',
  port: 6060,
  path: '/iframe.html',
};

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

const config = {
  gridUrl: 'http://screen:shot@grid.testkontur.ru/wd/hub',
  address: defaultAddress,
  testRegex: /\.ts$/,
  threshold: 0,
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: 10,
  browsers: {
    chrome: {
      browserName: 'chrome',
      resolution: { width: 1040, height: 852 }, // 1024x720
      limit: 2,
    },
    chromeFlat: {
      browserName: 'chrome',
      resolution: { width: 1040, height: 852 }, // 1024x720
      testRegex: flatRegex,
      address: {
        ...defaultAddress,
        port: 6061,
      },
    },
    firefox: {
      browserName: 'firefox',
      resolution: { width: 1036, height: 801 }, // 1024x720
    },
    firefoxFlat: {
      browserName: 'firefox',
      resolution: { width: 1036, height: 801 }, // 1024x720
      testRegex: flatRegex,
      address: {
        ...defaultAddress,
        port: 6061,
      },
    },
    ie11: {
      browserName: 'internet explorer',
      resolution: { width: 1040, height: 783 }, // 1024x720
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
      resolution: { width: 1040, height: 783 }, // 1024x720
      testRegex: flatRegex,
      address: {
        ...defaultAddress,
        port: 6061,
      },
    },
  },
};

module.exports = config;
