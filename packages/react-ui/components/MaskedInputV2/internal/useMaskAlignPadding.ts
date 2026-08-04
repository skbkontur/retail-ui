import type React from 'react';
import { useLayoutEffect, useState } from 'react';

import { computeMaskAlignPadding, needsMaskAlignPadding } from './computeMaskAlignPadding.js';

export function useMaskAlignPadding(
  inputRef: React.RefObject<HTMLInputElement | null>,
  overlayRef: React.RefObject<HTMLElement | null>,
  displayValue: string,
  textAlign: React.CSSProperties['textAlign'] | undefined,
  enabled: boolean,
): number {
  const [paddingLeft, setPaddingLeft] = useState(0);

  useLayoutEffect(() => {
    if (!enabled || !needsMaskAlignPadding(textAlign)) {
      setPaddingLeft(0);
      return;
    }

    const input = inputRef.current;
    if (!input) {
      return;
    }

    const update = () => {
      setPaddingLeft((prev) => {
        const next = computeMaskAlignPadding(input, displayValue, textAlign, overlayRef.current);
        return prev === next ? prev : next;
      });
    };

    update();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(update);
    observer.observe(input);
    if (overlayRef.current) {
      observer.observe(overlayRef.current);
    }

    return () => observer.disconnect();
  }, [displayValue, enabled, inputRef, overlayRef, textAlign]);

  return paddingLeft;
}
