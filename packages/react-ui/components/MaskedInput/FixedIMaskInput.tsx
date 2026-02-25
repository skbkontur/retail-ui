import React, { useEffect, useImperativeHandle, useRef } from 'react';
import type { InputMask, MaskedPatternOptions } from '@skbkontur/imask';
import type { IMaskInputProps } from '@skbkontur/react-imask';
import { IMaskInput } from '@skbkontur/react-imask';

import { forwardRefAndName } from '../../lib/forwardRefAndName';
import {
  isKeyArrow,
  isKeyArrowHorizontal,
  isKeyArrowLeft,
  isKeyArrowUp,
  isKeyEnd,
  isKeyHome,
  isModShift,
  isShortcutJumpCaret,
  isShortcutSelectAll,
  someKeys,
} from '../../lib/events/keyboard/identifiers';
import { MouseDrag } from '../../lib/events/MouseDrag';
import { scrollInputCaretIntoView } from '../../lib/scrollInputCaretIntoView';

export type FixedIMaskInputProps = IMaskInputProps<HTMLInputElement>;

type HeadDirection = 'left' | 'right';
type SelectionDirection = 'forward' | 'backward' | 'none';
type SelectionSet = [number, number, SelectionDirection];

interface IMaskRefType {
  maskRef: InputMask<MaskedPatternOptions>;
  element: HTMLInputElement;
}

export const FixedIMaskInput = forwardRefAndName(
  'FixedIMaskInput',
  function FixedIMaskInput(props: FixedIMaskInputProps, ref: React.Ref<IMaskRefType | null>) {
    const { inputRef, ...restProps } = props;
    const imaskRef = useRef<IMaskRefType>(null);
    const focused = useRef(false);

    useEffect(() => {
      if (imaskRef.current?.element) {
        fillTypedValue();
        const mouseDrag = MouseDrag.listen(imaskRef.current.element).onMouseDragEnd((e) => {
          let direction: SelectionDirection = 'none';

          if (
            mouseDrag.mouseDragStartEvent &&
            imaskRef.current?.element.selectionStart !== imaskRef.current?.element.selectionEnd
          ) {
            direction = mouseDrag.mouseDragStartEvent.pageX > e.pageX ? 'backward' : 'forward';
          }

          const [start, end] = getSelection();
          setSelection(start, end, direction);
          scrollCaretIntoView();
        });
      }
    }, []);

    useImperativeHandle(ref, () => imaskRef.current, []);

    return (
      <IMaskInput
        {...restProps}
        ref={imaskRef}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseUp={handleMouseUp}
        onAccept={handleAccept}
        onInput={handleInput}
      />
    );

    function getTypedValue() {
      const { _value = '', displayValue = '' } = imaskRef.current?.maskRef.masked || {};
      const end = getMaxCaretPosition();
      const value = _value !== '' || focused.current === true ? displayValue : '';

      return value.slice(0, end);
    }

    function fillTypedValue() {
      imaskRef.current?.element.setAttribute('data-typed-value', getTypedValue());
      imaskRef.current?.element.setAttribute('data-unmasked-value', imaskRef.current?.maskRef.unmaskedValue);
    }

    function getMaxCaretPosition(): number {
      const maskChars = [];
      if (imaskRef.current) {
        maskChars.push(imaskRef.current.maskRef.masked.placeholderChar);
        if (imaskRef.current.maskRef.masked.blocks) {
          (Object.values(imaskRef.current.maskRef.masked.blocks) as Array<{ placeholderChar?: string }>).forEach(
            ({ placeholderChar }) => placeholderChar && maskChars.push(placeholderChar),
          );
        }
        return imaskRef.current.element.value.split(new RegExp(maskChars.join('|')))[0].length;
      }

      return Infinity;
    }

    function normalizeSelection() {
      const [start, end] = getSelection();
      const max = getMaxCaretPosition();
      if (end > max) {
        setSelection(start, max);
      }
    }

    function getNormalizedRange(calc: number | unknown) {
      return typeof calc === 'number' ? Math.min(getMaxCaretPosition(), Math.max(0, calc)) : 0;
    }

    function getSelection(): SelectionSet {
      if (imaskRef.current) {
        return [
          imaskRef.current.element.selectionStart || 0,
          imaskRef.current.element.selectionEnd || 0,
          imaskRef.current.element.selectionDirection || 'none',
        ];
      }
      return [0, 0, 'none'];
    }

    function setSelection(...[start, end, direction]: Parameters<HTMLInputElement['setSelectionRange']>) {
      imaskRef.current?.element.setSelectionRange(
        getNormalizedRange(start),
        getNormalizedRange(end),
        direction || 'none',
      );
    }

    function scrollCaretIntoView() {
      const element = imaskRef.current?.element;
      if (element) {
        scrollInputCaretIntoView(element);
      }
    }

    function jumpCaret(prev: number, headDirection: HeadDirection) {
      const word = /а-яa-z0-9_/.valueOf();
      const wordRegExp = new RegExp(`([${word}])+[\\s]*|([^${word}])+`, 'gi');
      let next = headDirection === 'right' ? prev : 0;
      imaskRef.current?.element.value.match(wordRegExp)?.reduce<number[]>((s, a) => {
        const pos = a.length + (s.slice(-1)[0] || 0);
        if (headDirection === 'right' && next === prev && next < pos) {
          next = getNormalizedRange(pos);
        } else if (headDirection === 'left' && prev > pos) {
          next = getNormalizedRange(pos);
        }
        return [...s, pos];
      }, []);
      return next;
    }

    /**
     * Вычислят положение каретки при управлении клавишами
     * @param e
     */
    function calcSelection(e: React.KeyboardEvent<HTMLInputElement>): SelectionSet {
      const [start, end, direction] = getSelection();
      const isSelectionMode = isModShift()(e);
      let tail = start !== end && direction === 'backward' ? end : start;
      let head = start !== end && direction === 'backward' ? start : end;
      const headDirection: HeadDirection = someKeys(isKeyArrowLeft, isKeyArrowUp, isKeyHome)(e) ? 'left' : 'right';
      const step = isKeyArrowHorizontal(e) ? 1 : Infinity;
      const increment = headDirection === 'left' ? -step : step;
      if (isShortcutJumpCaret(e)) {
        head = jumpCaret(head, headDirection);
      } else if (head !== tail && !isSelectionMode && isKeyArrowHorizontal(e)) {
        head = headDirection === 'right' ? Math.max(tail, head) : Math.min(tail, head);
      } else {
        head = head + increment;
      }
      if (isSelectionMode) {
        const start = Math.min(tail, head);
        const end = Math.max(tail, head);
        return [getNormalizedRange(start), getNormalizedRange(end), end === head ? 'forward' : 'backward'];
      }
      tail = head;
      return [getNormalizedRange(tail), getNormalizedRange(head), 'none'];
    }

    function handleMouseUp(e: React.MouseEvent<HTMLInputElement>) {
      normalizeSelection();

      props.onMouseUp?.(e);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = true;
      fillTypedValue();

      setTimeout(normalizeSelection);

      props.onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      focused.current = false;
      fillTypedValue();

      props.onBlur?.(e);
    }

    function handleAccept(...args: Parameters<Required<IMaskInputProps<HTMLInputElement>>['onAccept']>) {
      fillTypedValue();

      props.onAccept?.(...args);
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const maskRef = imaskRef.current?.maskRef;
      if (maskRef && maskRef.rawInputValue === '') {
        // в случае, когда пользователь стер все из инпута, очищаем value полностью
        // иначе в value остаются символы маски
        props.onAccept?.('', maskRef, e.nativeEvent as InputEvent);
      }

      props.onInput?.(e);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const nearest = getMaxCaretPosition();
      if (isShortcutSelectAll(e)) {
        e.preventDefault();
        setSelection(0, nearest);
        scrollCaretIntoView();
      } else if (isKeyArrow(e) || isKeyEnd(e) || isKeyHome(e)) {
        e.preventDefault();
        const [start, end, direction] = calcSelection(e);
        setSelection(start, end, direction);
        scrollCaretIntoView();
      }

      props.onKeyDown?.(e);
    }
  },
);
