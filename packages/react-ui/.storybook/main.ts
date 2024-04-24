module.exports = {
  core: {
    builder: 'webpack5',
  },
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
        envName: 'cjs',
      },
    });
    return config;
  },
};
