import React from 'react';
import { InputSize } from 'react-ui/components/Input';

import { Meta, Story } from '../../../typings/stories';
import { BGRuler } from '../../../internal/BGRuler';
import { FxInput } from '../FxInput';
import { Gapped } from '../../Gapped';
import { createPropsGetter } from '../../../lib/createPropsGetter';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { FxInputProps } from '..';

export default { title: 'FxInput' } as Meta;

export const TypeText = () => <TestFxInput />;
TypeText.storyName = 'type text';

export const DifferentSizesFxInput = () => (
  <Gapped vertical>
    <TestFxInput size="small" />
    <TestFxInput size="medium" />
    <TestFxInput size="large" />
  </Gapped>
);
DifferentSizesFxInput.storyName = 'different sizes';

export const TypeCurrency = () => <TestFxInput type={'currency'} fractionDigits={4} />;
TypeCurrency.storyName = 'type currency';

export const WithDisabled = () => <FxInput disabled onValueChange={console.log} />;
WithDisabled.storyName = 'with disabled';

export const Borderless = () => (
  <TestWrapper>
    <TestFxInput borderless />
  </TestWrapper>
);
Borderless.storyName = 'borderless';

export const WithWidthStory: Story = () => <WithWidth />;
WithWidthStory.storyName = 'with width';

WithWidthStory.parameters = {
  creevey: {
    tests: {
      async 'inside auto container'() {
        const element = await this.browser.findElement({ css: '[data-tid="container"]' });
        await this.expect(await element.takeScreenshot()).to.matchImage('inside auto container');
      },
      async 'inside fixed container'() {
        const element = await this.browser.findElement({ css: '[data-tid="container"]' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#toggle-width' }))
          .perform();
        await this.expect(await element.takeScreenshot()).to.matchImage('inside fixed container');
      },
    },
  },
};

interface TestFxInputProps {
  type: FxInputProps['type'];
  borderless?: boolean;
  size?: InputSize;
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
        size={this.props.size}
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

interface TestWrapperProps {
  width?: number | string;
  ruler?: boolean;
}
class TestWrapper extends React.Component<TestWrapperProps> {
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
    const darkStyle: React.CSSProperties = {
      ...style,
      background: '1f1f1f',
    };
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <div style={theme.prototype.constructor.name === 'DarkTheme' ? darkStyle : style}>
              {ruler && <BGRuler color="#888" left={10} right={9} />}
              {children}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

class WithWidth extends React.Component {
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
