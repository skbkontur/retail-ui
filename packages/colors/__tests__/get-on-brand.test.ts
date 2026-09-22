import { describe, test, expect } from 'vitest';

import * as DefaultSwatch from '../lib/consts/default-swatch.js';
import { getOnBrand } from '../lib/helpers/get-on-brand.js';

describe('getOnBrand', () => {
  test('should return whiteAlpha for black', () => {
    expect(getOnBrand('#000000')).toBe(DefaultSwatch.onBrandWhiteAlpha);
  });

  test('should return blackAlpha for white', () => {
    expect(getOnBrand('#ffffff')).toBe(DefaultSwatch.onBrandBlackAlpha);
  });

  test('should use whiteAlpha on dark and medium colors', () => {
    expect(getOnBrand('#fe4c4c')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#fc762f')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#28ac51')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#00bea2')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#2191ff')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#366af3')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#844bec')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#b750d1')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#0e4a25')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#0e7335')).toBe(DefaultSwatch.onBrandWhiteAlpha);
  });

  test('preserves the white preference around the 10 Lc threshold', () => {
    expect(getOnBrand('#acacac')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#adadad')).toBe(DefaultSwatch.onBrandBlackAlpha);
  });

  test('supports short and uppercase hex colors', () => {
    expect(getOnBrand('#fff')).toBe(DefaultSwatch.onBrandBlackAlpha);
    expect(getOnBrand('#AAA')).toBe(DefaultSwatch.onBrandWhiteAlpha);
    expect(getOnBrand('#ADADAD')).toBe(DefaultSwatch.onBrandBlackAlpha);
  });

  test.each([
    ['oklch(70% 0.4 30)', '#ff0000', DefaultSwatch.onBrandWhiteAlpha],
    ['color(display-p3 1 0 0)', '#ff0000', DefaultSwatch.onBrandWhiteAlpha],
    ['color(display-p3 0 1 0)', '#00ff00', DefaultSwatch.onBrandBlackAlpha],
  ])('clips out-of-gamut channels for %s', (color, clippedHex, expected) => {
    expect(getOnBrand(color)).toBe(expected);
    expect(getOnBrand(color)).toBe(getOnBrand(clippedHex));
  });

  test.each([
    ['oklch(80% 0.1 200)', '#64d1d7'],
    ['lch(80% 30 200)', '#7ad6d8'],
  ])('converts %s to sRGB before selecting the text color', (color, convertedHex) => {
    expect(getOnBrand(color)).toBe(DefaultSwatch.onBrandBlackAlpha);
    expect(getOnBrand(color)).toBe(getOnBrand(convertedHex));
  });

  test('should use blackAlpha on very light or pale colors', () => {
    expect(getOnBrand('#fab702')).toBe(DefaultSwatch.onBrandBlackAlpha);
    expect(getOnBrand('#c7ff6d')).toBe(DefaultSwatch.onBrandBlackAlpha);
    expect(getOnBrand('#dbe6e9')).toBe(DefaultSwatch.onBrandBlackAlpha);
    expect(getOnBrand('#18ff70')).toBe(DefaultSwatch.onBrandBlackAlpha);
  });
});
