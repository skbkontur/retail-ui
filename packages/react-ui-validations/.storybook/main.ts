import type { StorybookConfig } from '@storybook/react-webpack5';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_VALIDATIONS_DOCS);

const conditionalAddons = isDocsEnv
  ? [
      '@skbkontur/storybook-addon-live-examples',
      'storybook-addon-multiselect',
      '@storybook/blocks',
      '@storybook/addon-docs',
      {
        name: '@storybook/addon-essentials',
        options: {
          docsMode: true,
        },
      },
    ]
  : ['creevey'];

const conditionalStories = isDocsEnv
  ? ['../stories/**/*.stories.tsx', '../stories/**/*.mdx', '../docs/**/*.mdx', '../docs/**/*.docs.stories.tsx']
  : ['../stories/**/*.stories.tsx'];

const config: StorybookConfig = {
  stories: conditionalStories,
  docs: {
    docsMode: isDocsEnv,
  },
  addons: conditionalAddons,
  framework: {
    name: '@storybook/react-webpack5',
    options: {
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
