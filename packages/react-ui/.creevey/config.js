const path = require('path');
const axios = require('axios');

const config = {
  storybookDir: path.join(__dirname, '../.storybook'),
  reportDir: path.join(__dirname, 'report'),
  screenDir: path.join(__dirname, 'images'),
  gridUrl: 'https://frontinfradebug:frontinfradebug@grid.testkontur.ru/wd/hub',
  resolveStorybookUrl: () => axios('https://fake.testkontur.ru/ip').then((res) => 'http://' + res.data + ':6060'),
  // NOTE Should refactor Button styles without 1px-border
  maxRetries: process.env.TEAMCITY_VERSION ? 10 : 0,
  babelOptions: (options) => ({
    ...options,
    extends: path.join(__dirname, '../.babelrc.js'),
  }),
  browsers: {
    ie11: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11alpha: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11beta: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11gamma: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11delta: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11epsilon: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11zeta: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11iota: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11kappa: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11lambda: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11mu: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11xi: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11omikron: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11pi: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11sigma: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
    ie11omega: {
      browserName: 'internet explorer',
      viewport: { width: 1024, height: 720 },
    },
  },
};

module.exports = config;
