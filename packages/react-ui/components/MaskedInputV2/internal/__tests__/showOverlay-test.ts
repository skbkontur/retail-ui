import { describe, expect, it } from 'vitest';

import { getShowOverlay } from '../showOverlay.js';
import type { MaskState } from '../types.js';

function createMaskState(typedValue: string, displayValue = typedValue): MaskState {
  return {
    typedValue,
    displayValue,
    typedLength: typedValue.length,
    outputValue: typedValue,
    isComplete: false,
    acceptedLength: typedValue.length,
  };
}

describe('getShowOverlay', () => {
  it('shows overlay for mask part when not overflowing', () => {
    expect(getShowOverlay(createMaskState('12', '12:__'), false)).toBe(true);
  });

  it('hides overlay when focused with fully typed value without mask part', () => {
    expect(getShowOverlay(createMaskState('123'), true)).toBe(false);
  });

  it('shows overlay when focused with typed value and decorative mask part', () => {
    expect(getShowOverlay(createMaskState('12', '12:__'), true)).toBe(true);
  });

  it('hides overlay when fully typed value overflows input width', () => {
    expect(getShowOverlay(createMaskState('1234567890'), true, true)).toBe(false);
  });

  it('keeps overlay for decorative mask part when overflowing', () => {
    expect(getShowOverlay(createMaskState('', '_'.repeat(25)), false, true)).toBe(true);
    expect(getShowOverlay(createMaskState('12', '12:__'), false, true)).toBe(true);
  });
});
