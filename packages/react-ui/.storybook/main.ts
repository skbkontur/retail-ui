import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(tsx|ts)', '../internal/**/*.stories.tsx', '../components/**/*.mdx'], // было бы неплохо, чтобы .stories.tsx и .mdx писались вместе
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/blocks',
    '@storybook/addon-docs',
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
      legacyRootApi: true,
    },
  },
};
export default config;
