import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { IMaskInputProps } from 'react-imask';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { InputElement, InputElementProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

export type MaskedInputElementProps = IMaskInputProps<HTMLInputElement> &
  InputElementProps & {
    maskChars: string[];
    children: React.ReactElement;
  };

export type MaskedShadows = [string, string];

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

const dictionary = new WeakMap<Element, () => void>();
const paintText: ResizeObserverCallback = (entries) => {
  entries.forEach((entry) => dictionary.get(entry.target)?.());
};
const resizeObserver = new ResizeObserver(paintText);

export const MaskedInputElement = forwardRefAndName(
  'MaskedInputElement',
  function MaskedInputElement(props: MaskedInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const inputStyle = React.useRef<CSSStyleDeclaration>();
    const theme = useContext(ThemeContext);

    const { children, onInput, onBlur, maskChars, ...inputProps } = props;

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => inputRef.current,
      }),
      [],
    );

    useEffect(() => {
      if (spanRef.current) {
        dictionary.set(spanRef.current, paintText);
        resizeObserver.observe(spanRef.current);
      }
      if (inputRef.current) {
        dictionary.set(inputRef.current, paintText);
        resizeObserver.observe(inputRef.current);
      }
    }, []);

    useEffect(() => {
      if (inputRef.current) {
        inputStyle.current = getComputedStyle(inputRef.current);
      }
    });

    return (
      <>
        {React.cloneElement(children, { ...inputProps, onInput: handleInput, onBlur: handleBlur, inputRef })}
        <span style={{ visibility: 'hidden', position: 'absolute' }} ref={spanRef} />
      </>
    );

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      // iMask может изменить value после вызова onInput
      setTimeout(paintText);

      onInput?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setTimeout(paintText);

      onBlur?.(e);
    }

    function paintText() {
      if (!spanRef.current || !inputRef.current || !inputStyle.current) {
        return;
      }

      if (!spanRef.current.shadowRoot) {
        spanRef.current.attachShadow({ mode: 'open' });
      }

      const style = inputStyle.current;

      const val = inputRef.current.value.split(new RegExp(props.maskChars.join('|')))[0];

      spanRef.current.shadowRoot &&
        (spanRef.current.shadowRoot.innerHTML = `
        <style> p { font: ${style.font}; } </style>
        ${val}
      `);

      const inputRect = inputRef.current.getBoundingClientRect();
      const filledRect = spanRef.current.getBoundingClientRect();

      const threshold = filledRect.width / (inputRect.width / 100);
      const degree = style.fontStyle === 'italic' ? 100 : 90;

      inputRef.current.style.backgroundImage = `
      linear-gradient(
          ${degree}deg,
          ${theme.inputTextColor} ${threshold}%,
          ${theme.placeholderColor} ${threshold}%
      )`;
    }
  },
);
