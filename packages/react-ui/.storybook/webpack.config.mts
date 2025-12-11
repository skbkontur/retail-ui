import { join, resolve } from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';

import { hasTestInRule } from '../../../scripts/webpack-type-guards/index.ts';

export default async ({ config }: { config: Configuration }) => {
  config.devtool = 'eval-source-map';

  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve?.extensions) {
    config.resolve.extensions.unshift('.ts', '.tsx');
  }

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config.module?.rules || []).filter(
    (rule) => hasTestInRule(rule) && !rule.test.test('.css'),
  );

  if (config.module?.rules) {
    config.module.rules = [
      ...filteredStorybooksWebpackRules,
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          extends: join(__dirname, '../.babelrc.js'),
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]-[local]-[hash:base64:4]',
                namedExport: false,
              },
            },
          },
        ],
      },
      { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    ];
  }

  if (config.plugins) {
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: resolve(__dirname, '../prod.tsconfig.json'),
          configOverwrite: {
            exclude: ['**/*.docs.stories.tsx'],
          },
        },
      }),
    );
  }

  // NOTE Need to allow write tests inside stories for Creevey
  config.node = { __filename: true };
  config.watchOptions = {
    ignored: /node_modules|.creevey|reports/,
  };

  return config;
};
