import * as React from 'react';
import { MAX_SAFE_DIGITS } from '../CurrencyInput/constants';

import CurrencyHelper from '../CurrencyInput/CurrencyHelper';

export interface CurrencyLabelProps {
  fractionDigits: number;
  value: number;
  currencySymbol: React.ReactNode | null;
}

export const CurrencyLabel: React.FunctionComponent<CurrencyLabelProps> = ({
  value,
  fractionDigits,
  currencySymbol,
}): JSX.Element => (
  <span>
    {CurrencyHelper.format(value, { fractionDigits })}
    {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
    {currencySymbol}
  </span>
);

(CurrencyLabel as any).__KONTUR_REACT_UI__ = 'CurrencyLabel';

CurrencyLabel.defaultProps = {
  fractionDigits: 2,
  currencySymbol: null,
};

CurrencyLabel.propTypes = {
  fractionDigits: props => {
    const labelProps = props as CurrencyLabelProps;

    if (labelProps.fractionDigits > MAX_SAFE_DIGITS) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` +
          `\nSee https://tech.skbkontur.ru/react-ui/#/CurrencyInput?id=why15`,
      );
    }

    const { fraction } = CurrencyHelper.destructString(String(labelProps.value)) || { fraction: '' };
    if (fraction.length > labelProps.fractionDigits) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' less than fractional part of the 'value' property,` +
          `'value' will not be cutted`,
      );
    }

    if (!Number.isInteger(labelProps.fractionDigits)) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' is not integer, fraction part of these property will not be used`,
      );
    }

    return null;
  },
};

export default CurrencyLabel;
