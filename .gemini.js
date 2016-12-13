module.exports = {
    rootUrl: 'http://storybook:6060/',
	gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};