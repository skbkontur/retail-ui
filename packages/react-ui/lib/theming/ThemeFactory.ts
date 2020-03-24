import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';

import { Theme, ThemeIn } from './Theme';
import { clearCache } from './Emotion';

const IS_THEME_KEY = '__IS_REACT_UI_THEME__';

Object.defineProperty(DefaultThemeInternal, IS_THEME_KEY, {
  value: true,
  writable: false,
  enumerable: false,
  configurable: false,
});

export class ThemeFactory {
  public static create<T extends {}>(theme: ThemeIn & T): Readonly<Theme & T> {
    clearCache();
    return Object.freeze(Object.setPrototypeOf(theme, DefaultThemeInternal));
  }

  public static isFullTheme(theme: ThemeIn | Theme): theme is Theme {
    // @ts-ignore
    return theme[IS_THEME_KEY] === true;
  }

  public static overrideDefaultTheme(theme: ThemeIn) {
    Object.keys(theme).forEach(variableName => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variableName)!;
      Object.defineProperty(DefaultThemeInternal, variableName, descriptor);
    });
  }

  public static getKeys<T extends Theme>(theme: T) {
    const keys: Array<keyof T> = [];
    while (theme != null) {
      (Object.keys(theme) as Array<keyof T>).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      theme = Object.getPrototypeOf(theme);
    }
    return keys.sort();
  }
}
