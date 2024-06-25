import React, { ForwardedRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IMaskInputProps } from 'react-imask';
import { globalObject, isBrowser } from '@skbkontur/global-object';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { InputElement, InputElementProps } from '../../components/Input';
import { forwardRefAndName } from '../../lib/forwardRefAndName';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MaskedInputElement.styles';

import './exposed-input';
import { uiFontGlobalClasses } from '../../lib/styles/UiFont';

// customElements.define('exposed-input', ExposedInput);

export type MaskedInputElementProps = IMaskInputProps<HTMLInputElement> &
  InputElementProps & {
    maskChars: string[];
    fixedChars: string[];
    children: React.ReactElement;
  };

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

export const MaskedInputElement = forwardRefAndName(
  'MaskedInputElement',
  function MaskedInputElement(props: MaskedInputElementProps, ref: ForwardedRef<InputElement>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const exposedInputRef = useRef<HTMLElement | null>(null);
    const focused = useRef(false);
    const [uncontrolledValue, setUncontrolledValue] = useState('');
    const inputStyle = React.useRef<CSSStyleDeclaration>();
    const theme = useContext(ThemeContext);

    const { children, onInput, onFocus, onBlur, maskChars, onChange, onKeyPress, onKeyDown, ...inputProps } = props;

    useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getRootNode: () => inputRef.current,
      }),
      [],
    );

    useEffect(() => {
      setTimeout(paintText_2);

      if (inputRef.current) {
        inputStyle.current = getComputedStyle(inputRef.current);
      }
    }, []);

    const placeholderColor = !(props.value || props.defaultValue);

    return (
      <exposed-input ref={exposedInputRef}>
        {React.cloneElement(children, {
          slot: 'input',
          ...inputProps,
          onInput: handleInput,
          onFocus: handleFocus,
          onBlur: handleBlur,
          inputRef,
          className: cx(props.className),
        })}
      </exposed-input>
    );

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      setUncontrolledValue(e.target.value);

      // iMask может изменить value после вызова onInput
      // setTimeout(paintText);
      // paintText();
      paintText_2();

      onInput?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = true;
      // setTimeout(paintText);

      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = false;
      // setTimeout(paintText);

      onBlur?.(e);
    }

    function paintText_2() {
      // console.log('paintText_2', exposedInputRef.current);

      // console.log('123', !inputRef.current, !inputStyle.current, !isBrowser(globalObject), props.disabled);
      if (
        !inputRef.current ||
        !inputStyle.current ||
        !isBrowser(globalObject) ||
        props.disabled ||
        !exposedInputRef.current ||
        !exposedInputRef.current.value
      ) {
        return;
      }

      const val0 = exposedInputRef.current.input.value;
      const chars = exposedInputRef.current.value.querySelectorAll('*');
      console.log({ maskChars, fixedChars: props.fixedChars });

      let wer = val0.split('').map((char) => {
        if (maskChars.includes(char)) {
          return {
            char,
            type: 'mask',
          };
        }
        if (props.fixedChars.includes(char)) {
          return {
            char,
            type: 'fixed',
          };
        }
        return {
          char,
          type: 'user',
        };
      });

      for (let i = 0; i < wer.length; i++) {
        const { type } = wer[i];
        if (type === 'user') {
          wer[i].color = 'black';
          chars[i].style.color = 'black';
          continue;
        }
        if (type === 'mask') {
          wer[i].color = 'lightgray';
          chars[i].style.color = 'lightgray';
          continue;
        }
        if (type === 'fixed') {
          const er = wer[i - 1] || {};
          const der = wer[i + 1] || {};
          if (er.color === 'black' || er.type === 'user' || der.color === 'black' || der.type === 'user' || i === 0) {
            wer[i].color = 'black';
            chars[i].style.color = 'black';
          } else {
            wer[i].color = 'lightgray';
            chars[i].style.color = 'lightgray';
          }
          continue;
        }

        wer[i].color = 'lightgray';
        chars[i].style.color = 'lightgray';
      }

      // wer = wer.reverse();

      // console.log('wer.length', wer);
      for (let i = wer.length - 1; i >= 0; i--) {
        // console.log(`wer[${i}]`, wer[i]);
        const { type, color } = wer[i];
        if (color === 'black') {
          continue;
        }
        if (type === 'user') {
          wer[i].color = 'black';
          chars[i].style.color = 'black';
          continue;
        }
        if (type === 'mask') {
          wer[i].color = 'lightgray';
          chars[i].style.color = 'lightgray';
          continue;
        }
        if (type === 'fixed') {
          const er = wer[i - 1] || {};
          const der = wer[i + 1] || {};
          if (er.color === 'black' || er.type === 'user' || der.color === 'black' || der.type === 'user' || i === 0) {
            wer[i].color = 'black';
            chars[i].style.color = 'black';
          } else {
            wer[i].color = 'lightgray';
            chars[i].style.color = 'lightgray';
          }
          continue;
        }

        wer[i].color = 'lightgray';
        chars[i].style.color = 'lightgray';
      }

      // console.log('222', wer, e.detail.chars);
    }
  },
);
