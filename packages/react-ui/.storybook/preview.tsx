import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import React from 'react';

import { isTestEnv } from '../lib/currentEnvironment.js';
import { ThemeDecorator } from './decorators/Theme/ThemeDecorator.js';

declare global {
  interface Window {
    __STORYBOOK_REACT_VERSION__?: string;
  }
}

if (typeof window !== 'undefined') {
  window.__STORYBOOK_REACT_VERSION__ = React.version;
}

const customViewports = {
  iphone: {
    name: 'Iphone',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  iphonePlus: {
    name: 'Iphone Plus',
    styles: {
      width: '414px',
      height: '736px',
    },
    type: 'mobile',
  },
};

const MOBILE_REGEXP = /Mobile.*/i;

const preview: Preview = {
  parameters: {
    creevey: {
      captureElement: '#test-element',
      skip: {
        'not mobile stories in mobile browser': { in: MOBILE_REGEXP, stories: /^((?!Mobile).)*$/i },
        'mobile stories in not mobile browsers': { stories: MOBILE_REGEXP, in: /^((?!Mobile).)*$/i },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Information',
          ['Mobiles', 'Server Side Rendering', 'DataTids', 'Theme', 'Locale', 'Feature flags'],
          'Versioning',
          ['Migration', 'Changelog'],
          'Button',
          'Input data',
          'Display data',
          'Menu',
          'Overlay',
          'Layout',
          '*',
        ],
      },
    },
    viewport: {
      viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
    },
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'LIGHT_THEME',
  },
};

if (isTestEnv) {
  import('./styles/forScreenshotTests.js');
}
