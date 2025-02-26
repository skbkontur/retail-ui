import { createThemeFromClass, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_0 } from './DarkTheme5_0';

export const DarkTheme5_1 = createThemeFromClass(
  class DarkTheme5_1 extends BasicThemeClassForExtension {
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
    public static get sidePageCloseButtonFixedClickAreaTop() {
      return this.sidePageCloseButtonFixedClickAreaBottom;
    }
    public static sidePageCloseButtonFixedClickAreaBottom = '14px';
    public static mobileSidePageCloseButtonClickArea = '22px';
    public static sidePageCloseButtonWrapperFixedOffsetTop = '4px';
    public static sidePageCloseButtonWrapperOffsetTop = '2px';
  },
  {
    prototypeTheme: DarkTheme5_0,
    themeMarkers: [markThemeVersion(5, 1)],
  },
);
