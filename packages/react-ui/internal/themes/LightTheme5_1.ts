import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_0 } from './LightTheme5_0';

export const LightTheme5_1 = createThemeFromClass(
  class LightTheme5_1 extends BasicThemeClassForExtension {
    public static modalCloseButtonClickAreaTop = '30px';
    public static modalCloseButtonClickAreaBottom = '22px';
    public static modalCloseButtonClickAreaLeft = '24px';
    public static modalCloseButtonClickAreaRight = '28px';
    public static get mobileModalCloseButtonRightPadding() {
      return this.mobileModalCloseButtonClickArea;
    }
    public static get mobileModalCloseButtonTopPadding() {
      return this.mobileModalCloseButtonClickArea;
    }
    public static mobileModalCloseButtonClickArea = '22px';
    public static sidePageHeaderStickyOffset = '10px';
    public static get mobileSidePageCloseButtonPadding() {
      return this.mobileSidePageCloseButtonClickArea;
    }
    public static get sidePageCloseButtonClickAreaTop() {
      return this.modalCloseButtonClickAreaTop;
    }
    public static get sidePageCloseButtonClickAreaBottom() {
      return this.modalCloseButtonClickAreaBottom;
    }
    public static get sidePageCloseButtonClickAreaLeft() {
      return this.modalCloseButtonClickAreaLeft;
    }
    public static get sidePageCloseButtonClickAreaRight() {
      return this.modalCloseButtonClickAreaRight;
    }
    public static mobileSidePageCloseButtonClickArea = '22px';
    public static sidePageCloseButtonWrapperFixedOffsetTop = '4px';
    public static sidePageCloseButtonWrapperOffsetTop = '2px';
  },
  {
    prototypeTheme: LightTheme5_0,
    themeMarkers: [markThemeVersion(5, 1)],
  },
);
