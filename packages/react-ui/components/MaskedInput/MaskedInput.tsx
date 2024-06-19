import React, { Ref, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { InputMask, MaskedPatternOptions, MaskedPattern } from 'imask';
import { IMaskInput, IMaskInputProps } from 'react-imask';

import { Nullable } from '../../typings/utility-types';
import { MaskedInputElement, MaskedInputElementDataTids } from '../../internal/MaskedInputElement';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { uiFontGlobalClasses } from '../../lib/styles/UiFont';
import { Input, InputProps, InputType } from '../Input';

import { globalClasses } from './MaskedInput.styles';
import { getDefinitions, getMaskChar } from './MaskedInput.helpers';

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

    const inputRef = useRef<Input>(null);
    const imaskRef = useRef<IMaskRefType>(null);

    const [focused, setFocused] = useState(false);
    const prevValue = useRef<string>(props.value || String(props.defaultValue) || '');

    const showPlaceholder = !(alwaysShowMask || focused);

    useImperativeHandle(ref, () => inputRef.current, []);

    useEffect(() => {
      /**
       * Для корректной работы `onUnexpectedInput` надо знать предыдущий `value`,
       * но `imask` при монтировании не вызывает `onAccept`, если `value` невалиден или `laze=false`
       * Поэтому актуальный `value` при монтировании надо получать вручную
       */
      if (inputRef.current?.input) {
        prevValue.current = inputRef.current?.input?.value;
      }
    }, []);

    const imaskProps = getCompatibleIMaskProps();

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        placeholder={showPlaceholder ? placeholder : undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        className={cx(globalClasses.root, uiFontGlobalClasses.root)}
        data-tid={MaskedInputElementDataTids.root}
        element={
          <MaskedInputElement maskChars={getMaskChars(imaskProps)}>
            <IMaskInput ref={imaskRef} {...imaskProps} onAccept={handleAccept} />
          </MaskedInputElement>
        }
      />
    );

    function getCompatibleIMaskProps(): IMaskInputProps<HTMLInputElement> {
      return {
        mask: mask.replace(/0/g, '{\\0}') as any,
        placeholderChar: getMaskChar(maskChar),
        definitions: getDefinitions(formatChars),
        eager: 'append',
        overwrite: 'shift',
        lazy: !alwaysShowMask,
        ...customIMaskProps,
      } as IMaskInputProps<HTMLInputElement>;
    }

    function getMaskChars(imaskProps: IMaskInputProps<HTMLInputElement>): string[] {
      const imaskPropsFix = imaskProps as MaskedPattern;
      const maskChars = [imaskPropsFix.placeholderChar];
      if (imaskPropsFix.blocks) {
        (Object.values(imaskPropsFix.blocks) as Array<{ placeholderChar?: string }>).forEach(
          ({ placeholderChar }) => placeholderChar && maskChars.push(placeholderChar),
        );
      }

      return maskChars;
    }

    function handleAccept(...args: Parameters<Required<IMaskInputProps<HTMLInputElement>>['onAccept']>) {
      const [value, , e] = args;

      onAccept?.(...args);

      /**
       * Метод `onAccept` может вызываться при монтировании, если не задан проп `defaultValue`.
       * Но нативный `input` никогда не вызывает `onChange` при монтировании.
       * Наше событие `onValueChange` в `Input` вывается в тех же случаях, что и нативный `onChange`,
       * поэтому чтобы сохранить консинстентность будем ориентироваться на наличие аргумента `e`.
       * Он содержит нативное событие, вызвавшее изменение.
       * Если его нет, значит `imask` вызывал `onAccept` по некой собственной логике.
       */
      e && onValueChange?.(value);
    }

    /**
     * Отслеживаем неожиданные нажатия
     * handleAccept не вызывается когда значение с маской не меняется
     * Сначала вызывается handleAccept, затем handleInput
     *
     * @param e
     */
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

      // если `value` из пропов отличается от `value`, которое получит `input` после обработки,
      // то `imask` будет ставить курсор за последним валидным символом.
      props.selectAllOnFocus && inputRef.current?.delaySelectAll();
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur?.(e);
    }
  },
);
