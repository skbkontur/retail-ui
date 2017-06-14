module.exports = {
  rootUrl: 'http://localhost:6060/',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '50'
      },
      retry: 5
    },
		firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        version: '47'
      },
      retry: 5
		},
		ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
				version: '11'
      },
      retry: 5
		}
  },
	system: {
		plugins: {
			sauce: true
		}
	}
};
