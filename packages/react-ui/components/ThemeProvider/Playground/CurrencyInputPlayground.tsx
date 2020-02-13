import React from 'react';

import { CurrencyInput, CurrencyInputProps } from '../../CurrencyInput';

export class CurrencyInputPlayground extends React.Component<
  Partial<CurrencyInputProps>,
  {
    value?: number | null;
  }
> {
  public state = {
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
