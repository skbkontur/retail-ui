import { describe, it, expect } from 'vitest';

import { scrollInputCaretIntoView } from '../scrollInputCaretIntoView';

function createInput(
  overrides: {
    value?: string;
    scrollWidth?: number;
    clientWidth?: number;
    scrollLeft?: number;
    selectionStart?: number;
    selectionEnd?: number;
    selectionDirection?: 'forward' | 'backward' | 'none';
  } = {},
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = overrides.value ?? '12345678901234567890'; // 20 chars
  input.selectionStart = overrides.selectionStart ?? 0;
  input.selectionEnd = overrides.selectionEnd ?? 0;
  input.selectionDirection = overrides.selectionDirection ?? 'none';

  if (overrides.scrollWidth !== undefined) {
    Object.defineProperty(input, 'scrollWidth', { value: overrides.scrollWidth, configurable: true });
  }
  if (overrides.clientWidth !== undefined) {
    Object.defineProperty(input, 'clientWidth', { value: overrides.clientWidth, configurable: true });
  }
  if (overrides.scrollLeft !== undefined) {
    let scrollLeft = overrides.scrollLeft;
    Object.defineProperty(input, 'scrollLeft', {
      get: () => scrollLeft,
      set: (v: number) => {
        scrollLeft = Math.max(0, Math.min(v, (input.scrollWidth || 500) - (input.clientWidth || 100)));
      },
      configurable: true,
    });
  }

  return input;
}

describe('scrollInputCaretIntoView', () => {
  it('does nothing when there is no overflow (scrollWidth <= clientWidth)', () => {
    const input = createInput({ scrollWidth: 100, clientWidth: 100, scrollLeft: 0 });
    scrollInputCaretIntoView(input);
    expect(input.scrollLeft).toBe(0);
  });

  it('does nothing when value is empty', () => {
    const input = createInput({
      value: '',
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 0,
    });
    scrollInputCaretIntoView(input);
    expect(input.scrollLeft).toBe(0);
  });

  it('does not change scrollLeft when caret is within visible area', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 0,
      selectionStart: 2,
      selectionEnd: 2,
    });
    scrollInputCaretIntoView(input);
    expect(input.scrollLeft).toBe(0);
  });

  it('scrolls left when caret is left of visible area (reads selection from input)', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 400,
      selectionStart: 15,
      selectionEnd: 15,
    });
    scrollInputCaretIntoView(input);
    // position 15, frameStart=16, frameEnd=20. position 15 < frameStart+PAD (17) => scroll left
    // new scrollLeft = (15 - 3) * 25 = 300
    expect(input.scrollLeft).toBe(300);
  });

  it('scrolls right when caret is right of visible area (reads selection from input)', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 0,
      selectionStart: 5,
      selectionEnd: 5,
    });
    scrollInputCaretIntoView(input);
    // position 5, frameStart=0, frameEnd=4. position 5 > frameEnd-PAD (3) => scroll right
    // new scrollLeft = (5 - 4 + 3) * 25 = 100
    expect(input.scrollLeft).toBe(100);
  });

  it('uses passed selection instead of input when provided', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 400,
      selectionStart: 0,
      selectionEnd: 0,
    });
    scrollInputCaretIntoView(input, { start: 16, end: 16, direction: 'none' });
    // position 16, scroll left: (16 - SHIFT) * charWidth = 13 * 25 = 325
    expect(input.scrollLeft).toBe(325);
  });

  it('uses selection end as position when direction is forward (selection passed)', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 0,
    });
    scrollInputCaretIntoView(input, { start: 2, end: 5, direction: 'forward' });
    // position = end = 5 => scroll right to show caret at 5
    expect(input.scrollLeft).toBe(100);
  });

  it('uses selection start as position when direction is backward (selection passed)', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 100,
      selectionStart: 2,
      selectionEnd: 5,
    });
    scrollInputCaretIntoView(input, { start: 2, end: 5, direction: 'backward' });
    // position = start = 2. frameStart=4, frameEnd=8. position 2 < frameStart+PAD (5) => scroll left
    expect(input.scrollLeft).toBe(0);
  });

  it('clamps scrollLeft to 0 when position would scroll past left edge', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 100,
      selectionStart: 0,
      selectionEnd: 0,
    });
    scrollInputCaretIntoView(input);
    // (0 - 3) * 25 = -75 => clamped to 0
    expect(input.scrollLeft).toBe(0);
  });

  it('clamps scrollLeft to maxScroll when position would scroll past right edge', () => {
    const input = createInput({
      scrollWidth: 500,
      clientWidth: 100,
      scrollLeft: 0,
      selectionStart: 19,
      selectionEnd: 19,
    });
    scrollInputCaretIntoView(input);
    // maxScroll = 400. (19 - 4 + 3) * 25 = 450 => clamped to 400
    expect(input.scrollLeft).toBe(400);
  });
});
