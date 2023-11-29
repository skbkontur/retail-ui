require('dotenv').config({ path: '../../.env' });

const resolveStorybookUrl = () => {
  const ip = require('child_process').execSync(
    `node -e "require('https').get('${process.env.GET_IP_URL}', r => r.on('data', d => console.log(d.toString())))"`,
  );
  return ip.toString().trim();
};

module.exports = {
  gridUrl: process.env.GRID_URL_HERMIONE,

  sets: {
    common: {
      files: '**/*.hermione.js',
    },
  },

  screenshotsDir: (test) => {
    const parentTitles = [];
    let { parent } = test;
    while (parent && parent.title) {
      parentTitles.unshift(parent.title);
      parent = parent.parent;
    }
    return `.hermione/images2/${parentTitles.join('/')}/${test.title}/${test.browserId}`;
  },

  takeScreenshotOnFails: {
    testFail: false,
  },

  assertViewOpts: {
    allowViewportOverflow: true,
  },

  windowSize: '1024x720',

  retry: process.env.TEAMCITY_VERSION ? 5 : 0,

  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: '.hermione/html-report',
    },
    'hermione-storybook/plugin': {
      enabled: true,
      storybookUrl: `http://${resolveStorybookUrl()}:6060`,
    },
    'teamcity-reporter': process.env.TEAMCITY_VERSION ? true : false,
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platformName: 'linux',
        browserVersion: '100.0',
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        platformName: 'linux',
        browserVersion: '100.0',
      },
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
      },
    },
  },
};
