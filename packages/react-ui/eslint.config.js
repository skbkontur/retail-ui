const rootConfig = require('../../eslint.config');

module.exports = [
  ...rootConfig,
  {
    ignores: [
      '**/node_modules/**',
      '**/docs/dist/**',
      '**/docs/src/components/DemoPage.js',
      '**/testing/react-devtools/**',
      '**/coverage/**',
      '**/gemini-report/**',
      '**/.styleguide/**',
      '**/storybook-static/**',
      '**/build/**',
      '**/lib/**/*.js',
      '**/components/**/*.js',
      '**/*.d.ts',
      '**/bundle/**',
      '**/dist/**',
      '**/.creevey/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'testing-library': require('eslint-plugin-testing-library'),
      'jest-dom': require('eslint-plugin-jest-dom'),
      jest: require('eslint-plugin-jest'),
      storybook: require('eslint-plugin-storybook'),
    },
    rules: {
      'import/no-default-export': 0,
    },
  },
  {
    files: ['**/*.docs.stories.tsx'],
    rules: {
      'react/no-unstable-nested-components': 0,
    },
  },
];
