import { describe, expect, test } from 'vitest';

import { calcContrast, getContrast, getLuminance } from '../lib/utils/contrast.js';

describe('calcContrast', () => {
  test('accepts text and background CSS colors in that order', () => {
    expect(calcContrast('#000', '#fff')).toBeCloseTo(106.04, 2);
    expect(calcContrast('#fff', '#000')).toBeCloseTo(-107.88, 2);
    expect(calcContrast('#808080', '#808080')).toBe(0);
  });

  test.each([
    ['oklch(80% 0.1 200)', '#64d1d7'],
    ['lch(80% 30 200)', '#7ad6d8'],
    ['color(display-p3 0 1 0)', '#00ff00'],
    ['color(display-p3 1 0 0)', '#ff0000'],
  ])('converts and clips %s in both color positions', (color, hex) => {
    expect(calcContrast('#000', color)).toBe(calcContrast('#000', hex));
    expect(calcContrast(color, '#fff')).toBe(calcContrast(hex, '#fff'));
  });

  test('retains the black fallback for unrecognized colors', () => {
    expect(calcContrast('#fff', 'not-a-color')).toBe(calcContrast('#fff', '#000'));
    expect(calcContrast('not-a-color', '#fff')).toBe(calcContrast('#000', '#fff'));
  });
});

describe('getLuminance', () => {
  test.each<{ name: string; rgb: [number, number, number]; luminance: number }>([
    { name: 'black', rgb: [0, 0, 0], luminance: 0 },
    { name: 'white', rgb: [255, 255, 255], luminance: 1 },
    { name: 'red', rgb: [255, 0, 0], luminance: 0.2126729 },
    { name: 'green', rgb: [0, 255, 0], luminance: 0.7151522 },
    { name: 'blue', rgb: [0, 0, 255], luminance: 0.072175 },
    { name: 'middle gray', rgb: [128, 128, 128], luminance: 0.19125268 },
  ])('$name ($rgb) has luminance $luminance', ({ rgb, luminance }) => {
    expect(getLuminance(rgb)).toBeCloseTo(luminance, 8);
  });

  test.each([32, 96, 160, 224])('applies the power curve to neutral channels at %s', (channel) => {
    expect(getLuminance([channel, channel, channel])).toBeCloseTo(1.0000001 * (channel / 255) ** 2.4, 14);
  });

  test('keeps white luminance within the contrast input range', () => {
    expect(getLuminance([255, 255, 255])).toBe(1);
    expect(getContrast(getLuminance([0, 0, 0]), getLuminance([255, 255, 255]))).toBeGreaterThan(100);
    expect(getContrast(getLuminance([255, 255, 255]), getLuminance([0, 0, 0]))).toBeLessThan(-100);
  });

  test('adds the three independently weighted channel contributions', () => {
    const red = getLuminance([64, 0, 0]);
    const green = getLuminance([0, 192, 0]);
    const blue = getLuminance([0, 0, 128]);
    expect(red).toBeCloseTo(0.2126729 * (64 / 255) ** 2.4, 14);
    expect(green).toBeCloseTo(0.7151522 * (192 / 255) ** 2.4, 14);
    expect(blue).toBeCloseTo(0.072175 * (128 / 255) ** 2.4, 14);
    expect(getLuminance([64, 192, 128])).toBeCloseTo(red + green + blue, 14);
  });
});

describe('getContrast', () => {
  test.each<{
    name: string;
    text: [number, number, number];
    background: [number, number, number];
    contrast: number;
  }>([
    { name: 'black text on white', text: [0, 0, 0], background: [255, 255, 255], contrast: 106.04 },
    { name: 'white text on black', text: [255, 255, 255], background: [0, 0, 0], contrast: -107.88 },
    { name: 'black text on middle gray', text: [0, 0, 0], background: [128, 128, 128], contrast: 37.19 },
    { name: 'white text on middle gray', text: [255, 255, 255], background: [128, 128, 128], contrast: -72.4 },
    { name: 'black text on black', text: [0, 0, 0], background: [0, 0, 0], contrast: 0 },
    { name: 'white text on white', text: [255, 255, 255], background: [255, 255, 255], contrast: 0 },
  ])('$name has signed contrast $contrast', ({ text, background, contrast }) => {
    expect(getContrast(getLuminance(text), getLuminance(background))).toBeCloseTo(contrast, 2);
  });

  test('uses different powers for the two text polarities', () => {
    expect(getContrast(0.2, 0.8)).toBeCloseTo(((0.8 ** 0.56 - 0.2 ** 0.57) * 1.14 - 0.027) * 100, 12);
    expect(getContrast(0.8, 0.2)).toBeCloseTo(((0.2 ** 0.65 - 0.8 ** 0.62) * 1.14 + 0.027) * 100, 12);
    expect(getContrast(0.2, 0.8)).not.toBe(-getContrast(0.8, 0.2));
  });

  test('softens luminance below the black threshold', () => {
    const softened = 0.008 + 0.014 ** 1.414;
    expect(getContrast(0.008, 0.6)).toBeCloseTo(((0.6 ** 0.56 - softened ** 0.57) * 1.14 - 0.027) * 100, 12);
    expect(getContrast(0.6, 0.008)).toBeCloseTo(((softened ** 0.65 - 0.6 ** 0.62) * 1.14 + 0.027) * 100, 12);
  });

  test('does not soften luminance at the black threshold', () => {
    expect(getContrast(0.022, 0.6)).toBeCloseTo(((0.6 ** 0.56 - 0.022 ** 0.57) * 1.14 - 0.027) * 100, 12);
  });

  test.each([0, 0.015, 0.022, 0.4, 0.9, 1])('returns zero for equal luminances at %s', (luminance) => {
    expect(getContrast(luminance, luminance)).toBe(0);
  });

  test('suppresses near-equal luminances and small contrast in either direction', () => {
    for (const difference of [0.0002, 0.004, 0.02]) {
      expect(getContrast(0.4, 0.4 + difference)).toBe(0);
      expect(getContrast(0.4 + difference, 0.4)).toBe(0);
    }
  });

  test('increases dark-text contrast as the background becomes lighter', () => {
    let previous = 0;
    for (let step = 1; step <= 100; step++) {
      const contrast = getContrast(0, step / 100);
      expect(contrast).toBeGreaterThanOrEqual(previous);
      previous = contrast;
    }
    expect(previous).toBeGreaterThan(100);
  });

  test('increases light-text contrast magnitude as the background becomes darker', () => {
    let previous = 0;
    for (let step = 99; step >= 0; step--) {
      const contrast = getContrast(1, step / 100);
      expect(contrast).toBeLessThanOrEqual(previous);
      previous = contrast;
    }
    expect(previous).toBeLessThan(-100);
  });

  test.each([NaN, Infinity, -Infinity, -0.001, 1 + Number.EPSILON, 1.01, 1.1])(
    'rejects %s in either input position',
    (invalid) => {
      expect(getContrast(invalid, 0.6)).toBe(0);
      expect(getContrast(0.6, invalid)).toBe(0);
    },
  );
});
