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

  test('should use blackAlpha on very light or pale colors', () => {
    expect(getOnBrand('#fab702')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#c7ff6d')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#dbe6e9')).toBe(DefaultSwatch.blackAlpha);
    expect(getOnBrand('#18ff70')).toBe(DefaultSwatch.blackAlpha);
  });
});
