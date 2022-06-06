import React from 'react';

import { CurrencyInput, CurrencyInputProps } from '../../components/CurrencyInput';

type CurrencyInputPlaygroundProps = Partial<CurrencyInputProps>;
type CurrencyInputPlaygroundState = Pick<CurrencyInputProps, 'value'>;
export class CurrencyInputPlayground extends React.Component<
  CurrencyInputPlaygroundProps,
  CurrencyInputPlaygroundState
> {
  public state: CurrencyInputPlaygroundState = {
    value: this.props.value || 2222,
  };

  public render() {
    return (
      <div>
        <CurrencyInput
          {...this.props}
          placeholder={'currency'}
          value={this.state.value}
          onValueChange={this.handleChange}
          width={150}
        />
      </div>
    );
  }

  private handleChange = (value?: number | null) => {
    this.setState({ value });
  };
}
