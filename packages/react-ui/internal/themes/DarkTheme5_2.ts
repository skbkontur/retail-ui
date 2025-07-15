import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_1 } from './DarkTheme5_1';

export const DarkTheme5_2 = createTheme({
  themeClass: class DarkTheme5_1 extends BasicThemeClassForExtension {
    public static kebabBackgroundHover = 'rgba(255, 255, 255, 0.1)';
    public static kebabBackgroundActive = 'rgba(255, 255, 255, 0.06)';
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
  prototypeTheme: DarkTheme5_1,
  themeMarkers: [markThemeVersion('5.2')],
});
