/* eslint react-hooks/exhaustive-deps: 2 */
import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef, useCallback, useState } from 'react';
import { globalObject, isBrowser } from '@skbkontur/global-object';
import debounce from 'lodash.debounce';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { InputElement, InputElementProps } from '../../Input';
import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { cx } from '../../../lib/theming/Emotion';

import { globalClasses } from './ColorableInputElement.styles';

export type ColorableInputElementProps = InputElementProps & {
  showOnFocus?: boolean;
  children: React.ReactElement;
};

// Возможно придётся включить.
// Иногда, на тяжёлых страницах, текст рендерится итеративно.
// Из-за этого могут оставаться артефакты при покраске компонента, которые пропадут только после фокуса.
// setInterval(() => window.requestAnimationFrame(() => dictionary.forEach((paint) => paint())), 1000);

export const ColorableInputElement = forwardRefAndName(
  'ColorableInputElement',
  function ColorableInputElement(props: ColorableInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const focused = useRef(false);
    const inputStyle = React.useRef<CSSStyleDeclaration>();
    const theme = useContext(ThemeContext);
    const [active, setActive] = useState(true);

    const { children, onInput, onFocus, onBlur, showOnFocus, ...inputProps } = props;

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => inputRef.current,
      }),
      [],
    );

    useEffect(updateActive, []);

    const paintText = useCallback(() => {
      if (!spanRef.current || !inputRef.current || !inputStyle.current || !isBrowser(globalObject)) {
        return;
      }

      inputRef.current?.classList.add(globalClasses.input);

      let shadow = spanRef.current.shadowRoot;
      let typedValueElement = shadow?.getElementById('span');

      if (!typedValueElement) {
        shadow = spanRef.current.attachShadow({ mode: 'open' });

        typedValueElement = globalObject.document.createElement('span');
        typedValueElement.setAttribute('id', 'span');

        shadow.appendChild(typedValueElement);
      }

      const style = inputStyle.current;

      typedValueElement.textContent =
        ((inputRef.current.getAttribute('data-unmasked-value') || focused.current) &&
          inputRef.current.getAttribute('data-typed-value')) ||
        '';

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
      if (props.showOnFocus) {
        maskColor = focused.current ? maskColor : 'transparent';
      }

      inputRef.current.style.backgroundImage = `
      linear-gradient(
          ${degree}deg,
          ${typedValueColor} ${threshold}%,
          ${maskColor} ${threshold}%
      )`;
    }, [
      props.showOnFocus,
      props.disabled,
      theme.inputTextColor,
      theme.inputPlaceholderColor,
      theme.inputTextColorDisabled,
    ]);

    const debouncedPaintText = useCallback(() => debounce(paintText), [paintText])();

    const activation = useCallback(() => {
      if (active) {
        debouncedPaintText();
      } else {
        debouncedPaintText.cancel();
        inputRef.current && (inputRef.current.style.backgroundImage = '');
        inputRef.current?.classList.remove(globalClasses.input);
      }
    }, [debouncedPaintText, active]);

    useEffect(() => {
      activation();
      updateActive();
    }, [props.value, props.defaultValue, theme, activation]);

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
          className: cx(props.className, active && globalClasses.input),
        })}
        {active && <span style={{ visibility: 'hidden', position: 'absolute', whiteSpace: 'pre' }} ref={spanRef} />}
      </>
    );

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const isActive = !inputRef.current?.parentElement?.querySelector(':placeholder-shown');
      setActive(isActive);

      activation();

      onInput?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setTimeout(updateActive);

      focused.current = true;

      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      updateActive();

      focused.current = false;

      onBlur?.(e);
    }

    function updateActive() {
      setTimeout(() => {
        setActive(!inputRef.current?.parentElement?.querySelector(':placeholder-shown'));
      });
    }
  },
);
