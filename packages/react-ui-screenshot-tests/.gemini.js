if (!process.env.CI) require("dotenv").config();
var RetryCount = process.env.CI ? 2 : 0;

module.exports = {
  rootUrl: "http://localhost:6660/",
  compositeImage: true,
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        version: "60"
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
  },
  system: {
    plugins: {
      sauce: true,
      "html-reporter/gemini": {
        enabled: true,
        baseHost: "localhost:6660"
      }
    }
  }
};
