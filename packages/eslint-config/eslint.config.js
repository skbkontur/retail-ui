const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginImport = require('eslint-plugin-import');
const typescriptEslintParser = require('@typescript-eslint/parser');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  js.configs.recommended,
  ...fixupConfigRules(
    compat.extends(
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(eslintPluginReact),
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      import: eslintPluginImport,
    },
  },
  {
    settings: { react: { version: 'detect' } },
    languageOptions: {
      parser: typescriptEslintParser,
      globals: { ...globals.browser, ...globals.node, ...globals.jest, ...globals.mocha, ...globals.es2020 },
    },
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
    },
  },
];
