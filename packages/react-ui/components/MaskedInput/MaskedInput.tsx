import React, { useImperativeHandle, useRef, useState, useEffect, useContext } from 'react';
import type { IMaskInputProps } from '@skbkontur/react-imask';
import type { Ref } from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import type { InputProps, InputType } from '../Input';
import { Input } from '../Input';
import { isKeyBackspace, isKeyDelete } from '../../lib/events/keyboard/identifiers';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { globalClasses, styles } from './MaskedInput.styles';
import { getDefinitions, getMaskChar } from './MaskedInput.helpers';
import { ColorableInputElement } from './ColorableInputElement';
import { FixedIMaskInput } from './FixedIMaskInput';

export type MaskedInputOnBeforePasteValue = (value: string) => string;

export interface MaskedProps {
  /** Паттерн маски */
  mask: string;

  /** Устанавливает символ маски
   * @default _ */
  maskChar?: string;

  /** Задает словарь символов-регулярок для задания маски.
   * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' } */
  formatChars?: Record<string, string>;

  /** Включает показ символов маски.
   * @default false */
  alwaysShowMask?: boolean;

  /** Задает обработчик неправильного ввода.
   * Вторым агрументом будет передан метод вспыхивания акцентным цветом.
   *
   * Если обработчик не задан, то инпут вспыхивает по-умолчанию.
   * @param value значение инпута.
   * @param blink вспыхнуть акцентным цвтетом.
   */
  onUnexpectedInput?: (value: string, blink: () => void) => void;

  /** Задает обработчик вставки значения в инпут.
   * В value будет передано значение из буфера обмена.
   * Возвращаемое значение будет использовано как значение инпута.
   * Используется для фильтрации значения при вставке из буфера обмена.
   * @param value значение вставки.
   */
  onBeforePasteValue?: MaskedInputOnBeforePasteValue;

  /** Убирает из value символы, не введённые пользователем
   * @default false */
  unmask?: boolean;

  /** Раскрашивает символы маски.
   * @default true
   * @ignore */
  colored?: boolean;

  /** Задает пропы для компонента `IMaskInput`. Необходимы для юнит-тестов
   * @ignore */
  imaskProps?: IMaskInputProps<HTMLInputElement>;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export const getSafeMaskInputType = (type?: InputType): MaskInputType | undefined => {
  if (!type) {
    return type;
  }

  switch (type) {
    case 'number':
    case 'date':
    case 'time':
    case 'password':
      return 'text';
    default:
      return type;
  }
};

export interface MaskedInputProps
  extends MaskedProps,
    Omit<
      InputProps,
      'showClearIcon' | 'mask' | 'maxLength' | 'type' | 'alwaysShowMask' | 'onUnexpectedInput' | 'maskChar'
    > {
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
      onBeforePasteValue,
      element,
      className,
      ...inputProps
    } = props;
    const theme = useContext(ThemeContext);

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

    // TODO: Удалить в следующем мажоре
    // Селекторы могут ожидать определённый порядок классов
    const uiFontGlobalClassesRoot = 'react-ui-ui-font-root';

    return (
      <Input
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className={cx(globalClasses.root, uiFontGlobalClassesRoot, className, styles.root(theme))}
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

    function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
      if (onBeforePasteValue && onValueChange) {
        event.preventDefault();
        onValueChange?.(onBeforePasteValue(event.clipboardData?.getData('text') ?? ''));
      }

      props.onPaste?.(event);
    }

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
