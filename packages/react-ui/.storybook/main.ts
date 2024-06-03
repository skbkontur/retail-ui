import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx', '../components/**/*.mdx'],
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/blocks',
    '@storybook/addon-docs',
    //'storybook-addon-live-examples',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
};
export default config;
