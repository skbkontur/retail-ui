import * as colors from '@skbkontur/colors/tokens-default/dark';
import * as lightColors from '@skbkontur/colors/tokens-default/light';

import { createTheme, markAsDarkTheme, markThemeVersion } from '../../lib/theming/ThemeHelpers.js';
import { BasicThemeClassForExtension } from './BasicTheme.js';
import { DarkTheme6_4 } from './DarkTheme6_4.js';

export const DarkTheme6_5 = createTheme({
  themeClass: class DarkTheme6_5 extends BasicThemeClassForExtension {
    // from DarkTheme6_0
    public static brand = colors.shapeBoldBrandOriginal;
    public static bgDefault = colors.surfaceHigh;
    public static bgDisabled = colors.shapeOtherDisabled;
    public static errorText = colors.textErrorHeavy;
    public static borderColorDisabled = colors.lineNeutralFaint;
    public static placeholderColor = colors.textNeutralFaint;
    public static outlineColorFocus = colors.surfaceBase;
    public static placeholderColorLight = `color-mix(in srgb, ${colors.textNeutralFaint}, transparent 40%)`;
    public static textColorDefault = colors.textNeutralHeavy;
    public static textColorDisabled = colors.textNeutralFaint;
    public static borderColorFocus = colors.lineAccentBold;
    public static borderColorError = colors.lineErrorBold;
    public static borderColorWarning = colors.lineWarningBold;
    public static commentTextColor = colors.textNeutralSoft;
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
    public static tokenDisabledBg = colors.shapeOtherDisabled;
    public static tokenBg = colors.shapeFaintNeutralAlpha;
    public static tokenColor = colors.textNeutralHeavy;
    public static tokenBorderColor = colors.lineNeutralPale;
    public static tokenBgHover = colors.shapeFaintNeutralAlphaHover;
    public static tokenBorderColorHover = colors.lineNeutralPale;
    public static tokenBgActive = colors.shapeBoldAccent;
    public static tokenColorActive = colors.textOnAccentBoldHeavy;
    public static tokenInputTextColorDisabled = colors.textNeutralFaint;
    public static loaderBg = colors.shapeInvertedNeutralHeavy;
    public static btnDisabledBorderColor = colors.lineNeutralFaint;
    public static btnCheckedBg = colors.shapeBoldAccent;
    public static btnCheckedDisabledBg = colors.shapeOtherAccentBoldDisabled;
    public static btnCheckedDisabledColor = colors.textInvertedNeutralSoft;
    public static btnCheckedTextColor = colors.textOnAccentBoldHeavy;
    public static btnDefaultHoverTextColor = colors.textNeutralHeavy;
    public static btnDefaultBorderColor = colors.lineNeutralPale;
    public static btnSuccessBg = colors.shapeBoldSuccess;
    public static btnSuccessHoverBg = colors.shapeBoldSuccessHover;
    public static btnSuccessHoverTextColor = colors.textConstHeavyWhite;
    public static btnSuccessTextColor = colors.textConstHeavyWhite;
    public static btnSuccessActiveBg = colors.shapeBoldSuccessPressed;
    public static btnFillBg = colors.shapeOtherBase;
    public static btnFillHoverBg = colors.shapeOtherBaseHover;
    public static btnFillActiveBg = colors.shapeOtherBasePressed;
    public static btnPrimaryBg = colors.shapeBoldAccent;
    public static btnPrimaryHoverBg = colors.shapeBoldAccentHover;
    public static btnPrimaryActiveBg = colors.shapeBoldAccentPressed;
    public static btnPrimaryTextColor = colors.textOnAccentBoldHeavy;
    public static btnDangerBg = colors.shapeBoldError;
    public static btnDangerHoverBg = colors.shapeBoldErrorHover;
    public static btnDangerTextColor = colors.textConstHeavyWhite;
    public static btnDangerActiveBg = colors.shapeBoldErrorPressed;
    public static btnPayBg = colors.shapeBoldWarning;
    public static btnPayHoverBg = colors.shapeBoldWarningHover;
    public static btnPayTextColor = colors.textConstHeavyBlack;
    public static btnPayActiveBg = colors.shapeBoldWarningPressed;
    public static btnMenuArrowColor = colors.textNeutralSoft;
    public static btnDisabledBg = colors.shapeOtherDisabled;
    public static btnBorderColorWarning = colors.lineWarningBold;
    public static btnBorderColorError = colors.lineErrorBold;
    public static btnErrorSecondary = colors.shapeFaintError;
    public static btnWarningSecondary = colors.shapeFaintWarning;
    public static btnInsetColor = colors.surfaceBase;
    public static btnBacklessHoverBg = colors.shapeOtherBacklessAlphaHover;
    public static btnBacklessActiveBg = colors.shapeOtherBacklessAlphaPressed;
    public static btnTextHoverBg = colors.shapeOtherBacklessAlphaHover;
    public static btnTextActiveBg = colors.shapeOtherBacklessAlphaPressed;
    public static selectHoverBg = colors.shapeOtherFieldHover;
    public static selectActiveBg = colors.shapeOtherFieldPressed;
    public static tooltipCloseBtnColor = colors.textNeutralPale;
    public static tooltipCloseBtnHoverColor = colors.textNeutralHeavy;
    public static tooltipTextColor = colors.textNeutralHeavy;
    public static tooltipBg = colors.surfaceHigh;
    public static kebabBackgroundHover = colors.shapeOtherBacklessAlphaHover;
    public static kebabBackgroundActive = colors.shapeOtherBacklessAlphaPressed;
    public static kebabIconColor = colors.textNeutralSoft;
    public static modalBackBg = colors.surfaceModalBackdrop;
    // from DarkTheme6_1
    public static modalBg = colors.surfaceBase;
    // from DarkTheme6_0
    public static modalCloseButtonColor = colors.textNeutralPale;
    public static modalCloseButtonDisabledColor = colors.textNeutralFaint;
    public static modalCloseButtonHoverColor = colors.textNeutralHeavy;
    public static modalSeparatorBorderBottom = `1px solid ${colors.lineNeutralFaint}`;
    public static sidePageBackingBg = colors.surfaceModalBackdrop;
    public static sidePageCloseButtonColor = colors.textNeutralPale;
    public static sidePageCloseButtonHoverColor = colors.textNeutralHeavy;
    // from DarkTheme6_1
    public static sidePageBgDefault = colors.surfaceBase;
    // from DarkTheme6_0
    public static dateInputMaskColor = colors.textNeutralFaint;
    public static calendarBottomSeparatorBorderColor = colors.lineNeutralFaint;
    public static calendarBg = colors.surfaceHigh;
    public static calendarCellWeekendColor = colors.customizableHeavyRed;
    public static calendarCellSelectedBgColor = colors.shapeBoldAccent;
    public static calendarCellSelectedFontColor = colors.textOnAccentBoldHeavy;
    public static calendarMonthTitleBorderBottomColor = colors.lineNeutralFaint;
    public static calendarCellPressedBgColor = colors.shapeOtherBacklessAlphaPressed;
    public static timePickerPopupBg = colors.shapeOtherField;
    public static rangeCalendarCellBg = colors.shapeFaintNeutralAlpha;
    public static rangeCalendarCellEndBg = colors.shapeBoldAccent;
    public static rangeCalendarCellEndColor = colors.textOnAccentBoldHeavy;
    public static rangeCalendarCellHoverBg = colors.shapeOtherBacklessAlphaHover;
    public static pagingPageLinkActiveBg = colors.shapeOtherBacklessAlphaPressed;
    public static pagingPageLinkDisabledActiveBg = colors.shapeOtherDisabled;
    public static pagingPageLinkHoverBg = colors.shapeOtherBacklessAlphaHover;
    public static pagingDotsColor = colors.textNeutralFaint;
    public static pagingPageLinkHintColor = colors.textNeutralSoft;
    public static hintColor = colors.textInvertedNeutralHeavy;
    public static hintBgColor = colors.shapeHeavyNeutralSolid;
    public static toastErrorBg = colors.shapeBoldError;
    public static toastColor = colors.textInvertedNeutralHeavy;
    public static toastColorError = colors.textConstHeavyWhite;
    public static toastLinkColor = colors.textInvertedNeutralHeavy;
    public static toastLinkColorError = colors.textConstHeavyWhite;
    public static toastLinkBgHover = colors.shapeInvertedBacklessHover;
    public static toastLinkBgHoverError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkBgActive = colors.shapeInvertedBacklessPressed;
    public static toastLinkBgActiveError = colors.shapeConstBacklessWhiteHover;
    public static toastLinkColorActiveError = colors.textConstHeavyWhite;
    public static toastCloseColor = colors.textInvertedNeutralSoft;
    public static toastCloseColorError = colors.textConstSoftWhite;
    public static toastCloseHoverColor = colors.textInvertedNeutralHeavy;
    public static toastCloseHoverColorError = colors.textConstHeavyWhite;
    public static menuItemCommentColor = colors.textNeutralSoft;
    public static menuHeaderColor = colors.textNeutralSoft;
    public static menuSeparatorBorderColor = colors.lineNeutralFaint;
    public static toggleBgHover = colors.shapeOtherFieldHover;
    // from BasicTheme
    public static toggleBgPressed = lightColors.shapeOtherFieldPressed;
    // from DarkTheme6_0
    public static toggleBorderColor = colors.lineNeutralPale;
    public static toggleShadowColorError = colors.lineErrorBold;
    public static toggleShadowColorWarning = colors.lineWarningBold;
    public static toggleFocusShadowColor = colors.lineAccentBold;
    public static toggleContainerBg = colors.shapeOtherField;
    public static toggleHandleBg = colors.shapeOtherBase;
    public static toggleHandleBoxShadow = `0 0 0 1px ${colors.lineNeutralPale}`;
    public static toggleContainerBoxShadow = `inset 0 0 0 1px ${colors.lineNeutralPale}`;
    public static toggleHandleBgHover = colors.shapeOtherBase;
    public static toggleHandleBoxShadowHover = `0 0 0 1px ${colors.lineNeutralPale}`;
    public static toggleHandleBgChecked = colors.shapeInvertedNeutralHeavy;
    public static toggleBgChecked = colors.shapeBoldAccent;
    public static toggleContainerBgCheckedHover = colors.shapeBoldAccentHover;
    public static toggleHandleBgCheckedHover = colors.shapeInvertedNeutralHeavyHover;
    // from BasicTheme
    public static toggleContainerBgCheckedPressed = lightColors.shapeBoldAccentPressed;
    public static toggleHandleBgCheckedPressed = lightColors.shapeInvertedNeutralHeavyPressed;
    // from DarkTheme6_0
    public static toggleContainerBgDisabled = colors.shapeOtherDisabled;
    public static toggleContainerBoxShadowDisabled = `inset 0 0 0 1px ${colors.lineNeutralFaint}`;
    public static toggleHandleBoxShadowDisabled = `0 0 0 1px ${colors.lineNeutralFaint}`;
    public static toggleContainerBgDisabledChecked = colors.shapeOtherAccentBoldDisabled;
    public static toggleHandleBgDisabledChecked = colors.shapeInvertedNeutralHeavy;
    public static popupBackground = colors.surfaceHigh;
    public static inputBg = colors.shapeOtherField;
    public static inputIconColor = colors.textNeutralSoft;
    public static inputBorderColor = colors.lineNeutralPale;
    public static inputBackgroundClip = 'padding-box';
    public static inputBorderColorHover = colors.lineNeutralPaleHover;
    public static inputAffixColor = colors.textNeutralSoft;
    public static inputBlinkColor = colors.shapeFaintNeutralAlpha;
    // from DarkTheme6_1
    public static inputCounterColor = colors.textNeutralSoft;
    public static inputCounterHelpIconColor = colors.textNeutralSoft;
    // from DarkTheme6_0
    public static checkboxTextColorDisabled = colors.textNeutralFaint;
    public static get checkboxShadowDisabled(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralFaint}`;
    }
    public static checkboxCheckedColor = colors.shapeInvertedNeutralHeavy;
    public static checkboxBg = colors.shapeOtherField;
    public static checkboxHoverBg = colors.shapeOtherFieldHover;
    public static checkboxActiveBg = colors.shapeOtherFieldPressed;
    public static checkboxCheckedBg = colors.shapeBoldAccent;
    public static checkboxBgDisabled = colors.shapeOtherDisabled;
    public static checkboxCheckedHoverBg = colors.shapeBoldAccentHover;
    public static checkboxCheckedActiveBg = colors.shapeBoldAccentPressed;
    public static get textareaBorderColor(): string {
      return this.inputBorderColor;
    }
    public static get textareaBorderTopColor(): string {
      return this.inputBorderTopColor;
    }
    public static textareaCounterColor = colors.textNeutralSoft;
    // from DarkTheme6_1
    public static textareaCounterBg = colors.surfaceBase;
    public static textareaCounterHelpIconColor = colors.textNeutralSoft;
    // from DarkTheme6_0
    public static radioBgColor = colors.shapeOtherField;
    public static get radioBorderColor(): string {
      return colors.lineNeutralPale;
    }
    // from DarkTheme6_4
    public static radioDisabledBorderColor = colors.lineNeutralFaint;
    public static get radioCheckedDisabledBulletBg(): string {
      return colors.lineNeutralPale;
    }
    // from DarkTheme6_0
    public static tabColorHover = colors.lineNeutralPale;
    public static tabColorHoverError = colors.shapeBoldErrorHover;
    public static tabColorHoverWarning = colors.shapeBoldWarningHover;
    public static tabColorHoverSuccess = colors.shapeBoldSuccessHover;
    public static tabColorHoverPrimary = colors.lineAccentPale;
    // from BasicTheme
    public static tabColorPressed = lightColors.lineNeutralPalePressed;
    // from DarkTheme6_0
    public static spinnerColor = colors.customizableBoldRed;
    public static spinnerDimmedColor = colors.customizableBoldGray;
    public static spinnerCaptionColor = colors.textNeutralSoft;
    public static switcherBtnDisabledBorderColor = colors.lineNeutralPale;
    public static scrollContainerScrollBarColor = colors.shapeSoftNeutralAlpha;
    public static scrollContainerScrollBarInvertColor = colors.shapeInvertedNeutralSoftAlpha;
    public static passwordInputVisibilityIconColor = colors.textNeutralHeavy;
    public static passwordInputVisibilityIconHoverColor = colors.textNeutralHeavy;
    public static globalLoaderColor = colors.shapeBoldBrandOriginal;
    public static fileUploaderBorderColor = colors.lineNeutralPale;
    public static fileUploaderIconColor = colors.textNeutralPale;
    public static fileUploaderIconHoverColor = colors.textNeutralHeavy;
    // from BasicTheme
    public static fileUploaderTileIconColorBg = lightColors.shapeFaintAccent;
    public static fileUploaderTileIconHoverColorBg = lightColors.shapeFaintAccentHover;
    public static fileUploaderTileIconActiveColorBg = lightColors.shapeFaintAccentPressed;
    public static fileUploaderTileIconColor = lightColors.textInvertedAccentHeavy;
    public static fileUploaderTileIconHoverColor = lightColors.textInvertedAccentHeavyHover;
    // from DarkTheme6_0
    public static fileUploaderDisabledBorderColor = colors.lineNeutralFaint;
    public static fileUploaderErrorBgColor = colors.shapeFaintError;
    public static fileUploaderErrorBgHoverColor = colors.shapeFaintErrorHover;
    public static fileUploaderErrorTextColor = colors.textErrorHeavy;
    public static fileUploaderWarningBgColor = colors.shapeFaintWarning;
    public static fileUploaderWarningBgHoverColor = colors.shapeFaintWarningHover;
    public static fileUploaderWarningTextColor = colors.textWarningHeavy;
    public static fileUploaderHoveredBg = colors.shapeOtherBacklessAlphaHover;
    public static fileUploaderActiveBg = colors.shapeOtherBacklessAlphaPressed;
    // from BasicTheme
    public static fileUploaderFileTypeCodeIconColor = lightColors.customizableBoldPurple;
    public static fileUploaderFileTypePictureIconColor = lightColors.customizableBoldBlue;
    public static fileUploaderFileTypePresentationIconColor = lightColors.customizableBoldOrange;
    public static fileUploaderFileTypeTableIconColor = lightColors.customizableBoldGreen;
    public static fileUploaderFileTypeTextIconColor = lightColors.customizableBoldBlue;
    public static fileUploaderFileTypeArchiveIconColor = lightColors.customizableHeavyOrange;
    public static fileUploaderFileTypeFolderIconColor = lightColors.customizableBoldYellow;
    // from DarkTheme6_0
    public static fileUploaderDisabledColor = colors.textNeutralFaint;
    public static clearCrossIconColor = colors.textNeutralSoft;
    public static clearCrossIconHoverColor = colors.textNeutralHeavy;
    public static closeBtnIconColor = colors.textNeutralPale;
    public static closeBtnIconDisabledColor = colors.textNeutralFaint;
    public static closeBtnIconHoverColor = colors.textNeutralHeavy;
    public static validationsTextColorWarning = colors.textWarningHeavy;

    //#region Calendar
    public static calendarCellHoverBgColor = colors.shapeOtherBacklessAlphaHover;
    //#endregion Calendar

    //#region DateSelect
    public static get dateSelectLinkPressedColor(): string {
      return this.linkActiveColor;
    }
    //#endregion DateSelect

    //#region Toast
    public static toastBg = colors.shapeHeavyNeutralSolid;
    //#endregion Toast

    //#region MenuItem
    public static menuItemSelectedBg = colors.shapePaleNeutralAlpha;
    public static menuItemSelectedHoverBg = colors.shapePaleNeutralAlphaHover;
    public static menuItemSelectedPressedBg = colors.shapePaleNeutralAlphaPressed;
    public static menuItemHoverBg = colors.shapeOtherBacklessAlphaHover;
    public static menuItemPressedBg = colors.shapeOtherBacklessAlphaPressed;
    //#endregion MenuItem

    //#region Toggle
    public static toggleContainerBoxShadowHover = `inset 0 0 0 1px ${colors.lineNeutralPale}`;
    //#endregion Toggle

    //#region Checkbox
    public static get checkboxShadow(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPale}, 0 0 0 ${this.checkboxBorderWidth} ${colors.shapeOtherField}`;
    }
    public static get checkboxShadowHover(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPale}, 0 0 0 ${this.checkboxBorderWidth} ${colors.shapeOtherFieldHover}`;
    }
    public static get checkboxShadowActive(): string {
      return `0 0 0 ${this.checkboxBorderWidth} ${colors.lineNeutralPale}, 0 0 0 ${this.checkboxBorderWidth} ${colors.shapeOtherFieldPressed}`;
    }
    //#endregion Checkbox

    //#region Token
    public static tokenBgPressed = colors.shapeFaintNeutralAlphaPressed;
    //#endregion Token

    //#region FileUploader
    public static fileUploaderErrorBgPressedColor = colors.shapeFaintErrorPressed;
    public static fileUploaderWarningBgPressedColor = colors.shapeFaintWarningPressed;
    //#endregion FileUploader
  },
  prototypeTheme: DarkTheme6_4,
  themeMarkers: [markAsDarkTheme, markThemeVersion('6.5')],
});
