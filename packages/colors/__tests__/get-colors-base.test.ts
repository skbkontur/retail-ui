import { test, expect } from 'vitest';
import { getColorsBase } from '../lib/get-colors-base';

test('should return full TokensBase structure by default', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand' });
  expect(res.brand.original).toBeDefined();
  expect(res.brand.palette).toBeDefined();
});

test('should use preset color when brand name is provided', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand' });
  expect(res.brand.original.toLowerCase()).toBe('#2291ff');
});

test('should use custom hex when brand is a hex string', () => {
  const res = getColorsBase({ brand: '#FF5500', accent: 'brand' });
  expect(res.brand.original).toBe('#FF5500');
});

test('should link accent to brand when accent is "brand"', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand' });
  expect(res.accent?.original.light).toBe(res.brand.original);
});

test('should not generate accent palette when accent is "gray"', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'gray' });
  expect(res.accent).toBeUndefined();
});

test('should apply custom system colors to palettes', () => {
  const system = { warning: '#FF00FF', error: '#00FFFF', success: '#FFFF00' };
  const res = getColorsBase({ brand: 'blue', accent: 'brand', system });
  expect(Object.values(res.warning.normal)[0]).toMatch(/^#[0-9a-f]{6}$/i);
});

test('should return oklch values when format is "oklch"', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand', format: 'oklch' });
  expect(res.brand.promo).toContain('oklch(');
});

test('should return hex values when format is "hex-aarrggbb"', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand', format: 'hex-aarrggbb' });
  expect(res.brand.promo).toMatch(/^#[0-9A-F]{6,8}$/);
});

test('should generate onBrand tokens', () => {
  const res = getColorsBase({ brand: '#ffffff', accent: 'brand' });
  expect(res.onBrand[100]).toContain('0, 0, 0');
});

test('should provide all customizable palettes', () => {
  const res = getColorsBase({ brand: 'blue', accent: 'brand' });
  expect(res.customizable.red).toBeDefined();
  expect(res.customizable.green).toBeDefined();
});
