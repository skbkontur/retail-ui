import { isNullable } from '../isNullable';

describe('isNullable', () => {
  describe('nullish values return true', () => {
    it('null returns true', () => {
      expect(isNullable(null)).toBe(true);
    });

    it('undefined returns true', () => {
      expect(isNullable(undefined)).toBe(true);
    });
  });

  describe('other falsy and truthy values return false', () => {
    it('false returns false', () => {
      expect(isNullable(false)).toBe(false);
    });

    it('0 returns false', () => {
      expect(isNullable(0)).toBe(false);
    });

    it('-0 returns false', () => {
      expect(isNullable(-0)).toBe(false);
    });

    it('empty string returns false', () => {
      expect(isNullable('')).toBe(false);
    });

    it('NaN returns false', () => {
      expect(isNullable(NaN)).toBe(false);
    });

    it('1 returns false', () => {
      expect(isNullable(1)).toBe(false);
    });
  });
});
