import { isNonNullable } from '../utils';

describe('isNonNullable', () => {
  describe('nullish values return false', () => {
    it('null returns false', () => {
      expect(isNonNullable(null)).toBe(false);
    });

    it('undefined returns false', () => {
      expect(isNonNullable(undefined)).toBe(false);
    });
  });

  describe('other falsy values return true', () => {
    it('false returns true', () => {
      expect(isNonNullable(false)).toBe(true);
    });

    it('0 returns true', () => {
      expect(isNonNullable(0)).toBe(true);
    });

    it('-0 returns true', () => {
      expect(isNonNullable(-0)).toBe(true);
    });

    it('empty string returns true', () => {
      expect(isNonNullable('')).toBe(true);
    });

    it('NaN string returns true', () => {
      expect(isNonNullable(NaN)).toBe(true);
    });
  });
});
