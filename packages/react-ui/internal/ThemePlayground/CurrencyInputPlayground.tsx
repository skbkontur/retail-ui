import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { CurrencyInput, CurrencyInputProps } from '../../components/CurrencyInput';

interface CurrencyInputPlaygroundState {
  value: Nullable<number>;
}
export class CurrencyInputPlayground extends React.Component<Partial<CurrencyInputProps>> {
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
