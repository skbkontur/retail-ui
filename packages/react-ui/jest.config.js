const reporters = ['default'];

if (process.env['GITLAB_CI'] !== undefined) {
  reporters.push(['jest-junit', { outputDirectory: '<rootDir>/reports', outputName: 'report.xml' }]);
}

module.exports = {
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { envName: 'cjs' }],
  },
  testRegex: '__tests__(\\\\|/).*(\\.|-)test\\.(j|t)sx?$',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters,
};
