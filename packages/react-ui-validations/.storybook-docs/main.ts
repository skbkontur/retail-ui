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
  framework: '@storybook/react-webpack5',

  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: false,
  },
};
export default config;
