import { ThemeFactory } from '../ThemeFactory';
import { OldColorsThemeInternal } from '../../../internal/themes/OldColors';
import { DefaultThemeInternal } from '../../../internal/themes/DefaultTheme';

export const FLAT_THEME_8PX_OLD = ThemeFactory.create(OldColorsThemeInternal, DefaultThemeInternal);
