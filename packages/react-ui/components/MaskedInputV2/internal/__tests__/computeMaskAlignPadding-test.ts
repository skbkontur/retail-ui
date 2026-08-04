import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { computeMaskAlignPadding, measureOverlayTextStart, needsMaskAlignPadding } from '../computeMaskAlignPadding.js';

function createRect(left: number, width = 100): DOMRect {
  return {
    left,
    top: 0,
    width,
    height: 20,
    right: left + width,
    bottom: 20,
    x: left,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
}

function createOverlay(text: string) {
  const overlay = document.createElement('span');
  const textEl = document.createElement('span');
  textEl.dataset.tid = 'masked-input-overlay';
  textEl.textContent = text;
  overlay.appendChild(textEl);
  return overlay;
}

function mockInputTextWidth(textWidth: number, clientWidth = 300) {
  vi.spyOn(HTMLInputElement.prototype, 'clientWidth', 'get').mockReturnValue(clientWidth);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return createRect(0, this.tagName === 'SPAN' ? textWidth : 0);
  });
}

describe('measureOverlayTextStart', () => {
  let createRangeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    createRangeSpy = vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(150),
    } as unknown as Range);
  });

  afterEach(() => {
    createRangeSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it('returns offset between overlay text and input', () => {
    const input = document.createElement('input');
    input.getBoundingClientRect = () => createRect(50, 300);
    const overlay = createOverlay('123456');

    expect(measureOverlayTextStart(input, overlay)).toBe(100);
  });

  it('returns 0 when overlay container is missing', () => {
    const input = document.createElement('input');
    expect(measureOverlayTextStart(input, null)).toBe(0);
  });
});

describe('computeMaskAlignPadding', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prefers overlay layout for center align', () => {
    vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(150),
    } as unknown as Range);

    const input = document.createElement('input');
    input.getBoundingClientRect = () => createRect(50, 300);
    const overlay = createOverlay('123456');

    expect(computeMaskAlignPadding(input, '123456', 'center', overlay)).toBe(100);
  });

  it('prefers overlay layout for right align', () => {
    vi.spyOn(document, 'createRange').mockReturnValue({
      selectNodeContents: vi.fn(),
      getBoundingClientRect: () => createRect(250),
    } as unknown as Range);

    const input = document.createElement('input');
    input.getBoundingClientRect = () => createRect(50, 300);
    const overlay = createOverlay('123456');

    expect(computeMaskAlignPadding(input, '123456', 'right', overlay)).toBe(200);
  });

  it('falls back to text width when overlay is not mounted', () => {
    mockInputTextWidth(100);

    const input = document.createElement('input');
    input.style.font = '16px Arial';

    expect(computeMaskAlignPadding(input, '123456', 'center')).toBe(100);
    expect(computeMaskAlignPadding(input, '123456', 'right')).toBe(200);
  });

  it('returns 0 for left align, undefined and empty displayValue', () => {
    mockInputTextWidth(100);

    const input = document.createElement('input');
    input.style.font = '16px Arial';

    expect(computeMaskAlignPadding(input, '123456', 'left')).toBe(0);
    expect(computeMaskAlignPadding(input, '123456', undefined)).toBe(0);
    expect(computeMaskAlignPadding(input, '', 'center')).toBe(0);
  });
});

describe('needsMaskAlignPadding', () => {
  it('is true only for center and right', () => {
    expect(needsMaskAlignPadding('center')).toBe(true);
    expect(needsMaskAlignPadding('right')).toBe(true);
    expect(needsMaskAlignPadding('left')).toBe(false);
    expect(needsMaskAlignPadding(undefined)).toBe(false);
  });
});
