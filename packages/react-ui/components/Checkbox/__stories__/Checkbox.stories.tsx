import React, { Component } from 'react';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { Checkbox } from '../Checkbox';
import { Gapped } from '../../Gapped';

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

interface IndeterminatePlaygroundState {
  checked: boolean;
}

class IndeterminatePlayground extends Component<{}, IndeterminatePlaygroundState> {
  public state: IndeterminatePlaygroundState = {
    checked: false,
  };

  private checkboxRef = React.createRef<Checkbox>();

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

  private setIndeterminate = () => {
    this.checkboxRef.current?.setIndeterminate();
  };

  private resetIndeterminate = () => {
    this.checkboxRef.current?.resetIndeterminate();
  };

  private changeValue = () => {
    this.setState((state: IndeterminatePlaygroundState) => ({
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

export default { title: 'Checkbox' } as Meta;

export const Plain: Story = () => <PlainCheckbox>Plain checkbox</PlainCheckbox>;
Plain.storyName = 'plain';

Plain.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' }],
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
    skip: [{ in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' }],
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
  const checkbox = React.useRef<Checkbox>(null);

  function focus() {
    checkbox.current?.focus();
  }

  function blur() {
    checkbox.current?.blur();
  }

  return (
    <div>
      <Checkbox ref={checkbox}>Label</Checkbox>
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

Indeterminate.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' }],
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
