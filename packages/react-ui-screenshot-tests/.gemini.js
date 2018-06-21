var RetryCount = process.env.CI ? 2 : 0;

module.exports = {
  rootUrl: 'http://localhost:6060/',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '60'
      },
      retry: RetryCount
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        version: '47'
      },
      retry: RetryCount
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '11'
      },
      retry: RetryCount
    }
  },
  system: {
    plugins: {
      sauce: true
    }
  }
};
