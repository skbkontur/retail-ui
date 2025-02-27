import {
  applyMarkers,
  createTheme,
  exposeGetters,
  isDarkTheme,
  isThemeVersion,
  isVersionGTE,
  markAsDarkTheme,
  Marker,
  markThemeVersion,
  REACT_UI_THEME_MARKERS,
} from '../ThemeHelpers';
import { ThemeFactory } from '../ThemeFactory';
import { AnyObject } from '../../utils';
import { BasicTheme, BasicThemeClassForExtension } from '../../../internal/themes/BasicTheme';

const TestTheme = createTheme({
  themeClass: class extends BasicThemeClassForExtension {
    public static bgDefault = 'default';
    public static bgSecondary = 'default';
  },
  prototypeTheme: BasicTheme,
});

describe('ThemeHelpers', () => {
  describe('exposeGetters', () => {
    const theme = class extends BasicThemeClassForExtension {
      public static get errorText() {
        return 'red';
      }
    };

    test('getter is not enumerable by default in JS', () => {
      expect(ThemeFactory.getKeys(theme).indexOf('errorText')).toBe(-1);
    });

    test('exposed getter should be enumerable', () => {
      exposeGetters(theme);
      expect(ThemeFactory.getKeys(theme).indexOf('errorText')).toBeGreaterThan(-1);
    });
  });

  describe('createTheme', () => {
    const theme = createTheme({
      themeClass: class extends BasicThemeClassForExtension {
        public static get errorText() {
          return this.black + this.blue;
        }
      },
      prototypeTheme: BasicTheme,
      themeMarkers: [markAsDarkTheme, markThemeVersion('5.0')],
    });

    test('should inherit prototype theme', () => {
      expect(theme.errorText).toBe(BasicTheme.black + BasicTheme.blue);
    });

    test('should expose getters', () => {
      expect(ThemeFactory.getKeys(theme).indexOf('errorText')).toBeGreaterThan(-1);
    });

    describe('should apply markers', () => {
      test('dark theme', () => {
        expect(isDarkTheme(theme)).toBe(true);
      });
      test('theme version', () => {
        expect(isThemeVersion(theme, '1.0')).toBe(true);
      });
    });
  });

  describe('applyMarker', () => {
    describe('test marker', () => {
      const TEST_MARKER = {
        key: '__REACT_UI_TEST_KEY__',
        value: true,
      };

      // @ts-expect-error: extension for test
      REACT_UI_THEME_MARKERS.test = TEST_MARKER;

      const markAsTest: Marker = (theme) => {
        return Object.create(theme, {
          [TEST_MARKER.key]: {
            value: TEST_MARKER.value,
            writable: false,
            enumerable: false,
            configurable: false,
          },
        });
      };

      const isTestTheme = (theme: AnyObject): boolean => {
        return theme[TEST_MARKER.key] === TEST_MARKER.value;
      };

      test('test marker should mark custom theme', () => {
        const theme = applyMarkers(ThemeFactory.create(TestTheme), [markAsTest]);
        expect(isTestTheme(theme)).toBeTruthy();
      });
    });

    describe('isThemeVersion', () => {
      const theme5_1 = applyMarkers(ThemeFactory.create(TestTheme), [markThemeVersion('5.1')]);

      test('5_1 should BE greater or equal that 5_0', () => {
        expect(isThemeVersion(theme5_1, '5.0')).toBe(true);
      });
    });

    describe('isDarkTheme', () => {
      const lightTheme = applyMarkers(ThemeFactory.create(TestTheme), []);
      const darkTheme = applyMarkers(ThemeFactory.create(TestTheme), [markAsDarkTheme]);

      test('light theme should NOT BE dark', () => {
        expect(isDarkTheme(lightTheme)).toBe(false);
      });

      test('dark theme should BE dark', () => {
        expect(isDarkTheme(darkTheme)).toBe(true);
      });
    });
  });

  describe('isThemeVersion', () => {
    const themeWithoutVersion = TestTheme;
    const theme5_5 = applyMarkers(ThemeFactory.create({}, TestTheme), [markThemeVersion('5.5')]);

    test('no version should always return false', () => {
      expect(isThemeVersion(themeWithoutVersion, '5.0')).toBe(false);
      expect(isThemeVersion(themeWithoutVersion, '0.0')).toBe(false);
      expect(isThemeVersion(themeWithoutVersion, '6.0')).toBe(false);
    });

    test('5_5 should BE greater or equal that 5_0', () => {
      expect(isThemeVersion(theme5_5, '5.0')).toBe(true);
    });

    test('5_5 should BE greater or equal that 5_5', () => {
      expect(isThemeVersion(theme5_5, '5.5')).toBe(true);
    });

    test('5_5 should BE greater or equal that 4_0', () => {
      expect(isThemeVersion(theme5_5, '4.0')).toBe(true);
    });

    test('5_5 should NOT BE greater or equal that 5_6', () => {
      expect(isThemeVersion(theme5_5, '5.6')).toBe(false);
    });

    test('5_5 should NOT BE greater or equal that 6_0', () => {
      expect(isThemeVersion(theme5_5, '6.0')).toBe(false);
    });
  });

  describe('isVersionGTE', () => {
    test.each`
      v1           | v2           | result
      ${null}      | ${null}      | ${false}
      ${undefined} | ${undefined} | ${false}
      ${''}        | ${''}        | ${false}
      ${'-'}       | ${'-'}       | ${false}
      ${'1'}       | ${'1'}       | ${false}
      ${null}      | ${'1.0'}     | ${false}
      ${undefined} | ${'1.0'}     | ${false}
      ${''}        | ${'1.0'}     | ${false}
      ${'-'}       | ${'1.0'}     | ${false}
      ${'-.-'}     | ${'1.0'}     | ${false}
      ${'1'}       | ${'1.0'}     | ${false}
      ${'1.0'}     | ${null}      | ${false}
      ${'1.0'}     | ${undefined} | ${false}
      ${'1.0'}     | ${''}        | ${false}
      ${'1.0'}     | ${'-'}       | ${false}
      ${'1.0'}     | ${'-.-'}     | ${false}
      ${'1.0'}     | ${'1'}       | ${false}
      ${'-.-'}     | ${'-.-'}     | ${false}
      ${'0_0'}     | ${'0_0'}     | ${false}
      ${'0.0'}     | ${'0.0'}     | ${true}
      ${'1.0'}     | ${'1.0'}     | ${true}
      ${'1.1'}     | ${'1.1'}     | ${true}
      ${'1.0'}     | ${'1.1'}     | ${false}
      ${'1.0'}     | ${'2.0'}     | ${false}
      ${'1.0'}     | ${'0.0'}     | ${true}
      ${'1.0'}     | ${'0.1'}     | ${true}
      ${'2.0'}     | ${'1.0'}     | ${true}
      ${'2.1'}     | ${'2.0'}     | ${true}
      ${'2.10'}    | ${'2.2'}     | ${true}
    `('isVersionGTE($v1, $v2) returns $result', ({ v1, v2, result }) => {
      expect(isVersionGTE(v1, v2)).toBe(result);
    });
  });
});
