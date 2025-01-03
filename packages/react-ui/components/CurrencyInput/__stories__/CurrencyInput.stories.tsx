import React from 'react';

import { isNullable } from '../../../lib/utils';
import { Story } from '../../../typings/stories';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { Toggle } from '../../Toggle';
import { Nullable } from '../../../typings/utility-types';

export default {
  title: 'CurrencyInput',
  component: CurrencyInput,
};

interface CurrencyInputDemoProps {
  borderless?: boolean;
}
interface CurrencyInputDemoState {
  value: any;
  hideTrailingZeros: boolean;
  fractionDigits: number;
  signed: boolean;
}

class CurrencyInputDemo extends React.Component<CurrencyInputDemoProps> {
  public state: CurrencyInputDemoState = {
    value: null,
    signed: false,
    hideTrailingZeros: false,
    fractionDigits: 2,
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
          <Button onClick={() => this.setState({ value: parseInt('str') })}>
            Set <b>NaN</b>
          </Button>
          <Button onClick={() => this.setState({ value: 'str' })}>
            Set <b>str</b>
          </Button>
          <Button onClick={this.handleRand}>
            Set <b>rand</b>
          </Button>
        </Gapped>
        <CurrencyInput
          borderless={this.props.borderless}
          value={this.state.value}
          fractionDigits={this.state.fractionDigits}
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
        <input type="range" value={this.state.fractionDigits ?? 15} min={0} max={15} onChange={this.handleDigits} />
        <div>
          digits: <b>{this.formatValue(this.state.fractionDigits)}</b>
        </div>
      </Gapped>
    );
  }

  private handleChange = (value: Nullable<number>) => {
    this.setState({ value });
  };

  private handleRand = () => {
    const fraction = this.state.fractionDigits ?? 4;
    const length = Math.min(15, 7 + fraction);
    const rand = Math.floor(Math.random() * Math.pow(10, length));
    const value = rand / Math.pow(10, fraction);
    this.setState({ value });
  };

  private handleDigits = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: null,
      fractionDigits: event.target.value === '15' ? null : parseInt(event.target.value, 10),
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
    return isNullable(value) ? 'null' : value.toString();
  };
}

interface SampleState {
  value: Nullable<number>;
}
class Sample extends React.Component<Partial<CurrencyInputProps>> {
  public state: SampleState = {
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
          <button onClick={this.handleClickButton} data-tid="focus-input">
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

export const Demo: Story = () => <CurrencyInputDemo />;
Demo.parameters = { creevey: { skip: true } };
export const WithBorderless: Story = () => <CurrencyInputDemo borderless />;
WithBorderless.storyName = 'With borderless';
WithBorderless.parameters = { creevey: { skip: true } };

export const SampleStory: Story = () => <Sample fractionDigits={0} />;
SampleStory.storyName = 'Sample';

class ManualMounting extends React.Component {
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
export const ManualMount: Story = () => <ManualMounting />;
ManualMount.storyName = 'Manual mount';
ManualMount.parameters = { creevey: { skip: true } };
