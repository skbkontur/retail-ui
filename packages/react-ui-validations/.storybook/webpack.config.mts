import type { Configuration } from 'webpack';

import { hasTestInRule } from '../../../scripts/webpack-type-guards/index.ts';

export default async ({ config }: { config: Configuration }) => {
  if (config.entry && Array.isArray(config.entry)) {
    config.entry.unshift('core-js/stable');
  }

  if (config.resolve) {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
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
