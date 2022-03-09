import React from 'react';

import { Meta, Story } from '../../../typings/stories';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Toggle } from '../../Toggle';
import { Nullable } from '../../../typings/utility-types';

interface CurrencyInputDemoProps {
  borderless?: boolean;
}

interface CurrencyInputDemoState {
  value: Nullable<number>;
  signed: boolean;
  hideTrailingZeros: boolean;
  digits: Nullable<number>;
}

class CurrencyInputDemo extends React.Component<CurrencyInputDemoProps, CurrencyInputDemoState> {
  public state: CurrencyInputDemoState = {
    value: null,
    signed: false,
    hideTrailingZeros: false,
    digits: 2,
  };

  public render() {
    return (
      <Gapped vertical gap={20}>
        <Gapped gap={10}>
          <Button onClick={() => this.setState({ value: 0 })}>
            Set <b>0</b>
          </Button>
          <Button onClick={() => this.setState({ value: null })}>
            Set <b>null</b>
          </Button>
          <Button onClick={this.handleRand}>
            Set <b>rand</b>
          </Button>
        </Gapped>
        <CurrencyInput
          borderless={this.props.borderless}
          value={this.state.value}
          fractionDigits={this.state.digits}
          hideTrailingZeros={this.state.hideTrailingZeros}
          signed={this.state.signed}
          onValueChange={this.handleChange}
        />
        <div>
          value: <b>{this.formatValue(this.state.value)}</b>
        </div>
        <div>
          <span>signed: </span>
          <Toggle checked={this.state.signed} onValueChange={this.handleSigned} />
        </div>
        <div>
          <span>trailing zeros: </span>
          <Toggle checked={this.state.hideTrailingZeros} onValueChange={this.handleHideTrailingZeros} />
        </div>
        <input
          type="range"
          value={this.state.digits == null ? 15 : this.state.digits}
          min={0}
          max={15}
          onChange={this.handleDigits}
        />
        <div>
          digits: <b>{this.formatValue(this.state.digits)}</b>
        </div>
      </Gapped>
    );
  }

  private handleChange = (value: Nullable<number>) => {
    this.setState({ value });
  };

  private handleRand = () => {
    const fraction = this.state.digits == null ? 4 : this.state.digits;
    const length = Math.min(15, 7 + fraction);
    const rand = Math.floor(Math.random() * Math.pow(10, length));
    const value = rand / Math.pow(10, fraction);
    this.setState({ value });
  };

  private handleDigits = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: null,
      digits: event.target.value === '15' ? null : parseInt(event.target.value, 10),
    });
  };

  private handleSigned = (value: boolean) => {
    this.setState({
      value: null,
      signed: value,
    });
  };

  private handleHideTrailingZeros = (value: boolean) => {
    this.setState({
      value: null,
      hideTrailingZeros: value,
    });
  };

  private formatValue = (value: Nullable<number>): string => {
    return value == null ? 'null' : value.toString();
  };
}

class Sample extends React.Component<
  Partial<CurrencyInputProps>,
  {
    value: Nullable<number>;
  }
> {
  public state = {
    value: this.props.value,
  };

  private currencyInputElement: CurrencyInput | null = null;

  public render() {
    return (
      <div>
        <CurrencyInput
          {...this.props}
          ref={this.currencyInputRef}
          value={this.state.value}
          onValueChange={this.handleChange}
        />
        <div style={{ margin: '15px 0', position: 'absolute' }}>
          <button data-tid="focus" onClick={this.handleClickButton}>
            focus
          </button>
        </div>
      </div>
    );
  }

  private handleChange = (value: Nullable<number>) => {
    this.setState({ value });
  };

  private currencyInputRef = (element: CurrencyInput | null) => {
    this.currencyInputElement = element;
  };

  private handleClickButton = () => {
    if (this.currencyInputElement) {
      this.currencyInputElement.focus();
    }
  };
}

export default { title: 'CurrencyInput' } as Meta;

export const Demo = () => <CurrencyInputDemo />;
Demo.parameters = { creevey: { skip: [true] } };
export const WithBorderless = () => <CurrencyInputDemo borderless={true} />;
WithBorderless.storyName = 'With borderless';
WithBorderless.parameters = { creevey: { skip: [true] } };

export const SampleStory: Story = () => <Sample fractionDigits={0} />;
SampleStory.storyName = 'Sample';

SampleStory.parameters = {
  creevey: {
    skip: [
      {
        in: ['chromeDark'],
        tests: ['Focus', 'Input value', 'External focus and input'],
        reason: 'flacky visible(?!) cursor',
      },
    ],
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focus() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name*="CurrencyInput"] input' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
      },
      async ['Input value']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name*="CurrencyInput"] input' }))
          .sendKeys('1')
          .pause(500)
          .sendKeys('2')
          .pause(500)
          .sendKeys('3')
          .pause(500)
          .sendKeys('4')
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Input value');
      },
      async ['External focus and input']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid="focus"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys('1')
          .pause(500)
          .sendKeys('2')
          .pause(500)
          .sendKeys('3')
          .pause(500)
          .sendKeys('4')
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('External focus and input');
      },
    },
  },
};

export const ManualMount = () => {
  class ManualMounting extends React.Component<
    {},
    {
      mounted: boolean;
    }
  > {
    public state = {
      mounted: false,
    };

    public render() {
      return (
        <div>
          <label>
            Mounted <input type="checkbox" checked={this.state.mounted} onChange={this.handleChangeMounting} />
          </label>
          {this.state.mounted && (
            <div>
              <Sample autoFocus value={9909} />
            </div>
          )}
        </div>
      );
    }

    private handleChangeMounting = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        mounted: event.target.checked,
      });
    };
  }
  return <ManualMounting />;
};
ManualMount.storyName = 'Manual mount';
ManualMount.parameters = { creevey: { skip: [true] } };
