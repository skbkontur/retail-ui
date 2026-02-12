const rootConfig = require('../../eslint.config.cjs');

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
      '**/storybook-static/**',
      '**/build/**',
      '**/lib/**/*.js',
      '**/components/**/*.js',
      '**/*.d.ts',
      '**/bundle/**',
      '**/dist/**',
      '**/.creevey/**',
      '**/reports/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'testing-library': require('eslint-plugin-testing-library'),
      'jest-dom': require('eslint-plugin-jest-dom'),
      vitest: require('eslint-plugin-vitest'),
      storybook: require('eslint-plugin-storybook'),
      'nodenext-extensions': require('@hukopo/eslint-plugin-nodenext-extensions'),
    },
    rules: {
      'import/no-default-export': 0,
      'nodenext-extensions/file-extension-in-import-ts': [
        'error',
        'always',
        { extMapping: { '.ts': '.js', '.tsx': '.js' } },
      ],
    },
  },
  {
    files: ['**/*.docs.stories.tsx'],
    rules: {
      'react/no-unstable-nested-components': 0,
    },
  },
];
