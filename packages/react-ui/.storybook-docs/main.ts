import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.tsx',
    '../internal/**/*.stories.tsx',
    '../.storybook/**/*.stories.tsx',
    '../components/**/*.mdx',
    '../.storybook/**/*.mdx',
    '../**/*.mdx',
  ],
  docs: {
    docsMode: true,
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docsMode: true,
      },
    },
    '@skbkontur/storybook-addon-live-examples',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      legacyRootApi: Number(process?.env?.REACT_VERSION || 17) < 18,
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};

export default config;
