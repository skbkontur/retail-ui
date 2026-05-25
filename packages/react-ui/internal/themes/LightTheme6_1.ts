import * as colors from '@skbkontur/colors/tokens-default/light';

import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { LightTheme6_0 } from './LightTheme6_0.js';

export const LightTheme6_1 = createTheme({
  themeClass: class LightTheme6_1 extends BasicThemeClassForExtension {
    public static textareaCounterBg = colors.surfaceBase;
    public static textareaCounterHelpIconColor = colors.textNeutralSoft;

    public static mobilePopupContainerBorderRadius = '8px';

    public static mobileMenuItemPaddingLarge = '12px 16px';
    public static mobileMenuItemPaddingMedium = '9px 12px';
    public static mobileMenuItemPaddingSmall = '6px 8px';

    public static get mobileMenuItemLineHeightLarge(): string {
      return this.lineHeightMobile;
    }

    public static get mobileMenuItemLineHeightMedium(): string {
      return this.lineHeightMobile;
    }

    public static get mobileMenuItemLineHeightSmall(): string {
      return this.lineHeightMobile;
    }

    public static get mobileMenuItemFontSizeLarge(): string {
      return this.fontSizeLarge;
    }

    public static get mobileMenuItemFontSizeMedium(): string {
      return this.fontSizeMedium;
    }

    public static get mobileMenuItemFontSizeSmall(): string {
      return this.fontSizeSmall;
    }

    public static get mobileMenuMessagePaddingLarge(): string {
      return this.mobileMenuItemPaddingLarge;
    }

    public static get mobileMenuMessagePaddingMedium(): string {
      return this.mobileMenuItemPaddingMedium;
    }

    public static get mobileMenuMessagePaddingSmall(): string {
      return this.mobileMenuItemPaddingSmall;
    }

    public static get mobileMenuMessageLineHeightLarge(): string {
      return this.menuItemLineHeightLarge;
    }

    public static get mobileMenuMessageLineHeightMedium(): string {
      return this.menuItemLineHeightMedium;
    }

    public static get mobileMenuMessageLineHeightSmall(): string {
      return this.menuItemLineHeightSmall;
    }

    public static get mobileMenuMessageFontSizeLarge(): string {
      return this.mobileMenuItemFontSizeLarge;
    }

    public static get mobileMenuMessageFontSizeMedium(): string {
      return this.mobileMenuItemFontSizeMedium;
    }

    public static get mobileMenuMessageFontSizeSmall(): string {
      return this.mobileMenuItemFontSizeSmall;
    }

    public static mobilePopupPositionX = '16px';
    public static mobilePopupPositionY = '16px';

    public static mobilePopupPaddingSmall = '6px';
    public static mobilePopupPaddingMedium = '6px';
    public static mobilePopupPaddingLarge = '8px';

    public static mobilePopupHeaderPaddingSmall = '6px 8px 4px 14px';
    public static mobilePopupHeaderPaddingMedium = '8px 12px 6px 18px';
    public static mobilePopupHeaderPaddingLarge = '12px 16px 8px 24px';

    public static mobilePopupFooterPaddingSmall = '0 6px 6px';
    public static mobilePopupFooterPaddingMedium = '0 6px 6px';
    public static mobilePopupFooterPaddingLarge = '0 8px 8px';
  },
  prototypeTheme: LightTheme6_0,
  themeMarkers: [markThemeVersion('6.1')],
});
