const path = require('path');

module.exports = {
  addons: [
    'creevey',
    'creevey/preset/ie11',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-ie11',
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
    config.module.rules.push({
      test: /@remix-run|react-router/,
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
