import { BasicLightTheme } from '../../internal/themes/BasicLightTheme';
import type { NoInfer } from '../utils';
import { isNonNullable } from '../utils';

import type { Theme, ThemeIn } from './Theme';
import { findPropertyDescriptor, REACT_UI_THEME_MARKERS } from './ThemeHelpers';

export class ThemeFactory {
  public static create<T>(theme: ThemeIn & NoInfer<T>, baseTheme?: Theme): Readonly<Theme & NoInfer<T>> {
    const base = baseTheme || BasicLightTheme;
    return this.constructTheme(base, theme);
  }

  public static overrideBaseTheme(theme: Theme) {
    // copying theme variables
    ThemeFactory.getKeys(BasicLightTheme).forEach((variableName) => {
      const descriptor = findPropertyDescriptor(theme, variableName);
      Object.defineProperty(BasicLightTheme, variableName, descriptor);
    });

    // copying theme markers
    Object.values(REACT_UI_THEME_MARKERS).forEach((marker) => {
      const descriptor = findPropertyDescriptor(theme, marker.key);
      Object.defineProperty(BasicLightTheme, marker.key, descriptor);
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
