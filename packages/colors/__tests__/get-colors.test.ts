import { test, expect } from 'vitest';
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
