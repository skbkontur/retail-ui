import { isDarkTheme, isThemeVersionGTE } from '../../ThemeHelpers';
import { DARK_THEME } from '../DarkTheme';
import { DARK_THEME_5_0 } from '../DarkTheme5_0';
import { DARK_THEME_5_1 } from '../DarkTheme5_1';
import { LIGHT_THEME } from '../LightTheme';
import { LIGHT_THEME_5_0 } from '../LightTheme5_0';
import { LIGHT_THEME_5_1 } from '../LightTheme5_1';

describe('Themes', () => {
  describe('LIGHT_THEME', () => {
    test('should be equal LIGHT_THEME_5_0', () => {
      expect(LIGHT_THEME).toBe(LIGHT_THEME_5_0);
    });
  });

  describe('LIGHT_THEME_5_0', () => {
    test('should be 5.0 version', () => {
      expect(isThemeVersionGTE(LIGHT_THEME_5_0, 5.0)).toBe(true);
      expect(isThemeVersionGTE(LIGHT_THEME_5_0, 5.1)).toBe(false);
    });
    test('should not be dark', () => {
      expect(isDarkTheme(LIGHT_THEME_5_0)).toBe(false);
    });
  });

  describe('LIGHT_THEME_5_1', () => {
    test('should be 5.1 version', () => {
      expect(isThemeVersionGTE(LIGHT_THEME_5_1, 5.0)).toBe(true);
      expect(isThemeVersionGTE(LIGHT_THEME_5_1, 5.1)).toBe(true);
    });
    test('should not be dark', () => {
      expect(isDarkTheme(LIGHT_THEME_5_1)).toBe(false);
    });
  });

  describe('DARK_THEME', () => {
    test('should be equal DARK_THEME_5_0', () => {
      expect(DARK_THEME).toBe(DARK_THEME_5_0);
    });
  });

  describe('DARK_THEME_5_0', () => {
    test('should be 5.0 version', () => {
      expect(isThemeVersionGTE(DARK_THEME_5_0, 5.0)).toBe(true);
      expect(isThemeVersionGTE(DARK_THEME_5_0, 5.1)).toBe(false);
    });
    test('should be dark', () => {
      expect(isDarkTheme(DARK_THEME_5_0)).toBe(true);
    });
  });

  describe('DARK_THEME_5_1', () => {
    test('should be 5.1 version', () => {
      expect(isThemeVersionGTE(DARK_THEME_5_1, 5.0)).toBe(true);
      expect(isThemeVersionGTE(DARK_THEME_5_1, 5.1)).toBe(true);
    });
    test('should be dark', () => {
      expect(isDarkTheme(DARK_THEME_5_1)).toBe(true);
    });
  });
});
