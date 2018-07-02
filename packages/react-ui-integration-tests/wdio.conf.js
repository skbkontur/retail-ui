const platform = process.platform;

function generateCapabilities(platform) {
  // MacOS
  if (platform === 'darwin') {
    return [
      {
        browserName: 'firefox'
      },
      {
        browserName: 'chrome'
      },
      {
        browserName: 'safari'
      }
    ];
  }
  // Windows
  if (platform === 'win32') {
    return [
      {
        browserName: 'firefox'
      },
      {
        browserName: 'chrome'
      },
      {
        browserName: 'internet explorer'
      }
    ];
  }
  return [
    {
      browserName: 'firefox'
    },
    {
      browserName: 'chrome'
    }
  ];
}

const sauceUsername = process.env.SAUCE_USERNAME;
const sauceKey = process.env.SAUCE_ACCESS_KEY;

exports.config = {
  specs: [
    './tests/*.js'
  ],
  maxInstances: 10,
  capabilities: generateCapabilities(platform),
  sync: true,
  logLevel: 'result',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './tests/errorScreenshots',
  baseUrl: 'http://localhost:6060/',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['sauce'],
  user: sauceUsername,
  key: sauceKey,
  sauceConnect: true,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd'
  },
  before: function () {
    global.expect = require('expect');
  }
};
