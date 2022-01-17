module.exports = {
  addons: ['creevey', '@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-essentials'],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
};
