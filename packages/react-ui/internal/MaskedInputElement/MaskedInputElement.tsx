import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';
import { InputElement, InputElementProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './MaskedInputElement.styles';
import { getCurrentValue, getDefinitions, getEmptyValue, getFocusPrefix } from './MaskedInputElement.helpers';

export interface MaskedInputElementProps extends InputElementProps {
  mask: string;
  unmask?: boolean;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
}

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

export const MaskedInputElement = forwardRefAndName(
  'MaskedInputElement',
  function MaskedInputElement(props: MaskedInputElementProps, ref: ForwardedRef<InputElement>) {
    const [values, setValues] = useState<{ value: string; originValue: string }>(() => {
      const value = getValue(props);
      return { value, originValue: value };
    });
    const { value, originValue } = values;

    const [emptyValue, setEmptyValue] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const theme = useContext(ThemeContext);
    const expectedChangesRef = useRef(false);
    const isFirstRender = useRef(true);

    useImperativeHandle(ref, () => ({ input: inputRef.current }), []);

    useEffect(() => {
      setEmptyValue(getEmptyValue(props.mask, props.maskChar, props.formatChars));
    }, [props.mask, props.maskChar]);

    useEffect(() => {
      if (isFirstRender.current) {
        return;
      }

      const value = props.value ? props.value.toString() : '';
      setValues((values) => ({ ...values, value }));
    }, [props.value]);

    useEffect(() => {
      isFirstRender.current = false;
    }, []);

    const {
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      maxLength,
      onValueChange,
      onUnexpectedInput,
      defaultValue,
      style,
      ...inputProps
    } = props;

    const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();
    const [currentValue, left, right] = getCurrentValue({ value, originValue, emptyValue, focused }, maskChar);

    /* В rightHelper не DEFAULT_MASK_CHAR, а специальная логика для обработки подчркивания('_').
     * Не менять на DEFAULT_MASK_CHAR
     */
    const rightHelper = right.split('').map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));
    const leftHelper = style?.textAlign !== 'right' && <span style={{ color: 'transparent' }}>{left}</span>;
    const isMaskVisible = alwaysShowMask || focused;

    return (
      <span data-tid={MaskedInputElementDataTids.root} className={styles.container()} x-ms-format-detection="none">
        <IMaskInput
          {...inputProps}
          mask={mask}
          definitions={getDefinitions(formatChars)}
          eager
          overwrite={'shift'}
          onAccept={handleAccept}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={currentValue}
          inputRef={inputRef}
          style={{ ...style }}
        />
        {isMaskVisible && (
          <span className={cx(styles.inputMask(theme), leftClass)}>
            {leftHelper}
            {rightHelper}
          </span>
        )}
      </span>
    );

    function getValue(props: MaskedInputElementProps): string {
      return (props.value ?? props.defaultValue ?? '').toString();
    }

    /** В imask вызывается только когда значение с маской меняется*/
    function handleAccept(value: string) {
      expectedChangesRef.current = true;
      // Если разделить на 2 setState - между первым и вторым происходит рендер и иногда символы "съедаются"
      setValues({ value, originValue: value });

      setTimeout(() => {
        /** При вводе с клавиатуры срабатывает handleAccept, за ним handleInput
         * expectedChanges - нужен чтобы сообщить из handleAccept в handleInput, что значение с маской изменилось.
         * Если маска не изменилась и сработал handleInput, вызываем handleUnexpectedInput. Ввели значение не по маске.
         * setTimeout нужен чтобы сбросить expectedChanges, например, если изменилось значение в пропах.
         * Маска изменится, вызовется handleAccept, но не handleInput
         */
        expectedChangesRef.current = false;
      });
    }

    /** Отслеживаем неправильные нажатия,
     * handleAccept не вызывается когда значение с маской не меняется, а handleInput вызывается
     * Сначала вызывается handleAccept, затем handleInput
     * */
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;

      if (!expectedChangesRef.current && value === originValue) {
        handleUnexpectedInput();
      } else if (props.onValueChange) {
        props.onValueChange(value);
      }

      expectedChangesRef.current = false;
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);

      expectedChangesRef.current = false;

      if (props.onFocus) {
        props.onFocus(event);
      }
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (value === getFocusPrefix(emptyValue, maskChar)) {
        setValues({ value: '', originValue: '' });
      }

      setFocused(false);

      if (props.onBlur) {
        props.onBlur(event);
      }
    }

    function handleUnexpectedInput() {
      if (props.onUnexpectedInput) {
        props.onUnexpectedInput(value);
      }
    }
  },
);
