import React, { forwardRef, Ref } from 'react';

import { Input, InputProps, InputType } from '../Input';
import { MaskedInput as InternalMaskedInput } from '../../internal/MaskedInput';
import { Nullable } from '../../typings/utility-types';

export interface MaskedProps {
  /** Паттерн маски */
  mask: string;
  /** Возвращать только символы маски, без форматирования */
  unmask?: boolean;
  /** Символ маски */
  maskChar?: Nullable<string>;
  /**
   * Словарь символов-регулярок для маски
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

/**
 * Интерфейс пропсов наследуется от `Input`.
 * Из пропсов `Input` исключены некоторые не применимые к полю с маской пропсы и сокращен список возможных значений в type.
 */
export const MaskedInput = forwardRef(function MaskedInput(props: MaskedInputProps, ref: Ref<Input>) {
  const { mask, maskChar, formatChars, alwaysShowMask, placeholder, unmask, ...inputProps } = props;

  return (
    <Input
      ref={ref}
      {...inputProps}
      placeholder={alwaysShowMask ? undefined : placeholder}
      element={
        <InternalMaskedInput
          mask={mask}
          unmask={unmask}
          maskChar={maskChar}
          formatChars={formatChars}
          alwaysShowMask={alwaysShowMask}
        />
      }
    />
  );
});
