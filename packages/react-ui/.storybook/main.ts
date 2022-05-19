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
  // stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  stories: ['../components/Kebab/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
};
