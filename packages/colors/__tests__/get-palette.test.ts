import { describe, test, expect } from 'vitest';
import { calcBaseHue, calcCorrectionRange, calcWarningHuePatch, getPalette } from '../lib/helpers/get-palette';
import { ABNEY_CORRECTION } from '../lib/consts/params/abney-correction';
import { WARNING_HUE_PATCH } from '../lib/consts/params/warning-hue-patch';

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

describe('calcBaseHue', () => {
  test('should return base hue 96 for input at upper edge of its corrected interval', () => {
    const result = calcBaseHue('oklch(87% 0.181 100)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(96);
  });

  test('should return base hue 208 when input matches only one corrected range in sparse region', () => {
    const result = calcBaseHue('oklch(94% 0.09 194)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(208);
  });

  test('should return base hue 72 when input matches only one corrected range in sparse region', () => {
    const result = calcBaseHue('oklch(82.1% 0.169 82.4)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(72);
  });

  test('should return base hue 43 when input matches only one corrected range in sparse region', () => {
    const result = calcBaseHue('oklch(71.5% 0.182 44.7)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(43);
  });
});

describe('calcCorrectionRange', () => {
  test('should select correction range 96 at exact upper boundary of its interval', () => {
    const result = calcCorrectionRange('oklch(87% 0.181 100)', ABNEY_CORRECTION);
    expect(result).toBe(96);
  });

  test('should select correction range 208 when input falls into its unique corrected span', () => {
    const result = calcCorrectionRange('oklch(94% 0.09 194)', ABNEY_CORRECTION);
    expect(result).toBe(208);
  });

  test('should return base hue 72 when input falls into its unique corrected span', () => {
    const result = calcCorrectionRange('oklch(82.1% 0.169 82.4)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(72);
  });

  test('should return base hue 40 when input falls into its unique corrected span', () => {
    const result = calcCorrectionRange('oklch(71.5% 0.182 44.7)', ABNEY_CORRECTION);
    expect(Math.round(result)).toBe(40);
  });
});

describe('calcWarningHuePatch', () => {
  test('should apply warning patch', () => {
    const result = calcWarningHuePatch(60, 64, WARNING_HUE_PATCH);
    expect(result).toBe(48);
  });

  test('should keep hue if lightness not in data', () => {
    const result = calcWarningHuePatch(100, 50, WARNING_HUE_PATCH);
    expect(result).toBe(100);
  });
});
