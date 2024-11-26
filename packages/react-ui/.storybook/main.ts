import type { StorybookConfig } from '@storybook/react-webpack5';

import docsConfig from './config-docs';
import storiesConfig from './config-stories';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);
const config: StorybookConfig = isDocsEnv ? docsConfig : storiesConfig;

export default config;
