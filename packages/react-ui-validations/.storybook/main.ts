import type { StorybookConfig } from '@storybook/react-webpack5';

import docsConfig from './config-docs';
import storiesConfig from './config-stories';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_VALIDATIONS_DOCS);
let config: StorybookConfig;
if (isDocsEnv) {
  config = docsConfig;
} else {
  config = storiesConfig;
}

export default config;
