import { describe, test, expect } from 'vitest';

import { getNeutralPalette } from '../lib/helpers/get-neutral';

describe('getNeutralPalette', () => {
  const HUE = 280;
  const CHROMA_LIGHT = 0.002;
  const CHROMA_DARK = 0.015;

  test('should generate exact RGBA strings for transparency levels', () => {
    const { neutralAlpha } = getNeutralPalette(HUE, CHROMA_LIGHT, CHROMA_DARK);

    expect(neutralAlpha[97]).toBe('rgba(21, 25, 59, 0.0431)');
    expect(neutralAlpha[72]).toBe('rgba(21, 22, 33, 0.3882)');
    expect(neutralAlpha[20]).toBe('rgba(21, 21, 29, 1)');
  });

  test('should generate exact HEX codes for solid colors', () => {
    const { neutralSolid } = getNeutralPalette(HUE, CHROMA_LIGHT, CHROMA_DARK);

    expect(neutralSolid[97]).toBe('#f5f5f6');
    expect(neutralSolid[72]).toBe('#a4a4a8');
    expect(neutralSolid[20]).toBe('#15151d');
  });

  test('should produce exactly 23 palette steps', () => {
    const { neutralSolid } = getNeutralPalette(HUE, CHROMA_LIGHT, CHROMA_DARK);
    expect(Object.keys(neutralSolid).length).toBe(23);
  });
});
