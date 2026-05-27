import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import type { Configuration } from 'webpack';

import { hasTestInRule } from '../../../scripts/webpack-type-guards/index.ts';

function getReactMajor(nodeModules: string): number {
  try {
    const pkg = JSON.parse(readFileSync(resolve(nodeModules, 'react-dom/package.json'), 'utf8'));
    return parseInt(pkg.version, 10);
  } catch {
    return 19;
  }
}

export default async ({ config }: { config: Configuration }) => {
  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve) {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
    };

    // Deduplicate react for matrix CI — see react-ui/.storybook/webpack.config.mts
    const nodeModules = resolve(__dirname, '../../../node_modules');
    const reactMajor = getReactMajor(nodeModules);

    config.resolve.alias = {
      ...config.resolve.alias,
      react: resolve(nodeModules, 'react'),
      'react-dom': resolve(nodeModules, 'react-dom'),
      // React 17 has no exports map, so @skbkontur/icons' bare
      // `react/jsx-runtime` import must point to the physical runtime file.
      'react/jsx-runtime': resolve(nodeModules, 'react/jsx-runtime.js'),
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
          extends: join(__dirname, '../babel.config.cjs'),
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: /__REACT_UI_PACKAGE__/g,
              replace: '@skbkontur/react-ui',
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
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
      {
        test: /\.(png|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
    ];
  }
  return config;
};
