import { NewDefaultThemeInternal } from '../../../internal/themes/NewDefaultTheme';
import { ThemeFactory } from '../ThemeFactory';
import { markAs8pxTheme, markAsFlatTheme } from '../ThemeHelpers';

export const NEW_THEME = ThemeFactory.create({}, markAs8pxTheme(markAsFlatTheme(NewDefaultThemeInternal)));
