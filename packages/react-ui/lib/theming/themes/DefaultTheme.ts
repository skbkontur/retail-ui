import { ThemeFactory } from '../ThemeFactory';
import { NotFlatThemeInternal } from '../../../internal/themes/NotFlat';
import { OldColorsThemeInternal } from '../../../internal/themes/OldColors';
import { markAs8pxTheme } from '../ThemeHelpers';

export const DEFAULT_THEME = ThemeFactory.create(NotFlatThemeInternal, markAs8pxTheme(OldColorsThemeInternal));
