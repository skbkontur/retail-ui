const reporters = ['default'];

if (process.env['GITLAB_CI'] !== undefined) {
  reporters.push(['jest-junit', { outputDirectory: '<rootDir>/reports', outputName: 'report.xml' }]);
}

module.exports = {
  testResultsProcessor: "jest-teamcity-reporter",
  reporters
};
