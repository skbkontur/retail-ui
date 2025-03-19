import {
  applyMarkers,
  createTheme,
  exposeGetters,
  isDarkTheme,
  isThemeGTE,
  markAsDarkTheme,
  Marker,
  markThemeVersion,
  REACT_UI_THEME_MARKERS,
} from '../ThemeHelpers';
import { ThemeVersions } from '../ThemeVersions';
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
        expect(isThemeGTE(theme, '5.0')).toBe(true);
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

    describe('isThemeGTE', () => {
      const theme5_1 = applyMarkers(ThemeFactory.create(TestTheme), [markThemeVersion('5.1')]);

      test('5_1 should BE greater or equal that 5_0', () => {
        expect(isThemeGTE(theme5_1, '5.0')).toBe(true);
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

  describe('isThemeGTE', () => {
    const themeWithoutVersion = TestTheme;
    const theme5_5 = applyMarkers(ThemeFactory.create({}, TestTheme), [markThemeVersion('5.5' as ThemeVersions)]);

    test('no version should always return false', () => {
      expect(isThemeGTE(themeWithoutVersion, '5.0')).toBe(false);
      expect(isThemeGTE(themeWithoutVersion, '0.0' as ThemeVersions)).toBe(false);
      expect(isThemeGTE(themeWithoutVersion, '6.0' as ThemeVersions)).toBe(false);
    });

    test('5_5 should BE greater or equal that 5_0', () => {
      expect(isThemeGTE(theme5_5, '5.0')).toBe(true);
    });

    test('5_5 should BE greater or equal that 5_5', () => {
      expect(isThemeGTE(theme5_5, '5.5' as ThemeVersions)).toBe(true);
    });

    test('5_5 should BE greater or equal that 4_0', () => {
      expect(isThemeGTE(theme5_5, '4.0' as ThemeVersions)).toBe(true);
    });

    test('5_5 should NOT BE greater or equal that 5_6', () => {
      expect(isThemeGTE(theme5_5, '5.6' as ThemeVersions)).toBe(false);
    });

    test('5_5 should NOT BE greater or equal that 6_0', () => {
      expect(isThemeGTE(theme5_5, '6.0' as ThemeVersions)).toBe(false);
    });
  });
});
