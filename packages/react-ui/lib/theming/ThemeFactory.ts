import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';
import { Theme8pxInternal } from '../../internal/themes/Theme8px';

import { Theme, ThemeIn } from './Theme';
import { isFullTheme, markAs8pxTheme } from './ThemeHelpers';

export class ThemeFactory {
  public static create<T extends {}>(theme: ThemeIn & T, baseTheme?: Theme): Readonly<Theme & T> {
    const base = baseTheme || markAs8pxTheme(this.constructTheme(DefaultThemeInternal, Theme8pxInternal));
    return this.constructTheme(base, theme);
  }

  public static isFullTheme(theme: ThemeIn | Theme): theme is Theme {
    return isFullTheme(theme);
  }

  public static overrideDefaultTheme(theme: ThemeIn) {
    Object.keys(theme).forEach((variableName) => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variableName)!;
      Object.defineProperty(DefaultThemeInternal, variableName, descriptor);
    });
  }

  public static getKeys<T extends Theme>(theme: T) {
    const keys: Array<keyof T> = [];
    while (theme != null) {
      (Object.keys(theme) as Array<keyof T>).forEach((key) => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      theme = Object.getPrototypeOf(theme);
    }
    return keys.sort();
  }

  private static constructTheme(base: Theme, theme: ThemeIn) {
    const newTheme = Object.create(base);
    Object.keys(theme).forEach((propName) => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, propName)!;
      Object.defineProperty(newTheme, propName, descriptor);
    });

    return Object.freeze(newTheme);
  }
}
