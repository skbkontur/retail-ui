import { DEFAULT_THEME as DefaultTheme } from './themes/DefaultTheme';
import { Theme, ThemeIn } from './Theme';

const IS_THEME_KEY = '__IS_REACT_UI_THEME__';

export class ThemeFactory {
  public static create(theme: ThemeIn) {
    const newTheme = Object.create(DefaultTheme) as Theme;
    this.constructTheme(newTheme, theme);
    return Object.freeze(newTheme);
  }

  public static isFullTheme(theme: ThemeIn | Theme): theme is Theme {
    // @ts-ignore
    return theme[IS_THEME_KEY] === true;
  }

  public static getDefaultTheme() {
    return this.defaultTheme;
  }

  public static overrideDefaultTheme(theme: ThemeIn) {
    this.constructTheme(this.defaultTheme, theme);
  }

  public static getKeys(theme: Theme) {
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

  private static defaultTheme: Theme = Object.create(DefaultTheme);

  private static constructTheme(base: Theme, theme: ThemeIn) {
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
