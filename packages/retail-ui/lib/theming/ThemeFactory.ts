import DefaultTheme from './themes/DefaultTheme';
import { ITheme, IThemeIn } from './Theme';
import { isDevelopmentEnv } from '../../components/internal/currentEnvironment';
import isEqual from 'lodash.isequal';
import warning from 'warning';

class ThemesCache {
  public static has(key: IThemeIn) {
    const hasKey = this.keys.includes(key);

    if (!hasKey && isDevelopmentEnv) {
      const hasSameShape = this.keys.some(themeIn => isEqual(key, themeIn));
      warning(
        !hasSameShape,
        `ThemesCache already has object with shape: ${JSON.stringify(key)}.` +
          '\n' +
          `Consider using the same object reference for performance reasons`,
      );
    }

    return hasKey;
  }

  public static get(key: IThemeIn) {
    const index = this.keys.indexOf(key);
    return this.values[index];
  }

  public static set(key: IThemeIn, value: ITheme) {
    this.keys.push(key);
    this.values.push(value);
  }

  private static keys: Array<Readonly<IThemeIn>> = [];
  private static values: Array<Readonly<ITheme>> = [];
}

export default class ThemeFactory {
  public static create(theme: IThemeIn) {
    const newTheme = Object.create(DefaultTheme) as ITheme;
    this.constructTheme(newTheme, theme);
    return Object.freeze(newTheme);
  }

  public static getOrCreate(theme: IThemeIn) {
    if (!ThemesCache.has(theme)) {
      const fullTheme = this.create(theme);
      ThemesCache.set(theme, fullTheme);
    }

    return ThemesCache.get(theme);
  }

  public static getDefaultTheme() {
    return this.defaultTheme;
  }

  public static overrideDefaultTheme(theme: IThemeIn) {
    this.constructTheme(this.defaultTheme, theme);
  }

  public static getKeys(theme: ITheme) {
    const keys: string[] = [];
    for (; theme != null; theme = Object.getPrototypeOf(theme)) {
      Object.keys(theme).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
    }
    return keys.sort();
  }

  private static defaultTheme: ITheme = Object.create(DefaultTheme);

  private static constructTheme(base: ITheme, theme: IThemeIn) {
    Object.keys(theme).forEach(variableName => {
      const descriptor = Object.getOwnPropertyDescriptor(theme, variableName)!;
      Object.defineProperty(base, variableName, descriptor);
    });
  }
}
