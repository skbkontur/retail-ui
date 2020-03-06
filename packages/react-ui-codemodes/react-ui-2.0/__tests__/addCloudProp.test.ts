const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../addCloudProp');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
    <div>
      <Loader active type="normal">bla</Loader>
      <Spinner dimmed type="mini" />
    </div>
`,
  `
    <div>
      <Loader active type="normal" cloud>bla</Loader>
      <Spinner dimmed type="mini" cloud />
    </div>
  `,
  `add prop for all components`,
);
