/* eslint-disable react/no-multi-comp */
import React from 'react';
import { storiesOf } from '@storybook/react';

import PasswordInput from '../PasswordInput';

class Component extends React.Component {
  state = {
    value: ''
  };

  componentDidMount() {
    if (this.props.capsLockEnabled) {
      this.setState({ value: 'test' });
      this._passwordInput.setState({ capsLockEnabled: true });
    }
  }

  _handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
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
}

storiesOf('PasswordInput', module)
  .add('Plain', () => <Component />)
  .add('CapsLock label', () => <Component capsLockEnabled />);
