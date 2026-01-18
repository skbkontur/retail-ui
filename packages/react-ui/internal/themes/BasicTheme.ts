import * as colors from '@skbkontur/colors/default-light';

import { createTheme } from '../../lib/theming/ThemeHelpers.js';

export class BasicThemeClass {
  //#region Common variables
  public static baseFontFamily = '"Lab Grotesque", "Lab Grotesque K", Arial, sans-serif';
  public static labGrotesqueBaselineCompensation = '1';
  public static brand = colors.shapeBoldBrandOriginal;
  public static white = '#fff';
  public static grayXLight = '#ebebeb';
  public static gray = '#858585';
  public static grayDark = '#333';
  public static black = '#000';

  public static blueXxLight = '#cdedff';
  public static blueLight = '#1f87ef';
  public static blue = '#1874cf';

  public static greenXxLight = '#C7F9CC';
  public static green = '#1C8A3F';
  public static greenDark = '#197F39';

  public static red = '#FE4C4C';
  public static redXxLight = '#FFEBEB';
  public static redDark = '#CC2626';

  public static yellowXxLight = '#ffeec2';
  public static yellow = '#fcb73e';
  public static yellowDark = '#ef8b17';

  public static bgDefault = colors.surfaceHigh;
  public static get bgSecondary(): string {
    return this.bgDefault;
  }
  public static bgDisabled = colors.shapeOtherDisabled;
  public static get errorMain(): string {
    return this.red;
  }
  public static get errorText(): string {
    return this.redDark;
  }
  public static get errorSecondary(): string {
    return this.redXxLight;
  }
  public static warningMain = '#fcb73e';
  public static warningSecondary = '#fff0bc';
  public static warningText = '#d97e00';
  public static closeGrayColor = 'rgba(0, 0, 0, 0.32)';
  public static borderColorFocusLight = '#cdedff';
  public static borderColorGrayDark = 'rgba(0, 0, 0, 0.28)';
  public static borderColorGrayLight = 'rgba(0, 0, 0, 0.16)';
  public static borderColorDisabled = colors.lineNeutralFaint;
  public static placeholderColor = colors.textNeutralFaint;
  public static outlineColorFocus = colors.surfaceBase;
  public static placeholderColorLight = `color-mix(in srgb, ${colors.textNeutralFaint}, transparent 40%)`;
  public static blinkColor = 'rgba(0, 136, 255, 0.2)';
  public static controlBorderWidth = '1px';
  public static controlOutlineWidth = '2px';
  public static controlLineHeightSmall = '20px';
  public static controlLineHeightMedium = '22px';
  public static controlLineHeightLarge = '24px';
  public static controlPaddingYSmall = '5px';
  public static controlPaddingYMedium = '8px';
  public static controlPaddingYLarge = '11px';
  public static textColorDefault = colors.textNeutralHeavy;
  public static textColorInvert = '#fff';
  public static textColorDisabled = colors.textNeutralFaint;
  public static textColorDisabledContrast = '#858585';
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '16px';
  public static fontSizeLarge = '18px';
  public static fontSizeMobile = '18px';
  public static lineHeightMobile = '24px';
  public static specificityLevel = '0';
  public static fixedPanelShadow = 'none';
  public static bgActive = '#141414';
  public static bgChecked = '#3D3D3D';
  public static borderColorFocus = colors.lineAccentBold;
  public static get borderColorError(): string {
    return this.errorMain;
  }
  public static get borderColorWarning(): string {
    return this.warningMain;
  }
  public static controlHeightSmall = '32px';
  public static controlHeightMedium = '40px';
  public static controlHeightLarge = '48px';
  public static mobileMediaQuery = '(max-width: 576px)';

  public static transitionDuration = '100ms';
  public static transitionTimingFunction = 'cubic-bezier(0.5, 1, 0.89, 1)';
  //#endregion Common variables
  //#region Link
  public static linkColor = colors.textAccentHeavy;
  public static linkTextDecoration = 'underline';

  public static get linkHoverColor(): string {
    return this.linkColor;
  }
  public static linkActiveColor = colors.textAccentHeavyPressed;
  public static linkHoverTextDecoration = 'none';

  public static get linkSuccessColor(): string {
    return this.green;
  }
  public static get linkSuccessHoverColor(): string {
    return this.greenDark;
  }
  public static linkSuccessActiveColor = colors.textSuccessHeavyPressed;

  public static get linkDangerColor(): string {
    return this.errorText;
  }
  public static linkDangerHoverColor = colors.textErrorHeavyHover;
  public static linkDangerActiveColor = colors.textErrorHeavyPressed;

  public static linkIconMarginRight = '4px';
  public static linkIconMarginLeft = '4px';

  public static get linkDisabledColor(): string {
    return this.textColorDisabled;
  }
  public static linkGrayedColor = colors.textNeutralSoft;
  public static linkGrayedHoverColor = colors.textNeutralHeavy;
  public static linkGrayedActiveColor = colors.textNeutralHeavy;

  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';

  public static linkTextDecorationStyle = 'solid';
  public static linkTextDecorationThickness = '1px';
  public static linkTextUnderlineOffset = '4px';
  public static get linkHoverTextDecorationStyle(): string {
    return this.linkTextDecorationStyle;
  }
  public static linkTextUnderlineOpacity = '0.5';
  public static linkTextDecorationColor = `color-mix(in srgb, currentColor ${
    parseFloat(this.linkTextUnderlineOpacity) * 100
  }%, transparent)`;
  public static linkLineBorderBottomStyle = 'solid';
  public static get linkLineHoverBorderBottomStyle(): string {
    return this.linkLineBorderBottomStyle;
  }
  public static linkLineBorderBottomWidth = '1px';
  public static linkLineBorderBottomOpacity = '0.5';
  public static linkLineBorderBottomColor = `color-mix(in srgb, currentColor ${
    parseFloat(this.linkLineBorderBottomOpacity) * 100
  }%, transparent)`;

  public static linkFocusOutlineColor = colors.lineAccentBold;
  public static get linkFocusOutlineWidth(): string {
    return this.controlOutlineWidth;
  }
  public static get linkFocusOutline(): string {
    return `${this.linkFocusOutlineWidth} solid ${this.linkFocusOutlineColor}`;
  }

  //#endregion Link
  //#region Token
  public static tokenDisabledBg = colors.shapeOtherDisabled;
  public static get tokenTextColorDisabled(): string {
    return this.textColorDisabled;
  }

  public static get tokenFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get tokenFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get tokenFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static tokenMarginYSmall = '2px';
  public static tokenMarginXSmall = '1px';
  public static tokenMarginYMedium = '2px';
  public static tokenMarginXMedium = '2px';
  public static tokenMarginYLarge = '2px';
  public static tokenMarginXLarge = '3px';

  public static get tokenLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get tokenLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get tokenLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static tokenPaddingYSmall = '1px';
  public static tokenPaddingXSmall = '3px';
  public static tokenPaddingYMedium = '2px';
  public static tokenPaddingXMedium = '5px';
  public static tokenPaddingYLarge = '3px';
  public static tokenPaddingXLarge = '7px';
  public static tokenMarginBeforeIcon = '4px';
  public static tokenRemoveIconSize = '16px';
  public static tokenRemoveIconPaddingY = '0px';
  public static tokenRemoveIconPaddingX = '0px';
  public static tokenRemoveIconGap = '4px';
  public static tokenRemoveIconBoxSizing = 'content-box';
  public static tokenBorderRadius = '2px';
  public static tokenBorderWidth = '1px';
  public static tokenBorderColorDisabled = 'transparent';
  public static get tokenBorderColorWarning(): string {
    return this.borderColorWarning;
  }
  public static get tokenBorderColorError(): string {
    return this.borderColorError;
  }
  public static tokenOutlineWidth = '1px';

  public static get tokenPaddingYDisabled(): string {
    return this.tokenPaddingYSmall;
  }
  public static get tokenPaddingXDisabled(): string {
    return this.tokenPaddingXSmall;
  }

  public static get tokenMarginYDisabled(): string {
    return this.tokenMarginYSmall;
  }
  public static get tokenMarginXDisabled(): string {
    return this.tokenMarginXSmall;
  }

  public static tokenShadowDisabled = '';

  public static tokenBg = colors.shapeFaintNeutralAlpha;
  public static tokenColor = colors.textNeutralHeavy;
  public static tokenBorderColor = colors.lineNeutralPale;
  public static tokenBgHover = colors.shapeFaintNeutralAlphaHover;
  public static get tokenColorHover() {
    return this.tokenColor;
  }
  public static tokenBorderColorHover = colors.lineNeutralPale;
  public static tokenBgActive = colors.shapeBoldAccent;
  public static tokenColorActive = colors.textOnAccentBoldHeavy;
  public static tokenBorderColorActive = 'transparent';

  //#endregion Token
  //#region TokenInput

  public static get tokenInputLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get tokenInputLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get tokenInputLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
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
  public static tokenInputBorderRadius = '2px';
  public static get tokenInputPlaceholderColor(): string {
    return this.inputPlaceholderColor;
  }
  public static get tokenInputPlaceholderColorLight(): string {
    return this.inputPlaceholderColorLight;
  }
  public static get tokenInputDisabledBg(): string {
    return this.inputDisabledBg;
  }
  public static get tokenInputDisabledBorderColor(): string {
    return this.inputDisabledBorderColor;
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
  public static get tokenInputTextColorDisabled(): string {
    return this.textColorDisabledContrast;
  }
  public static get tokenInputPlaceholderColorDisabled(): string {
    return this.textColorDisabledContrast;
  }

  public static tokenInputPaddingYSmall = '1px';
  public static tokenInputPaddingXSmall = '2px';

  public static tokenInputPaddingYMedium = '3px';
  public static tokenInputPaddingXMedium = '3px';

  public static tokenInputPaddingYLarge = '5px';
  public static tokenInputPaddingXLarge = '4px';

  public static tokenInputPopupOffset = '2px';
  public static tokenInputPopupMarginSmall = '7px';
  public static tokenInputPopupMarginMedium = '10px';
  public static tokenInputPopupMarginLarge = '13px';

  //#endregion TokenInput
  //#region Loader
  public static loaderBg = colors.shapeInvertedNeutralHeavy;
  public static loaderOpacity = '0.8';
  public static loaderBorderRadius = '0px';
  //#endregion
  //#region Button
  public static btnBackgroundClip = 'padding-box';
  public static btnLinkBorderRadius = '2px';
  public static btnFocusShadowWidth = '2px';
  public static btnBorderColorTransition = '';
  public static btnDisabledBorderColor = colors.lineNeutralFaint;
  public static btnCheckedBg = colors.shapeBoldAccent;
  public static btnCheckedDisabledBg = colors.shapeOtherAccentBoldDisabled;
  public static btnCheckedDisabledColor = colors.textInvertedNeutralSoft;
  public static btnCheckedTextColor = colors.textOnAccentBoldHeavy;
  public static get btnCheckedDisabledBorderColor(): string {
    return this.btnCheckedDisabledBg;
  }
  public static btnCheckedShadow = 'none';
  public static btnCheckedDisabledShadow = 'none';

  public static btnBorderRadiusSmall = '8px';
  public static btnBorderRadiusMedium = '8px';
  public static btnBorderRadiusLarge = '8px';

  public static get btnBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static btnInsetWidth = '1px';
  public static get btnOutlineWidth(): string {
    return this.controlOutlineWidth;
  }
  public static btnPaddingXSmall = '12px';
  public static btnPaddingXMedium = '16px';
  public static btnPaddingXLarge = '20px';

  public static btnIconGapSmallLeft = '4px';
  public static get btnIconGapSmallRight(): string {
    return this.btnIconGapSmallLeft;
  }

  public static btnIconGapMediumLeft = '6px';
  public static get btnIconGapMediumRight(): string {
    return this.btnIconGapMediumLeft;
  }

  public static btnIconGapLargeLeft = '8px';
  public static get btnIconGapLargeRight(): string {
    return this.btnIconGapLargeLeft;
  }

  public static btnIconSizeSmall = '16px';
  public static btnIconSizeMedium = '20px';
  public static btnIconSizeLarge = '24px';
  public static btnDefaultBg = colors.shapeOtherBase;
  public static btnDefaultBgStart = 'none';
  public static btnDefaultBgEnd = 'none';
  public static get btnDefaultCheckedBorderColor(): string {
    return this.btnCheckedBg;
  }
  public static get btnDefaultTextColor(): string {
    return this.textColorDefault;
  }
  public static btnDefaultHoverBg = colors.shapeOtherBaseHover;
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = colors.shapeOtherBasePressed;
  public static get btnDefaultHoverBorderColor(): string {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultHoverTextColor = colors.textNeutralHeavy;
  public static get btnDefaultActiveBorderColor(): string {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultBorderColor = colors.lineNeutralPale;
  public static btnDefaultActiveShadow = 'none';
  public static btnSuccessBg = colors.shapeBoldSuccess;
  public static get btnSuccessBorderColor() {
    return this.btnSuccessBg;
  }
  public static btnSuccessHoverBg = colors.shapeBoldSuccessHover;
  public static get btnSuccessHoverBorderColor() {
    return this.btnSuccessHoverBg;
  }
  public static btnSuccessHoverTextColor = colors.textConstHeavyWhite;
  public static btnSuccessBgStart = 'none';
  public static btnSuccessBgEnd = 'none';
  public static btnSuccessTextColor = colors.textConstHeavyWhite;
  public static btnSuccessHoverBgStart = 'none';
  public static btnSuccessHoverBgEnd = 'none';
  public static btnSuccessActiveBg = colors.shapeBoldSuccessPressed;
  public static get btnSuccessActiveBorderColor() {
    return this.btnSuccessActiveBg;
  }
  public static btnSuccessActiveShadow = 'none';

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

  public static btnPrimaryBgStart = 'none';
  public static btnPrimaryBgEnd = 'none';
  public static btnPrimaryTextColor = colors.textOnAccentBoldHeavy;
  public static btnPrimaryHoverBgStart = 'none';
  public static btnPrimaryHoverBgEnd = 'none';
  public static btnPrimaryActiveShadow = 'none';
  public static get btnDangerBg(): string {
    return this.errorMain;
  }
  public static get btnDangerBorderColor(): string {
    return this.btnDangerBg;
  }

  public static btnDangerHoverBg = colors.shapeBoldErrorHover;
  public static get btnDangerHoverBorderColor() {
    return this.btnDangerHoverBg;
  }

  public static btnDangerHoverTextColor = '';
  public static btnDangerBgStart = 'none';
  public static btnDangerBgEnd = 'none';
  public static btnDangerTextColor = colors.textConstHeavyWhite;
  public static btnDangerHoverBgStart = 'none';
  public static btnDangerHoverBgEnd = 'none';
  public static btnDangerActiveBg = colors.shapeBoldErrorPressed;
  public static get btnDangerActiveBorderColor(): string {
    return this.btnDangerActiveBg;
  }

  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = colors.shapeBoldWarning;
  public static btnPayHoverBg = colors.shapeBoldWarningHover;
  public static get btnPayHoverBorderColor() {
    return this.btnPayHoverBg;
  }
  public static btnPayHoverTextColor = '';
  public static get btnPayBorderColor() {
    return this.btnPayBg;
  }
  public static btnPayBgStart = 'none';
  public static btnPayBgEnd = 'none';
  public static get btnPayTextColor(): string {
    return this.textColorDefault;
  }
  public static btnPayHoverBgStart = 'none';
  public static btnPayHoverBgEnd = 'none';
  public static btnPayActiveBg = colors.shapeBoldWarningPressed;
  public static get btnPayActiveBorderColor() {
    return this.btnPayActiveBg;
  }
  public static btnPayActiveShadow = 'none';
  public static btnMenuArrowColor = colors.textNeutralSoft;
  public static get btnFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get btnFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get btnFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get btnLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get btnLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get btnLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static get btnPaddingYSmall(): string {
    return this.controlPaddingYSmall;
  }
  public static get btnPaddingYMedium(): string {
    return this.controlPaddingYMedium;
  }
  public static get btnPaddingYLarge(): string {
    return this.controlPaddingYLarge;
  }
  public static btnDisabledBg = colors.shapeOtherDisabled;

  public static get btnBorderColorWarning(): string {
    return this.borderColorWarning;
  }
  public static get btnBorderColorError(): string {
    return this.borderColorError;
  }
  public static get btnHeightSmall(): string {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYSmall, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightSmall, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnHeightMedium(): string {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYMedium, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightMedium, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnHeightLarge(): string {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYLarge, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightLarge, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnLinkColor(): string {
    return this.linkColor;
  }
  public static get btnLinkHoverColor(): string {
    return this.linkHoverColor;
  }
  public static get btnLinkActiveColor(): string {
    return this.linkActiveColor;
  }
  public static get btnLinkHoverTextDecoration(): string {
    return this.linkHoverTextDecoration;
  }
  public static get btnLinkTextDecorationColor(): string {
    return this.linkTextDecorationColor;
  }
  public static get btnLinkTextDecorationStyle(): string {
    return this.linkTextDecorationStyle;
  }
  public static get btnLinkHoverTextDecorationStyle(): string {
    return this.linkTextDecorationStyle;
  }
  public static get btnLinkTextUnderlineOffset(): string {
    return this.linkTextUnderlineOffset;
  }
  public static get btnLinkTextDecorationThickness(): string {
    return this.linkTextDecorationThickness;
  }
  public static get btnLinkTextUnderlineOpacity(): string {
    return this.linkTextUnderlineOpacity;
  }
  public static get btnLinkLineBorderBottomStyle(): string {
    return this.linkLineBorderBottomStyle;
  }
  public static get btnLinkHoverLineBorderBottomStyle(): string {
    return this.btnLinkLineBorderBottomStyle;
  }
  public static get btnLinkLineBorderBottomWidth(): string {
    return this.linkLineBorderBottomWidth;
  }
  public static get btnLinkLineBorderBottomOpacity(): string {
    return this.linkLineBorderBottomOpacity;
  }

  public static get btnLinkIconMarginRight(): string {
    return this.linkIconMarginRight;
  }
  public static get btnLinkIconMarginLeft(): string {
    return this.linkIconMarginRight;
  }
  public static get btnErrorSecondary(): string {
    return this.errorSecondary;
  }
  public static get btnWarningSecondary(): string {
    return this.warningSecondary;
  }
  public static get btnOutlineColorFocus(): string {
    return this.outlineColorFocus;
  }
  public static btnInsetColor = colors.surfaceBase;
  public static get btnBorderColorFocus(): string {
    return this.borderColorFocus;
  }
  public static get btnLinkDisabledColor(): string {
    return this.linkDisabledColor;
  }
  public static get btnDisabledTextColor(): string {
    return this.textColorDisabled;
  }
  public static btnBacklessBg = 'transparent';
  public static btnBacklessHoverBg = colors.shapeOtherBacklessHover;
  public static btnBacklessActiveBg = colors.shapeOtherBacklessPressed;
  public static get btnBacklessActiveBorderColor(): string {
    return this.btnBacklessBorderColor;
  }
  public static get btnBacklessBorderColor(): string {
    return this.btnDefaultBorderColor;
  }
  public static get btnBacklessDisabledBorderColor(): string {
    return this.btnDisabledBorderColor;
  }
  public static get btnBacklessHoverBorderColor(): string {
    return this.btnBacklessBorderColor;
  }
  public static btnBacklessHoverTextColor = '';
  public static get btnBacklessTextColor(): string {
    return this.btnDefaultTextColor;
  }

  public static btnTextBg = 'transparent';
  public static btnTextHoverBg = colors.shapeOtherBacklessHover;
  public static btnTextActiveBg = colors.shapeOtherBacklessPressed;
  public static get btnTextBorderColor(): string {
    return this.btnDefaultBorderColor;
  }
  public static get btnTextTextColor(): string {
    return this.btnDefaultTextColor;
  }
  public static btnTextHoverTextColor = '';
  public static get btnTextHoverBorderColor(): string {
    return this.btnTextHoverBg;
  }

  public static get btnWithIconPaddingLeftMedium(): string {
    return this.btnWithIconPaddingMedium;
  }
  public static get btnWithIconPaddingLeftLarge(): string {
    return this.btnWithIconPaddingLarge;
  }

  public static btnWithIconPaddingSmall = '8px';
  public static btnWithIconPaddingMedium = '10px';
  public static btnWithIconPaddingLarge = '12px';

  public static btnIconColor = '';
  public static btnIconHoverColor = '';
  public static btnIconDisabledColor = '';

  //#endregion Button
  //#region Select
  public static get selectDefaultBg(): string {
    return this.inputBg;
  }
  public static selectPlaceholderColor = this.placeholderColor;
  public static get selectBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get selectPlaceholderColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get selectOutlineWidth(): string {
    return this.controlOutlineWidth;
  }
  public static get selectLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get selectFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static selectPaddingXSmall = '7px';
  public static get selectPaddingYSmall(): string {
    return this.controlPaddingYSmall;
  }
  public static get selectBorderRadiusSmall(): string {
    return this.inputBorderRadiusSmall;
  }
  public static get selectBorderRadiusMedium(): string {
    return this.inputBorderRadiusMedium;
  }
  public static get selectBorderRadiusLarge(): string {
    return this.inputBorderRadiusLarge;
  }
  public static get selectIconGapSmall(): string {
    return this.inputIconGapSmall;
  }
  public static get selectIconGapMedium(): string {
    return this.inputIconGapMedium;
  }
  public static get selectIconGapLarge(): string {
    return this.inputIconGapLarge;
  }

  public static get selectLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get selectFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static selectPaddingXMedium = '11px';
  public static get selectPaddingYMedium(): string {
    return this.controlPaddingYMedium;
  }
  public static get selectLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static get selectFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static selectPaddingXLarge = '15px';
  public static get selectPaddingYLarge(): string {
    return this.controlPaddingYLarge;
  }
  public static get selectMenuArrowColor(): string {
    return this.btnMenuArrowColor;
  }
  public static get selectMenuArrowColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get selectIconSizeSmall(): string {
    return this.btnIconSizeSmall;
  }
  public static get selectIconSizeMedium(): string {
    return this.btnIconSizeMedium;
  }
  public static get selectIconSizeLarge(): string {
    return this.btnIconSizeLarge;
  }
  public static selectRootWidthMobile = 'auto';
  public static mobileSelectMaxWidth = '100%';
  public static get selectTextColorDisabled(): string {
    return this.btnDisabledTextColor;
  }
  public static get selectBgDisabled(): string {
    return this.inputDisabledBg;
  }
  public static get selectBorderColorDisabled(): string {
    return this.btnDisabledBorderColor;
  }
  public static get selectMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  public static get selectBorderColorHover(): string {
    return this.btnDefaultHoverBorderColor;
  }
  public static selectBorderColorTransition = `box-shadow ${this.transitionDuration} ${this.transitionTimingFunction};`;

  //#endregion Select
  //#region Tooltip
  public static tooltipPaddingYSmall = '16px';
  public static tooltipPaddingXSmall = '16px';
  public static tooltipPaddingYMedium = '20px';
  public static tooltipPaddingXMedium = '20px';
  public static tooltipPaddingYLarge = '24px';
  public static tooltipPaddingXLarge = '24px';

  public static tooltipCloseBtnPaddingSmall = '4px';
  public static tooltipCloseBtnPaddingMedium = '6px';
  public static tooltipCloseBtnPaddingLarge = '8px';
  public static tooltipCloseBtnSide = '16px';
  public static get tooltipCloseBtnColor(): string {
    return this.closeGrayColor;
  }
  public static tooltipCloseBtnHoverColor = colors.textNeutralHeavy;
  public static get tooltipTextColor(): string {
    return this.textColorDefault;
  }
  public static tooltipBg = colors.surfaceHigh;
  public static get tooltipBorder(): string {
    return this.popupBorder;
  }
  public static tooltipBorderRadiusSmall = '8px';
  public static tooltipBorderRadiusMedium = '10px';
  public static tooltipBorderRadiusLarge = '12px';

  public static tooltipPinOffsetYSmall = '18px';
  public static tooltipPinOffsetYMedium = '21px';
  public static tooltipPinOffsetYLarge = '24px';

  public static tooltipPinOffsetXSmall = '16px';
  public static tooltipPinOffsetXMedium = '20px';
  public static tooltipPinOffsetXLarge = '24px';

  public static tooltipMarginSmall = '10px';
  public static tooltipMarginMedium = '12px';
  public static tooltipMarginLarge = '14px';

  public static tooltipPinSizeSmall = '8px';
  public static tooltipPinSizeMedium = '10px';
  public static tooltipPinSizeLarge = '12px';

  public static get tooltipFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get tooltipFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get tooltipFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static get tooltipLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get tooltipLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get tooltipLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  //#endregion Tooltip
  //#region TooltipMenu
  public static get tooltipMenuPinOffsetX(): string {
    return this.tooltipPinOffsetXSmall;
  }
  public static get tooltipMenuPinOffsetY(): string {
    return this.tooltipPinOffsetYSmall;
  }
  public static get tooltipMenuMargin(): string {
    return this.popupMargin;
  }
  public static get tooltipMenuPinSize(): string {
    return this.popupPinSize;
  }

  //#endregion
  //#region Kebab
  public static kebabMargin = '4px';
  public static kebabBackground = 'transparent';
  public static kebabBackgroundHover = colors.shapeOtherBacklessHover;
  public static kebabBackgroundActive = colors.shapeOtherBacklessPressed;
  public static kebabBorderRadius = '50%';
  public static kebabBorder = '2px solid transparent';
  public static kebabSizeSmall = '24px';
  public static kebabSizeMedium = '32px';
  public static kebabSizeLarge = '40px';
  public static kebabIconSizeSmall = '16px';
  public static kebabIconSizeMedium = '20px';
  public static kebabIconSizeLarge = '24px';
  public static kebabIconColor = colors.textNeutralSoft;

  //#endregion
  //#region Modal
  public static modalWindowShadow = '0px 16px 32px 0px rgba(0, 0, 0, 0.06)';
  public static modalBackBg = colors.surfaceModalBackdrop;
  public static get modalBg(): string {
    return this.bgSecondary;
  }
  public static modalBackOpacity = '1';
  public static get modalCloseButtonColor(): string {
    return this.closeGrayColor;
  }
  public static modalCloseButtonDisabledColor = colors.textNeutralFaint;
  public static modalCloseButtonHoverColor = colors.textNeutralHeavy;
  public static modalCloseButtonPadding = '32px';
  public static modalCloseButtonBottomPadding = '20px';

  public static modalCloseButtonClickAreaTop = '30px';
  public static modalCloseButtonClickAreaBottom = '22px';
  public static modalCloseButtonClickAreaLeft = '24px';
  public static modalCloseButtonClickAreaRight = '28px';
  public static modalCloseIconSize = '20px';
  public static modalBorderRadius = '16px';
  public static get modalFixedHeaderBg(): string {
    return this.bgSecondary;
  }
  public static get modalFixedHeaderShadow(): string {
    return this.fixedPanelShadow;
  }
  public static modalFixedHeaderBorder = 'none';
  public static modalFixedFooterBorder = 'none';
  public static get modalFixedFooterShadow(): string {
    return this.fixedPanelShadow;
  }
  public static modalFixedPanelShadow = 'none';
  public static get modalFooterBg(): string {
    return this.modalBg;
  }
  public static modalAdaptiveThreshold = '425px';
  public static modalPaddingTop = '24px';
  public static modalPaddingLeft = '32px';
  public static modalPaddingRight = '32px';
  public static modalHeaderFontSize = '24px';
  public static modalHeaderFontWeight = '700';
  public static get modalHeaderTextColor(): string {
    return this.textColorDefault;
  }
  public static modalHeaderLineHeight = '32px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalHeaderPaddingTop = '24px';
  public static get modalHeaderAdditionalPaddingBottom(): string {
    return this.modalHeaderPaddingBottom;
  }
  public static modalFixedHeaderMarginBottom = '0px';
  public static get modalFixedHeaderPaddingBottom(): string {
    return this.modalHeaderPaddingBottom;
  }
  public static get modalFixedFooterPaddingTop(): string {
    return this.modalFooterPanelPaddingTop;
  }
  public static modalFixedFooterMarginTop = '0px';

  public static modalSeparatorBorderBottom = `1px solid ${colors.lineNeutralFaint}`;
  public static modalSeparatorMargin = '0 32px';
  public static modalSeparatorFixedMargin = '0 16px';
  public static modalBodyTextColor = 'inherit';
  public static modalFooterTextColor = 'inherit';
  public static modalBodyPaddingTop = '0';
  public static modalBodyPaddingBottom = '20px';
  public static modalBodyBorderRadius = '0px';
  public static modalFooterPaddingTop = '0px';
  public static modalFooterPaddingBottom = '20px';
  public static modalPaddingBottom = '40px';
  public static modalFooterPanelPaddingTop = '20px';
  public static get modalFooterPanelPaddingBottom(): string {
    return this.modalFooterPaddingBottom;
  }
  public static get mobileModalCloseButtonRightPadding(): string {
    return this.mobileModalCloseButtonClickArea;
  }
  public static get mobileModalCloseButtonTopPadding(): string {
    return this.mobileModalCloseButtonClickArea;
  }
  public static mobileModalCloseButtonClickArea = '22px';
  public static mobileModalWithoutHeaderCloseButtonPadding = '10px';
  public static get mobileModalWithoutHeaderCloseButtonWidth(): string {
    return `${parseInt(this.modalCloseIconSize) + 2 * parseInt(this.mobileModalWithoutHeaderCloseButtonPadding)}px`;
  }
  public static mobileModalCloseIconSize = '20px';
  public static mobileModalHeaderFontSize = '24px';
  public static mobileModalHeaderLineHeight = '32px';
  public static mobileModalHeaderPadding = '16px';
  public static mobileModalBodyPadding = '0 16px 0 16px';
  public static mobileModalBodyPaddingTop = '16px';
  public static mobileModalBodyPaddingBottom = '16px';
  public static mobileModalBodyFontSize = '16px';
  public static mobileModalFooterPadding = '16px';
  public static mobileModalPaddingBottom = '16px';
  public static mobileModalContainerHeight = '100%';
  public static mobileModalContainerMarginTop = '16px';
  public static mobileModalContainerMarginRight = '16px';
  public static mobileModalContainerMarginBottom = '16px';
  public static mobileModalContainerMarginLeft = '16px';
  //#endregion
  //#region SidePage
  public static get sidePageFooterPanelBg(): string {
    return this.sidePageBgDefault;
  }
  public static sidePageBackingBg = colors.surfaceModalBackdrop;
  public static sidePageBackingBgOpacity = '1';
  public static sidePageCloseButtonColor = colors.textNeutralPale;
  public static sidePageCloseButtonHoverColor = colors.textNeutralHeavy;
  public static sidePageContainerShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
  public static mobileSidePagePaddingLeft = '16px';
  public static mobileSidePagePaddingRight = '16px';
  public static mobileSidePagePaddingTop = '16px';
  public static mobileSidePagePaddingBottom = '16px';
  public static mobileSidePageFooterPadding = '16px';
  public static sidePagePaddingLeft = '32px';
  public static sidePagePaddingRight = '36px';
  public static sidePagePaddingTop = '24px';
  public static sidePagePaddingBottom = '40px';
  public static sidePageFooterPaddingTop = '20px';
  public static sidePageFooterPaddingBottom = '20px';
  public static sidePageBgDefault = colors.surfaceHigh;
  public static get sidePageHeaderTextColor(): string {
    return this.textColorDefault;
  }
  public static sidePageBodyTextColor = 'inherit';
  public static sidePageFooterTextColor = 'inherit';
  public static sidePageHeaderFontSize = '24px';
  public static sidePageHeaderLineHeight = '32px';
  public static sidePageHeaderPaddingBottom = '16px';
  public static sidePageHeaderPaddingTop = '24px';
  public static sidePageHeaderStickyOffset = '10px';

  public static get mobileSidePageCloseButtonPadding(): string {
    return this.mobileSidePageCloseButtonClickArea;
  }
  public static get sidePageFooterPanelPaddingTop(): string {
    return this.sidePageFooterPaddingTop;
  }
  public static get sidePageFooterPanelPaddingBottom(): string {
    return this.sidePageFooterPanelPaddingTop;
  }
  public static sidePageCloseIconSize = '20px';

  public static get sidePageCloseButtonClickAreaTop(): string {
    return this.modalCloseButtonClickAreaTop;
  }
  public static get sidePageCloseButtonClickAreaBottom(): string {
    return this.modalCloseButtonClickAreaBottom;
  }
  public static get sidePageCloseButtonClickAreaLeft(): string {
    return this.modalCloseButtonClickAreaLeft;
  }
  public static get sidePageCloseButtonClickAreaRight(): string {
    return this.modalCloseButtonClickAreaRight;
  }
  public static get sidePageCloseButtonFixedClickAreaTop(): string {
    return this.sidePageCloseButtonFixedClickAreaBottom;
  }
  public static sidePageCloseButtonFixedClickAreaBottom = '14px';
  public static mobileSidePageCloseButtonClickArea = '22px';
  public static get sidePageFixedHeaderShadow(): string {
    return this.fixedPanelShadow;
  }
  public static get sidePageFixedFooterShadow(): string {
    return this.fixedPanelShadow;
  }
  public static sidePageFixedPanelShadow = 'none';
  public static mobileSidePageHeaderFontSize = '24px';
  public static mobileSidePageHeaderLineHeight = '32px';
  public static mobileSidePageHeaderPaddingBottom = '16px';
  public static mobileSidePageHeaderPaddingTop = '16px';

  public static sidePageHeaderFontWeight = 'bold';
  public static sidePageCloseButtonWrapperOffsetTop = '2px';
  public static sidePageCloseButtonWrapperFixedOffsetTop = '4px';
  //#endregion SidePage
  //#region DateInput
  public static get dateInputIconColor(): string {
    return this.textColorDefault;
  }
  public static dateInputMaskColor = colors.textNeutralFaint;
  public static dateInputComponentSelectedBgColor = '';
  public static dateInputComponentSelectedTextColor = '';
  //#endregion DateInput
  //#region Calendar
  public static calendarBottomSeparatorBorderColor = colors.lineNeutralFaint;

  public static get calendarBottomSeparatorBorderWidth(): string {
    return '1px';
  }
  public static get calendarBottomSeparatorBorder(): string {
    return `${this.calendarBottomSeparatorBorderWidth} solid ${this.calendarBottomSeparatorBorderColor}`;
  }
  public static get calendarBg(): string {
    return this.bgSecondary;
  }
  public static calendarBorderRadius = '8px';
  public static get calendarCellBg(): string {
    return this.bgSecondary;
  }
  public static calendarCellHoverColor = '';
  public static calendarCellActiveHoverColor = '';
  public static get calendarCellWeekendColor(): string {
    return this.errorText;
  }
  public static calendarCellTodayBorder = '1px solid';
  public static calendarCellBorderRadius = '9999px';
  public static calendarCellSelectedBgColor = colors.shapeBoldAccent;
  public static calendarCellSelectedFontColor = colors.textOnAccentBoldHeavy;
  public static calendarCellHeight = '32px';
  public static get calendarCellWidth(): string {
    return this.calendarCellHeight;
  }
  public static calendarCellFontSize = '14px';
  public static get calendarCellLineHeight(): string {
    return `${parseInt(this.calendarCellHeight) - 2}px`;
  }
  public static get calendarMonthHeaderStickedBgColor(): string {
    return this.bgSecondary;
  }
  public static calendarMonthTitleBorderBottomColor = colors.lineNeutralFaint;
  public static calendarCellHoverBgColor = colors.shapeOtherBacklessHover;
  public static calendarPaddingX = '18px';
  public static calendarMonthTitleLineHeight = '20px';
  public static calendarMonthTitlePaddingTop = '12px';
  public static calendarMonthTitlePaddingBottom = '8px';
  public static calendarMonthTitleMarginX = '6px';
  public static calendarMonthTitleMarginBottom = '6px';
  public static calendarWrapperHeight = ' 330px';
  public static calendarMonthMarginBottom = '6px';
  public static calendarMaxMonthsToAppendOnScroll = '5';
  public static calendarGridRowSpacing = '0px';
  //#endregion Calendar
  //#region DatePicker
  public static get datePickerOpenBtnColor(): string {
    return this.textColorDefault;
  }
  public static get datePickerMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  public static pickerShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';

  public static mobileCalendarPaddingX = '16px';
  public static mobileCalendarCellWidth = '40px';
  public static mobileCalendarCellHeight = '40px';
  public static mobileCalendarCellBorderRadius = '20px';
  public static mobileCalendarCellFontSize = '16px';
  public static mobileCalendarGridRowSpacing = '8px';

  public static mobileCalendarWrapperHeight = '304px';
  //#endregion DatePicker

  //#region DateRangePicker
  public static rangeCalendarCellBg = colors.shapeFaintNeutralAlpha;
  public static rangeCalendarCellEndBg = colors.shapeBoldAccent;
  public static rangeCalendarCellEndColor = colors.textOnAccentBoldHeavy;
  public static rangeCalendarCellHoverBg = colors.shapeOtherBacklessHover;
  public static rangeCalendarWrapperHeight = '450px';

  public static mobileRangeCalendarCellHeight = '42px';
  public static mobileRangeCalendarCellWidth = '42px';
  public static mobileRangeCalendarGridRowSpacing = '0px';
  public static mobileRangeCalendarWrapperHeight = '400px';
  //#endregion

  //#region DateSelect
  public static get dateSelectMenuBg(): string {
    return this.bgSecondary;
  }
  public static dateSelectMenuItemBgActive = '#F0F0F0';
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
  public static dateSelectLineHeight = '20px';
  public static dateSelectFontSize = '14px';
  public static dateSelectFontWeight = 'bold';
  public static dateSelectMenuItemBgSelected = '#ececec';
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
  public static mobileDateSelectFontSize = '16px';
  public static mobileDateSelectLineHeight = '20px';
  //#endregion DateSelect
  //#region Paging

  public static get pagingFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get pagingFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get pagingFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static get pagingLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get pagingLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get pagingLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static pagingPageLinkBoxSizing = 'border-box';

  public static pagingPageLinkPaddingYSmall = '6px';
  public static pagingPageLinkPaddingXSmall = '11.5px';
  public static pagingPageLinkPaddingYMedium = '9px';
  public static pagingPageLinkPaddingXMedium = '15px';
  public static pagingPageLinkPaddingYLarge = '12px';
  public static pagingPageLinkPaddingXLarge = '18.5px';

  public static pagingPageLinkBorderRadius = '9999px';
  public static get pagingPageLinkColor(): string {
    return this.textColorDefault;
  }
  public static get pagingPageLinkActiveColor(): string {
    return this.textColorDefault;
  }
  public static pagingPageLinkActiveBg = colors.shapeOtherBacklessPressed;
  public static pagingPageLinkDisabledActiveBg = colors.shapeOtherDisabled;
  public static pagingPageLinkHoverBg = colors.shapeOtherBacklessHover;

  public static pagingForwardLinkPaddingSmall = '6px 8px 6px 12px';
  public static pagingForwardLinkPaddingMedium = '9px 12px 9px 16px';
  public static pagingForwardLinkPaddingLarge = '12px 16px 12px 20px';
  public static pagingForwardLinkPaddingMediumMobile = '10px';
  public static pagingForwardLinkPaddingLargeMobile = '12px';

  public static get pagingForwardLinkColor(): string {
    return this.textColorDefault;
  }
  public static get pagingForwardLinkDisabledColor(): string {
    return this.linkDisabledColor;
  }

  public static pagingDotsPaddingSmall = '11px 8px 5px 8px';
  public static pagingDotsPaddingMedium = '14px 12px 10px 12px';
  public static pagingDotsPaddingLarge = '19px 16px 13px 16px';
  public static pagingDotsColor = colors.textNeutralFaint;
  public static get pagingDotsDisabledColor(): string {
    return this.textColorDisabled;
  }
  public static pagingPageLinkHintFontSize = '12px';
  public static pagingPageLinkHintLineHeight = '16px';
  public static pagingPageLinkHintMargin = '4px -20px 0px';
  public static get pagingPageLinkHintColor(): string {
    return this.placeholderColor;
  }
  //#endregion Paging
  //#region Hint
  public static get hintColor(): string {
    return this.textColorInvert;
  }
  public static get mobileHintColor(): string {
    return this.hintColor;
  }
  public static get hintFontSize(): string {
    return this.fontSizeSmall;
  }
  public static get hintLineHeight(): string {
    return this.controlLineHeightSmall;
  }
  public static hintMaxWidth = '200px';
  public static hintPaddingY = '4px';
  public static hintPaddingX = '8px';
  public static hintTextAlign = 'center';
  public static hintBgColor = colors.shapeHeavyNeutral;
  public static hintBorder = 'none';
  public static hintBorderRadius = '6px';
  public static hintMargin = '8px';

  //#endregion Hint
  //#region Toast
  public static get toastFontSize(): string {
    return this.fontSizeSmall;
  }
  public static get toastLineHeight(): string {
    return this.controlLineHeightSmall;
  }
  public static toastPaddingY = '10px';
  public static toastPaddingX = '16px';
  public static toastBorderRadius = '8px';
  public static toastBorder = 'none';
  public static toastTop = '24px';
  public static toastBg = colors.shapeHeavyNeutral;
  public static toastErrorBg = colors.shapeBoldError;
  public static toastColor = colors.textInvertedNeutralHeavy;
  public static toastColorError = colors.textConstHeavyWhite;
  public static toastLinkColor = colors.textInvertedNeutralHeavy;
  public static toastLinkColorError = colors.textConstHeavyWhite;
  public static toastLinkTextDecorationHover = '';
  public static toastLinkBgHover = colors.shapeInvertedBacklessHover;
  public static toastLinkBgHoverError = colors.shapeConstBacklessWhiteHover;
  public static toastLinkBgActive = colors.shapeInvertedBacklessPressed;
  public static toastLinkBgActiveError = colors.shapeConstBacklessWhiteHover;
  public static toastLinkColorActiveError = colors.textConstHeavyWhite;
  public static toastLinkPadding = '12px';
  public static toastClosePadding = '16px';
  public static toastCloseColor = colors.textInvertedNeutralSoft;
  public static toastCloseColorError = colors.textConstSoftWhite;
  public static toastCloseHoverColor = colors.textInvertedNeutralHeavy;
  public static toastCloseHoverColorError = colors.textConstHeavyWhite;
  public static toastCloseSize = '16px';

  //#endregion Toast
  //#region Dropdown
  public static dropdownMenuBorderColorTransition = '';
  public static get dropdownMenuHoverBorderColor(): string {
    return this.btnDefaultHoverBorderColor;
  }
  public static get dropdownMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  public static get dropdownMenuMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  public static dropdownMenuMenuBoxSizing = 'content-box';
  public static dropdownButtonBorderRadiusSmall = '8px';
  public static dropdownButtonBorderRadiusMedium = '8px';
  public static dropdownButtonBorderRadiusLarge = '8px';

  public static get dropdownDefaultBg(): string {
    return this.btnDefaultBg;
  }
  public static get dropdownBorderWidth(): string {
    return this.btnBorderWidth;
  }
  public static get dropdownOutlineWidth(): string {
    return this.btnOutlineWidth;
  }
  public static get dropdownLineHeightSmall(): string {
    return this.btnLineHeightSmall;
  }
  public static get dropdownFontSizeSmall(): string {
    return this.btnFontSizeSmall;
  }
  public static get dropdownPaddingXSmall(): string {
    return this.btnPaddingXSmall;
  }
  public static get dropdownPaddingYSmall(): string {
    return this.btnPaddingYSmall;
  }
  public static get dropdownIconSizeSmall(): string {
    return this.btnIconSizeSmall;
  }
  public static get dropdownLineHeightMedium(): string {
    return this.btnLineHeightMedium;
  }
  public static get dropdownFontSizeMedium(): string {
    return this.btnFontSizeMedium;
  }
  public static get dropdownPaddingXMedium(): string {
    return this.btnPaddingXMedium;
  }
  public static get dropdownPaddingYMedium(): string {
    return this.btnPaddingYMedium;
  }
  public static get dropdownIconSizeMedium(): string {
    return this.btnIconSizeMedium;
  }
  public static get dropdownLineHeightLarge(): string {
    return this.btnLineHeightLarge;
  }
  public static get dropdownFontSizeLarge(): string {
    return this.btnFontSizeLarge;
  }
  public static get dropdownPaddingXLarge(): string {
    return this.btnPaddingXLarge;
  }
  public static get dropdownPaddingYLarge(): string {
    return this.btnPaddingYLarge;
  }
  public static get dropdownIconSizeLarge(): string {
    return this.btnIconSizeLarge;
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
  //#region Menu
  public static get menuBgDefault(): string {
    return this.bgSecondary;
  }
  public static menuBorderRadius = '8px';
  public static menuBorder = 'none';
  public static menuShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';
  public static menuPaddingY = '0px';
  public static menuScrollContainerContentWrapperPaddingY = '4px';
  public static mobileMenuPaddingY = '0px';
  public static mobileMenuScrollContainerContentWrapperPaddingY = '0px';
  public static menuPaddingX = '4px';
  public static mobileMenuPaddingX = '8px';
  public static menuOffsetY = '4px';
  public static menuBoxSizing = 'border-box';
  // menuItem
  public static get menuItemTextColor(): string {
    return this.textColorDefault;
  }
  public static menuItemSelectedBg = colors.shapeOtherBacklessPressed;
  public static menuItemHoverBg = colors.shapeOtherBacklessHover;

  public static menuItemIconWidthSmall = '16px';
  public static menuItemIconWidthMedium = '20px';
  public static menuItemIconWidthLarge = '24px';
  public static menuItemIconGap = '4px';

  public static get menuItemPaddingForIconSmall(): string {
    return `${
      parseInt(this.menuItemPaddingXSmall) + parseInt(this.menuItemIconWidthSmall) + parseInt(this.menuItemIconGap)
    }px`;
  }
  public static get menuItemPaddingForIconMedium(): string {
    return `${
      parseInt(this.menuItemPaddingXMedium) + parseInt(this.menuItemIconWidthMedium) + parseInt(this.menuItemIconGap)
    }px`;
  }
  public static get menuItemPaddingForIconLarge(): string {
    return `${
      parseInt(this.menuItemPaddingXLarge) + parseInt(this.menuItemIconWidthLarge) + parseInt(this.menuItemIconGap)
    }px`;
  }

  public static get menuItemLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get menuItemLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get menuItemLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static get menuItemFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get menuItemFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get menuItemFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static menuItemPaddingXSmall = '8px';
  public static menuItemPaddingYSmall = '6px';

  public static menuItemPaddingXMedium = '12px';
  public static menuItemPaddingYMedium = '9px';

  public static menuItemPaddingXLarge = '16px';
  public static menuItemPaddingYLarge = '12px';

  public static menuItemBorderRadius = '6px';
  public static get menuItemHoverColor(): string {
    return this.menuItemTextColor;
  }

  public static get menuItemCommentColor(): string {
    return this.menuItemTextColor;
  }
  public static menuItemCommentOpacity = '1';
  public static menuItemCommentOpacityHover = '0.6';
  public static get menuItemCommentColorHover(): string {
    return this.menuItemTextColor;
  }
  public static menuItemDisplay = 'block';
  public static menuItemPaddingMobile = '12px 16px';
  public static get menuItemLineHeightMobile(): string {
    return this.lineHeightMobile;
  }
  public static get menuItemFontSizeMobile(): string {
    return this.fontSizeMobile;
  }
  public static get menuItemDisabledColor(): string {
    return this.textColorDisabled;
  }
  public static menuItemDisabledBg = 'transparent';
  // menuMessage
  public static get menuMessageTextColor(): string {
    return this.menuItemDisabledColor;
  }
  public static get menuMessageBg(): string {
    return this.menuItemDisabledBg;
  }
  public static get menuMessagePaddingY(): string {
    return this.menuItemPaddingYSmall;
  }
  public static get menuMessagePaddingX(): string {
    return this.menuItemPaddingXSmall;
  }
  public static get menuMessageDisplay(): string {
    return this.menuItemDisplay;
  }
  public static get menuMessagePaddingMobile(): string {
    return this.menuItemPaddingMobile;
  }

  public static get menuMessageLineHeightMobile(): string {
    return this.menuItemLineHeightMobile;
  }

  public static get menuMessageFontSizeMobile(): string {
    return this.menuItemFontSizeMobile;
  }
  public static get menuMessageFontSizeSmall(): string {
    return this.menuItemFontSizeSmall;
  }
  public static get menuMessageFontSizeMedium(): string {
    return this.menuItemFontSizeMedium;
  }
  public static get menuMessageFontSizeLarge(): string {
    return this.menuItemFontSizeLarge;
  }

  public static get menuMessageLineHeightSmall(): string {
    return this.menuItemLineHeightSmall;
  }
  public static get menuMessageLineHeightMedium(): string {
    return this.menuItemLineHeightMedium;
  }
  public static get menuMessageLineHeightLarge(): string {
    return this.menuItemLineHeightLarge;
  }
  public static menuItemGap = '1px';

  //menuHeader
  public static menuHeaderColor = colors.textNeutralSoft;

  public static menuHeaderLineHeightSmall = '16px';
  public static menuHeaderLineHeightMedium = '20px';
  public static menuHeaderLineHeightLarge = '22px';

  public static menuHeaderFontSizeSmall = '12px';
  public static menuHeaderFontSizeMedium = '14px';
  public static menuHeaderFontSizeLarge = '16px';

  public static menuHeaderPaddingXSmall = '8px';
  public static menuHeaderPaddingTopSmall = '12px';
  public static menuHeaderPaddingBottomSmall = '4px';

  public static menuHeaderPaddingXMedium = '12px';
  public static menuHeaderPaddingTopMedium = '14px';
  public static menuHeaderPaddingBottomMedium = '6px';

  public static menuHeaderPaddingXLarge = '16px';
  public static menuHeaderPaddingTopLarge = '18px';
  public static menuHeaderPaddingBottomLarge = '8px';

  public static menuHeaderTotalCountPaddingTopSmall = '4px';
  public static menuHeaderTotalCountPaddingTopMedium = '6px';
  public static menuHeaderTotalCountPaddingTopLarge = '8px';

  public static menuHeaderTotalCountPaddingBottomSmall = '12px';
  public static menuHeaderTotalCountPaddingBottomMedium = '14px';
  public static menuHeaderTotalCountPaddingBottomLarge = '18px';

  //menuFooter
  public static get menuFooterColor(): string {
    return this.menuHeaderColor;
  }
  public static get menuFooterLineHeightSmall(): string {
    return this.menuHeaderLineHeightSmall;
  }
  public static get menuFooterLineHeightMedium(): string {
    return this.menuHeaderLineHeightMedium;
  }
  public static get menuFooterLineHeightLarge(): string {
    return this.menuHeaderLineHeightLarge;
  }

  public static get menuFooterFontSizeSmall(): string {
    return this.menuHeaderFontSizeSmall;
  }
  public static get menuFooterFontSizeMedium(): string {
    return this.menuHeaderFontSizeMedium;
  }
  public static get menuFooterFontSizeLarge(): string {
    return this.menuHeaderFontSizeLarge;
  }

  public static get menuFooterPaddingXSmall(): string {
    return this.menuHeaderPaddingXSmall;
  }
  public static get menuFooterPaddingXMedium(): string {
    return this.menuHeaderPaddingXMedium;
  }
  public static get menuFooterPaddingXLarge(): string {
    return this.menuHeaderPaddingXLarge;
  }

  public static get menuFooterPaddingTopSmall(): string {
    return this.menuHeaderPaddingBottomSmall;
  }
  public static get menuFooterPaddingTopMedium(): string {
    return this.menuHeaderPaddingBottomMedium;
  }
  public static get menuFooterPaddingTopLarge(): string {
    return this.menuHeaderPaddingBottomLarge;
  }

  public static get menuFooterPaddingBottomSmall(): string {
    return this.menuHeaderPaddingTopSmall;
  }
  public static get menuFooterPaddingBottomMedium(): string {
    return this.menuHeaderPaddingTopMedium;
  }
  public static get menuFooterPaddingBottomLarge(): string {
    return this.menuHeaderPaddingTopLarge;
  }

  //menuSeparator
  public static menuSeparatorBorderColor = colors.lineNeutralFaint;
  public static menuSeparatorMarginY = '2px';
  public static menuSeparatorMarginX = '8px';
  public static menuSeparatorBorderWidth = '1px';
  // mobileMenuSeparator
  public static mobileMenuSeparatorMarginY = '4px';
  public static mobileMenuSeparatorMarginX = '24px';
  //#endregion Menu
  //#region Toggle
  public static get toggleLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get toggleLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get toggleLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static get toggleFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get toggleFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get toggleFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get toggleTextColor(): string {
    return this.textColorDefault;
  }
  public static toggleHandleActiveWidthIncrement = '0px';
  public static get toggleHandleBorderRadiusSmall(): string {
    const height = parseInt(this.toggleHeightSmall, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static get toggleHandleBorderRadiusMedium(): string {
    const height = parseInt(this.toggleHeightMedium, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static get toggleHandleBorderRadiusLarge(): string {
    const height = parseInt(this.toggleHeightLarge, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }

  public static toggleHeightSmall = '20px';
  public static toggleWidthSmall = '32px';

  public static toggleHeightMedium = '22px';
  public static toggleWidthMedium = '34px';

  public static toggleHeightLarge = '24px';
  public static toggleWidthLarge = '36px';

  public static get toggleBorderRadiusSmall(): string {
    return `calc(${this.toggleHeightSmall} * 0.5)`;
  }
  public static get toggleBorderRadiusMedium(): string {
    return `calc(${this.toggleHeightMedium} * 0.5)`;
  }
  public static get toggleBorderRadiusLarge(): string {
    return `calc(${this.toggleHeightLarge} * 0.5)`;
  }

  public static toggleBaseBg = 'transparent';
  public static toggleBgHover = colors.shapeOtherFieldHover;

  public static get toggleBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get toggleOutlineWidth(): string {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${outlineWidth + borderWidth}px`;
  }
  public static toggleBorderColor = colors.lineNeutralPale;
  public static get toggleBorderColorDisabled(): string {
    return this.toggleBorderColor;
  }

  public static toggleHandleSizeSmall = '14px';
  public static toggleHandleSizeMedium = '16px';
  public static toggleHandleSizeLarge = '18px';

  public static toggleHandleLeft = '3px';
  public static toggleHandleTop = '3px';

  public static toggleBgFocus = 'linear-gradient(-180deg, #f1f1f1, #dedede)';
  public static get toggleShadowColorError(): string {
    return this.errorMain;
  }
  public static get toggleShadowColorWarning(): string {
    return this.warningMain;
  }
  public static get toggleFocusShadowColor(): string {
    return this.borderColorFocus;
  }
  public static toggleCaptionGap = '8px';
  public static toggleButtonOffsetY = '0px';

  public static get toggleOutlineColorFocus(): string {
    return this.outlineColorFocus;
  }

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
  public static toggleCheckedBg = '#fff';
  public static toggleCheckedBgHover = '#fff';

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
  public static toggleBgDisabledChecked = '#dadada';

  //#endregion Toggle
  //#region Popup
  public static popupBorder = 'none';
  public static popupBorderRadius = '8px';
  public static popupBorderColor = 'transparent';
  public static popupDropShadow =
    'drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.08)) drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.12))';
  public static popupBoxShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';
  public static get popupTextColor(): string {
    return this.textColorDefault;
  }
  public static get popupBackground(): string {
    return this.bgSecondary;
  }
  public static popupPinOffsetX = '16px';
  public static popupPinOffsetY = '16px';
  public static popupMargin = '10px';
  public static popupPinSize = '8px';
  public static popupMenuMenuOffsetY = '0px';
  //#endregion
  //#region Input
  public static get inputTextColor(): string {
    return this.textColorDefault;
  }
  public static inputShadow = 'none';
  public static inputBg = colors.shapeOtherField;
  public static inputIconColor = colors.textNeutralSoft;
  public static get inputIconColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get inputFocusedIconColor(): string {
    return this.inputIconColor;
  }
  public static inputColor = 'inherit';
  public static inputWidth = '200px';
  public static get inputTextColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get inputPlaceholderColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get inputFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get inputFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get inputFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get inputLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get inputLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get inputLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static get inputHeightSmall(): string {
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYSmall, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightSmall, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get inputHeightMedium(): string {
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYMedium, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightMedium, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get inputHeightLarge(): string {
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYLarge, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightLarge, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get inputPaddingYSmall(): string {
    return this.controlPaddingYSmall;
  }
  public static get inputPaddingYMedium(): string {
    return this.controlPaddingYMedium;
  }
  public static get inputPaddingYLarge(): string {
    return this.controlPaddingYLarge;
  }
  public static inputPaddingXSmall = '7px';
  public static inputPaddingXMedium = '11px';
  public static inputPaddingXLarge = '15px';

  public static inputIconGapSmall = '4px';
  public static inputIconGapMedium = '6px';
  public static inputIconGapLarge = '8px';

  public static inputIconSizeSmall = '16px';
  public static inputIconSizeMedium = '20px';
  public static inputIconSizeLarge = '24px';

  public static get inputFocusShadow(): string {
    return `0 0 0 ${this.inputOutlineWidth} ${this.borderColorFocus}`;
  }
  public static get inputFocusedBg(): string {
    return this.inputBg;
  }
  public static get inputDisabledBg(): string {
    return this.bgDisabled;
  }
  public static get inputDisabledBorderColor(): string {
    return this.borderColorDisabled;
  }
  public static get inputFocusOutline(): string {
    return this.borderColorFocus;
  }
  public static get inputBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get inputOutlineWidth(): string {
    return `calc(${this.controlOutlineWidth} - 1px)`;
  }
  public static inputBackgroundClip = 'padding-box';
  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';
  public static inputDisabledBackgroundClip = 'padding-box';
  public static inputBorderColor = colors.lineNeutralPale;

  public static get inputBorderColorHover(): string {
    return this.closeGrayColor;
  }
  public static get inputBorderColorFocus(): string {
    return this.borderColorFocus;
  }
  public static get inputBorderColorError(): string {
    return this.borderColorError;
  }
  public static get inputBorderColorWarning(): string {
    return this.borderColorWarning;
  }
  public static get inputBorderTopColor(): string {
    return this.inputBorderColor;
  }
  public static get inputPlaceholderColor(): string {
    return this.placeholderColor;
  }

  public static get inputPlaceholderColorLight(): string {
    return this.placeholderColorLight;
  }
  public static inputBlinkColor = colors.shapeFaintNeutralAlpha;
  public static inputColorScheme = 'light';

  //#endregion Input
  //#region Checkbox
  public static get checkboxFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get checkboxFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get checkboxFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static get checkboxLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get checkboxLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get checkboxLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static checkboxBoxSizeSmall = '16px';
  public static checkboxBoxSizeMedium = '20px';
  public static checkboxBoxSizeLarge = '24px';
  public static checkboxCaptionGap = '8px';

  public static get checkboxPaddingYSmall(): string {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }

  public static get checkboxPaddingYMedium(): string {
    const controlHeight = parseInt(this.controlHeightMedium, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightMedium, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get checkboxPaddingYLarge(): string {
    const controlHeight = parseInt(this.controlHeightLarge, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightLarge, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }

  public static checkboxPaddingXSmall = '0';
  public static checkboxPaddingXMedium = '0';
  public static checkboxPaddingXLarge = '0';

  public static checkboxBoxOffsetY = '1px';
  public static checkboxBgStart = '#fdfdfd';
  public static checkboxBgEnd = '#ededed';
  public static get checkboxTextColorDefault(): string {
    return this.textColorDefault;
  }
  public static get checkboxTextColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get checkboxShadowDisabled(): string {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.1)`;
  }
  public static checkboxBorder = 'none';
  public static get checkboxBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get checkboxShadow(): string {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static get checkboxShadowHover(): string {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static checkboxCheckedColor = colors.shapeInvertedNeutralHeavy;
  public static get checkboxOutlineColorFocus(): string {
    return this.outlineColorFocus;
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
  public static checkboxBorderRadius = '4px';
  public static get checkboxOutlineWidth(): string {
    return this.controlOutlineWidth;
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
  public static checkboxBg = colors.shapeOtherField;
  public static get checkboxHoverBg(): string {
    return this.btnDefaultHoverBg;
  }
  public static get checkboxActiveBg(): string {
    return this.btnDefaultActiveBg;
  }
  public static get checkboxCheckedBg(): string {
    return this.bgChecked;
  }
  public static get checkboxBgDisabled(): string {
    return this.bgDisabled;
  }
  public static checkboxCheckedHoverBg = colors.shapeBoldAccentHover;

  public static checkboxCheckedActiveBg = colors.shapeBoldAccentPressed;

  public static get checkboxShadowActive(): string {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  //#endregion Checkbox
  //#region TextArea
  public static textareaBg = colors.shapeOtherField;
  public static get textareaColor(): string {
    return this.textColorDefault;
  }
  public static get textareaTextColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static get textareaPlaceholderColorLight(): string {
    return this.placeholderColorLight;
  }
  public static get textareaPlaceholderColor(): string {
    return this.placeholderColor;
  }
  public static get textareaPlaceholderColorDisabled(): string {
    return this.textColorDisabled;
  }
  public static textareaShadow = 'none';
  public static textareaBackgroundClip = 'padding-box';

  public static get textareaFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get textareaFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get textareaFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static get textareaLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get textareaLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get textareaLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static textareaBorderRadius = '2px';
  public static get textareaBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get textareaOutlineWidth(): string {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${outlineWidth - borderWidth}px`;
  }

  public static get textareaMinHeightSmall(): string {
    const lineHeight = parseInt(this.textareaLineHeightSmall, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYSmall, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }

  public static get textareaMinHeightMedium(): string {
    const lineHeight = parseInt(this.textareaLineHeightMedium, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYMedium, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }
  public static get textareaMinHeightLarge(): string {
    const lineHeight = parseInt(this.textareaLineHeightLarge, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYLarge, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }

  public static textareaWidth = '250px';
  public static textareaPaddingXSmall = '7px';

  public static textareaPaddingXMedium = '11px';
  public static textareaPaddingXLarge = '15px';

  public static get textareaPaddingYSmall(): string {
    return this.controlPaddingYSmall;
  }

  public static get textareaPaddingYMedium(): string {
    return this.controlPaddingYMedium;
  }
  public static get textareaPaddingYLarge(): string {
    return this.controlPaddingYLarge;
  }

  public static get textareaBorderColor(): string {
    return this.borderColorGrayLight;
  }
  public static textareaBorderTopColor = colors.lineNeutralPale;
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
  public static get textareaDisabledBorderColor(): string {
    return this.borderColorDisabled;
  }
  public static get textareaCounterColor(): string {
    return this.gray;
  }
  public static textareaCounterBg = 'transparent';

  public static get textareaCounterErrorColor(): string {
    return this.errorText;
  }
  public static get textareaCounterHelpIconColor(): string {
    return this.linkColor;
  }
  public static textareaMargin = '0px'; // обнуление вертикального браузерного margin в firefox
  public static textareaVerticalAlign = 'top';

  //#endregion Textarea
  //#region Radio
  public static radioBulletSizeSmall = '6px';
  public static radioBulletSizeMedium = '10px';
  public static radioBulletSizeLarge = '12px';
  public static get radioOutlineWidth(): string {
    return this.controlOutlineWidth;
  }
  public static get radioTextColor(): string {
    return this.textColorDefault;
  }

  public static radioSizeSmall = '16px';
  public static radioSizeMedium = '20px';
  public static radioSizeLarge = '24px';

  public static get radioFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get radioFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get radioFontSizeLarge(): string {
    return this.fontSizeLarge;
  }

  public static get radioLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get radioLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get radioLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static radioCaptionGap = '8px';

  public static get radioPaddingYSmall(): string {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get radioPaddingYMedium(): string {
    const controlHeight = parseInt(this.controlHeightMedium, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightMedium, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get radioPaddingYLarge(): string {
    const controlHeight = parseInt(this.controlHeightLarge, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightLarge, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }

  public static radioVerticalAlign = 'top';
  public static radioBgImage = 'none';
  public static radioBgColor = colors.shapeOtherField;
  public static get radioHoverBg(): string {
    return this.checkboxHoverBg;
  }
  public static get radioActiveBg(): string {
    return this.checkboxActiveBg;
  }
  public static get radioBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get radioBorderColor(): string {
    return this.borderColorGrayLight;
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
  public static get radioFocusShadow(): string {
    return `inset 0 0 0 1px ${this.outlineColorFocus}`;
  }
  public static get radioCheckedBgColor(): string {
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
  public static get radioDisabledShadow(): string {
    return `0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.1)`;
  }
  public static radioCaptionDisplay = 'inline-flex';
  public static radioBorderWidthCompensation = '0px';
  public static radioCircleOffsetY = '1px';
  public static get radioCheckedDisabledBulletBg(): string {
    return this.gray;
  }
  //#endregion
  //#region Tabs
  public static get tabFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get tabFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get tabFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get tabLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get tabLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get tabLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static tabPaddingXSmall = '8px';
  public static tabPaddingXMedium = '10px';
  public static tabPaddingXLarge = '12px';

  public static get tabPaddingYSmall(): string {
    const paddingY = parseInt(this.controlPaddingYSmall);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static get tabPaddingYMedium(): string {
    const paddingY = parseInt(this.controlPaddingYMedium);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static get tabPaddingYLarge(): string {
    const paddingY = parseInt(this.controlPaddingYLarge);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static tabBorderWidth = '2px';
  public static get tabOutlineWidth(): string {
    return this.controlOutlineWidth;
  }
  public static get tabTextColorDefault(): string {
    return this.textColorDefault;
  }
  public static get tabColorFocus(): string {
    return this.borderColorFocus;
  }
  public static get tabColorError(): string {
    return this.btnDangerBg;
  }
  public static get tabColorWarning(): string {
    return this.btnPayBg;
  }
  public static get tabColorSuccess(): string {
    return this.btnSuccessBg;
  }
  public static get tabColorPrimary(): string {
    return this.btnPrimaryBg;
  }
  public static tabColorHover = colors.lineNeutralPale;
  public static tabColorHoverError = colors.shapeBoldErrorHover;
  public static tabColorHoverWarning = colors.shapeBoldWarningHover;
  public static tabColorHoverSuccess = colors.shapeBoldSuccessHover;
  public static tabColorHoverPrimary = colors.lineAccentPale;

  public static tabIndicatorBorderRadius = '2px';
  //#endregion Tabs
  //#region Spinner
  public static get spinnerBgColor(): string {
    return this.grayXLight;
  }
  public static get spinnerColor(): string {
    return this.red;
  }
  public static get spinnerDimmedColor(): string {
    return this.gray;
  }
  public static get spinnerCaptionColor(): string {
    return this.gray;
  }
  public static get spinnerFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get spinnerFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get spinnerFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get spinnerLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get spinnerLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get spinnerLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }
  public static spinnerCaptionGapSmall = '6px';
  public static spinnerCaptionGapMedium = '-4px';
  public static spinnerCaptionGapLarge = '-3px';
  public static spinnerCaptionMarginSmall = '0 0 0 6px';
  public static spinnerCaptionMarginMedium = '0 0 0 6px';
  public static spinnerCaptionMarginLarge = '0 0 0 6px';
  //#endregion
  //#region Switcher
  public static switcherBorderRadius = '8px';
  public static get switcherTextColor(): string {
    return this.textColorDefault;
  }
  public static get switcherOutlineWidth(): string {
    return this.btnOutlineWidth;
  }
  public static get switcherCaptionFontSizeSmall(): string {
    return this.btnFontSizeSmall;
  }
  public static get switcherCaptionFontSizeMedium(): string {
    return this.btnFontSizeMedium;
  }
  public static get switcherCaptionFontSizeLarge(): string {
    return this.btnFontSizeLarge;
  }
  public static get switcherCaptionLineHeightSmall(): string {
    return this.btnLineHeightSmall;
  }
  public static get switcherCaptionLineHeightMedium(): string {
    return this.btnLineHeightMedium;
  }
  public static get switcherCaptionLineHeightLarge(): string {
    return this.btnLineHeightLarge;
  }
  public static get switcherCaptionGapSmall(): string {
    return this.btnPaddingXSmall;
  }
  public static get switcherCaptionGapMedium(): string {
    return this.btnPaddingXMedium;
  }
  public static get switcherCaptionGapLarge(): string {
    return this.btnPaddingXLarge;
  }
  public static switcherButtonPaddingXSmall = '7px';
  public static switcherButtonPaddingXMedium = '11px';
  public static switcherButtonPaddingXLarge = '15px';
  public static get switcherButtonPaddingYSmall(): string {
    return this.btnPaddingYSmall;
  }
  public static get switcherButtonPaddingYMedium(): string {
    return this.btnPaddingYMedium;
  }
  public static get switcherButtonPaddingYLarge(): string {
    return this.btnPaddingYLarge;
  }
  public static get switcherButtonLineHeightSmall(): string {
    return this.btnLineHeightSmall;
  }
  public static get switcherButtonLineHeightMedium(): string {
    return this.btnLineHeightMedium;
  }
  public static get switcherButtonLineHeightLarge(): string {
    return this.btnLineHeightLarge;
  }
  public static get switcherButtonFontSizeSmall(): string {
    return this.btnFontSizeSmall;
  }
  public static get switcherButtonFontSizeMedium(): string {
    return this.btnFontSizeMedium;
  }
  public static get switcherButtonFontSizeLarge(): string {
    return this.btnFontSizeLarge;
  }
  public static get switcherButtonBorderRadiusSmall(): string {
    return this.btnBorderRadiusSmall;
  }
  public static get switcherButtonBorderRadiusMedium(): string {
    return this.btnBorderRadiusMedium;
  }
  public static get switcherButtonBorderRadiusLarge(): string {
    return this.btnBorderRadiusLarge;
  }
  public static get switcherButtonBorderWidth(): string {
    return this.btnBorderWidth;
  }
  public static switcherBtnDisabledBorderColor = colors.lineNeutralPale;
  public static get switcherButtonDisabledBorderColor(): string {
    return this.switcherBtnDisabledBorderColor;
  }
  public static get switcherButtonCheckedDisabledShadow(): string {
    return this.btnCheckedDisabledShadow;
  }
  //#endregion
  //#region MobilePopup
  public static mobilePopupTopPadding = '80px';
  public static mobilePopupContainerBottomPadding = '8px';
  public static mobilePopupHeaderPadding = '16px 16px 8px 16px';
  public static mobilePopupFooterPadding = '16px 16px 16px 16px';
  public static mobilePopupContainerBorderRadius = '16px';
  public static get mobilePopupHeaderFontSize(): string {
    return this.fontSizeMobile;
  }
  public static get mobilePopupHeaderLineHeight(): string {
    return this.lineHeightMobile;
  }
  public static mobilePopupHeaderFontWeight = '500';
  public static mobilePopupHeaderChildPadding = '12px';
  public static mobilePopupOuterIndentY = '24px';
  //#endregion
  //#region ScrollContainer
  public static scrollContainerScrollBarSize = '4px';
  public static scrollContainerScrollBarHoverSize = '10px';
  public static scrollContainerScrollBarColor = colors.shapeSoftNeutralAlpha;
  public static scrollContainerScrollBarInvertColor = colors.shapeInvertedNeutralSoftAlpha;
  public static scrollContainerScrollBarOffsetY = '4px';
  public static dropdownMenuScrollContainerScrollBarOffsetY = '0px';
  //#endregion
  //#region PasswordInput
  public static passwordInputVisibilityIconColor = colors.textNeutralHeavy;
  public static passwordInputVisibilityIconOpacity = '0.64';
  public static passwordInputVisibilityIconHoverColor = colors.textNeutralHeavy;
  public static passwordInputVisibilityIconHoverOpacity = '1';
  //#endregion
  //#region GlobalLoader
  public static get globalLoaderColor(): string {
    return this.blueLight;
  }
  public static globalLoaderHeight = '4px';
  public static globalLoaderWidth = '100%';
  public static globalLoaderPosition = 'fixed';
  public static globalLoaderTop = '0px';
  public static globalLoaderLeft = '0px';
  public static globalLoaderBottom = 'auto';
  public static globalLoaderRight = 'auto';
  public static globalLoaderBackgroundColor = 'transparent';
  public static globalLoaderTransitionToSpinnerDuration = '500'; //ms
  public static globalLoaderSpinnerAnimationDuration = '2000'; //ms
  public static globalLoaderSlowAnimationDuration = '20000'; //ms
  public static globalLoaderTransitionFromSpinnerDuration = '200'; //ms
  //#endregion
  //#region FileUploader
  public static fileUploaderWidth = '362px';
  public static fileUploaderTileWidth = 'auto';
  public static fileUploaderBg = '';
  public static fileUploaderUploadButtonBg = 'transparent';

  public static get fileUploaderPaddingYSmall(): string {
    return this.controlPaddingYSmall;
  }
  public static get fileUploaderPaddingYMedium(): string {
    return this.controlPaddingYMedium;
  }
  public static get fileUploaderPaddingYLarge(): string {
    return this.controlPaddingYLarge;
  }

  public static fileUploaderPaddingXSmall = '7px';
  public static fileUploaderPaddingXMedium = '9px';
  public static fileUploaderPaddingXLarge = '11px';

  public static fileUploaderTilePaddingSmall = '3px';
  public static fileUploaderTilePaddingMedium = '5px';
  public static fileUploaderTilePaddingLarge = '7px';

  public static get fileUploaderTileIconActionPositionSmall(): string {
    return `${parseInt(this.fileUploaderTilePaddingSmall) + 1}px`;
  }
  public static get fileUploaderTileIconActionPositionMedium(): string {
    return `${parseInt(this.fileUploaderTilePaddingMedium) + 1}px`;
  }
  public static get fileUploaderTileIconActionPositionLarge(): string {
    return `${parseInt(this.fileUploaderTilePaddingLarge) + 1}px`;
  }

  public static fileUploaderTileFilePaddingSmall = '7px';
  public static fileUploaderTileFilePaddingMedium = '11px';
  public static fileUploaderTileFilePaddingLarge = '15px';

  public static fileUploaderTileIconActionPaddingSmall = '8px';
  public static fileUploaderTileIconActionPaddingMedium = '6px';
  public static fileUploaderTileIconActionPaddingLarge = '8px';

  public static get fileUploaderFontSizeSmall(): string {
    return this.fontSizeSmall;
  }
  public static get fileUploaderFontSizeMedium(): string {
    return this.fontSizeMedium;
  }
  public static get fileUploaderFontSizeLarge(): string {
    return this.fontSizeLarge;
  }
  public static get fileUploaderLineHeightSmall(): string {
    return this.controlLineHeightSmall;
  }
  public static get fileUploaderLineHeightMedium(): string {
    return this.controlLineHeightMedium;
  }
  public static get fileUploaderLineHeightLarge(): string {
    return this.controlLineHeightLarge;
  }

  public static get fileUploaderTextColorDefault(): string {
    return this.textColorDefault;
  }
  public static fileUploaderBorderRadius = '8px';
  public static get fileUploaderBorderColor(): string {
    return this.borderColorGrayLight;
  }
  public static get fileUploaderBorderWidth(): string {
    return this.controlBorderWidth;
  }
  public static get fileUploaderDisabledBorder(): string {
    return `${this.fileUploaderBorderWidth} ${this.fileUploaderBorderStyle} ${this.fileUploaderDisabledBorderColor}`;
  }
  public static fileUploaderBorderStyle = 'dashed';
  public static get fileUploaderBorderColorFocus(): string {
    return this.borderColorFocus;
  }
  public static get fileUploaderLinkColor(): string {
    return this.textColorDefault;
  }
  public static fileUploaderIconSize = '14px';
  public static fileUploaderIconColor = colors.textNeutralPale;
  public static fileUploaderIconHoverColor = colors.textNeutralHeavy;

  public static fileUploaderTileIconColorBg = colors.shapeFaintAccent;
  public static fileUploaderTileIconHoverColorBg = colors.shapeFaintAccentHover;
  public static fileUploaderTileIconActiveColorBg = colors.shapeFaintAccentPressed;

  public static fileUploaderTileIconColor = colors.textInvertedAccentHeavy;
  public static fileUploaderTileIconHoverColor = colors.textInvertedAccentHeavyHover;

  public static get fileUploaderBorderColorError(): string {
    return this.borderColorError;
  }
  public static get fileUploaderBorderColorWarning(): string {
    return this.borderColorWarning;
  }
  public static get fileUploaderDisabledBg(): string {
    return this.btnDisabledBg;
  }
  public static fileUploaderDisabledBgClip = 'padding-box';
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
  public static get fileUploaderErrorColor(): string {
    return this.closeGrayColor;
  }

  public static fileUploaderErrorBgColor = colors.shapeFaintError;
  public static fileUploaderErrorBgHoverColor = colors.shapeFaintErrorHover;
  public static get fileUploaderErrorTextColor(): string {
    return this.redDark;
  }

  public static fileUploaderWarningBgColor = colors.shapeFaintWarning;
  public static fileUploaderWarningBgHoverColor = colors.shapeFaintWarningHover;
  public static get fileUploaderWarningTextColor(): string {
    return this.yellowDark;
  }

  public static fileUploaderValidationTextColor = colors.textWarningHeavy;
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = colors.shapeOtherBacklessHover;
  public static fileUploaderActiveBg = colors.shapeOtherBacklessPressed;
  public static fileUploaderHoveredBorderColor = 'transparent';
  public static fileUploaderIconGapSmall = '4px';
  public static fileUploaderIconGapMedium = '6px';
  public static fileUploaderIconGapLarge = '8px';

  public static get fileUploaderDragOverBorderColor(): string {
    return this.borderColorFocus;
  }
  public static fileUploaderDragOverShadow =
    '0px 0px 0px 3px rgb(149, 149, 149), 0px 0px 0px 8px rgba(61, 61, 61, 0.2)';

  public static get fileUploaderIconSizeSmall(): string {
    return this.btnIconSizeSmall;
  }
  public static get fileUploaderIconSizeMedium(): string {
    return this.btnIconSizeMedium;
  }
  public static get fileUploaderIconSizeLarge(): string {
    return this.btnIconSizeLarge;
  }

  public static get fileUploaderFileTypeErrorIconColor(): string {
    return this.red;
  }
  public static get fileUploaderFileTypeWarningIconColor(): string {
    return this.yellow;
  }
  public static get fileUploaderFileTypePdfIconColor(): string {
    return this.red;
  }
  public static fileUploaderFileTypeCodeIconColor = colors.customizableBoldPurple;
  public static fileUploaderFileTypePictureIconColor = colors.customizableBoldBlue;
  public static fileUploaderFileTypePresentationIconColor = colors.customizableBoldOrange;
  public static fileUploaderFileTypeTableIconColor = colors.customizableBoldGreen;
  public static fileUploaderFileTypeTextIconColor = colors.customizableBoldBlue;
  public static fileUploaderFileTypeArchiveIconColor = colors.customizableHeavyOrange;
  public static fileUploaderFileTypeFolderIconColor = colors.customizableBoldYellow;
  public static fileUploaderFileTypeUnknownIconColor = colors.textNeutralSoft;
  public static get fileUploaderDisabledFileTypeIcon(): string {
    return this.fileUploaderDisabledIconColor;
  }
  public static fileUploaderDisabledColor = colors.textNeutralFaint;

  public static fileUploaderFileHeightSmall = '32px';
  public static fileUploaderFileHeightMedium = '40px';
  public static fileUploaderFileHeightLarge = '48px';

  public static fileUploaderTileWidthSmall = '104px';
  public static fileUploaderTileWidthMedium = '120px';
  public static fileUploaderTileWidthLarge = '144px';

  public static fileUploaderTileMinHeightSmall = '132px';
  public static fileUploaderTileMinHeightMedium = '150px';
  public static fileUploaderTileMinHeightLarge = '184px';

  public static fileUploaderTileHeightSmall = '180px';
  public static fileUploaderTileHeightMedium = '206px';
  public static fileUploaderTileHeightLarge = '248px';

  public static fileUploaderFileSizeWidthSmall = '80px';
  public static fileUploaderFileSizeWidthMedium = '88px';
  public static fileUploaderFileSizeWidthLarge = '104px';

  public static fileUploaderFileSizeMarginLeft = '28px';
  public static fileUploaderFileSizeMarginSmall = '32px';
  public static fileUploaderFileSizeMarginMedium = '34px';
  public static fileUploaderFileSizeMarginLarge = '36px';

  public static fileUploaderFileIconSizeSmall = '24px';
  public static fileUploaderFileIconSizeMedium = '32px';
  public static fileUploaderFileIconSizeLarge = '40px';

  public static fileUploaderTileIconSizeSmall = '20px';
  public static fileUploaderTileIconSizeMedium = '24px';
  public static fileUploaderTileIconSizeLarge = '32px';

  public static fileUploaderTileTypeIconHeightSmall = '116px';
  public static fileUploaderTileTypeIconHeightMedium = '126px';
  public static fileUploaderTileTypeIconHeightLarge = '152px';

  public static fileUploaderListGap = '8px';
  public static fileUploaderListSummaryTextGap = '12px';

  //#endregion FileUploader

  //#region ClearCrossIcon
  public static clearCrossIconWidthSmall = '24px';
  public static clearCrossIconWidthMedium = '30px';
  public static clearCrossIconWidthLarge = '36px';
  public static get clearCrossIconHeightSmall(): string {
    return this.inputHeightSmall;
  }
  public static get clearCrossIconHeightMedium(): string {
    return this.inputHeightMedium;
  }
  public static get clearCrossIconHeightLarge(): string {
    return this.inputHeightLarge;
  }

  public static get clearCrossIconRightMarginSmall(): string {
    const inputPaddingXSmall = parseInt(this.inputPaddingXSmall);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXSmall + inputBorderWidth}px`;
  }
  public static get clearCrossIconRightMarginMedium(): string {
    const inputPaddingXMedium = parseInt(this.inputPaddingXMedium);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXMedium + inputBorderWidth}px`;
  }
  public static get clearCrossIconRightMarginLarge(): string {
    const inputPaddingXLarge = parseInt(this.inputPaddingXLarge);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXLarge + inputBorderWidth}px`;
  }

  public static get clearCrossIconBorderRadiusSmall(): string {
    return this.inputBorderRadiusSmall;
  }
  public static get clearCrossIconBorderRadiusMedium(): string {
    return this.inputBorderRadiusMedium;
  }
  public static get clearCrossIconBorderRadiusLarge(): string {
    return this.inputBorderRadiusLarge;
  }

  public static clearCrossIconColor = colors.textNeutralSoft;
  public static clearCrossIconHoverColor = colors.textNeutralHeavy;

  public static clearCrossIconAlign = 'flex-start';

  //#endregion ClearCrossIcon

  //#region CloseIcon
  public static get closeBtnIconColor(): string {
    return this.closeGrayColor;
  }
  public static closeBtnIconDisabledColor = colors.textNeutralFaint;
  public static closeBtnIconHoverColor = colors.textNeutralHeavy;
  public static closeBtnIconBorderRadius = '4px';
  public static get closeBtnIconFocusShadow(): string {
    return `inset 0 0 0 1px ${this.borderColorFocus}, inset 0 0 0 2px ${this.outlineColorFocus}`;
  }
  //#endregion CloseIcon

  //#region Autocomplete
  public static get autocompleteMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  //#endregion Autocomplete

  //#region Combobox
  public static get comboboxMenuOffsetY(): string {
    return this.menuOffsetY;
  }
  //#endregion Combobox

  //#region MiniModal
  public static miniModalHeaderPaddingBottom = '0';
  public static miniModalBodyPaddingTop = '16px';
  public static miniModalBodyPaddingBottom = '0';
  public static miniModalDescriptionFontSize = '16px';
  public static miniModalDescriptionLineHeight = '22px';
  public static miniModalHeaderPaddingTop = '32px';
  public static miniModalActionGap = '8px';
  public static miniModalCancelIndent = '8px';
  public static miniModalFooterPaddingTop = '24px';
  public static miniModalFooterPaddingBottom = '32px';
  public static miniModalTitleMarginTop = '16px';
  public static miniModalHeightMobile = 'auto';
  public static miniModalMarginTopMobile = '16px';
  public static miniModalMarginLeftMobile = '16px';
  public static miniModalMarginRightMobile = '16px';
  public static miniModalFooterPaddingMobile = '24px 16px 16px';
  public static miniModalHeaderPaddingMobile = '32px 16px 0';
  public static miniModalBodyPaddingMobile = '16px 16px 0';
  //#endregion MiniModal

  //#region react-ui-validations
  public static get validationsTextColorError(): string {
    return this.errorText;
  }
  public static validationsTextColorWarning = colors.textWarningHeavy;
  //#endregion
}

export const BasicTheme = createTheme({ themeClass: BasicThemeClass });

export const BasicThemeClassForExtension = class {} as typeof BasicThemeClass;
