import { ThemeFactory } from '../ThemeFactory';
import { OldColorsThemeInternal } from '../../../internal/themes/OldColors';
import { markAs8pxTheme, markAsFlatTheme } from '../ThemeHelpers';

export const FLAT_THEME = ThemeFactory.create({}, markAs8pxTheme(markAsFlatTheme(OldColorsThemeInternal)));
