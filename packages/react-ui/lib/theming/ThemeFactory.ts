import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';

import { Theme, ThemeIn } from './Theme';
import { findPropertyDescriptor } from './ThemeHelpers';

// Allows to disable type infering for generic types
type NoInfer<T> = [T][T extends unknown ? 0 : never];
export class ThemeFactory {
  public static create<T extends Record<string, unknown>>(
    theme: ThemeIn & NoInfer<T>,
    baseTheme?: Theme,
  ): Readonly<Theme & NoInfer<T>> {
    const base = baseTheme || DefaultThemeInternal;
    return this.constructTheme(base, theme);
  }

  public static overrideDefaultTheme(theme: Theme) {
    ThemeFactory.getKeys(DefaultThemeInternal).forEach((variableName) => {
      const descriptor = findPropertyDescriptor(theme, variableName);
      Object.defineProperty(DefaultThemeInternal, variableName, descriptor);
    });
  }

  public static getKeys<T extends Theme>(theme: T) {
    const keys: Array<keyof T> = [];
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
