import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../__docs__/**/*.stories.tsx', '../__docs__/**/*.mdx'],
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
  ],
  framework: '@storybook/react-webpack5',

  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

// oxlint-disable-next-line import/no-default-export
export default config;
