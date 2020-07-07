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

defineInlineTest(
  transform,
  { component: 'Loader' },
  `
    <div>
      <Loader active type="normal">bla</Loader>
      <Spinner dimmed type="mini" />
    </div>
`,
  `
    <div>
      <Loader active type="normal" cloud>bla</Loader>
      <Spinner dimmed type="mini" />
    </div>
  `,
  `add prop only for specified component`,
);

defineInlineTest(
  transform,
  { component: 'Loader' },
  `
    <div/>
`,
  ``,
  `doesn't change source if there is no modifications`,
);
