const reporters = ['default'];

if (process.env['GITLAB_CI'] !== undefined) {
  reporters.push(['jest-junit', { outputDirectory: '<rootDir>/reports', outputName: 'report.xml' }]);
}

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/tests/**/*test.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters,
};
