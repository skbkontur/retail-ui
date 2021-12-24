module.exports = {
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
        controls: false,
        backgrounds: false,
        measure: false,
        outline: false,
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
};
