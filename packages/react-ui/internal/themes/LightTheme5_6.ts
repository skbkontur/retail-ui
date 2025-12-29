import * as colors from '@skbkontur/colors/default-light';

import { createTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers';

import { BasicThemeClassForExtension } from './BasicTheme';
import { LightTheme5_5 } from './LightTheme5_5';

export const LightTheme5_6 = createTheme({
  themeClass: class LightTheme5_6 extends BasicThemeClassForExtension {
    //#region Common variables
    public static bgDefault = colors.surfaceHigh;

    public static brand = colors.shapeBoldBrandOriginal;

    public static get bgSecondary() {
      return this.bgDefault;
    }
    public static bgDisabled = colors.shapeOtherDisabled;
    public static errorText = colors.textErrorHeavy;
    public static get errorSecondary() {
      return this.redXxLight;
    }

    public static borderColorDisabled = colors.lineNeutralFaint;
    public static placeholderColor = colors.textNeutralFaint;
    public static outlineColorFocus = colors.surfaceBase;
    public static placeholderColorLight = `color-mix(in srgb, ${colors.textNeutralFaint}, transparent 40%)`;
    public static textColorDefault = colors.textNeutralHeavy;
    public static textColorDisabled = colors.textNeutralFaint;
    public static borderColorFocus = colors.lineAccentBold;
    public static borderColorError = colors.lineErrorBold;
    public static borderColorWarning = colors.lineWarningBold;
    //#endregion Common variables
    //#region Link
    public static linkColor = colors.textAccentHeavy;
    public static linkHoverColor = colors.textAccentHeavyHover;
    public static linkActiveColor = colors.textAccentHeavyPressed;
    public static linkSuccessColor = colors.textSuccessHeavy;
    public static linkSuccessHoverColor = colors.textSuccessHeavyHover;
    public static linkSuccessActiveColor = colors.textSuccessHeavyPressed;
    public static linkDangerColor = colors.textErrorHeavy;
    public static linkDangerHoverColor = colors.textErrorHeavyHover;
    public static linkDangerActiveColor = colors.textErrorHeavyPressed;
    public static linkDisabledColor = colors.textNeutralFaint;
    public static linkGrayedColor = colors.textNeutralSoft;
    public static linkGrayedHoverColor = colors.textNeutralHeavy;
    public static linkGrayedActiveColor = colors.textNeutralHeavy;
    public static linkFocusOutlineColor = colors.lineAccentBold;
    //#endregion Link
    //#region Token
    public static tokenDisabledBg = colors.shapeOtherDisabled;
    public static tokenBg = colors.shapeFaintNeutralAlpha;
    public static tokenColor = colors.textNeutralHeavy;
    public static tokenBorderColor = colors.lineNeutralPale;
    public static tokenBgHover = colors.shapeFaintNeutralAlphaHover;
    public static get tokenColorHover() {
      return this.tokenColor;
    }
    public static tokenBgActive = colors.shapeBoldAccent;
    public static tokenColorActive = colors.textOnAccentBoldHeavy;
    //#endregion Token
    //#region TokenInput
    public static get tokenInputBorderColor() {
      return this.inputBorderColor;
    }
    public static get tokenInputBorderColorHover() {
      return this.inputBorderColorHover;
    }
    public static get tokenInputBorderColorFocus() {
      return this.inputBorderColorFocus;
    }
    public static get tokenInputBorderColorError() {
      return this.inputBorderColorError;
    }
    public static get tokenInputBorderColorWarning() {
      return this.inputBorderColorWarning;
    }
    public static get tokenInputBorderTopColor() {
      return this.inputBorderTopColor;
    }
    public static get tokenInputPlaceholderColor() {
      return this.inputPlaceholderColor;
    }
    public static get tokenInputPlaceholderColorLight() {
      return this.inputPlaceholderColorLight;
    }
    public static get tokenInputDisabledBg() {
      return this.inputDisabledBg;
    }
    public static get tokenInputDisabledBorderColor() {
      return this.inputDisabledBorderColor;
    }
    public static get tokenInputBorderWidth() {
      return this.inputBorderWidth;
    }
    public static get tokenInputOutlineWidth() {
      return this.inputOutlineWidth;
    }
    public static get tokenInputBg() {
      return this.inputBg;
    }
    public static tokenInputMenuPopupBg = 'transparent';
    public static get tokenInputShadow() {
      return this.inputShadow;
    }
    public static get tokenInputTextColor() {
      return this.inputTextColor;
    }
    public static get tokenInputTextColorDisabled() {
      return this.textColorDisabledContrast;
    }
    public static get tokenInputPlaceholderColorDisabled() {
      return this.textColorDisabledContrast;
    }
    //#endregion TokenInput
    //#region Loader
    public static loaderBg = colors.shapeInvertedNeutralHeavy;
    //#endregion
    //#region Button
    public static btnDisabledBorderColor = colors.lineNeutralFaint;
    public static btnCheckedBg = colors.shapeBoldAccent;
    public static btnCheckedDisabledBg = colors.shapeOtherAccentBoldDisabled;
    public static btnCheckedDisabledColor = colors.textInvertedNeutralSoft;
    public static btnCheckedTextColor = colors.textOnAccentBoldHeavy;
    public static btnDefaultBg = colors.shapeOtherBase;
    public static btnDefaultHoverBg = colors.shapeOtherBaseHover;
    public static btnDefaultActiveBg = colors.shapeOtherBasePressed;
    public static btnDefaultHoverTextColor = colors.textNeutralHeavy;
    public static btnDefaultBorderColor = colors.lineNeutralPale;
    public static btnSuccessBg = colors.shapeBoldSuccess;
    public static get btnSuccessBorderColor() {
      return this.btnSuccessBg;
    }
    public static btnSuccessHoverBg = colors.shapeBoldSuccessHover;
    public static get btnSuccessHoverBorderColor() {
      return this.btnSuccessHoverBg;
    }
    public static btnSuccessHoverTextColor = colors.textConstHeavyWhite;
    public static btnSuccessTextColor = colors.textConstHeavyWhite;
    public static btnSuccessActiveBg = colors.shapeBoldSuccessPressed;
    public static get btnSuccessActiveBorderColor() {
      return this.btnSuccessActiveBg;
    }
    public static btnPrimaryBg = colors.shapeBoldAccent;
    public static btnPrimaryHoverBg = colors.shapeBoldAccentHover;
    public static btnPrimaryActiveBg = colors.shapeBoldAccentPressed;
    public static btnPrimaryHoverTextColor = '';
    public static get btnPrimaryBorderColor() {
      return this.btnPrimaryBg;
    }
    public static get btnPrimaryHoverBorderColor() {
      return this.btnPrimaryHoverBg;
    }
    public static get btnPrimaryActiveBorderColor() {
      return this.btnPrimaryActiveBg;
    }
    public static btnPrimaryTextColor = colors.textOnAccentBoldHeavy;
    public static btnDangerBg = colors.shapeBoldError;
    public static btnDangerHoverBg = colors.shapeBoldErrorHover;
    public static get btnDangerHoverBorderColor() {
      return this.btnDangerHoverBg;
    }
    public static btnDangerTextColor = colors.textConstHeavyWhite;
    public static btnDangerActiveBg = colors.shapeBoldErrorPressed;
    public static get btnDangerActiveBorderColor() {
      return this.btnDangerActiveBg;
    }
    public static btnPayBg = colors.shapeBoldWarning;
    public static get btnPayBorderColor() {
      return this.btnPayBg;
    }
    public static btnPayHoverBg = colors.shapeBoldWarningHover;
    public static get btnPayHoverBorderColor() {
      return this.btnPayHoverBg;
    }
    public static btnPayTextColor = colors.textConstHeavyBlack;
    public static btnPayActiveBg = colors.shapeBoldWarningPressed;
    public static get btnPayActiveBorderColor() {
      return this.btnPayActiveBg;
    }
    public static btnMenuArrowColor = colors.textNeutralSoft;
    public static btnDisabledBg = colors.shapeOtherDisabled;
    public static btnBorderColorWarning = colors.lineWarningBold;
    public static btnBorderColorError = colors.lineErrorBold;
    public static btnErrorSecondary = colors.shapeFaintError;
    public static btnWarningSecondary = colors.shapeFaintWarning;
    public static btnInsetColor = colors.surfaceBase;
    public static get btnDisabledTextColor() {
      return this.textColorDisabled;
    }
    public static btnBacklessBg = 'transparent';
    public static btnBacklessHoverBg = colors.shapeOtherBacklessHover;
    public static btnBacklessActiveBg = colors.shapeOtherBacklessPressed;
    public static get btnBacklessActiveBorderColor() {
      return this.btnBacklessBorderColor;
    }
    public static get btnBacklessBorderColor() {
      return this.btnDefaultBorderColor;
    }
    public static get btnBacklessDisabledBorderColor() {
      return this.btnDisabledBorderColor;
    }
    public static get btnBacklessHoverBorderColor() {
      return this.btnBacklessBorderColor;
    }
    public static btnBacklessHoverTextColor = '';
    public static get btnBacklessTextColor() {
      return this.btnDefaultTextColor;
    }
    public static btnTextHoverBg = colors.shapeOtherBacklessHover;
    public static btnTextActiveBg = colors.shapeOtherBacklessPressed;
    //#endregion Button
    //#region Select
    public static get selectDefaultBg() {
      return this.inputBg;
    }
    public static selectHoverBg = colors.shapeOtherFieldHover;
    public static selectActiveBg = colors.shapeOtherFieldPressed;
    public static selectPlaceholderColor = this.placeholderColor;
    public static get selectPlaceholderColorDisabled() {
      return this.textColorDisabled;
    }
    public static get selectMenuArrowColorDisabled() {
      return this.textColorDisabled;
    }
    public static get selectBgDisabled() {
      return this.inputDisabledBg;
    }
    public static get selectBorderColorDisabled() {
      return this.btnDisabledBorderColor;
    }
    public static get selectBorderColorHover() {
      return this.btnDefaultHoverBorderColor;
    }
    //#endregion Select
    //#region Tooltip
    public static tooltipCloseBtnColor = colors.textNeutralPale;
    public static tooltipCloseBtnHoverColor = colors.textNeutralHeavy;
    public static tooltipTextColor = colors.textNeutralHeavy;
    public static tooltipBg = colors.surfaceHigh;
    //#endregion Tooltip
    //#region Kebab
    public static kebabBackgroundHover = colors.shapeOtherBacklessHover;
    public static kebabBackgroundActive = colors.shapeOtherBacklessPressed;
    public static kebabIconColor = colors.textNeutralSoft;
    //#endregion
    //#region Modal
    public static modalBackBg = colors.surfaceModalBackdrop;
    public static modalBg = colors.surfaceHigh;
    public static modalBackOpacity = '1';
    public static modalCloseButtonColor = colors.textNeutralPale;
    public static modalCloseButtonDisabledColor = colors.textNeutralFaint;
    public static modalCloseButtonHoverColor = colors.textNeutralHeavy;
    public static get modalFixedHeaderBg() {
      return this.modalBg;
    }
    public static get modalFooterBg() {
      return this.modalBg;
    }
    public static get modalHeaderTextColor() {
      return this.textColorDefault;
    }
    public static modalSeparatorBorderBottom = `1px solid ${colors.lineNeutralFaint}`;
    //#endregion
    //#region SidePage
    public static get sidePageFooterPanelBg() {
      return this.sidePageBgDefault;
    }
    public static sidePageBackingBg = colors.surfaceModalBackdrop;
    public static sidePageBackingBgOpacity = '1';
    public static sidePageCloseButtonColor = colors.textNeutralPale;
    public static sidePageCloseButtonHoverColor = colors.textNeutralHeavy;
    public static sidePageBgDefault = colors.surfaceHigh;
    public static get sidePageHeaderTextColor() {
      return this.textColorDefault;
    }
    //#endregion SidePage
    //#region DateInput
    public static dateInputMaskColor = colors.textNeutralFaint;
    //#endregion DateInput
    //#region Calendar
    public static calendarBottomSeparatorBorderColor = colors.lineNeutralFaint;
    public static get calendarBottomSeparatorBorder() {
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
    public static get calendarMonthHeaderStickedBgColor() {
      return this.calendarBg;
    }
    public static calendarMonthTitleBorderBottomColor = colors.lineNeutralFaint;
    public static calendarCellHoverBgColor = colors.shapeOtherBacklessHover;
    //#endregion Calendar
    //#region DatePicker
    public static get datePickerOpenBtnColor() {
      return this.textColorDefault;
    }
    //#endregion DatePicker
    //#region DateRangePicker
    public static rangeCalendarCellBg = colors.shapeFaintNeutralAlpha;
    public static rangeCalendarCellEndBg = colors.shapeBoldAccent;
    public static rangeCalendarCellEndColor = colors.textOnAccentBoldHeavy;
    public static rangeCalendarCellHoverBg = colors.shapeOtherBacklessHover;
    //#endregion
    //#region DateSelect
    public static get dateSelectMenuBg() {
      return this.bgSecondary;
    }
    public static get dateSelectMenuItemBgDisabled() {
      return this.bgSecondary;
    }
    public static dateSelectMenuItemFontActive = '';
    public static get dateSelectMenuItemFontSelected() {
      return this.textColorDefault;
    }
    public static get dateSelectMenuItemFontDisabled() {
      return this.textColorDisabled;
    }
    public static get dateSelectTextColorDisabled() {
      return this.textColorDisabled;
    }
    public static get dateSelectTextColorDefault() {
      return this.textColorDefault;
    }
    public static get dateSelectLinkColor() {
      return this.linkColor;
    }
    public static get dateSelectPopupBoxShadow() {
      return this.popupBoxShadow;
    }
    public static dateSelectTextColorInvert = '';
    //#endregion DateSelect
    //#region Paging
    public static pagingPageLinkActiveBg = colors.shapeOtherBacklessPressed;
    public static pagingPageLinkDisabledActiveBg = colors.shapeOtherDisabled;
    public static pagingPageLinkHoverBg = colors.shapeOtherBacklessHover;
    public static pagingDotsColor = colors.textNeutralFaint;
    public static pagingPageLinkHintColor = colors.textNeutralSoft;
    //#endregion Paging
    //#region Hint
    public static hintColor = colors.textInvertedNeutralHeavy;
    public static get mobileHintColor() {
      return this.hintColor;
    }
    public static hintBgColor = colors.shapeHeavyNeutral;
    //#endregion Hint
    //#region Toast
    public static toastBg = colors.shapeHeavyNeutral;
    public static toastErrorBg = colors.shapeBoldError;
    public static toastColor = colors.textInvertedNeutralHeavy;
    public static toastLinkColor = colors.textInvertedNeutralHeavy;
    public static toastLinkTextDecorationHover = '';
    public static toastLinkBgHover = colors.shapeInvertedBacklessHover;
    public static toastLinkBgActive = colors.shapeInvertedBacklessPressed;
    public static toastCloseColor = colors.textInvertedNeutralSoft;
    public static toastCloseHoverColor = colors.textInvertedNeutralHeavy;
    public static toastColorError = colors.textConstHeavyWhite;
    public static toastLinkColorError = colors.textConstHeavyWhite;
    public static toastLinkBgHoverError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkBgActiveError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkColorActiveError = colors.textConstHeavyWhite;
    public static toastCloseColorError = colors.textConstSoftWhite;
    public static toastCloseHoverColorError = colors.textConstHeavyWhite;
    //#endregion Toast
    //#region Dropdown
    public static get dropdownMenuHoverBorderColor() {
      return this.btnDefaultHoverBorderColor;
    }
    public static get dropdownDefaultBg() {
      return this.btnDefaultBg;
    }
    public static get dropdownBgDisabled() {
      return this.btnDisabledBg;
    }
    public static get dropdownBorderColorDisabled() {
      return this.btnDisabledBorderColor;
    }
    public static get dropdownTextColorDisabled() {
      return this.btnDisabledTextColor;
    }
    //#endregion Dropdown
    //#region Menu
    public static menuBgDefault = colors.surfaceHigh;
    public static menuItemSelectedBg = colors.shapeOtherBacklessPressed;
    public static menuItemHoverBg = colors.shapeOtherBacklessHover;
    public static get menuItemHoverColor() {
      return this.menuItemTextColor;
    }
    public static get menuItemLinkColor() {
      return this.linkColor;
    }
    public static menuItemCommentColor = colors.textNeutralSoft;
    public static menuItemCommentOpacity = '1';
    public static get menuItemCommentColorHover() {
      return this.menuItemTextColor;
    }
    public static get menuItemDisabledColor() {
      return this.textColorDisabled;
    }
    // menuMessage
    public static get menuMessageTextColor() {
      return this.menuItemDisabledColor;
    }
    public static get menuMessageBg() {
      return this.menuItemDisabledBg;
    }
    //menuHeader
    public static menuHeaderColor = colors.textNeutralSoft;
    //menuFooter
    public static get menuFooterColor() {
      return this.menuHeaderColor;
    }
    //menuSeparator
    public static menuSeparatorBorderColor = colors.lineNeutralFaint;
    //#endregion Menu
    //#region Toggle
    public static get toggleTextColor() {
      return this.textColorDefault;
    }
    public static toggleBaseBg = 'transparent';
    public static toggleBgHover = colors.shapeOtherFieldHover;
    public static toggleBorderColor = colors.lineNeutralPale;
    public static get toggleBorderColorDisabled() {
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
    public static get toggleContainerBgHover() {
      return this.toggleBgHover;
    }
    // checked
    public static toggleContainerBoxShadowChecked = 'none';
    public static toggleHandleBoxShadowChecked = 'none';
    public static toggleHandleBgChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleBgChecked = colors.shapeBoldAccent;
    public static get toggleContainerBgChecked() {
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
    public static get toggleBgDisabled() {
      return this.bgDisabled;
    }
    // disabled checked
    public static toggleContainerBgDisabledChecked = colors.shapeOtherAccentBoldDisabled;
    public static toggleHandleBgDisabledChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleContainerBoxShadowDisabledChecked = 'none';
    public static toggleHandleBoxShadowDisabledChecked = 'none';
    public static get toggleBorderColorDisabledChecked() {
      return this.toggleBorderColor;
    }
    //#endregion Toggle
    //#region Popup
    public static get popupTextColor() {
      return this.textColorDefault;
    }
    public static popupBackground = colors.surfaceHigh;
    //#endregion
    //#region Input
    public static inputBg = colors.shapeOtherField;
    public static inputIconColor = colors.textNeutralSoft;
    public static get inputDisabledBg() {
      return this.bgDisabled;
    }
    public static inputBorderColor = colors.lineNeutralPale;
    public static inputBorderColorHover = colors.lineNeutralPaleHover;
    public static get inputBorderTopColor() {
      return this.inputBorderColor;
    }
    public static get inputPlaceholderColor() {
      return this.placeholderColor;
    }
    public static get inputPlaceholderColorLight() {
      return this.placeholderColorLight;
    }
    public static inputBlinkColor = colors.shapeFaintNeutralAlpha;
    //#endregion Input
    //#region Checkbox
    public static get checkboxTextColorDefault() {
      return this.textColorDefault;
    }
    public static checkboxTextColorDisabled = colors.textNeutralFaint;
    public static get checkboxShadowDisabled() {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralFaint}`;
    }
    public static checkboxBorder = 'none';
    public static get checkboxShadow() {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPale}`;
    }
    public static get checkboxShadowHover() {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPaleHover}`;
    }
    public static checkboxCheckedColor = colors.shapeInvertedNeutralHeavy;
    public static get checkboxBorderColorWarning() {
      return this.borderColorWarning;
    }
    public static get checkboxBorderColorError() {
      return this.borderColorError;
    }
    public static get checkboxCheckedHoverShadow() {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedHoverBg}`;
    }
    public static get checkboxCheckedShadow() {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedBg}`;
    }
    public static get checkboxCheckedActiveShadow() {
      return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedActiveBg}`;
    }
    public static get checkboxBorderColorFocus() {
      return this.borderColorFocus;
    }
    public static checkboxBg = colors.shapeOtherField;
    public static checkboxHoverBg = colors.shapeOtherFieldHover;
    public static checkboxActiveBg = colors.shapeOtherFieldPressed;
    public static checkboxCheckedBg = colors.shapeBoldAccent;
    public static checkboxBgDisabled = colors.shapeOtherDisabled;
    public static checkboxCheckedHoverBg = colors.shapeBoldAccentHover;
    public static checkboxCheckedActiveBg = colors.shapeBoldAccentPressed;
    public static get checkboxShadowActive() {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPalePressed}`;
    }
    //#endregion Checkbox
    //#region TextArea
    public static textareaBg = colors.shapeOtherField;
    public static get textareaColor() {
      return this.textColorDefault;
    }
    public static get textareaTextColorDisabled() {
      return this.textColorDisabled;
    }
    public static get textareaPlaceholderColorLight() {
      return this.placeholderColorLight;
    }
    public static get textareaPlaceholderColor() {
      return this.placeholderColor;
    }
    public static get textareaPlaceholderColorDisabled() {
      return this.textColorDisabled;
    }
    public static textareaShadow = 'none';
    public static textareaBorderColor = colors.lineNeutralPale;
    public static get textareaBorderColorFocus() {
      return this.borderColorFocus;
    }
    public static get textareaBorderColorHover() {
      return this.inputBorderColorHover;
    }
    public static get textareaBorderColorWarning() {
      return this.borderColorWarning;
    }
    public static get textareaBorderColorError() {
      return this.borderColorError;
    }
    public static get textareaDisabledBg() {
      return this.inputDisabledBg;
    }
    public static get textareaDisabledBorderColor() {
      return this.borderColorDisabled;
    }
    public static textareaCounterColor = colors.textNeutralSoft;
    public static textareaCounterBg = 'transparent';
    public static get textareaCounterErrorColor() {
      return this.errorText;
    }
    public static textareaCounterHelpIconColor = colors.textNeutralHeavy;
    //#endregion Textarea
    //#region Radio
    public static radioBgColor = colors.shapeOtherField;
    public static get radioHoverBg() {
      return this.checkboxHoverBg;
    }
    public static get radioActiveBg() {
      return this.checkboxActiveBg;
    }
    public static get radioBorderColor() {
      return colors.lineNeutralPale;
    }
    public static radioBoxShadow = 'none';
    public static get radioBorder() {
      return `${this.radioBorderWidth} solid ${this.radioBorderColor}`;
    }
    public static get radioBorderColorFocus() {
      return this.borderColorFocus;
    }
    public static get radioBorderColorWarning() {
      return this.borderColorWarning;
    }
    public static get radioBorderColorError() {
      return this.borderColorError;
    }
    public static radioHoverShadow = 'none';
    public static radioActiveShadow = 'none';
    public static get radioCheckedBgColor() {
      return this.checkboxCheckedBg;
    }
    public static radioCheckedBorderColor = 'transparent';
    public static get radioCheckedBulletColor() {
      return this.checkboxCheckedColor;
    }
    public static get radioCheckedHoverBgColor() {
      return this.checkboxCheckedHoverBg;
    }
    public static get radioDisabledBg() {
      return this.checkboxBgDisabled;
    }
    public static get radioDisabledShadow() {
      return `0 0 0 ${this.radioBorderWidth} ${colors.lineNeutralFaint}`;
    }
    public static get radioCheckedDisabledBulletBg() {
      return this.checkboxTextColorDisabled;
    }
    //#endregion
    //#region Tabs
    public static get tabTextColorDefault() {
      return this.textColorDefault;
    }
    public static get tabColorFocus() {
      return this.borderColorFocus;
    }
    public static get tabColorPrimary() {
      return this.btnPrimaryBg;
    }
    public static tabColorHover = colors.lineNeutralPale;
    public static tabColorHoverPrimary = colors.lineAccentPale;
    public static tabColorHoverSuccess = colors.shapeBoldSuccessHover;
    public static tabColorHoverWarning = colors.shapeBoldWarningHover;
    public static tabColorHoverError = colors.shapeBoldErrorHover;
    //#endregion Tabs
    public static spinnerColor = colors.customizableBoldRed;
    public static spinnerDimmedColor = colors.customizableBoldGray;
    public static spinnerCaptionColor = colors.textNeutralSoft;
    //#endregion
    //#region Switcher
    public static get switcherTextColor() {
      return this.textColorDefault;
    }
    public static get switcherOutlineWidth() {
      return this.btnOutlineWidth;
    }
    public static switcherBtnDisabledBorderColor = colors.lineNeutralPale;
    public static get switcherButtonDisabledBorderColor() {
      return this.switcherBtnDisabledBorderColor;
    }
    public static get switcherButtonCheckedDisabledShadow() {
      return this.btnCheckedDisabledShadow;
    }
    //#endregion
    //#region ScrollContainer
    public static scrollContainerScrollBarColor = colors.shapeSoftNeutralAlpha;
    public static scrollContainerScrollBarInvertColor = colors.shapeInvertedNeutralSoftAlpha;
    //#endregion
    //#region PasswordInput
    public static passwordInputVisibilityIconColor = colors.textNeutralHeavy;
    public static passwordInputVisibilityIconOpacity = '0.64';
    public static passwordInputVisibilityIconHoverColor = colors.textNeutralHeavy;
    public static passwordInputVisibilityIconHoverOpacity = '1';
    //#endregion
    //#region GlobalLoader
    public static globalLoaderColor = colors.shapeBoldBrandOriginal;
    //#endregion
    //#region FileUploader
    public static fileUploaderBg = '';
    public static fileUploaderUploadButtonBg = 'transparent';
    public static get fileUploaderTextColorDefault() {
      return this.textColorDefault;
    }
    public static fileUploaderBorderColor = colors.lineNeutralPale;
    public static get fileUploaderDisabledBorder() {
      return `${this.fileUploaderBorderWidth} ${this.fileUploaderBorderStyle} ${this.fileUploaderDisabledBorderColor}`;
    }
    public static get fileUploaderBorderColorFocus() {
      return this.borderColorFocus;
    }
    public static fileUploaderErrorBgColor = colors.shapeFaintError;
    public static fileUploaderErrorBgHoverColor = colors.shapeFaintErrorHover;
    public static fileUploaderWarningBgColor = colors.shapeFaintWarning;
    public static fileUploaderWarningBgHoverColor = colors.shapeFaintWarningHover;
    public static fileUploaderWarningTextColor = colors.textWarningHeavy;
    public static fileUploaderDisabledColor = colors.textNeutralFaint;
    public static get fileUploaderLinkColor() {
      return this.textColorDefault;
    }
    public static fileUploaderAfterLinkColor = colors.textNeutralSoft;
    public static fileUploaderIconColor = colors.textNeutralPale;
    public static fileUploaderIconHoverColor = colors.textNeutralHeavy;
    public static get fileUploaderBorderColorError() {
      return this.borderColorError;
    }
    public static get fileUploaderBorderColorWarning() {
      return this.borderColorWarning;
    }
    public static get fileUploaderDisabledBg() {
      return this.btnDisabledBg;
    }
    public static fileUploaderDisabledBorderColor = colors.lineNeutralFaint;
    public static get fileUploaderDisabledTextColor() {
      return this.textColorDisabled;
    }
    public static get fileUploaderDisabledLinkColor() {
      return this.textColorDisabled;
    }
    public static get fileUploaderDisabledIconColor() {
      return this.textColorDisabled;
    }
    public static fileUploaderHoveredBg = colors.shapeOtherBacklessHover;
    public static fileUploaderHoveredBorderColor = 'transparent';
    public static get fileUploaderDragOverBorderColor() {
      return this.borderColorFocus;
    }
    //#endregion FileUploader
    //#region ClearCrossIcon
    public static clearCrossIconColor = colors.textNeutralSoft;
    public static clearCrossIconHoverColor = colors.textNeutralHeavy;
    //#endregion ClearCrossIcon
    //#region CloseIcon
    public static closeBtnIconColor = colors.textNeutralPale;
    public static closeBtnIconDisabledColor = colors.textNeutralFaint;
    public static closeBtnIconHoverColor = colors.textNeutralHeavy;
    //#endregion CloseIcon
    //#region react-ui-validations
    public static get validationsTextColorError() {
      return this.errorText;
    }
    public static validationsTextColorWarning = colors.textWarningHeavy;
    //#endregion
  },
  prototypeTheme: LightTheme5_5,
  themeMarkers: [markThemeVersion('5.6')],
});
