import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { DarkTheme5_4 } from './DarkTheme5_4';

export const DarkTheme5_5 = createTheme({
  themeClass: class DarkTheme5_5 extends BasicThemeClassForExtension {
    //#region FileUploader
    public static fileUploaderIconColorForValidation = '#222222';
    public static get fileUploaderIconHoverColorForValidation() {
      return this.bgSecondary;
    }

    public static get fileUploaderErrorColor() {
      return this.textColorDisabled;
    }

    public static fileUploaderFileTypeUnknownIconColor = '#676767';
    public static fileUploaderPaddingXSmall = '7px';
    public static fileUploaderPaddingXMedium = '9px';
    public static fileUploaderPaddingXLarge = '11px';

    public static fileUploaderErrorBgColor = '#4F2421';
    public static fileUploaderErrorBgHoverColor = '#612A29';
    public static get fileUploaderErrorTextColor() {
      return this.errorText;
    }
    public static fileUploaderWarningBgColor = '#3F2F1E';
    public static fileUploaderWarningBgHoverColor = '#4C3923';
    public static fileUploaderWarningTextColor = '#FDD481';

    public static get fileUploaderValidationTextColor() {
      return this.fileUploaderTextColorDefault;
    }
    public static get fileUploaderAfterLinkColor() {
      return this.gray;
    }
    public static get fileUploaderBorderColor() {
      return this.borderColorGrayLight;
    }
    public static fileUploaderDisabledColor = 'rgba(255, 255, 255, 0.54)';
    public static fileUploaderDisabledIconColor = 'rgba(255, 255, 255, 0.32)';
    public static get fileUploaderDisabledTextColor() {
      return this.fileUploaderDisabledColor;
    }
    public static get fileUploaderDisabledFileTypeIcon() {
      return this.fileUploaderDisabledIconColor;
    }
    //#endregion FileUploader
  },
  prototypeTheme: DarkTheme5_4,
  themeMarkers: [markThemeVersion('5.5')],
});
