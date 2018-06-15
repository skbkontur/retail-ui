import * as React from 'react';

import CurrencyHelper from '../CurrencyInput/CurrencyHelper';

export interface CurrencyLabelProps {
  fractionDigits?: number;
  value: number;
  currencySymbol?: React.ReactNode | null;
}

const CurrencyLabel = ({
  value,
  fractionDigits = 2,
  currencySymbol = null
}: CurrencyLabelProps) => (
  <span>
    {CurrencyHelper.format(value, { fractionDigits })}
    {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
    {currencySymbol}
  </span>
);

export default CurrencyLabel;
