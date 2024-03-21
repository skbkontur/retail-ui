import React, { Ref, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { InputMask } from 'imask';

import { Input, InputProps, InputType } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement, MaskedShadow } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import {
  getDefinitions,
  getMaskChar,
  getMaskedPattern,
  getMaskedShadows,
} from '../../internal/MaskedInputElement/MaskedInputElement.helpers';

export interface MaskedProps {
  /** Паттерн маски */
  mask?: string;
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
    const {
      mask = '',
      maskChar,
      formatChars,
      alwaysShowMask,
      placeholder,
      onValueChange,
      onUnexpectedInput,
      ...inputProps
    } = props;

    const inputRef = useRef<Input>(null);
    const imaskRef = useRef<{ maskRef: InputMask }>(null);

    const [focused, setFocused] = useState(false);
    const [maskedShadows, setMaskedShadows] = useState<MaskedShadow>(['', '']);
    const prevUnmaskedValue = useRef('');

    const showPlaceholder = !(alwaysShowMask || focused);

    useEffect(() => {
      if (alwaysShowMask || focused) {
        setMaskedShadows(getMaskedShadows(getMaskedPattern(imaskRef)));
      }
    }, [focused, props.value]);

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        element={
          <MaskedInputElement
            mask={mask}
            placeholderChar={getMaskChar(maskChar)}
            definitions={getDefinitions(formatChars)}
            onAccept={handleAccept}
            onInput={handleInput}
            maskedShadows={alwaysShowMask || focused ? maskedShadows : null}
            imaskRef={imaskRef}
          />
        }
      />
    );

    function handleAccept(value: string) {
      onValueChange?.(value);
    }

    // Отслеживаем неправильные нажатия
    // handleAccept не вызывается когда значение с маской не меняется
    // Сначала вызывается handleAccept, затем handleInput
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      if (imaskRef.current) {
        const { unmaskedValue } = imaskRef.current.maskRef;

        if (prevUnmaskedValue.current === unmaskedValue) {
          if (onUnexpectedInput) {
            onUnexpectedInput(props.value || '');
          } else if (inputRef.current) {
            inputRef.current.blink();
          }
        }

        prevUnmaskedValue.current = unmaskedValue;
      }
      props.onInput?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      props.onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur?.(e);
    }
  },
);
