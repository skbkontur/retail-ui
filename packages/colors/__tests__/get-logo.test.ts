import { describe, test, expect } from 'vitest';
import { getLogo } from '../lib/helpers/get-logo';
import { LOGO_LIGHTNESS_MIN } from '../lib/consts/params/logo-lightness';

describe('getLogo', () => {
  test('should return hex for light and oklch for dark theme', () => {
    const hex = '#0070FF';
    const result = getLogo(hex);
    expect(result.light).toBe(hex);
    expect(result.dark).toContain('oklch(');
  });

  test('should clamp lightness to LOGO_LIGHTNESS_MIN', () => {
    const result = getLogo('#000000');
    const expectedL = (LOGO_LIGHTNESS_MIN / 100).toFixed(3);
    expect(result.dark).toContain(`oklch(${expectedL}`);
  });

  test('should return fallback for invalid input', () => {
    const result = getLogo('invalid');
    expect(result.light).toBe('invalid');
    expect(result.dark).toBe(`oklch(${LOGO_LIGHTNESS_MIN}% 0 0)`);
  });
});
