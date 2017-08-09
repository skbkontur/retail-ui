// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { storiesOf } from '@storybook/react';

import PasswordInput from '../PasswordInput';

class Component extends React.Component {
  state = {
    value: ''
  };

  _handleChange = (e, value: string) => {
    this.setState({ value });
  };

  render() {
    return (
      <PasswordInput
        detectCapsLock
        size="small"
        value={this.state.value}
        onChange={this._handleChange}
      />
    );
  }
}

storiesOf('PasswordInput', module).add('plain', () => <Component />);
