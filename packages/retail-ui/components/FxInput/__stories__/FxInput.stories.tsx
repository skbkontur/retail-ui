import * as React from 'react';
import { storiesOf } from '@storybook/react';

import FxInput from '../FxInput';
import { createPropsGetter } from '../../internal/createPropsGetter';
import { InputType } from '../../Input/Input';
import { Nullable } from '../../../typings/utility-types';

storiesOf('FxInput', module)
  .add('type text', () => <TestFxInput />)
  .add('type currency', () => <TestFxInput type={'currency'} fractionDigits={4} />)
  .add('borderless', () => (
    <TestWrapper>
      <TestFxInput borderless />
    </TestWrapper>
  ));

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
    type: 'text',
  };

  private getProps = createPropsGetter(TestFxInput.defaultProps);
  private fxInput: Nullable<FxInput>;

  constructor(props: TestFxInputProps) {
    super(props);

    this.state = {
      auto: false,
      value: this.props.type === 'currency' ? 0 : '',
    };
  }

  public render(): JSX.Element {
    return (
      <FxInput
        auto={this.state.auto}
        borderless={this.props.borderless}
        type={this.getProps().type}
        value={this.state.value}
        onRestore={this.handleRestore}
        onChange={this.handleChange}
        ref={instance => (this.fxInput = instance)}
      />
    );
  }

  private handleChange = (_: any, value: React.ReactText) => {
    this.setState({ value, auto: false });
  };

  private handleRestore = () => {
    this.setState({
      value: this.props.type === 'currency' ? 111 : 'auto',
      auto: true,
    });
  };
}

class TestWrapper extends React.Component<{
  width?: number | string;
  ruler?: boolean;
}> {
  public render() {
    const { width, ruler, children } = this.props;
    const style: React.CSSProperties = {
      position: 'relative',
      width,
      padding: 10,
      paddingTop: (ruler && 30) || 10,
      marginBottom: 15,
      background: '#eee',
    };
    return (
      <div style={style}>
        {ruler && <BGRuler color="#888" left={10} right={9} />}
        {children}
      </div>
    );
  }
}
