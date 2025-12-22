import { describe, test, expect } from 'vitest';
import { camelCaseToKebabCase, kebabCaseToCamelCase } from '../lib/utils/format-variable';

describe('format-variable', () => {
  test('camelCaseToKebabCase should convert correctly', () => {
    expect(camelCaseToKebabCase('someVariableName')).toBe('some-variable-name');
    expect(camelCaseToKebabCase('button')).toBe('button');
    expect(camelCaseToKebabCase('onBrandPrimary')).toBe('on-brand-primary');
  });

  test('kebabCaseToCamelCase should convert correctly', () => {
    expect(kebabCaseToCamelCase('some-variable-name')).toBe('someVariableName');
    expect(kebabCaseToCamelCase('button')).toBe('button');
    expect(kebabCaseToCamelCase('on-brand-primary')).toBe('onBrandPrimary');
  });
});
