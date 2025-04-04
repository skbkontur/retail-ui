import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_1 } from './LightTheme5_1';

export const LightTheme5_2 = createTheme({
  themeClass: class LightTheme5_2 extends BasicThemeClassForExtension {
    public static get mobileModalCloseButtonRightPadding() {
      return this.mobileModalCloseButtonClickArea;
    }
    public static get mobileModalCloseButtonTopPadding() {
      return this.mobileModalCloseButtonClickArea;
    }
    public static mobileModalCloseButtonClickArea = '22px';
    public static mobileModalBodyPadding = '0 16px 0 16px';
    public static mobileModalContainerMarginTop = '16px';
    public static mobileModalContainerMarginRight = '16px';
    public static mobileModalContainerMarginBottom = '16px';
    public static mobileModalContainerMarginLeft = '16px';

    public static miniModalMarginTopMobile = '16px';
    public static miniModalMarginLeftMobile = '16px';
    public static miniModalMarginRightMobile = '16px';
  },
  prototypeTheme: LightTheme5_1,
  themeMarkers: [markThemeVersion('5.2')],
});
