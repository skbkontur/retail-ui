import { expect } from 'vitest';

import { normalizeRussianPhonePaste } from '../MaskedInputV2.phone.js';

describe('normalizeRussianPhonePaste', () => {
  it.each([
    ['70006789837', '0006789837'],
    ['700067898371', '00067898371'],
    ['+70006789837', '0006789837'],
    ['+70009177226', '0009177226'],
    ['+7(000)6789837', '0006789837'],
    ['+7(000) 678-98-37', '0006789837'],
    ['0006789837', '0006789837'],
    ['80006789837', '0006789837'],
    ['8 912 043-98-27', '9120439827'],
    ['89120439827', '9120439827'],
    ['+7 8 912 043-98-27', '9120439827'],
    ['789120439827', '9120439827'],
  ])('"%s" → "%s"', (input, expected) => {
    expect(normalizeRussianPhonePaste(input)).toBe(expected);
  });

  it('returns original string when there are no digits', () => {
    expect(normalizeRussianPhonePaste('abc')).toBe('abc');
    expect(normalizeRussianPhonePaste('')).toBe('');
  });

  it('keeps short digit sequences without stripping country code', () => {
    expect(normalizeRussianPhonePaste('8123')).toBe('8123');
    expect(normalizeRussianPhonePaste('7')).toBe('7');
  });
});
