import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx', '../stories/**/*.mdx', '../docs/**/*.mdx', '../docs/**/*.docs.stories.tsx'],
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
      legacyRootApi: false,
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};

export default config;
