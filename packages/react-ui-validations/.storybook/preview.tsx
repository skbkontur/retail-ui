import type { Preview } from '@storybook/react';
import React from 'react';

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
