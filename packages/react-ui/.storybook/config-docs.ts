import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.tsx',
    '../internal/**/*.stories.tsx',
    '../components/**/*.mdx',
    '../.storybook/**/*.mdx',
    '../**/*.mdx',
  ],
  docs: {
    docsMode: true,
  },
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/blocks',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-essentials',
      options: {
        docsMode: true,
      },
    },
    'storybook-addon-multiselect',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      legacyRootApi: true,
      fastRefresh: true,
      strictMode: true,
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};
export default config;
