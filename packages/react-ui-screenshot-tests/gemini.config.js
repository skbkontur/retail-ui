const fs = require('fs');
const path = require('path');
const Suite = require('gemini/lib/suite');
const Browser = require('gemini/lib/browser/new-browser');

const oldCreate = Suite.create;

Suite.create = function() {
  const suite = oldCreate.apply(Suite, arguments);
  suite.url = 'iframe.html?selectedKind=All&selectedStory=Stories';
  return suite;
};

Browser.prototype.openRelative = function(relativeURL) {
  if (this.isStorybookOpen) {
    return Promise.resolve();
  }
  return this.open(this.config.getAbsoluteUrl(relativeURL), { resetZoom: true }).then(
    () => (this.isStorybookOpen = true),
  );
};

Browser.prototype.reset = function() {
  return Promise.resolve();
};

// NOTE remove process.env.CI after teamcity migration
const isCI = Boolean(process.env.TEAMCITY_VERSION || process.env.CI);

if (!isCI) {
  require('dotenv').config();
}

const RetryCount = isCI ? 2 : 0;

const testDirectoryFiles = fs.readdirSync(path.join(__dirname, 'gemini'));
const flatComponents = ['Button', 'Checkbox', 'Input', 'Radio', 'Textarea', 'Toggle', 'InputLikeText', 'Switcher'].map(
  component => component.toLowerCase(),
);

const flatTestSuites = testDirectoryFiles
  .map(filename => path.parse(filename).name.toLowerCase())
  .filter(filename => flatComponents.includes(filename));

const browsers = {
  chrome: {
    desiredCapabilities: {
      browserName: 'chrome',
      version: '67',
    },
    retry: RetryCount,
  },
  firefox: {
    desiredCapabilities: {
      browserName: 'firefox',
      version: '47',
    },
    retry: RetryCount,
  },
  ie11: {
    desiredCapabilities: {
      browserName: 'internet explorer',
      version: '11',
    },
    retry: RetryCount,
  },
};

const optionsFlat = {
  rootUrl: 'http://localhost:6061/',
};

module.exports = {
  rootUrl: 'http://localhost:6060/',
  compositeImage: true,
  browsers: {
    ...browsers,
    chromeFlat: {
      ...optionsFlat,
      ...browsers.chrome,
    },
    firefoxFlat: {
      ...optionsFlat,
      ...browsers.firefox,
    },
    ie11Flat: {
      ...optionsFlat,
      ...browsers.ie11,
    },
  },
  sets: {
    default: {
      files: './gemini/*.js',
      browsers: Object.keys(browsers),
    },
    flat: {
      files: flatTestSuites.map(suite => path.join('./gemini', `${suite}.js`)),
      browsers: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
    },
  },
  system: {
    plugins: {
      teamcity: Boolean(process.env.TEAMCITY_VERSION),
      sauce: true,
      'html-reporter/gemini': {
        enabled: true,
        baseHost: 'localhost:6060',
      },
    },
  },
};
