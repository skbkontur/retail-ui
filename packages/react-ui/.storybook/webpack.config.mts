import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';

import { hasTestInRule } from '../../../scripts/webpack-type-guards/index.ts';

function getReactMajor(nodeModules: string): number {
  try {
    const pkg = JSON.parse(readFileSync(resolve(nodeModules, 'react-dom/package.json'), 'utf8'));
    return parseInt(pkg.version, 10);
  } catch {
    return 19; // fallback to current default
  }
}

export default async ({ config }: { config: Configuration }) => {
  config.devtool = 'eval-source-map';

  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve) {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };

    // When matrix CI swaps react version via set-package-versions, yarn may
    // hoist a second copy of react inside node_modules/@storybook/…  Force
    // every import of react / react-dom to resolve to the single top-level
    // copy so hooks don't break ("Cannot read properties of null").
    const nodeModules = resolve(__dirname, '../../../node_modules');
    const reactMajor = getReactMajor(nodeModules);

    config.resolve.alias = {
      ...config.resolve.alias,
      react: resolve(nodeModules, 'react'),
      'react-dom': resolve(nodeModules, 'react-dom'),
      // React 17 has no exports map, so @skbkontur/icons' bare
      // `react/jsx-runtime` import must point to the physical runtime file.
      'react/jsx-runtime': resolve(nodeModules, 'react/jsx-runtime.js'),
      // Storybook's preset detects React version via require.resolve which may
      // find a stale copy. Force the correct render shim based on the actual
      // installed version.
      ...(reactMajor < 18
        ? { '@storybook/react-dom-shim': resolve(nodeModules, '@storybook/react-dom-shim/dist/react-16') }
        : {}),
    };
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
          extends: join(__dirname, '../.babelrc.cjs'),
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

  // Skip type-checking in matrix CI — the code is written against React 19 types
  // and won't pass tsc with older @types/react. Runtime behaviour is verified by
  // vitest and screenshot tests; type correctness is checked on the main pipeline.
  if (config.plugins && !process.env.REACT_VERSION) {
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
