import type { StorybookConfig } from '@storybook/react-webpack5';
const isTestEnv = Boolean(process.env.STORYBOOK_REACT_UI_TEST);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['creevey'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: !isTestEnv,
      strictMode: process?.env?.STRICT_MODE === 'true',
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};
export default config;
