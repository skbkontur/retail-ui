import { toKebabCase } from '../toKebabCase.js';

it('convert to kebab case', () => {
  expect(toKebabCase('toKebabCase')).toBe('to-kebab-case');
});
