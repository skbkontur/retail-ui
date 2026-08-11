import { describe, test, expect } from 'vitest';

import { getHover, getPressed } from '../lib/helpers/get-interactions';

describe('getHover', () => {
  test('should return oklch strings for valid hex', () => {
    const result = getHover('#0070FF');

    expect(result.light).toContain('oklch(');
    expect(result.dark).toContain('oklch(');
  });

  test('should return original hex for invalid input', () => {
    const invalid = 'invalid-color';
    const result = getHover(invalid);

    expect(result.light).toBe(invalid);
    expect(result.dark).toBe(invalid);
  });
});

describe('getPressed', () => {
  test('should return oklch strings for valid hex', () => {
    const result = getPressed('#0070FF');

    expect(result.light).toContain('oklch(');
    expect(result.dark).toContain('oklch(');
  });

  test('should apply different deltas than hover', () => {
    const hex = '#0070FF';
    const hover = getHover(hex);
    const pressed = getPressed(hex);

    expect(pressed.light).not.toBe(hover.light);
    expect(pressed.dark).not.toBe(hover.dark);
  });
});
