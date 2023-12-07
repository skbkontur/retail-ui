import React, { forwardRef, Ref } from 'react';

import { Input, InputProps, InputType } from '../Input';
import { MaskedInput as InternalMaskedInput } from '../../internal/MaskedInput';
import { Nullable } from '../../typings/utility-types';

export interface MaskedProps {
  mask: string;
  /** Символ маски */
  maskChar?: Nullable<string>;
  /**
   * Словарь символов-регулярок для задания маски
   * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
   */
  formatChars?: Record<string, string>;
  /** Показывать символы маски */
  alwaysShowMask?: boolean;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export interface MaskedInputProps extends MaskedProps, Omit<InputProps, 'mask' | 'maxLength' | 'type' | 'element'> {
  type?: MaskInputType;
}

export const MaskedInput = forwardRef(function MaskedInput(props: MaskedInputProps, ref: Ref<Input>) {
  const { mask, maskChar, formatChars, alwaysShowMask, placeholder, ...inputProps } = props;

  return (
    <Input
      ref={ref}
      {...inputProps}
      placeholder={alwaysShowMask ? undefined : placeholder}
      element={
        <InternalMaskedInput
          mask={mask}
          maskChar={maskChar}
          formatChars={formatChars}
          alwaysShowMask={alwaysShowMask}
        />
      }
    />
  );
});
