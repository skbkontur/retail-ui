import { expect } from 'vitest';

import { buildSlotMap } from '../buildSlotMap.js';
import { extractRaw } from '../extractRaw.js';
import { findNearestRawLeft } from '../findNearestRawLeft.js';
import { stripMaskChars } from '../stripMaskChars.js';
import { createTestImask, createTestMaskEngine } from './testUtils.js';

describe('extractRaw', () => {
  it('returns empty string for empty values', () => {
    const { imask } = createTestMaskEngine('99:99');

    expect(extractRaw(null, { imask })).toBe('');
    expect(extractRaw(undefined, { imask })).toBe('');
    expect(extractRaw('', { imask })).toBe('');
  });

  it('extracts raw digits from masked value', () => {
    const { imask } = createTestMaskEngine('99:99');

    expect(extractRaw('12:34', { imask })).toBe('1234');
    expect(extractRaw('12', { imask })).toBe('12');
  });

  it('extracts digits from phone number that starts with fixed mask digit', () => {
    const { imask } = createTestMaskEngine('+7 999 999-99-99');

    expect(extractRaw('70005131973', { imask })).toBe('0005131973');
    expect(extractRaw('912247', { imask })).toBe('912247');
    expect(extractRaw('+7 000 513-19-73', { imask })).toBe('0005131973');
  });
});

describe('buildSlotMap', () => {
  it('maps user slots and fixed mask characters for 99.99', () => {
    const imask = createTestImask('99.99');
    const slotMap = buildSlotMap(imask);

    expect(slotMap.userSlots).toEqual([0, 1, 3, 4]);
    expect(slotMap.maskedToRaw).toEqual([0, 1, null, 2, 3]);
    expect(slotMap.rawToMasked).toEqual([0, 1, 3, 4]);
  });

  it('maps user slots for 99:99', () => {
    const imask = createTestImask('99:99');
    const slotMap = buildSlotMap(imask);

    expect(slotMap.userSlots).toEqual([0, 1, 3, 4]);
    expect(slotMap.maskedToRaw).toEqual([0, 1, null, 2, 3]);
    expect(slotMap.rawToMasked).toEqual([0, 1, 3, 4]);
  });
});

describe('findNearestRawLeft', () => {
  const slotMap = {
    userSlots: [0, 1, 3, 4],
    maskedToRaw: [0, 1, null, 2, 3],
    rawToMasked: [0, 1, 3, 4],
  };

  it('returns insert position after nearest left raw slot', () => {
    expect(findNearestRawLeft(2, slotMap)).toBe(2);
    expect(findNearestRawLeft(4, slotMap)).toBe(3);
  });

  it('returns 0 when there is no raw slot on the left', () => {
    expect(findNearestRawLeft(0, slotMap)).toBe(0);
  });
});

describe('stripMaskChars', () => {
  const slotMap = {
    userSlots: [0, 1, 3, 4],
    maskedToRaw: [0, 1, null, 2, 3],
    rawToMasked: [0, 1, 3, 4],
  };

  it('removes fixed mask characters from selection', () => {
    expect(stripMaskChars('12:', slotMap, 0)).toBe('12');
    expect(stripMaskChars('2:3', slotMap, 1)).toBe('23');
    expect(stripMaskChars(':', slotMap, 2)).toBe('');
  });
});
