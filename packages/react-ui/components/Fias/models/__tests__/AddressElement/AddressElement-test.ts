import { getIsEqualToTestCases } from './__fixtures__/isEqualTo';

describe('AddressElement', () => {
  describe('isEqualTo', () => {
    getIsEqualToTestCases.forEach(({ label, element_1, element_2, isEqual }) => {
      it(label, () => {
        expect(element_1.isEqualTo(element_2)).toEqual(isEqual);
      });
    });
  });
});
