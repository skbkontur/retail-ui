import { render } from '@testing-library/react';
import React from 'react';

import { ThemeContext } from '../ThemeContext';
import { applyMarkers, createThemeFromClass, Marker, REACT_UI_THEME_MARKERS } from '../ThemeHelpers';
import { ThemeFactory } from '../ThemeFactory';
import { Theme } from '../Theme';
import { AnyObject } from '../../utils';
import { AbstractTheme, AbstractThemeClass } from '../../../internal/themes/AbstractTheme';

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
  class extends (class {} as typeof AbstractThemeClass) {
    public static bgDefault = 'default';
    public static bgSecondary = 'default';
  },
  { prototypeTheme: AbstractTheme },
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
        expect(theme.black).toEqual(AbstractTheme.black);
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
      const keys_2 = ThemeFactory.getKeys(AbstractTheme);

      expect(keys_1).toEqual(keys_2);
    });
  });
  describe('applyMarkers() should mark theme', () => {
    test('should mark custom theme', () => {
      const theme = applyMarkers(ThemeFactory.create(myTheme), [markAsTest]);

      expect(isTestTheme(theme)).toBeTruthy();
    });
  });
});
