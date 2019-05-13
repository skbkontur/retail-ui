import defaultThemeVariables from './themes/DefaultTheme';
import flatThemeVariables from './themes/FlatTheme';
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

  private static keys: IThemeIn[] = [];
  private static values: ITheme[] = [];
}

export default class ThemeFactory {
  public static create(theme: IThemeIn) {
    return Object.freeze(Object.assign({}, defaultThemeVariables, theme)) as ITheme;
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

  public static getFlatTheme() {
    return this.flatTheme;
  }

  public static overrideDefaultTheme(...themes: IThemeIn[]) {
    themes.forEach(themePartial => {
      Object.keys(themePartial).forEach(variableName => {
        const descriptor = Object.getOwnPropertyDescriptor(themePartial, variableName)!;
        Object.defineProperty(this.defaultTheme, variableName, descriptor);
      });
    });
  }

  private static defaultTheme = Object.assign({}, defaultThemeVariables) as ITheme;
  private static flatTheme = Object.assign({}, flatThemeVariables) as ITheme;
}
