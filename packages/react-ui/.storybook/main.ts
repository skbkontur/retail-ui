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
};
