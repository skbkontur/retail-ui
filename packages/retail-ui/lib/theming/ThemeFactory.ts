import defaultThemeVariables from "../../themes/DefaultTheme";
import { ITheme, IThemeIn } from "./Theme";

export default class ThemeFactory {
  public static create(...themes: IThemeIn[]): ITheme {
    return Object.freeze(Object.assign({}, defaultThemeVariables, ...themes)) as any;
  }

  public static getDefaultTheme(): ITheme {
    return this.defaultTheme as any;
  }

  private static defaultTheme = Object.freeze(Object.assign({}, defaultThemeVariables));
}
