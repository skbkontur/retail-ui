require('ts-node').register({ files: true, transpileOnly: true });

const defaultAddress = {
  host: 'localhost',
  port: 6060,
  path: '/iframe.html',
};

const flatComponents = ['Button', 'Checkbox', 'Input', 'Radio', 'Textarea', 'Toggle', 'InputLikeText', 'Switcher'];
const flatRegex = new RegExp(`(\\/|\\\\)(${flatComponents.join('|')})\\.ts$`);

const config = {
  gridUrl: 'http://screen:shot@grid.testkontur.ru/wd/hub',
  address: defaultAddress,
  testRegex: /\.ts$/,
  threshold: 0,
  maxRetries: 2,
  browsers: {
    chrome: { browserName: 'chrome', limit: 2 },
    chromeFlat: {
      browserName: 'chrome',
      testRegex: flatRegex,
      address: {
        ...defaultAddress,
        port: 6061,
      },
    },
    firefox: { browserName: 'firefox' },
    firefoxFlat: {
      browserName: 'firefox',
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
      // NOTE Enable after switch new separate pool for IE
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
      testRegex: flatRegex,
      address: {
        ...defaultAddress,
        port: 6061,
      },
    },
  },
};

module.exports = config;
