const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: '../../.env' });

/**
 * Debuggin instructions: https://wiki.skbkontur.ru/pages/viewpage.action?pageId=418699157
 * Instructions for Windows nodes: https://git.skbkontur.ru/ke/keweb.front/-/blob/f25788b0c0fce83b762e1b51553683e4d30484bd/.creevey/readme.md#debug
 */

const debug = process.env.DEBUG_SCREENSHOTS;

const capabilities = debug
  ? {
      enableVNC: true,
      enableVideo: true,
    }
  : {};

const resolverStorybookUrl = (port) => ({
  storybookUrl: `http://localhost:${port}`,
  resolveStorybookUrl:
    process.env.GET_IP_URL && (() => axios(process.env.GET_IP_URL).then((res) => `http://${res.data}:${port}`)),
});

const config = {
  ...resolverStorybookUrl(8081),
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: process.env.GRID_URL,
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 5 : 0,
  diffOptions: { threshold: 0, includeAA: false },
  browsers: {
    chromeDefault: {
      browserName: 'chrome',
      viewport: { width: 1024, height: 720 },
      platformName: 'linux',
      name: 'chrome',
      browserVersion: '100.0',
      version: '100.0',
      ...capabilities,
    },
  },
};

module.exports = config;
