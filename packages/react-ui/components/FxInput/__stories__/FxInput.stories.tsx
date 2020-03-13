import React from 'react';
import { storiesOf } from '@storybook/react';

import { BGRuler } from '../../../lib/BGRuler';
import { FxInput } from '../FxInput';
import { createPropsGetter } from '../../../internal/createPropsGetter';
import { InputType } from '../../Input';

storiesOf('FxInput', module)
  .add('type text', () => <TestFxInput />)
  .add('type currency', () => <TestFxInput type={'currency'} fractionDigits={4} />)
  .add('borderless', () => (
    <TestWrapper>
      <TestFxInput borderless />
    </TestWrapper>
  ))
  .add('with width', () => <WithWidth />);

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
        onValueChange={this.handleChange}
      />
    );
  }

  private handleChange = (value: React.ReactText) => {
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

class WithWidth extends React.Component<
  {},
  {
    isFixedWidth: boolean;
  }
> {
  public state = {
    isFixedWidth: false,
  };

  public render() {
    const { isFixedWidth } = this.state;
    const FIXED = '200px';
    const AUTO = 'auto';
    const wrapperWidth = isFixedWidth ? FIXED : AUTO;
    return (
      <div style={{ width: 500 }}>
        <button id="toggle-width" onClick={this.toggleWidth}>
          Set wrapper width to: {isFixedWidth ? AUTO : FIXED}
        </button>
        <br />
        <br />
        <div data-tid="container">
          <TestWrapper width={wrapperWidth} ruler>
            <FxInput placeholder="no width" onValueChange={this.onChange} />
          </TestWrapper>

          <TestWrapper width={wrapperWidth} ruler>
            <FxInput width="100%" placeholder="100%" onValueChange={this.onChange} />
          </TestWrapper>

          <TestWrapper width={wrapperWidth} ruler>
            <FxInput width={100} placeholder="100px" onValueChange={this.onChange} />
          </TestWrapper>

          <TestWrapper width={wrapperWidth} ruler>
            <FxInput width={400} placeholder="400px" onValueChange={this.onChange} />
          </TestWrapper>
        </div>
      </div>
    );
  }

  private toggleWidth = () => {
    this.setState({
      isFixedWidth: !this.state.isFixedWidth,
    });
  };

  private onChange = () => null;
}
