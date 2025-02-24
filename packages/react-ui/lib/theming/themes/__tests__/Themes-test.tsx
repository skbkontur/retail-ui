import { isDarkTheme, isThemeVersionGTE } from '../../ThemeHelpers';
import { DARK_THEME, DARK_THEME_5_0, DARK_THEME_5_1 } from '../DarkTheme';
import { LIGHT_THEME, LIGHT_THEME_5_0, LIGHT_THEME_5_1 } from '../LightTheme';

describe('Themes', () => {
  describe('LIGHT_THEME', () => {
    test('should be equal LIGHT_THEME_5_0', () => {
      expect(LIGHT_THEME).toBe(LIGHT_THEME_5_0);
    });
  });

  describe('LIGHT_THEME_5_0', () => {
    test('should be 5_0 version', () => {
      expect(isThemeVersionGTE(LIGHT_THEME_5_0, 5, 0)).toBe(true);
      expect(isThemeVersionGTE(LIGHT_THEME_5_0, 5, 1)).toBe(false);
    });
    test('should not be dark', () => {
      expect(isDarkTheme(LIGHT_THEME_5_0)).toBe(false);
    });
  });

  describe('LIGHT_THEME_5_1', () => {
    test('should be 5_1 version', () => {
      expect(isThemeVersionGTE(LIGHT_THEME_5_1, 5, 0)).toBe(true);
      expect(isThemeVersionGTE(LIGHT_THEME_5_1, 5, 1)).toBe(true);
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
    test('should be 5_0 version', () => {
      expect(isThemeVersionGTE(DARK_THEME_5_0, 5, 0)).toBe(true);
      expect(isThemeVersionGTE(DARK_THEME_5_0, 5, 1)).toBe(false);
    });
    test('should be dark', () => {
      expect(isDarkTheme(DARK_THEME_5_0)).toBe(true);
    });
  });

  describe('DARK_THEME_5_1', () => {
    test('should be 5_1 version', () => {
      expect(isThemeVersionGTE(DARK_THEME_5_1, 5, 0)).toBe(true);
      expect(isThemeVersionGTE(DARK_THEME_5_1, 5, 1)).toBe(true);
    });
    test('should be dark', () => {
      expect(isDarkTheme(DARK_THEME_5_1)).toBe(true);
    });
  });
});
