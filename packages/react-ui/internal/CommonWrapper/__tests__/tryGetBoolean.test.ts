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
  it('should return undefined when passed null', () => {
    expect(tryGetBoolean(null)).toBeUndefined();
  });

  it('should return undefined when passed undefined', () => {
    expect(tryGetBoolean(undefined)).toBeUndefined();
  });

  it('should return undefined when passed a number', () => {
    expect(tryGetBoolean(42)).toBeUndefined();
  });

  it('should return undefined when passed a string', () => {
    expect(tryGetBoolean('hello')).toBeUndefined();
  });

  it('should return undefined when passed an object', () => {
    expect(tryGetBoolean({})).toBeUndefined();
  });

  it('should return undefined when passed an array', () => {
    expect(tryGetBoolean([])).toBeUndefined();
  });
});
