const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../transformLabelToCaption');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
    <div>
      <Chackbox label="name" value="first" />
      <Switcher label="name" value="first" />
    </div>
`,
  `
    <div>
      <Chackbox label="name" value="first" />
      <Switcher caption="name" value="first" />
    </div>
  `,
  `transforms "label" to "caption" for Switcher`,
);
