import { test, describe, expect } from 'vitest';
import { getColors } from '../lib/get-colors';

test('should return both themes with HEX values by default', () => {
  const res = getColors({ brand: 'blue', accent: 'brand', theme: 'light' });
  const firstToken = Object.values(res)[0] as string;
  expect(firstToken).toMatch(/^#[0-9a-f]{6}$/i);
});

test('should return flat object when theme is "light"', () => {
  const res = getColors({ brand: 'blue', accent: 'brand', theme: 'light' });
  const firstToken = Object.values(res)[0] as string;
  expect(firstToken).toMatch(/^#[0-9a-f]{6}$/i);
});

test('should use custom hex for brand tokens', () => {
  const res = getColors({ brand: '#FF5500', accent: 'brand', theme: 'light' });
  const firstToken = Object.values(res)[0] as string;
  expect(firstToken).toMatch(/^#[0-9a-f]{6}$/i);
});

test('should apply custom system palette', () => {
  const system = { warning: '#000000', error: '#000000', success: '#000000' };
  const res = getColors({ brand: 'blue', accent: 'brand', system, theme: 'light' });
  expect(res).toBeDefined();
});

test('should output OKLCH strings when format is "oklch"', () => {
  const res = getColors({ brand: 'blue', accent: 'brand', theme: 'light', format: 'oklch' });
  const firstToken = Object.values(res)[0] as string;
  expect(firstToken).toContain('oklch(');
});

test('should output ARGB hex for "hex-aarrggbb" format', () => {
  const res = getColors({ brand: 'blue', accent: 'brand', theme: 'light', format: 'hex-aarrggbb' });
  const firstToken = Object.values(res)[0] as string;
  expect(firstToken).toMatch(/^#[0-9A-F]{6,8}$/);
});

test('should return HEX/RGBA by default (no oklch in output)', () => {
  const res = getColors({ brand: '#ffffff', accent: 'brand', theme: 'light' }) as any;

  expect(res.textAccentHeavy).toMatch(/^#/);
  expect(JSON.stringify(res)).not.toContain('oklch');
  expect(JSON.stringify(res)).not.toContain('NaN');
});

test('should merge custom tokens via overrides', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    overrides: (base) => ({ light: { customBrand: base?.gray[20] } } as any),
  }) as any;
  expect(res.customBrand).toBe('#161616');
});

test('should apply format to override tokens', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    format: 'oklch',
    overrides: () => ({
      light: { testToken: '#ffffff' },
      dark: { testToken: '#000000' },
    }),
  }) as any;
  expect(res.testToken).toContain('oklch(');
});

test('should process themed values in overrides', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    overrides: () => ({
      light: { testToken: '#ffffff' },
      dark: { testToken: '#000000' },
    }),
  }) as any;
  expect(res.testToken).toBe('#ffffff');
});

test('should correctly convert to "hex-aarrggbb" format (Android style)', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    format: 'hex-aarrggbb',
    overrides: () => ({
      light: {
        blackWithAlpha: '#00000052',
        whiteWithAlpha: '#FFFFFF52',
        solidRed: '#FF0000',
      },
      dark: {},
    }),
  }) as any;

  expect(res.blackWithAlpha).toBe('#52000000');
  expect(res.whiteWithAlpha).toBe('#52FFFFFF');
  expect(res.solidRed).toBe('#FF0000');
});

test('should correctly convert to "oklch" format', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    format: 'oklch',
    overrides: () => ({
      light: {
        white: '#FECA42',
        black: '#FC762D',
      },
      dark: {},
    }),
  }) as any;

  expect(res.white).toBe('oklch(86.3% 0.156 86.8)');
  expect(res.black).toBe('oklch(71.5% 0.183 45.3)');
});

test('should correctly convert to "hex/rgba" format (default)', () => {
  const res = getColors({
    brand: 'blue',
    accent: 'brand',
    theme: 'light',
    format: 'hex/rgba',
    overrides: () => ({
      light: {
        solid: '#FF5500',
        withAlpha: 'oklch(50% 0.1 200 / 0.5)',
      },
      dark: {},
    }),
  }) as any;

  expect(res.solid).toBe('#FF5500');
  expect(res.withAlpha).toMatch('rgba(-39, 116, 122, 0.5)');
});

describe('getColors with ouput', () => {
  test('should return flat object when output is "object" (explicitly)', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'light',
      output: 'object',
    }) as any;

    expect(typeof res).toBe('object');
    expect(res).not.toBeNull();
    expect(res).toHaveProperty('textAccentHeavy');
    expect(res).not.toHaveProperty('text-accent-heavy');
  });

  test('should return CSS string with correct selectors when output is "css"', () => {
    const res = getColors({
      brand: 'blueDeep',
      accent: 'gray',
      theme: 'light',
      output: 'css',
    }) as string;

    expect(typeof res).toBe('string');
    expect(res).toContain("[data-k-brand='blue-deep']");
    expect(res).toContain("[data-k-accent='gray']");
    expect(res).toContain('--k-color-text-accent-heavy:');
  });

  test('should include dark theme attribute in CSS selector', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'dark',
      output: 'css',
    }) as string;

    expect(res).toContain("[data-k-theme='dark']");
  });

  test('should handle custom brand hex in CSS output with lowercase', () => {
    const customHex = '#ABCDEF';
    const res = getColors({
      brand: customHex,
      accent: 'gray',
      theme: 'light',
      output: 'css',
    }) as string;

    expect(res).toContain("[data-k-brand='#abcdef']");
  });

  test('should generate CSS variables for custom overrides', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'light',
      output: 'css',
      overrides: () => ({
        light: {
          customTestToken: '#ffffff',
        },
        dark: {},
      }),
    }) as string;

    expect(res).toContain('--k-color-custom-test-token: #ffffff;');
  });
});

describe('getColors with theme: "all"', () => {
  test('should return object with both themes when output is "object"', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'all',
      output: 'object',
    }) as any;

    expect(res).toHaveProperty('light');
    expect(res).toHaveProperty('dark');
    expect(res.light).toHaveProperty('textAccentHeavy');
    expect(res.dark).toHaveProperty('textAccentHeavy');
    expect(res.light.textAccentHeavy).not.toBe(res.dark.textAccentHeavy);
  });

  test('should return combined CSS string when output is "css"', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'all',
      output: 'css',
    }) as string;

    expect(typeof res).toBe('string');

    expect(res).toContain("[data-k-brand='blue'][data-k-accent='brand']");

    expect(res).toContain("[data-k-brand='blue'][data-k-accent='brand'][data-k-theme='dark']");

    const blocks = res.split('}');
    expect(blocks.length).toBeGreaterThanOrEqual(2);
    expect(res).toContain('--k-color-text-accent-heavy');
  });

  test('should respect format "oklch" for both themes in "all" mode', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'all',
      format: 'oklch',
      output: 'object',
    }) as any;

    expect(res.light.textAccentHeavy).toContain('oklch');
    expect(res.dark.textAccentHeavy).toContain('oklch');
  });

  test('should apply overrides to both themes when theme is "all"', () => {
    const res = getColors({
      brand: 'blue',
      accent: 'brand',
      theme: 'all',
      output: 'object',
      overrides: () => ({
        light: { custom: '#ffffff' },
        dark: { custom: '#000000' },
      }),
    }) as any;

    expect(res.light.custom).toBe('#ffffff');
    expect(res.dark.custom).toBe('#000000');
  });
});
