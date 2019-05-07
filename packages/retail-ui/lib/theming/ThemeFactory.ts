import defaultThemeVariables from './themes/DefaultTheme';
import { ITheme, IThemeIn } from './Theme';

export default class ThemeFactory {
  public static create(...themes: IThemeIn[]) {
    return Object.freeze(Object.assign({}, defaultThemeVariables, ...themes)) as ITheme;
  }

  public static getDefaultTheme() {
    return this.defaultTheme;
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
}
