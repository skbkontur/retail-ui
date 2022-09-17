const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../skipsArrays');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
  import React, { useState } from 'react';

  export default {
    title: 'Input',
    creevey: {
      skip: [
        { in: '', reason: 'reason-1'},
        { tests: '' },
      ]
    }
  };

  export const NoSkips: Story = () => <Input />;

  export const WithSkips1: Story = () => <Input />;
  WithSkips1.parameters = {
    creevey: {
      skip: [true]
    },
  };

  export const WithSkips2: Story = () => <Input />;
  WithSkips2.parameters = {
    creevey: {
      skip: [
        { reason: 'reason-2' },
        {},
      ]
    },
  };
`,
  `
  import React, { useState } from 'react';

  export default {
    title: 'Input',
    creevey: {
      skip: {
        "reason-1": { in: '', reason: 'reason-1'},
        "kind-skip-1": { tests: '' }
      }
    }
  };

  export const NoSkips: Story = () => <Input />;

  export const WithSkips1: Story = () => <Input />;
  WithSkips1.parameters = {
    creevey: {
      skip: true
    },
  };

  export const WithSkips2: Story = () => <Input />;
  WithSkips2.parameters = {
    creevey: {
      skip: {
        "reason-2": { reason: 'reason-2' },
        "story-skip-1": {}
      }
    },
  };
  `,
  `basic`,
);
