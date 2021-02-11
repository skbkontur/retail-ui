module.exports = {
  addons: ['@storybook/addon-actions/register', '@storybook/addon-links/register', 'creevey'],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
  babel: require('../.babelrc.js'),
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../prod.tsconfig.json',
      setDisplayName: false,
    },
  },
};
