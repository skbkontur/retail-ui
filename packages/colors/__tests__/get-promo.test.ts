import { describe, test, expect } from 'vitest';
import { getPromo, getPromoHueShift } from '../lib/helpers/get-promo';
import { PROMO_HUE_SHIFTS } from '../lib/consts/params/promo-hue-shift';

describe('getPromo', () => {
  test('should transform color to promo hex', () => {
    const result = getPromo('#0070FF');

    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    expect(result).not.toBe('#0070ff');
  });

  test('should throw on invalid input', () => {
    expect(() => getPromo('invalid')).toThrow('Invalid color string: invalid');
  });
});

describe('getPromoHueShift', () => {
  test('should find correct shift for hue ranges', () => {
    const shifts = { 0: -10, 100: 20, 200: 30 };

    expect(getPromoHueShift(50, shifts)).toBe(-10);
    expect(getPromoHueShift(150, shifts)).toBe(20);
    expect(getPromoHueShift(250, shifts)).toBe(30);
    expect(getPromoHueShift(350, shifts)).toBe(30);
  });

  test('should use default shifts from constants', () => {
    expect(getPromoHueShift(0, PROMO_HUE_SHIFTS)).toBe(-24);
    expect(getPromoHueShift(319, PROMO_HUE_SHIFTS)).toBe(-24);
  });
});
