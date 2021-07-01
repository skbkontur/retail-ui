module.exports = {
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links/register', 'creevey'],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  typescript: {
    reactDocgenTypescriptOptions: {
      setDisplayName: false,
    },
  },
  features: {
    postcss: false,
  },
};
