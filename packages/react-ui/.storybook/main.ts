import type { StorybookConfig } from '@storybook/react-webpack5';

import docsConfig from './config-docs';
import storiesConfig from './config-stories';

function getConfig(): StorybookConfig {
  return process.env.STORYBOOK_REACT_UI_DOCS ? docsConfig : storiesConfig;
}

const config: StorybookConfig = { ...getConfig() }; // storybook требует ObjectExpression для конфига
export default config;
