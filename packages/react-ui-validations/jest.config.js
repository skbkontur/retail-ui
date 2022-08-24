module.exports = {
  testEnvironment: 'jsdom',
  testResultsProcessor: 'jest-teamcity-reporter',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/tests/**/*test.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
