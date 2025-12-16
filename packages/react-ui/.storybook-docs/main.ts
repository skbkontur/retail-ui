import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.tsx',
    '../internal/**/*.stories.tsx',
    '../.storybook-docs/**/*.stories.tsx',
    '../.storybook-docs/**/*.mdx',
    '../components/**/*.mdx',
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
  framework: '@storybook/react-webpack5',

  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
