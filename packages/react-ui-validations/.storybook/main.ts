import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['creevey'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      strictMode: true,
    },
  },
};

export default config;
