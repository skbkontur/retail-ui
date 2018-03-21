// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import FxInput from '../FxInput';

storiesOf('FxInput', module)
  .add('type text', () => (
    <TestFxInput />
  ))
  .add('type currency', () => (
    <TestFxInput type={'currency'} fractionDigits={4} autoFocus/>
));

type Props = {
  type?: string,
  autoFocus?: boolean
};

type State = {
  auto: boolean,
  value: string | number
};

class TestFxInput extends React.Component<Props, State> {
  state = {
    auto: false,
    value: this.props.type === 'currency' ? 0 : ''
  };

  render() {
      return (
        <FxInput
          type={this.props.type}
          value={this.state.value}
          auto={this.state.auto}
          onRestore={this.handleRestore}
          onChange={this.handleChange}
          autoFocus={this.props.autoFocus}
        />
      );
  }

  handleChange = (_, value) => {
    this.setState({ value, auto: false });
  };

  handleRestore = () => {
    this.setState({
      value: this.props.type === 'currency' ? 111 : 'auto',
      auto: true
    });
  };
}
