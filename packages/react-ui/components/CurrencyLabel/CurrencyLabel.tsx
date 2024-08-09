import React from 'react';

import { CurrencyHelper } from '../CurrencyInput/CurrencyHelper';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

export interface CurrencyLabelProps extends CommonProps {
  /**
   * Минимальное количество отображаемых знаков после запятой
   * @default 2
   */
  fractionDigits?: number;
  value: number;
  currencySymbol?: React.ReactNode;
  /** Убрать лишние нули после запятой */
  hideTrailingZeros?: boolean;
}

const FRACTION_DIGITS_DEFAULT = 2;

export const CurrencyLabelDataTids = {
  root: 'CurrencyLabel__root',
} as const;

export const CurrencyLabel = ({
  value,
  fractionDigits = FRACTION_DIGITS_DEFAULT,
  currencySymbol,
  hideTrailingZeros = false,
  ...rest
}: CurrencyLabelProps): JSX.Element => {
  return (
    <CommonWrapper {...rest}>
      <span data-tid={CurrencyLabelDataTids.root}>
        {CurrencyHelper.format(value, { fractionDigits, hideTrailingZeros })}
        {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
        {currencySymbol}
      </span>
    </CommonWrapper>
  );
};

CurrencyLabel.__KONTUR_REACT_UI__ = 'CurrencyLabel';
CurrencyLabel.displayName = 'CurrencyLabel';
