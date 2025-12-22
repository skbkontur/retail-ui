import { describe, test, expect } from 'vitest';
import { getPalette } from '../lib/helpers/get-palette';

describe('getPalette', () => {
  const testColor = '#2291FF';

  test('should return a full palette object with correct scales', () => {
    const palette = getPalette({ color: testColor });

    expect(palette).toHaveProperty('vivid');
    expect(palette).toHaveProperty('normal');
    expect(palette).toHaveProperty('dim');

    expect(palette.normal[52]).toMatch(/^oklch\(/);
  });

  test('should generate different colors for "default" and "warning" types', () => {
    const defaultPalette = getPalette({ color: testColor, type: 'default' });
    const warningPalette = getPalette({ color: testColor, type: 'warning' });

    expect(defaultPalette.normal[64]).not.toBe(warningPalette.normal[64]);
  });

  test('should respect custom settings if provided', () => {
    const customSettings = {
      promoHueShifts: { 0: 100 },
    };

    const palette = getPalette({
      color: '#FF0000',
      settings: customSettings as any,
    });

    expect(palette.vivid[52]).toBeDefined();
  });

  test('should handle edge cases with lightness and chroma clamping', () => {
    const palette = getPalette({ color: '#FFFFFF' });

    expect(palette.vivid[20]).toContain('oklch(');
    expect(palette.dim[96]).toContain('oklch(');
  });
});
