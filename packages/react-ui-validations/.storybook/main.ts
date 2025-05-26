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
      //Для версионного прогона убран, чтобы 18 реакт гонялся по честному
      legacyRootApi: !process?.env?.REACT_VERSION,
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};
export default config;
