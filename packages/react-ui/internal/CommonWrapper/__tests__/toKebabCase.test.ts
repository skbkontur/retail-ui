import { toKebabCase } from '../../../lib/toKebabCase';

it('convert to kebab case', () => {
  expect(toKebabCase('toKebabCase')).toBe('to-kebab-case');
});
