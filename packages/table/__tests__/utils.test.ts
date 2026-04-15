import { describe, it, expect } from 'vitest';
import { getSizeModifier } from '../src/utils/getSizeModifier';

describe('getSizeModifier', () => {
  it('returns correct modifier for small size', () => {
    expect(getSizeModifier('Table', 'small')).toBe('TableSmall');
  });

  it('returns correct modifier for medium size', () => {
    expect(getSizeModifier('Table', 'medium')).toBe('TableMedium');
  });

  it('returns correct modifier for large size', () => {
    expect(getSizeModifier('Table', 'large')).toBe('TableLarge');
  });

  it('uses small as default size when not provided', () => {
    expect(getSizeModifier('Table')).toBe('TableSmall');
  });

  it('handles complex class prefixes', () => {
    expect(getSizeModifier('TableFilterComponentSearch', 'small')).toBe('TableFilterComponentSearchSmall');
    expect(getSizeModifier('PaddingForSimpleHeader', 'medium')).toBe('PaddingForSimpleHeaderMedium');
  });

  it('handles empty prefix', () => {
    expect(getSizeModifier('', 'small')).toBe('Small');
    expect(getSizeModifier('', 'medium')).toBe('Medium');
    expect(getSizeModifier('', 'large')).toBe('Large');
  });
});
