import type { Preview } from '@storybook/react';
import React from 'react';

declare global {
  interface Window {
    __STORYBOOK_REACT_VERSION__?: string;
  }
}

if (typeof window !== 'undefined') {
  window.__STORYBOOK_REACT_VERSION__ = React.version;
}

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
        <Story />
      </div>
    ),
  ],

  parameters: {
    creevey: {
      captureElement: '#test-element',
    },
  },
};

export default preview;
