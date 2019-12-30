import { DEFAULT_THEME as DefaultTheme } from './themes/DefaultTheme';
import { ITheme, IThemeIn } from './Theme';

const IS_THEME_KEY = '__IS_REACT_UI_THEME__';

export class ThemeFactory {
  public static create(theme: IThemeIn) {
    const newTheme = Object.create(DefaultTheme) as ITheme;
    this.constructTheme(newTheme, theme);
    return Object.freeze(newTheme);
  }

  public static isFullTheme(theme: IThemeIn | ITheme): theme is ITheme {
    // @ts-ignore
    return theme[IS_THEME_KEY] === true;
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
    Object.defineProperty(base, IS_THEME_KEY, {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }
}
