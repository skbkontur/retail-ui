import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../__stories__/**/*.stories.tsx'],
  docs: {
    docsMode: false,
  },
  addons: [
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
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
};

// oxlint-disable-next-line import/no-default-export
export default config;
