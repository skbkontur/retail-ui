import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class DarkTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Common variables
  public static grayXLight = 'rgba(255, 255, 255, 0.08)';
  public static gray = 'rgba(255, 255, 255, 0.48)';
  public static green = '#5f9c20';
  public static greenDark = '#538a1b';
  public static red = '#ee5042';
  public static redDark = '#dd473b';
  public static errorMain = '#ee5042';
  public static errorText = '#ffa236';
  public static borderColorGrayLight = 'rgba(255, 255, 255, 0.16)';
  public static borderColorDisabled = 'rgba(255, 255, 255, 0.16)';
  public static placeholderColor = 'rgba(255, 255, 255, 0.32)';
  public static textColorDefault = 'rgba(255, 255, 255, 0.865)';
  public static textColorDisabled = 'rgba(255, 255, 255, 0.32)';
  public static textColorDisabledContrast = 'rgba(255, 255, 255, 0.48)';
  public static bgDisabled = 'rgba(255, 255, 255, 0.16)';
  public static bgDefault = '#1f1f1f';
  //#endregion
  //#region Link
  public static linkColor = '#51adff';
  public static linkHoverColor = '#2291ff';
  public static linkActiveColor = '#1f87ef';
  public static linkSuccessColor = '#78bf2b';
  public static linkSuccessHoverColor = '#6cad26';
  public static linkSuccessActiveColor = '#5f9c20';
  public static linkDangerColor = '#ff887b';
  public static linkDangerHoverColor = '#ff5a49';
  public static linkDangerActiveColor = '#ee5042';
  //#endregion
  //#region Button
  public static get btnDefaultBg() {
    return this.bgDefault;
  }
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultActiveBg = 'rgba(0, 0, 0, 0.16)';
  public static get btnDefaultHoverBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get btnDefaultActiveBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get btnDefaultBorderColor() {
    return this.borderColorGrayLight;
  }
  public static btnSuccessBg = '#5f9c20';
  public static get btnSuccessTextColor() {
    return this.textColorDefault;
  }
  public static btnSuccessBorderColor = '#5f9c20';
  public static btnSuccessActiveBg = '#3a6710';
  public static btnSuccessActiveBorderColor = '#3a6710';
  public static btnPrimaryBg = '#1f87ef';
  public static get btnPrimaryTextColor() {
    return this.textColorDefault;
  }
  public static btnPrimaryBorderColor = '#1f87ef';
  public static btnPrimaryActiveBg = '#1261ae';
  public static btnPrimaryActiveBorderColor = '#1261ae';
  public static btnDangerBg = '#ee5042';
  public static get btnDangerTextColor() {
    return this.textColorDefault;
  }
  public static btnDangerBorderColor = '#ee5042';
  public static btnDangerActiveBg = '#a92a27';
  public static btnDangerActiveBorderColor = '#a92a27';
  public static btnPayTextColor = '#222222';
  public static btnPayActiveBg = '#d46421';
  public static btnPayActiveBorderColor = '#d46421';
  //#endregion
  //#region Tooltip
  public static tooltipCloseBtnColor = 'rgba(255, 255, 255, 0.32)';
  //#endregion
  //#region Modal
  public static modalBackBg = 'rgba(255, 255, 255, 0.865)';
  public static modalCloseButtonColor = 'rgba(255, 255, 255, 0.32)';
  public static modalCloseButtonHoverColor = 'rgba(255, 255, 255, 0.865)';
  public static modalFooterBg = 'rgba(255, 255, 255, 0.08)';
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = 'rgba(255, 255, 255, 0.08)';
  public static sidePageBackingBg = 'rgba(255, 255, 255, 0.865)';
  //#endregion
  //#region Calendar
  public static calendarCellWeekendColor = '#ff887b';
  public static calendarCellTodayBorder = '1px solid rgba(255, 255, 255, 0.48)';
  public static calendarCellSelectedBgColor = 'rgba(255, 255, 255, 0.16)';
  //#endregion
  //#region Paging
  public static pagingPageLinkHoverBg = 'rgba(255, 255, 255, 0.8)';
  public static pagingPageLinkActiveBg = 'rgba(255, 255, 255, 0.16)';
  //#endregion
  //#region Toast
  public static toastLinkColor = '#51adff';
  public static toastCloseColor = 'rgba(255, 255, 255, 0.6)';
  //#endregion
  //#region Menu
  // menuItem
  public static menuItemCommentColor = 'rgba(255, 255, 255, 0.48)';
  //menuSeparator
  public static menuSeparatorBorderColor = 'rgba(255, 255, 255, 0.08)';
  //#endregion
  //#region Toggle
  public static toggleBorderColor = 'rgba(255, 255, 255, 0.32)';
  //#endregion
}

export const DarkThemeInternal = Object.setPrototypeOf(
  exposeGetters(DarkTheme),
  DefaultThemeInternal,
) as typeof DarkTheme;
