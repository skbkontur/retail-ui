import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import debounce from 'lodash.debounce';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { InputElement, InputElementProps } from '../../Input';
import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { cx } from '../../../lib/theming/Emotion';

import { styles } from './ColorableInputElement.styles';

export type ColorableInputElementProps = InputElementProps & {
  active?: boolean;
  showOnFocus?: boolean;
  children: React.ReactElement;
};

const dictionary = new Map<Element, () => void>();
const paintText: ResizeObserverCallback = (entries) => {
  entries.forEach((entry) => dictionary.get(entry.target)?.());
};
const resizeObserver = globalObject.ResizeObserver ? new globalObject.ResizeObserver(debounce(paintText)) : null;

// Возможно придётся включить.
// Иногда, на тяжёлых страницах, текст рендерится итеративно.
// Из-за этого могут оставаться артефакты при покраске компонента, которые пропадут только после фокуса.
// setInterval(() => window.requestAnimationFrame(() => dictionary.forEach((paint) => paint())), 10000);

export const ColorableInputElement = forwardRefAndName(
  'ColorableInputElement',
  function ColorableInputElement(props: ColorableInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const focused = useRef(false);
    const inputStyle = React.useRef<CSSStyleDeclaration>();
    const theme = useContext(ThemeContext);

    const { children, onInput, onFocus, onBlur, active = true, showOnFocus = false, ...inputProps } = props;

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => inputRef.current,
      }),
      [],
    );

    useEffect(() => {
      if (inputRef.current) {
        dictionary.set(inputRef.current, paintText);
        resizeObserver?.observe(inputRef.current);
      }

      return () => {
        if (inputRef.current) {
          dictionary.delete(inputRef.current);
          resizeObserver?.unobserve(inputRef.current);
        }
      };
    }, []);

    useEffect(() => {
      // При деактивации быстро выключаем покраску
      !active ? unPaintText() : setTimeout(paintText);
    }, [showOnFocus, active]);

    useEffect(() => {
      if (inputRef.current) {
        inputStyle.current = getComputedStyle(inputRef.current);
      }
    });

    return (
      <>
        {React.cloneElement(children, {
          ...inputProps,
          onInput: handleInput,
          onFocus: handleFocus,
          onBlur: handleBlur,
          inputRef,
          className: cx(props.className, active && styles.input()),
        })}
        <span style={{ visibility: 'hidden', position: 'absolute', whiteSpace: 'pre' }} ref={spanRef} />
      </>
    );

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      // iMask может изменить value после вызова onInput
      setTimeout(paintText);

      onInput?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = true;
      setTimeout(paintText);

      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = false;
      setTimeout(paintText);

      onBlur?.(e);
    }

    function unPaintText() {
      inputRef.current && (inputRef.current.style.backgroundImage = '');
    }

    function paintText() {
      if (!active || !spanRef.current || !inputRef.current || !inputStyle.current || !isBrowser(globalObject)) {
        return;
      }

      let shadow = spanRef.current.shadowRoot;
      let typedValueElement = shadow?.getElementById('span');

      if (!typedValueElement) {
        shadow = spanRef.current.attachShadow({ mode: 'open' });

        typedValueElement = globalObject.document.createElement('span');
        typedValueElement.setAttribute('id', 'span');

        shadow.appendChild(typedValueElement);
      }

      const style = inputStyle.current;

      typedValueElement.textContent = inputRef.current.getAttribute('data-typed-value') || '';

      const inputRect = inputRef.current.getBoundingClientRect();
      const filledRect = spanRef.current.getBoundingClientRect();

      const threshold = filledRect.width / (inputRect.width / 100);
      const degree = style.fontStyle === 'italic' ? 100 : 90;

      let typedValueColor = theme.inputTextColor;
      let maskColor = theme.inputPlaceholderColor;
      if (props.disabled) {
        typedValueColor = theme.inputTextColorDisabled;
        maskColor = theme.inputTextColorDisabled;
      }
      if (showOnFocus) {
        maskColor = focused.current ? maskColor : 'transparent';
      }

      inputRef.current.style.backgroundImage = `
      linear-gradient(
          ${degree}deg,
          ${typedValueColor} ${threshold}%,
          ${maskColor} ${threshold}%
      )`;
    }
  },
);
