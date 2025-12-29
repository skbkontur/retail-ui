import * as colors from '@skbkontur/colors/default-dark';

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
    public static errorText = colors.textErrorHeavy;
    public static get errorSecondary() {
      return this.redXxLight;
    }
    public static borderColorFocusLight = '#1260ae';
    public static borderColorGrayLight = 'rgba(255, 255, 255, 0.16)';
    public static borderColorDisabled = colors.lineNeutralFaint;
    public static placeholderColor = colors.textNeutralFaint;
    public static placeholderColorLight = `color-mix(in srgb, ${colors.textNeutralFaint}, transparent 40%)`;
    public static textColorDefault = colors.textNeutralHeavy;
    public static textColorDisabled = colors.textNeutralFaint;
    public static textColorDisabledContrast = 'rgba(255, 255, 255, 0.48)';
    public static textColorInvert = 'rgba(255, 255, 255, 0.865)';
    public static bgDisabled = colors.shapeOtherDisabled;
    public static bgDefault = colors.surfaceHigh;
    public static get bgSecondary() {
      return this.bgDefault;
    }
    public static bgChecked = '#EBEBEB';
    public static outlineColorFocus = colors.surfaceBase;
    public static borderColorFocus = colors.lineAccentBold;
    public static get borderColorError(): string {
      return this.errorMain;
    }
    public static fixedPanelShadow = 'none';
    //#endregion Common variables
    //#region CloseIcon, CloseButtonIcon
    public static closeBtnIconColor = colors.textNeutralPale;
    //#endregion CloseIcon, CloseButtonIcon

    //#region ClearCrossIcon
    public static clearCrossIconColor = colors.textNeutralSoft;
    public static clearCrossIconHoverColor = colors.textNeutralHeavy;
    //#endregion ClearCrossIcon

    //#region Link
    public static linkColor = colors.textAccentHeavy;
    public static linkHoverColor = colors.textAccentHeavyHover;
    public static linkActiveColor = colors.textAccentHeavyPressed;

    public static linkGrayedColor = colors.textNeutralSoft;
    public static linkGrayedHoverColor = colors.textNeutralHeavy;
    public static linkGrayedActiveColor = colors.textNeutralHeavy;

    public static linkSuccessColor = colors.textSuccessHeavy;
    public static linkSuccessHoverColor = colors.textSuccessHeavyHover;
    public static get linkSuccessActiveColor(): string {
      return this.green;
    }

    public static get linkDangerColor(): string {
      return this.errorText;
    }
    public static linkDangerHoverColor = colors.textErrorHeavyHover;
    public static get linkDangerActiveColor(): string {
      return '#ED3F3F';
    }

    public static linkFocusOutlineColor = colors.lineAccentBold;
    public static linkHoverTextDecoration = 'none';

    public static get linkDisabledColor(): string {
      return this.textColorDisabled;
    }
    //#endregion Link
    //#region Button
    public static btnFocusShadowWidth = '2px';
    public static btnOutlineColorFocus = '#1f1f1f';
    public static btnInsetColor = colors.surfaceBase;

    // default
    public static btnDefaultBg = colors.shapeOtherBase;
    public static btnDefaultHoverBg = colors.shapeOtherBaseHover;
    public static btnDefaultActiveBg = colors.shapeOtherBasePressed;
    public static btnDefaultHoverBgStart = 'none';
    public static btnDefaultHoverBgEnd = 'none';
    public static get btnDefaultHoverBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static get btnDefaultActiveBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static btnDefaultBorderColor = colors.lineNeutralPale;
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

    public static btnSuccessHoverBg = colors.shapeBoldSuccessHover;
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
    public static btnPrimaryBg = colors.shapeBoldAccent;
    public static get btnPrimaryBorderColor() {
      return this.btnPrimaryBg;
    }

    public static btnPrimaryHoverBg = colors.shapeBoldAccentHover;
    public static btnPrimaryActiveBg = colors.shapeBoldAccentPressed;
    public static get btnPrimaryActiveBorderColor() {
      return this.btnPrimaryActiveBg;
    }

    public static btnPrimaryTextColor = colors.textOnAccentBoldHeavy;

    // danger
    public static get btnDangerBg(): string {
      return this.errorMain;
    }
    public static get btnDangerBorderColor(): string {
      return this.btnDangerBg;
    }

    public static btnDangerHoverBg = colors.shapeBoldErrorHover;
    public static get btnDangerHoverBorderColor(): string {
      return this.btnDangerHoverBg;
    }
    public static get btnDangerTextColor(): string {
      return this.textColorDefault;
    }
    public static btnDangerActiveBg = colors.shapeBoldErrorPressed;
    public static get btnDangerActiveBorderColor(): string {
      return this.btnDangerActiveBg;
    }

    // pay
    public static btnPayBg = colors.shapeBoldWarning;
    public static get btnPayBorderColor(): string {
      return this.btnPayBg;
    }
    public static btnPayHoverBg = colors.shapeBoldWarningHover;
    public static get btnPayHoverBorderColor(): string {
      return this.btnPayHoverBg;
    }
    public static btnPayTextColor = colors.textConstHeavyBlack;
    public static btnPayActiveBg = colors.shapeBoldWarningPressed;
    public static get btnPayActiveBorderColor(): string {
      return this.btnPayActiveBg;
    }

    // backless
    public static btnBacklessBg = 'transparent';
    public static btnBacklessHoverBg = colors.shapeOtherBacklessHover;
    public static btnBacklessActiveBg = colors.shapeOtherBacklessPressed;
    public static get btnBacklessBorderColor() {
      return this.btnDefaultBorderColor;
    }
    public static get btnBacklessDisabledBorderColor() {
      return this.btnDisabledBorderColor;
    }
    public static get btnBacklessHoverBorderColor() {
      return this.btnBacklessBorderColor;
    }
    public static get btnBacklessTextColor() {
      return this.btnDefaultTextColor;
    }
    public static get btnBacklessActiveBorderColor() {
      return this.btnBacklessBorderColor;
    }

    // text
    public static btnTextBg = 'transparent';
    public static btnTextHoverBg = colors.shapeOtherBacklessHover;
    public static btnTextActiveBg = colors.shapeOtherBacklessPressed;
    public static btnTextBorderColor = 'transparent';

    // warning, error
    public static btnWarningSecondary = colors.shapeFaintWarning;
    public static get btnErrorSecondary(): string {
      return this.errorSecondary;
    }

    // disabled
    public static btnDisabledBg = colors.shapeOtherDisabled;
    public static get btnDisabledTextColor(): string {
      return this.textColorDisabled;
    }
    public static btnDisabledBorderColor = colors.lineNeutralFaint;

    // checked
    public static btnCheckedBg = colors.shapeBoldAccent;
    public static btnCheckedTextColor = colors.textOnAccentBoldHeavy;
    public static btnCheckedDisabledBg = colors.shapeOtherAccentBoldDisabled;
    public static btnCheckedDisabledColor = colors.textInvertedNeutralSoft;
    //#endregion Button
    //#region Tooltip
    public static tooltipCloseBtnColor = colors.textNeutralPale;
    public static tooltipCloseBtnHoverColor = colors.textNeutralHeavy;
    public static tooltipBg = colors.surfaceHigh;
    //#endregion Tooltip
    //#region Modal
    public static modalBg = colors.surfaceHigh;
    public static modalBackBg = colors.surfaceModalBackdrop;
    public static modalBackOpacity = '1';

    public static modalCloseButtonColor = colors.textNeutralPale;
    public static modalCloseButtonHoverColor = colors.textNeutralHeavy;

    public static get modalFooterBg() {
      return this.modalBg;
    }
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
    public static modalSeparatorBorderBottom = `1px solid ${colors.lineNeutralFaint}`;
    //#endregion Modal
    //#region SidePage
    public static get sidePageFooterPanelBg() {
      return this.sidePageBgDefault;
    }
    public static sidePageBackingBg = colors.surfaceModalBackdrop;
    public static sidePageBgDefault = colors.surfaceHigh;
    public static sidePageBackingBgOpacity = '1';
    public static sidePageCloseButtonColor = colors.textNeutralPale;
    public static sidePageCloseButtonHoverColor = colors.textNeutralHeavy;
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
    public static calendarCellTodayBorder = '1px solid';
    public static calendarCellSelectedBgColor = colors.shapeBoldAccent;
    public static calendarMonthTitleBorderBottomColor = colors.lineNeutralFaint;
    public static calendarCellHoverBgColor = colors.shapeOtherBacklessHover;
    public static calendarCellHoverColor = '';
    public static calendarCellSelectedFontColor = colors.textOnAccentBoldHeavy;
    //#endregion Calendar

    //#region DateRangePicker
    public static rangeCalendarCellBg = colors.shapeFaintNeutralAlpha;
    public static rangeCalendarCellHoverBg = colors.shapeOtherBacklessHover;
    public static rangeCalendarCellEndBg = colors.shapeBoldAccent;
    public static rangeCalendarCellEndColor = colors.textOnAccentBoldHeavy;
    //#endregion

    //#region Paging
    public static pagingPageLinkColor = 'rgba(255, 255, 255, 0.87)';
    public static pagingPageLinkHoverBg = colors.shapeOtherBacklessHover;
    public static pagingPageLinkActiveBg = colors.shapeOtherBacklessPressed;
    public static pagingPageLinkDisabledActiveBg = colors.shapeOtherDisabled;
    public static pagingForwardLinkColor = 'rgba(255, 255, 255, 0.87)';
    public static get pagingForwardLinkDisabledColor(): string {
      return this.linkDisabledColor;
    }
    //#endregion Paging
    //#region Toast
    public static toastLinkColor = colors.textInvertedNeutralHeavy;
    public static toastCloseColor = colors.textInvertedNeutralSoft;

    public static toastColor = colors.textInvertedNeutralHeavy;
    public static toastBg = colors.shapeHeavyNeutral;
    public static toastLinkBgHover = colors.shapeInvertedBacklessHover;
    public static toastLinkBgActive = colors.shapeInvertedBacklessPressed;
    public static toastCloseHoverColor = colors.textInvertedNeutralHeavy;
    //#endregion Toast

    //#region Tab, Tabs
    public static tabColorHover = colors.lineNeutralPale;
    //#endregion Tab, Tabs
    //#region Menu
    public static get menuBgDefault(): string {
      return this.bgSecondary;
    }
    // menuItem
    public static menuItemTextColor = 'rgba(255, 255, 255, 0.87)';
    public static menuItemHoverBg = colors.shapeOtherBacklessHover;
    public static menuItemSelectedBg = colors.shapeOtherBacklessPressed;

    public static menuItemCommentColor = colors.textNeutralSoft;
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
    public static menuSeparatorBorderColor = colors.lineNeutralFaint;
    //#endregion Menu
    //#region Toggle
    public static toggleBorderColor = colors.lineNeutralPale;
    public static toggleBaseBg = 'transparent';

    public static toggleOutlineColorFocus = '#1F1F1F';

    // idle
    public static toggleContainerBg = colors.shapeOtherField;
    public static toggleContainerBoxShadow = `inset 0 0 0 1px ${colors.lineNeutralPale}`;
    public static toggleHandleBg = colors.shapeOtherBase;
    public static toggleHandleBoxShadow = `0 0 0 1px ${colors.lineNeutralPale}`;

    // idle :hover
    public static toggleBgHover = colors.shapeOtherFieldHover;
    public static toggleContainerBoxShadowHover = `inset 0 0 0 1px ${colors.lineNeutralPaleHover}`;
    public static toggleHandleBgHover = colors.shapeOtherBase;
    public static toggleHandleBoxShadowHover = `0 0 0 1px ${colors.lineNeutralPale}`;

    // checked
    public static toggleBgChecked = colors.shapeBoldAccent;
    public static toggleContainerBoxShadowChecked = 'none';
    public static toggleHandleBgChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleHandleBoxShadowChecked = 'none';

    // checked :hover
    public static get toggleContainerBgCheckedHover(): string {
      return this.toggleContainerBgHover;
    }
    public static toggleContainerBoxShadowCheckedHover = 'none';
    public static toggleHandleBgCheckedHover = colors.shapeInvertedNeutralHeavyHover;
    public static toggleHandleBoxShadowCheckedHover = 'none';

    // disabled
    public static get toggleBgDisabled(): string {
      return this.bgDisabled;
    }
    public static toggleDisabledHandleBg = 'transparent';

    public static toggleContainerBgDisabled = colors.shapeOtherDisabled;
    public static toggleContainerBoxShadowDisabled = `inset 0 0 0 1px ${colors.lineNeutralFaint}`;
    public static toggleHandleBgDisabled = 'transparent';
    public static toggleHandleBoxShadowDisabled = `0 0 0 1px ${colors.lineNeutralFaint}`;

    // disabled checked
    public static toggleContainerBgDisabledChecked = colors.shapeOtherAccentBoldDisabled;
    public static toggleContainerBoxShadowDisabledChecked = 'none';
    public static toggleHandleBgDisabledChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleHandleBoxShadowDisabledChecked = 'none';
    public static toggleBgDisabledChecked = 'rgba(255, 255, 255, 0.48)';

    //#endregion Toggle
    //#region Token
    public static tokenShadowDisabled = '';
    public static tokenBorderColorDisabled = 'transparent';
    public static get tokenTextColorDisabled(): string {
      return this.textColorDisabled;
    }

    public static tokenColor = colors.textNeutralHeavy;
    public static tokenBg = colors.shapeFaintNeutralAlpha;
    public static tokenBorderColor = colors.lineNeutralPale;
    public static get tokenColorHover() {
      return this.tokenColor;
    }
    public static tokenBgHover = colors.shapeFaintNeutralAlphaHover;
    public static tokenBorderColorHover = 'rgba(255, 255, 255, 0.06)';
    public static tokenColorActive = colors.textOnAccentBoldHeavy;
    public static tokenBgActive = colors.shapeBoldAccent;
    public static tokenBorderColorActive = 'transparent';
    //#endregion Token
    //#region Input
    public static inputBg = colors.shapeOtherField;
    public static get inputBorderTopColor(): string {
      return this.inputBorderColor;
    }
    public static inputColorScheme = 'dark';
    public static inputBlinkColor = colors.shapeFaintNeutralAlpha;
    public static inputTextColor = 'rgba(255, 255, 255, 0.865)';
    public static inputBorderColor = colors.lineNeutralPale;
    public static inputBackgroundClip = 'border-box';
    public static inputBorderColorHover = colors.lineNeutralPaleHover;
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
    public static get inputDisabledBg() {
      return this.bgDisabled;
    }
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
    public static hintColor = colors.textInvertedNeutralHeavy;
    public static hintBgColor = colors.shapeHeavyNeutral;
    //#endregion Hint
    //#region Loader
    public static loaderBg = colors.shapeInvertedNeutralHeavy;
    //#endregion
    //#region GlobalLoader
    public static globalLoaderColor = colors.shapeBoldBrandOriginal;
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
    public static passwordInputVisibilityIconOpacity = '0.64';
    public static get passwordInputVisibilityIconHoverColor(): string {
      return this.textColorDefault;
    }
    //#endregion PasswordInput
    //#region Radio
    public static radioBgColor = colors.shapeOtherField;
    public static get radioBorderColor() {
      return colors.lineNeutralPale;
    }

    public static radioFocusShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.87)';

    public static get radioDisabledBg() {
      return this.checkboxBgDisabled;
    }
    public static radioDisabledShadow = `0 0 0 ${this.radioBorderWidth} ${colors.lineNeutralFaint}`;

    public static get radioCheckedDisabledBulletBg() {
      return this.checkboxTextColorDisabled;
    }

    public static get radioCheckedBgColor() {
      return this.checkboxCheckedBg;
    }
    public static get radioCheckedBulletColor() {
      return this.checkboxCheckedColor;
    }
    public static radioCheckedBorderColor = 'transparent';
    //#endregion Radio
    //#region Checkbox
    public static checkboxBg = colors.shapeOtherField;
    public static get checkboxShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} rgba(255, 255, 255, 0.32)`;
    }
    public static get checkboxShadowHover(): string {
      return this.checkboxShadow;
    }

    public static get checkboxCheckedBg(): string {
      return this.bgChecked;
    }
    public static checkboxCheckedColor = colors.shapeInvertedNeutralHeavy;
    public static checkboxHoverBg = colors.shapeOtherFieldHover;
    public static get checkboxCheckedHoverBg(): string {
      return this.checkboxCheckedBg;
    }
    public static checkboxOutlineColorFocus = 'rgba(0, 0, 0, 0.87)';
    public static checkboxBgDisabled = colors.shapeOtherDisabled;
    public static get checkboxShadowDisabled() {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralFaint}`;
    }
    //#endregion Checkbox
    //#region TokenInput
    public static inputDisabledBackgroundClip = 'border-box';
    //#endregion TokenInput
    //#region Switcher
    public static get switcherButtonDisabledBorderColor(): string {
      return this.borderColorDisabled;
    }
    public static get switcherButtonCheckedDisabledShadow() {
      return this.btnCheckedDisabledShadow;
    }
    //#endregion Switcher
    //#region FileUploader
    public static fileUploaderBg = '';
    public static get fileUploaderTextColorDefault() {
      return this.textColorDefault;
    }
    public static get fileUploaderBorderColor(): string {
      return this.borderColorGrayLight;
    }
    public static get fileUploaderBorderColorFocus(): string {
      return this.btnBorderColorFocus;
    }
    public static get fileUploaderLinkColor() {
      return this.textColorDefault;
    }
    public static fileUploaderIconColor = colors.textNeutralPale;
    public static fileUploaderIconHoverColor = colors.textNeutralHeavy;

    public static get fileUploaderBorderColorError(): string {
      return this.borderColorError;
    }
    public static get fileUploaderBorderColorWarning() {
      return this.borderColorWarning;
    }
    public static get fileUploaderDisabledBg(): string {
      return this.btnDisabledBg;
    }
    public static fileUploaderDisabledBorderColor = colors.lineNeutralFaint;
    public static get fileUploaderDisabledTextColor(): string {
      return this.fileUploaderDisabledColor;
    }
    public static get fileUploaderDisabledLinkColor(): string {
      return this.textColorDisabled;
    }
    public static get fileUploaderDisabledIconColor() {
      return this.textColorDisabled;
    }

    public static fileUploaderUploadButtonBg = 'transparent';
    public static fileUploaderHoveredBg = colors.shapeOtherBacklessHover;
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

    public static fileUploaderErrorBgColor = colors.shapeFaintError;
    public static fileUploaderErrorBgHoverColor = colors.shapeFaintErrorHover;
    public static get fileUploaderErrorTextColor(): string {
      return this.errorText;
    }
    public static fileUploaderWarningBgColor = colors.shapeFaintWarning;
    public static fileUploaderWarningBgHoverColor = colors.shapeFaintWarningHover;
    public static fileUploaderWarningTextColor = colors.textWarningHeavy;

    public static get fileUploaderValidationTextColor(): string {
      return this.fileUploaderTextColorDefault;
    }

    public static fileUploaderDisabledColor = colors.textNeutralFaint;
    public static get fileUploaderDisabledFileTypeIcon(): string {
      return this.fileUploaderDisabledIconColor;
    }

    //#endregion FileUploader

    //#region Kebab
    public static kebabBackgroundHover = colors.shapeOtherBacklessHover;
    public static kebabBackgroundActive = colors.shapeOtherBacklessPressed;
    //#endregion Kebab

    //#region react-ui-validations
    public static get validationsTextColorError(): string {
      return this.errorText;
    }
    public static validationsTextColorWarning = colors.textWarningHeavy;
    //#endregion
  },
  prototypeTheme: BasicTheme,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.0')],
});
