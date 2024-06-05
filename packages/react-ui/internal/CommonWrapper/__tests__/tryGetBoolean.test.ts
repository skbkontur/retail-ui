import { tryGetBoolean } from '../utils/tryGetBoolean';

describe('tryGetBoolean', () => {
  it('should return true when passed true', () => {
    expect(tryGetBoolean(true)).toBe(true);
  });

  it('should return false when passed false', () => {
    expect(tryGetBoolean(false)).toBe(false);
  });
});

describe('tryGetBoolean with invalid input', () => {
  it.each([null, undefined, 42, 'hello', {}, []])('should return undefined when passed `%s`', (value) => {
    expect(tryGetBoolean(value)).toBeUndefined();
  });
});
