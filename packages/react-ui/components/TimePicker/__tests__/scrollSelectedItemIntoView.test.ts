import { describe, expect, it, vi } from 'vitest';

import { scrollSelectedItemIntoView } from '../helpers/scrollSelectedItemIntoView.js';

const createRect = (top: number, bottom: number): DOMRect => {
  return {
    x: 0,
    y: top,
    width: 0,
    height: bottom - top,
    top,
    right: 0,
    bottom,
    left: 0,
    toJSON: () => ({}),
  } as DOMRect;
};

describe('scrollSelectedItemIntoView', () => {
  it('adds offset to current scrollTop for already scrolled container', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');

    parent.style.overflow = 'auto';
    parent.appendChild(child);
    document.body.appendChild(parent);

    Object.defineProperty(parent, 'scrollTop', {
      configurable: true,
      value: 400,
      writable: true,
    });

    parent.scrollTo = vi.fn();
    parent.getBoundingClientRect = vi.fn(() => createRect(100, 200));
    child.getBoundingClientRect = vi.fn(() => createRect(350, 370));

    scrollSelectedItemIntoView(child);

    expect(parent.scrollTo).toHaveBeenCalledWith({ top: 610 });

    parent.remove();
  });
});
