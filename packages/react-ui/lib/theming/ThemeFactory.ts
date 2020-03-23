import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';
import { getHashOfObject } from '../utils';

import { DEFAULT_THEME_HASH, Theme, ThemeIn } from './Theme';
import { deleteCache, setCache } from './ThemeCache';
import { overrideDefaultTheme } from './ThemeContext';

const IS_THEME_KEY = '__IS_REACT_UI_THEME__';

Object.defineProperty(DefaultThemeInternal, IS_THEME_KEY, {
  value: true,
  writable: false,
  enumerable: false,
  configurable: false,
});

export class ThemeFactory {
  public static create<T extends {}>(
    theme: ThemeIn & T,
    hash: string = getHashOfObject({ ...theme }),
  ): Readonly<Theme & T> {
    const newTheme = Object.setPrototypeOf(theme, DefaultThemeInternal);
    setCache(newTheme, hash);
    return Object.freeze(newTheme);
  }

  public static isFullTheme(theme: ThemeIn | Theme): theme is Theme {
    // @ts-ignore
    return theme[IS_THEME_KEY] === true;
  }

  public static overrideDefaultTheme(theme: ThemeIn) {
    deleteCache(DEFAULT_THEME_HASH);
    overrideDefaultTheme(theme);
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
