import { render } from '@testing-library/react';
import React from 'react';

import { ThemeContext } from '../ThemeContext';
import { exposeGetters, Marker, REACT_UI_THEME_MARKERS } from '../ThemeHelpers';
import { ThemeFactory } from '../ThemeFactory';
import { Theme } from '../Theme';
import { DefaultTheme, DefaultThemeInternal } from '../../../internal/themes/DefaultTheme';
import { AnyObject } from '../../utils';

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
const BaseThemeInternal = Object.setPrototypeOf(
  exposeGetters({ bgDefault: 'default', bgSecondary: 'default' }),
  DefaultThemeInternal,
);

// test marker
const markAsTest: Marker = (theme) => {
  Object.defineProperty(theme, TEST_MARKERS.test.key, {
    value: TEST_MARKERS.test.value,
    writable: false,
    enumerable: false,
    configurable: false,
  });
};
const isTestTheme = (theme: AnyObject): boolean => {
  return theme[TEST_MARKERS.test.key] === TEST_MARKERS.test.value;
};

describe('ThemeFactory', () => {
  describe('create() should return inherited theme', () => {
    test('with args [theme]', () => {
      const theme = ThemeFactory.create(myTheme);

      expect(theme.brand).toEqual(myTheme.brand);
      expect(theme.black).toEqual(DefaultThemeInternal.black);
    });
    test('with args [theme, baseTheme]', () => {
      const theme = ThemeFactory.create(myTheme, BaseThemeInternal);

      expect(theme.brand).toEqual(myTheme.brand);
      expect(theme.bgSecondary).toEqual(BaseThemeInternal.bgSecondary);
    });
    test('with args [theme, baseTheme, markers]', () => {
      const theme = ThemeFactory.create(myTheme, BaseThemeInternal, [markAsTest]);

      expect(theme.brand).toEqual(myTheme.brand);
      expect(theme.bgSecondary).toEqual(BaseThemeInternal.bgSecondary);
      expect(isTestTheme(theme)).toBeTruthy();
    });
    test('with args [theme, markers]', () => {
      const theme = ThemeFactory.create(myTheme, [markAsTest]);

      expect(theme.brand).toEqual(myTheme.brand);
      expect(isTestTheme(theme)).toBeTruthy();
    });
  });
  describe('overrideDefaultTheme()', () => {
    test('markers should be overridden', () => {
      const theme = ThemeFactory.create(myTheme, BaseThemeInternal, [markAsTest]);

      ThemeFactory.overrideDefaultTheme(theme);

      const consumedTheme = getConsumedTheme();

      expect(isTestTheme(consumedTheme)).toBeTruthy();
    });
    test('variables should be overridden', () => {
      ThemeFactory.overrideDefaultTheme(ThemeFactory.create(myTheme));

      const consumedTheme = getConsumedTheme();

      expect(consumedTheme.brand).toEqual(myTheme.brand);
      expect(consumedTheme.bgDefault).toEqual(myTheme.bgDefault);
    });
  });
  test('getKeys()', () => {
    const keys_1 = ThemeFactory.getKeys(BaseThemeInternal);
    const keys_2 = ThemeFactory.getKeys(DefaultTheme);

    expect(keys_1).toEqual(keys_2);
  });
});
