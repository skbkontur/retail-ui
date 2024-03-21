import React, { Ref, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { InputMask, MaskedPatternOptions } from 'imask';
import { IMaskInput } from 'react-imask';

import { Input, InputProps, InputType } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement, MaskedShadows } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import {
  convertMaskedPropsToIMaskProps,
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

export interface MaskedInputProps extends MaskedProps, Omit<InputProps, 'mask' | 'maxLength' | 'type'> {
  type?: MaskInputType;
  /**
   * Пропы для компонента `IMaskInput`
   * @see https://imask.js.org/guide.html
   */
  imaskProps?: MaskedPatternOptions;
}

/**
 * Интерфейс пропсов наследуется от `Input`.
 * Из пропсов `Input` исключены некоторые не применимые к полю с маской пропсы и сокращен список возможных значений в type.
 */
export const MaskedInput = forwardRefAndName(
  'MaskedInput',
  function MaskedInput(props: MaskedInputProps, ref: Ref<Input | null>) {
    const {
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      imaskProps = {},
      placeholder,
      onValueChange,
      onUnexpectedInput,
      element,
      ...inputProps
    } = props;

    const inputRef = useRef<Input>(null);
    const imaskRef = useRef<{ maskRef: InputMask }>(null);
    const nativeInputRef = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useState(props.value || '');
    const [focused, setFocused] = useState(false);
    const [maskedShadows, setMaskedShadows] = useState<MaskedShadows>(['', '']);
    const prevValue = useRef('');

    const showPlaceholder = !(alwaysShowMask || focused);

    useEffect(() => {
      if (alwaysShowMask || focused) {
        setMaskedShadows(getMaskedShadows(getMaskedPattern(imaskRef, value)));
      }
    }, [focused, props.value, value]);

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        element={
          <MaskedInputElement maskedShadows={alwaysShowMask || focused ? maskedShadows : null} imaskRef={imaskRef}>
            <IMaskInput inputRef={nativeInputRef} ref={imaskRef} {...getElementProps()} />
          </MaskedInputElement>
        }
      />
    );

    function handleAccept(value: string) {
      setValue(value);
      onValueChange?.(value);
    }

    // Отслеживаем неожиданные нажатия
    // handleAccept не вызывается когда значение с маской не меняется
    // Сначала вызывается handleAccept, затем handleInput
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      if (imaskRef.current) {
        const { _value } = imaskRef.current.maskRef;

        if (prevValue.current === _value) {
          if (onUnexpectedInput) {
            onUnexpectedInput(props.value || '');
          } else if (inputRef.current) {
            inputRef.current.blink();
          }
        }

        prevValue.current = _value;
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

    function getElementProps(): any {
      return {
        ...convertMaskedPropsToIMaskProps(props),
        onAccept: handleAccept,
        onInput: handleInput,
        ...imaskProps,
      };
    }
  },
);
