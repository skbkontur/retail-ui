const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../transformOnChange');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
    <>
      <TokenInput onChange={(v) => this.handleChange(v)} />
    </>
`,
  `
    <>
      <TokenInput onValueChange={(v) => this.handleChange(v)} />
    </>
  `,
  `transforms "onChange" without "event" argument`,
);
