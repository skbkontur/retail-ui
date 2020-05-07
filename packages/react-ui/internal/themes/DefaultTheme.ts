import * as ColorFunctions from '../../lib/styles/ColorFunctions';

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
  public static tokenMargin = '3px';
  public static tokenLineHeight = '1.5';
  public static tokenPaddingX = '4px';
  public static tokenMarginBeforeIcon = '4px';
  public static tokenBorderRadius = '1px';
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
  //#endregion
  //#region Loader
  public static loaderBg = 'rgba(255, 255, 255, 0.8)';
  public static loaderOpacity = '0.8';
  //#endregion
  //#region Button
  public static btnWrapPadding = '1px';
  public static btnHeightShift = '-2';
  public static btnLinkBorderRadius = '1px';
  public static btnFocusShadowWidth = '2px';
  public static btnFocusBorder = 'none';
  public static btnDisabledTextColor = '#a0a0a0';
  public static btnCheckedBg = '#737373';
  public static btnCheckedHoverBorderColor = 'transparent';
  public static btnCheckedTextColor = '#fff';
  public static btnCheckedShadow = '0 0 0 1px rgba(0, 0, 0, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)';
  public static btnCheckedShadowColorArrow = 'rgba(0, 0, 0, 0.3)';
  public static btnCheckedShadowArrow = '1px -1px 0 0 rgba(0, 0, 0, 0.6), inset 0 4px 2px -3px rgba(0, 0, 0, 0.3)';
  public static btnCheckedShadowArrowLeft = '1px -1px 0 0 rgba(0, 0, 0, 0.6), inset -4px 0 2px -3px rgba(0, 0, 0, 0.3)';
  public static btnBorderRadius = '2px';
  public static btnArrowBorderRadius = '2px 2px 2px 16px';
  public static btnSmallBorderRadius = '1px';
  public static btnPaddingXSmall = '15px';
  public static btnPaddingXMedium = '15px';
  public static btnPaddingXLarge = '20px';
  public static btnDefaultBg = 'none';
  public static btnDefaultBgStart = '#fff';
  public static btnDefaultBgEnd = '#ebebeb';
  public static btnSmallArrowLength = '18px';
  public static btnSmallArrowRight = '-8.8px';
  public static btnSmallArrowLeft = '-8px';
  public static btnSmallArrowBorderRadius = '2px 2px 2px 16px';
  public static btnMediumArrowLeft = '-9.8px';
  public static btnMediumArrowLeftLoadingLeft = '-208px';
  public static btnMediumArrowTransform = 'rotate(53deg) skewX(24deg) skewY(8deg)';
  public static btnDeprecatedSizeMediumFontSize = '16px';
  public static btnDeprecatedSizeMediumPaddingShift = '1';
  public static btnLargeArrowLeft = '-10px';
  public static btnLargeArrowTransform = 'rotate(53deg) skewX(25deg) skewY(10deg)';
  public static btnLargeArrowBg = 'linear-gradient(-56deg, transparent 48.2%, #ccc 0, #ccc 63.4%, transparent 0)';
  public static btnDefaultBgArrowStart = '#fff';
  public static btnDefaultBgArrowEnd = '#ebebeb';
  public static btnDefaultCheckedShadowArrow = 'none';
  public static btnDefaultCheckedBorder = 'none';
  public static btnDefaultTextColor = 'none';
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultHoverBorderColor = 'transparent';
  public static btnDefaultActiveBorderColor = 'none';
  public static btnDefaultBorder = 'none';
  public static btnDefaultShadow = '0 1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.15)';
  public static btnDefaultShadowArrow = '1.2px -1px 0 0 rgba(0, 0, 0, 0.15), 1px 0 0 0 rgba(0, 0, 0, 0.15)';
  public static btnDefaultShadowArrowLeft = '1px -1px 0 0 rgba(0, 0, 0, 0.15), 0 -1px 0 0 rgba(0, 0, 0, 0.15)';
  public static btnDefaultHoverBgStart = '#f2f2f2';
  public static btnDefaultHoverBgEnd = '#dfdfdf';
  public static btnDefaultHoverShadow = '0 1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.2)';
  public static btnDefaultHoverShadowArrow = '1px -1px 0 0 rgba(0, 0, 0, 0.15), 1px 0 0 0 rgba(0, 0, 0, 0.2)';
  public static btnDefaultHoverShadowArrowLeft = '1px -1px 0 0 rgba(0, 0, 0, 0.15), 0 -1px 0 0 rgba(0, 0, 0, 0.2)';
  public static btnDefaultActiveBg = '#e1e1e1';
  public static btnDefaultActiveShadow =
    '0 -1px 0 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.2), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnDefaultActiveShadowArrow =
    '0 -2px 0 -1px rgba(0, 0, 0, 0.1), 1px -1px 0 0 rgba(0, 0, 0, 0.2), inset 0 4px 5px -4px rgba(0, 0, 0, 0.1)';
  public static btnDefaultActiveShadowArrowLeft =
    '0 -1px 0 0 rgba(0, 0, 0, 0.1), 1px -0.3px 0 0 rgba(0, 0, 0, 0.2), inset -4px 0 5px -4px rgba(0, 0, 0, 0.2)';
  public static btnSuccessBg = '#419d14';
  public static btnSuccessHoverBg = 'none';
  public static btnSuccessHoverBorderColor = 'transparent';
  public static btnSuccessDisabledBg = 'none';
  public static btnSuccessBorder = 'none';
  public static btnSuccessBgStart = '#4ba91d';
  public static btnSuccessBgEnd = '#37910b';
  public static btnSuccessBgArrowStart = '#4ba91d';
  public static btnSuccessBgArrowEnd = '#37910b';
  public static btnSuccessTextColor = '#fff';
  public static btnSuccessShadow = '0 0 0 1px rgba(25, 103, 6, 0.7), 0 1px 0 0 rgba(21, 80, 7, 0.5)';
  public static btnSuccessShadowArrow = '1px -1px 0 0 rgba(25, 103, 6, 0.7), 1px 0 0 0 rgba(21, 80, 7, 0.5)';
  public static btnSuccessShadowArrowLeft = '1px -1px 0 0 rgba(25, 103, 6, 0.7), 0 -1px 0 0 rgba(21, 80, 7, 0.5)';
  public static btnSuccessHoverBgStart = '#3b8d13';
  public static btnSuccessHoverBgEnd = '#317e0b';
  public static btnSuccessHoverShadow = '0 0 0 1px rgba(7, 73, 1, 0.7), 0 1px 0 0 rgba(16, 70, 4, 0.3)';
  public static btnSuccessHoverShadowArrow = '1px -1px 0 0 rgba(7, 73, 1, 0.7), 1px 0 0 0 rgba(16, 70, 4, 0.3)';
  public static btnSuccessHoverShadowArrowLeft = '1px -1px 0 0 rgba(7, 73, 1, 0.7), 0 -1px 0 0 rgba(16, 70, 4, 0.3)';
  public static btnSuccessActiveBg = '#35840e';
  public static btnSuccessActiveShadow =
    '0 0 0 1px rgba(4, 63, 0, 0.75), 0 -1px 0 0 rgba(9, 32, 4, 0.6), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnSuccessActiveShadowArrow =
    '1px -1px 0 0 rgba(4, 63, 0, 0.75), 0 -2px 0 -1px rgba(9, 32, 4, 0.6), inset 0 4px 5px -4px rgba(0, 0, 0, 0.1)';
  public static btnSuccessActiveShadowArrowLeft =
    '1px -1px 0 0 rgba(4, 63, 0, 0.75), 0 0 0 -1px rgba(9, 32, 4, 0.6), inset -4px 0 5px -4px rgba(0, 0, 0, 0.2)';
  public static btnPrimaryBg = '#1e8dd4';
  public static btnPrimaryHoverBg = 'none';
  public static btnPrimaryHoverBorderColor = 'transparent';
  public static btnPrimaryDisabledBg = 'none';
  public static btnPrimaryBorder = 'none';
  public static btnPrimaryBgStart = '#2899ea';
  public static btnPrimaryBgEnd = '#167ac1';
  public static btnPrimaryBgArrowStart = '#2899ea';
  public static btnPrimaryBgArrowEnd = '#167ac1';
  public static btnPrimaryTextColor = '#fff';
  public static btnPrimaryShadow = '0 0 0 1px rgba(14, 81, 129, 0.7), 0 1px 0 0 rgba(7, 37, 80, 0.5)';
  public static btnPrimaryShadowArrow = '1px -1px 0 0 rgba(14, 81, 129, 0.7), 1px 0 0 0 rgba(7, 37, 80, 0.5)';
  public static btnPrimaryShadowArrowLeft = '1px -1px 0 0 rgba(14, 81, 129, 0.7), 0 -1px 0 0 rgba(7, 37, 80, 0.5)';
  public static btnPrimaryHoverBgStart = '#0087d5';
  public static btnPrimaryHoverBgEnd = '#167ac1';
  public static btnPrimaryHoverShadow = '0 0 0 1px rgba(5, 60, 99, 0.7), 0 1px 0 0 rgba(7, 37, 80, 0.3)';
  public static btnPrimaryHoverShadowArrow = '1px -1px 0 0 rgba(5, 60, 99, 0.7), 1px 0 0 0 rgba(7, 37, 80, 0.3)';
  public static btnPrimaryHoverShadowArrowLeft = '1px -1px 0 0 rgba(5, 60, 99, 0.7), 0 -1px 0 0 rgba(7, 37, 80, 0.3)';
  public static btnPrimaryActiveBg = '#0079c3';
  public static btnPrimaryActiveShadow =
    '0 0 0 1px rgba(10, 63, 99, 0.75), 0 -1px 0 0 rgba(8, 45, 96, 0.5), inset 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
  public static btnPrimaryActiveShadowArrow =
    '1px -1px 0 0 rgba(10, 63, 99, 0.75), 0 -2px 0 -1px rgba(8, 45, 96, 0.5), inset 0 4px 5px -4px rgba(0, 0, 0, 0.2)';
  public static btnPrimaryActiveShadowArrowLeft =
    '1px -1px 0 0 rgba(10, 63, 99, 0.75), 0 0 0 -1px rgba(8, 45, 96, 0.5), inset -4px 0 5px -4px rgba(0, 0, 0, 0.2)';
  public static btnDangerBg = '#e14c30';
  public static btnDangerHoverBg = 'none';
  public static btnDangerHoverBorderColor = 'transparent';
  public static btnDangerDisabledBg = 'none';
  public static btnDangerBorder = 'none';
  public static btnDangerBgStart = '#ec5438';
  public static btnDangerBgEnd = '#d44327';
  public static btnDangerBgArrowStart = '#ec5438';
  public static btnDangerBgArrowEnd = '#d44327';
  public static btnDangerTextColor = '#fff';
  public static btnDangerShadow = '0 0 0 1px rgba(173, 15, 0, 0.7), 0 1px 0 0 rgba(0, 0, 0, 0.4)';
  public static btnDangerShadowArrow = '1px -1px 0 0 rgba(173, 15, 0, 0.7), 1px 0 0 0 rgba(0, 0, 0, 0.4)';
  public static btnDangerShadowArrowLeft = '1px -1px 0 0 rgba(173, 15, 0, 0.7), 0 -1px 0 0 rgba(0, 0, 0, 0.4)';
  public static btnDangerHoverBgStart = '#d44227';
  public static btnDangerHoverBgEnd = '#c73013';
  public static btnDangerHoverShadow = '0 0 0 1px rgba(145, 0, 0, 0.7), 0 1px 0 0 rgba(90, 3, 3, 0.4)';
  public static btnDangerHoverShadowArrow = '1px -1px 0 0 rgba(145, 0, 0, 0.7), 1px 0 0 0 rgba(90, 3, 3, 0.4)';
  public static btnDangerHoverShadowArrowLeft = '1px -1px 0 0 rgba(145, 0, 0, 0.7), 0 -1px 0 0 rgba(90, 3, 3, 0.4)';
  public static btnDangerActiveBg = '#cd381b';
  public static btnDangerActiveShadow =
    '0 0 0 1px rgba(108, 7, 7, 0.75), 0 -1px 0 0 rgba(90, 3, 3, 0.4), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnDangerActiveShadowArrow =
    '1px -1px 0 0 rgba(108, 7, 7, 0.75), 0 -2px 0 -1px rgba(90, 3, 3, 0.4), inset 0 4px 5px -4px rgba(0, 0, 0, 0.1)';
  public static btnDangerActiveShadowArrowLeft =
    '1px -1px 0 0 rgba(108, 7, 7, 0.75), 0 0 0 -1px rgba(90, 3, 3, 0.4), inset -4px 0 5px -4px rgba(0, 0, 0, 0.1)';
  public static btnPayBg = '#ffc943';
  public static btnPayHoverBg = 'none';
  public static btnPayHoverBorderColor = 'transparent';
  public static btnPayDisabledBg = 'none';
  public static btnPayBorder = 'none';
  public static btnPayBgStart = '#ffd54b';
  public static btnPayBgEnd = '#ffbb39';
  public static btnPayBgArrowStart = '#ffd54b';
  public static btnPayBgArrowEnd = '#ffbb39';
  public static btnPayTextColor = 'none';
  public static btnPayShadow = '0 0 0 1px rgba(238, 169, 34, 0.7), 0 1px 0 0 rgba(77, 16, 0, 0.56)';
  public static btnPayShadowArrow = '1px -1px 0 0 rgba(238, 169, 34, 0.7), 1px -0.3px 0 0 rgba(77, 16, 0, 0.56)';
  public static btnPayShadowArrowLeft =
    '1px -1px 0 0 rgba(238, 169, 34, 0.7), 0.2px -1px 0 -0.3px rgba(77, 16, 0, 0.56)';
  public static btnPayHoverBgStart = '#ffbd3a';
  public static btnPayHoverBgEnd = '#f8a91d';
  public static btnPayHoverShadow = '0 0 0 1px rgba(227, 142, 8, 0.7), 0 1px 0 0 rgba(93, 20, 3, 0.4)';
  public static btnPayHoverShadowArrow = '1px -1px 0 0 rgba(227, 142, 8, 0.7), 1px -0.3px 0 0 rgba(93, 20, 3, 0.4)';
  public static btnPayHoverShadowArrowLeft = '1px -1px 0 0 rgba(227, 142, 8, 0.7), 0 -1px 0 0 rgba(93, 20, 3, 0.4)';
  public static btnPayActiveBg = '#fbb028';
  public static btnPayActiveShadow =
    '0 0 0 1px rgba(210, 144, 0, 0.7), 0 -1px 0 0 rgba(0, 0, 0, 0.44), inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)';
  public static btnPayActiveShadowArrow =
    '1px -1px 0 0 rgba(210, 144, 0, 0.7), 0 -2px 0 -1px rgba(0, 0, 0, 0.44), inset 0 4px 5px -4px rgba(0, 0, 0, 0.05)';
  public static btnPayActiveShadowArrowLeft =
    '1px -1px 0 0 rgba(210, 144, 0, 0.7), 2px -0.3px 0 -1px rgba(0, 0, 0, 0.44), inset -4px 0 5px -4px rgba(0, 0, 0, 0.05)';
  public static btnDeprecatedSizeMediumPaddingShiftIe = '1';
  public static btnSmallArrowTop = '7px';
  public static btnSmallArrowLeftLoadingDelay = '0.23s';
  public static btnSmallArrowBg = 'linear-gradient(-54deg, transparent 48%, #ccc 0, #ccc 72%, transparent 0)';
  public static btnMediumArrowRight = '-10px';
  public static btnMediumArrowBg = 'linear-gradient(-58deg, transparent 47.5%, #ccc 0, #ccc 70.5%, transparent 0)';
  public static btnMediumArrowLeftLoadingDelay = '0.2s';
  public static btnLargeArrowLeftLoadingDelay = '0s';
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
    return `0 0 0 1px ${this.btnDisabledShadowColor}`;
  }
  public static get btnDisabledShadowArrow() {
    return `1px -1px 0 0 ${this.btnDisabledShadowColor}`;
  }
  //#endregion
  //#region Select
  public static sltPlaceholderColor = '#a0a0a0';
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
  public static get toggleSwitcherSize() {
    return `calc(${this.toggleHeight} - 2 * ${this.toggleBorderWidth})`;
  }
  public static toggleSwitcherBorderRadius = '9px';
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
  public static inputPaddingX = '10px';
  public static inputPaddingBetweenIcon = '2px';
  public static get inputFocusShadow() {
    return `0 0 0 ${this.inputBorderWidth} ${this.borderColorFocus}`;
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
  public static chbIndeterminateBorderRadius = '1px';
  public static chbShadow = '0 0 0 1px rgba(0, 0, 0, 0.15)';
  public static chbShadowDisabled = '0 0 0 1px rgba(0, 0, 0, 0.15)';
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
    return `linear-gradient(${this.chbBgStart}, ${this.chbBgEnd})`;
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
    return this.chbBg;
  }
  public static get chbShadowActive() {
    return this.btnDefaultActiveShadow;
  }
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
  public static get checkboxPaddingX() {
    return this.chbPaddingX;
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
  public static get checkboxIndeterminateBorderRadius() {
    return this.chbIndeterminateBorderRadius;
  }
  public static get checkboxShadow() {
    return this.chbShadow;
  }
  public static get checkboxShadowDisabled() {
    return this.chbShadowDisabled;
  }
  public static get checkboxBorder() {
    return this.chbBorder;
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
  public static get checkboxShadowWidth() {
    return this.chbShadowWidth;
  }
  public static get checkboxCheckedShadow() {
    return this.chbCheckedShadow;
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
  public static textareaBg = 'none';
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
  public static get textareaFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get textareaLineHeight() {
    const fontSize = this.textareaFontSizeMedium;
    switch (fontSize) {
      case '14px':
        return '20px';
      case '16px':
        return '25px';
      default:
        return `${parseInt(fontSize, 10) * 1.5}px`;
    }
  }
  public static get textareaHeightSmall() {
    return this.controlHeightSmall;
  }
  public static get textareaPaddingX() {
    return '10px';
  }
  public static get textareaPaddingY() {
    return '6px';
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
  //#endregion
  //#region Radio
  public static radioBulletSize = '8px';
  public static radioBorderWidthFocus = '2px';
  public static get radioSize() {
    return this.radioFontSize;
  }
  public static get radioSizeAfter() {
    return `calc(${this.radioSize} + 2 * ${this.radioBorderWidthFocus})`;
  }
  public static get radioFontSize() {
    return this.fontSizeLarge;
  }
  public static get radioLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static radioPaddingX = '9px';
  public static radioVerticalAlign = '-2px';
  public static radioBgImage = 'linear-gradient(-180deg, #fff 0, #ebebeb 100%)';
  public static radioHoverBg = 'linear-gradient(-180deg, #f2f2f2 0, #dfdfdf 100%)';
  public static radioActiveBg = 'linear-gradient(-180deg, #e1e1e1 0, #e1e1e1 100%)';
  public static radioBoxShadow = '0 1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.15)';
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
  public static radioHoverShadow = '0 1px 0 0 rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.2)';
  public static radioActiveShadow =
    '0 -1px 0 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.2), inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static radioFocusShadow = 'none';
  public static radioCheckedBgColor = 'transparent';
  public static radioCheckedBulletColor = '#404040';
  public static radioDisabledShadow = '0 0 0 1px rgba(0, 0, 0, 0.15)';
  public static radioLabelDisplay = 'inline-table';
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
  public static tabBorderWidthFocus = '2px';
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
  public static get spinnerFontSizeSmall() {
    return '14px';
  }
  public static get spinnerFontSizeMedium() {
    return '16px';
  }
  public static get spinnerFontSizeLarge() {
    return '18px';
  }
  public static get spinnerLineHeightSmall() {
    return '1';
  }
  public static get spinnerLineHeightMedium() {
    return '1.375';
  }
  public static get spinnerLineHeightLarge() {
    return '1.33';
  }
  public static get spinnerPaddingXSmall() {
    return '8px';
  }
  public static get spinnerPaddingYMedium() {
    return '-6px';
  }
  public static get spinnerPaddingYLarge() {
    return '-8px';
  }
  //#endregion
}

export const DefaultThemeInternal = DefaultTheme;
