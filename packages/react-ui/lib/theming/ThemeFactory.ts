import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';
import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';
import { findPropertyDescriptor } from './ThemeHelpers';

export class ThemeFactory {
  public static create<T extends unknown>(theme: ThemeIn & T, baseTheme?: Theme): Readonly<Theme & T> {
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
    while (isNonNullable(theme)) {
      (Object.keys(theme) as typeof keys).forEach((key) => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      // TODO: Enable `no-param-reassign` rule.
      // eslint-disable-next-line no-param-reassign
      theme = Object.getPrototypeOf(theme);
    }

    return keys.sort();
  }

  private static constructTheme(base: Theme, theme: ThemeIn) {
    const newTheme = Object.create(base);
    Object.keys(theme).forEach((propName) => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, propName);
      if (descriptor) {
        Object.defineProperty(newTheme, propName, descriptor);
      }
    });

    return Object.freeze(newTheme);
  }
}
