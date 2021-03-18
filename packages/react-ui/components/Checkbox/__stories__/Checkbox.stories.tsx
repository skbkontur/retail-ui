import React, { Component } from 'react';
import { CSFStory } from 'creevey';

import { Checkbox } from '../Checkbox';
import { Gapped } from '../../Gapped';
import { Nullable } from '../../../typings/utility-types';

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

  private checkbox: Checkbox | null = null;

  public render() {
    return (
      <div>
        <span style={{ display: 'inline-block', padding: 4 }} id="screenshot-capture">
          <Checkbox
            onValueChange={checked => this.setState({ checked })}
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
    this.setState((state: IndeterminatePlaygroundState) => ({
      checked: !state.checked,
    }));
  };
}

export default { title: 'Checkbox' };

export const Plain: CSFStory<JSX.Element> = () => <PlainCheckbox>Plain checkbox</PlainCheckbox>;
Plain.story = {
  name: 'plain',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hovered' }],
      tests: {
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
          await this.browser
            .actions({ bridge: true })
            .sendKeys(this.keys.SPACE)
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('spacePress');
        },
      },
    },
  },
};

export const Unchecked = () => <Checkbox>Unchecked</Checkbox>;
Unchecked.story = { name: 'unchecked', parameters: { creevey: { skip: [true] } } };

export const Checked = () => <Checkbox checked>Checked</Checkbox>;
Checked.story = { name: 'checked', parameters: { creevey: { skip: [true] } } };

export const Disabled = () => <Checkbox disabled>Disabled</Checkbox>;
Disabled.story = { name: 'disabled' };

export const DisabledChecked = () => (
  <Checkbox disabled checked>
    Disabled and checked
  </Checkbox>
);
DisabledChecked.story = { name: 'disabled checked' };

export const Error = () => <Checkbox error>Error</Checkbox>;
Error.story = { name: 'error' };

export const WithMouseEnterLeaveHandlers = () => (
  <Checkbox onMouseEnter={() => console.count('enter')} onMouseLeave={() => console.count('leave')}>
    Hover me
  </Checkbox>
);
WithMouseEnterLeaveHandlers.story = {
  name: 'with mouse enter/leave handlers',
  parameters: { creevey: { skip: [true] } },
};

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
WithALongLabel.story = { name: 'with a long label' };

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
WithoutLabel.story = { name: 'without label' };

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
      <Checkbox ref={el => (checkbox = el)}>Label</Checkbox>
      <Gapped>
        <button onClick={focus}>Focus</button>
        <button onClick={blur}>Blur</button>
      </Gapped>
    </div>
  );
};
ProgrammaticFocus.story = { name: 'programmatic focus', parameters: { creevey: { skip: [true] } } };

export const Indeterminate: CSFStory<JSX.Element> = () => <IndeterminatePlayground>Label</IndeterminatePlayground>;
Indeterminate.story = {
  name: 'indeterminate',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hovered' }],
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
  },
};

export const Highlighted: CSFStory<JSX.Element> = () => {
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
Highlighted.story = {
  name: 'highlighted',
  parameters: {
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
  },
};
