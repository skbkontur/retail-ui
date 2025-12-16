module.exports = async ({ config }) => {
  config.devtool = false;
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
    },
    {
      test: /\.css$/,
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
    { test: /\.(woff|woff2|eot)$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader' },
    {
      // fixes storybooks default font that doesn't get changed by the theme for some reason
      // turns this: https://github.com/storybookjs/storybook/blob/v7.6.18/code/lib/theming/src/base.ts#L64
      // into: "Lab Grotesque", ...
      test: /@storybook(\/|\\)core(\/|\\)/,
      loader: 'string-replace-loader',
      options: {
        // prettier-ignore
        search: '"Nunito Sans"',
        replace: '"Lab Grotesque"',
      },
    },
  ];

  return config;
};
