import type { StorybookConfig } from '@storybook/react-webpack5';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

const config: StorybookConfig = {
  stories: [
    '../components/Button/**/*.stories.tsx',
    // '../internal/**/*.stories.tsx',
    '../components/Button/**/*.mdx',
    // '../.storybook/**/*.mdx',
    // '../**/*.mdx',
  ],
  docs: {
    docsMode: isDocsEnv,
  },
  addons: [
    '@skbkontur/storybook-addon-live-examples',
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
  ],
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
  },
};
export default config;
