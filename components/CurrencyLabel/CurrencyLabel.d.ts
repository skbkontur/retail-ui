import * as React from 'react';

export interface CurrencyLabelProps {
  fractionDigits?: number;
  value: number;
  currencySymbol?: React.ReactNode;
}

declare const CurrencyLabel: React.StatelessComponent<CurrencyLabelProps>;

export default CurrencyLabel;
