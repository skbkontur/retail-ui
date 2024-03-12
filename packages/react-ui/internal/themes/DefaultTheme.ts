import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters } from '../../lib/theming/ThemeHelpers';

export class DefaultTheme {
  //#region Common variables
  public static fontFamilyCompensationBaseline = '0px'; // deprecated
  public static labGrotesqueBaselineCompensation = '1';
  public static brandXLight = '#cae5f5';
  public static brandLight = '#3094d0';
  public static brand = '#2291ff';
  public static brandDark = '#1363a0';
  public static brandXDark = '#084f85';
  public static white = '#fff';
  public static grayXxLight = '#f2f2f2';
  public static grayXLight = '#ebebeb';
  public static grayLight = '#a0a0a0';
  public static gray = '#858585';
  public static grayDark = '#333';
  public static black = '#000';
  public static blueXxLight = '#cdedff';
  public static blueLight = '#1f87ef';
  public static blue = '#1874cf';
  public static blueDark = '#1874cf';
  public static blueXDark = '#044785';
  public static greenXxLight = '#d7f8ae';
  public static green = '#538a1b';
  public static greenDark = '#477916';
  public static redXxLight = '#ffddd6';
  public static red = '#dd473b';
  public static redDark = '#cb3d35';
  public static yellowXxLight = '#ffeec2';
  public static yellow = '#fcb73e';
  public static yellowDark = '#ef8b17';
  public static bgDefault = '#fff';
  public static get bgSecondary() {
    return this.bgDefault;
  }
  public static bgDisabled = '#f6f6f6';
  public static errorMain = '#dd473b';
  public static errorSecondary = '#ffd6d6';
  public static errorText = '#cb3d35';
  public static warningMain = '#fcb73e';
  public static warningSecondary = '#fff0bc';
  public static warningText = '#d97e00';
  public static borderColorFocusLight = '#cdedff';
  public static borderColorGrayDark = 'rgba(0, 0, 0, 0.28)';
  public static borderColorGrayLight = 'rgba(0, 0, 0, 0.16)';
  public static get borderColorDisabled() {
    return this.bgDisabled;
  }
  public static placeholderColor = '#adadad';
  public static outlineColorFocus = '#fff';
  public static placeholderColorLight = '#cdcdcd';
  public static blinkColor = 'rgba(0, 136, 255, 0.2)';
  public static controlBorderWidth = '1px';
  public static controlOutlineWidth = '2px';
  public static controlLineHeightSmall = '20px';
  public static controlLineHeightMedium = '22px';
  public static controlLineHeightLarge = '24px';
  public static controlPaddingYSmall = '5px';
  public static controlPaddingYMedium = '8px';
  public static controlPaddingYLarge = '11px';
  public static textColorDefault = '#222222';
  public static textColorInvert = '#fff';
  public static textColorDisabled = '#adadad';
  public static textColorDisabledContrast = '#858585';
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '16px';
  public static fontSizeLarge = '18px';
  public static fontSizeMobile = '18px';
  public static lineHeightMobile = '24px';
  public static specificityLevel = '0';
  public static fixedPanelShadow = '0 0 16px 1px rgba(0, 0, 0, 0.3)';
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
  public static controlHeightSmall = '32px';
  public static controlHeightMedium = '40px';
  public static controlHeightLarge = '48px';
  public static mobileMediaQuery = '(max-width: 576px) and (hover: none) and (pointer: coarse)';

  public static transitionDuration = '100ms';
  public static transitionTimingFunction = 'cubic-bezier(0.5, 1, 0.89, 1)';

  //#endregion
  //#region Link
  public static linkColor = '#1874cf';
  public static linkActiveColor = '#1260ae';
  public static linkHoverTextDecoration = 'underline';
  public static linkSuccessColor = '#477916';
  public static linkSuccessHoverColor = '#477916';
  public static linkSuccessActiveColor = '#325a0c';
  public static linkDangerColor = '#cb3d35';
  public static linkDangerHoverColor = '#cb3d35';
  public static linkDangerActiveColor = '#a92a27';
  public static linkIconMarginRight = '4px';
  public static linkIconMarginLeft = '4px';
  public static get linkHoverColor() {
    return this.linkColor;
  }
  public static get linkDisabledColor() {
    return this.textColorDisabled;
  }
  public static get linkGrayedColor() {
    return this.textColorDisabled;
  }
  public static get linkGrayedHoverColor() {
    return this.textColorDisabled;
  }
  public static get linkGrayedActiveColor() {
    return this.textColorDisabled;
  }
  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';

  public static linkLineBorderBottomStyle = '';
  public static get linkLineHoverBorderBottomStyle() {
    return this.linkLineBorderBottomStyle;
  }
  public static linkLineBorderBottomWidth = '0px';
  public static linkLineBorderBottomOpacity = '0.5';
  public static linkLineBorderBottomColor = `color-mix(in srgb, currentColor ${
    parseFloat(this.linkLineBorderBottomOpacity) * 100
  }%, transparent)`;

  //#endregion
  //#region Token
  public static tokenDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static get tokenTextColorDisabled() {
    return this.textColorDisabledContrast;
  }
  public static get tokenFontSize() {
    return this.fontSizeSmall;
  }
  public static tokenMarginY = '2px';
  public static tokenMarginX = '4px';
  public static get tokenLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static tokenPaddingY = '1px';
  public static tokenPaddingX = '3px';
  public static tokenMarginBeforeIcon = '4px';
  public static tokenRemoveIconSize = '8px';
  public static tokenRemoveIconPaddingY = '4px';
  public static tokenRemoveIconPaddingX = '4px';
  public static tokenRemoveIconGap = '4px';
  public static tokenRemoveIconBoxSizing = 'content-box';
  public static tokenBorderRadius = '1px';
  public static tokenBorderWidth = '1px';
  public static tokenBorderColorDisabled = 'transparent';
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
  public static tokenLegacyTextShift = '0px';
  public static get tokenPaddingYDisabled() {
    return this.tokenPaddingY;
  }
  public static get tokenPaddingXDisabled() {
    return this.tokenPaddingX;
  }
  public static get tokenMarginYDisabled() {
    return this.tokenMarginY;
  }
  public static get tokenMarginXDisabled() {
    return this.tokenMarginX;
  }
  public static get tokenShadowDisabled() {
    return `0 0 0 ${this.tokenBorderWidth} ${this.borderColorDisabled}`;
  }

  public static tokenDefaultIdleBg = '';
  public static tokenDefaultIdleColor = '';
  public static tokenDefaultIdleBorderColor = '';
  public static tokenDefaultIdleBgHover = '';
  public static tokenDefaultIdleColorHover = '';
  public static tokenDefaultIdleBorderColorHover = '';
  public static tokenDefaultActiveBg = '';
  public static tokenDefaultActiveColor = '';
  public static tokenDefaultActiveBorderColor = '';
  //#endregion
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
  public static tokenInputBorderRadius = '0px';
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
  public static get tokenInputMenuPopupBg() {
    return this.bgSecondary;
  }
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
  public static loaderBorderRadius = '0px';
  //#endregion
  //#region Button
  public static btnBackgroundClip = 'padding-box';
  public static btnArrowBgImageActive = 'none';
  public static btnArrowBgImageChecked = 'none';
  public static btnLinkBorderRadius = '2px';
  public static btnFocusShadowWidth = '2px';
  public static btnBorderColorTransition = '';
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.05)';
  public static btnCheckedBg = '#7e7e7e';
  public static btnCheckedDisabledBg = '#a0a0a0';
  public static btnCheckedDisabledColor = 'rgba(255, 255, 255, 0.7)';
  public static btnCheckedTextColor = '#fff';
  public static get btnCheckedDisabledBorderColor() {
    return this.btnCheckedDisabledBg;
  }
  public static btnCheckedShadow = 'none';
  public static btnCheckedDisabledShadow = 'none';
  public static btnBorderRadiusSmall = '1px';
  public static btnBorderRadiusMedium = '1px';
  public static btnBorderRadiusLarge = '1px';
  public static get btnBorderWidth() {
    return this.controlBorderWidth;
  }
  public static btnInsetWidth = '1px';
  public static get btnOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static btnPaddingXSmall = '15px';
  public static btnPaddingXMedium = '15px';
  public static btnPaddingXLarge = '19px';
  /**
   * @deprecated use btnIconGapSmallLeft
   */
  public static btnIconGapSmall = '4px';
  public static get btnIconGapSmallLeft() {
    return this.btnIconGapSmall;
  }
  public static btnIconGapSmallRight = '4px';
  /**
   * @deprecated use btnIconGapMediumLeft
   */
  public static btnIconGapMedium = '4px';
  public static get btnIconGapMediumLeft() {
    return this.btnIconGapMedium;
  }
  public static btnIconGapMediumRight = '4px';
  /**
   * @deprecated use btnIconGapLargeLeft
   */
  public static btnIconGapLarge = '4px';
  public static get btnIconGapLargeLeft() {
    return this.btnIconGapLarge;
  }
  public static btnIconGapLargeRight = '4px';
  public static btnIconSizeSmall = '16px';
  public static btnIconSizeMedium = '18px';
  public static btnIconSizeLarge = '20px';
  public static btnDefaultBg = '#fff';
  public static btnDefaultBgStart = 'none';
  public static btnDefaultBgEnd = 'none';
  public static get btnDefaultCheckedBorderColor() {
    return this.btnCheckedBg;
  }
  public static get btnDefaultTextColor() {
    return this.textColorDefault;
  }
  public static btnDefaultHoverBg = '#f2f2f2';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#ebebeb';
  public static btnDefaultHoverBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultHoverBorderBottomColor = '';
  public static btnDefaultHoverTextColor = '';
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultActiveBorderTopColor = '';
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultBorderBottomColor = '';
  public static btnDefaultActiveShadow = 'none';
  public static btnSuccessBg = '#538a1b';
  public static btnSuccessHoverBg = '#477916';
  public static btnSuccessHoverBorderColor = '#477916';
  public static btnSuccessHoverBorderBottomColor = '';
  public static btnSuccessHoverTextColor = '';
  public static btnSuccessBorderColor = '#538a1b';
  public static btnSuccessBorderBottomColor = '';
  public static btnSuccessBgStart = 'none';
  public static btnSuccessBgEnd = 'none';
  public static btnSuccessTextColor = '#fff';
  public static btnSuccessHoverBgStart = 'none';
  public static btnSuccessHoverBgEnd = 'none';
  public static btnSuccessActiveBg = '#3a6710';
  public static btnSuccessActiveBorderColor = '#3a6710';
  public static btnSuccessActiveBorderTopColor = '';
  public static btnSuccessActiveShadow = 'none';
  public static btnPrimaryBg = '#1c7edf';
  public static btnPrimaryHoverBg = '#1874cf';
  public static btnPrimaryHoverBorderColor = '#1874cf';
  public static btnPrimaryHoverBorderBottomColor = '';
  public static btnPrimaryHoverTextColor = '';
  public static btnPrimaryBorderColor = '#1c7edf';
  public static btnPrimaryBorderBottomColor = '';
  public static btnPrimaryBgStart = 'none';
  public static btnPrimaryBgEnd = 'none';
  public static btnPrimaryTextColor = '#fff';
  public static btnPrimaryHoverBgStart = 'none';
  public static btnPrimaryHoverBgEnd = 'none';
  public static btnPrimaryActiveBg = '#156abe';
  public static btnPrimaryActiveBorderColor = '#156abe';
  public static btnPrimaryActiveBorderTopColor = '';
  public static btnPrimaryActiveShadow = 'none';
  public static btnDangerBg = '#dd473b';
  public static btnDangerHoverBg = '#cb3d35';
  public static btnDangerHoverBorderColor = '#cb3d35';
  public static btnDangerHoverBorderBottomColor = '';
  public static btnDangerHoverTextColor = '';
  public static btnDangerBorderColor = '#dd473b';
  public static btnDangerBorderBottomColor = '';
  public static btnDangerBgStart = 'none';
  public static btnDangerBgEnd = 'none';
  public static btnDangerTextColor = '#fff';
  public static btnDangerHoverBgStart = 'none';
  public static btnDangerHoverBgEnd = 'none';
  public static btnDangerActiveBg = '#ba342e';
  public static btnDangerActiveBorderColor = '#ba342e';
  public static btnDangerActiveBorderTopColor = '';
  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = '#fcb73e';
  public static btnPayHoverBg = '#fda70c';
  public static btnPayHoverBorderColor = '#fda70c';
  public static btnPayHoverBorderBottomColor = '';
  public static btnPayHoverTextColor = '';
  public static btnPayBorderColor = '#fcb73e';
  public static btnPayBorderBottomColor = '';
  public static btnPayBgStart = 'none';
  public static btnPayBgEnd = 'none';
  public static get btnPayTextColor() {
    return this.textColorDefault;
  }
  public static btnPayHoverBgStart = 'none';
  public static btnPayHoverBgEnd = 'none';
  public static btnPayActiveBg = '#f69912';
  public static btnPayActiveBorderColor = '#f69912';
  public static btnPayActiveBorderTopColor = '';
  public static btnPayActiveShadow = 'none';
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
  public static get btnBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get btnBorderColorError() {
    return this.borderColorError;
  }
  public static get btnHeightSmall() {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYSmall, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightSmall, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnHeightMedium() {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYMedium, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightMedium, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnHeightLarge() {
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    const padding = parseInt(this.btnPaddingYLarge, 10) || 0;
    const lineHeigh = parseInt(this.btnLineHeightLarge, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get btnLinkColor() {
    return this.linkColor;
  }
  public static get btnLinkHoverColor() {
    return this.linkHoverColor;
  }
  public static get btnLinkActiveColor() {
    return this.linkActiveColor;
  }
  public static get btnLinkHoverTextDecoration() {
    return this.linkHoverTextDecoration;
  }
  public static get btnLinkLineBorderBottomColor() {
    return this.linkLineBorderBottomColor;
  }
  public static btnLinkLineBorderBottomStyle = '';
  public static get btnLinkHoverLineBorderBottomStyle() {
    return this.btnLinkLineBorderBottomStyle;
  }
  public static btnLinkLineBorderBottomWidth = '0px';
  public static get btnLinkLineBorderBottomOpacity() {
    return this.linkLineBorderBottomOpacity;
  }

  public static get btnLinkIconMarginRight() {
    return this.linkIconMarginRight;
  }
  public static get btnLinkIconMarginLeft() {
    return this.linkIconMarginRight;
  }
  public static get btnErrorSecondary() {
    return this.errorSecondary;
  }
  public static get btnWarningSecondary() {
    return this.warningSecondary;
  }
  public static get btnOutlineColorFocus() {
    return this.outlineColorFocus;
  }
  public static btnInsetColor = '#fff';
  public static get btnBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get btnLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  public static get btnDisabledTextColor() {
    return this.textColorDisabledContrast;
  }
  public static btnBacklessBg = 'transparent !important';
  public static btnBacklessHoverBg = 'rgba(0, 0, 0, 0.04) !important';
  public static btnBacklessActiveBg = 'rgba(0, 0, 0, 0.1) !important';
  public static get btnBacklessBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static get btnBacklessHoverBorderColor() {
    return this.btnBacklessBorderColor;
  }
  public static btnBacklessHoverTextColor = '';
  public static get btnBacklessTextColor() {
    return this.btnDefaultTextColor;
  }

  public static btnTextBg = 'transparent';
  public static btnTextHoverBg = 'rgba(0, 0, 0, 0.04)';
  public static btnTextActiveBg = 'rgba(0, 0, 0, 0.1)';
  public static get btnTextBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static get btnTextTextColor() {
    return this.btnDefaultTextColor;
  }
  public static btnTextHoverTextColor = '';
  public static get btnTextHoverBorderColor() {
    return this.btnTextHoverBg;
  }
  public static btnWithIconPaddingLeftSmall = '';
  public static btnWithIconPaddingLeftMedium = '';
  public static btnWithIconPaddingLeftLarge = '';

  public static btnIconColor = '';
  public static btnIconHoverColor = '';
  public static btnIconDisabledColor = '';
  //#endregion
  //#region Select
  public static get selectDefaultBg() {
    return this.inputBg;
  }
  public static selectPlaceholderColor = '#adadad';
  public static get selectBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get selectPlaceholderColorDisabled() {
    return this.textColorDisabledContrast;
  }
  public static get selectOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get selectLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get selectFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static selectPaddingXSmall = '7px';
  public static get selectPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get selectBorderRadiusSmall() {
    return this.btnBorderRadiusSmall;
  }
  public static selectIconGapSmall = '4px';
  public static get selectLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get selectFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static selectPaddingXMedium = '11px';
  public static get selectPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get selectBorderRadiusMedium() {
    return this.btnBorderRadiusMedium;
  }
  public static selectIconGapMedium = '8px';
  public static get selectLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get selectFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static selectPaddingXLarge = '15px';
  public static get selectPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static get selectBorderRadiusLarge() {
    return this.btnBorderRadiusLarge;
  }
  public static selectIconGapLarge = '12px';
  public static get selectMenuArrowColor() {
    return this.btnMenuArrowColor;
  }
  public static get selectMenuArrowColorDisabled() {
    return this.selectMenuArrowColor;
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
  public static selectRootWidthMobile = 'auto';
  public static mobileSelectMaxWidth = '100%';
  public static get selectTextColorDisabled() {
    return this.btnDisabledTextColor;
  }
  public static get selectBgDisabled() {
    return this.btnDisabledBg;
  }
  public static get selectBorderColorDisabled() {
    return this.btnDisabledBorderColor;
  }
  public static get selectMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static get selectBorderColorHover() {
    return this.btnDefaultHoverBorderColor;
  }
  public static selectBorderColorTransition = `box-shadow ${this.transitionDuration} ${this.transitionTimingFunction};`;
  //#endregion
  //#region Tooltip
  public static tooltipPaddingY = '16px';
  public static tooltipPaddingX = '16px';
  public static tooltipCloseBtnPadding = '8px';
  public static tooltipCloseBtnSide = '8px';
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.32)';
  public static tooltipCloseBtnHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static get tooltipTextColor() {
    return this.textColorDefault;
  }
  public static tooltipBg = '#fff';
  public static get tooltipBorder() {
    return this.popupBorder;
  }
  public static get tooltipBorderRadius() {
    return this.popupBorderRadius;
  }
  public static tooltipPinOffset = '0px'; // deprecated
  public static tooltipPinOffsetX = '16px';
  public static tooltipPinOffsetY = '18px';
  public static tooltipMargin = '10px';
  public static get tooltipPinSize() {
    return this.popupPinSize;
  }
  public static get tooltipFontSize() {
    return this.fontSizeSmall;
  }
  public static get tooltipLineHeight() {
    return this.controlLineHeightSmall;
  }
  //#endregion
  //#region TooltipMenu
  public static get tooltipMenuPinOffset() {
    return this.popupPinOffset;
  }
  public static get tooltipMenuMargin() {
    return this.popupMargin;
  }
  public static get tooltipMenuPinSize() {
    return this.popupPinSize;
  }

  //#endregion
  //#region Kebab
  public static get kebabPinOffset() {
    return this.popupPinOffset;
  }
  public static get kebabPinSize() {
    return this.popupPinSize;
  }
  public static kebabMargin = '4px';
  public static kebabBackground = 'transparent';
  public static kebabBackgroundHover = 'rgba(0, 0, 0, 0.09)';
  public static get kebabBackgroundActive() {
    return this.kebabBackgroundHover;
  }
  public static kebabBorderRadius = '50%';
  public static kebabBorder = '2px solid transparent';
  public static kebabSizeSmall = '26px';
  public static kebabSizeMedium = '26px';
  public static kebabSizeLarge = '26px';
  public static kebabIconSizeSmall = '14px';
  public static kebabIconSizeMedium = '18px';
  public static kebabIconSizeLarge = '20px';
  public static kebabIconColor = '#757575';

  //#endregion
  //#region Modal
  public static modalWindowShadow = '0 5px 10px rgba(0, 0, 0, 0.2);';
  public static modalBackBg = '#222';
  public static get modalBg() {
    return this.bgSecondary;
  }
  public static modalBackOpacity = '0.6';
  public static modalCloseButtonColor = 'rgba(0, 0, 0, 0.32)';
  public static modalCloseButtonDisabledColor = '#8b8b8b';
  public static modalCloseButtonHoverColor = 'rgba(0, 0, 0, 0.865)';
  public static modalCloseButtonPadding = '36px';
  public static modalCloseButtonLegacyShift = '0px';
  public static modalCloseButtonBottomPadding = '20px';
  public static modalCloseButtonClickArea = '10px';
  public static modalCloseIconSize = '12px';
  public static modalCloseLegacyGap = '0px';
  public static modalCloseWrapperLegacyGap = '0px';
  public static modalBorderRadius = '0px';
  public static get modalFixedHeaderBg() {
    return this.bgSecondary;
  }
  public static get modalFixedHeaderShadow() {
    return this.fixedPanelShadow;
  }
  public static modalFixedHeaderBorder = 'none';
  public static modalFixedFooterBorder = 'none';
  public static get modalFixedFooterShadow() {
    return this.fixedPanelShadow;
  }
  public static modalFixedPanelShadow = 'none';
  public static modalFooterBg = '#ebebeb';
  public static modalAdaptiveThreshold = '425px';
  public static modalPaddingTop = '24px';
  public static modalPaddingLeft = '32px';
  public static modalPaddingRight = '36px';
  public static modalHeaderFontSize = '24px';
  public static modalHeaderFontWeight = '400';
  public static get modalHeaderTextColor() {
    return this.textColorDefault;
  }
  public static modalHeaderLineHeight = '32px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalHeaderPaddingTop = '24px';
  public static modalHeaderAdditionalPaddingBottom = '22px';
  public static modalFixedHeaderMarginBottom = '10px';
  public static get modalFixedHeaderPaddingBottom() {
    return `${Math.round(parseInt(this.modalHeaderPaddingBottom) / 2)}px`;
  }
  public static modalFixedFooterPaddingTop = '20px';
  public static modalFixedFooterMarginTop = '10px';

  public static modalSeparatorBorderBottom = 'none';
  public static modalBodyTextColor = 'inherit';
  public static modalFooterTextColor = 'inherit';
  public static modalBodyPaddingTop = '0';
  public static modalBodyPaddingBottom = '24px';
  public static modalBodyBorderRadius = '0px';
  public static modalFooterPaddingTop = '0px';
  public static modalFooterPaddingBottom = '32px';
  public static modalPaddingBottom = '40px';
  public static modalFooterPanelPaddingTop = '20px';
  public static modalFooterPanelPaddingBottom = '20px';
  public static mobileModalCloseButtonRightPadding = '16px';
  public static mobileModalCloseButtonTopPadding = '12px';
  public static mobileModalCloseButtonClickArea = '16px';
  public static mobileModalCloseIconSize = '12px';
  public static mobileModalHeaderFontSize = '24px';
  public static mobileModalHeaderLineHeight = '32px';
  public static mobileModalHeaderPadding = '16px';
  public static mobileModalBodyPadding = '0 16px 16px 16px';
  public static mobileModalBodyFontSize = '16px';
  public static mobileModalFooterPadding = '16px';
  public static mobileModalPaddingBottom = '16px';
  public static mobileModalContainerHeight = '100%';
  public static mobileModalContainerMarginTop = '0';
  public static mobileModalContainerMarginRight = '0';
  public static mobileModalContainerMarginBottom = '0';
  public static mobileModalContainerMarginLeft = '0';
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = '#ebebeb';
  public static sidePageBackingBg = '#222';
  public static sidePageBackingBgOpacity = '0.6';
  public static sidePageCloseButtonColor = 'rgba(0, 0, 0, 0.374)';
  public static sidePageCloseButtonHoverColor = 'rgba(0, 0, 0, 0.5)';
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
  public static sidePageFooterPaddingTop = '24px';
  public static sidePageFooterPaddingBottom = '32px';
  public static get sidePageBgDefault() {
    return this.bgSecondary;
  }
  public static get sidePageHeaderTextColor() {
    return this.textColorDefault;
  }
  public static sidePageBodyTextColor = 'inherit';
  public static sidePageFooterTextColor = 'inherit';
  public static sidePageHeaderFontSize = '24px';
  public static sidePageHeaderLineHeight = '32px';
  public static sidePageHeaderPaddingBottom = '16px';
  public static sidePageHeaderPaddingTop = '24px';
  public static sidePageHeaderFixedFontSize = '18px';
  public static sidePageHeaderFixedLineHeight = '28px';
  public static sidePageHeaderFixedPaddingY = '10px';
  public static sidePageHeaderStickyOffset = '5px';
  public static sidePageCloseButtonPadding = '36px';
  public static mobileSidePageCloseButtonPadding = '16px';
  public static sidePageCloseButtonLegacyPaddingLeft = '36px';
  public static sidePageFooterPanelPaddingTop = '20px';
  public static sidePageFooterPanelPaddingBottom = '20px';
  public static sidePageCloseIconSize = '12px';
  public static sidePageCloseButtonClickArea = '10px';
  public static mobileSidePageCloseButtonClickArea = '16px';
  public static get sidePageFixedHeaderShadow() {
    return this.fixedPanelShadow;
  }
  public static get sidePageFixedFooterShadow() {
    return this.fixedPanelShadow;
  }
  public static sidePageFixedPanelShadow = 'none';
  public static mobileSidePageHeaderFontSize = '24px';
  public static mobileSidePageHeaderLineHeight = '32px';
  public static mobileSidePageHeaderPaddingBottom = '16px';
  public static mobileSidePageHeaderPaddingTop = '16px';
  public static sidePageHeaderFontWeight = '';
  //#endregion
  //#region DateInput
  public static get dateInputIconColor() {
    return this.textColorDefault;
  }
  public static dateInputMaskColor = '#b8b8b8';
  public static dateInputComponentSelectedBgColor = '#cdedff';
  //#endregion
  //#region Calendar
  public static get calendarBottomSeparatorBorderColor() {
    return ColorFunctions.fade(this.calendarMonthTitleBorderBottomColor, 1);
  }
  public static get calendarBottomSeparatorBorderWidth() {
    return '1px';
  }
  public static get calendarBottomSeparatorBorder() {
    return `${this.calendarBottomSeparatorBorderWidth} solid ${this.calendarBottomSeparatorBorderColor}`;
  }
  public static get calendarBg() {
    return this.bgSecondary;
  }
  public static get calendarCellBg() {
    return this.bgSecondary;
  }
  public static calendarCellHoverColor = 'white';
  public static calendarCellActiveHoverColor = 'white';
  public static calendarCellWeekendColor = '#cb3d35';
  public static calendarCellTodayBorder = '1px solid rgba(0, 0, 0, 0.32)';
  public static calendarCellSelectedBgColor = '#ebebeb';
  public static calendarCellSelectedFontColor = 'inherit';
  public static calendarCellSize = '32px';
  public static get calendarCellLineHeight() {
    return `calc(${this.calendarCellSize} - 2px)`;
  }
  public static get calendarMonthHeaderStickedBgColor() {
    return this.bgSecondary;
  }
  public static calendarMonthTitleBorderBottomColor = '#dfdede';
  public static get calendarCellHoverBgColor() {
    return this.bgActive;
  }
  public static calendarPaddingX = '18px';
  public static calendarMonthTitleLineHeight = '20px';
  public static calendarMonthTitlePaddingTop = '12px';
  public static calendarMonthTitlePaddingBottom = '8px';
  public static calendarMonthTitleMarginX = '6px';
  public static calendarMonthTitleMarginBottom = '6px';
  public static calendarWrapperHeight = ' 330px';
  public static calendarMonthMarginBottom = '6px';
  public static calendarMaxMonthsToAppendOnScroll = '5';
  //#endregion
  //#region DatePicker
  public static dateSelectLineHeight = '20px';
  public static dateSelectFontSize = '14px';
  public static dateSelectFontWeight = 'bold';
  public static dateSelectMenuItemBgSelected = '#ececec';
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
  public static get dateSelectTextColorInvert() {
    return this.textColorInvert;
  }
  public static get datePickerOpenBtnColor() {
    return this.textColorDefault;
  }
  public static datePickerMenuOffsetY = '2px';
  public static get pickerBg() {
    return this.bgSecondary;
  }
  public static pickerShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.16)';
  public static get pickerTodayWrapperBgColor() {
    return this.bgSecondary;
  }
  public static pickerTodayWrapperBorderTop = '1px solid #dfdede';
  public static pickerTodayWrapperHoverBgColor = '#f5f5f5';
  public static pickerTodayWrapperFontSize = '14px';
  public static pickerTodayWrapperLineHeight = '20px';
  public static pickerTodayWrapperPaddingTop = '6px';
  public static pickerTodayWrapperPaddingBottom = '6px';
  public static pickerBorderRadius = '';
  //#endregion
  //#region DateSelect
  public static get dateSelectMenuBg() {
    return this.bgSecondary;
  }
  public static get dateSelectMenuItemBgActive() {
    return this.bgActive;
  }
  public static get dateSelectMenuItemBgDisabled() {
    return this.bgSecondary;
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
  public static get pagingFontSize() {
    return this.fontSizeMedium;
  }
  public static get pagingForwardIconSize() {
    return this.pagingFontSize;
  }
  public static pagingForwardIconMarginTop = '1px';
  public static pagingPageLinkBoxSizing = 'content-box';
  public static pagingPageLinkPaddingX = '0.625em';
  public static pagingPageLinkPaddingY = '0.3125em';
  public static pagingPageLinkLegacyPaddingY = '0px';
  public static pagingPageLinkMinWidth = '0.75em';
  public static pagingPageForwardLinkMarginTop = '0.35em';
  public static pagingPageForwardLinkMarginLeft = '10px';
  public static pagingPageForwardLinkPaddingRight = '1.375em';
  public static pagingLineHeight = '1.375em';
  public static pagingDotsColor = 'gray';
  public static pagingDotsPadding = '0.375em 0.625em 0';
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.09)';
  public static pagingPageLinkDisabledActiveBg = 'rgba(0, 0, 0, 0.04)';
  public static get pagingPageLinkActiveColor() {
    return this.textColorDefault;
  }
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.05)';
  public static pagingPageLinkBorderRadius = '9999px';
  public static get pagingPageLinkHintColor() {
    return this.placeholderColor;
  }
  public static pagingPageLinkHintFontSize = '12px';
  public static pagingPageLinkHintLineHeight = '16px';
  public static pagingPageLinkHintMargin = '0 -20px';
  public static pagingPageLinkMargin = '0px 1px';
  public static get pagingForwardLinkColor() {
    return this.linkColor;
  }
  public static get pagingForwardLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  public static get pagingDotsDisabledColor() {
    return this.textColorDisabled;
  }
  //#endregion
  //#region Hint
  public static get hintColor() {
    return this.textColorInvert;
  }
  public static get mobileHintColor() {
    return this.hintColor;
  }
  public static get hintFontSize() {
    return this.fontSizeSmall;
  }
  public static get hintLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static hintMaxWidth = '200px';
  public static hintPaddingY = '6px';
  public static hintPaddingX = '8px';
  public static hintTextAlign = 'center';
  public static hintBgColor = 'rgba(51, 51, 51, 0.8)';
  public static hintBorder = 'none';
  public static hintBorderRadius = '2px';
  public static hintPinOffset = '8px';
  public static hintMargin = '8px';
  //#endregion
  //#region Toast
  public static get toastFontSize() {
    return this.fontSizeSmall;
  }
  public static get toastLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static toastPaddingY = '10px';
  public static toastPaddingX = '16px';
  public static toastBorderRadius = '2px';
  public static toastBorder = 'none';
  public static toastTop = '24px';
  public static toastBg = 'rgba(51, 51, 51, 0.8)';
  public static toastColor = 'white';
  public static toastLinkColor = '#8fcdff';
  public static toastLinkTextDecorationHover = 'underline';
  public static toastLinkBgHover = '';
  public static toastLinkBgActive = '';
  public static toastClosePadding = '16px';
  public static toastCloseColor = 'rgba(255, 255, 255, 0.6)';
  public static toastCloseHoverColor = 'white';
  public static toastCloseSize = '8px';
  //#endregion
  //#region Dropdown
  public static dropdownMenuSelectedBg = '#f1f1f1'; //deprecated
  public static dropdownMenuBorderColorTransition = '';
  public static get dropdownMenuHoverBorderColor() {
    return this.btnDefaultHoverBorderColor;
  }
  public static get dropdownMenuHoverBg() {
    //deprecated
    return this.bgActive;
  }
  public static get dropdownMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static get dropdownMenuMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static dropdownMenuMenuBoxSizing = 'content-box';
  public static dropdownButtonBorderRadiusSmall = '1px';
  public static dropdownButtonBorderRadiusMedium = '1px';
  public static dropdownButtonBorderRadiusLarge = '1px';

  public static get dropdownDefaultBg() {
    return this.btnDefaultBg;
  }
  public static get dropdownBorderWidth() {
    return this.btnBorderWidth;
  }
  public static get dropdownOutlineWidth() {
    return this.btnOutlineWidth;
  }
  public static get dropdownLineHeightSmall() {
    return this.btnLineHeightSmall;
  }
  public static get dropdownFontSizeSmall() {
    return this.btnFontSizeSmall;
  }
  public static get dropdownPaddingXSmall() {
    return this.selectPaddingXSmall;
  }
  public static get dropdownPaddingYSmall() {
    return this.btnPaddingYSmall;
  }
  public static get dropdownIconSizeSmall() {
    return this.btnIconSizeSmall;
  }
  public static get dropdownLineHeightMedium() {
    return this.btnLineHeightMedium;
  }
  public static get dropdownFontSizeMedium() {
    return this.btnFontSizeMedium;
  }
  public static get dropdownPaddingXMedium() {
    return this.selectPaddingXMedium;
  }
  public static get dropdownPaddingYMedium() {
    return this.btnPaddingYMedium;
  }
  public static get dropdownIconSizeMedium() {
    return this.btnIconSizeMedium;
  }
  public static get dropdownLineHeightLarge() {
    return this.btnLineHeightLarge;
  }
  public static get dropdownFontSizeLarge() {
    return this.btnFontSizeLarge;
  }
  public static get dropdownPaddingXLarge() {
    return this.selectPaddingXLarge;
  }
  public static get dropdownPaddingYLarge() {
    return this.btnPaddingYLarge;
  }
  public static get dropdownIconSizeLarge() {
    return this.btnIconSizeLarge;
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
  //#endregion
  //#region Menu
  public static get menuBgDefault() {
    return this.bgSecondary;
  }
  public static get menuBorderRadius() {
    return '0px';
  }
  public static menuBorder = 'none';
  public static menuShadow = '0 4px 12px rgba(0, 0, 0, 0.16)';
  public static menuPaddingY = '0px';
  public static menuLegacyPaddingY = '5px';
  public static menuScrollContainerContentWrapperPaddingY = '4px';
  public static mobileMenuPaddingY = '0px';
  public static mobileMenuScrollContainerContentWrapperPaddingY = '0px';
  public static menuPaddingX = '0px';
  public static mobileMenuPaddingX = '8px';
  public static menuOffsetY = '0px';
  public static menuBoxSizing = 'content-box';
  // menuItem
  public static get menuItemTextColor() {
    return this.textColorDefault;
  }
  public static get menuItemSelectedBg() {
    return this.dropdownMenuSelectedBg;
  }
  public static get menuItemHoverBg() {
    return this.dropdownMenuHoverBg;
  }
  /**
   * @deprecated use menuItemIconWidthSmall
   */
  public static menuItemIconWidth = '16px';
  public static get menuItemIconWidthSmall() {
    return this.menuItemIconWidth;
  }
  public static menuItemIconWidthMedium = '20px';
  public static menuItemIconWidthLarge = '24px';
  public static menuItemIconGap = '4px';
  public static menuItemIconLegacyMargin = '0px';
  public static menuItemIconLegacyShift = '0px';

  /**
   * @deprecated use menuItemPaddingForIconSmall
   */
  public static get menuItemPaddingForIcon() {
    return `${
      parseInt(this.menuItemPaddingXSmall) +
      parseInt(this.menuItemIconWidthSmall) +
      parseInt(this.menuItemIconGap) +
      parseInt(this.menuItemIconLegacyMargin)
    }px`;
  }
  public static get menuItemPaddingForIconSmall() {
    return this.menuItemPaddingForIcon;
  }
  public static get menuItemPaddingForIconMedium() {
    return `${
      parseInt(this.menuItemPaddingXMedium) +
      parseInt(this.menuItemIconWidthMedium) +
      parseInt(this.menuItemIconGap) +
      parseInt(this.menuItemIconLegacyMargin)
    }px`;
  }
  public static get menuItemPaddingForIconLarge() {
    return `${
      parseInt(this.menuItemPaddingXLarge) +
      parseInt(this.menuItemIconWidthLarge) +
      parseInt(this.menuItemIconGap) +
      parseInt(this.menuItemIconLegacyMargin)
    }px`;
  }

  /**
   * @deprecated use menuItemLineHeightSmall
   */
  public static get menuItemLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get menuItemLineHeightSmall() {
    return this.menuItemLineHeight;
  }
  public static get menuItemLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get menuItemLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  /**
   * @deprecated use menuItemFontSizeSmall
   */
  public static get menuItemFontSize() {
    return this.fontSizeSmall;
  }
  public static get menuItemFontSizeSmall() {
    return this.menuItemFontSize;
  }
  public static get menuItemFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get menuItemFontSizeLarge() {
    return this.fontSizeLarge;
  }

  /**
   * @deprecated use menuItemPaddingXSmall
   */
  public static menuItemPaddingX = '8px';
  /**
   * @deprecated use menuItemPaddingYSmall
   */
  public static menuItemPaddingY = '6px';
  public static get menuItemPaddingXSmall() {
    return this.menuItemPaddingX;
  }
  public static get menuItemPaddingYSmall() {
    return this.menuItemPaddingY;
  }
  public static menuItemPaddingXMedium = '12px';
  public static menuItemPaddingYMedium = '9px';
  public static menuItemPaddingXLarge = '16px';
  public static menuItemPaddingYLarge = '12px';
  public static menuItemBorderRadius = '0px';
  public static menuItemLegacyPaddingX = '0px';
  public static menuItemLegacyPaddingY = '0px';
  public static get menuItemHoverColor() {
    return this.textColorInvert;
  }
  public static get menuItemLinkColor() {
    return this.linkColor;
  }
  public static menuItemCommentColor = '#adadad';
  public static menuItemCommentOpacity = '';
  public static menuItemCommentColorHover = '#fff';
  public static menuItemDisplay = 'block';
  public static menuItemPaddingMobile = '12px 16px';
  public static get menuItemLineHeightMobile() {
    return this.lineHeightMobile;
  }
  public static get menuItemFontSizeMobile() {
    return this.fontSizeMobile;
  }
  public static get menuItemDisabledColor() {
    return this.textColorDisabled;
  }
  public static menuItemDisabledBg = 'transparent';
  // menuMessage
  public static get menuMessageTextColor() {
    return this.menuItemDisabledColor;
  }
  public static get menuMessageBg() {
    return this.menuItemDisabledBg;
  }
  public static get menuMessagePaddingY() {
    return this.menuItemPaddingYSmall;
  }
  public static get menuMessagePaddingX() {
    return this.menuItemPaddingXSmall;
  }
  public static get menuMessageDisplay() {
    return this.menuItemDisplay;
  }
  public static get menuMessagePaddingMobile() {
    return this.menuItemPaddingMobile;
  }
  /**
   * @deprecated use menuMessageLineHeightSmall
   */
  public static get menuMessageLineHeight() {
    return this.menuItemLineHeightSmall;
  }
  public static get menuMessageLineHeightMobile() {
    return this.menuItemLineHeightMobile;
  }
  /**
   * @deprecated use menuMessageFontSizeSmall
   */
  public static get menuMessageFontSize() {
    return this.menuItemFontSizeSmall;
  }
  public static get menuMessageFontSizeMobile() {
    return this.menuItemFontSizeMobile;
  }
  public static get menuMessageFontSizeSmall() {
    return this.menuItemFontSizeSmall;
  }
  public static get menuMessageFontSizeMedium() {
    return this.menuItemFontSizeMedium;
  }
  public static get menuMessageFontSizeLarge() {
    return this.menuItemFontSizeLarge;
  }

  public static get menuMessageLineHeightSmall() {
    return this.menuItemLineHeightSmall;
  }
  public static get menuMessageLineHeightMedium() {
    return this.menuItemLineHeightMedium;
  }
  public static get menuMessageLineHeightLarge() {
    return this.menuItemLineHeightLarge;
  }
  public static menuItemGap = '0px';

  //menuHeader
  public static menuHeaderColor = '#757575';

  /**
   * @deprecated use menuHeaderLineHeightSmall
   */
  public static menuHeaderLineHeight = '16px';
  public static get menuHeaderLineHeightSmall() {
    return this.menuHeaderLineHeight;
  }
  public static menuHeaderLineHeightMedium = '20px';
  public static menuHeaderLineHeightLarge = '22px';

  /**
   * @deprecated use menuHeaderFontSizeSmall
   */
  public static menuHeaderFontSize = '12px';
  public static get menuHeaderFontSizeSmall() {
    return this.menuHeaderFontSize;
  }
  public static menuHeaderFontSizeMedium = '14px';
  public static menuHeaderFontSizeLarge = '16px';

  /**
   * @deprecated use menuHeaderPaddingXSmall
   */
  public static menuHeaderPaddingX = '8px';
  /**
   * @deprecated use menuHeaderPaddingTopSmall
   */
  public static menuHeaderPaddingTop = '12px';
  /**
   * @deprecated use menuHeaderPaddingBottomSmall
   */
  public static menuHeaderPaddingBottom = '4px';
  public static get menuHeaderPaddingXSmall() {
    return this.menuHeaderPaddingX;
  }
  public static get menuHeaderPaddingTopSmall() {
    return this.menuHeaderPaddingTop;
  }
  public static get menuHeaderPaddingBottomSmall() {
    return this.menuHeaderPaddingBottom;
  }
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

  public static menuHeaderLegacyPaddingRight = '0px';

  //menuFooter
  public static get menuFooterColor() {
    return this.menuHeaderColor;
  }
  public static get menuFooterLineHeightSmall() {
    return this.menuHeaderLineHeightSmall;
  }
  public static get menuFooterLineHeightMedium() {
    return this.menuHeaderLineHeightMedium;
  }
  public static get menuFooterLineHeightLarge() {
    return this.menuHeaderLineHeightLarge;
  }

  public static get menuFooterFontSizeSmall() {
    return this.menuHeaderFontSizeSmall;
  }
  public static get menuFooterFontSizeMedium() {
    return this.menuHeaderFontSizeMedium;
  }
  public static get menuFooterFontSizeLarge() {
    return this.menuHeaderFontSizeLarge;
  }

  public static get menuFooterPaddingXSmall() {
    return this.menuHeaderPaddingXSmall;
  }
  public static get menuFooterPaddingXMedium() {
    return this.menuHeaderPaddingXMedium;
  }
  public static get menuFooterPaddingXLarge() {
    return this.menuHeaderPaddingXLarge;
  }

  public static get menuFooterPaddingTopSmall() {
    return this.menuHeaderPaddingBottomSmall;
  }
  public static get menuFooterPaddingTopMedium() {
    return this.menuHeaderPaddingBottomMedium;
  }
  public static get menuFooterPaddingTopLarge() {
    return this.menuHeaderPaddingBottomLarge;
  }

  public static get menuFooterPaddingBottomSmall() {
    return this.menuHeaderPaddingTopSmall;
  }
  public static get menuFooterPaddingBottomMedium() {
    return this.menuHeaderPaddingTopMedium;
  }
  public static get menuFooterPaddingBottomLarge() {
    return this.menuHeaderPaddingTopLarge;
  }

  public static menuFooterLegacyPaddingRight = '0px';

  //menuSeparator
  public static menuSeparatorBorderColor = '#ebebeb';
  public static menuSeparatorMarginY = '2px';
  public static menuSeparatorMarginX = '0px';
  public static menuSeparatorBorderWidth = '1px';
  // mobileMenuSeparator
  public static mobileMenuSeparatorMarginY = '4px';
  public static mobileMenuSeparatorMarginX = '24px';
  //#endregion
  //#region Toggle
  /**
   * @deprecated use toggleFontSizeSmall
   */
  public static get toggleFontSize() {
    return this.fontSizeSmall;
  }
  /**
   * @deprecated use toggleLineHeightSmall
   */
  public static get toggleLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get toggleLineHeightSmall() {
    return this.toggleLineHeight;
  }
  public static get toggleLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get toggleLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get toggleFontSizeSmall() {
    return this.toggleFontSize;
  }
  public static get toggleFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get toggleFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get toggleTextColor() {
    return this.textColorDefault;
  }
  public static toggleHandleActiveWidthIncrement = '4px';
  /**
   * @deprecated use toggleHandleBorderRadiusSmall
   */
  public static get toggleHandleBorderRadius() {
    const height = parseInt(this.toggleHeightSmall, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static get toggleHandleBorderRadiusSmall() {
    return this.toggleHandleBorderRadius;
  }
  public static get toggleHandleBorderRadiusMedium() {
    const height = parseInt(this.toggleHeightMedium, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static get toggleHandleBorderRadiusLarge() {
    const height = parseInt(this.toggleHeightLarge, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  /**
   * @deprecated use toggleHeightSmall
   */
  public static toggleHeight = '20px';

  /**
   * @deprecated use toggleWidthSmall
   */
  public static toggleWidth = '32px';

  public static get toggleHeightSmall() {
    return this.toggleHeight;
  }
  public static get toggleWidthSmall() {
    return this.toggleWidth;
  }
  public static toggleHeightMedium = '22px';
  public static toggleWidthMedium = '34px';
  public static toggleHeightLarge = '24px';
  public static toggleWidthLarge = '36px';
  /**
   * @deprecated use toggleBorderRadiusSmall
   */
  public static get toggleBorderRadius() {
    return `calc(${this.toggleHeightSmall} * 0.5)`;
  }
  public static get toggleBorderRadiusSmall() {
    return this.toggleBorderRadius;
  }
  public static get toggleBorderRadiusMedium() {
    return `calc(${this.toggleHeightMedium} * 0.5)`;
  }
  public static get toggleBorderRadiusLarge() {
    return `calc(${this.toggleHeightLarge} * 0.5)`;
  }
  /**
   * @deprecated use toggleHandleBg
   */
  public static toggleBg = '#fff';
  public static toggleCheckedBg = '#fff';
  public static toggleDisabledHandleBg = '#fff';
  public static toggleBaseBg = '#fff';
  public static get toggleBgDisabled() {
    return this.bgDisabled;
  }
  public static toggleBgDisabledChecked = '#dadada';
  public static toggleBgHover = '#f3f3f2';
  public static toggleCheckedBgHover = '#f3f3f2';
  public static toggleBgChecked = '#1874cf';
  public static get toggleBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get toggleOutlineWidth() {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${outlineWidth + borderWidth}px`;
  }
  public static toggleBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static get toggleBorderColorDisabled() {
    return this.toggleBorderColor;
  }
  public static get toggleBorderColorDisabledChecked() {
    return this.toggleBorderColor;
  }
  /**
   * @deprecated use toggleHandleSizeSmall
   */
  public static get toggleHandleSize() {
    const toggleHeight = parseInt(this.toggleHeightSmall, 10) || 0;
    const toggleBorderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${toggleHeight - 2 * toggleBorderWidth}px`;
  }
  public static get toggleHandleSizeSmall() {
    return this.toggleHandleSize;
  }
  public static get toggleHandleSizeMedium() {
    const toggleHeight = parseInt(this.toggleHeightMedium, 10) || 0;
    const toggleBorderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${toggleHeight - 2 * toggleBorderWidth}px`;
  }
  public static get toggleHandleSizeLarge() {
    const toggleHeight = parseInt(this.toggleHeightLarge, 10) || 0;
    const toggleBorderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${toggleHeight - 2 * toggleBorderWidth}px`;
  }

  public static get toggleHandleLeft() {
    return this.toggleBorderWidth;
  }
  public static get toggleHandleTop() {
    return this.toggleBorderWidth;
  }

  public static toggleBgFocus = 'linear-gradient(-180deg, #f1f1f1, #dedede)';
  public static toggleBgActive = '#e5e5e5';
  public static get toggleShadowColorError() {
    return this.errorMain;
  }
  public static get toggleShadowColorWarning() {
    return this.warningMain;
  }
  public static get toggleFocusShadowColor() {
    return this.borderColorFocus;
  }
  public static toggleCaptionGap = '8px';
  public static toggleButtonOffsetY = '0px';

  public static get toggleOutlineColorFocus() {
    return this.outlineColorFocus;
  }

  public static get toggleHandleBoxShadowOld() {
    return `0 ${this.toggleBorderWidth} 0 0 rgba(0, 0, 0, 0.15), 0 0 0 ${this.toggleBorderWidth} rgba(0, 0, 0, 0.15)`;
  }

  public static toggleContainerBg = '';
  public static get toggleContainerBgHover() {
    return this.toggleBgHover;
  }
  public static get toggleContainerBgChecked() {
    return this.toggleBgChecked;
  }
  public static toggleContainerBgCheckedHover = '';
  public static toggleContainerBoxShadow = '';
  public static toggleContainerBoxShadowHover = '';
  public static toggleContainerBoxShadowChecked = '';
  public static toggleContainerBoxShadowCheckedHover = '';

  public static get toggleHandleBg() {
    return this.toggleBg;
  }
  public static toggleHandleBgHover = '';
  public static toggleHandleBgChecked = '';
  public static toggleHandleBgCheckedHover = '';
  public static toggleHandleBoxShadow = '';
  public static toggleHandleBoxShadowHover = '';
  public static toggleHandleBoxShadowChecked = '';
  public static toggleHandleBoxShadowCheckedHover = '';

  public static toggleContainerBgDisabled = '';
  public static toggleHandleBgDisabled = '';
  public static toggleContainerBoxShadowDisabled = '';
  public static toggleHandleBoxShadowDisabled = '';
  public static toggleContainerBgDisabledChecked = '';
  public static toggleHandleBgDisabledChecked = '';
  public static toggleContainerBoxShadowDisabledChecked = '';
  public static toggleHandleBoxShadowDisabledChecked = '';
  //#endregion
  //#region Popup
  public static popupBorder = 'none';
  public static popupBorderRadius = '2px';
  public static popupBorderColor = 'transparent';
  public static popupDropShadow = 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16))';
  public static popupBoxShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.16)';
  public static get popupTextColor() {
    return this.textColorDefault;
  }
  public static get popupBackground() {
    return this.bgSecondary;
  }
  public static popupPinOffset = '0px'; // deprecated
  public static popupPinOffsetX = '16px';
  public static popupPinOffsetY = '16px';
  public static popupMargin = '10px';
  public static popupPinSize = '8px';
  public static popupMenuMenuOffsetY = '0px';
  //#endregion
  //#region Input
  public static get inputTextColor() {
    return this.textColorDefault;
  }
  public static inputShadow = 'none';
  public static inputBg = 'white';
  public static inputIconColor = '#a9a9a9';
  public static get inputFocusedIconColor() {
    return this.inputIconColor;
  }
  public static inputColor = 'inherit';
  public static inputWidth = '200px';
  public static get inputTextColorDisabled() {
    return this.textColorDisabledContrast;
  }
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
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYSmall, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightSmall, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get inputHeightMedium() {
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYMedium, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightMedium, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
  }
  public static get inputHeightLarge() {
    const borderWidth = parseInt(this.inputBorderWidth, 10) || 0;
    const padding = parseInt(this.inputPaddingYLarge, 10) || 0;
    const lineHeigh = parseInt(this.inputLineHeightLarge, 10) || 0;
    return `${2 * borderWidth + 2 * padding + lineHeigh}px`;
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
  public static inputPaddingXSmall = '7px';
  public static inputPaddingXMedium = '11px';
  public static inputPaddingXLarge = '15px';
  public static inputIconGapSmall = '4px';
  public static inputIconGapMedium = '8px';
  public static inputIconGapLarge = '12px';
  public static inputIconSizeSmall = '16px';
  public static inputIconSizeMedium = '18px';
  public static inputIconSizeLarge = '20px';
  public static get inputFocusShadow() {
    return `0 0 0 ${this.inputOutlineWidth} ${this.borderColorFocus}`;
  }
  public static get inputFocusedBg() {
    return this.inputBg;
  }
  public static get inputDisabledBg() {
    return this.bgDisabled;
  }
  public static get inputDisabledBorderColor() {
    return this.borderColorDisabled;
  }
  public static get inputFocusOutline() {
    return this.borderColorFocus;
  }
  public static get inputBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get inputOutlineWidth() {
    return `calc(${this.controlOutlineWidth} - 1px)`;
  }
  public static inputBackgroundClip = 'padding-box';
  public static inputBorderRadiusSmall = '0px';
  public static inputBorderRadiusMedium = '0px';
  public static inputBorderRadiusLarge = '0px';
  public static inputDisabledBackgroundClip = '';
  public static get inputBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get inputBorderColorHover() {
    return this.inputBorderColor;
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
  public static inputBorderTopColor = 'rgba(0, 0, 0, 0.15)';
  public static get inputPlaceholderColor() {
    return this.placeholderColor;
  }
  public static get inputPlaceholderColorDisabled() {
    return this.textColorDisabledContrast;
  }
  public static get inputPlaceholderColorLight() {
    return this.placeholderColorLight;
  }
  public static get inputBlinkColor() {
    return this.blinkColor;
  }
  public static inputColorScheme = 'light';
  //#endregion
  //#region Checkbox
  /**
   * @deprecated use checkboxFontSizeSmall
   */
  public static get checkboxFontSize() {
    return this.fontSizeSmall;
  }
  public static get checkboxFontSizeSmall() {
    return this.checkboxFontSize;
  }
  public static get checkboxFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get checkboxFontSizeLarge() {
    return this.fontSizeLarge;
  }

  /**
   * @deprecated use checkboxLineHeightSmall
   */
  public static get checkboxLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get checkboxLineHeightSmall() {
    return this.checkboxLineHeight;
  }
  public static get checkboxLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get checkboxLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  /**
   * @deprecated use checkboxBoxSizeSmall
   */
  public static checkboxBoxSize = '16px';
  public static checkboxBoxSizeSmall = '16px';
  public static checkboxBoxSizeMedium = '20px';
  public static checkboxBoxSizeLarge = '24px';
  public static checkboxCaptionGap = '8px';

  /**
   * @deprecated use checkboxPaddingYSmall
   */
  public static get checkboxPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get checkboxPaddingYSmall() {
    return this.checkboxPaddingY;
  }
  public static get checkboxPaddingYMedium() {
    const controlHeight = parseInt(this.controlHeightMedium, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightMedium, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get checkboxPaddingYLarge() {
    const controlHeight = parseInt(this.controlHeightLarge, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightLarge, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static checkboxBoxOffsetY = '1px';
  public static checkboxBgStart = '#fdfdfd';
  public static checkboxBgEnd = '#ededed';
  public static get checkboxTextColorDefault() {
    return this.textColorDefault;
  }
  public static get checkboxTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static get checkboxShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} ${this.borderColorDisabled}`;
  }
  public static checkboxBorder = 'none';
  public static get checkboxBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get checkboxShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static get checkboxShadowHover() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  public static checkboxCheckedColor = '#fff';
  public static get checkboxOutlineColorFocus() {
    return this.outlineColorFocus;
  }
  public static get checkboxBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get checkboxBorderColorError() {
    return this.borderColorError;
  }
  public static get checkboxCheckedHoverShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} ${this.checkboxCheckedHoverBg}`;
  }
  public static checkboxBorderRadius = '1px';
  public static get checkboxOutlineWidth() {
    return this.controlOutlineWidth;
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
  public static checkboxBg = '#fff';
  public static get checkboxHoverBg() {
    return this.btnDefaultHoverBg;
  }
  public static get checkboxActiveBg() {
    return this.btnDefaultActiveBg;
  }
  public static get checkboxCheckedBg() {
    return this.borderColorFocus;
  }
  public static get checkboxBgDisabled() {
    return this.bgDisabled;
  }
  public static get checkboxCheckedHoverBg() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '5%');
  }
  public static get checkboxCheckedActiveBg() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '15%');
  }
  public static get checkboxShadowActive() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  //#endregion
  //#region TextArea
  public static textareaBg = '#fff';
  public static get textareaColor() {
    return this.textColorDefault;
  }
  public static get textareaTextColorDisabled() {
    return this.textColorDisabledContrast;
  }
  public static get textareaPlaceholderColorLight() {
    return this.placeholderColorLight;
  }
  public static get textareaPlaceholderColor() {
    return this.placeholderColor;
  }
  public static get textareaPlaceholderColorDisabled() {
    return this.textColorDisabledContrast;
  }
  public static textareaShadow = 'none';
  public static textareaBackgroundClip = 'border-box';
  /**
   * @deprecated use textareaFontSizeSmall
   */
  public static get textareaFontSize() {
    return this.fontSizeSmall;
  }
  public static get textareaFontSizeSmall() {
    return this.textareaFontSize;
  }
  public static get textareaFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get textareaFontSizeLarge() {
    return this.fontSizeLarge;
  }
  /**
   * @deprecated use textareaLineHeightSmall
   */
  public static get textareaLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get textareaLineHeightSmall() {
    return this.textareaLineHeight;
  }
  public static get textareaLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get textareaLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static textareaBorderRadius = '0px';
  public static get textareaBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get textareaOutlineWidth() {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${outlineWidth - borderWidth}px`;
  }
  /**
   * @deprecated use textareaMinHeightSmall
   */
  public static get textareaMinHeight() {
    const lineHeight = parseInt(this.textareaLineHeightSmall, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYSmall, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }
  public static get textareaMinHeightSmall() {
    return this.textareaMinHeight;
  }
  public static get textareaMinHeightMedium() {
    const lineHeight = parseInt(this.textareaLineHeightMedium, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYMedium, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }
  public static get textareaMinHeightLarge() {
    const lineHeight = parseInt(this.textareaLineHeightLarge, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYLarge, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }

  public static textareaWidth = '250px';
  /**
   * @deprecated use textareaPaddingXSmall
   */
  public static textareaPaddingX = '7px';
  static get textareaPaddingXSmall() {
    return this.textareaPaddingX;
  }
  public static textareaPaddingXMedium = '11px';
  public static textareaPaddingXLarge = '15px';

  /**
   * @deprecated use textareaPaddingYSmall
   */
  public static get textareaPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static get textareaPaddingYSmall() {
    return this.textareaPaddingY;
  }
  public static get textareaPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get textareaPaddingYLarge() {
    return this.controlPaddingYLarge;
  }

  public static get textareaBorderColor() {
    return this.borderColorGrayLight;
  }
  public static textareaBorderTopColor = 'rgba(0, 0, 0, 0.16)';
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
  public static textareaDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static textareaDisabledBorderColor = 'transparent';
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
  /**
   * @deprecated use radioBulletSizeSmall
   */
  public static radioBulletSize = '8px';
  public static get radioBulletSizeSmall() {
    return this.radioBulletSize;
  }
  public static radioBulletSizeMedium = '10px';
  public static radioBulletSizeLarge = '12px';
  public static get radioOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get radioTextColor() {
    return this.textColorDefault;
  }

  /**
   * @deprecated use radioSizeSmall
   */
  public static radioSize = '16px';
  public static get radioSizeSmall() {
    return this.radioSize;
  }
  public static radioSizeMedium = '20px';
  public static radioSizeLarge = '24px';

  /**
   * @deprecated use radioFontSizeSmall
   */
  public static get radioFontSize() {
    return this.fontSizeSmall;
  }
  public static get radioFontSizeSmall() {
    return this.radioFontSize;
  }
  public static get radioFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get radioFontSizeLarge() {
    return this.fontSizeLarge;
  }

  /**
   * @deprecated use radioLineHeightSmall
   */
  public static get radioLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get radioLineHeightSmall() {
    return this.radioLineHeight;
  }
  public static get radioLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get radioLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  public static radioCaptionGap = '8px';

  /**
   * @deprecated use radioPaddingYSmall
   */
  public static get radioPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get radioPaddingYSmall() {
    return this.radioPaddingY;
  }
  public static get radioPaddingYMedium() {
    const controlHeight = parseInt(this.controlHeightMedium, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightMedium, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static get radioPaddingYLarge() {
    const controlHeight = parseInt(this.controlHeightLarge, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightLarge, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }

  public static radioVerticalAlign = 'top';
  public static radioBgImage = 'none';
  public static radioBgColor = '#fff';
  public static get radioHoverBg() {
    return this.checkboxHoverBg;
  }
  public static get radioActiveBg() {
    return this.checkboxActiveBg;
  }
  public static get radioBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get radioBorderColor() {
    return this.borderColorGrayLight;
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
  public static get radioFocusShadow() {
    return `inset 0 0 0 1px ${this.outlineColorFocus}`;
  }
  public static get radioCheckedBgColor() {
    return this.checkboxCheckedBg;
  }
  public static radioCheckedBorderColor = 'transparent';
  public static radioCheckedBulletColor = '#fff';
  public static get radioCheckedHoverBgColor() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '5%');
  }
  public static get radioDisabledBg() {
    return this.bgDisabled;
  }
  public static get radioDisabledShadow() {
    return `0 0 0 ${this.radioBorderWidth} ${this.borderColorDisabled}`;
  }
  public static radioCaptionDisplay = 'inline-flex';
  public static radioBorderWidthCompensation = '0px';
  public static radioCircleOffsetY = '1px';
  public static get radioCheckedDisabledBulletBg() {
    return this.gray;
  }
  //#endregion
  //#region RadioGroup
  public static radioGroupLegacyItemGap = '0px';
  //#endregion
  //#region Tabs
  /**
   * @deprecated use tabFontSizeLarge
   */
  public static get tabFontSize() {
    return this.fontSizeLarge;
  }
  public static get tabFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get tabFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get tabFontSizeLarge() {
    return this.tabFontSize;
  }
  /**
   * @deprecated use tabLineHeightLarge
   */
  public static get tabLineHeight() {
    return this.controlLineHeightLarge;
  }
  public static get tabLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get tabLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get tabLineHeightLarge() {
    return this.tabLineHeight;
  }
  /**
   * @deprecated use tabPaddingXLarge
   */
  public static tabPaddingX = '12px';
  public static tabPaddingXSmall = '8px';
  public static tabPaddingXMedium = '10px';
  public static get tabPaddingXLarge() {
    return this.tabPaddingX;
  }
  /**
   * @deprecated use tabPaddingXLarge
   */
  public static get tabsMarginX() {
    return this.tabPaddingX;
  }
  /**
   * @deprecated use tabPaddingYLarge
   */
  public static get tabPaddingY() {
    const paddingY = parseInt(this.controlPaddingYLarge);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static get tabPaddingYSmall() {
    const paddingY = parseInt(this.controlPaddingYSmall);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static get tabPaddingYMedium() {
    const paddingY = parseInt(this.controlPaddingYMedium);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
  }
  public static get tabPaddingYLarge() {
    return this.tabPaddingY;
  }
  public static tabBorderWidth = '2px';
  public static get tabOutlineWidth() {
    return this.controlOutlineWidth;
  }
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
  public static tabIndicatorBorderRadius = '0px';
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
    return this.fontSizeSmall;
  }
  public static get spinnerFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get spinnerFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get spinnerLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get spinnerLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get spinnerLineHeightLarge() {
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
  public static switcherBorderRadius = '2px';
  public static get switcherTextColor() {
    return this.textColorDefault;
  }
  public static get switcherOutlineWidth() {
    return this.btnOutlineWidth;
  }
  public static get switcherCaptionFontSizeSmall() {
    return this.btnFontSizeSmall;
  }
  public static get switcherCaptionFontSizeMedium() {
    return this.btnFontSizeMedium;
  }
  public static get switcherCaptionFontSizeLarge() {
    return this.btnFontSizeLarge;
  }
  public static get switcherCaptionLineHeightSmall() {
    return this.btnLineHeightSmall;
  }
  public static get switcherCaptionLineHeightMedium() {
    return this.btnLineHeightMedium;
  }
  public static get switcherCaptionLineHeightLarge() {
    return this.btnLineHeightLarge;
  }
  public static get switcherCaptionGapSmall() {
    return this.btnPaddingXSmall;
  }
  public static get switcherCaptionGapMedium() {
    return this.btnPaddingXMedium;
  }
  public static get switcherCaptionGapLarge() {
    return this.btnPaddingXLarge;
  }
  public static switcherButtonPaddingXSmall = '7px';
  public static switcherButtonPaddingXMedium = '11px';
  public static switcherButtonPaddingXLarge = '15px';
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
  public static switcherBtnDisabledBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static get switcherButtonDisabledBorderColor() {
    return this.switcherBtnDisabledBorderColor;
  }
  public static get switcherButtonCheckedDisabledShadow() {
    return this.btnCheckedDisabledShadow;
  }
  //#endregion
  //#region MobilePopup
  public static mobilePopupTopPadding = '80px';
  public static mobilePopupContainerBottomPadding = '8px';
  public static mobilePopupHeaderPadding = '16px 16px 8px 16px';
  public static mobilePopupContainerBorderRadius = '16px';
  public static get mobilePopupHeaderFontSize() {
    return this.fontSizeMobile;
  }
  public static get mobilePopupHeaderLineHeight() {
    return this.lineHeightMobile;
  }
  public static mobilePopupHeaderFontWeight = '500';
  public static mobilePopupHeaderChildPadding = '12px';
  public static mobilePopupOuterIndentY = '24px';
  //#endregion
  //#region ScrollContainer
  public static scrollContainerScrollBarSize = '4px';
  public static scrollContainerScrollBarHoverSize = '10px';
  public static scrollContainerScrollBarColor = 'rgba(183, 183, 183, 0.7)';
  public static scrollContainerScrollBarInvertColor = 'rgba(255, 255, 255, 0.5)';
  public static scrollContainerScrollBarOffsetY = '4px';
  public static dropdownMenuScrollContainerScrollBarOffsetY = '0px';
  //#endregion
  //#region PasswordInput
  public static passwordInputVisibilityIconColor = '#000';
  public static passwordInputVisibilityIconOpacity = '0.6';
  public static passwordInputVisibilityIconHoverColor = '#000';
  public static passwordInputVisibilityIconHoverOpacity = '1';
  //#endregion
  //#region GlobalLoader
  public static get globalLoaderColor() {
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
  public static fileUploaderBg = '#fff';
  public static fileUploaderUploadButtonBg = '';
  public static get fileUploaderFontSize() {
    return this.fontSizeSmall;
  }
  public static get fileUploaderPaddingXSmall() {
    return this.inputPaddingXSmall;
  }
  public static get fileUploaderPaddingXMedium() {
    return this.inputPaddingXMedium;
  }
  public static get fileUploaderPaddingXLarge() {
    return this.inputPaddingXLarge;
  }
  public static get fileUploaderFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get fileUploaderFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get fileUploaderFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get fileUploaderLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get fileUploaderLineHeightSmall() {
    return this.fileUploaderLineHeight;
  }
  public static get fileUploaderLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get fileUploaderLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get fileUploaderPaddingYSmall() {
    return this.fileUploaderPaddingY;
  }
  public static get fileUploaderPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get fileUploaderPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static get fileUploaderTextColorDefault() {
    return this.textColorDefault;
  }
  public static fileUploaderPaddingX = '7px';
  public static get fileUploaderPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static fileUploaderBorderRadius = '2px';
  public static fileUploaderBorderColor = 'rgba(0, 0, 0, 0.37)';
  public static get fileUploaderBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get fileUploaderDisabledBorder() {
    return `${this.fileUploaderBorderWidth} solid ${this.fileUploaderDisabledBorderColor}`;
  }
  public static fileUploaderBorderStyle = 'dashed';
  public static get fileUploaderBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get fileUploaderLinkColor() {
    return this.linkColor;
  }
  public static fileUploaderAfterLinkColor = '';
  public static fileUploaderIconSize = '14px';
  public static fileUploaderIconColor = '#808080';
  public static fileUploaderIconHoverColor = '#333';
  public static get fileUploaderBorderColorError() {
    return this.borderColorError;
  }
  public static get fileUploaderBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static fileUploaderDisabledBg = '#f2f2f2';
  public static fileUploaderDisabledBgClip = '';
  public static fileUploaderDisabledBorderColor = '#f2f2f2';
  public static fileUploaderDisabledTextColor = '#808080';
  public static fileUploaderDisabledLinkColor = '#808080';
  public static fileUploaderDisabledIconColor = '#A0A0A0';
  public static get fileUploaderLinkHoverTextDecoration() {
    return this.linkHoverTextDecoration;
  }
  public static fileUploaderHoveredBg = 'none';
  public static fileUploaderHoveredBorderColor = '';
  public static fileUploaderIconGapSmall = '4px';
  public static fileUploaderIconGapMedium = '6px';
  public static fileUploaderIconGapLarge = '8px';

  public static get fileUploaderDragOverBorderColor() {
    return this.borderColorFocus;
  }
  public static fileUploaderDragOverShadow = '0px 0px 0px 3px #2da4f9, 0px 0px 0px 8px rgba(45, 164, 249, 0.35)';
  //#endregion

  //#region CloseIcon
  public static closeBtnIconColor = 'rgba(0, 0, 0, 0.32)';
  public static closeBtnIconDisabledColor = '#8b8b8b';
  public static closeBtnIconHoverColor = 'rgba(0, 0, 0, 0.865)';
  public static closeBtnIconBorderRadius = '4px';
  public static get closeBtnIconFocusShadow() {
    return `inset 0 0 0 1px ${this.borderColorFocus}, inset 0 0 0 2px ${this.outlineColorFocus}`;
  }
  //#endregion

  //#region InternalMenu
  public static internalMenuPaddingY = '5px'; // deprecated,  use menuLegacyPaddingY
  //#endregion

  //#region Autocomplete
  public static autocompleteMenuOffsetY = '2px';
  //#endregion

  //#region Combobox
  public static comboboxMenuOffsetY = '2px';
  //#endregion

  //#region MiniModal
  public static miniModalHeaderPaddingBottom = '0';
  public static miniModalBodyPaddingTop = '16px';
  public static miniModalBodyPaddingBottom = '0';
  public static miniModalHeaderPaddingTop = '32px';
  public static miniModalActionGap = '8px';
  public static miniModalCancelIndent = '8px';
  public static miniModalFooterPaddingTop = '24px';
  public static miniModalFooterPaddingBottom = '32px';
  public static miniModalTitleMarginTop = '16px';
  public static miniModalHeightMobile = 'auto';
  public static miniModalMarginTopMobile = '80px';
  public static miniModalMarginLeftMobile = '24px';
  public static miniModalMarginRightMobile = '24px';
  public static miniModalFooterPaddingMobile = '24px 16px 16px';
  public static miniModalHeaderPaddingMobile = '32px 16px 0';
  public static miniModalBodyPaddingMobile = '16px 16px 0';
  //#endregion
}

export const DefaultThemeInternal = exposeGetters(DefaultTheme);
