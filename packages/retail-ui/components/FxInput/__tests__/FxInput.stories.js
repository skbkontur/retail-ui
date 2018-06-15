

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import FxInput from '../FxInput';

storiesOf('FxInput', module)
  .add('type text', () => <TestFxInput />)
  .add('type currency', () => (
    <TestFxInput type={'currency'} fractionDigits={4} autoFocus />
  ))
  .add('with borderless', () => <TestFxInput borderless />);

type Props = {
  type?: string,
  autoFocus?: boolean,
  borderless?: boolean
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
        auto={this.state.auto}
        autoFocus={this.props.autoFocus}
        borderless={this.props.borderless}
        type={this.props.type}
        value={this.state.value}
        onRestore={this.handleRestore}
        onChange={this.handleChange}
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
