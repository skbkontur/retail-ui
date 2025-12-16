import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../components/**/!(*.docs)*.stories.tsx', '../internal/**/*.stories.tsx', '../lib/**/*.stories.tsx'],
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
      // Флаг нужен только для регулярных прогонов, чтобы скриншоты проходили с установленным реакт 18 в репе
      // Для версионного прогона убираем, реакт гонялися по честному как есть
      ...(process?.env?.REACT_VERSION ? {} : { legacyRootApi: true }),
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

export default config;
