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
      legacyRootApi: Number(process?.env?.REACT_VERSION || 17) < 18,
    },
  },
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};
export default config;
