import React, { Ref, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { IMaskInputProps } from 'react-imask';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { uiFontGlobalClasses } from '../../lib/styles/UiFont';
import { Input, InputProps, InputType } from '../Input';
import { isKeyBackspace, isKeyDelete } from '../../lib/events/keyboard/identifiers';

import { globalClasses } from './MaskedInput.styles';
import { getDefinitions, getMaskChar } from './MaskedInput.helpers';
import { ColorableInputElement } from './ColorableInputElement';
import { FixedIMaskInput } from './FixedIMaskInput';

export interface MaskedProps {
  /** Паттерн маски */
  mask: string;
  /**
   * Символ маски
   *
   * @default _
   */
  maskChar?: string;
  /**
   * Словарь символов-регулярок для маски
   *
   * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
   */
  formatChars?: Record<string, string>;
  /**
   * Всегда показывать символы маски
   *
   * @default false
   */
  alwaysShowMask?: boolean;
  /**
   * Обработчик неправильного ввода.
   * Вторым агрументом будет передан метод вспыхивания акцентным цветом.
   *
   * Если обработчик не задан, то инпут вспыхивает по-умолчанию.
   *
   * @param value значение инпута.
   * @param blink вспыхнуть акцентным цвтетом.
   */
  onUnexpectedInput?: (value: string, blink: () => void) => void;
  /**
   * Убирать из value символы, не введённые пользователем
   *
   * @default false
   */
  unmask?: boolean;
  /**
   * Раскрашивать символы маски
   *
   * @default true
   * @ignore
   */
  colored?: boolean;
  /**
   * Пропы для компонента `IMaskInput`. Необходимы для юнит-тестов
   *
   * @ignore
   */
  imaskProps?: IMaskInputProps<HTMLInputElement>;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export interface MaskedInputProps
  extends MaskedProps,
    Omit<InputProps, 'mask' | 'maxLength' | 'type' | 'alwaysShowMask' | 'onUnexpectedInput' | 'maskChar'> {
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
      alwaysShowMask = false,
      colored = true,
      imaskProps: customIMaskProps = {},
      unmask = false,
      onValueChange,
      onUnexpectedInput,
      onChange,
      element,
      className,
      ...inputProps
    } = props;

    const inputRef = useRef<Input>(null);

    const [focused, setFocused] = useState(false);
    const prevValue = useRef<string>(props.value || String(props.defaultValue) || '');
    const prevSelectionStart = useRef<number | null>(null);

    useImperativeHandle(
      ref,
      () =>
        inputRef.current &&
        Object.assign(inputRef.current, {
          selectAll: () => {
            inputRef.current?.focus();
            inputRef.current?.delaySelectAll();
          },
        }),
      [],
    );

    useEffect(() => {
      // Для корректной работы onUnexpectedInput надо знать предыдущий value,
      // но imask при монтировании не вызывает onAccept, если value невалиден или laze=false.
      // Поэтому актуальный value при монтировании надо получать вручную
      if (inputRef.current?.input) {
        prevValue.current = inputRef.current.input.value;
        prevSelectionStart.current = inputRef.current.input.selectionStart;
      }
    }, []);

    const imaskProps = getCompatibleIMaskProps();

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={cx(globalClasses.root, uiFontGlobalClasses.root, className)}
        element={
          colored ? (
            <ColorableInputElement showOnFocus={false}>
              <FixedIMaskInput {...imaskProps} onAccept={handleAccept} />
            </ColorableInputElement>
          ) : (
            <FixedIMaskInput {...imaskProps} onAccept={handleAccept} />
          )
        }
      />
    );

    function getCompatibleIMaskProps(): IMaskInputProps<HTMLInputElement> {
      return {
        mask: mask.replace(/0/g, '{\\0}') as any,
        placeholderChar: getMaskChar(maskChar),
        definitions: getDefinitions(formatChars),
        // FIXME: Должно быть eager=true, но в imask ломается удаление по delete
        eager: 'append',
        overwrite: 'shift',
        lazy: !alwaysShowMask && (props.disabled || !focused),
        unmask,
        ...customIMaskProps,
      } as IMaskInputProps<HTMLInputElement>;
    }

    function handleAccept(...args: Parameters<Required<IMaskInputProps<HTMLInputElement>>['onAccept']>) {
      const [value, , e] = args;

      // Метод onAccept может вызываться при монтировании, если не задан проп defaultValue.
      // Но нативный input никогда не вызывает onChange при монтировании.
      // Наше событие onValueChange в Input вывается в тех же случаях, что и нативный onChange,
      // поэтому чтобы сохранить консинстентность будем ориентироваться на наличие аргумента e.
      // Он содержит нативное событие, вызвавшее изменение.
      e && onValueChange?.(value);
      !e && (prevValue.current = value);
    }

    /**
     * Отслеживаем неожиданные нажатия
     * handleAccept не вызывается когда значение с маской не меняется
     * Сначала вызывается handleAccept, затем handleInput
     */
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const { value, selectionStart } = e.currentTarget;

      // При вводе неожиданных символов или удалении каретка может перепрыгивать фиксированные символы.
      // Такие случаи не расцениваем как неожиданный ввод, т.к. пользователь может намеренно их вводить.
      if (prevValue.current === value && selectionStart === prevSelectionStart.current) {
        handleUnexpectedInput(value);
      }
      prevValue.current = value;
      prevSelectionStart.current = selectionStart;

      props.onInput?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      props.onFocus?.(e);

      // Если value из пропов отличается от value, которое получит input после обработки,
      // то imask будет ставить каретку за последним валидным символом.
      props.selectAllOnFocus && inputRef.current?.delaySelectAll();
    }

    function handleUnexpectedInput(value: string) {
      const blink = inputRef.current?.blink.bind(inputRef.current) || (() => undefined);
      onUnexpectedInput ? onUnexpectedInput(value, blink) : blink();
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur?.(e);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const { value, selectionStart, selectionEnd } = e.currentTarget;

      if (
        (isKeyBackspace(e) && selectionStart === 0 && selectionEnd === 0) ||
        (isKeyDelete(e) && prevSelectionStart.current === value.length)
      ) {
        // Случаи, когда нажатие клавиш не тригерит `onInput`
        handleUnexpectedInput(value);
        prevValue.current = e.currentTarget.value;
      }
      prevSelectionStart.current = selectionStart;

      props.onKeyDown?.(e);
    }
  },
);
