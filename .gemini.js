module.exports = {
    rootUrl: 'http://storybook:3000/',
	gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};