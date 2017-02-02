module.exports = {
  rootUrl: 'http://localhost:6060/',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '50'
      }
    },
		firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        version: '47'
      }
		},
		ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
				version: '11'
      }
		}
  },
	system: {
		plugins: {
			sauce: true
		}
	}
};
