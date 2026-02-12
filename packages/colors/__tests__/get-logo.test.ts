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
    const expectedL = LOGO_LIGHTNESS_MIN * 100;
    expect(result.dark).toContain(`oklch(${expectedL}`);
  });
});
