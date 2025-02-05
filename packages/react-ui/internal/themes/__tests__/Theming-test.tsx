import { render } from '@testing-library/react';
import React from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
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
} from '../../../lib/theming/ThemeHelpers';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Theme } from '../../../lib/theming/Theme';
import { AnyObject } from '../../../lib/utils';
import { BasicTheme, BasicThemeClass } from '../BasicTheme';

const TEST_MARKERS = {
  test: {
    key: '__REACT_UI_TEST_KEY__',
    value: true,
  },
};

// @ts-expect-error: extension for test
REACT_UI_THEME_MARKERS.test = TEST_MARKERS.test;

const getConsumedTheme = () => {
  let _theme: Theme;
  render(
    <ThemeContext.Consumer>
      {(theme) => {
        _theme = theme;
        return null;
      }}
    </ThemeContext.Consumer>,
  );
  // @ts-expect-error: render is sync
  return _theme;
};

// test theme
const myTheme = { brand: 'custom', bgDefault: 'custom' } as const;
const TestTheme = createThemeFromClass(
  class extends (class {} as typeof BasicThemeClass) {
    public static bgDefault = 'default';
    public static bgSecondary = 'default';
  },
  { prototypeTheme: BasicTheme },
);

// test marker
const markAsTest: Marker = (theme) => {
  return Object.create(theme, {
    [TEST_MARKERS.test.key]: {
      value: TEST_MARKERS.test.value,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};
const isTestTheme = (theme: AnyObject): boolean => {
  return theme[TEST_MARKERS.test.key] === TEST_MARKERS.test.value;
};

markAsTest(TestTheme);

describe('Theming', () => {
  describe('ThemeFactory', () => {
    describe('create() should return inherited theme', () => {
      test('with args [theme]', () => {
        const theme = ThemeFactory.create(myTheme);

        expect(theme.brand).toEqual(myTheme.brand);
        expect(theme.black).toEqual(BasicTheme.black);
      });
      test('with args [theme, baseTheme]', () => {
        const theme = ThemeFactory.create(myTheme, TestTheme);

        expect(theme.brand).toEqual(myTheme.brand);
        expect(theme.bgSecondary).toEqual(TestTheme.bgSecondary);
      });
    });
    describe('overrideDefaultTheme()', () => {
      test('markers should be overridden', () => {
        const theme = applyMarkers(ThemeFactory.create(myTheme, TestTheme), [markAsTest]);

        ThemeFactory.overrideBaseTheme(theme);

        const consumedTheme = getConsumedTheme();

        expect(isTestTheme(consumedTheme)).toBeTruthy();
      });
      test('variables should be overridden', () => {
        ThemeFactory.overrideBaseTheme(ThemeFactory.create(myTheme));

        const consumedTheme = getConsumedTheme();

        expect(consumedTheme.brand).toEqual(myTheme.brand);
        expect(consumedTheme.bgDefault).toEqual(myTheme.bgDefault);
      });
    });
    test('getKeys()', () => {
      const keys_1 = ThemeFactory.getKeys(TestTheme);
      const keys_2 = ThemeFactory.getKeys(BasicTheme);

      expect(keys_1).toEqual(keys_2);
    });
  });

  describe('exposeGetters', () => {
    const theme = class extends (class {} as typeof BasicThemeClass) {
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
      class extends (class {} as typeof BasicThemeClass) {
        public static get errorText() {
          return this.black + this.blue;
        }
      },
      { prototypeTheme: BasicTheme, themeMarkers: [markAsDarkTheme, markThemeVersion(1.0)] },
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
        expect(isThemeVersionGTE(theme, 1.0)).toBe(true);
      });
    });
  });

  describe('applyMarker', () => {
    test('test marker should mark custom theme', () => {
      const theme = applyMarkers(ThemeFactory.create(myTheme), [markAsTest]);
      expect(isTestTheme(theme)).toBeTruthy();
    });

    describe('isThemeVersionGTE', () => {
      const theme5_1 = applyMarkers(ThemeFactory.create(myTheme), [markThemeVersion(5.1)]);

      test('5.1 should BE greater or equal that 5.0', () => {
        expect(isThemeVersionGTE(theme5_1, 5.0)).toBe(true);
      });

      test('5.1 should BE greater or equal that 5.1', () => {
        expect(isThemeVersionGTE(theme5_1, 5.1)).toBe(true);
      });

      test('5.1 should NOT BE greater or equal that 5.2', () => {
        expect(isThemeVersionGTE(theme5_1, 5.2)).toBe(false);
      });
    });

    describe('isDarkTheme', () => {
      const lightTheme = applyMarkers(ThemeFactory.create(myTheme), []);
      const darkTheme = applyMarkers(ThemeFactory.create(myTheme), [markAsDarkTheme]);

      test('light theme should NOT BE dark', () => {
        expect(isDarkTheme(lightTheme)).toBe(false);
      });

      test('dark theme should BE dark', () => {
        expect(isDarkTheme(darkTheme)).toBe(true);
      });
    });
  });
});
