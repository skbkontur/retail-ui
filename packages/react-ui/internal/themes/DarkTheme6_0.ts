import { markAsDarkTheme, createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicTheme, BasicThemeClassForExtension } from './BasicTheme';

export const DarkTheme6_0 = createTheme({
  themeClass: class DarkTheme6_0 extends BasicThemeClassForExtension {
    //#region Common variables
    public static grayXLight = '#313131';
    public static gray = 'rgba(255, 255, 255, 0.48)';
    public static grayDark = '#e1e1e1';
    public static green = '#23A14A';
    public static greenDark = '#1C8A3F';
    public static red = '#FE4C4C';
    public static redDark = '#DD3333';
    public static yellowXxLight = '#ffe0c3';
    public static yellow = '#ffa236';
    public static yellowDark = '#ea7324';
    public static warningMain = '#ffa236';
    public static get errorMain(): string {
      return this.red;
    }
    public static errorText = '#FE6C6C';
    public static errorSecondary = '#AB0D0D';
    public static borderColorFocusLight = '#1260ae';
    public static borderColorGrayLight = 'rgba(255, 255, 255, 0.16)';
    public static borderColorDisabled = 'rgba(0, 0, 0, 0.10)';
    public static placeholderColor = 'rgba(255, 255, 255, 0.32)';
    public static placeholderColorLight = 'rgba(255, 255, 255, 0.16)';
    public static textColorDefault = 'rgba(255, 255, 255, 0.865)';
    public static textColorDisabled = 'rgba(255, 255, 255, 0.32)';
    public static textColorDisabledContrast = 'rgba(255, 255, 255, 0.48)';
    public static textColorInvert = 'rgba(255, 255, 255, 0.865)';
    public static bgDisabled = '#434343';
    public static bgDefault = '#1f1f1f';
    public static bgSecondary = '#333333';
    public static bgChecked = '#EBEBEB';
    public static outlineColorFocus = '#EBEBEB';
    public static borderColorFocus = '#EBEBEB';
    public static get borderColorError(): string {
      return this.errorMain;
    }
    public static fixedPanelShadow = 'none';
    //#endregion Common variables
    //#region CloseIcon, CloseButtonIcon
    public static closeBtnIconColor = 'rgba(255, 255, 255, 0.32)';
    //#endregion CloseIcon, CloseButtonIcon

    //#region ClearCrossIcon
    public static clearCrossIconColor = 'rgba(255, 255, 255, 0.54)';
    public static clearCrossIconHoverColor = 'rgba(255, 255, 255, 0.865)';
    //#endregion ClearCrossIcon

    //#region Link
    public static linkColor = 'rgba(255, 255, 255, 0.87)';
    public static linkHoverColor = '#ffffff';
    public static linkActiveColor = '#c2c2c2';

    public static linkGrayedColor = 'rgba(255, 255, 255, 0.54)';
    public static linkGrayedHoverColor = '#FFFFFF';
    public static linkGrayedActiveColor = '#C2C2C2';

    public static linkSuccessColor = '#46CD68';
    public static linkSuccessHoverColor = '#67D881';
    public static get linkSuccessActiveColor(): string {
      return this.green;
    }

    public static get linkDangerColor(): string {
      return this.errorText;
    }
    public static linkDangerHoverColor = '#FE8C8C';
    public static get linkDangerActiveColor(): string {
      return '#ED3F3F';
    }

    public static linkFocusOutlineColor = '#EBEBEB';
    public static linkHoverTextDecoration = 'none';

    public static get linkDisabledColor(): string {
      return this.textColorDisabled;
    }
    //#endregion Link
    //#region Button
    public static btnFocusShadowWidth = '2px';
    public static btnOutlineColorFocus = '#1f1f1f';
    public static btnInsetColor = '#1f1f1f';

    // default
    public static btnDefaultBg = 'rgba(255, 255, 255, 0.1)';
    public static btnDefaultHoverBg = 'rgba(255, 255, 255, 0.16)';
    public static btnDefaultActiveBg = 'rgba(255, 255, 255, 0.1)';
    public static btnDefaultHoverBgStart = 'none';
    public static btnDefaultHoverBgEnd = 'none';
    public static get btnDefaultHoverBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static get btnDefaultActiveBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static btnDefaultBorderColor = 'rgba(255, 255, 255, 0.16)';
    public static btnDefaultTextColor = 'rgba(255, 255, 255, 0.87)';

    // success
    public static get btnSuccessBg(): string {
      return this.green;
    }
    public static get btnSuccessBorderColor(): string {
      return this.btnSuccessBg;
    }
    public static get btnSuccessTextColor(): string {
      return this.textColorDefault;
    }

    public static btnSuccessHoverBg = '#26AD50';
    public static get btnSuccessHoverBorderColor(): string {
      return this.btnSuccessHoverBg;
    }

    public static get btnSuccessActiveBg(): string {
      return this.greenDark;
    }
    public static get btnSuccessActiveBorderColor(): string {
      return this.btnSuccessActiveBg;
    }

    // primary
    public static btnPrimaryBg = '#EBEBEB';
    public static btnPrimaryBorderColor = '#3D3D3D';

    public static btnPrimaryHoverBg = '#FFFFFF';
    public static btnPrimaryActiveBg = '#C2C2C2';
    public static btnPrimaryActiveBorderColor = '#1261ae';

    public static btnPrimaryTextColor = 'rgba(0, 0, 0, 0.865)';

    // danger
    public static get btnDangerBg(): string {
      return this.errorMain;
    }
    public static get btnDangerBorderColor(): string {
      return this.btnDangerBg;
    }

    public static btnDangerHoverBg = '#ED3F3F';
    public static get btnDangerHoverBorderColor(): string {
      return this.btnDangerHoverBg;
    }
    public static get btnDangerTextColor(): string {
      return this.textColorDefault;
    }
    public static btnDangerActiveBg = '#DD3333';
    public static get btnDangerActiveBorderColor(): string {
      return this.btnDangerActiveBg;
    }

    // pay
    public static btnPayBg = '#FCB73E';
    public static get btnPayBorderColor(): string {
      return this.btnPayBg;
    }
    public static btnPayHoverBg = '#FCC660';
    public static get btnPayHoverBorderColor(): string {
      return this.btnPayHoverBg;
    }
    public static btnPayTextColor = '#222222';
    public static btnPayActiveBg = '#F69912';
    public static get btnPayActiveBorderColor(): string {
      return this.btnPayActiveBg;
    }

    // backless
    public static btnBacklessBg = 'transparent';
    public static btnBacklessHoverBg = 'rgba(255, 255, 255, 0.1)';
    public static btnBacklessActiveBg = 'rgba(255, 255, 255, 0.06)';
    public static btnBacklessBorderColor = 'rgba(255, 255, 255, 0.16)';
    public static btnBacklessDisabledBorderColor = 'rgba(255, 255, 255, 0.06)';
    public static btnBacklessHoverBorderColor = 'rgba(255, 255, 255, 0.1)';
    public static btnBacklessTextColor = 'rgba(255, 255, 255, 0.87)';
    public static btnBacklessActiveBorderColor = 'rgba(255, 255, 255, 0.1)';

    // text
    public static btnTextBg = 'transparent';
    public static btnTextHoverBg = 'rgba(255, 255, 255, 0.1)';
    public static btnTextActiveBg = 'rgba(255, 255, 255, 0.06)';
    public static btnTextBorderColor = 'transparent';

    // warning, error
    public static btnWarningSecondary = 'rgba(212, 100, 33, 1)';
    public static get btnErrorSecondary(): string {
      return this.errorSecondary;
    }

    // disabled
    public static btnDisabledBg = 'rgba(255, 255, 255, 0.04)';
    public static get btnDisabledTextColor(): string {
      return this.textColorDisabled;
    }
    public static btnDisabledBorderColor = 'transparent';

    // checked
    public static btnCheckedBg = '#EBEBEB';
    public static btnCheckedTextColor = 'rgba(0, 0, 0, 0.865)';
    public static btnCheckedDisabledBg = 'rgba(255, 255, 255, 0.32) !important';
    public static btnCheckedDisabledColor = 'rgba(0, 0, 0, 0.48)';
    //#endregion Button
    //#region Tooltip
    public static tooltipCloseBtnColor = 'rgba(255, 255, 255, 0.32)';
    public static tooltipCloseBtnHoverColor = 'rgba(255, 255, 255, 0.865)';
    public static tooltipBg = '#333333';
    //#endregion Tooltip
    //#region Modal
    public static modalBg = '#222';
    public static modalBackBg = '#000';
    public static modalBackOpacity = '0.7';

    public static modalCloseButtonColor = 'rgba(255, 255, 255, 0.32)';
    public static modalCloseButtonHoverColor = 'rgba(255, 255, 255, 0.865)';

    public static modalFooterBg = '#222222';
    public static get modalFooterTextColor(): string {
      return this.textColorDefault;
    }
    public static get modalBodyTextColor(): string {
      return this.textColorDefault;
    }
    public static get modalFixedPanelShadow(): string {
      return this.fixedPanelShadow;
    }
    public static get modalFixedHeaderBg(): string {
      return this.modalBg;
    }
    public static modalSeparatorBorderBottom = 'solid 1px rgba(255, 255, 255, 0.1)';
    //#endregion Modal
    //#region SidePage
    public static sidePageFooterPanelBg = ' #222222';
    public static sidePageBackingBg = '#000';
    public static sidePageBgDefault = '#222';
    public static sidePageBackingBgOpacity = '0.7';
    public static sidePageCloseButtonColor = 'rgba(255, 255, 255, 0.32)';
    public static sidePageCloseButtonHoverColor = 'rgba(255, 255, 255, 0.865)';
    public static get sidePageBodyTextColor(): string {
      return this.textColorDefault;
    }
    public static get sidePageFooterTextColor(): string {
      return this.textColorDefault;
    }
    public static get sidePageFixedPanelShadow(): string {
      return this.fixedPanelShadow;
    }
    //#endregion SidePage

    //#region Select
    public static selectMenuArrowColor = 'rgba(255, 255, 255, 0.54)';
    public static get selectPlaceholderColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get selectMenuArrowColorDisabled(): string {
      return this.textColorDisabled;
    }
    //#endregion Select
    //#region Calendar
    public static get calendarCellWeekendColor(): string {
      return this.errorText;
    }
    public static calendarCellTodayBorder = '1px solid rgba(255, 255, 255, 0.48)';
    public static calendarCellSelectedBgColor = 'rgba(255, 255, 255, 0.1)';
    public static calendarMonthTitleBorderBottomColor = 'rgba(255, 255, 255, 0.08)';
    public static calendarCellHoverBgColor = 'rgba(255, 255, 255, 0.06)';
    public static calendarCellHoverColor = 'rgba(255, 255, 255, 0.87)';
    public static calendarCellSelectedFontColor = 'rgba(255, 255, 255, 0.87)';
    //#endregion Calendar

    //#region DateRangePicker
    public static rangeCalendarCellBg = 'rgba(255, 255, 255, 0.06)';
    public static rangeCalendarCellHoverBg = 'rgba(255, 255, 255, 0.1)';
    public static rangeCalendarCellEndBg = '#EBEBEB';
    public static rangeCalendarCellEndColor = '#222222';
    //#endregion

    //#region Paging
    public static pagingPageLinkColor = 'rgba(255, 255, 255, 0.87)';
    public static pagingPageLinkHoverBg = 'rgba(255, 255, 255, 0.06)';
    public static pagingPageLinkActiveBg = 'rgba(255, 255, 255, 0.1)';
    public static pagingPageLinkDisabledActiveBg = 'rgba(255, 255, 255, 0.08)';
    public static pagingForwardLinkColor = 'rgba(255, 255, 255, 0.87)';
    public static get pagingForwardLinkDisabledColor(): string {
      return this.linkDisabledColor;
    }
    //#endregion Paging
    //#region Toast
    public static toastLinkColor = 'rgba(44, 44, 44, 1.0)';
    public static toastCloseColor = 'rgba(0, 0, 0, 0.32)';

    public static toastColor = 'rgba(44, 44, 44, 1.0)';
    public static toastBg = 'rgba(255, 255, 255, 0.8)';
    public static toastLinkBgHover = 'rgba(255, 255, 255, 0.87)';
    public static toastLinkBgActive = 'rgba(0, 0, 0, 0.16)';
    public static toastCloseHoverColor = 'rgba(0, 0, 0, 0.87)';
    //#endregion Toast

    //#region Tab, Tabs
    public static tabColorHover = 'rgba(255, 255, 255, 0.16)';
    //#endregion Tab, Tabs
    //#region Menu
    public static get menuBgDefault(): string {
      return this.bgSecondary;
    }
    // menuItem
    public static menuItemTextColor = 'rgba(255, 255, 255, 0.87)';
    public static menuItemHoverBg = 'rgba(255, 255, 255, 0.1)';
    public static menuItemSelectedBg = 'rgba(255, 255, 255, 0.16)';

    public static menuItemCommentColor = 'rgba(255, 255, 255, 0.54)';
    public static menuItemCommentOpacity = '1';
    public static get menuItemDisabledColor(): string {
      return this.textColorDisabled;
    }
    // menuHeader
    public static get menuHeaderColor(): string {
      return this.gray;
    }
    // menuFooter
    public static get menuFooterColor(): string {
      return this.menuHeaderColor;
    }
    //menuSeparator
    public static menuSeparatorBorderColor = 'rgba(255, 255, 255, 0.1)';
    //#endregion Menu
    //#region Toggle
    public static toggleBorderColor = 'rgba(255, 255, 255, 0.32)';
    public static toggleBaseBg = 'none';

    public static toggleOutlineColorFocus = '#1F1F1F';

    // idle
    public static toggleContainerBg = 'rgba(255, 255, 255, 0.1)';
    public static toggleContainerBoxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
    public static toggleHandleBg = 'rgba(255, 255, 255, 0.32)';
    public static toggleHandleBoxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';

    // idle :hover
    public static toggleBgHover = 'rgba(255, 255, 255, 0.16)';
    public static toggleContainerBoxShadowHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
    public static toggleHandleBgHover = 'rgba(255, 255, 255, 0.32)';
    public static toggleHandleBoxShadowHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';

    // checked
    public static toggleBgChecked = 'rgba(255, 255, 255, 0.1)';
    public static toggleContainerBoxShadowChecked = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
    public static toggleHandleBgChecked = '#EBEBEB';
    public static toggleHandleBoxShadowChecked = 'none';

    // checked :hover
    public static get toggleContainerBgCheckedHover(): string {
      return this.toggleContainerBgHover;
    }
    public static toggleContainerBoxShadowCheckedHover = 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)';
    public static toggleHandleBgCheckedHover = '#FFFFFF';
    public static toggleHandleBoxShadowCheckedHover = 'none';

    // disabled
    public static get toggleBgDisabled(): string {
      return this.bgDisabled;
    }
    public static toggleDisabledHandleBg = '#525252';

    public static toggleContainerBgDisabled = 'rgba(255, 255, 255, 0.04)';
    public static toggleContainerBoxShadowDisabled = 'none';
    public static toggleHandleBgDisabled = 'rgba(0, 0, 0, 0.16)';
    public static toggleHandleBoxShadowDisabled = 'none';

    // disabled checked
    public static toggleContainerBgDisabledChecked = 'rgba(255, 255, 255, 0.06)';
    public static toggleContainerBoxShadowDisabledChecked = 'none';
    public static toggleHandleBgDisabledChecked = 'rgba(0, 0, 0, 0.16)';
    public static toggleHandleBoxShadowDisabledChecked = 'none';
    public static toggleBgDisabledChecked = 'rgba(255, 255, 255, 0.48)';

    //#endregion Toggle
    //#region Token
    public static tokenShadowDisabled = '';
    public static tokenBorderColorDisabled = 'transparent';
    public static get tokenTextColorDisabled(): string {
      return this.textColorDisabled;
    }

    public static tokenColor = 'rgba(255, 255, 255, 0.865)';
    public static tokenBg = 'rgba(255, 255, 255, 0.1)';
    public static tokenBorderColor = 'rgba(255, 255, 255, 0.06)';
    public static tokenColorHover = 'rgba(255, 255, 255, 0.87)';
    public static tokenBgHover = 'rgba(255, 255, 255, 0.16)';
    public static tokenBorderColorHover = 'rgba(255, 255, 255, 0.06)';
    public static tokenColorActive = 'rgba(0, 0, 0, 0.87)';
    public static tokenBgActive = '#EBEBEB';
    public static tokenBorderColorActive = 'transparent';
    //#endregion Token
    //#region Input
    public static inputBg = 'rgba(255, 255, 255, 0.1)';
    public static get inputBorderTopColor(): string {
      return this.inputBorderColor;
    }
    public static inputColorScheme = 'dark';
    public static inputBlinkColor = '#EBEBEB';
    public static inputTextColor = 'rgba(255, 255, 255, 0.865)';
    public static inputBorderColor = 'rgba(255, 255, 255, 0.06)';
    public static inputBackgroundClip = 'border-box';
    public static inputBorderColorHover = 'rgba(255, 255, 255, 0.16)';
    public static inputBorderColorFocus = 'rgba(235, 235, 235, 1)';
    public static get inputFocusShadow(): string {
      return `0 0 0 1px ${this.inputBorderColorFocus}`;
    }

    public static inputBorderColorWarning = 'rgba(252, 183, 62, 1)';
    public static get inputBorderColorError(): string {
      return this.borderColorError;
    }
    public static inputOutlineWidth = '1px';

    public static get inputTextColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get inputIconColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get inputPlaceholderColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static inputDisabledBg = 'rgba(255, 255, 255, 0.04)';
    public static inputDisabledBorderColor = 'rgba(255, 255, 255, 0.04)';
    //#endregion Input
    //#region DateSelect
    public static dateSelectMenuItemBgActive = 'rgba(255, 255, 255, 0.06)';
    public static dateSelectMenuItemBgSelected = 'rgba(255, 255, 255, 0.1)';
    //#endregion DateSelect
    //#region DateInput
    public static dateInputComponentSelectedBgColor = '';
    public static dateInputComponentSelectedTextColor = '';
    //#endregion DateInput
    //#region Hint
    public static hintColor = 'rgba(44, 44, 44, 1.0)';
    public static hintBgColor = 'rgba(255, 255, 255, 0.8)';
    //#endregion Hint
    //#region Loader
    public static loaderBg = 'rgba(51, 51, 51, 0.8)';
    //#endregion
    //#region GlobalLoader
    public static globalLoaderColor = 'rgba(238, 80, 66, 1)';
    //#endregion GlobalLoader
    //#region TextArea
    public static get textareaBg(): string {
      return this.inputBg;
    }
    public static get textareaBorderColor(): string {
      return this.inputBorderColor;
    }
    public static get textareaTextColorDisabled(): string {
      return this.inputTextColorDisabled;
    }
    public static get textareaPlaceholderColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get textareaBorderTopColor(): string {
      return this.textareaBorderColor;
    }
    public static get textareaDisabledBorderColor(): string {
      return this.inputDisabledBorderColor;
    }
    public static get textareaBorderColorFocus(): string {
      return this.inputBorderColorFocus;
    }
    //#endregion TextArea
    //#region PasswordInput
    public static get passwordInputVisibilityIconColor(): string {
      return this.gray;
    }
    public static passwordInputVisibilityIconOpacity = '1';
    public static get passwordInputVisibilityIconHoverColor(): string {
      return this.textColorDefault;
    }
    //#endregion PasswordInput
    //#region Radio
    public static radioBgColor = 'rgba(255, 255, 255, 0.04)';
    public static radioBorderColor = 'rgba(255, 255, 255, 0.32)';

    public static radioFocusShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.87)';

    public static radioDisabledBg = 'rgba(255, 255, 255, 0.04)';
    public static radioDisabledShadow = 'none';
    public static radioCheckedDisabledBulletBg = 'rgba(255, 255, 255, 0.16)';

    public static radioCheckedBgColor = '#FFFFFF';
    public static radioCheckedBulletColor = 'rgba(0, 0, 0, 0.87)';
    public static radioCheckedBorderColor = 'transparent';
    //#endregion Radio
    //#region Checkbox
    public static checkboxBg = 'rgba(255, 255, 255, 0.04)';
    public static get checkboxShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} rgba(255, 255, 255, 0.32)`;
    }
    public static get checkboxShadowHover(): string {
      return this.checkboxShadow;
    }

    public static get checkboxCheckedBg(): string {
      return this.bgChecked;
    }
    public static checkboxCheckedColor = 'rgba(0, 0, 0, 0.87)';
    public static checkboxHoverBg = 'rgba(255, 255, 255, 0.16)';
    public static get checkboxCheckedHoverBg(): string {
      return this.checkboxCheckedBg;
    }
    public static checkboxOutlineColorFocus = 'rgba(0, 0, 0, 0.87)';
    public static checkboxBgDisabled = 'rgba(255, 255, 255, 0.04)';
    public static checkboxShadowDisabled = 'none';
    //#endregion Checkbox
    //#region TokenInput
    public static inputDisabledBackgroundClip = 'border-box';
    //#endregion TokenInput
    //#region Switcher
    public static get switcherButtonDisabledBorderColor(): string {
      return this.borderColorDisabled;
    }
    public static switcherButtonCheckedDisabledShadow = 'none';
    //#endregion Switcher
    //#region FileUploader
    public static fileUploaderBg = 'none';
    public static fileUploaderTextColorDefault = '#fff';
    public static get fileUploaderBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static get fileUploaderBorderColorFocus(): string {
      return this.btnBorderColorFocus;
    }
    public static fileUploaderLinkColor = 'rgba(255, 255, 255, 0.87)';
    public static fileUploaderIconColor = 'rgba(255, 255, 255, 0.87)';
    public static fileUploaderIconHoverColor = 'rgba(255, 255, 255, 0.80)';

    public static get fileUploaderBorderColorError(): string {
      return this.borderColorError;
    }
    public static fileUploaderBorderColorWarning = '#ffa236';
    public static get fileUploaderDisabledBg(): string {
      return this.btnDisabledBg;
    }
    public static fileUploaderDisabledBorderColor = 'rgba(255, 255, 255, 0.1)';
    public static get fileUploaderDisabledTextColor(): string {
      return this.fileUploaderDisabledColor;
    }
    public static get fileUploaderDisabledLinkColor(): string {
      return this.textColorDisabled;
    }
    public static fileUploaderDisabledIconColor = 'rgba(255, 255, 255, 0.32)';

    public static fileUploaderUploadButtonBg = 'rgba(255, 255, 255, 0.1)';
    public static fileUploaderHoveredBg = 'rgba(255, 255, 255, 0.16)';
    public static fileUploaderActiveBg = 'rgba(255, 255, 255, 0.1)';

    public static get fileUploaderAfterLinkColor(): string {
      return this.gray;
    }
    public static fileUploaderDragOverShadow = '0px 0px 0px 4px #EBEBEB';

    public static fileUploaderIconColorForValidation = '#222222';
    public static get fileUploaderIconHoverColorForValidation(): string {
      return this.bgSecondary;
    }

    public static get fileUploaderErrorColor(): string {
      return this.textColorDisabled;
    }

    public static fileUploaderFileTypeUnknownIconColor = '#676767';
    public static fileUploaderPaddingXSmall = '7px';
    public static fileUploaderPaddingXMedium = '9px';
    public static fileUploaderPaddingXLarge = '11px';

    public static fileUploaderErrorBgColor = '#4F2421';
    public static fileUploaderErrorBgHoverColor = '#612A29';
    public static get fileUploaderErrorTextColor(): string {
      return this.errorText;
    }
    public static fileUploaderWarningBgColor = '#3F2F1E';
    public static fileUploaderWarningBgHoverColor = '#4C3923';
    public static fileUploaderWarningTextColor = '#FDD481';

    public static get fileUploaderValidationTextColor(): string {
      return this.fileUploaderTextColorDefault;
    }

    public static fileUploaderDisabledColor = 'rgba(255, 255, 255, 0.54)';
    public static get fileUploaderDisabledFileTypeIcon(): string {
      return this.fileUploaderDisabledIconColor;
    }

    //#endregion FileUploader

    //#region Kebab
    public static kebabBackgroundHover = 'rgba(255, 255, 255, 0.1)';
    public static kebabBackgroundActive = 'rgba(255, 255, 255, 0.06)';
    //#endregion Kebab

    //#region react-ui-validations
    public static get validationsTextColorError(): string {
      return this.errorText;
    }
    public static validationsTextColorWarning = '#fdd481';
    //#endregion
  },
  prototypeTheme: BasicTheme,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.0')],
});
