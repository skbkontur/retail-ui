module.exports = {
    rootUrl: 'http://localhost:3000/',
	gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};