module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
  ],
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
};
