/* eslint react-hooks/exhaustive-deps: 2 */
import type { ForwardedRef } from 'react';
import React, { useEffect, useContext, useImperativeHandle, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import type { InputElement, InputElementProps } from '../../Input';
import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { cx } from '../../../lib/theming/Emotion';
import { isDocument, isWindow, tryGetDocument, tryGetWindow } from '../../../lib/utils';

import { globalClasses } from './ColorableInputElement.styles';

export type ColorableInputElementProps = InputElementProps & {
  alwaysShowMask?: boolean;
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
    const updateActiveTimer = useRef<ReturnType<typeof setTimeout>>();
    const theme = useContext(ThemeContext);
    const [active, setActive] = useState(
      Boolean(props.alwaysShowMask || (!props.placeholder && (props.value || props.defaultValue))),
    );

    const { children, onInput, onFocus, onBlur, showOnFocus, alwaysShowMask, ...inputProps } = props;

    const stopUpdateActive = useCallback(() => {
      clearTimeout(updateActiveTimer.current);
    }, []);

    const updateActive = useCallback(() => {
      stopUpdateActive();
      updateActiveTimer.current = setTimeout(() => {
        let nextActive = true;
        if (inputRef.current) {
          const { clientWidth, scrollWidth } = inputRef.current;
          const scrollable = scrollWidth > clientWidth;

          const placeholderShown = inputRef.current?.parentElement?.querySelector(':placeholder-shown');

          nextActive = !(scrollable || placeholderShown);
        }
        setActive(nextActive);
      }, 0);
    }, [stopUpdateActive]);

    const paintText = useCallback(() => {
      const win = tryGetWindow(inputRef.current);
      const doc = tryGetDocument(inputRef.current);
      if (!spanRef.current || !inputRef.current || !isWindow(win) || !isDocument(doc) || !active) {
        inputRef.current && (inputRef.current.style.backgroundImage = '');
        inputRef.current?.classList.remove(globalClasses.input);

        return;
      }

      inputRef.current?.classList.add(globalClasses.input);

      let shadow = spanRef.current.shadowRoot;
      let typedValueElement = shadow?.getElementById('typed-value');
      let fullValueElement = shadow?.getElementById('full-value');

      if (!typedValueElement || !fullValueElement) {
        shadow = spanRef.current.attachShadow({ mode: 'open' });

        typedValueElement = doc.createElement('span');
        fullValueElement = doc.createElement('span');
        typedValueElement.setAttribute('id', 'typed-value');
        fullValueElement.setAttribute('id', 'full-value');

        shadow.append(typedValueElement, fullValueElement);
      }

      const style = getComputedStyle(inputRef.current);

      typedValueElement.textContent =
        ((inputRef.current.getAttribute('data-unmasked-value') || focused.current) &&
          inputRef.current.getAttribute('data-typed-value')) ||
        '';

      fullValueElement.textContent = inputRef.current.value || inputRef.current.defaultValue || '';

      const inputRect = inputRef.current.getBoundingClientRect();
      const typedValueRect = typedValueElement.getBoundingClientRect();
      const fullValueRect = fullValueElement.getBoundingClientRect();

      const threshold = typedValueRect.width / (inputRect.width / 100);
      const degree = style.fontStyle === 'italic' ? 100 : 90;
      const restValueWidth = 1 - Math.min(fullValueRect.width / inputRect.width, 1);

      let typedValueColor = theme.inputTextColor;
      let maskColor = theme.inputPlaceholderColor;
      let indent = 0;

      if (props.disabled) {
        typedValueColor = theme.inputTextColorDisabled;
        maskColor = theme.inputTextColorDisabled;
      }
      if (props.showOnFocus) {
        maskColor = focused.current ? maskColor : 'transparent';
      }
      if (props.style?.textAlign === 'right') {
        indent = 100 * restValueWidth;
      }
      if (props.style?.textAlign === 'center') {
        indent = 50 * restValueWidth;
      }

      inputRef.current.style.backgroundImage = `
      linear-gradient(
          ${degree}deg,
          ${typedValueColor} ${threshold + indent}%,
          ${maskColor} ${threshold + indent}%
      )`;
    }, [
      active,
      props.showOnFocus,
      props.disabled,
      theme.inputTextColor,
      theme.inputPlaceholderColor,
      theme.inputTextColorDisabled,
      props.style?.textAlign,
    ]);

    const debouncedPaintText = useCallback(() => debounce(paintText), [paintText])();

    const handleInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedPaintText();

        onInput?.(e);
      },
      [debouncedPaintText, onInput],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        updateActive();

        focused.current = true;

        onFocus?.(e);
      },
      [onFocus, updateActive],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        updateActive();

        focused.current = false;

        onBlur?.(e);
      },
      [onBlur, updateActive],
    );

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => inputRef.current,
      }),
      [],
    );

    useEffect(() => {
      debouncedPaintText();
      updateActive();

      return stopUpdateActive;
    }, [updateActive, props.value, props.defaultValue, theme, debouncedPaintText, stopUpdateActive]);

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
  },
);
