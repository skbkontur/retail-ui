import { describe, test, expect } from 'vitest';

import * as DefaultSwatch from '../lib/consts/default-swatch.js';
import { getOnBrand } from '../lib/helpers/get-on-brand.js';

describe('getOnBrand', () => {
  test('should return whiteAlpha for black', () => {
    expect(getOnBrand('#000000')).toBe(DefaultSwatch.whiteAlpha);
  });

  test('should return blackAlpha for white', () => {
    expect(getOnBrand('#ffffff')).toBe(DefaultSwatch.blackAlpha);
  });

  test('should use whiteAlpha on dark and medium colors', () => {
    expect(getOnBrand('#fe4c4c')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#fc762f')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#28ac51')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#00bea2')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#2191ff')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#366af3')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#844bec')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#b750d1')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#0e4a25')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#0e7335')).toBe(DefaultSwatch.whiteAlpha);
  });

  test('preserves the white preference around the 10 Lc threshold', () => {
    expect(getOnBrand('#acacac')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#adadad')).toBe(DefaultSwatch.blackAlpha);
  });

  test('supports short and uppercase hex colors', () => {
    expect(getOnBrand('#fff')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#AAA')).toBe(DefaultSwatch.whiteAlpha);
    expect(getOnBrand('#ADADAD')).toBe(DefaultSwatch.blackAlpha);
  });

  test.each([
    ['oklch(70% 0.4 30)', '#ff0000', DefaultSwatch.whiteAlpha],
    ['color(display-p3 1 0 0)', '#ff0000', DefaultSwatch.whiteAlpha],
    ['color(display-p3 0 1 0)', '#00ff00', DefaultSwatch.blackAlpha],
  ])('clips out-of-gamut channels for %s', (color, clippedHex, expected) => {
    expect(getOnBrand(color)).toBe(expected);
    expect(getOnBrand(color)).toBe(getOnBrand(clippedHex));
  });

  test.each([
    ['oklch(80% 0.1 200)', '#64d1d7'],
    ['lch(80% 30 200)', '#7ad6d8'],
  ])('converts %s to sRGB before selecting the text color', (color, convertedHex) => {
    expect(getOnBrand(color)).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand(color)).toBe(getOnBrand(convertedHex));
  });

  test('should use blackAlpha on very light or pale colors', () => {
    expect(getOnBrand('#fab702')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#c7ff6d')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#dbe6e9')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#18ff70')).toBe(DefaultSwatch.blackAlpha);
  });
});
