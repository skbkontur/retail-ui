import { addons } from '@storybook/manager-api';

import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    showRoots: false,
    collapsedRoots: ['Versioning', 'Information', 'Button', 'Input data', 'Display data', 'Menu', 'Overlay', 'Layout'],
  },
});
