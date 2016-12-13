module.exports = {
    rootUrl: 'http://localhost:6006/',
    gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};