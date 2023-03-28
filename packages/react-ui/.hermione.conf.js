require('dotenv').config({ path: '../../.env' });

const resolveStorybookUrl = () => {
  const ip = require('child_process').execSync(
    `node -e "require('https').get('${process.env.GET_IP_URL}', r => r.on('data', d => console.log(d.toString())))"`,
  );
  return ip.toString().trim();
};

module.exports = {
  gridUrl: process.env.GRID_URL,

  sets: {
    common: {
      files: '**/*.hermione.js',
    },
  },

  screenshotsDir: (test) => `.hermione/images/${test.parent.title}/${test.browserId}`,

  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: '.hermione/html-report',
    },
    'hermione-storybook/plugin': {
      enabled: true,
      storybookUrl: `http://${resolveStorybookUrl()}:6060`,
    },
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
