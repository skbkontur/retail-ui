import { css, injectGlobal } from '@emotion/css';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import { SingleToast } from '@skbkontur/react-ui/components/SingleToast/SingleToast';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import { addons } from '@storybook/manager-api';
import type { Preview } from '@storybook/react';

import { Heading } from '../Heading.js';
import { Text } from '../Text.js';
import * as TextTokens from '../tokens.js';
import { storybookTheme } from './theme.js';

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      Heading,
      Text,
      ...TextTokens,
      css,
      injectGlobal,
      Gapped,
      Select,
      SingleToast,
      Switcher,
      Toggle,
    },
  },
} as unknown as LiveConfig);

const preview: Preview = {
  parameters: {
    theme: storybookTheme,
    docs: {
      theme: storybookTheme,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'LIGHT_THEME',
  },
};

// oxlint-disable-next-line import/no-default-export
export default preview;
