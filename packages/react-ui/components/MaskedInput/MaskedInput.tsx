import React, { Ref, useEffect, useImperativeHandle, useRef, useState, useContext } from 'react';
import { InputMask, MaskedPatternOptions, FactoryConstructorOpts } from 'imask';
import { IMaskInput, IMaskInputProps } from 'react-imask';

import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement, MaskedInputElementDataTids, MaskedShadows } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { isKeyArrow, isKeyArrowRight } from '../../lib/events/keyboard/identifiers';
import { cx } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { uiFontGlobalClasses } from '../../lib/styles/UiFont';
import { Input, InputProps, InputType } from '../Input';

import { globalClasses, styles } from './MaskedInput.styles';
import { getDefinitions, getMaskChar } from './MaskedInput.helpers';

export interface MaskedProps {
  /** Паттерн маски */
  mask?: IMaskInputProps<HTMLInputElement>['mask'];
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
  imaskProps?: IMaskInputProps<HTMLInputElement>;
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
      imaskProps: { onAccept, ...customIMaskProps } = {},
      placeholder,
      onValueChange,
      onUnexpectedInput,
      element,
      ...inputProps
    } = props;
    const theme = useContext(ThemeContext);

    const inputRef = useRef<Input>(null);
    const imaskRef = useRef<IMaskRefType>(null);

    const [focused, setFocused] = useState(false);
    const prevValue = useRef<string>(props.value || '');

    const showPlaceholder = !(alwaysShowMask || focused);

    useImperativeHandle(ref, () => inputRef.current, []);

    const imaskProps = getCompatibleIMaskProps();

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyUp}
        className={cx(globalClasses.root, uiFontGlobalClasses.root, styles.root(theme))}
        data-tid={MaskedInputElementDataTids.root}
        element={
          <MaskedInputElement maskChars={getMaskChars(imaskProps)}>
            <IMaskInput ref={imaskRef} {...imaskProps} lazy={!(alwaysShowMask || focused)} onAccept={handleAccept} />
          </MaskedInputElement>
        }
      />
    );

    function getCompatibleIMaskProps() {
      return {
        mask: typeof mask === 'string' ? mask.replace(/0/g, '{\\0}') : mask,
        placeholderChar: getMaskChar(maskChar),
        definitions: getDefinitions(formatChars),
        eager: 'append',
        overwrite: 'shift',
        lazy: !(alwaysShowMask || focused),
        ...customIMaskProps,
      };
    }

    function getMaskChars(imaskProps) {
      const maskChars = [imaskProps.placeholderChar];
      if (imaskProps.blocks) {
        Object.values(imaskProps.blocks).forEach(
          (block) => block.placeholderChar && maskChars.push(block.placeholderChar),
        );
      }

      return maskChars;
    }

    function getCursorPositions(): { nearest: number; current: number } {
      if (!inputRef.current?.input || !imaskRef.current) {
        return { current: 0, nearest: 0 };
      }
      const { selectionStart, selectionEnd } = inputRef.current.input;

      const nearest = imaskRef.current.maskRef.masked.nearestInputPos(999, 'LEFT');
      const current = Math.min(selectionStart || 0, selectionEnd || 0);

      return { current, nearest };
    }

    function setCursorPosition(pos: number) {
      if (inputRef.current?.input) {
        inputRef.current.input.selectionStart = pos;
        inputRef.current.input.selectionEnd = pos;
      }
    }

    function handleMouseUp() {
      const { current, nearest } = getCursorPositions();
      if (current > nearest) {
        setCursorPosition(nearest);
      }
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
      if (isKeyArrow(e)) {
        const { current, nearest } = getCursorPositions();

        if (isKeyArrowRight(e) && current >= nearest) {
          e.preventDefault();
        }
        if (current > nearest) {
          setCursorPosition(nearest);
        }
      }
    }

    function handleAccept(...args: Parameters<Required<IMaskInputProps<HTMLInputElement>>['onAccept']>) {
      const [value, imask] = args;

      onAccept?.(...args);

      // onAccept вызывается при монтировании, если value не пустой
      // но onValueChange должен вызываться только при изменении value
      const val = inputRef.current?.input ? inputRef.current.input.value : '';
      console.log(imask, { value, val, val2: props.value });

      val !== value && onValueChange?.(value);
      // onValueChange?.(value);
    }

    // Отслеживаем неожиданные нажатия
    // handleAccept не вызывается когда значение с маской не меняется
    // Сначала вызывается handleAccept, затем handleInput
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      if (prevValue.current === e.target.value) {
        if (onUnexpectedInput) {
          onUnexpectedInput(e.target.value);
        } else if (inputRef.current) {
          inputRef.current.blink();
        }
      }

      prevValue.current = e.target.value;

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
