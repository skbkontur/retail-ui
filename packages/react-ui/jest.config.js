const path = require('path');

module.exports = {
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { babelrc: false, envName: 'cjs', extends: path.join(__dirname, './.babelrc.js') }],
  },
  testRegex: '__tests__(\\\\|/).*(\\.|-)test\\.(j|t)sx?$',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
