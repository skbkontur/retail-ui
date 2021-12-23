import { ThemeFactory } from '../ThemeFactory';
import { NotFlatThemeInternal } from '../../../internal/themes/NotFlat';
import { OldColorsThemeInternal } from '../../../internal/themes/OldColors';

export const DEFAULT_THEME_8PX_OLD = ThemeFactory.create(NotFlatThemeInternal, OldColorsThemeInternal);
