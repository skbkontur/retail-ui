import * as colors from '@skbkontur/colors/tokens-default/light';

import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_0 } from './LightTheme6_0.js';

export const LightTheme6_1 = createTheme({
  themeClass: class LightTheme6_1 extends BasicThemeClassForExtension {
    public static textareaCounterBg = colors.surfaceBase;
    public static textareaCounterHelpIconColor = colors.textNeutralSoft;

    public static mobilePopupContainerBorderRadius = '8px';

    public static mobileMediaQuery: string = '(max-width: 767.98px)';
  },
  prototypeTheme: LightTheme6_0,
  themeMarkers: [markThemeVersion('6.1')],
});
