import { expect } from 'vitest';

import { computeMaskedCut, getMaskedCopyText, getSelectionRawRange } from '../maskedCoreClipboard.js';
import { createTestMaskEngine } from './testUtils.js';

describe('maskedCoreClipboard', () => {
  const { slotMap } = createTestMaskEngine('99:99');

  it('copies selected display substring', () => {
    expect(getMaskedCopyText('12:34', 0, 5)).toBe('12:34');
    expect(getMaskedCopyText('12:34', 0, 3)).toBe('12:');
  });

  it('getSelectionRawRange covers digits when selection ends on fixed char', () => {
    const { slotMap: phoneSlots } = createTestMaskEngine('+7 999 999-99-99');
    const typed = '+7 213 132-';
    expect(getSelectionRawRange(0, typed.length, phoneSlots)).toEqual({ rawStart: 0, rawEnd: 6 });
  });

  it('cuts selected raw characters and keeps cursor at raw start', () => {
    expect(computeMaskedCut(0, 2, '1234', slotMap)).toEqual({
      newRaw: '34',
      cursorPos: 0,
    });
  });

  it('cuts partial selection inside value', () => {
    expect(computeMaskedCut(3, 5, '1234', slotMap)).toEqual({
      newRaw: '12',
      cursorPos: 3,
    });
  });

  it('cuts all raw when selection ends on trailing fixed mask char', () => {
    // "+7 213 132-" — typedLength включает eager `-`, maskedToRaw[end-1] === null
    const { slotMap: phoneSlots } = createTestMaskEngine('+7 999 999-99-99');
    const typed = '+7 213 132-';
    expect(computeMaskedCut(0, typed.length, '213132', phoneSlots)).toEqual({
      newRaw: '',
      cursorPos: 3, // позиция первого user-слота после "+7 "
    });
  });

  it('cuts selection that starts on fixed and ends on fixed but contains digits', () => {
    const { slotMap: dashSlots } = createTestMaskEngine('9-9-9-9');
    // "1-2-" — выделение всего typed с trailing `-`
    expect(computeMaskedCut(0, 4, '12', dashSlots)).toEqual({
      newRaw: '',
      cursorPos: 0,
    });
  });

  it('keeps raw when selection covers only fixed symbols', () => {
    expect(computeMaskedCut(2, 3, '1234', slotMap)).toEqual({
      newRaw: '1234',
      cursorPos: 2,
    });
  });
});
