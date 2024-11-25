import type { StorybookConfig } from '@storybook/react-webpack5';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

const conditionalAddons = isDocsEnv
  ? [
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
    ]
  : [
      'creevey',
      '@storybook/addon-links',
      '@storybook/addon-a11y',
      {
        name: '@storybook/addon-essentials',
        options: {
          docs: false,
        },
      },
      'storybook-addon-multiselect',
    ];

const conditionalStories = isDocsEnv
  ? [
      '../components/**/*.stories.tsx',
      '../internal/**/*.stories.tsx',
      '../components/**/*.mdx',
      '../.storybook/**/*.mdx',
      '../**/*.mdx',
    ]
  : ['../components/**/*.stories.tsx', '../internal/**/*.stories.tsx'];

const config: StorybookConfig = {
  stories: conditionalStories,
  docs: {
    docsMode: isDocsEnv,
  },
  addons: conditionalAddons,
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
