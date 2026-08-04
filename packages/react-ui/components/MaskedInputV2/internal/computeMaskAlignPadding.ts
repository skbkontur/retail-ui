import type React from 'react';

import { getOwnerGlobalObject, isBrowser } from '../../../lib/globalObject.js';
import { measureInputTextWidth } from './measureInputTextWidth.js';

/** Горизонтальный offset начала текста overlay относительно левого края input. */
export function measureOverlayTextStart(input: HTMLInputElement, overlayContainer: HTMLElement | null): number {
  if (!overlayContainer) {
    return 0;
  }

  const textEl = overlayContainer.querySelector('[data-tid="masked-input-overlay"]');
  if (!textEl?.textContent) {
    return 0;
  }

  const globalObject = getOwnerGlobalObject(input);
  if (!isBrowser(globalObject) || !('createRange' in globalObject.document)) {
    return 0;
  }

  const range = globalObject.document.createRange();
  range.selectNodeContents(textEl);
  const textRect = range.getBoundingClientRect();
  const inputRect = input.getBoundingClientRect();

  return Math.max(0, textRect.left - inputRect.left);
}

function computeMaskAlignPaddingFromTextWidth(
  input: HTMLInputElement,
  displayValue: string,
  textAlign: 'center' | 'right',
): number {
  const textWidth = measureInputTextWidth(input, displayValue);
  const availableWidth = input.clientWidth;

  if (textAlign === 'center') {
    return Math.max(0, (availableWidth - textWidth) / 2);
  }

  return Math.max(0, availableWidth - textWidth);
}

/** Смещение текста input влево, чтобы каретка совпала с overlay при center/right align. */
export function computeMaskAlignPadding(
  input: HTMLInputElement,
  displayValue: string,
  textAlign?: React.CSSProperties['textAlign'],
  overlayContainer?: HTMLElement | null,
): number {
  if (textAlign !== 'center' && textAlign !== 'right') {
    return 0;
  }

  if (!displayValue) {
    return 0;
  }

  const measuredStart = measureOverlayTextStart(input, overlayContainer ?? null);
  if (measuredStart > 0) {
    return measuredStart;
  }

  return computeMaskAlignPaddingFromTextWidth(input, displayValue, textAlign);
}

export function needsMaskAlignPadding(textAlign?: React.CSSProperties['textAlign']): boolean {
  return textAlign === 'center' || textAlign === 'right';
}
