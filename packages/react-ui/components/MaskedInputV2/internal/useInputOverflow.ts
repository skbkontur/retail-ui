import type React from 'react';
import { useLayoutEffect, useState } from 'react';

import { measureInputTextWidth } from './measureInputTextWidth.js';

export function isInputTextOverflowing(input: HTMLInputElement, displayValue: string): boolean {
  if (input.scrollWidth > input.clientWidth) {
    return true;
  }

  const text = input.value || displayValue;
  return measureInputTextWidth(input, text) > input.clientWidth;
}

/** Горизонтальное переполнение текста внутри input. */
export function useInputOverflow(
  inputRef: React.RefObject<HTMLInputElement | null>,
  displayValue: string,
  remeasureKey: unknown,
): boolean {
  const [overflow, setOverflow] = useState(false);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const measure = () => {
      setOverflow((prev) => {
        const next = isInputTextOverflowing(input, displayValue);
        return prev === next ? prev : next;
      });
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(input);

    return () => observer.disconnect();
  }, [displayValue, inputRef, remeasureKey]);

  return overflow;
}
