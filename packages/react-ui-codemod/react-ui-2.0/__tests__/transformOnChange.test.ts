const { defineInlineTest } = require('jscodeshift/dist/testUtils');

const transform = require('../transformOnChange');

jest.autoMockOff();

defineInlineTest(
  transform,
  {},
  `
    <>
      <Toggle onChange={v => this.handleChange(v)} />
      <DateSelect onChange={v => this.handleChange(v)} />
      <TokenInput onChange={v => this.handleChange(v)} />

      <ComboBox onInputChange={v => this.handleChange(v)} />
      <CustomComboBox onInputChange={v => this.handleChange(v)} />
      <FiasSearch onInputChange={v => this.handleChange(v)} />
    </>
`,
  `
    <>
      <Toggle onValueChange={v => this.handleChange(v)} />
      <DateSelect onValueChange={v => this.handleChange(v)} />
      <TokenInput onValueChange={v => this.handleChange(v)} />

      <ComboBox onInputValueChange={v => this.handleChange(v)} />
      <CustomComboBox onInputValueChange={v => this.handleChange(v)} />
      <FiasSearch onInputValueChange={v => this.handleChange(v)} />
    </>
  `,
  `transforms "onChange/onInputChange" with only "value" argument`,
);

defineInlineTest(
  transform,
  {},
  `
    <>
      <Toggle changeEventHandler={e => this.handleChange(e)} />
    </>
`,
  `
    <>
      <Toggle onChange={e => this.handleChange(e)} />
    </>
  `,
  `transforms custom "onChange" to native onChange`,
);

defineInlineTest(
  transform,
  {},
  `
    <>
      <TokenInput onChange={this.handleChange} />
      <Input onChange={handle} />
    </>
`,
  `
    <>
      <TokenInput onValueChange={this.handleChange} />
      <Input onChange={handle} />
    </>
  `,
  `doesn't transform handlers specified as references, except cases with just one arg`,
);

defineInlineTest(
  transform,
  {},
  `
    <>
      <Input onChange={(e, v) => handle(v)} />
      <Input onChange={(e, v) => handle({ e })} />
    </>
`,
  `
    <>
      <Input onValueChange={v => handle(v)} />
      <Input onChange={(e, v) => handle({ e })} />
    </>
  `,
  `removes "event" arg if it isn't being used and transforms onChange->onValueChange`,
);

defineInlineTest(
  transform,
  {},
  `
    <>
      <Input onChange={(e, v) => handle(e, v)} />
    </>
`,
  ``,
  `doesn't transform onChange if "event" arg is being used`,
);
