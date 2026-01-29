import * as colors from '@skbkontur/colors/default-dark';

import { markAsDarkTheme, createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';

import { BasicTheme, BasicThemeClassForExtension } from './BasicTheme.js';

export const DarkTheme6_0 = createTheme({
  themeClass: class DarkTheme6_0 extends BasicThemeClassForExtension {
    //#region Common variables
    public static brand = colors.shapeBoldBrandOriginal;
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
    public static get errorSecondary(): string {
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
    public static get bgSecondary(): string {
      return this.bgDefault;
    }
    public static bgChecked = '#EBEBEB';
    public static outlineColorFocus = colors.surfaceBase;
    public static borderColorFocus = colors.lineAccentBold;
    public static borderColorError = colors.lineErrorBold;
    public static borderColorWarning = colors.lineWarningBold;
    public static fixedPanelShadow = 'none';
    //#endregion Common variables
    //#region CloseIcon, CloseButtonIcon
    public static closeBtnIconColor = colors.textNeutralPale;
    public static closeBtnIconDisabledColor = colors.textNeutralFaint;
    public static closeBtnIconHoverColor = colors.textNeutralHeavy;
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
    public static linkSuccessActiveColor = colors.textSuccessHeavyPressed;

    public static linkDangerColor = colors.textErrorHeavy;
    public static linkDangerHoverColor = colors.textErrorHeavyHover;
    public static linkDangerActiveColor = colors.textErrorHeavyPressed;

    public static linkFocusOutlineColor = colors.lineAccentBold;
    public static linkHoverTextDecoration = 'none';

    public static linkDisabledColor = colors.textNeutralFaint;
    //#endregion Link
    //#region Button
    public static btnFocusShadowWidth = '2px';
    public static btnOutlineColorFocus = '#1f1f1f';
    public static btnInsetColor = colors.surfaceBase;

    // default
    public static btnDefaultBg = colors.shapeOtherBase;
    public static btnDefaultHoverBg = colors.shapeOtherBaseHover;
    public static btnDefaultActiveBg = colors.shapeOtherBasePressed;
    public static btnDefaultHoverTextColor = colors.textNeutralHeavy;
    public static btnDefaultBorderColor = colors.lineNeutralPale;
    public static btnDefaultHoverBgStart = 'none';
    public static btnDefaultHoverBgEnd = 'none';
    public static get btnDefaultHoverBorderColor(): string {
      return this.btnDefaultHoverBg;
    }
    public static get btnDefaultActiveBorderColor(): string {
      return this.btnDefaultActiveBg;
    }
    public static get btnDefaultTextColor(): string {
      return this.textColorDefault;
    }

    // success
    public static btnSuccessBg = colors.shapeBoldSuccess;
    public static get btnSuccessBorderColor(): string {
      return this.btnSuccessBg;
    }
    public static btnSuccessTextColor = colors.textConstHeavyWhite;
    public static btnSuccessHoverTextColor = colors.textConstHeavyWhite;
    public static btnSuccessHoverBg = colors.shapeBoldSuccessHover;
    public static get btnSuccessHoverBorderColor(): string {
      return this.btnSuccessHoverBg;
    }

    public static btnSuccessActiveBg = colors.shapeBoldSuccessPressed;
    public static get btnSuccessActiveBorderColor(): string {
      return this.btnSuccessActiveBg;
    }
    // primary
    public static btnPrimaryBg = colors.shapeBoldAccent;
    public static get btnPrimaryBorderColor(): string {
      return this.btnPrimaryBg;
    }
    public static get btnPrimaryHoverBorderColor(): string {
      return this.btnPrimaryHoverBg;
    }
    public static btnPrimaryHoverBg = colors.shapeBoldAccentHover;
    public static btnPrimaryActiveBg = colors.shapeBoldAccentPressed;
    public static get btnPrimaryActiveBorderColor(): string {
      return this.btnPrimaryActiveBg;
    }

    public static btnPrimaryTextColor = colors.textOnAccentBoldHeavy;
    public static btnPrimaryHoverTextColor = '';

    // danger
    public static btnDangerBg = colors.shapeBoldError;
    public static btnDangerHoverBg = colors.shapeBoldErrorHover;
    public static get btnDangerBorderColor(): string {
      return this.btnDangerBg;
    }

    public static get btnDangerHoverBorderColor(): string {
      return this.btnDangerHoverBg;
    }
    public static btnDangerTextColor = colors.textConstHeavyWhite;
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
    public static btnMenuArrowColor = colors.textNeutralSoft;
    // backless
    public static btnBacklessBg = 'transparent';
    public static btnBacklessHoverBg = colors.shapeOtherBacklessHover;
    public static btnBacklessActiveBg = colors.shapeOtherBacklessPressed;
    public static get btnBacklessBorderColor(): string {
      return this.btnDefaultBorderColor;
    }
    public static get btnBacklessDisabledBorderColor(): string {
      return this.btnDisabledBorderColor;
    }
    public static get btnBacklessHoverBorderColor(): string {
      return this.btnBacklessBorderColor;
    }
    public static get btnBacklessTextColor(): string {
      return this.btnDefaultTextColor;
    }
    public static get btnBacklessActiveBorderColor(): string {
      return this.btnBacklessBorderColor;
    }
    public static btnBacklessHoverTextColor = '';
    // text
    public static btnTextBg = 'transparent';
    public static btnTextHoverBg = colors.shapeOtherBacklessHover;
    public static btnTextActiveBg = colors.shapeOtherBacklessPressed;
    public static btnTextBorderColor = 'transparent';

    // warning, error
    public static btnErrorSecondary = colors.shapeFaintError;
    public static btnWarningSecondary = colors.shapeFaintWarning;
    public static btnBorderColorWarning = colors.lineWarningBold;
    public static btnBorderColorError = colors.lineErrorBold;

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
    public static tooltipTextColor = colors.textNeutralHeavy;
    public static tooltipBg = colors.surfaceHigh;
    //#endregion Tooltip
    //#region Modal
    public static modalBg = colors.surfaceHigh;
    public static modalBackBg = colors.surfaceModalBackdrop;
    public static modalBackOpacity = '1';

    public static modalCloseButtonColor = colors.textNeutralPale;
    public static modalCloseButtonDisabledColor = colors.textNeutralFaint;
    public static modalCloseButtonHoverColor = colors.textNeutralHeavy;

    public static get modalFooterBg(): string {
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
    public static get modalHeaderTextColor(): string {
      return this.textColorDefault;
    }
    public static modalSeparatorBorderBottom = `1px solid ${colors.lineNeutralFaint}`;
    //#endregion Modal
    //#region SidePage
    public static get sidePageFooterPanelBg(): string {
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
    public static get sidePageHeaderTextColor(): string {
      return this.textColorDefault;
    }
    //#endregion SidePage

    //#region Select
    public static get selectMenuArrowColor(): string {
      return this.btnMenuArrowColor;
    }
    public static get selectPlaceholderColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get selectMenuArrowColorDisabled(): string {
      return this.textColorDisabled;
    }

    public static get selectDefaultBg(): string {
      return this.inputBg;
    }
    public static selectHoverBg = colors.shapeOtherFieldHover;
    public static selectActiveBg = colors.shapeOtherFieldPressed;
    public static selectPlaceholderColor = this.placeholderColor;

    public static get selectBgDisabled(): string {
      return this.inputDisabledBg;
    }
    public static get selectBorderColorDisabled(): string {
      return this.btnDisabledBorderColor;
    }
    public static get selectBorderColorHover(): string {
      return this.btnDefaultHoverBorderColor;
    }
    //#endregion Select
    //#region
    public static calendarBottomSeparatorBorderColor = colors.lineNeutralFaint;
    public static get calendarBottomSeparatorBorder(): string {
      return `${this.calendarBottomSeparatorBorderWidth} solid ${this.calendarBottomSeparatorBorderColor}`;
    }
    public static calendarBg = colors.surfaceHigh;
    public static calendarCellBg = 'transparent';
    public static calendarCellHoverColor = '';
    public static calendarCellActiveHoverColor = '';
    public static calendarCellWeekendColor = colors.customizableHeavyRed;
    public static calendarCellTodayBorder = '1px solid';
    public static calendarCellSelectedBgColor = colors.shapeBoldAccent;
    public static calendarCellSelectedFontColor = colors.textOnAccentBoldHeavy;
    public static get calendarMonthHeaderStickedBgColor(): string {
      return this.calendarBg;
    }
    public static calendarMonthTitleBorderBottomColor = colors.lineNeutralFaint;
    public static calendarCellHoverBgColor = colors.shapeOtherBacklessHover;
    //#endregion Calendar

    //#region DateRangePicker
    public static rangeCalendarCellBg = colors.shapeFaintNeutralAlpha;
    public static rangeCalendarCellHoverBg = colors.shapeOtherBacklessHover;
    public static rangeCalendarCellEndBg = colors.shapeBoldAccent;
    public static rangeCalendarCellEndColor = colors.textOnAccentBoldHeavy;
    //#endregion

    //#region Dropdown
    public static get dropdownMenuHoverBorderColor(): string {
      return this.btnDefaultHoverBorderColor;
    }
    public static get dropdownDefaultBg(): string {
      return this.btnDefaultBg;
    }
    public static get dropdownBgDisabled(): string {
      return this.btnDisabledBg;
    }
    public static get dropdownBorderColorDisabled(): string {
      return this.btnDisabledBorderColor;
    }
    public static get dropdownTextColorDisabled(): string {
      return this.btnDisabledTextColor;
    }
    //#endregion Dropdown

    //#region Paging
    public static get pagingPageLinkColor(): string {
      return this.textColorDefault;
    }
    public static pagingPageLinkHoverBg = colors.shapeOtherBacklessHover;
    public static pagingPageLinkActiveBg = colors.shapeOtherBacklessPressed;
    public static pagingPageLinkDisabledActiveBg = colors.shapeOtherDisabled;
    public static get pagingForwardLinkColor(): string {
      return this.textColorDefault;
    }
    public static get pagingForwardLinkDisabledColor(): string {
      return this.linkDisabledColor;
    }
    public static pagingDotsColor = colors.textNeutralFaint;
    public static pagingPageLinkHintColor = colors.textNeutralSoft;
    //#endregion Paging
    //#region Toast
    public static toastLinkColor = colors.textInvertedNeutralHeavy;
    public static toastCloseColor = colors.textInvertedNeutralSoft;

    public static toastColor = colors.textInvertedNeutralHeavy;
    public static toastBg = colors.shapeHeavyNeutral;
    public static toastLinkBgHover = colors.shapeInvertedBacklessHover;
    public static toastLinkBgActive = colors.shapeInvertedBacklessPressed;
    public static toastCloseHoverColor = colors.textInvertedNeutralHeavy;
    public static toastErrorBg = colors.shapeBoldError;
    public static toastLinkTextDecorationHover = '';
    public static toastColorError = colors.textConstHeavyWhite;
    public static toastLinkColorError = colors.textConstHeavyWhite;
    public static toastLinkBgHoverError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkBgActiveError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkColorActiveError = colors.textConstHeavyWhite;
    public static toastCloseColorError = colors.textConstSoftWhite;
    public static toastCloseHoverColorError = colors.textConstHeavyWhite;
    //#endregion Toast

    //#region Tab, Tabs
    public static get tabTextColorDefault(): string {
      return this.textColorDefault;
    }
    public static get tabColorFocus(): string {
      return this.borderColorFocus;
    }
    public static get tabColorPrimary(): string {
      return this.btnPrimaryBg;
    }
    public static tabColorHover = colors.lineNeutralPale;
    public static tabColorHoverPrimary = colors.lineAccentPale;
    public static tabColorHoverSuccess = colors.shapeBoldSuccessHover;
    public static tabColorHoverWarning = colors.shapeBoldWarningHover;
    public static tabColorHoverError = colors.shapeBoldErrorHover;

    //#endregion Tab, Tabs
    //#region Menu
    public static get menuBgDefault(): string {
      return this.bgSecondary;
    }
    // menuItem
    public static get menuItemTextColor(): string {
      return this.textColorDefault;
    }
    public static menuItemHoverBg = colors.shapeOtherBacklessHover;
    public static get menuItemHoverColor(): string {
      return this.menuItemTextColor;
    }
    public static menuItemSelectedBg = colors.shapeOtherBacklessPressed;

    public static menuItemCommentColor = colors.textNeutralSoft;
    public static menuItemCommentOpacity = '1';
    public static get menuItemCommentColorHover(): string {
      return this.menuItemTextColor;
    }
    public static get menuItemDisabledColor(): string {
      return this.textColorDisabled;
    }
    // menuMessage
    public static get menuMessageTextColor(): string {
      return this.menuItemDisabledColor;
    }
    public static get menuMessageBg(): string {
      return this.menuItemDisabledBg;
    }
    // menuHeader
    public static menuHeaderColor = colors.textNeutralSoft;
    // menuFooter
    public static get menuFooterColor(): string {
      return this.menuHeaderColor;
    }
    //menuSeparator
    public static menuSeparatorBorderColor = colors.lineNeutralFaint;
    //#endregion Menu
    //#region Toggle
    public static get toggleTextColor(): string {
      return this.textColorDefault;
    }
    public static toggleBaseBg = 'transparent';
    public static toggleBgHover = colors.shapeOtherFieldHover;
    public static toggleBorderColor = colors.lineNeutralPale;
    public static get toggleBorderColorDisabled(): string {
      return this.toggleBorderColor;
    }
    public static toggleShadowColorError = colors.lineErrorBold;
    public static toggleShadowColorWarning = colors.lineWarningBold;
    public static toggleFocusShadowColor = colors.lineAccentBold;
    public static toggleContainerBg = colors.shapeOtherField;
    public static toggleHandleBg = colors.shapeOtherBase;
    public static toggleHandleBoxShadow = `0 0 0 1px ${colors.lineNeutralPale}`;
    public static toggleContainerBoxShadow = `inset 0 0 0 1px ${colors.lineNeutralPale}`;
    // idle :hover
    public static toggleContainerBoxShadowHover = `inset 0 0 0 1px ${colors.lineNeutralPaleHover}`;
    public static toggleHandleBgHover = colors.shapeOtherBase;
    public static toggleHandleBoxShadowHover = `0 0 0 1px ${colors.lineNeutralPale}`;
    public static get toggleContainerBgHover(): string {
      return this.toggleBgHover;
    }
    // checked
    public static toggleContainerBoxShadowChecked = 'none';
    public static toggleHandleBoxShadowChecked = 'none';
    public static toggleHandleBgChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleBgChecked = colors.shapeBoldAccent;
    public static get toggleContainerBgChecked(): string {
      return this.toggleBgChecked;
    }
    // checked :hover
    public static toggleContainerBoxShadowCheckedHover = 'none';
    public static toggleContainerBgCheckedHover = colors.shapeBoldAccentHover;
    public static toggleHandleBoxShadowCheckedHover = 'none';
    public static toggleHandleBgCheckedHover = colors.shapeInvertedNeutralHeavyHover;
    // disabled
    public static toggleContainerBgDisabled = colors.shapeOtherDisabled;
    public static toggleHandleBgDisabled = 'transparent';
    public static toggleContainerBoxShadowDisabled = `inset 0 0 0 1px ${colors.lineNeutralFaint}`;
    public static toggleHandleBoxShadowDisabled = `0 0 0 1px ${colors.lineNeutralFaint}`;
    public static toggleDisabledHandleBg = 'transparent';
    public static get toggleBgDisabled(): string {
      return this.bgDisabled;
    }
    // disabled checked
    public static toggleContainerBgDisabledChecked = colors.shapeOtherAccentBoldDisabled;
    public static toggleHandleBgDisabledChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleContainerBoxShadowDisabledChecked = 'none';
    public static toggleHandleBoxShadowDisabledChecked = 'none';
    public static get toggleBorderColorDisabledChecked(): string {
      return this.toggleBorderColor;
    }
    //#endregion Toggle
    //#region Token
    public static tokenShadowDisabled = '';
    public static tokenBorderColorDisabled = 'transparent';
    public static get tokenTextColorDisabled(): string {
      return this.textColorDisabled;
    }

    public static tokenColor = colors.textNeutralHeavy;
    public static tokenBg = colors.shapeFaintNeutralAlpha;
    public static tokenDisabledBg = colors.shapeOtherDisabled;
    public static tokenBorderColor = colors.lineNeutralPale;
    public static get tokenColorHover(): string {
      return this.tokenColor;
    }
    public static tokenBgHover = colors.shapeFaintNeutralAlphaHover;
    public static tokenBorderColorHover = colors.lineNeutralPale;
    public static tokenColorActive = colors.textOnAccentBoldHeavy;
    public static tokenBgActive = colors.shapeBoldAccent;
    public static tokenBorderColorActive = 'transparent';
    //#endregion Token
    //#region Input
    public static inputBg = colors.shapeOtherField;
    public static inputIconColor = colors.textNeutralSoft;
    public static get inputBorderTopColor(): string {
      return this.inputBorderColor;
    }
    public static inputColorScheme = 'dark';
    public static inputBlinkColor = colors.shapeFaintNeutralAlpha;
    public static get inputTextColor(): string {
      return this.textColorDefault;
    }
    public static inputBorderColor = colors.lineNeutralPale;
    public static inputBackgroundClip = 'border-box';
    public static inputBorderColorHover = colors.lineNeutralPaleHover;
    public static get inputBorderColorFocus(): string {
      return this.borderColorFocus;
    }
    public static get inputFocusShadow(): string {
      return `0 0 0 1px ${this.inputBorderColorFocus}`;
    }

    public static get inputBorderColorWarning(): string {
      return this.borderColorWarning;
    }
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
    public static get inputDisabledBg(): string {
      return this.bgDisabled;
    }
    public static get tokenInputDisabledBorderColor(): string {
      return this.inputDisabledBorderColor;
    }
    public static get inputPlaceholderColor(): string {
      return this.placeholderColor;
    }
    public static get inputPlaceholderColorLight(): string {
      return this.placeholderColorLight;
    }
    public static get inputDisabledBorderColor(): string {
      return this.borderColorDisabled;
    }
    //#endregion Input
    //#region DateSelect
    public static get dateSelectMenuBg(): string {
      return this.bgSecondary;
    }
    public static get dateSelectMenuItemBgDisabled(): string {
      return this.bgSecondary;
    }
    public static dateSelectMenuItemFontActive = '';
    public static get dateSelectMenuItemFontSelected(): string {
      return this.textColorDefault;
    }
    public static get dateSelectMenuItemFontDisabled(): string {
      return this.textColorDisabled;
    }
    public static get dateSelectTextColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get dateSelectTextColorDefault(): string {
      return this.textColorDefault;
    }
    public static get dateSelectLinkColor(): string {
      return this.linkColor;
    }
    public static get dateSelectPopupBoxShadow(): string {
      return this.popupBoxShadow;
    }
    public static dateSelectTextColorInvert = '';
    //#endregion DateSelect
    //#region DateInput
    public static dateInputMaskColor = colors.textNeutralFaint;
    public static dateInputComponentSelectedBgColor = '';
    public static dateInputComponentSelectedTextColor = '';
    //#endregion DateInput
    //#region Hint
    public static hintColor = colors.textInvertedNeutralHeavy;
    public static get mobileHintColor(): string {
      return this.hintColor;
    }
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
    public static get textareaColor(): string {
      return this.textColorDefault;
    }
    public static textareaBorderColor = colors.lineNeutralPale;
    public static textareaBorderTopColor = colors.lineNeutralPale;

    public static get textareaTextColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static get textareaPlaceholderColorDisabled(): string {
      return this.textColorDisabled;
    }
    public static textareaShadow = 'none';
    public static get textareaPlaceholderColor(): string {
      return this.placeholderColor;
    }
    public static get textareaPlaceholderColorLight(): string {
      return this.placeholderColorLight;
    }
    public static get textareaDisabledBorderColor(): string {
      return this.borderColorDisabled;
    }
    public static get textareaBorderColorFocus(): string {
      return this.borderColorFocus;
    }
    public static get textareaBorderColorHover(): string {
      return this.inputBorderColorHover;
    }
    public static get textareaBorderColorWarning(): string {
      return this.borderColorWarning;
    }
    public static get textareaBorderColorError(): string {
      return this.borderColorError;
    }
    public static get textareaDisabledBg(): string {
      return this.inputDisabledBg;
    }
    public static textareaCounterColor = colors.textNeutralSoft;
    public static textareaCounterBg = 'transparent';
    public static get textareaCounterErrorColor(): string {
      return this.errorText;
    }
    public static textareaCounterHelpIconColor = colors.textNeutralHeavy;
    //#endregion TextArea
    //#region PasswordInput
    public static passwordInputVisibilityIconOpacity = '0.64';
    public static passwordInputVisibilityIconColor = colors.textNeutralHeavy;
    public static passwordInputVisibilityIconHoverColor = colors.textNeutralHeavy;
    public static passwordInputVisibilityIconHoverOpacity = '1';
    //#endregion PasswordInput
    //#region Radio
    public static radioBgColor = colors.shapeOtherField;
    public static get radioBorderColor(): string {
      return colors.lineNeutralPale;
    }
    public static get radioHoverBg(): string {
      return this.checkboxHoverBg;
    }
    public static get radioActiveBg(): string {
      return this.checkboxActiveBg;
    }
    public static radioBoxShadow = 'none';
    public static get radioBorder(): string {
      return `${this.radioBorderWidth} solid ${this.radioBorderColor}`;
    }
    public static get radioBorderColorFocus(): string {
      return this.borderColorFocus;
    }
    public static get radioBorderColorWarning(): string {
      return this.borderColorWarning;
    }
    public static get radioBorderColorError(): string {
      return this.borderColorError;
    }
    public static radioHoverShadow = 'none';
    public static radioActiveShadow = 'none';
    public static radioFocusShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.87)';

    public static get radioDisabledBg(): string {
      return this.checkboxBgDisabled;
    }
    public static get radioDisabledShadow(): string {
      return `0 0 0 ${this.radioBorderWidth} ${colors.lineNeutralFaint}`;
    }

    public static get radioCheckedDisabledBulletBg(): string {
      return this.checkboxTextColorDisabled;
    }

    public static get radioCheckedBgColor(): string {
      return this.checkboxCheckedBg;
    }
    public static get radioCheckedBulletColor(): string {
      return this.checkboxCheckedColor;
    }
    public static get radioCheckedHoverBgColor(): string {
      return this.checkboxCheckedHoverBg;
    }
    public static radioCheckedBorderColor = 'transparent';
    //#endregion Radio
    //#region
    public static get checkboxTextColorDefault(): string {
      return this.textColorDefault;
    }
    public static checkboxTextColorDisabled = colors.textNeutralFaint;
    public static checkboxBg = colors.shapeOtherField;
    public static checkboxActiveBg = colors.shapeOtherFieldPressed;
    public static get checkboxShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPale}`;
    }
    public static get checkboxShadowHover(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPaleHover}`;
    }
    public static checkboxBorder = 'none';
    public static checkboxCheckedBg = colors.shapeBoldAccent;
    public static checkboxCheckedColor = colors.shapeInvertedNeutralHeavy;
    public static checkboxHoverBg = colors.shapeOtherFieldHover;
    public static checkboxCheckedHoverBg = colors.shapeBoldAccentHover;
    public static get checkboxOutlineColorFocus(): string {
      return this.outlineColorFocus;
    }
    public static checkboxBgDisabled = colors.shapeOtherDisabled;
    public static get checkboxShadowDisabled(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralFaint}`;
    }
    public static get checkboxBorderColorWarning(): string {
      return this.borderColorWarning;
    }
    public static get checkboxBorderColorError(): string {
      return this.borderColorError;
    }
    public static get checkboxCheckedHoverShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedHoverBg}`;
    }
    public static get checkboxCheckedShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedBg}`;
    }
    public static get checkboxCheckedActiveShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedActiveBg}`;
    }
    public static get checkboxBorderColorFocus(): string {
      return this.borderColorFocus;
    }
    public static checkboxCheckedActiveBg = colors.shapeBoldAccentPressed;
    public static get checkboxShadowActive(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPalePressed}`;
    }
    //#endregion Checkbox
    //#region TokenInput
    public static inputDisabledBackgroundClip = 'border-box';
    public static get tokenInputBorderColor(): string {
      return this.inputBorderColor;
    }
    public static get tokenInputBorderColorHover(): string {
      return this.inputBorderColorHover;
    }
    public static get tokenInputBorderColorFocus(): string {
      return this.inputBorderColorFocus;
    }
    public static get tokenInputBorderColorError(): string {
      return this.inputBorderColorError;
    }
    public static get tokenInputBorderColorWarning(): string {
      return this.inputBorderColorWarning;
    }
    public static get tokenInputBorderTopColor(): string {
      return this.inputBorderTopColor;
    }
    public static get tokenInputPlaceholderColor(): string {
      return this.inputPlaceholderColor;
    }
    public static get tokenInputPlaceholderColorLight(): string {
      return this.inputPlaceholderColorLight;
    }
    public static get tokenInputDisabledBg(): string {
      return this.inputDisabledBg;
    }
    public static get tokenInputBorderWidth(): string {
      return this.inputBorderWidth;
    }
    public static get tokenInputOutlineWidth(): string {
      return this.inputOutlineWidth;
    }
    public static get tokenInputBg(): string {
      return this.inputBg;
    }
    public static tokenInputMenuPopupBg = 'transparent';
    public static get tokenInputShadow(): string {
      return this.inputShadow;
    }
    public static get tokenInputTextColor(): string {
      return this.inputTextColor;
    }
    public static tokenInputTextColorDisabled = colors.textNeutralFaint;
    public static get tokenInputPlaceholderColorDisabled(): string {
      return this.tokenInputTextColorDisabled;
    }
    //#endregion TokenInput
    //#region Switcher
    public static switcherBtnDisabledBorderColor = colors.lineNeutralPale;

    public static get switcherButtonDisabledBorderColor(): string {
      return this.switcherBtnDisabledBorderColor;
    }
    public static get switcherButtonCheckedDisabledShadow(): string {
      return this.btnCheckedDisabledShadow;
    }
    public static get switcherTextColor(): string {
      return this.textColorDefault;
    }
    public static get switcherOutlineWidth(): string {
      return this.btnOutlineWidth;
    }
    //#endregion Switcher
    //#region FileUploader
    public static fileUploaderBg = '';
    public static get fileUploaderTextColorDefault(): string {
      return this.textColorDefault;
    }
    public static fileUploaderBorderColor = colors.lineNeutralPale;
    public static get fileUploaderBorderColorFocus(): string {
      return this.borderColorFocus;
    }
    public static get fileUploaderLinkColor(): string {
      return this.textColorDefault;
    }
    public static fileUploaderIconColor = colors.textNeutralPale;
    public static fileUploaderIconHoverColor = colors.textNeutralHeavy;

    public static get fileUploaderBorderColorError(): string {
      return this.borderColorError;
    }
    public static get fileUploaderBorderColorWarning(): string {
      return this.borderColorWarning;
    }
    public static get fileUploaderDisabledBg(): string {
      return this.btnDisabledBg;
    }
    public static get fileUploaderDisabledBorder() {
      return `${this.fileUploaderBorderWidth} ${this.fileUploaderBorderStyle} ${this.fileUploaderDisabledBorderColor}`;
    }
    public static fileUploaderDisabledBorderColor = colors.lineNeutralFaint;
    public static get fileUploaderDisabledTextColor(): string {
      return this.fileUploaderDisabledColor;
    }
    public static get fileUploaderDisabledLinkColor(): string {
      return this.textColorDisabled;
    }
    public static get fileUploaderDisabledIconColor(): string {
      return this.textColorDisabled;
    }

    public static fileUploaderUploadButtonBg = 'transparent';
    public static fileUploaderHoveredBg = colors.shapeOtherBacklessHover;
    public static fileUploaderHoveredBorderColor = 'transparent';
    public static fileUploaderActiveBg = colors.shapeOtherBacklessPressed;
    public static get fileUploaderDragOverBorderColor(): string {
      return this.borderColorFocus;
    }
    public static fileUploaderDragOverShadow = '0px 0px 0px 4px #EBEBEB';

    public static fileUploaderIconColorForValidation = '#222222';
    public static get fileUploaderIconHoverColorForValidation(): string {
      return this.bgSecondary;
    }

    public static fileUploaderFileTypeUnknownIconColor = '#676767';
    public static fileUploaderPaddingXSmall = '7px';
    public static fileUploaderPaddingXMedium = '9px';
    public static fileUploaderPaddingXLarge = '11px';

    public static fileUploaderErrorBgColor = colors.shapeFaintError;
    public static fileUploaderErrorBgHoverColor = colors.shapeFaintErrorHover;
    public static fileUploaderErrorTextColor = colors.textErrorHeavy;
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
    public static kebabIconColor = colors.textNeutralSoft;
    //#endregion Kebab

    //#regiton Spinner
    public static spinnerColor = colors.customizableBoldRed;
    public static spinnerDimmedColor = colors.customizableBoldGray;
    public static spinnerCaptionColor = colors.textNeutralSoft;
    //#endregion Spinner

    //#region Popup
    public static get popupTextColor(): string {
      return this.textColorDefault;
    }
    public static popupBackground = colors.surfaceHigh;
    //#endregion

    //#region ScrollContainer
    public static scrollContainerScrollBarColor = colors.shapeSoftNeutralAlpha;
    public static scrollContainerScrollBarInvertColor = colors.shapeInvertedNeutralSoftAlpha;
    //#endregion

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
