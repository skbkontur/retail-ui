// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';

import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { MaskedInput, MaskedInputProps } from '../MaskedInput';
import { Input } from '../../Input';

export default {
  title: 'MaskedInput/Functional tests',
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome2022\b)/ } },
    },
  },
} as Meta;

const DEFAULT_PROPS: MaskedInputProps = {
  mask: '+7 999 999-99-99',
  width: 150,
  maskChar: '_',
};

const testIdleFocusEditBlur: CreeveyTests = {
  async 'idle, focus, edit, blur'() {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('input').sendKeys('953').perform();
    const edited = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, edited, blured }).to.matchImages();
  },
};

const testIdleFocusAppendRemoveBlur: CreeveyTests = {
  async 'idle, focus, edit, blur'() {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('input').sendKeys('953').perform();
    const appended = await this.takeScreenshot();

    await click('input')
      .sendKeys(this.keys.BACK_SPACE)
      .sendKeys(this.keys.BACK_SPACE)
      .sendKeys(this.keys.BACK_SPACE)
      .perform();
    const restored = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, appended, restored, blured }).to.matchImages();
  },
};

const testIdleFocusBlur: CreeveyTests = {
  async 'idle, focus, blur'() {
    const click = (css: string) => {
      return this.browser
        .actions({
          bridge: true,
        })
        .click(this.browser.findElement({ css }));
    };

    const idle = await this.takeScreenshot();

    await click('input').pause(500).perform();
    const focused = await this.takeScreenshot();

    await click('body').perform();
    const blured = await this.takeScreenshot();

    await this.expect({ idle, focused, blured }).to.matchImages();
  },
};

export const Default: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} value={value} onValueChange={setValue} />;
};
Default.parameters = {
  creevey: {
    tests: testIdleFocusEditBlur,
  },
};

export const IdleFocusEditBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};
IdleFocusEditBlurWithPlaceholder.parameters = {
  creevey: {
    tests: testIdleFocusEditBlur,
  },
};

export const IdleFocusBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};
IdleFocusBlurWithPlaceholder.parameters = {
  creevey: {
    tests: testIdleFocusBlur,
  },
};

export const IdleFocusAppendRemoveBlurWithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string>();
  return <MaskedInput {...DEFAULT_PROPS} placeholder="Телефон" value={value} onValueChange={setValue} />;
};
IdleFocusAppendRemoveBlurWithPlaceholder.parameters = {
  creevey: {
    tests: testIdleFocusAppendRemoveBlur,
  },
};

export const IdleFocusBlurWithPrefix: Story = () => {
  const [value, setValue] = React.useState<string>();
  return (
    <MaskedInput {...DEFAULT_PROPS} mask="999 999-99-99" prefix="+7&nbsp;" value={value} onValueChange={setValue} />
  );
};

IdleFocusBlurWithPrefix.parameters = {
  creevey: {
    tests: testIdleFocusBlur,
  },
};

export const WithCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('795');

  return (
    <>
      <span>unmask value: {value}</span>
      <br />
      <MaskedInput
        {...DEFAULT_PROPS}
        alwaysShowMask
        value={value}
        onValueChange={(value) => setValue(value.replace(/\D/g, ''))}
      />
    </>
  );
};

WithCustomUnmaskedValue.parameters = {
  creevey: {
    tests: testIdleFocusEditBlur,
  },
};

export const WithUnmaskedAndFixedValue: Story = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <span>unmasked value: &quot;{value}&quot;</span>
      <br />
      <MaskedInput
        {...DEFAULT_PROPS}
        mask="+{7} 999 999-99-99"
        unmask
        alwaysShowMask
        value={value}
        onValueChange={setValue}
      />
    </>
  );
};

WithUnmaskedAndFixedValue.parameters = {
  creevey: {
    tests: testIdleFocusAppendRemoveBlur,
  },
};

export const IdleFocusBlurAndUncontrolled: Story = () => <MaskedInput {...DEFAULT_PROPS} />;
IdleFocusBlurAndUncontrolled.parameters = {
  creevey: {
    tests: testIdleFocusEditBlur,
  },
};

export const IdleFocusBlurAndUncontrolledWithDefaultValue: Story = () => (
  <>
    <h3>Известная проблема</h3>
    <span>
      При появлении маски по фокусу ломается неконтролируемый ввод, если <code>defaultValue</code> содержит любую
      фиксированную часть маски.
    </span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="+7 123" />
    <br />
    <br />
    <span>
      Когда <code>defaultValue</code> не содержит фиксированных частей, то всё норм.
    </span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="123" />
    <br />
    <br />
    <span>Самый простой способ обойти проблему - всегда показывать маску.</span>
    <br />
    <MaskedInput {...DEFAULT_PROPS} defaultValue="+7 123" alwaysShowMask />
  </>
);
IdleFocusBlurAndUncontrolledWithDefaultValue.parameters = {
  creevey: {
    skip: true,
  },
};

export const SelectAllByProp: Story = () => {
  const [value, setValue] = React.useState('12');
  return (
    <div>
      <MaskedInput
        {...DEFAULT_PROPS}
        mask="9999"
        value={value}
        onValueChange={setValue}
        selectAllOnFocus
        alwaysShowMask
      />
    </div>
  );
};
SelectAllByProp.parameters = {
  creevey: {
    tests: {
      async 'idle, select_half, select_all'() {
        const idle = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .pause(500)
          .perform();
        const select_half = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'body' }))
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('1234')
          .click(this.browser.findElement({ css: 'body' }))
          .click(this.browser.findElement({ css: 'input' }))
          .pause(500)
          .perform();
        const select_all = await this.takeScreenshot();
        await this.expect({ idle, select_half, select_all }).to.matchImages();
      },
    },
  },
};
export const SelectAllByButton: Story = () => {
  let input: Input | null = null;

  const selectAll = () => {
    if (input) {
      input.selectAll();
    }
  };

  return (
    <div>
      <div>
        <MaskedInput {...DEFAULT_PROPS} value="+7 123 654" ref={(element) => (input = element)} alwaysShowMask />
      </div>
      <button data-tid="select-all" onClick={selectAll}>
        Select all
      </button>
    </div>
  );
};

SelectAllByButton.parameters = {
  creevey: {
    tests: {
      async 'idle, select'() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
          .perform();
        const select_all = await this.takeScreenshot();
        await this.expect({ plain, select_all }).to.matchImages();
      },
    },
  },
};

const testRewriteInMiddle: CreeveyTests = {
  async 'idle, shift, rewrite'() {
    const idle = await this.takeScreenshot();

    const input = await this.browser.findElement({ css: 'input' });
    this.browser
      .actions({ bridge: true })
      .click(input)
      .keyDown(this.keys.ARROW_LEFT)
      .keyDown(this.keys.ARROW_LEFT)
      .sendKeys('12')
      .perform();
    const shift = await this.takeScreenshot();

    this.browser
      .actions({ bridge: true })
      .click(input)
      .keyDown(this.keys.ARROW_LEFT)
      .keyDown(this.keys.ARROW_LEFT)
      .sendKeys('56')
      .perform();
    const rewrite = await this.takeScreenshot();

    await this.expect({ idle, shift, rewrite }).to.matchImages();
  },
};

export const RewriteInMiddle: Story = () => {
  const [value, setValue] = React.useState('12');

  return <MaskedInput {...DEFAULT_PROPS} mask="9999" alwaysShowMask value={value} onValueChange={setValue} />;
};

RewriteInMiddle.parameters = {
  creevey: {
    tests: testRewriteInMiddle,
  },
};
