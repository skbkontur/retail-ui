const fs = require("fs");
const path = require("path");

if (!process.env.CI) {
  require("dotenv").config();
}

const RetryCount = process.env.CI ? 2 : 0;

const testDirectoryFiles = fs.readdirSync(path.join(__dirname, "gemini"));
const flatComponents = [
  "Button",
  "Checkbox",
  "Input",
  "Radio",
  "Textarea",
  "Toggle",
  "InputLikeText"
].map(component => component.toLowerCase());

const flatTestSuites = testDirectoryFiles
  .map(filename => path.parse(filename).name)
  .filter(filename => flatComponents.includes(filename));

const browsers = {
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
};

const optionsFlat = {
  rootUrl: "http://localhost:6061/",
  screenshotsDir: "./gemini/screensFlat"
};

module.exports = {
  rootUrl: "http://localhost:6060/",
  compositeImage: true,
  browsers: {
    ...browsers,
    chromeFlat: {
      ...optionsFlat,
      ...browsers.chrome
    },
    firefoxFlat: {
      ...optionsFlat,
      ...browsers.firefox
    },
    ie11Flat: {
      ...optionsFlat,
      ...browsers.ie11
    }
  },
  sets: {
    default: {
      files: "./gemini/*.js",
      browsers: Object.keys(browsers)
    },
    flat: {
      files: flatTestSuites.map(suite => path.join("./gemini", `${suite}.js`)),
      browsers: ["chromeFlat", "firefoxFlat", "ie11Flat"]
    }
  },
  system: {
    plugins: {
      sauce: true,
      "html-reporter/gemini": {
        enabled: true,
        baseHost: "localhost:6060"
      }
    }
  }
};
