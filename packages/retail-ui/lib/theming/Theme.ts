import defaultThemeVariables from '../../themes/DefaultTheme';
import flatThemeVariables from '../../themes/FlatTheme';

type ThemeType = typeof defaultThemeVariables & typeof flatThemeVariables;
type ThemeInType = Partial<ThemeType>;

export interface ITheme extends ThemeType {}

export interface IThemeIn extends ThemeInType {}
