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
  stories: ['../components/TooltipMenu/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
};
