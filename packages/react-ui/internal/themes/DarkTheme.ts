import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class DarkTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Common variables
  public static grayXLight = '#313131';
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
  public static textColorInvert = 'rgba(255, 255, 255, 0.865)';
  public static bgDisabled = '#434343';
  public static bgDefault = '#1f1f1f';
  public static bgDropdownDefault = '#333333';
  public static outlineColorFocus = '#1f1f1f';
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
  public static fixedPanelShadow = '0px 0px 16px 1px rgba(0, 0, 0, 0.4)';
  //#endregion
  //#region Button
  public static btnInsetColor = '#1f1f1f';
  public static btnDefaultBg = '#282828';
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultActiveBg = '#1a1a1a';
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
  public static modalFooterBg = '#434343';
  public static get modalBodyTextColor() {
    return this.textColorDefault;
  }
  public static get modalFooterTextColor() {
    return this.textColorDefault;
  }
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = ' #434343';
  public static sidePageBackingBg = 'rgba(255, 255, 255, 0.865)';
  public static sidePageCloseButtonColor = 'rgba(255, 255, 255, 0.32)';
  public static sidePageCloseButtonHoverColor = 'rgba(255, 255, 255, 0.865)';
  public static get sidePageBodyTextColor() {
    return this.textColorDefault;
  }
  public static get sidePageFooterTextColor() {
    return this.textColorDefault;
  }
  //#endregion
  //#region Calendar
  public static calendarCellWeekendColor = '#ff887b';
  public static calendarCellTodayBorder = '1px solid rgba(255, 255, 255, 0.48)';
  public static calendarCellSelectedBgColor = 'rgba(255, 255, 255, 0.16)';
  public static calendarMonthTitleBorderBottomColor = 'rgba(255, 255, 255, 0.08)';

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
  public static toggleDisabledHandleBg = '#525252';
  public static toggleBaseBg = 'rgba(255, 255, 255, 0.04)';
  public static get toggleBgDisabled() {
    return this.bgDisabled;
  }
  public static toggleBgDisabledChecked = 'rgba(255, 255, 255, 0.48)';
  //#endregion
  //#region Input
  public static inputBg = 'rgba(255, 255, 255, 0.04)';
  public static get inputBorderTopColor() {
    return this.inputBorderColor;
  }
  //#endregion
  //#region DatePicker
  public static dateSelectMenuItemBgSelected = 'rgba(255, 255, 255, 0.08)';
  public static pickerTodayWrapperBorderTop = '1px solid rgba(255, 255, 255, 0.08)';
  //#endregion
  //#region DateInput
  public static dateInputComponentSelectedBgColor = '#1c7edf';
  //#endregion
  //#region Hint
  public static hintBgColor = 'rgba(67, 67, 67, 0.92)';
  //#endregion
  //#region Loader
  public static loaderBg = 'rgba(51, 51, 51, 0.8)';
  //#endregion
  //#region Dropdown
  public static dropdownMenuSelectedBg = 'rgba(255, 255, 255, 0.08)'; //deprecated
  //#endregion
  //#region TextArea
  public static textareaBg = '#1f1f1f';
  //#endregion
  //#region PasswordInput
  public static get passwordInputVisibilityIconColor() {
    return this.gray;
  }
  public static passwordInputVisibilityIconOpacity = '1';
  public static get passwordInputVisibilityIconHoverColor() {
    return this.textColorDefault;
  }
  //#endregion
  //#region Radio
  public static radioBgColor = 'rgba(255, 255, 255, 0.04)';
  public static radioBorderColor = 'rgba(255, 255, 255, 0.32)';
  //#endregion
  //#region Checkbox
  public static checkboxBg = 'rgba(255, 255, 255, 0.04)';
  public static get checkboxShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(255, 255, 255, 0.32)`;
  }
  //#endregion
}

export const DarkThemeInternal = Object.setPrototypeOf(
  exposeGetters(DarkTheme),
  DefaultThemeInternal,
) as typeof DarkTheme;
