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
  // managerWebpack: (config) => {
  //   config.module.rules.push({
  //     test: /(creevey)\/.*\.js$/,
  //     loader: 'babel-loader',
  //     options: {
  //       babelrc: false,
  //       envName: 'cjs',
  //       extends: path.join(__dirname, '../.babelrc.js'),
  //     },
  //   });
  //   return config;
  // },
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /testing-library/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        envName: 'cjs',
        extends: path.join(__dirname, '../.babelrc.js'),
      },
    });

    // Return the altered config
    return config;
  },
};
