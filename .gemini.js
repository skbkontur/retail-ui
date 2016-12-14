module.exports = {
    rootUrl: 'http://localhost:6060/',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
	system: {
		plugins: {
			sauce: true
		}
	}
};