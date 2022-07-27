import React, { Component, useState } from 'react';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { Checkbox } from '../Checkbox';
import { Gapped } from '../../Gapped';
import { Nullable } from '../../../typings/utility-types';
import { delay } from '../../../lib/utils';

class PlainCheckbox extends Component<any, any> {
  public state = {
    checked: false,
  };

  public render() {
    const { checked } = this.state;
    return (
      <Checkbox onValueChange={() => this.setState({ checked: !checked })} checked={checked}>
        {this.props.children}
      </Checkbox>
    );
  }
}

type IndeterminatePlaygroundProps = {
  children: React.ReactNode;
};

const IndeterminatePlayground = ({ children }: IndeterminatePlaygroundProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);

  return (
    <div>
      <span style={{ display: 'inline-block', padding: 4 }} id="screenshot-capture">
        <Checkbox
          onValueChange={(checked) => setIsChecked(checked)}
          checked={isChecked}
          isIndeterminate={isIndeterminate}
          setIsIndeterminate={setIsIndeterminate}
        >
          {children}
        </Checkbox>
      </span>
      <div>
        <button tabIndex={-1} onClick={() => setIsIndeterminate(true)}>
          setIndeterminate
        </button>
        <button tabIndex={-1} onClick={() => setIsIndeterminate(false)}>
          resetIndeterminate
        </button>
        <button tabIndex={-1} onClick={() => setIsChecked((prev) => !prev)}>
          changeValue
        </button>
      </div>
    </div>
  );
};

interface LEGACY_IndeterminatePlaygroundState {
  checked: boolean;
}

class LEGACY_IndeterminatePlayground extends Component<{}, LEGACY_IndeterminatePlaygroundState> {
  public state: LEGACY_IndeterminatePlaygroundState = {
    checked: false,
  };

  private checkbox: Checkbox | null = null;

  public render() {
    return (
      <div>
        <span style={{ display: 'inline-block', padding: 4 }} id="screenshot-capture">
          <Checkbox
            onValueChange={(checked) => this.setState({ checked })}
            checked={this.state.checked}
            initialIndeterminate
            ref={this.checkboxRef}
          >
            {this.props.children}
          </Checkbox>
        </span>
        <div>
          <button tabIndex={-1} onClick={this.setIndeterminate}>
            setIndeterminate
          </button>
          <button tabIndex={-1} onClick={this.resetIndeterminate}>
            resetIndeterminate
          </button>
          <button tabIndex={-1} onClick={this.changeValue}>
            changeValue
          </button>
        </div>
      </div>
    );
  }

  private checkboxRef = (element: Checkbox) => {
    this.checkbox = element;
  };

  private setIndeterminate = () => {
    if (this.checkbox) {
      this.checkbox.setIndeterminate();
    }
  };

  private resetIndeterminate = () => {
    if (this.checkbox) {
      this.checkbox.resetIndeterminate();
    }
  };

  private changeValue = () => {
    this.setState((state: LEGACY_IndeterminatePlaygroundState) => ({
      checked: !state.checked,
    }));
  };
}

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
    await delay(1000);

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
    await delay(1000);

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
    await delay(1000);

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
    await delay(1000);

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
      .pause(1000)
      .sendKeys(this.keys.SPACE)
      .pause(1000)
      .perform();

    await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
  },
};

export default { title: 'Checkbox' } as Meta;

export const Plain: Story = () => <PlainCheckbox>Plain checkbox</PlainCheckbox>;
Plain.storyName = 'plain';

Plain.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },
      // TODO @Khlutkova fix after update browsers
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'pressed', 'clicked'] },
    ],
    tests: checkboxTests,
  },
};

export const Unchecked = () => <Checkbox>Unchecked</Checkbox>;
Unchecked.storyName = 'unchecked';
Unchecked.parameters = { creevey: { skip: [true] } };

export const Checked = () => <Checkbox checked>Checked</Checkbox>;
Checked.storyName = 'checked';

Checked.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },
      // TODO @Khlutkova fix after update browsers
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'pressed', 'clicked'] },
    ],
    tests: {
      idle: checkboxTests['idle'],
      hovered: checkboxTests['hovered'],
      pressed: checkboxTests['pressed'],
    },
  },
};

export const Disabled = () => <Checkbox disabled>Disabled</Checkbox>;
Disabled.storyName = 'disabled';

export const DisabledChecked = () => (
  <Checkbox disabled checked>
    Disabled and checked
  </Checkbox>
);
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

export const WithMouseEnterLeaveHandlers = () => (
  <Checkbox onMouseEnter={() => console.count('enter')} onMouseLeave={() => console.count('leave')}>
    Hover me
  </Checkbox>
);
WithMouseEnterLeaveHandlers.storyName = 'with mouse enter/leave handlers';
WithMouseEnterLeaveHandlers.parameters = { creevey: { skip: [true] } };

export const WithALongLabel = () => (
  <div>
    Lorem ipsum dolor --{' '}
    <PlainCheckbox>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </PlainCheckbox>{' '}
    -- Lorem ipsum dolor.
  </div>
);
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

export const ProgrammaticFocus = () => {
  let checkbox: Nullable<Checkbox>;

  function focus() {
    if (checkbox) {
      checkbox.focus();
    }
  }

  function blur() {
    if (checkbox) {
      checkbox.blur();
    }
  }

  return (
    <div>
      <Checkbox ref={(el) => (checkbox = el)}>Label</Checkbox>
      <Gapped>
        <button onClick={focus}>Focus</button>
        <button onClick={blur}>Blur</button>
      </Gapped>
    </div>
  );
};
ProgrammaticFocus.storyName = 'programmatic focus';
ProgrammaticFocus.parameters = { creevey: { skip: [true] } };

export const Indeterminate: Story = () => <IndeterminatePlayground>Label</IndeterminatePlayground>;
Indeterminate.storyName = 'indeterminate';

export const LEGACY_Indeterminate: Story = () => <LEGACY_IndeterminatePlayground>Label</LEGACY_IndeterminatePlayground>;
LEGACY_Indeterminate.storyName = 'indeterminate LEGACY';

const indeterminateTests: CreeveyTests = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async 'reset indeterminate'() {
    const buttons = await this.browser.findElements({ css: 'button' });

    await this.browser
      .actions({
        bridge: true,
      })
      .click(buttons[1])
      .perform();
    await delay(1000);

    await this.expect(await this.takeScreenshot()).to.matchImage('reset indeterminate');
  },
  async 'set indeterminate'() {
    const buttons = await this.browser.findElements({ css: 'button' });

    await this.browser
      .actions({
        bridge: true,
      })
      .click(buttons[1])
      .pause(1000)
      .click(buttons[0])
      .perform();
    await delay(1000);

    await this.expect(await this.takeScreenshot()).to.matchImage('set indeterminate');
  },
  async 'change value and set indeterminate'() {
    const buttons = await this.browser.findElements({ css: 'button' });

    await this.browser
      .actions({
        bridge: true,
      })
      .click(buttons[2])
      .pause(1000)
      .click(buttons[0])
      .perform();
    await delay(1000);

    await this.expect(await this.takeScreenshot()).to.matchImage('change value and set indeterminate');
  },
  async 'change value and reset indeterminate'() {
    const buttons = await this.browser.findElements({ css: 'button' });

    await this.browser
      .actions({
        bridge: true,
      })
      .click(buttons[1])
      .pause(1000)
      .click(buttons[2])
      .perform();
    await delay(1000);

    await this.expect(await this.takeScreenshot()).to.matchImage('change value and reset indeterminate');
  },
};

Indeterminate.parameters = {
  creevey: {
    tests: indeterminateTests,
  },
};

LEGACY_Indeterminate.parameters = {
  creevey: {
    tests: indeterminateTests,
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
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
      },
    },
  },
};

export const CheckboxLabelSelectionWithPressedShift: Story = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked}>
      caption
    </Checkbox>
  );
};
CheckboxLabelSelectionWithPressedShift.storyName = 'checkbox label selection with pressed shift';

CheckboxLabelSelectionWithPressedShift.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async 'selected with pressed shift'() {
        const checkbox = await this.browser.findElement({ css: '[data-comp-name~="Checkbox"]' });

        await this.browser.actions({ bridge: true }).keyDown(this.keys.SHIFT).click(checkbox).perform();

        await this.expect(await this.takeScreenshot()).to.matchImage('selected with pressed shift');

        await this.browser.actions({ bridge: true }).keyUp(this.keys.SHIFT).perform();
      },
    },
  },
};
