import { afterEach, describe, expect, it, vi } from 'vitest';

import { isInputTextOverflowing } from '../useInputOverflow.js';

describe('isInputTextOverflowing', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when input scrollWidth exceeds clientWidth', () => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.style.font = '16px Arial';
    container.appendChild(input);
    document.body.appendChild(container);

    Object.defineProperty(input, 'scrollWidth', { value: 50, configurable: true });
    Object.defineProperty(input, 'clientWidth', { value: 50, configurable: true });

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return {
        width: this.tagName === 'SPAN' ? 200 : 50,
        height: 16,
        top: 0,
        left: 0,
        right: this.tagName === 'SPAN' ? 200 : 50,
        bottom: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    });

    expect(isInputTextOverflowing(input, '12345678901234567890')).toBe(true);

    container.remove();
  });

  it('returns true when displayValue is wider than input clientWidth', () => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.style.font = '16px Arial';
    container.appendChild(input);
    document.body.appendChild(container);

    Object.defineProperty(input, 'scrollWidth', { value: 50, configurable: true });
    Object.defineProperty(input, 'clientWidth', { value: 50, configurable: true });

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return {
        width: this.tagName === 'SPAN' ? 200 : 50,
        height: 16,
        top: 0,
        left: 0,
        right: this.tagName === 'SPAN' ? 200 : 50,
        bottom: 16,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    });

    expect(isInputTextOverflowing(input, '12345678901234567890')).toBe(true);

    container.remove();
  });

  it('returns true when input scrollWidth exceeds clientWidth', () => {
    const input = document.createElement('input');
    Object.defineProperty(input, 'scrollWidth', { value: 120, configurable: true });
    Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

    expect(isInputTextOverflowing(input, '12')).toBe(true);
  });

  it('returns false when text fits input width', () => {
    const input = document.createElement('input');
    Object.defineProperty(input, 'scrollWidth', { value: 50, configurable: true });
    Object.defineProperty(input, 'clientWidth', { value: 50, configurable: true });

    expect(isInputTextOverflowing(input, '12')).toBe(false);
  });
});
