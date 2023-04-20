// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';

import { CreeveyTests, Meta, Story } from '../../../typings/stories';
import { Input } from '../Input';
import { DarkTheme } from '../../../internal/themes/DarkTheme';

import { ThemeContext } from './../../../lib/theming/ThemeContext';

export default {
  title: 'Input/Functional tests',
  parameters: {
    creevey: {
      skip: { "themes don't affect logic": { in: /^(?!\bchrome\b|\bfirefox\b|\bie11\b)/ } },
    },
  },
} as Meta;

const differentStatesTest: CreeveyTests = {
  async Plain() {
    const element = await this.browser.findElement({ css: '#input' });
    await this.expect(await element.takeScreenshot()).to.matchImage('Plain');
  },
  async Focused() {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('Focused');
  },
  async 'With typed text'() {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('With typed text');
  },
  async 'With long typed text'() {
    const element = await this.browser.findElement({ css: '#input' });
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '#input input' }))
      .sendKeys('Test...')
      .sendKeys('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .pause(500)
      .perform();
    await this.expect(await element.takeScreenshot()).to.matchImage('With long typed text');
  },
};

export const Default: Story = () => (
  <div id="input">
    <Input />
  </div>
);

Default.parameters = {
  creevey: {
    tests: differentStatesTest,
  },
};

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

export const WithMask: Story = () => (
  <Input width="150" mask="+7 999 999-99-99" maskChar={'_'} placeholder="+7" alwaysShowMask />
);
WithMask.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

export const WithMaskAndCustomUnmaskedValue: Story = () => {
  const [value, setValue] = useState('+795');

  return (
    <Input
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

WithMaskAndCustomUnmaskedValue.parameters = {
  creevey: {
    tests: testMaskedInput,
  },
};

export const SelectAllByProp: Story = () => <Input defaultValue="Some value" selectAllOnFocus />;

SelectAllByProp.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
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
        <Input ref={(element) => (input = element)} defaultValue="Some value" />
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
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Selected() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="select-all"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Selected');
      },
    },
  },
};

export const MaxLength: Story = () => (
  <div id="input">
    <Input maxLength={3} placeholder="maxLength={3}" />
  </div>
);

MaxLength.parameters = { creevey: { tests: differentStatesTest } };

export const UncontrolledInputWithPlaceholder: Story = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_value, setValue] = React.useState<string>();
  return <Input placeholder="Placeholder" onValueChange={(value) => setValue(value)} />;
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

export const WithMaskAndSelectAllProp: Story = () => {
  const inputRef = React.useRef<Input>(null);
  const [value, setValue] = React.useState('11');
  const selectAll = React.useCallback(() => {
    inputRef.current?.selectAll();
  }, [inputRef.current]);
  return (
    <div>
      <Input mask="9999" maskChar={'_'} ref={inputRef} value={value} onValueChange={setValue} onFocus={selectAll} />
    </div>
  );
};

WithMaskAndSelectAllProp.parameters = {
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
          .click(this.browser.findElement({ css: 'input' }))
          .sendKeys('1111')
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

export const SearchTypeApi: Story = () => <Input defaultValue="Some value" type="search" selectAllOnFocus />;
SearchTypeApi.parameters = {
  creevey: {
    tests: {
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const SearchTypeApiDark: Story = () => (
  <ThemeContext.Provider value={DarkTheme}>
    <div style={{ backgroundColor: 'black' }}>
      <Input defaultValue="Some value" type="search" selectAllOnFocus />
    </div>
  </ThemeContext.Provider>
);
SearchTypeApiDark.parameters = {
  creevey: {
    tests: {
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const InoutTypeApi: Story = () => <Input defaultValue={123} type="number" selectAllOnFocus />;
InoutTypeApi.parameters = {
  creevey: {
    tests: {
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const InoutTypeApiDark: Story = () => (
  <ThemeContext.Provider value={DarkTheme}>
    <div style={{ backgroundColor: 'black' }}>
      <Input defaultValue={123} type="number" selectAllOnFocus />
    </div>
  </ThemeContext.Provider>
);
InoutTypeApiDark.parameters = {
  creevey: {
    tests: {
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};
