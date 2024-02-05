import React, { Ref, useImperativeHandle, useRef, useState } from 'react';

import { Input, InputProps, InputType } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

export interface MaskedProps {
  /** Паттерн маски */
  mask: string;
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
export const MaskedInput = forwardRefAndName(
  'MaskedInput',
  function MaskedInput(props: MaskedInputProps, ref: Ref<Input | null>) {
    const { mask, maskChar, formatChars, alwaysShowMask, placeholder, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const showPlaceholder = !(alwaysShowMask || focused);
    const innerRef = useRef<Input>(null);

    useImperativeHandle(ref, () => innerRef.current);

    return (
      <Input
        ref={innerRef}
        {...inputProps}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        element={
          <MaskedInputElement
            mask={mask}
            maskChar={maskChar}
            formatChars={formatChars}
            alwaysShowMask={alwaysShowMask}
            onUnexpectedInput={handleUnexpectedInput}
          />
        }
      />
    );

    function handleUnexpectedInput(value: string) {
      if (props.onUnexpectedInput) {
        props.onUnexpectedInput(value);
      } else if (innerRef.current) {
        innerRef.current.blink();
      }
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      props.onFocus && props.onFocus(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur && props.onBlur(e);
    }
  },
);
