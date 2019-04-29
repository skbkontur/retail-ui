import defaultThemeVariables from '../../themes/DefaultTheme';
import flatThemeVariables from '../../themes/FlatTheme';

type ThemeType = typeof defaultThemeVariables & typeof flatThemeVariables;
type ThemeInType = Partial<ThemeType>;

export interface ITheme extends ThemeType {}
export interface IThemeIn extends ThemeInType {}

export default class ThemeFactory {
  public static create(...themes: IThemeIn[]): ITheme {
    return Object.freeze(Object.assign({}, defaultThemeVariables, ...themes)) as any;
  }

  public static getDefaultTheme(): ITheme {
    return this.defaultTheme as any;
  }

  private static defaultTheme = Object.freeze(Object.assign({}, defaultThemeVariables));
}
