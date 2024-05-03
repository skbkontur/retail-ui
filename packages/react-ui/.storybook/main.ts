import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'],
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
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      docs: false,
      builder: {
        useSWC: true,
      },
    },
  },
};
export default config;
