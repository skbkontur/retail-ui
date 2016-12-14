module.exports = {
    rootUrl: 'http://localhost:6060/',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
		firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
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