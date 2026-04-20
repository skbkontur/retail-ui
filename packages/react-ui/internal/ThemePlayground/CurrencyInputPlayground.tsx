import React from 'react';

import { CurrencyInput } from '../../components/CurrencyInput/index.js';
import type { CurrencyInputProps } from '../../components/CurrencyInput/index.js';
import type { Nullable } from '../../typings/utility-types.js';

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
