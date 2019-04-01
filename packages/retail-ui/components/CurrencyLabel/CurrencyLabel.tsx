import * as React from 'react';

import CurrencyHelper from '../CurrencyInput/CurrencyHelper';

export interface CurrencyLabelProps {
  fractionDigits?: number;
  value: number;
  currencySymbol?: React.ReactNode | null;
}

export const CurrencyLabel: React.SFC<CurrencyLabelProps> = ({
  value,
  fractionDigits = 2,
  currencySymbol = null,
}): JSX.Element => (
  <span>
    {CurrencyHelper.format(value, { fractionDigits })}
    {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
    {currencySymbol}
  </span>
);

export default CurrencyLabel;
