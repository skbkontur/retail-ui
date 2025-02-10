import { isVersionEQ, isVersionGT, isVersionGTE } from '../../ThemeVersionsComparator';

describe('ThemeVersionsComparator', () => {
  describe('isVersionsEQ', () => {
    test.each`
      a          | b          | expected
      ${''}      | ${''}      | ${false}
      ${'5_0_0'} | ${'5_0_0'} | ${true}
      ${'5_0'}   | ${'5_0'}   | ${true}
      ${'5'}     | ${'5'}     | ${true}
      ${'5_0_0'} | ${'5_0'}   | ${true}
      ${'5_0'}   | ${'5'}     | ${true}
      ${'5'}     | ${'5_0_0'} | ${true}
      ${'5_00'}  | ${'5_0'}   | ${true}
      ${'5_1'}   | ${'5_0'}   | ${false}
      ${'5_1'}   | ${'5_10'}  | ${false}
      ${'5_0_1'} | ${'5_01'}  | ${false}
      ${'5_1'}   | ${'5_01'}  | ${true}
    `('isVersionsEQ($a, $b) returns $expected', ({ a, b, expected }) => {
      expect(isVersionEQ(a, b)).toBe(expected);
    });
  });

  describe('isVersionsGT', () => {
    test.each`
      a          | b          | expected
      ${''}      | ${''}      | ${false}
      ${'5_0_0'} | ${'5_0_0'} | ${false}
      ${'5_0'}   | ${'5_0'}   | ${false}
      ${'5'}     | ${'5'}     | ${false}
      ${'5_0_0'} | ${'5_0'}   | ${false}
      ${'5_0'}   | ${'5'}     | ${false}
      ${'5'}     | ${'5_0_0'} | ${false}
      ${'5_00'}  | ${'5_0'}   | ${false}
      ${'5_1_0'} | ${'5_0_0'} | ${true}
      ${'5_0_1'} | ${'5_0_0'} | ${true}
      ${'5'}     | ${'4'}     | ${true}
      ${'5'}     | ${'4_9'}   | ${true}
      ${'5'}     | ${'4_9_9'} | ${true}
      ${'5_1'}   | ${'5_10'}  | ${false}
      ${'5_0_1'} | ${'5_01'}  | ${false}
      ${'5_1'}   | ${'5_01'}  | ${false}
      ${'5_0'}   | ${'5_1'}   | ${false}
    `('isVersionsGT($a, $b) returns $expected', ({ a, b, expected }) => {
      expect(isVersionGT(a, b)).toBe(expected);
    });
  });

  describe('isVersionsGTE', () => {
    test.each`
      a          | b          | expected
      ${''}      | ${''}      | ${false}
      ${'5_1_0'} | ${'5_0_0'} | ${true}
      ${'5_0_0'} | ${'5_0_0'} | ${true}
      ${'5_0'}   | ${'5_0'}   | ${true}
      ${'5'}     | ${'5'}     | ${true}
      ${'5_0_0'} | ${'5_0'}   | ${true}
      ${'5_0'}   | ${'5'}     | ${true}
      ${'5'}     | ${'5_0_0'} | ${true}
      ${'5_00'}  | ${'5_0'}   | ${true}
      ${'5_1_0'} | ${'5_0_0'} | ${true}
      ${'5_0_1'} | ${'5_0_0'} | ${true}
      ${'5'}     | ${'4'}     | ${true}
      ${'5'}     | ${'4_9'}   | ${true}
      ${'5'}     | ${'4_9_9'} | ${true}
      ${'5_1'}   | ${'5_10'}  | ${false}
      ${'5_0_1'} | ${'5_01'}  | ${false}
      ${'5_1'}   | ${'5_01'}  | ${true}
      ${'5_0'}   | ${'5_1'}   | ${false}
    `('isVersionsGTE($a, $b) returns $expected', ({ a, b, expected }) => {
      expect(isVersionGTE(a, b)).toBe(expected);
    });
  });
});
