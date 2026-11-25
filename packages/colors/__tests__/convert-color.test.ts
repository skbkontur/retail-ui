import { test, expect } from 'vitest';

import { convertColorFormat } from '../lib/utils/convert-color.js';

const mockTokens = {
  primary: 'oklch(0.6 0.2 250)',
  accent: 'oklch(0.6 0.2 250 / 0.5)',
};

test('should convert oklch to hex/rgba by default', () => {
  const result = convertColorFormat(mockTokens) as any;
  expect(result.primary).toMatch(/^#[0-9a-f]{6}$/i);
  expect(result.accent).toContain('rgba(');
});

test('should return oklch as is when format is oklch', () => {
  const result = convertColorFormat(mockTokens, 'oklch');
  expect(result).toEqual(mockTokens);
});

test('should convert to hex-aarrggbb format', () => {
  const result = convertColorFormat(mockTokens, 'hex-aarrggbb') as any;
  expect(result.primary).toMatch(/^#[0-9A-F]{6}$/);
});

test('should format white hex as 100% lightness in oklch', () => {
  const result = convertColorFormat({ white: '#ffffff', black: '#000000' }, 'oklch') as any;
  expect(result.white).toBe('oklch(100% 0 0)');
  expect(result.black).toBe('oklch(0% 0 0)');
});
