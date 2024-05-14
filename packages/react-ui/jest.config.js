module.exports = {
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { envName: 'cjs' }],
  },
  testRegex: '__tests__(\\\\|/).*(\\.|-)test\\.(j|t)sx?$',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
