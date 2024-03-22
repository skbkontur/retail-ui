import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { InputMask, MaskedPatternOptions, PatternFixedDefinition } from 'imask';
import { IMaskInput, ReactMaskOpts } from 'react-imask';

import { Input, InputProps, InputType } from '../Input';
import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement, MaskedShadows } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import {
  getCompatibleIMaskProps,
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
  /**
   * Пропы для компонента `IMaskInput`
   *
   * @see https://imask.js.org/guide.html
   */
  imaskProps?: ReactMaskOpts;
  /**
   * При фокусе, если `value` пустое, будет вызывать `onValueChange` с фиксированной частью маски в начале строки
   *
   * По блюру, если `value` не изменится, будет вызывать `onValueChange` с пустой строкой
   *
   * **Проп игнорируется, если `imaskProps.unmask = true`**
   *
   * @default true
   */
  applyFixedPart?: boolean;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export interface IMaskRefType {
  maskRef: InputMask<MaskedPatternOptions>;
  element: HTMLInputElement;
}

export interface MaskedInputProps extends MaskedProps, Omit<InputProps, 'mask' | 'maxLength' | 'type'> {
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
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      imaskProps: customIMaskProps = {},
      applyFixedPart = true,
      placeholder,
      onValueChange,
      onUnexpectedInput,
      element,
      ...inputProps
    } = props;

    const inputRef = useRef<Input>(null);
    const imaskRef = useRef<IMaskRefType>(null);
    const nativeInputRef = useRef<HTMLInputElement | null>(null);

    const [focused, setFocused] = useState(false);
    const [maskedShadows, setMaskedShadows] = useState<MaskedShadows>(['', '']);
    const prevValue = useRef('');

    const showPlaceholder = !(alwaysShowMask || focused);

    useEffect(() => {
      setMaskedShadows(getMaskedShadows(getMaskedPattern(imaskRef, props)));
    }, [imaskRef.current, props.value, alwaysShowMask, focused]);

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        value={getValueWithFixedPart()}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        element={
          <MaskedInputElement maskedShadows={alwaysShowMask || focused ? maskedShadows : null}>
            <IMaskInput
              inputRef={nativeInputRef}
              ref={imaskRef}
              onAccept={handleAccept}
              onInput={handleInput}
              {...getAllIMaskProps()}
            />
          </MaskedInputElement>
        }
      />
    );

    function handleAccept(value: string) {
      onValueChange?.(value);

      // обработка uncontrolled режима
      if (typeof props.value === 'undefined') {
        setMaskedShadows(getMaskedShadows(getMaskedPattern(imaskRef, props)));
      }
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

    function getAllIMaskProps(): ReactMaskOpts {
      return {
        ...getCompatibleIMaskProps(props),
        ...customIMaskProps,
      } as ReactMaskOpts;
    }

    // Если в маске есть фиксированные символы вначале строки, то рендерим их сразу при фокусе
    function getValueWithFixedPart() {
      const maskedPattern = getMaskedPattern(imaskRef, props);
      if (!applyFixedPart || !maskedPattern || customIMaskProps.unmask) {
        return props.value;
      }
      const index = maskedPattern._blocks.findIndex((value1) => !(value1 instanceof PatternFixedDefinition));

      const nativeInputValue = imaskRef.current?.element.value || '';
      const minValue = maskedPattern.value.slice(0, index);

      if (focused && nativeInputValue.length <= minValue.length) {
        return minValue;
      }

      if (!focused && nativeInputValue === minValue) {
        return '';
      }

      return props.value;
    }
  },
);
