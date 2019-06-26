import * as React from 'react';
import warning from 'warning';
import { MAX_SAFE_DIGITS } from '../CurrencyInput/constants';

import CurrencyHelper from '../CurrencyInput/CurrencyHelper';

export interface CurrencyLabelProps {
  fractionDigits?: number;
  value: number;
  currencySymbol?: React.ReactNode | null;
}

export const CurrencyLabel: React.FunctionComponent<CurrencyLabelProps> = ({
  value,
  fractionDigits = 2,
  currencySymbol = null,
}): JSX.Element => {
  warning(
    (fractionDigits || 0) <= MAX_SAFE_DIGITS,
    `[CurrencyLabel]: Prop 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` +
    `\nSee https://tech.skbkontur.ru/react-ui/#/CurrencyInput?id=why15`,
  );
  return (
    <span>
      {CurrencyHelper.format(value, { fractionDigits })}
      {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
      {currencySymbol}
    </span>
  );
};

export default CurrencyLabel;
