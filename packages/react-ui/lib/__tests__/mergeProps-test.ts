import { commonProps, isCommonProp } from '../mergeProps';

const commonPropsArr = Object.values({ ...commonProps.custom, ...commonProps.html });

describe('mergeProps', () => {
  describe('isCommonProp', () => {
    it.each(commonPropsArr)('returns true when called with %s', (propName) => {
      expect(isCommonProp(propName)).toBe(true);
    });

    it.each(['notACommonProp', 'string', 'test', 'abc'])('returns false when called with %s', (propName) => {
      expect(isCommonProp(propName)).toBe(false);
    });
  });
});
