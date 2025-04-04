const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);
const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

module.exports = async ({ config }) => {
  if (isTestEnv) {
    config.entry.unshift(path.join(__dirname, './scripts/props2attrs'));
  }

  config.devtool = isDocsEnv ? false : 'eval-source-map';
  config.entry.unshift('core-js/stable');
  config.resolve.extensions.unshift('.ts', '.tsx');

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config.module.rules || []).filter((r) => r.test && !r.test.test('.css'));

  config.module.rules = [
    ...filteredStorybooksWebpackRules,
    {
      test: /\.(j|t)sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        extends: path.join(__dirname, '../.babelrc.js'),
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
    {
      // remove after upgrading to storybook@8
      // fixes stories's cyrillic headings anchors in docs
      // turns this: https://github.com/storybookjs/storybook/blob/v7.6.19/code/ui/blocks/src/blocks/Subheading.tsx#L11
      // into this: https://github.com/storybookjs/storybook/blob/v8.0.0/code/ui/blocks/src/blocks/Subheading.tsx#L11
      test: /@storybook(\/|\\)blocks(\/|\\)/,
      loader: 'string-replace-loader',
      options: {
        // prettier-ignore
        // eslint-disable-next-line no-useless-escape
        search: 'tagID=children.toLowerCase().replace(/[^a-z0-9]/gi,\"-\")',
        replace: 'tagID=globalThis.encodeURIComponent(children.toLowerCase())',
      },
    },
    {
      // fixes storybooks default font that doesn't get changed by the theme for some reason
      // turns this: https://github.com/storybookjs/storybook/blob/v7.6.18/code/lib/theming/src/base.ts#L64
      // into: "Lab Grotesque", ...
      test: /@storybook(\/|\\)theming(\/|\\)/,
      loader: 'string-replace-loader',
      options: {
        // prettier-ignore
        search: '"Nunito Sans"',
        replace: '"Lab Grotesque"',
      },
    },
  ];

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../prod.tsconfig.json'),
        configOverwrite: {
          exclude: ['**/*.docs.stories.tsx'],
        },
      },
    }),
  );

  // NOTE Need to allow write tests inside stories for Creevey
  config.node = { __filename: true };

  return config;
};
