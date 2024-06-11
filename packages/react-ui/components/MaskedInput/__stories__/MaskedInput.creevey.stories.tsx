// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';

import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { MaskedInput } from '../MaskedInput';
import { Input } from '../../Input';

export default {
  title: 'MaskedInput/Functional tests',
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    },
  },
} as Meta;

const testMaskedInput: CreeveyTests = {
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

export const Default: Story = () => (
  <MaskedInput width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);
Default.parameters = {
  creevey: {
    tests: testMaskedInput,
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

export const IdleFocusBlur: Story = () => (
  <MaskedInput width="150" mask="999 999-99-99" maskChar={'_'} placeholder="Номер" />
);

IdleFocusBlur.parameters = {
  creevey: {
    tests: testIdleFocusBlur,
  },
};

export const IdleFocusBlurWithPrefix: Story = () => (
  <MaskedInput width="150" mask="+7 999 999 999" maskChar={'_'} placeholder="Номер" />
);

IdleFocusBlurWithPrefix.parameters = {
  creevey: {
    tests: testIdleFocusBlur,
  },
};

export const WithCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('+795');

  return (
    <MaskedInput
      width="150"
      mask="+7 999 999-99-99"
      maskChar={'_'}
      placeholder="+7"
      alwaysShowMask
      value={value}
      onValueChange={(value) => setValue(value.replace(/\s/g, ''))}
    />
  );
};

WithCustomUnmaskedValue.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

export const SelectAllByProp: Story = () => {
  const [value, setValue] = React.useState('12');
  return (
    <div>
      <MaskedInput mask="9999" maskChar="_" value={value} onValueChange={setValue} selectAllOnFocus alwaysShowMask />
    </div>
  );
};

SelectAllByProp.parameters = {
  creevey: {
    skip: { "themes don't affect logic": { in: /^(?!\bchrome\b)/ } },
    tests: {
      async PlainAndSelected() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .pause(500)
          .perform();
        const selectAllHalfFilledInput = await this.takeScreenshot();
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
        const selectAllFilledInput = await this.takeScreenshot();
        await this.expect({ plain, selectAllHalfFilledInput, selectAllFilledInput }).to.matchImages();
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
        <MaskedInput ref={(element) => (input = element)} mask={'99:99'} defaultValue="12:34" />
      </div>
      <button data-tid="select-all" onClick={selectAll}>
        Select all
      </button>
    </div>
  );
};
SelectAllByButton.storyName = 'Select all by button';

SelectAllByButton.parameters = {
  creevey: {
    tests: {
      async 'Plain, selected'() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
          .perform();
        const selected = await this.takeScreenshot();

        await this.expect({ plain, selected }).to.matchImages();
      },
    },
  },
};

export const UncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <MaskedInput mask={'aaaa aaaa'} placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
};
UncontrolledInputWithPlaceholder.storyName = 'Uncontrolled Input with Placeholder';
UncontrolledInputWithPlaceholder.parameters = {
  creevey: {
    tests: {
      async PlainAndTyped() {
        const plain = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('text')
          .perform();
        const typed = await this.takeScreenshot();
        await this.expect({ plain, typed }).to.matchImages();
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

export const RewriteInMiddle: Story = () => <MaskedInput width="150" value={'34'} mask="9999" alwaysShowMask />;

RewriteInMiddle.parameters = {
  creevey: {
    tests: testRewriteInMiddle,
  },
};
