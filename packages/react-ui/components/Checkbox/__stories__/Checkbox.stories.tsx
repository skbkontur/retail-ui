import React, { useRef, useState } from 'react';
import { ComponentStory } from '@storybook/react';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Gapped } from '../../Gapped';

const checkboxTests: CreeveyTests = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async hovered() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'span' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  },
  async pressed() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'span' }),
      })
      .press()
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
    await this.browser
      .actions({
        bridge: true,
      })
      .release()
      .perform();
  },
  async clicked() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'span' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  },
  async tabPress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'span' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  },
  async spacePress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'span' }))
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({ origin: this.browser.findElement({ css: 'body' }) })
      .press()
      .release()
      .sendKeys(this.keys.TAB)
      .perform();
    await this.browser.actions({ bridge: true }).sendKeys(this.keys.SPACE).perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
  },
};

export default {
  title: 'components/Checkbox',
  component: Checkbox,
} as Meta;

const commonArgs: CheckboxProps = {
  error: false,
  warning: false,
  disabled: false,
};

const PlainCheckboxTemplate: ComponentStory<typeof Checkbox> = ({ children, ...rest }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      data-tip="test"
      data-hui="blyat"
      style={{ height: '20px' }}
      className="oi wai"
      onValueChange={() => setIsChecked(!isChecked)}
      checked={isChecked}
      {...rest}
    >
      {children}
    </Checkbox>
  );
};

export const PlainCheckbox = PlainCheckboxTemplate.bind({});
PlainCheckbox.args = {
  ...commonArgs,
  children: 'Plain checkbox',
};
PlainCheckbox.storyName = 'plain';
PlainCheckbox.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }],
    tests: checkboxTests,
  },
};

const CheckboxTemplate: ComponentStory<typeof Checkbox> = ({ children, ...rest }) => (
  <Checkbox {...rest}>{children}</Checkbox>
);

export const Unchecked = CheckboxTemplate.bind({});
Unchecked.args = {
  ...commonArgs,
  children: 'Unchecked',
  checked: false,
};
Unchecked.storyName = 'unchecked';
Unchecked.parameters = { creevey: { skip: [true] } };

export const Checked = CheckboxTemplate.bind({});
Checked.args = {
  ...commonArgs,
  children: 'Checked',
  checked: true,
};
Checked.storyName = 'checked';
Checked.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }],
    tests: {
      idle: checkboxTests['idle'],
      hovered: checkboxTests['hovered'],
      pressed: checkboxTests['pressed'],
    },
  },
};

export const Disabled = CheckboxTemplate.bind({});
Disabled.args = {
  ...commonArgs,
  children: 'Disabled',
  disabled: true,
};
Disabled.storyName = 'disabled';

export const DisabledChecked = CheckboxTemplate.bind({});
DisabledChecked.args = {
  ...commonArgs,
  children: 'Disabled and checked',
  disabled: true,
  checked: true,
};
DisabledChecked.storyName = 'disabled checked';

export const Error = () => (
  <Gapped vertical>
    <Checkbox error>Error</Checkbox>
    <Checkbox error disabled>
      Error and Disabled
    </Checkbox>
  </Gapped>
);
Error.storyName = 'error';

export const WithMouseEnterLeaveHandlers = CheckboxTemplate.bind({});
WithMouseEnterLeaveHandlers.args = {
  ...commonArgs,
  children: 'Hover me',
  checked: false,
  onMouseEnter: () => console.count('enter'),
  onMouseLeave: () => console.count('leave'),
};
WithMouseEnterLeaveHandlers.storyName = 'with mouse enter/leave handlers';
WithMouseEnterLeaveHandlers.parameters = { creevey: { skip: [true] } };

const LongLabelCheckboxTemplate: ComponentStory<typeof Checkbox> = ({ children, ...rest }) => {
  return (
    <div>
      Lorem ipsum dolor --
      <PlainCheckbox {...rest}>{children}</PlainCheckbox>
      -- Lorem ipsum dolor.
    </div>
  );
};
export const WithALongLabel = LongLabelCheckboxTemplate.bind({});
WithALongLabel.args = {
  ...commonArgs,
  children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
  laborum.`,
};
WithALongLabel.storyName = 'with a long label';

export const WithoutLabel = () => (
  <div>
    <div>
      Some text <Checkbox />
    </div>
    <div>
      Some text <Checkbox>Label</Checkbox>
    </div>
  </div>
);
WithoutLabel.storyName = 'without label';

export const ProgrammaticFocus: ComponentStory<typeof Checkbox> = ({ children, ...rest }) => {
  const checkboxRef = useRef<Checkbox>(null);

  function focus() {
    if (checkboxRef.current) {
      checkboxRef.current.focus();
    }
  }

  function blur() {
    if (checkboxRef.current) {
      checkboxRef.current.blur();
    }
  }

  return (
    <div>
      <Checkbox {...rest} ref={checkboxRef}>
        {children}
      </Checkbox>
      <Gapped>
        <button onClick={focus}>Focus</button>
        <button onClick={blur}>Blur</button>
      </Gapped>
    </div>
  );
};
ProgrammaticFocus.args = {
  ...commonArgs,
  checked: false,
  children: 'label',
};
ProgrammaticFocus.storyName = 'programmatic focus';
ProgrammaticFocus.parameters = { creevey: { skip: [true] } };

const IndeterminateTemplate: ComponentStory<typeof Checkbox> = ({ children, ...rest }) => {
  const checkboxRef = useRef<Checkbox>(null);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <span style={{ display: 'inline-block', padding: 4 }} id="screenshot-capture">
        <Checkbox
          onValueChange={(checked) => setIsChecked(checked)}
          checked={isChecked}
          ref={checkboxRef}
          initialIndeterminate
          {...rest}
        >
          {children}
        </Checkbox>
      </span>
      <div>
        <button
          tabIndex={-1}
          onClick={() => {
            if (checkboxRef.current) {
              checkboxRef.current.setIndeterminate();
            }
          }}
        >
          setIndeterminate
        </button>
        <button
          tabIndex={-1}
          onClick={() => {
            if (checkboxRef.current) {
              checkboxRef.current.resetIndeterminate();
            }
          }}
        >
          resetIndeterminate
        </button>
        <button
          tabIndex={-1}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        >
          changeValue
        </button>
      </div>
    </div>
  );
};

export const Indeterminate: Story = IndeterminateTemplate.bind({});
Indeterminate.args = {
  ...commonArgs,
  children: 'Label',
};
Indeterminate.storyName = 'indeterminate';

Indeterminate.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }],
    tests: {
      async plain() {
        const element = await this.browser.findElement({ css: '#screenshot-capture' });
        await this.expect(await element.takeScreenshot()).to.matchImage('plain');
      },
      async hovered() {
        const element = await this.browser.findElement({ css: '#screenshot-capture' });
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: 'label' }),
          })
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('hovered');
      },
      async tabPress() {
        const element = await this.browser.findElement({ css: '#screenshot-capture' });
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('tabPress');
      },
      async clicked() {
        const element = await this.browser.findElement({ css: '#screenshot-capture' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const Highlighted: Story = () => {
  return (
    <div style={{ margin: 5 }}>
      <Gapped gap={5} vertical>
        <Checkbox checked>Highlighted default</Checkbox>
        <Checkbox checked warning>
          Highlighted warning
        </Checkbox>
        <Checkbox checked error>
          Highlighted error
        </Checkbox>
      </Gapped>
    </div>
  );
};
Highlighted.storyName = 'highlighted';

Highlighted.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async tabPress() {
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
    },
  },
};
