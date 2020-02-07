import React from 'react';
import { storiesOf } from '@storybook/react';

import { PasswordInput } from '../PasswordInput';
import { Nullable } from '../../../typings/utility-types';

interface ComponentProps {
  capsLockEnabled?: boolean;
}

class Component extends React.Component<ComponentProps> {
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
          ref={ref => {
            this._passwordInput = ref;
          }}
          value={this.state.value}
          onChange={this._handleChange}
        />
      </div>
    );
  }

  private _handleChange = (_: any, value: string) => {
    this.setState({ value });
  };
}

storiesOf('PasswordInput', module)
  .add('Plain', () => <Component />)
  .add('CapsLock label', () => <Component capsLockEnabled />);
