import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_4 } from './LightTheme5_4';

export const LightTheme5_5 = createTheme({
  themeClass: class LightTheme5_5 extends BasicThemeClassForExtension {
    //#region FileUploader
    public static fileUploaderPaddingXSmall = '7px';
    public static fileUploaderPaddingXMedium = '9px';
    public static fileUploaderPaddingXLarge = '11px';

    public static get fileUploaderBorderColor() {
      return this.borderColorGrayLight;
    }

    public static fileUploaderDisabledColor = 'rgba(0, 0, 0, 0.54)';
    public static fileUploaderDisabledIconColor = 'rgba(0, 0, 0, 0.32)';
    public static get fileUploaderDisabledTextColor() {
      return this.fileUploaderDisabledColor;
    }
    public static get fileUploaderDisabledFileTypeIcon() {
      return this.fileUploaderDisabledIconColor;
    }
    //#endregion FileUploader
  },
  prototypeTheme: LightTheme5_4,
  themeMarkers: [markThemeVersion('5.5')],
});
