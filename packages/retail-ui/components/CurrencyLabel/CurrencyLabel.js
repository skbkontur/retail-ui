
import * as React from 'react';

import CurrencyHelper from '../CurrencyInput/CurrencyHelper';

type Props = {
  fractionDigits: number,
  value: number,
  currencySymbol: React.Node | null
};

const CurrencyLabel = ({ value, fractionDigits, currencySymbol }: Props) => (
  <span>
    {CurrencyHelper.format(value, { fractionDigits })}
    {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
    {currencySymbol}
  </span>
);

CurrencyLabel.defaultProps = {
  fractionDigits: 2,
  currencySymbol: null
};

export default CurrencyLabel;
