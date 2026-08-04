import { expect } from 'vitest';

import { computeMaskedDeletion } from '../maskedCoreDeletion.js';
import { createTestMaskEngine } from './testUtils.js';

describe('computeMaskedDeletion', () => {
  const { slotMap } = createTestMaskEngine('99:99');

  it('deletes last typed character on backspace without selection', () => {
    const result = computeMaskedDeletion({
      isBackspace: true,
      selStart: 3,
      selEnd: 3,
      currentRaw: '1234',
      slotMap,
    });

    expect(result).toEqual({ newRaw: '134', cursorPos: 1 });
  });

  it('deletes next typed character on delete without selection', () => {
    const result = computeMaskedDeletion({
      isBackspace: false,
      selStart: 2,
      selEnd: 2,
      currentRaw: '1234',
      slotMap,
    });

    expect(result).toEqual({ newRaw: '124', cursorPos: 3 });
  });

  it('deletes selected raw range', () => {
    const result = computeMaskedDeletion({
      isBackspace: true,
      selStart: 0,
      selEnd: 5,
      currentRaw: '1234',
      slotMap,
    });

    expect(result).toEqual({ newRaw: '', cursorPos: 0 });
  });

  it('returns null when deletion target is not found', () => {
    const result = computeMaskedDeletion({
      isBackspace: true,
      selStart: 0,
      selEnd: 0,
      currentRaw: '',
      slotMap,
    });

    expect(result).toBeNull();
  });
});
