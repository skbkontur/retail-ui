import React from 'react';

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

export const Plain = () => <Component />;
export const CapsLockLabel = () => <Component capsLockEnabled />;
CapsLockLabel.story = { name: 'CapsLock label' };
