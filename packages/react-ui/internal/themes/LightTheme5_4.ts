import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_3 } from './LightTheme5_3';
import { themeTokens5_4 } from './consts';

export const LightTheme5_4 = createTheme({
  themeClass: class LightTheme5_4 extends BasicThemeClassForExtension {
    public static textareaMargin = themeTokens5_4.textareaMargin;
    public static clearCrossIconWidthSmall = themeTokens5_4.clearCrossIconWidthSmall;
    public static clearCrossIconWidthMedium = themeTokens5_4.clearCrossIconWidthMedium;
    public static clearCrossIconWidthLarge = themeTokens5_4.clearCrossIconWidthLarge;
    public static clearCrossIconAlign = themeTokens5_4.clearCrossIconAlign;
    public static textareaVerticalAlign = themeTokens5_4.textareaVerticalAlign;
  },
  prototypeTheme: LightTheme5_3,
  themeMarkers: [markThemeVersion('5.4')],
});
