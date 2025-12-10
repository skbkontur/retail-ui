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
];
