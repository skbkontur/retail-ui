import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters, markAsFullTheme } from '../../lib/theming/ThemeHelpers';

export class DefaultTheme {
  //#region Common variables
  public static brandXLight = '#cae5f5';
  public static brandLight = '#3094d0';
  public static brand = '#1e79be';
  public static brandDark = '#1363a0';
  public static brandXDark = '#084f85';
  public static white = '#fff';
  public static grayXxLight = '#f2f2f2';
  public static grayXLight = '#e5e5e5';
  public static grayLight = '#a0a0a0';
  public static gray = '#808080';
  public static grayDark = '#333';
  public static black = '#000';
  public static blueXxLight = '#e4f3ff';
  public static blueLight = '#5199db';
  public static blue = '#3072c4';
  public static blueDark = '#1e5aa4';
  public static blueXDark = '#044785';
  public static greenXxLight = '#e2f7dc';
  public static green = '#3f9726';
  public static greenDark = '#228007';
  public static redXxLight = '#ffd6d6';
  public static red = '#d70c17';
  public static redDark = '#ce0014';
  public static yellowXxLight = '#fff0bc';
  public static yellow = '#f69c00';
  public static yellowDark = '#d97e00';
  public static bgDefault = '#fff';
  public static bgDisabled = '#f2f2f2';
  public static errorMain = '#d70c17';
  public static errorSecondary = '#ffd6d6';
  public static errorText = '#ce0014';
  public static warningMain = '#f69c00';
  public static warningSecondary = '#fff0bc';
  public static warningText = '#d97e00';
  public static borderColorFocusLight = '#bad7f1';
  public static borderColorGrayDark = 'rgba(0, 0, 0, 0.28)';
  public static borderColorGrayLight = 'rgba(0, 0, 0, 0.15)';
  public static placeholderColor = '#a0a0a0';
  public static outlineColorFocus = '#fff';
  public static placeholderColorLight = '#cdcdcd';
  public static blinkColor = 'rgba(0, 136, 255, 0.2)';
  public static controlBorderWidth = '1px';
  public static controlOutlineWidth = '2px';
  public static controlLineHeightSmall = '20px';
  public static controlLineHeightMedium = '20px';
  public static controlLineHeightLarge = '22px';
  public static controlPaddingYSmall = '6px';
  public static controlPaddingYMedium = '9px';
  public static controlPaddingYLarge = '10px';
  public static textColorDefault = '#404040';
  public static textColorInvert = '#fff';
  public static textColorDisabled = '#a0a0a0';
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '14px';
  public static fontSizeLarge = '16px';
  public static specificityLevel = '0';
  public static get bgActive() {
    return this.blueLight;
  }
  public static get borderColorFocus() {
    return this.blueLight;
  }
  public static get borderColorError() {
    return this.errorMain;
  }
  public static get borderColorWarning() {
    return this.warningMain;
  }
  public static get controlHeightSmall() {
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
    const paddingYSmall = parseInt(this.controlPaddingYSmall, 10) || 0;
    const lineHeightSmall = parseInt(this.controlLineHeightSmall, 10) || 0;
    return `${2 * borderWidth + 2 * paddingYSmall + lineHeightSmall}px`;
  }
  public static get controlHeightMedium() {
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
    const paddingYMedium = parseInt(this.controlPaddingYMedium, 10) || 0;
    const lineHeightMedium = parseInt(this.controlLineHeightMedium, 10) || 0;
    return `${2 * borderWidth + 2 * paddingYMedium + lineHeightMedium}px`;
  }
  public static get controlHeightLarge() {
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
    const paddingYLarge = parseInt(this.controlPaddingYLarge, 10) || 0;
    const lineHeightLarge = parseInt(this.controlLineHeightLarge, 10) || 0;
    return `${2 * borderWidth + 2 * paddingYLarge + lineHeightLarge}px`;
  }

  //#endregion
  //#region Link
  public static linkColor = '#3072c4';
  public static linkActiveColor = '#044785';
  public static linkHoverTextDecoration = 'underline';
  public static linkSuccessColor = '#3f9726';
  public static linkSuccessHoverColor = '#3f9726';
  public static linkSuccessActiveColor = '#3f9726';
  public static linkDangerColor = '#e3071c';
  public static linkDangerHoverColor = '#e3071c';
  public static linkDangerActiveColor = '#b00616';
  public static linkIconMarginRight = '3px';
  public static get linkHoverColor() {
    return this.linkColor;
  }
  public static get linkDisabledColor() {
    return this.textColorDisabled;
  }
  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';
  //#endregion
  //#region Dropdown
  public static dropdownMenuSelectedBg = '#f1f1f1';
  public static get dropdownMenuHoverBg() {
    return this.bgActive;
  }
  //#endregion
  //#region Token
  public static tokenDisabledBg = 'rgba(0, 0, 0, 0.15)';
  public static get tokenTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static get tokenFontSize() {
    return this.fontSizeSmall;
  }
  public static tokenMarginY = '3px';
  public static tokenMarginX = '3px';
  public static tokenLineHeight = '1.5';
  public static tokenPaddingY = '0px';
  public static tokenPaddingX = '4px';
  public static tokenMarginBeforeIcon = '4px';
  public static tokenRemoveIconSize = '1em';
  public static tokenRemoveIconPaddingY = '2px';
  public static tokenRemoveIconPaddingX = '2px';
  public static tokenRemoveIconGap = '4px';
  public static tokenRemoveIconBoxSizing = 'border-box';
  public static tokenBorderRadius = '1px';
  public static tokenBorderWidth = '1px';
  public static get tokenBorderColorDisabled() {
    return this.tokenDisabledBg;
  }
  public static get tokenDefaultIdle() {
    return this.grayXLight;
  }
  public static get tokenDefaultActive() {
    return this.brand;
  }
  public static get tokenGrayIdle() {
    return this.grayXLight;
  }
  public static get tokenGrayActive() {
    return this.grayDark;
  }
  public static get tokenBlueIdle() {
    return this.blueLight;
  }
  public static get tokenBlueActive() {
    return this.blueDark;
  }
  public static get tokenGreenIdle() {
    return this.greenXxLight;
  }
  public static get tokenGreenActive() {
    return this.greenDark;
  }
  public static get tokenYellowIdle() {
    return this.yellowXxLight;
  }
  public static get tokenYellowActive() {
    return this.yellowDark;
  }
  public static get tokenRedIdle() {
    return this.redXxLight;
  }
  public static get tokenRedActive() {
    return this.redDark;
  }
  public static get tokenWhite() {
    return this.white;
  }
  public static get tokenBlack() {
    return this.black;
  }
  public static get tokenBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get tokenBorderColorError() {
    return this.borderColorError;
  }
  public static tokenOutlineWidth = '2px';
  public static tokenLegacyTextShift = '1px';
  public static tokenPaddingYDisabled = '1px';
  public static get tokenPaddingXDisabled() {
    return this.tokenPaddingX;
  }
  public static tokenMarginYDisabled = '2px';
  public static tokenMarginXDisabled = '2px';
  public static tokenShadowDisabled = 'none';
  //#endregion
  //#region TokenInput
  public static get tokenInputBorderColor() {
    return this.inputBorderColor;
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
  public static get tokenInputShadow() {
    return this.inputShadow;
  }
  public static get tokenInputTextColor() {
    return this.inputTextColor;
  }
  public static get tokenInputTextColorDisabled() {
    return this.inputTextColorDisabled;
  }
  public static tokenInputPaddingY = '2px';
  public static tokenInputPaddingX = '4px';
  public static get tokenInputFontSize() {
    return this.inputFontSizeSmall;
  }
  public static tokenInputLineHeight = '22px';

  public static tokenInputInputPaddingLeft = '5px';

  public static get tokenInputInputPaddingRight() {
    const paddingX = parseInt(this.tokenPaddingX, 10) || 0;
    const removeIconMarginX = parseInt(this.tokenRemoveIconGap, 10) || 0;
    const removeIconSizeX = parseInt(this.tokenInputFontSize, 10) || 0;
    return `${paddingX + removeIconSizeX + removeIconMarginX}px`;
  }
  //#endregion
  //#region Loader
  public static loaderBg = 'rgba(255, 255, 255, 0.8)';
  public static loaderOpacity = '0.8';
  //#endregion
  //#region Button
  public static get btnWrapPadding() {
    return this.btnBorderWidth;
  }
  public static get btnHeightShift() {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    return `-${2 * borderWidth}px`;
  }
  public static arrowActiveShadowGradient = 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 15%)';
  public static arrowCheckedShadowGradient = 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 15%)';
  public static btnLinkBorderRadius = '1px';
  public static get btnFocusShadowWidth() {
    return this.btnOutlineWidth;
  }
  public static btnFocusBorder = 'none';
  public static btnDisabledTextColor = '#a0a0a0';
  public static btnDisabledBorderColor = 'transparent';
  public static btnCheckedBg = '#737373';
  public static btnCheckedDisabledBg = '#a0a0a0';
  public static btnCheckedDisabledColor = 'rgba(255, 255, 255, 0.7)';
  public static btnCheckedHoverBorderColor = 'transparent';
  public static btnCheckedTextColor = '#fff';
  public static btnCheckedDisabledBorderColor = 'transparent';

  public static get btnCheckedShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)`;
  }
  public static btnCheckedShadowColorArrow = 'rgba(0, 0, 0, 0.3)';
  public static btnCheckedShadowArrow = '1px 0 0 0 rgba(0, 0, 0, 0.6)';
  public static btnCheckedDisabledShadow = '0 0 0 1px rgba(0, 0, 0, 0.37)';
  public static btnCheckedDisabledShadowArrow = '1px 0 0 0 #a0a0a0';
  public static btnSmallBorderRadius = '1px'; // todo: deprecated
  public static btnBorderRadius = '2px'; // todo: deprecated
  public static get btnBorderRadiusSmall() {
    return this.btnSmallBorderRadius;
  }
  public static get btnBorderRadiusMedium() {
    return this.btnBorderRadius;
  }
  public static get btnBorderRadiusLarge() {
    return this.btnBorderRadius;
  }
  public static btnBorderWidth = '1px';
  public static get btnOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static btnPaddingXSmall = '15px';
  public static btnPaddingXMedium = '15px';
  public static btnPaddingXLarge = '20px';
  public static btnIconGapSmall = '7px';
  public static btnIconGapMedium = '7px';
  public static btnIconGapLarge = '7px';
  public static btnIconSizeSmall = 'auto';
  public static btnIconSizeMedium = 'auto';
  public static btnIconSizeLarge = 'auto';
  public static btnDefaultBg = 'none';
  public static btnDefaultBgStart = '#fff';
  public static btnDefaultBgEnd = '#ebebeb';
  public static btnDeprecatedSizeMediumFontSize = '16px';
  public static btnDeprecatedSizeMediumPaddingShift = '1';
  public static btnDefaultCheckedBorder = 'none';
  public static get btnDefaultTextColor() {
    return this.textColorDefault;
  }
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultHoverBorderColor = 'transparent';
  public static btnDefaultActiveBorderColor = 'none';
  public static btnDefaultBorder = 'none';
  public static get btnDefaultShadow() {
    return `0 ${this.btnBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${this.btnBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static btnDefaultShadowArrow = '1.2px 0 0 0 rgba(0, 0, 0, 0.15)';
  public static btnDefaultHoverBgStart = '#f2f2f2';
  public static btnDefaultHoverBgEnd = '#dfdfdf';
  public static get btnDefaultHoverShadow() {
    return `0 ${this.btnBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${this.btnBorderWidth} rgba(0, 0, 0, 0.2)`;
  }
  public static btnDefaultHoverShadowArrow = '1px 0 0 0 rgba(0, 0, 0, 0.25)';
  public static btnDefaultActiveBg = '#e1e1e1';
  public static get btnDefaultActiveShadow() {
    return `0 -${this.btnBorderWidth} 0 0 rgba(0, 0, 0, 0.1), 0 0 0 ${this.btnBorderWidth} rgba(0, 0, 0, 0.2), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)`;
  }
  public static btnDefaultActiveShadowArrow = '1px 0 0 0 rgba(0, 0, 0, 0.25)';
  public static btnSuccessBg = '#419d14';
  public static btnSuccessHoverBg = 'none';
  public static btnSuccessHoverBorderColor = 'transparent';
  public static btnSuccessDisabledBg = 'none';
  public static btnSuccessBorder = 'none';
  public static btnSuccessBgStart = '#4ba91d';
  public static btnSuccessBgEnd = '#37910b';
  public static btnSuccessTextColor = '#fff';
  public static get btnSuccessShadow() {
    return `0 0 0 ${this.btnBorderWidth}  rgba(25, 103, 6, 0.7), 0 ${this.btnBorderWidth}  0 0 rgba(21, 80, 7, 0.5)`;
  }
  public static btnSuccessShadowArrow = '1px 0 0 0 rgba(25, 103, 6, 0.7), 0.5px 0 0 0 rgba(25, 103, 6, 0.5)';
  public static btnSuccessHoverBgStart = '#3b8d13';
  public static btnSuccessHoverBgEnd = '#317e0b';
  public static get btnSuccessHoverShadow() {
    return `0 0 0 ${this.btnBorderWidth}  rgba(7, 73, 1, 0.7), 0 ${this.btnBorderWidth}  0 0 rgba(16, 70, 4, 0.3)`;
  }
  public static btnSuccessHoverShadowArrow = '1px 0 0 0 rgba(7, 73, 1, 0.7), 0.5px 0 0 0 rgba(7, 73, 1, 0.4)';
  public static btnSuccessActiveBg = '#35840e';
  public static get btnSuccessActiveShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(4, 63, 0, 0.75), 0 -${this.btnBorderWidth} 0 0 rgba(9, 32, 4, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)`;
  }
  public static btnSuccessActiveShadowArrow = '1px 0 0 0 rgba(4, 63, 0, 0.75)';
  public static btnPrimaryBg = '#1e8dd4';
  public static btnPrimaryHoverBg = 'none';
  public static btnPrimaryHoverBorderColor = 'transparent';
  public static btnPrimaryDisabledBg = 'none';
  public static btnPrimaryBorder = 'none';
  public static btnPrimaryBgStart = '#2899ea';
  public static btnPrimaryBgEnd = '#167ac1';
  public static btnPrimaryTextColor = '#fff';
  public static get btnPrimaryShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(14, 81, 129, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(7, 37, 80, 0.5)`;
  }
  public static btnPrimaryShadowArrow = '1px 0 0 0 rgba(14, 81, 129, 0.7), 0.5px 0 0 0 rgba(14, 81, 129, 0.5)';
  public static btnPrimaryHoverBgStart = '#0087d5';
  public static btnPrimaryHoverBgEnd = '#167ac1';
  public static get btnPrimaryHoverShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(5, 60, 99, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(7, 37, 80, 0.3)`;
  }
  public static btnPrimaryHoverShadowArrow = '1px 0 0 0 rgba(5, 60, 99, 0.9)';
  public static btnPrimaryActiveBg = '#0079c3';
  public static get btnPrimaryActiveShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(10, 63, 99, 0.75), 0 -${this.btnBorderWidth} 0 0 rgba(8, 45, 96, 0.5), inset 0 1px 2px 0 rgba(0, 0, 0, 0.2)`;
  }
  public static btnPrimaryActiveShadowArrow = '1px 0 0 0 rgba(10, 63, 99, 0.9)';
  public static btnDangerBg = '#e14c30';
  public static btnDangerHoverBg = 'none';
  public static btnDangerHoverBorderColor = 'transparent';
  public static btnDangerDisabledBg = 'none';
  public static btnDangerBorder = 'none';
  public static btnDangerBgStart = '#ec5438';
  public static btnDangerBgEnd = '#d44327';
  public static btnDangerTextColor = '#fff';
  public static get btnDangerShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(173, 15, 0, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(0, 0, 0, 0.4)`;
  }
  public static btnDangerShadowArrow = `1px 0 0 0 rgba(173, 15, 0, 0.8),  0.5px 0 0 0 rgba(173, 15, 0, 0.3)`;
  public static btnDangerHoverBgStart = '#d44227';
  public static btnDangerHoverBgEnd = '#c73013';
  public static get btnDangerHoverShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(145, 0, 0, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(90, 3, 3, 0.4)`;
  }
  public static btnDangerHoverShadowArrow = '1px 0 0 0 rgba(145, 0, 0, 0.9)';
  public static btnDangerActiveBg = '#cd381b';
  public static get btnDangerActiveShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(108, 7, 7, 0.75), 0 -${this.btnBorderWidth} 0 0 rgba(90, 3, 3, 0.4), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)`;
  }
  public static btnDangerActiveShadowArrow = '1px 0 0 0 rgba(108, 7, 7, 0.7)';
  public static btnPayBg = '#ffc943';
  public static btnPayHoverBg = 'none';
  public static btnPayHoverBorderColor = 'transparent';
  public static btnPayDisabledBg = 'none';
  public static btnPayBorder = 'none';
  public static btnPayBgStart = '#ffd54b';
  public static btnPayBgEnd = '#ffbb39';
  public static get btnPayShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(238, 169, 34, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(77, 16, 0, 0.56)`;
  }
  public static get btnPayTextColor() {
    return this.textColorDefault;
  }
  public static btnPayShadowArrow = '1px 0 0 0 rgba(238, 169, 34, 0.5), 0.5px 0 0 0 rgba(77, 16, 0, 0.5)';
  public static btnPayHoverBgStart = '#ffbd3a';
  public static btnPayHoverBgEnd = '#f8a91d';
  public static get btnPayHoverShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(227, 142, 8, 0.7), 0 ${this.btnBorderWidth} 0 0 rgba(93, 20, 3, 0.4)`;
  }
  public static btnPayHoverShadowArrow = '1px 0 0 0 rgba(227, 142, 8, 0.5), 1px 0 0 0 rgba(93, 20, 3, 0.4)';
  public static btnPayActiveBg = '#fbb028';
  public static get btnPayActiveShadow() {
    return `0 0 0 ${this.btnBorderWidth} rgba(210, 144, 0, 0.7), 0 -${this.btnBorderWidth} 0 0 rgba(0, 0, 0, 0.44), inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)`;
  }
  public static btnPayActiveShadowArrow = '1px 0 0 0 rgba(210, 144, 0, 0.7), 0.5px 0 0 0 rgba(0, 0, 0, 0.44)';
  public static btnDeprecatedSizeMediumPaddingShiftIe = '1';
  public static btnMenuArrowColor = '#a6a6a6';
  public static get btnFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get btnFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get btnFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get btnLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get btnLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get btnLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get btnPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get btnPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get btnPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static get btnDisabledBg() {
    return this.bgDisabled;
  }
  public static get btnDisabledShadowColor() {
    return this.borderColorGrayLight;
  }
  public static get btnDisabledShadow() {
    return `0 0 0 ${this.btnBorderWidth} ${this.btnDisabledShadowColor}`;
  }
  public static get btnDisabledShadowArrow() {
    return `1px 0 0 0 ${this.btnDisabledShadowColor}`;
  }
  public static get btnTextColorDefault() {
    return this.textColorDefault;
  }
  public static get btnBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get btnBorderColorError() {
    return this.borderColorError;
  }
  public static get btnHeightSmall() {
    return this.controlHeightSmall;
  }
  public static get btnHeightMedium() {
    return this.controlHeightMedium;
  }
  public static get btnHeightLarge() {
    return this.controlHeightLarge;
  }
  public static get btnLinkColor() {
    return this.linkColor;
  }
  public static get btnLinkHoverColor() {
    return this.linkHoverColor;
  }
  public static get btnLinkHoverTextDecoration() {
    return this.linkHoverTextDecoration;
  }
  public static get btnLinkActiveColor() {
    return this.linkActiveColor;
  }
  public static get btnLinkIconMarginRight() {
    return this.linkIconMarginRight;
  }
  public static get btnErrorSecondary() {
    return this.errorSecondary;
  }
  public static get btnOutlineColorFocus() {
    return this.outlineColorFocus;
  }
  public static get btnBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get btnLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  //#endregion
  //#region Select
  public static sltPlaceholderColor = '#a0a0a0';
  public static get selectPlaceholderColor() {
    return this.sltPlaceholderColor;
  }
  public static selectBorderWidth = '1px';
  public static get selectOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get selectLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get selectFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static selectPaddingXSmall = '9px';
  public static get selectPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get selectBorderRadiusSmall() {
    return this.btnBorderRadiusSmall;
  }
  public static get selectIconGapSmall() {
    return this.btnIconGapSmall;
  }
  public static selectPaddingArrowSmall = '10px';
  public static get selectLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get selectFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static selectPaddingXMedium = '9px';
  public static get selectPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get selectBorderRadiusMedium() {
    return this.btnBorderRadiusMedium;
  }
  public static get selectIconGapMedium() {
    return this.btnIconGapMedium;
  }
  public static selectPaddingArrowMedium = '10px';
  public static get selectLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get selectFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static selectPaddingXLarge = '9px';
  public static get selectPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static get selectBorderRadiusLarge() {
    return this.btnBorderRadiusLarge;
  }
  public static get selectIconGapLarge() {
    return this.btnIconGapLarge;
  }
  public static selectPaddingArrowLarge = '13px';
  public static get selectMenuArrowColor() {
    return this.btnMenuArrowColor;
  }
  public static get selectIconSizeSmall() {
    return this.btnIconSizeSmall;
  }
  public static get selectIconSizeMedium() {
    return this.btnIconSizeMedium;
  }
  public static get selectIconSizeLarge() {
    return this.btnIconSizeLarge;
  }
  //#endregion
  //#region Tooltip
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.374)';
  public static tooltipCloseBtnHoverColor = 'rgba(0, 0, 0, 0.5)';
  //#endregion
  //#region Modal
  public static modalBackBg = '#333';
  public static modalBackOpacity = '0.6';
  public static modalCloseButtonColor = '#808080';
  public static modalCloseButtonDisabledColor = '#8b8b8b';
  public static modalCloseButtonHoverColor = '#333';
  public static modalFixedHeaderBg = '#fff';
  public static modalFixedHeaderShadow = '0 1px 10px #000000';
  public static modalFixedFooterShadow = '0 -1px 10px #000000';
  public static modalFooterBg = '#e9e9e9';
  public static modalAdaptiveThreshold = '425px';
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = '#e9e9e9';
  public static sidePageCloseButtonColor = 'rgba(0, 0, 0, 0.374)';
  public static sidePageCloseButtonHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static sidePageContainerShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
  //#endregion
  //#region DateInput
  public static dateInputIconColor = '#333';
  public static dateInputMaskColor = '#b8b8b8';
  public static dateInputComponentSelectedBgColor = '#cae0f4';
  //#endregion
  //#region Calendar
  public static calendarCellBg = 'white';
  public static calendarCellHoverColor = 'white';
  public static calendarCellActiveHoverColor = 'white';
  public static calendarCellWeekendColor = '#f00';
  public static calendarCellTodayBorder = '1px solid #8b8b8b';
  public static calendarCellSelectedBgColor = '#e9e9e9';
  public static calendarCellSelectedFontColor = 'inherit';
  public static calendarMonthHeaderStickedBgColor = 'white';
  public static calendarMonthTitleBorderBottomColor = '#dfdede';
  public static get calendarCellHoverBgColor() {
    return this.bgActive;
  }
  //#endregion
  //#region DatePicker
  public static dateSelectMenuItemBgSelected = '#ececec';
  public static datePickerOpenBtnColor = '#333';
  public static pickerBg = '#fff';
  public static pickerShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.2)';
  public static pickerTodayWrapperBgColor = 'white';
  public static pickerTodayWrapperBorderTop = '1px solid #dfdede';
  public static pickerTodayWrapperHoverBgColor = '#f5f5f5';
  //#endregion
  //#region DateSelect
  public static get dateSelectMenuBg() {
    return this.bgDefault;
  }
  public static get dateSelectMenuItemBgActive() {
    return this.bgActive;
  }
  public static get dateSelectMenuItemBgDisabled() {
    return this.bgDefault;
  }
  public static get dateSelectMenuItemFontActive() {
    return this.textColorInvert;
  }
  public static get dateSelectMenuItemFontSelected() {
    return this.textColorDefault;
  }
  public static get dateSelectMenuItemFontDisabled() {
    return this.textColorDisabled;
  }
  //#endregion
  //#region Paging
  public static pagingDotsColor = 'gray';
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.09)';
  public static pagingPageLinkActiveColor = 'black';
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.05)';
  public static pagingPageLinkHintColor = '#bbb';
  public static get pagingForwardLinkColor() {
    return this.linkColor;
  }
  public static get pagingForwardLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  //#endregion
  //#region Menu
  public static menuSeparatorBorderColor = '#e6e6e6';
  //#endregion
  //#region Toast
  public static toastBg = 'rgba(51, 51, 51, 0.8)';
  public static toastColor = 'white';
  public static toastLinkColor = '#80caff';
  public static toastCloseColor = '#a0a0a0';
  public static toastCloseHoverColor = 'white';
  //#endregion
  //#region TopBar
  public static tbBg = '#fff';
  public static tbShadow = '0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.1)';
  public static tdDividerBg = '#dfdfdf';
  //#endregion
  //#region Logotype
  public static logoColor = '#000';
  public static logoHoverColor = '#000';
  //#endregion
  //#region Menu
  public static menuItemPaddingForIcon = '36px';
  public static menuBorder = '1px solid #d5d5d5';
  public static menuShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
  //#endregion
  //#region Toggle
  public static toggleHandleActiveWidthIncrement = '4px';
  public static get toggleHandleBorderRadius() {
    const height = parseInt(this.toggleHeight, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static toggleHeight = '20px';
  public static toggleWidth = '34px';
  public static toggleBorderRadius = '10px';
  public static toggleBg = 'linear-gradient(-180deg, #fff, #ebebeb)';
  public static toggleBgDisabled = 'none';
  public static get toggleBgHover() {
    return this.toggleBgFocus;
  }
  public static toggleBgChecked = '#3072c4';
  public static toggleBorderWidth = '1px';
  public static toggleOutlineWidth = '3px';
  public static toggleBorderColor = '#d0d0d0';
  public static toggleBgFocus = 'linear-gradient(-180deg, #f1f1f1, #dedede)';
  public static get toggleBgActive() {
    return this.toggleBgChecked;
  }
  public static get toggleBgError() {
    return this.errorMain;
  }
  public static get toggleBgWarning() {
    return this.warningMain;
  }
  public static get toggleFocusShadowColor() {
    return this.borderColorFocus;
  }
  public static toggleCaptionGap = '10px';
  //#endregion
  //#region Popup
  public static popupBorder = 'none';
  public static popupBorderRadius = '2px';
  public static popupBorderColor = 'transparent';
  public static popupDropShadow = 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))';
  public static popupBoxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.2)';
  public static popupTextColor = 'inherit';
  public static get popupBackground() {
    return this.bgDefault;
  }
  public static popupPinOffset = '16px';
  public static popupMargin = '10px';
  public static popupPinSize = '8px';
  //#endregion
  //#region Input
  public static inputTextColor = 'none';
  public static get inputTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static inputShadow = 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)';
  public static inputBg = 'white';
  public static inputIconColor = '#a9a9a9';
  public static inputColor = 'inherit';
  public static inputWidth = '250px';
  public static get inputFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get inputFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get inputFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get inputLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get inputLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get inputLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get inputHeightSmall() {
    return this.controlHeightSmall;
  }
  public static get inputHeightMedium() {
    return this.controlHeightMedium;
  }
  public static get inputHeightLarge() {
    return this.controlHeightLarge;
  }
  public static get inputPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get inputPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get inputPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static inputPaddingXSmall = '10px';
  public static inputPaddingXMedium = '10px';
  public static inputPaddingXLarge = '10px';
  public static inputIconGapSmall = '2px';
  public static inputIconGapMedium = '2px';
  public static inputIconGapLarge = '2px';
  public static inputIconSizeSmall = 'auto';
  public static inputIconSizeMedium = 'auto';
  public static inputIconSizeLarge = 'auto';
  public static get inputFocusShadow() {
    return `0 0 0 ${this.inputOutlineWidth} ${this.borderColorFocus}`;
  }
  public static get inputDisabledBg() {
    return this.bgDisabled;
  }
  public static get inputDisabledBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get inputFocusOutline() {
    return this.borderColorFocus;
  }
  public static get inputBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get inputOutlineWidth() {
    const OutlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    return `${OutlineWidth - borderWidth}px`;
  }
  public static inputBorderRadiusSmall = '0';
  public static inputBorderRadiusMedium = '0';
  public static inputBorderRadiusLarge = '0';
  public static get inputBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get inputBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get inputBorderColorError() {
    return this.borderColorError;
  }
  public static get inputBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get inputBorderTopColor() {
    return this.borderColorGrayDark;
  }
  public static get inputPlaceholderColor() {
    return this.placeholderColor;
  }
  public static get inputPlaceholderColorLight() {
    return this.placeholderColorLight;
  }
  public static get inputBlinkColor() {
    return this.blinkColor;
  }
  //#endregion
  //#region Checkbox chb
  public static get chbFontSize() {
    return this.fontSizeSmall;
  }
  public static get chbLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static chbBoxSize = '16px';
  public static chbPaddingX = '10px';
  public static chbPaddingY = '0';
  public static chbBgStart = '#fdfdfd';
  public static chbBgEnd = '#ededed';
  public static get chbTextColorDefault() {
    return this.textColorDefault;
  }
  public static get chbTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static get chbIndeterminateBg() {
    return this.textColorDefault;
  }
  public static get chbShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static get chbShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static chbBorder = 'none';
  public static get chbShadowHover() {
    return this.chbShadow;
  }
  public static get chbCheckedColor() {
    return this.textColorDefault;
  }
  public static get chbOutlineColorFocus() {
    return this.outlineColorFocus;
  }
  public static get chbBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get chbBorderColorError() {
    return this.borderColorError;
  }
  public static get chbCheckedHoverShadow() {
    return this.chbShadow;
  }
  public static chbBorderRadius = '1px';
  public static chbShadowWidth = '2px';
  public static get chbCheckedShadow() {
    return this.chbShadow;
  }
  public static get chbBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get chbBg() {
    return `linear-gradient(${this.checkboxBgStart}, ${this.checkboxBgEnd})`;
  }
  public static get chbHoverBg() {
    return `linear-gradient(-180deg, ${this.btnDefaultHoverBgStart} 0, ${this.btnDefaultHoverBgEnd} 100%)`;
  }
  public static get chbActiveBg() {
    return this.btnDefaultActiveBg;
  }
  public static get chbCheckedBg() {
    return this.chbBg;
  }
  public static get chbBgDisabled() {
    return this.bgDisabled;
  }
  public static get chbBoxIndeterminateBg() {
    return this.chbBg;
  }
  public static get chbCheckedHoverBg() {
    return this.chbHoverBg;
  }
  public static get chbCheckedActiveBg() {
    return this.btnDefaultActiveBg;
  }
  public static get chbCheckedActiveShadow() {
    return this.btnDefaultActiveShadow;
  }
  public static get chbShadowActive() {
    return this.btnDefaultActiveShadow;
  }
  public static checkboxBorderWidthCompensation = '0px';
  //#endregion
  //#region Checkbox
  public static get checkboxFontSize() {
    return this.chbFontSize;
  }
  public static get checkboxLineHeight() {
    return this.chbLineHeight;
  }
  public static get checkboxBoxSize() {
    return this.chbBoxSize;
  }
  public static get checkboxLabelGap() {
    return this.chbPaddingX;
  }
  public static get checkboxPaddingY() {
    return this.chbPaddingY;
  }
  public static get checkboxBgStart() {
    return this.chbBgStart;
  }
  public static get checkboxBgEnd() {
    return this.chbBgEnd;
  }
  public static get checkboxTextColorDefault() {
    return this.chbTextColorDefault;
  }
  public static get checkboxTextColorDisabled() {
    return this.chbTextColorDisabled;
  }
  public static get checkboxIndeterminateBg() {
    return this.chbIndeterminateBg;
  }
  public static get checkboxShadowDisabled() {
    return this.chbShadowDisabled;
  }
  public static get checkboxBorder() {
    return this.chbBorder;
  }
  public static checkboxBorderWidth = '1px';
  public static get checkboxShadow() {
    return this.chbShadow;
  }
  public static get checkboxShadowHover() {
    return this.chbShadowHover;
  }
  public static get checkboxCheckedColor() {
    return this.chbCheckedColor;
  }
  public static get checkboxOutlineColorFocus() {
    return this.chbOutlineColorFocus;
  }
  public static get checkboxBorderColorWarning() {
    return this.chbBorderColorWarning;
  }
  public static get checkboxBorderColorError() {
    return this.chbBorderColorError;
  }
  public static get checkboxCheckedHoverShadow() {
    return this.chbCheckedHoverShadow;
  }
  public static get checkboxBorderRadius() {
    return this.chbBorderRadius;
  }
  public static get checkboxOutlineWidth() {
    return this.chbShadowWidth;
  }
  public static get checkboxCheckedShadow() {
    return this.chbCheckedShadow;
  }
  public static get checkboxCheckedActiveShadow() {
    return this.chbCheckedActiveShadow;
  }
  public static get checkboxBorderColorFocus() {
    return this.chbBorderColorFocus;
  }
  public static get checkboxBg() {
    return this.chbBg;
  }
  public static get checkboxHoverBg() {
    return this.chbHoverBg;
  }
  public static get checkboxActiveBg() {
    return this.chbActiveBg;
  }
  public static get checkboxCheckedBg() {
    return this.chbCheckedBg;
  }
  public static get checkboxBgDisabled() {
    return this.chbBgDisabled;
  }
  public static get checkboxBoxIndeterminateBg() {
    return this.chbBoxIndeterminateBg;
  }
  public static get checkboxCheckedHoverBg() {
    return this.chbCheckedHoverBg;
  }
  public static get checkboxCheckedActiveBg() {
    return this.chbCheckedActiveBg;
  }
  public static get checkboxShadowActive() {
    return this.chbShadowActive;
  }
  //#endregion
  //#region TextArea
  public static get textareaBg() {
    return this.bgDefault;
  }
  public static get textareaColor() {
    return this.black;
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
  public static textareaShadow = 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)';
  public static get textareaFontSize() {
    return this.fontSizeMedium;
  }
  public static get textareaLineHeight() {
    const fontSize = this.textareaFontSize;
    switch (fontSize) {
      case '14px':
        return '20px';
      case '16px':
        return '25px';
      default:
        return `${parseInt(fontSize, 10) * 1.5}px`;
    }
  }
  public static textareaBorderRadius = '0px';
  public static get textareaBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get textareaOutlineWidth() {
    return this.controlBorderWidth;
  }
  public static get textareaHeight() {
    const lineHeight = parseInt(this.textareaLineHeight, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingY, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;

    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }
  public static get textareaMinHeight() {
    return this.textareaHeight;
  }
  public static textareaWidth = '250px';
  public static get textareaPaddingX() {
    return '10px';
  }
  public static get textareaPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static get textareaBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get textareaBorderTopColor() {
    return this.borderColorGrayDark;
  }
  public static get textareaBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get textareaBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get textareaBorderColorError() {
    return this.borderColorError;
  }
  public static get textareaDisabledBg() {
    return this.bgDisabled;
  }
  public static get textareaDisabledBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get textareaCounterColor() {
    return this.gray;
  }
  public static get textareaCounterBg() {
    return ColorFunctions.fade(this.textareaBg, 0.9);
  }
  public static get textareaCounterErrorColor() {
    return this.errorText;
  }
  public static get textareaCounterHelpIconColor() {
    return this.linkColor;
  }
  //#endregion
  //#region Radio
  public static radioBulletSize = '8px';
  public static get radioOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static radioSize = '16px';
  public static get radioSizeAfter() {
    return `calc(${this.radioSize} + 2 * ${this.radioOutlineWidth} - 2 * ${this.radioBorderWidthCompensation})`;
  }
  public static get radioFontSize() {
    return this.fontSizeSmall;
  }
  public static get radioLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static radioLabelGap = '9px';
  public static radioPaddingY = '0';
  public static radioVerticalAlign = '-2px';
  public static radioBgImage = 'linear-gradient(-180deg, #fff 0, #ebebeb 100%)';
  public static radioHoverBg = 'linear-gradient(-180deg, #f2f2f2 0, #dfdfdf 100%)';
  public static radioActiveBg = 'linear-gradient(-180deg, #e1e1e1 0, #e1e1e1 100%)';
  public static radioBorderWidth = '1px';
  public static radioBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static get radioBoxShadow() {
    return `0 ${this.radioBorderWidth} 0 0 ${this.radioBorderColor}, 0 0 0 ${this.radioBorderWidth} ${this.radioBorderColor}`;
  }
  public static radioBorder = '0 none';
  public static get radioBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get radioBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get radioBorderColorError() {
    return this.borderColorError;
  }
  public static get radioHoverShadow() {
    return `0 ${this.radioBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.2)`;
  }
  public static get radioActiveShadow() {
    return `0 -${this.radioBorderWidth} 0 0 rgba(0, 0, 0, 0.1), 0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.2), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)`;
  }
  public static radioFocusShadow = 'none';
  public static radioCheckedBgColor = 'transparent';
  public static radioCheckedBulletColor = '#404040';
  public static get radioCheckedHoverBgColor() {
    return this.radioHoverBg;
  }
  public static get radioDisabledShadow() {
    return `0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static radioLabelDisplay = 'inline-table';
  public static radioBorderWidthCompensation = '0px';
  public static radioMarginY = '2px';
  //#endregion
  //#region RadioGroup
  public static radioGroupLegacyItemGap = '10px';
  //#endregion
  //#region Tabs
  public static get tabFontSize() {
    return '18px';
  }
  public static get tabPaddingX() {
    return '20px';
  }
  public static get tabsMarginX() {
    return this.tabPaddingX;
  }
  public static tabPaddingY = '10px';
  public static get tabLineHeight() {
    return 'normal';
  }
  public static tabBorderWidth = '3px';
  public static tabOutlineWidth = '2px';
  public static get tabTextColorDefault() {
    return this.textColorDefault;
  }
  public static get tabColorFocus() {
    return this.borderColorFocus;
  }
  public static get tabColorError() {
    return this.btnDangerBg;
  }
  public static get tabColorWarning() {
    return this.btnPayBg;
  }
  public static get tabColorSuccess() {
    return this.btnSuccessBg;
  }
  public static get tabColorPrimary() {
    return this.btnPrimaryBg;
  }
  public static get tabColorHover() {
    return this.borderColorFocusLight;
  }
  public static get tabColorHoverError() {
    return ColorFunctions.lighten(this.tabColorError, '25%');
  }
  public static get tabColorHoverWarning() {
    return ColorFunctions.lighten(this.tabColorWarning, '25%');
  }
  public static get tabColorHoverSuccess() {
    return ColorFunctions.lighten(this.tabColorSuccess, '25%');
  }
  public static get tabColorHoverPrimary() {
    return ColorFunctions.lighten(this.tabColorPrimary, '25%');
  }
  //#endregion
  //#region Spinner
  public static get spinnerBgColor() {
    return this.grayXLight;
  }
  public static get spinnerColor() {
    return this.red;
  }
  public static get spinnerDimmedColor() {
    return this.gray;
  }
  public static get spinnerCaptionColor() {
    return this.gray;
  }
  public static spinnerFontSizeSmall = '14px';
  public static spinnerFontSizeMedium = '16px';
  public static spinnerFontSizeLarge = '18px';
  public static spinnerLineHeightSmall = '1';
  public static spinnerLineHeightMedium = '1.375';
  public static spinnerLineHeightLarge = '1.33';
  public static spinnerCaptionGapSmall = '8px';
  public static spinnerCaptionGapMedium = '-6px';
  public static spinnerCaptionGapLarge = '-8px';
  //#endregion
  //#region SpinnerOld
  public static get spinnerOldBgColor() {
    return this.grayXLight;
  }
  public static get spinnerOldColor() {
    return this.red;
  }
  public static get spinnerOldDimmedColor() {
    return this.gray;
  }
  public static get spinnerOldCaptionColor() {
    return this.gray;
  }
  public static spinnerOldFontSizeSmall = '14px';
  public static spinnerOldFontSizeMedium = '14px';
  public static spinnerOldFontSizeLarge = '14px';
  public static spinnerOldLineHeightSmall = 'inherit';
  public static spinnerOldLineHeightMedium = 'inherit';
  public static spinnerOldLineHeightLarge = 'inherit';
  public static spinnerOldCaptionGapSmall = '5px';
  public static spinnerOldCaptionGapMedium = '0px';
  public static spinnerOldCaptionGapLarge = '0px';
  //#endregion
  //#region Switcher
  public static switcherOutlineWidth = '2px';
  public static switcherLabelFontSizeSmall = 'inherit';
  public static switcherLabelFontSizeMedium = 'inherit';
  public static switcherLabelFontSizeLarge = 'inherit';
  public static switcherLabelLineHeightSmall = 'inherit';
  public static switcherLabelLineHeightMedium = 'inherit';
  public static switcherLabelLineHeightLarge = 'inherit';
  public static switcherLabelGapSmall = '15px';
  public static switcherLabelGapMedium = '15px';
  public static switcherLabelGapLarge = '15px';
  public static get switcherButtonPaddingXSmall() {
    return this.btnPaddingXSmall;
  }
  public static get switcherButtonPaddingXMedium() {
    return this.btnPaddingXMedium;
  }
  public static get switcherButtonPaddingXLarge() {
    return this.btnPaddingXLarge;
  }
  public static get switcherButtonPaddingYSmall() {
    return this.btnPaddingYSmall;
  }
  public static get switcherButtonPaddingYMedium() {
    return this.btnPaddingYMedium;
  }
  public static get switcherButtonPaddingYLarge() {
    return this.btnPaddingYLarge;
  }
  public static get switcherButtonLineHeightSmall() {
    return this.btnLineHeightSmall;
  }
  public static get switcherButtonLineHeightMedium() {
    return this.btnLineHeightMedium;
  }
  public static get switcherButtonLineHeightLarge() {
    return this.btnLineHeightLarge;
  }
  public static get switcherButtonFontSizeSmall() {
    return this.btnFontSizeSmall;
  }
  public static get switcherButtonFontSizeMedium() {
    return this.btnFontSizeMedium;
  }
  public static get switcherButtonFontSizeLarge() {
    return this.btnFontSizeLarge;
  }
  public static get switcherButtonBorderRadiusSmall() {
    return this.btnBorderRadiusSmall;
  }
  public static get switcherButtonBorderRadiusMedium() {
    return this.btnBorderRadiusMedium;
  }
  public static get switcherButtonBorderRadiusLarge() {
    return this.btnBorderRadiusLarge;
  }
  public static get switcherButtonBorderWidth() {
    return this.btnBorderWidth;
  }
  public static get switcherButtonDisabledBorderColor() {
    return this.btnDisabledBorderColor;
  }
  public static get switcherButtonCheckedDisabledShadow() {
    return this.btnCheckedDisabledShadow;
  }
  //#endregion
}

export const DefaultThemeInternal = exposeGetters(markAsFullTheme(DefaultTheme));
