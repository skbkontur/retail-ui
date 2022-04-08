import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';

import { Theme, ThemeIn } from './Theme';

export class ThemeFactory {
  public static create<T extends {}>(theme: ThemeIn & T, baseTheme?: Theme): Readonly<Theme & T> {
    const base = baseTheme || DefaultThemeInternal;
    return this.constructTheme(base, theme);
  }

  public static overrideDefaultTheme(theme: ThemeIn) {
    Object.keys(theme).forEach((variableName) => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variableName)!;
      Object.defineProperty(DefaultThemeInternal, variableName, descriptor);
    });
  }

  public static getKeys<T extends Theme>(theme: T) {
    const keys: (keyof T)[] = [];
    while (theme != null) {
      (Object.keys(theme) as typeof keys).forEach((key) => {
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
