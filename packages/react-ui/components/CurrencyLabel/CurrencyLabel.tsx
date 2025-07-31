import type { HTMLAttributes } from 'react';
import React from 'react';
import warning from 'warning';

import { MAX_SAFE_DIGITS } from '../CurrencyInput/constants';
import { CurrencyHelper } from '../CurrencyInput/CurrencyHelper';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

export interface CurrencyLabelProps extends CommonProps, Pick<HTMLAttributes<HTMLElement>, 'id'> {
  /** Устанавливает минимальное количество отображаемых знаков после запятой.
   * @default 2 */
  fractionDigits?: number;

  /** Устанавливает значение. */
  value: number;

  /** Задает символ валюты. */
  currencySymbol?: React.ReactNode;

  /** Убирает лишние нули после запятой. */
  hideTrailingZeros?: boolean;
}

const FRACTION_DIGITS_DEFAULT = 2;

export const CurrencyLabelDataTids = {
  root: 'CurrencyLabel__root',
} as const;

/**
 * `CurrencyLabel` — подпись для денежных сумм (и других числовых значений).
 */
const CurrencyLabel = forwardRefAndName(
  'CurrencyLabel',
  function CurrencyLabel(
    {
      id,
      value,
      fractionDigits = FRACTION_DIGITS_DEFAULT,
      currencySymbol,
      hideTrailingZeros = false,
      ...rest
    }: CurrencyLabelProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    React.useEffect(() => {
      warning(
        fractionDigits <= MAX_SAFE_DIGITS,
        `[CurrencyLabel]: Prop 'fractionDigits' exceeds ${MAX_SAFE_DIGITS}.` + `\nSee CurrencyInput documentation`,
      );

      const { fraction } = CurrencyHelper.destructString(String(value)) || { fraction: '' };
      warning(
        fraction.length <= fractionDigits,
        `[CurrencyLabel]: Prop 'fractionDigits' less than fractional part of the 'value' property,` +
          `'value' will not be cutted`,
      );

      warning(
        Number.isInteger(fractionDigits),
        `[CurrencyLabel]: Prop 'fractionDigits' is not integer, fraction part of these property will not be used`,
      );
    }, [fractionDigits, value]);

    return (
      <CommonWrapper {...rest}>
        <span id={id} data-tid={CurrencyLabelDataTids.root} ref={ref}>
          {CurrencyHelper.format(value, { fractionDigits, hideTrailingZeros })}
          {currencySymbol && String.fromCharCode(0xa0) /* &nbsp; */}
          {currencySymbol}
        </span>
      </CommonWrapper>
    );
  },
);

export { CurrencyLabel };
