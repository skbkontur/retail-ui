import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class OldColorsTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Common variables
  public static brand = '#1e79be';
  public static grayXLight = '#e5e5e5';
  public static gray = '#808080';
  public static blueXxLight = '#e4f3ff';
  public static blueLight = '#1d85d0';
  public static blue = '#3072c4';
  public static blueDark = '#1e5aa4';
  public static greenXxLight = '#e2f7dc';
  public static green = '#3f9726';
  public static greenDark = '#228007';
  public static redXxLight = '#ffd6d6';
  public static red = '#d70c17';
  public static redDark = '#ce0014';
  public static yellowXxLight = '#fff0bc';
  public static yellow = '#f69c00';
  public static yellowDark = '#d97e00';
  public static errorMain = '#d70c17';
  public static errorText = '#ce0014';
  public static warningMain = '#f69c00';
  public static borderColorFocusLight = '#bad7f1';
  public static borderColorGrayLight = 'rgba(0, 0, 0, 0.15)';
  public static borderColorDisabled = 'rgba(0, 0, 0, 0.05)';
  public static placeholderColor = '#a0a0a0';
  public static textColorDefault = '#333333';
  public static textColorDisabled = '#a0a0a0';
  public static textColorDisabledContrast = '#808080';
  public static bgDisabled = '#f2f2f2';
  //#endregion
  //#region Link
  public static linkColor = '#3072c4';
  public static linkActiveColor = '#044785';
  public static linkSuccessColor = '#3f9726';
  public static linkSuccessHoverColor = '#3f9726';
  public static linkSuccessActiveColor = '#3f9726';
  public static linkDangerColor = '#e3071c';
  public static linkDangerHoverColor = '#e3071c';
  public static linkDangerActiveColor = '#b00616';
  //#endregion
  //#region Button
  public static btnDefaultHoverBgStart = '#f2f2f2';
  public static btnDefaultHoverBgEnd = '#f2f2f2';
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultHoverBorderColor = '#d9d9d9';
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnSuccessBg = '#419d14';
  public static btnSuccessHoverBg = '#3c9312';
  public static btnSuccessHoverBorderColor = '#3c9312';
  public static btnSuccessBorderColor = '#419d14';
  public static btnSuccessBgStart = '#419d14';
  public static btnSuccessBgEnd = '#419d14';
  public static btnSuccessHoverBgStart = '#3c9312';
  public static btnSuccessHoverBgEnd = '#3c9312';
  public static btnSuccessActiveBg = '#398911';
  public static btnSuccessActiveBorderColor = '#398911';
  public static btnPrimaryBg = '#1d85d0';
  public static btnPrimaryHoverBg = '#1b7dc3';
  public static btnPrimaryHoverBorderColor = '#1b7dc3';
  public static btnPrimaryBorderColor = '#1d85d0';
  public static btnPrimaryBgStart = '#1d85d0';
  public static btnPrimaryBgEnd = '#1d85d0';
  public static btnPrimaryHoverBgStart = '#1b7dc3';
  public static btnPrimaryHoverBgEnd = '#1b7dc3';
  public static btnPrimaryActiveBg = '#1974b6';
  public static btnPrimaryActiveBorderColor = '#1974b6';
  public static btnDangerBg = '#d9472b';
  public static btnDangerHoverBg = '#cc4228';
  public static btnDangerHoverBorderColor = '#cc4228';
  public static btnDangerBorderColor = '#d9472b';
  public static btnDangerBgStart = '#d9472b';
  public static btnDangerBgEnd = '#d9472b';
  public static btnDangerHoverBgStart = '#cc4228';
  public static btnDangerHoverBgEnd = '#cc4228';
  public static btnDangerActiveBg = '#be3e25';
  public static btnDangerActiveBorderColor = '#be3e25';
  public static btnPayBg = '#ffca43';
  public static btnPayHoverBg = '#f0be3f';
  public static btnPayHoverBorderColor = '#f0be3f';
  public static btnPayBorderColor = '#ffca43';
  public static btnPayBgStart = '#ffca43';
  public static btnPayBgEnd = '#ffca43';
  public static btnPayHoverBgStart = '#f0be3f';
  public static btnPayHoverBgEnd = '#f0be3f';
  public static btnPayActiveBg = '#e0b13a';
  public static btnPayActiveBorderColor = '#e0b13a';
  //#endregion
  //#region Select
  public static selectPlaceholderColor = '#a0a0a0';
  //#endregion
  //#region Tooltip
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.374)';
  //#endregion
  //#region Modal
  public static modalBackBg = '#333';
  public static modalCloseButtonColor = '#808080';
  public static modalCloseButtonHoverColor = '#333';
  public static modalFooterBg = '#e5e5e5';
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = '#e5e5e5';
  public static sidePageBackingBg = '#333';
  //#endregion
  //#region DateInput
  public static dateInputIconColor = '#333';
  public static dateInputComponentSelectedBgColor = '#cae0f4';
  //#endregion
  //#region Calendar
  public static calendarCellWeekendColor = '#f00';
  public static calendarCellTodayBorder = '1px solid #8b8b8b';
  public static calendarCellSelectedBgColor = '#e9e9e9';
  //#endregion
  //#region DatePicker
  public static datePickerOpenBtnColor = '#333';
  //#endregion
  //#region Paging
  public static pagingPageLinkHintColor = '#bbb';
  //#endregion
  //#region Toast
  public static toastLinkColor = '#80caff';
  public static toastCloseColor = '#a0a0a0';
  //#endregion
  //#region Menu
  // menuItem
  public static menuItemCommentColor = '#a0a0a0';
  //menuSeparator
  public static menuSeparatorBorderColor = '#e6e6e6';
  //#endregion
  //#region Toggle
  public static toggleBgChecked = '#3072c4';
  public static toggleBorderColor = '#d0d0d0';
  public static get toggleBgDisabledChecked() {
    return this.bgDisabled;
  }
  //#endregion
  //#region TextArea
  public static textareaBorderTopColor = 'rgba(0, 0, 0, 0.15)';
  //#endregion
  //#region Radio
  public static radioBorderColor = 'rgba(0, 0, 0, 0.15)';
  //#endregion
}

export const OldColorsThemeInternal = exposeGetters(OldColorsTheme);
