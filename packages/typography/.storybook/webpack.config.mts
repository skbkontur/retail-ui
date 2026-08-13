import { join, resolve } from 'path';

import type { Configuration } from 'webpack';

import { hasTestInRule } from '../../../scripts/webpack-type-guards/index.ts';

export default async ({ config }: { config: Configuration }) => {
  config.devtool = false;
  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve) {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };
    // Bypass source package.json wildcard exports (`./lib/*.ts`) so addons can
    // resolve directory indexes like `@skbkontur/react-ui/lib/renderEnvironment`.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@skbkontur/react-ui': resolve(__dirname, '../../react-ui'),
      '@skbkontur/typography': resolve(__dirname, '..'),
    };
  }

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config?.module?.rules || []).filter(
    (rule) => hasTestInRule(rule) && !rule.test.test('.css'),
  );

  if (config.module?.rules) {
    config.module.rules = [
      ...filteredStorybooksWebpackRules,
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        // Only transpile workspace react-ui sources; published @skbkontur/*
        // packages are already compiled and break under babel (CJS interop).
        exclude: /node_modules[/\\](?!@skbkontur[/\\]react-ui)/,
        options: {
          babelrc: false,
          extends: join(__dirname, '../babel.config.cjs'),
        },
      },
      {
        test: /(?<!(\.module))\.(css|less)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                localIdentName: '[name]-[local]-[hash:base64:4]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
      {
        // fixes storybooks default font that doesn't get changed by the theme for some reason
        // into: "Lab Grotesque", ...
        test: /@storybook(\/|\\)core(\/|\\)dist(\/|\\)(theming|manager)(\/|\\)/,
        loader: 'string-replace-loader',
        options: {
          // prettier-ignore
          search: '"Nunito Sans"',
          replace: '"Lab Grotesque"',
        },
      },
    ];
  }

  return config;
};
