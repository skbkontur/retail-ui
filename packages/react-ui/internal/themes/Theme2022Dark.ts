import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { Theme2022Internal } from './Theme2022';

export class Theme2022Dark extends (class {} as typeof Theme2022Internal) {
  public static borderColorFocus = '#EBEBEB';
  public static outlineColorFocus = '#EBEBEB';

  //#region Button
  public static btnFocusShadowWidth = '2px';
  public static btnOutlineColorFocus = '#1f1f1f';

  public static btnDefaultBg = 'rgba(255, 255, 255, 0.1)';
  public static btnDefaultHoverBg = 'rgba(255, 255, 255, 0.16)';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = 'rgba(255, 255, 255, 0.1)';
  public static btnDefaultBorderColor = 'rgba(255, 255, 255, 0.16)';
  public static btnDefaultTextColor = 'rgba(255, 255, 255, 0.87)';

  public static btnPrimaryBg = '#EBEBEB';
  public static btnPrimaryHoverBg = '#FFFFFF';
  public static btnPrimaryActiveBg = '#C2C2C2';
  public static btnPrimaryTextColor = 'rgba(0, 0, 0, 0.865)';

  public static btnSuccessBg = '#5F9C20';
  public static btnSuccessHoverBg = '#6CAD26';
  public static btnSuccessActiveBg = '#477916';
  public static get btnSuccessBorderColor() {
    return this.btnSuccessBg;
  }
  public static get btnSuccessHoverBorderColor() {
    return this.btnSuccessHoverBg;
  }
  public static get btnSuccessActiveBorderColor() {
    return this.btnSuccessActiveBg;
  }

  public static btnPayBg = '#FCB73E';
  public static btnPayHoverBg = '#FCC660';
  public static btnPayActiveBg = '#F69912';
  public static get btnPayBorderColor() {
    return this.btnPayBg;
  }
  public static get btnPayHoverBorderColor() {
    return this.btnPayHoverBg;
  }
  public static get btnPayActiveBorderColor() {
    return this.btnPayActiveBg;
  }

  public static btnDangerBg = '#EE5042';
  public static btnDangerHoverBg = '#FF5A49';
  public static btnDangerActiveBg = '#CB3D35';
  public static get btnDangerBorderColor() {
    return this.btnDangerBg;
  }
  public static get btnDangerHoverBorderColor() {
    return this.btnDangerHoverBg;
  }
  public static get btnDangerActiveBorderColor() {
    return this.btnDangerActiveBg;
  }

  public static btnBacklessBg = 'transparent !important';
  public static btnBacklessHoverBg = 'rgba(255, 255, 255, 0.1) !important';
  public static btnBacklessActiveBg = 'rgba(255, 255, 255, 0.06) !important';
  public static btnBacklessBorderColor = 'rgba(255, 255, 255, 0.16) !important';
  public static btnBacklessDisabledBorderColor = 'rgba(255, 255, 255, 0.06) !important';
  public static btnBacklessHoverBorderColor = 'rgba(255, 255, 255, 0.1)';
  public static btnBacklessTextColor = 'rgba(255, 255, 255, 0.87)';

  public static btnTextBg = 'transparent !important';
  public static btnTextHoverBg = 'rgba(255, 255, 255, 0.1)';
  public static btnTextActiveBg = 'rgba(255, 255, 255, 0.06)';
  public static btnTextBorderColor = 'transparent';

  public static btnIconColor = 'rgba(255, 255, 255, 0.54)';
  public static btnIconHoverColor = 'rgba(255, 255, 255, 0.87)';
  public static get btnIconDisabledColor() {
    return this.btnDisabledTextColor;
  }

  public static btnWarningSecondary = 'rgba(212, 100, 33, 1)';
  public static btnErrorSecondary = 'rgba(169, 42, 39, 1)';

  public static btnDisabledBg = 'rgba(255, 255, 255, 0.04)';
  public static btnDisabledTextColor = 'rgba(255, 255, 255, 0.32)';
  public static btnDisabledBorderColor = 'transparent';

  public static btnCheckedBg = '#EBEBEB';
  public static btnCheckedTextColor = 'rgba(0, 0, 0, 0.865)';
  public static btnCheckedDisabledBg = 'rgba(255, 255, 255, 0.32) !important';
  public static btnCheckedDisabledColor = 'rgba(0, 0, 0, 0.48)';
  //#endregion

  //#region Link
  public static linkColor = 'rgba(255, 255, 255, 0.87)';
  public static linkHoverColor = '#ffffff';
  public static linkActiveColor = '#c2c2c2';

  public static linkSuccessColor = '#78BF2B';
  public static linkSuccessHoverColor = '#B9E96E';
  public static linkSuccessActiveColor = '#5F9C20';

  public static linkDangerColor = '#FF887B';
  public static linkDangerHoverColor = '#FF9D92';
  public static linkDangerActiveColor = '#EE5042';

  public static linkGrayedColor = 'rgba(255, 255, 255, 0.54)';
  public static linkGrayedHoverColor = '#FFFFFF';
  public static linkGrayedActiveColor = '#C2C2C2';

  public static linkDisabledColor = 'rgba(255, 255, 255, 0.48)';
  //#endregion Link

  //#region Input
  public static inputBlinkColor = '#EBEBEB';
  public static inputTextColor = 'rgba(255, 255, 255, 0.865)';
  public static inputBg = 'rgba(255, 255, 255, 0.1)';
  public static inputBorderColor = 'rgba(255, 255, 255, 0.06)';
  public static inputBackgroundClip = 'border-box';
  public static inputBorderColorHover = 'rgba(255, 255, 255, 0.16)';
  public static inputBorderColorFocus = 'rgba(235, 235, 235, 1)';
  public static get inputFocusShadow() {
    return `0 0 0 1px ${this.inputBorderColorFocus}`;
  }

  public static inputBorderColorWarning = 'rgba(252, 183, 62, 1)';
  public static inputBorderColorError = 'rgba(238, 80, 66, 1)';
  public static inputOutlineWidth = '1px';

  public static inputTextColorDisabled = 'rgba(255, 255, 255, 0.32)';
  public static inputDisabledBg = 'rgba(255, 255, 255, 0.04)';
  public static inputDisabledBorderColor = 'rgba(255, 255, 255, 0.04)';
  //#endregion Input

  //#region TokenInput
  public static inputDisabledBackgroundClip = 'border-box';
  //#endregion TokenInput

  //#region Textarea
  public static get textareaBorderColorFocus() {
    return this.inputBorderColorFocus;
  }
  public static get textareaDisabledBorderColor() {
    return this.inputDisabledBorderColor;
  }
  public static get textareaBorderColor() {
    return this.inputBorderColor;
  }
  public static get textareaTextColorDisabled() {
    return this.inputTextColorDisabled;
  }
  //#endregion Textarea

  //#region Menu
  public static menuBgDefault = '#333333';

  public static menuItemTextColor = 'rgba(255, 255, 255, 0.87)';
  public static menuItemHoverBg = 'rgba(255, 255, 255, 0.1)';
  public static menuItemSelectedBg = 'rgba(255, 255, 255, 0.16)';

  public static menuItemCommentColor = 'rgba(255, 255, 255, 0.54)';
  public static menuItemCommentOpacity = '1';

  public static menuSeparatorBorderColor = 'rgba(255, 255, 255, 0.1)';

  public static menuItemDisabledColor = 'rgba(255, 255, 255, 0.32)';
  //#endregion Menu

  //#region Token
  public static tokenShadowDisabled = '';
  public static tokenBorderColorDisabled = 'transparent';

  public static tokenDefaultIdleColor = 'rgba(255, 255, 255, 0.865)';
  public static tokenDefaultIdleBg = 'rgba(255, 255, 255, 0.1)';
  public static tokenDefaultIdleBorderColor = 'rgba(255, 255, 255, 0.06)';
  public static tokenDefaultIdleColorHover = 'rgba(255, 255, 255, 0.87)';
  public static tokenDefaultIdleBgHover = 'rgba(255, 255, 255, 0.16)';
  public static tokenDefaultIdleBorderColorHover = 'rgba(255, 255, 255, 0.06)';
  public static tokenDefaultActiveColor = 'rgba(0, 0, 0, 0.87)';
  public static tokenDefaultActiveBg = '#EBEBEB';
  public static tokenDefaultActiveBorderColor = 'transparent';
  //#endregion Token

  //#region FileUploader
  public static fileUploaderBg = 'none';
  public static fileUploaderUploadButtonBg = 'rgba(255, 255, 255, 0.1)';
  public static fileUploaderHoveredBg = 'rgba(255, 255, 255, 0.16)';
  public static fileUploaderIconColor = 'rgba(255, 255, 255, 0.87)';
  public static fileUploaderLinkColor = 'rgba(255, 255, 255, 0.87)';
  public static fileUploaderAfterLinkColor = 'rgba(255, 255, 255, 0.54)';
  public static fileUploaderDisabledBorderColor = 'rgba(255, 255, 255, 0.1)';
  public static fileUploaderDragOverShadow = '0px 0px 0px 4px #EBEBEB';
  public static get fileUploaderBorderColorFocus() {
    return this.btnBorderColorFocus;
  }
  //#endregion FileUploader

  //#region Radio
  public static radioFocusShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.87)';

  public static radioDisabledBg = 'rgba(255, 255, 255, 0.04)';
  public static radioDisabledShadow = 'none';
  public static radioCheckedDisabledBulletBg = 'rgba(255, 255, 255, 0.16)';

  public static radioCheckedBgColor = '#FFFFFF';
  public static radioCheckedBulletColor = 'rgba(0, 0, 0, 0.87)';
  public static radioCheckedBorderColor = 'transparent';
  //#endregion Radio

  //#region Checkbox
  public static checkboxCheckedBg = '#EBEBEB';
  public static checkboxCheckedColor = 'rgba(0, 0, 0, 0.87)';
  public static checkboxHoverBg = 'rgba(255, 255, 255, 0.16)';
  public static get checkboxCheckedHoverBg() {
    return this.checkboxCheckedBg;
  }
  public static checkboxOutlineColorFocus = 'rgba(0, 0, 0, 0.87)';
  public static checkboxBgDisabled = 'rgba(255, 255, 255, 0.04)';
  public static checkboxShadowDisabled = 'none';
  //#endregion

  //#region Toggle
  public static toggleBaseBg = 'none';
  public static toggleHandleBoxShadowOld = 'none';
  public static toggleOutlineColorFocus = '#1F1F1F';

  // idle
  public static toggleContainerBg = 'rgba(255, 255, 255, 0.1)';
  public static toggleContainerBoxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
  public static toggleHandleBg = 'rgba(255, 255, 255, 0.32)';
  public static toggleHandleBoxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';

  // idle :hover
  public static toggleContainerBgHover = 'rgba(255, 255, 255, 0.16)';
  public static toggleContainerBoxShadowHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
  public static toggleHandleBgHover = 'rgba(255, 255, 255, 0.32)';
  public static toggleHandleBoxShadowHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';

  // checked
  public static toggleContainerBgChecked = 'rgba(255, 255, 255, 0.1)';
  public static toggleContainerBoxShadowChecked = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
  public static toggleHandleBgChecked = '#EBEBEB';
  public static toggleHandleBoxShadowChecked = 'none';

  // checked :hover
  public static toggleContainerBgCheckedHover = 'rgba(255, 255, 255, 0.16)';
  public static toggleContainerBoxShadowCheckedHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
  public static toggleHandleBgCheckedHover = '#FFFFFF';
  public static toggleHandleBoxShadowCheckedHover = 'none';

  // disabled
  public static toggleContainerBgDisabled = 'rgba(255, 255, 255, 0.04)';
  public static toggleContainerBoxShadowDisabled = 'none';
  public static toggleHandleBgDisabled = 'rgba(0, 0, 0, 0.16)';
  public static toggleHandleBoxShadowDisabled = 'none';

  // disabled checked
  public static toggleContainerBgDisabledChecked = 'rgba(255, 255, 255, 0.06)';
  public static toggleContainerBoxShadowDisabledChecked = 'none';
  public static toggleHandleBgDisabledChecked = 'rgba(0, 0, 0, 0.16)';
  public static toggleHandleBoxShadowDisabledChecked = 'none';

  //#endregion

  //#region Modal
  public static modalBg = '#222';
  public static get modalFixedHeaderBg() {
    return this.modalBg;
  }
  public static modalSeparatorBorderBottom = 'solid 1px rgba(255, 255, 255, 0.1)';
  public static modalBackBg = '#000';
  public static modalBackOpacity = '0.7';
  //#endregion

  //#region SideMenu
  public static sidePageBgDefault = '#222';
  public static sidePageBackingBg = '#000';
  public static sidePageBackingBgOpacity = '0.7';
  //#endregion

  //#region Tab, Tabs
  public static tabColorHover = 'rgba(255, 255, 255, 0.16)';
  //#endregion

  //#region Toast
  public static toastColor = 'rgba(44, 44, 44, 1.0)';
  public static toastBg = 'rgba(255, 255, 255, 0.8)';
  public static toastLinkColor = 'rgba(44, 44, 44, 1.0)';
  public static toastLinkBgHover = 'rgba(255, 255, 255, 0.87)';
  public static toastLinkBgActive = 'rgba(0, 0, 0, 0.16)';
  public static toastCloseColor = 'rgba(0, 0, 0, 0.32)';
  public static toastCloseHoverColor = 'rgba(0, 0, 0, 0.87)';
  //#endregion

  //#region Hint
  public static hintColor = 'rgba(44, 44, 44, 1.0)';
  public static hintBgColor = 'rgba(255, 255, 255, 0.8)';
  //#endregion

  //#region Tooltip
  public static tooltipBg = '#333333';
  //#endregion

  //#region Paging
  public static pagingPageLinkHoverBg = 'rgba(255, 255, 255, 0.06)';
  public static pagingPageLinkActiveBg = 'rgba(255, 255, 255, 0.1)';
  public static pagingForwardLinkColor = 'rgba(255, 255, 255, 0.87)';
  //#endregion

  //#region GlobalLoader
  public static globalLoaderColor = 'rgba(238, 80, 66, 1)';
  //#endregion

  //#region DateInput
  public static dateInputComponentSelectedBgColor = ''; // will apply native selection bg color
  //#endregion

  //#region Calendar
  public static calendarCellHoverBgColor = 'rgba(255, 255, 255, 0.06)';
  public static calendarCellHoverColor = 'rgba(255, 255, 255, 0.87)';
  public static calendarCellSelectedBgColor = 'rgba(255, 255, 255, 0.1)';
  public static calendarCellSelectedFontColor = 'rgba(255, 255, 255, 0.87)';
  //#endregion

  //#region DateSelect
  public static dateSelectMenuItemBgActive = 'rgba(255, 255, 255, 0.06)';
  public static dateSelectMenuItemBgSelected = 'rgba(255, 255, 255, 0.1)';
  //#endregion

  //#region CloseIcon, CloseButtonIcon
  public static closeBtnIconColor = 'rgba(255, 255, 255, 0.32)';
  //#endregion
}

export const Theme2022DarkInternal = Object.setPrototypeOf(
  exposeGetters(Theme2022Dark),
  Theme2022Internal,
) as typeof Theme2022Dark;
