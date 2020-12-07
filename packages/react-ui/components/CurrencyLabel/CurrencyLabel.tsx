import React from 'react';

import { MAX_SAFE_DIGITS } from '../CurrencyInput/constants';
import { CurrencyHelper } from '../CurrencyInput/CurrencyHelper';

export type CurrencyLabelProps = {
  /**
   * Минимальное количество отображаемых знаков после запятой
   * @default 2
   */
  fractionDigits: number;
  value: number;
  currencySymbol?: React.ReactNode;
} & typeof defaultProps;

export const defaultProps = {
  fractionDigits: 2,
};

export const CurrencyLabel = ({ value, fractionDigits, currencySymbol }: CurrencyLabelProps): JSX.Element => (
  <span>
    {CurrencyHelper.format(value, { fractionDigits })}
    {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
    {currencySymbol}
  </span>
);

CurrencyLabel.__KONTUR_REACT_UI__ = 'CurrencyLabel';

CurrencyLabel.defaultProps = defaultProps;

CurrencyLabel.propTypes = {
  fractionDigits: (props: CurrencyLabelProps) => {
    if (props.fractionDigits > MAX_SAFE_DIGITS) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` +
          `\nSee https://tech.skbkontur.ru/react-ui/#/CurrencyInput?id=why15`,
      );
    }

    const { fraction } = CurrencyHelper.destructString(String(props.value)) || { fraction: '' };
    if (fraction.length > props.fractionDigits) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' less than fractional part of the 'value' property,` +
          `'value' will not be cutted`,
      );
    }

    if (!Number.isInteger(props.fractionDigits)) {
      return new Error(
        `[CurrencyLabel]: Prop 'fractionDigits' is not integer, fraction part of these property will not be used`,
      );
    }

    return null;
  },
};
