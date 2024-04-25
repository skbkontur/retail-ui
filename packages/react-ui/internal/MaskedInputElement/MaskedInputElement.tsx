import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { IMaskInputProps } from 'react-imask';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { InputElement, InputElementProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { styles } from './MaskedInputElement.styles';

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
    const rootNodeRef = React.useRef<HTMLDivElement>(null);
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
        <span style={{ visibility: 'hidden', position: 'absolute', background: '#ff000020' }} ref={spanRef} />
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

      // console.log('shadowRoot', spanRef.current, spanRef.current.shadowRoot);
      if (!spanRef.current.shadowRoot) {
        spanRef.current.attachShadow({ mode: 'open' });
      }

      const cur = Math.min(inputRef.current.selectionStart || 0, inputRef.current.selectionEnd || 0);
      const style = inputStyle.current;

      // const val = cur < _val.length ? _val.slice(0, cur) : _val;
      const val = inputRef.current.value.split(new RegExp(props.maskChars.join('|')))[0];

      spanRef.current.shadowRoot &&
        (spanRef.current.shadowRoot.innerHTML = `
        <style> p { font: ${style.font}; } </style>
        ${val}
      `);

      // spanRef.current.innerHTML = val;
      // spanRef.current.style.font = style.font;

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

      // console.log('updateColor', { val, cur, input: inputRef.current, font: style.font });
    }
  },
);
