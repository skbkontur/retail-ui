const { FlatCompat } = require('@eslint/eslintrc');
const { fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends('prettier'),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      globals: {
        browser: true,
        node: true,
        jest: true,
        mocha: true,
        es2020: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: fixupPluginRules(require('eslint-plugin-react')),
      'react-hooks': fixupPluginRules(require('eslint-plugin-react-hooks')),
      import: require('eslint-plugin-import'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
    },
  },
];
