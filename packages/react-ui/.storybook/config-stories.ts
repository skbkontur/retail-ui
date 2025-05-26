import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/!(*.docs)*.stories.tsx', '../internal/**/*.stories.tsx'],
  docs: {
    docsMode: false,
  },
  addons: [
    'creevey',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
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
      strictMode: process?.env?.STRICT_MODE === 'true',
      fastRefresh: true,
      //Для версионного прогона убран, чтобы 18 реакт гонялся по честному
      ...(process?.env?.REACT_VERSION ? {} : { legacyRootApi: true }),
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};

export default config;
