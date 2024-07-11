import React, { Ref, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { IMaskInputProps } from 'react-imask';

import { Nullable } from '../../typings/utility-types';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';
import { uiFontGlobalClasses } from '../../lib/styles/UiFont';
import { Input, InputProps, InputType } from '../Input';
import { isKeyBackspace, isKeyDelete, someKeys } from '../../lib/events/keyboard/identifiers';

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
   * @see См. `imaskProps.placeholderChar`
   * @default _
   */
  maskChar?: Nullable<string>;
  /**
   * Словарь символов-регулярок для маски
   *
   * @see См. `imaskProps.definitions`
   * @default { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
   */
  formatChars?: Record<string, string>;
  /**
   * Всегда показывать символы маски
   *
   * @see См. `imaskProps.lazy`
   * @default false
   */
  alwaysShowMask?: boolean;
  /**
   * Пропы для компонента `IMaskInput`
   *
   * @see https://imask.js.org/guide.html
   */
  imaskProps?: IMaskInputProps<HTMLInputElement>;
}

export type MaskInputType = Exclude<InputType, 'number' | 'date' | 'time' | 'password'>;

export interface MaskedInputProps
  extends MaskedProps,
    Omit<InputProps, 'mask' | 'maxLength' | 'type' | 'alwaysShowMask'> {
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
      onValueChange,
      onUnexpectedInput,
      onKeyDownCapture,
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
          selectAll: inputRef.current.delaySelectAll,
        }),
      [],
    );

    useEffect(() => {
      /**
       * Для корректной работы `onUnexpectedInput` надо знать предыдущий `value`,
       * но `imask` при монтировании не вызывает `onAccept`, если `value` невалиден или `laze=false`
       * Поэтому актуальный `value` при монтировании надо получать вручную
       */
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
        onKeyDownCapture={handleKeyDownCapture}
        className={cx(globalClasses.root, uiFontGlobalClasses.root, className)}
        element={
          <ColorableInputElement showOnFocus={!alwaysShowMask} active={!isShowPlaceholder()}>
            <FixedIMaskInput {...imaskProps} onAccept={handleAccept} />
          </ColorableInputElement>
        }
      />
    );

    function getCompatibleIMaskProps(): IMaskInputProps<HTMLInputElement> {
      return {
        mask: mask.replace(/0/g, '{\\0}') as any,
        placeholderChar: getMaskChar(maskChar),
        definitions: getDefinitions(formatChars),
        eager: true,
        overwrite: 'shift',
        lazy: isLazy(),
        ...customIMaskProps,
      } as IMaskInputProps<HTMLInputElement>;
    }

    function isLazy() {
      const showPlaceholder = isShowPlaceholder();
      if (!showPlaceholder && props.disabled) {
        return !(alwaysShowMask || focused);
      }
      return showPlaceholder;
    }

    function isShowPlaceholder() {
      return !alwaysShowMask && props.placeholder && !(props.value || props.defaultValue) && !focused;
    }

    function handleAccept(...args: Parameters<Required<IMaskInputProps<HTMLInputElement>>['onAccept']>) {
      const [value, , e] = args;

      /**
       * Метод `onAccept` может вызываться при монтировании, если не задан проп `defaultValue`.
       * Но нативный `input` никогда не вызывает `onChange` при монтировании.
       * Наше событие `onValueChange` в `Input` вывается в тех же случаях, что и нативный `onChange`,
       * поэтому чтобы сохранить консинстентность будем ориентироваться на наличие аргумента `e`.
       * Он содержит нативное событие, вызвавшее изменение.
       * Если его нет, значит `imask` вызывал `onAccept` по некой собственной логике.
       */
      e && onValueChange?.(value);

      onAccept?.(...args);
    }

    /**
     * Отслеживаем неожиданные нажатия
     * handleAccept не вызывается когда значение с маской не меняется
     * Сначала вызывается handleAccept, затем handleInput
     */
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      if (prevValue.current === e.target.value && prevSelectionStart.current === e.target.selectionStart) {
        handleUnexpectedInput(e.target.value);
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

    function handleUnexpectedInput(value = '') {
      if (onUnexpectedInput) {
        onUnexpectedInput(value);
      } else if (inputRef.current) {
        inputRef.current.blink();
      }
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      props.onBlur?.(e);
    }

    function handleKeyDownCapture(e: React.KeyboardEvent<HTMLInputElement>) {
      const isDeleteKey = someKeys(isKeyBackspace, isKeyDelete)(e);

      prevSelectionStart.current = e.currentTarget.selectionStart;

      if (!e.currentTarget.value && isDeleteKey && !e.repeat) {
        handleUnexpectedInput(e.currentTarget.value);
        prevValue.current = e.currentTarget.value;
      }

      onKeyDownCapture?.(e);
    }
  },
);
