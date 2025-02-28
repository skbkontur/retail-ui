import { parseThemeVersion, isThemeVersionGTE } from '../ThemeVersions';

describe('ThemeVersions', () => {
  describe('parseThemeVersion', () => {
    test.each`
      v        | result
      ${''}    | ${null}
      ${'_'}   | ${null}
      ${'.'}   | ${null}
      ${'-.-'} | ${null}
      ${'1'}   | ${null}
      ${'0_0'} | ${null}
      ${'0.0'} | ${{ major: 0, minor: 0 }}
      ${'1.0'} | ${{ major: 1, minor: 0 }}
      ${'2.1'} | ${{ major: 2, minor: 1 }}
    `('parseThemeVersion($v) returns $result', ({ v, result }) => {
      expect(parseThemeVersion(v)).toStrictEqual(result);
    });

    test.each`
      v        | separator | result
      ${''}    | ${'_'}    | ${null}
      ${'_'}   | ${'_'}    | ${null}
      ${'.'}   | ${'_'}    | ${null}
      ${'-.-'} | ${'_'}    | ${null}
      ${'1'}   | ${'_'}    | ${null}
      ${'0.0'} | ${'_'}    | ${null}
      ${'0_0'} | ${'_'}    | ${{ major: 0, minor: 0 }}
      ${'1_0'} | ${'_'}    | ${{ major: 1, minor: 0 }}
      ${'2_1'} | ${'_'}    | ${{ major: 2, minor: 1 }}
    `('parseThemeVersion($v, $separator) returns $result', ({ v, separator, result }) => {
      expect(parseThemeVersion(v, separator)).toStrictEqual(result);
    });
  });

  describe('isThemeVersionGTE', () => {
    test.each`
      v1        | v2       | result
      ${''}     | ${''}    | ${false}
      ${'-'}    | ${'-'}   | ${false}
      ${'1'}    | ${'1'}   | ${false}
      ${''}     | ${'1.0'} | ${false}
      ${'-'}    | ${'1.0'} | ${false}
      ${'-.-'}  | ${'1.0'} | ${false}
      ${'1'}    | ${'1.0'} | ${false}
      ${'1.0'}  | ${''}    | ${false}
      ${'1.0'}  | ${'-'}   | ${false}
      ${'1.0'}  | ${'-.-'} | ${false}
      ${'1.0'}  | ${'1'}   | ${false}
      ${'-.-'}  | ${'-.-'} | ${false}
      ${'0_0'}  | ${'0_0'} | ${false}
      ${'0.0'}  | ${'0.0'} | ${true}
      ${'1.0'}  | ${'1.0'} | ${true}
      ${'1.1'}  | ${'1.1'} | ${true}
      ${'1.0'}  | ${'1.1'} | ${false}
      ${'1.0'}  | ${'2.0'} | ${false}
      ${'1.0'}  | ${'0.0'} | ${true}
      ${'1.0'}  | ${'0.1'} | ${true}
      ${'2.0'}  | ${'1.0'} | ${true}
      ${'2.1'}  | ${'2.0'} | ${true}
      ${'2.10'} | ${'2.2'} | ${true}
    `('isThemeVersionGTE($v1, $v2) returns $result', ({ v1, v2, result }) => {
      expect(isThemeVersionGTE(v1, v2)).toBe(result);
    });
  });
});
