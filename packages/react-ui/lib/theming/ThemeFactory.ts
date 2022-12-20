import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';
import { isNonNullable } from '../utils';

import { Theme, ThemeIn } from './Theme';
import { findPropertyDescriptor, Markers, REACT_UI_THEME_MARKERS } from './ThemeHelpers';

export class ThemeFactory {
  public static create<T extends unknown>(theme: ThemeIn & T): Readonly<Theme & T>;
  public static create<T extends unknown>(theme: ThemeIn & T, baseTheme: Theme): Readonly<Theme & T>;
  public static create<T extends unknown>(theme: ThemeIn & T, baseTheme: Theme, markers: Markers): Readonly<Theme & T>;
  public static create<T extends unknown>(theme: ThemeIn & T, markers: Markers): Readonly<Theme & T>;
  public static create<T extends unknown>(
    theme: ThemeIn & T,
    baseThemeOrMarkers?: Theme | Markers,
    markers?: Markers,
  ): Readonly<Theme & T> {
    const base = baseThemeOrMarkers && !Array.isArray(baseThemeOrMarkers) ? baseThemeOrMarkers : DefaultThemeInternal;
    // eslint-disable-next-line no-nested-ternary
    const _markers = Array.isArray(baseThemeOrMarkers) ? baseThemeOrMarkers : Array.isArray(markers) ? markers : [];
    return this.constructTheme(base, theme, _markers);
  }

  public static overrideDefaultTheme(theme: Theme) {
    // copying theme variables
    ThemeFactory.getKeys(DefaultThemeInternal).forEach((variableName) => {
      const descriptor = findPropertyDescriptor(theme, variableName);
      Object.defineProperty(DefaultThemeInternal, variableName, descriptor);
    });

    // copying theme markers
    Object.values(REACT_UI_THEME_MARKERS).forEach((marker) => {
      const descriptor = findPropertyDescriptor(theme, marker.key);
      Object.defineProperty(DefaultThemeInternal, marker.key, descriptor);
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

  private static constructTheme(base: Theme, theme: ThemeIn, markers: Markers) {
    const newTheme = Object.create(base);
    Object.keys(theme).forEach((propName) => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, propName);
      if (descriptor) {
        Object.defineProperty(newTheme, propName, descriptor);
      }
    });

    markers.forEach((marker) => marker(newTheme));

    return Object.freeze(newTheme);
  }
}
