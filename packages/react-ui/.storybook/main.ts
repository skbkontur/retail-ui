const path = require('path');

module.exports = {
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
  managerWebpack: (config) => {
    // @see https://github.com/storybookjs/storybook/issues/17057
    // should be fixed in Storybook 6.5
    config.module.rules.push({
      test: /node_modules\/(react-router|react-router-dom)\/.*\.js$/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        envName: 'cjs',
        extends: path.join(__dirname, '../.babelrc.js'),
      },
    });
    return config;
  },
};
