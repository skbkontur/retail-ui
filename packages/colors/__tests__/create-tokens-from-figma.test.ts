import { describe, test, expect } from 'vitest';
import { slashToCamelCase, transformations, extractTokensFromFigma } from '../scripts/create-tokens-from-figma';

const [
  { fn: filterFn },
  { fn: groupByThemeFn },
  { fn: reorderStatesFn },
  { fn: applyNamingFn },
  { fn: mapToBaseTokensFn },
  { fn: sortKeysFn },
  { fn: generateCodeFn },
] = transformations;

describe('extractTokensFromFigma (Integration)', () => {
  test('should transform raw input to final TypeScript code', () => {
    const rawInput = {
      'Text/Primary / Light': 'Gray/20',
      'Text/Primary / Dark': 'Gray/80',
      'Shape/Onbrand/Default / Light': 'Brand/Normal/100',
      'Shape/Onbrand/Default / Dark': 'Brand/Normal/0',
      'Line/Soft / Light': 'Light/Line/Soft',
      'Line/Soft / Dark': 'Dark/Line/Soft',
      'Effect/Drop Shadow / Light': 'rgba(0,0,0,0.1)',
      'Incomplete/Token / Dark': 'Value',
    };

    const expectedCode = `import type { TokensBase } from './types/tokens-base.js';

export const getColorsDefaultTokens = (base: TokensBase) => ({
  light: {
    textPrimary: base.gray[20],
    shapeOnBrandDefault: base.brand.original,
    lineSoft: base.accent?.palette?.dim[76] || base.blackAlpha[48]
  },
  dark: {
    textPrimary: base.gray[80],
    shapeOnBrandDefault: base.brand.promo,
    lineSoft: base.accent?.palette?.dim[48] || base.whiteAlpha[48]
  }
});
`;
    const result = extractTokensFromFigma(rawInput);

    expect(result.trim()).toBe(expectedCode.trim());
  });
});

describe('Pipeline Steps', () => {
  test('should convert path segments to camelCase and preserve custom casing (slashToCamelCase)', () => {
    expect(slashToCamelCase('Text/Primary')).toBe('textPrimary');
    expect(slashToCamelCase('Surface/Base/Hover')).toBe('surfaceBaseHover');
    expect(slashToCamelCase('Text/OnBrand/Primary')).toBe('textOnBrandPrimary');
    expect(slashToCamelCase('Line Soft')).toBe('lineSoft');
    expect(slashToCamelCase('red-500')).toBe('red500');
  });

  test('should exclude Effect tokens and values containing rgba/hex (Filter)', () => {
    const input = {
      'Valid/Token / Light': 'Gray/100',
      'Effect/Shadow / Light': 'rgba(0, 0, 0, 0.1)',
      'Another/Effect / Dark': '#FFFFFF',
      'Keep/This / Dark': 'Brand/200',
    };
    const expected = {
      'Valid/Token / Light': 'Gray/100',
      'Keep/This / Dark': 'Brand/200',
    };
    expect(filterFn(input)).toEqual(expected);
  });

  test('should group light/dark pairs and exclude incomplete tokens (Group by Theme)', () => {
    const input = {
      'Surface/Base / Light': 'v1',
      'Surface/Base / Dark': 'v2',
      'Incomplete/Token / Light': 'v3',
    };
    const expected = {
      'Surface/Base': { light: 'v1', dark: 'v2' },
    };
    expect(groupByThemeFn(input)).toEqual(expected);
  });

  test('should move state suffixes (Hover, Pressed, Disabled) to the end (Reorder States)', () => {
    const input = {
      'Hover/Shape/Other/Low': { light: 'v1', dark: 'v2' },
      'Shape/Base/Pressed': { light: 'v3', dark: 'v4' },
      'Simple/Token': { light: 'v5', dark: 'v6' },
    };
    const expected = {
      'Shape/Other/Low/Hover': { light: 'v1', dark: 'v2' },
      'Shape/Base/Pressed': { light: 'v3', dark: 'v4' },
      'Simple/Token': { light: 'v5', dark: 'v6' },
    };
    expect(reorderStatesFn(input)).toEqual(expected);
  });

  test('should convert to camelCase and fix "Onbrand" casing (Apply Naming)', () => {
    const input = {
      'Text/Onbrand/Primary': { light: 'v1', dark: 'v2' },
      'Surface/Base/Hover': { light: 'v3', dark: 'v4' },
    };
    const expected = {
      textOnBrandPrimary: { light: 'v1', dark: 'v2' },
      surfaceBaseHover: { light: 'v3', dark: 'v4' },
    };
    expect(applyNamingFn(input)).toEqual(expected);
  });

  test('should convert raw values to JS expressions and handle special cases (Map to BaseTokens)', () => {
    const input = {
      standardToken: { light: 'Gray/100', dark: 'Blue/50' },
      brandOriginal: { light: 'Brand/Normal/100', dark: 'Brand/Normal/100' },
      brandPromo: { light: 'Brand/Normal/0', dark: 'Brand/Normal/0' },
      customizableColor: { light: 'Violet/100', dark: 'Violet/100' },

      onAccentScale: { light: 'OnAccent/40', dark: 'OnAccent/40' },
    };
    const expected = {
      standardToken: { light: 'base.gray[100]', dark: 'base.customizable.blue[50]' },
      brandOriginal: { light: 'base.brand.original', dark: 'base.brand.original' },
      brandPromo: { light: 'base.brand.promo', dark: 'base.brand.promo' },
      customizableColor: { light: 'base.customizable.violet[100]', dark: 'base.customizable.violet[100]' },

      onAccentScale: { light: 'base.onAccent?.[40]', dark: 'base.onAccent?.[40]' },
    };
    expect(mapToBaseTokensFn(input)).toEqual(expected);
  });

  test('should sort keys according to defined SORT_ORDER (Text > Shape > Surface) (Sort Keys)', () => {
    const input = {
      surfaceBase: { light: 'v1', dark: 'v1' },
      shapeFaint: { light: 'v2', dark: 'v2' },
      textPrimary: { light: 'v3', dark: 'v3' },
    };

    const resultKeys = (sortKeysFn(input) as any[]).map(([key]) => key);

    expect(resultKeys).toEqual(['textPrimary', 'shapeFaint', 'surfaceBase']);
  });

  test('should produce the final TS function with correct formatting (Generate Code)', () => {
    const input = [
      ['tokenOne', { light: 'l1', dark: 'd1' }],
      ['tokenTwo', { light: 'l2', dark: 'd2' }],
    ];

    const expected = `import type { TokensBase } from './types/tokens-base.js';

export const getColorsDefaultTokens = (base: TokensBase) => ({
  light: {
    tokenOne: l1,
    tokenTwo: l2
  },
  dark: {
    tokenOne: d1,
    tokenTwo: d2
  }
});
`;
    expect(generateCodeFn(input).trim()).toBe(expected.trim());
  });
});
