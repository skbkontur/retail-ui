import React from 'react';

import { Story } from '../../../typings/stories';
import { PasswordInput } from '../PasswordInput';
import { Nullable } from '../../../typings/utility-types';
import { PasswordInputProps } from '..';

type ComponentProps = {
  capsLockEnabled?: boolean;
};
type ComponentState = Pick<PasswordInputProps, 'value'>;
class Component extends React.Component<ComponentProps, ComponentState> {
  public state = {
    value: '',
  };

  private _passwordInput: Nullable<PasswordInput>;

  public componentDidMount() {
    if (this.props.capsLockEnabled) {
      this.setState({ value: 'test' });
      if (this._passwordInput) {
        this._passwordInput.setState({ capsLockEnabled: true });
      }
    }
  }

  public render() {
    return (
      <div>
        <PasswordInput
          detectCapsLock
          ref={(ref) => {
            this._passwordInput = ref;
          }}
          value={this.state.value}
          onValueChange={this._handleChange}
        />
      </div>
    );
  }

  private _handleChange = (value: string) => {
    this.setState({ value });
  };
}

export default { title: 'PasswordInput' };

export const Plain: Story = () => <Component />;
Plain.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async ['With typed password']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[type="password"]' }))
          .sendKeys('Test...')
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('With typed password');
      },
      async ['With visible password']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[type="password"]' }))
          .sendKeys('Test...')
          .click(this.browser.findElement({ css: '[data-tid="PasswordInputEyeIcon"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('With visible password');
      },
    },
  },
};
export const CapsLockLabel = () => <Component capsLockEnabled />;
CapsLockLabel.storyName = 'CapsLock label';
