import { FlatThemeInternal } from '../../../internal/themes/FlatTheme';
import { FLAT_THEME_HASH } from '../Theme';
import { ThemeFactory } from '../ThemeFactory';

export const FLAT_THEME = ThemeFactory.create(FlatThemeInternal, FLAT_THEME_HASH);
