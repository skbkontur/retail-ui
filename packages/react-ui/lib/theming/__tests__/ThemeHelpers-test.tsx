import {
  applyMarkers,
  createThemeFromClass,
  exposeGetters,
  isDarkTheme,
  isThemeVersionGTE,
  markAsDarkTheme,
  Marker,
  markThemeVersion,
  REACT_UI_THEME_MARKERS,
} from '../ThemeHelpers';
import { ThemeFactory } from '../ThemeFactory';
import { AnyObject } from '../../utils';
import { BasicTheme, BasicThemeClassForExtension } from '../../../internal/themes/BasicTheme';

const TestTheme = createThemeFromClass(
  class extends BasicThemeClassForExtension {
    public static bgDefault = 'default';
    public static bgSecondary = 'default';
  },
  { prototypeTheme: BasicTheme },
);

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

  describe('createThemeFromClass', () => {
    const theme = createThemeFromClass(
      class extends BasicThemeClassForExtension {
        public static get errorText() {
          return this.black + this.blue;
        }
      },
      { prototypeTheme: BasicTheme, themeMarkers: [markAsDarkTheme, markThemeVersion(1, 0)] },
    );

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
        expect(isThemeVersionGTE(theme, 1, 0)).toBe(true);
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

    describe('isThemeVersionGTE', () => {
      const theme5_1 = applyMarkers(ThemeFactory.create(TestTheme), [markThemeVersion(5, 1)]);

      test('5_1 should BE greater or equal that 5_0', () => {
        expect(isThemeVersionGTE(theme5_1, 5, 0)).toBe(true);
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

  describe('isThemeVersionGTE', () => {
    const themeWithoutVersion = TestTheme;
    const theme5_5 = applyMarkers(ThemeFactory.create({}, TestTheme), [markThemeVersion(5, 5)]);

    test('no version should always return false', () => {
      expect(isThemeVersionGTE(themeWithoutVersion, 5, 0)).toBe(false);
      expect(isThemeVersionGTE(themeWithoutVersion, 0, 0)).toBe(false);
      expect(isThemeVersionGTE(themeWithoutVersion, 6, 0)).toBe(false);
    });

    test('5_5 should BE greater or equal that 5_0', () => {
      expect(isThemeVersionGTE(theme5_5, 5, 0)).toBe(true);
    });

    test('5_5 should BE greater or equal that 5_5', () => {
      expect(isThemeVersionGTE(theme5_5, 5, 5)).toBe(true);
    });

    test('5_5 should BE greater or equal that 4_0', () => {
      expect(isThemeVersionGTE(theme5_5, 4, 0)).toBe(true);
    });

    test('5_5 should NOT BE greater or equal that 5_6', () => {
      expect(isThemeVersionGTE(theme5_5, 5, 6)).toBe(false);
    });

    test('5_5 should NOT BE greater or equal that 6_0', () => {
      expect(isThemeVersionGTE(theme5_5, 6, 0)).toBe(false);
    });
  });
});
