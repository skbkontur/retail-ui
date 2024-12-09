const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);

module.exports = async ({ config }) => {
  config.resolve.extensions.unshift('.ts', '.tsx');

  if (isTestEnv) {
    config.entry.unshift('@skbkontur/react-props2attrs');
  }

  config.entry.unshift('core-js/stable');

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
  ];

  return config;
};
