import * as colors from '@skbkontur/colors/tokens-default/dark';

import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_0 } from './DarkTheme6_0.js';

export const DarkTheme6_1 = createTheme({
  themeClass: class DarkTheme6_1 extends BasicThemeClassForExtension {
    public static inputCounterColor = colors.textNeutralSoft;
    public static inputCounterHelpIconColor = colors.textNeutralSoft;

    public static textareaCounterBg = colors.surfaceBase;
    public static textareaCounterHelpIconColor = colors.textNeutralSoft;

    public static mobilePopupContainerBorderRadius = '8px';

    public static mobileMediaQuery: string = '(max-width: 767.98px)';

    public static modalBg = colors.surfaceBase;

    public static sidePageBgDefault = colors.surfaceBase;
  },
  prototypeTheme: DarkTheme6_0,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.1')],
});
