const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);
const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

module.exports = async ({ config }) => {
  if (isTestEnv) {
    config.entry.unshift('@skbkontur/react-props2attrs');
  }

  if (isDocsEnv) {
    config.devtool = false;
  }

  config.entry.unshift('core-js/stable');
  config.resolve.extensions.unshift('.ts', '.tsx');

  // storybook's rule for css doesn't handle css-modules
  const filteredStorybooksWebpackRules = (config.module.rules || []).filter((r) => r.test && !r.test.test('.css'));

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
  ];

  return config;
};
