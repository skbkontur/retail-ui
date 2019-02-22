const Suite = require("gemini/lib/suite");
const Browser = require("gemini/lib/browser/new-browser");

const oldCreate = Suite.create;

Suite.create = function() {
  const suite = oldCreate.apply(Suite, arguments);
  suite.url = "iframe.html?selectedKind=All&selectedStory=Stories";
  return suite;
};

Browser.prototype.openRelative = function(relativeURL) {
  if (this.isStorybookOpen) {
    return Promise.resolve();
  }
  return this.open(this.config.getAbsoluteUrl(relativeURL), { resetZoom: true }).then(
    () => (this.isStorybookOpen = true)
  );
};

Browser.prototype.reset = function() {
  return Promise.resolve();
};

// NOTE remove process.env.CI after teamcity migration
const isCI = Boolean(process.env.TEAMCITY_VERSION || process.env.CI);

if (!isCI) {
  require("dotenv").config();
}

const RetryCount = isCI ? 2 : 0;

const browsers = {
  chrome: {
    desiredCapabilities: {
      browserName: "chrome",
      version: "67"
    },
    retry: RetryCount
  },
  firefox: {
    desiredCapabilities: {
      browserName: "firefox",
      version: "47"
    },
    retry: RetryCount
  },
  ie11: {
    desiredCapabilities: {
      browserName: "internet explorer",
      version: "11"
    },
    retry: RetryCount
  }
};

module.exports = {
  rootUrl: "http://localhost:6060/",
  compositeImage: true,
  browsers,
  system: {
    plugins: {
      teamcity: Boolean(process.env.TEAMCITY_VERSION),
      sauce: true,
      "html-reporter/gemini": {
        enabled: true,
        baseHost: "localhost:6060"
      }
    }
  }
};
