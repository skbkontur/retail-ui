import * as React from 'react';
import { storiesOf } from '@storybook/react';

import FxInput from '../FxInput';
import { createPropsGetter } from '../../internal/createPropsGetter';
import { InputType } from '../../Input/Input';

storiesOf('FxInput', module)
  .add('type text', () => <TestFxInput />)
  .add('type currency', () => (
    <TestFxInput type={'currency'} fractionDigits={4} autoFocus />
  ))
  .add('with borderless', () => <TestFxInput borderless />);

interface TestFxInputProps {
  type?: 'currency' | InputType;
  autoFocus?: boolean;
  borderless?: boolean;
  fractionDigits?: number;
}

interface TestFxInputState {
  auto: boolean;
  value: React.ReactText;
}

class TestFxInput extends React.Component<TestFxInputProps, TestFxInputState> {
  public static defaultProps: { type: TestFxInputProps['type'] } = {
    type: 'text'
  }

  private getProps = createPropsGetter(TestFxInput.defaultProps);
  
  constructor(props: TestFxInputProps) {
    super(props);

    this.state = {
      auto: false,
      value: this.props.type === 'currency' ? 0 : ''
    };
  }

  public render(): JSX.Element {
    return (
      <FxInput
        auto={this.state.auto}
        autoFocus={this.props.autoFocus}
        borderless={this.props.borderless}
        type={this.getProps().type}
        value={this.state.value}
        onRestore={this.handleRestore}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (_: any, value: React.ReactText) => {
    this.setState({ value, auto: false });
  };

  private handleRestore = () => {
    this.setState({
      value: this.props.type === 'currency' ? 111 : 'auto',
      auto: true
    });
  };
}
