import { createTheme } from '../../lib/theming/ThemeHelpers';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

export class BasicThemeClass {
  //#region Common variables
  public static baseFontFamily = '"Lab Grotesque", "Lab Grotesque K", Arial, sans-serif';
  public static labGrotesqueBaselineCompensation = '1';
  public static brand = '#2291ff';
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

  public static bgDefault = '#fff';
  public static get bgSecondary() {
    return this.bgDefault;
  }
  public static bgDisabled = '#F0F0F0';
  public static get errorMain() {
    return this.red;
  }
  public static get errorText() {
    return this.redDark;
  }
  public static get errorSecondary() {
    return this.redXxLight;
  }
  public static warningMain = '#fcb73e';
  public static warningSecondary = '#fff0bc';
  public static warningText = '#d97e00';
  public static borderColorFocusLight = '#cdedff';
  public static borderColorGrayDark = 'rgba(0, 0, 0, 0.28)';
  public static borderColorGrayLight = 'rgba(0, 0, 0, 0.16)';
  public static borderColorDisabled = 'rgba(0, 0, 0, 0.10)';
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
  public static fixedPanelShadow = 'none';
  public static bgActive = '#141414';
  public static bgChecked = '#3D3D3D';
  public static borderColorFocus = '#3D3D3D';
  public static get borderColorError() {
    return this.errorMain;
  }
  public static get borderColorWarning() {
    return this.warningMain;
  }
  public static controlHeightSmall = '32px';
  public static controlHeightMedium = '40px';
  public static controlHeightLarge = '48px';
  public static mobileMediaQuery = '(max-width: 576px) and (pointer: coarse)';

  public static transitionDuration = '100ms';
  public static transitionTimingFunction = 'cubic-bezier(0.5, 1, 0.89, 1)';
  //#endregion Common variables
  //#region Link
  public static linkColor = '#222222';
  public static linkTextDecoration = 'underline';

  public static get linkHoverColor() {
    return this.linkColor;
  }
  public static linkActiveColor = '#141414';
  public static linkHoverTextDecoration = 'none';

  public static get linkSuccessColor() {
    return this.green;
  }
  public static get linkSuccessHoverColor() {
    return this.greenDark;
  }
  public static linkSuccessActiveColor = '#167333';

  public static get linkDangerColor() {
    return this.errorText;
  }
  public static linkDangerHoverColor = '#BB1919';
  public static linkDangerActiveColor = '#AB0D0D';

  public static linkIconMarginRight = '4px';
  public static linkIconMarginLeft = '4px';

  public static get linkDisabledColor() {
    return this.textColorDisabled;
  }
  public static linkGrayedColor = '#858585';
  public static linkGrayedHoverColor = '#292929';
  public static linkGrayedActiveColor = '#141414';

  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';

  public static linkTextDecorationStyle = 'solid';
  public static linkTextDecorationThickness = '1px';
  public static linkTextUnderlineOffset = '4px';
  public static get linkHoverTextDecorationStyle() {
    return this.linkTextDecorationStyle;
  }
  public static linkTextUnderlineOpacity = '0.5';
  public static linkTextDecorationColor = `color-mix(in srgb, currentColor ${
    parseFloat(this.linkTextUnderlineOpacity) * 100
  }%, transparent)`;
  public static linkLineBorderBottomStyle = 'solid';
  public static get linkLineHoverBorderBottomStyle() {
    return this.linkLineBorderBottomStyle;
  }
  public static linkLineBorderBottomWidth = '1px';
  public static linkLineBorderBottomOpacity = '0.5';
  public static linkLineBorderBottomColor = `color-mix(in srgb, currentColor ${
    parseFloat(this.linkLineBorderBottomOpacity) * 100
  }%, transparent)`;

  public static linkFocusOutlineColor = '#3D3D3D';
  public static get linkFocusOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get linkFocusOutline() {
    return `${this.linkFocusOutlineWidth} solid ${this.linkFocusOutlineColor}`;
  }

  //#endregion Link
  //#region Token
  public static tokenDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static get tokenTextColorDisabled() {
    return this.textColorDisabled;
  }

  public static get tokenFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get tokenFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get tokenFontSizeLarge() {
    return this.fontSizeLarge;
  }

  public static tokenMarginYSmall = '2px';
  public static tokenMarginXSmall = '1px';
  public static tokenMarginYMedium = '2px';
  public static tokenMarginXMedium = '2px';
  public static tokenMarginYLarge = '2px';
  public static tokenMarginXLarge = '3px';

  public static get tokenLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get tokenLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get tokenLineHeightLarge() {
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
  public static get tokenBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get tokenBorderColorError() {
    return this.borderColorError;
  }
  public static tokenOutlineWidth = '1px';

  public static get tokenPaddingYDisabled() {
    return this.tokenPaddingYSmall;
  }
  public static get tokenPaddingXDisabled() {
    return this.tokenPaddingXSmall;
  }

  public static get tokenMarginYDisabled() {
    return this.tokenMarginYSmall;
  }
  public static get tokenMarginXDisabled() {
    return this.tokenMarginXSmall;
  }

  public static tokenShadowDisabled = '';

  public static tokenBg = 'rgba(0, 0, 0, 0.1)';
  public static tokenColor = '#222222';
  public static tokenBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static tokenBgHover = 'rgba(0, 0, 0, 0.16)';
  public static tokenColorHover = '#222222';
  public static tokenBorderColorHover = 'rgba(0, 0, 0, 0.16)';
  public static tokenBgActive = '#3D3D3D';
  public static tokenColorActive = '#FFFFFF';
  public static tokenBorderColorActive = 'transparent';

  //#endregion Token
  //#region TokenInput

  public static get tokenInputLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get tokenInputLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get tokenInputLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
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
  public static tokenInputBorderRadius = '2px';
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
  public static loaderBg = 'rgba(255, 255, 255, 0.8)';
  public static loaderOpacity = '0.8';
  public static loaderBorderRadius = '0px';
  //#endregion
  //#region Button
  public static btnBackgroundClip = 'padding-box';
  public static btnLinkBorderRadius = '2px';
  public static btnFocusShadowWidth = '2px';
  public static btnBorderColorTransition = '';
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.10)';
  public static btnCheckedBg = '#3D3D3D';
  public static btnCheckedDisabledBg = '#ADADAD';
  public static btnCheckedDisabledColor = '#E6E6E6';
  public static btnCheckedTextColor = '#fff';
  public static get btnCheckedDisabledBorderColor() {
    return this.btnCheckedDisabledBg;
  }
  public static btnCheckedShadow = 'none';
  public static btnCheckedDisabledShadow = 'none';

  public static btnBorderRadiusSmall = '8px';
  public static btnBorderRadiusMedium = '8px';
  public static btnBorderRadiusLarge = '8px';

  public static get btnBorderWidth() {
    return this.controlBorderWidth;
  }
  public static btnInsetWidth = '1px';
  public static get btnOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static btnPaddingXSmall = '12px';
  public static btnPaddingXMedium = '16px';
  public static btnPaddingXLarge = '20px';

  public static btnIconGapSmallLeft = '4px';
  public static get btnIconGapSmallRight() {
    return this.btnIconGapSmallLeft;
  }

  public static btnIconGapMediumLeft = '6px';
  public static get btnIconGapMediumRight() {
    return this.btnIconGapMediumLeft;
  }

  public static btnIconGapLargeLeft = '8px';
  public static get btnIconGapLargeRight() {
    return this.btnIconGapLargeLeft;
  }

  public static btnIconSizeSmall = '16px';
  public static btnIconSizeMedium = '20px';
  public static btnIconSizeLarge = '24px';
  public static btnDefaultBg = '#fff';
  public static btnDefaultBgStart = 'none';
  public static btnDefaultBgEnd = 'none';
  public static get btnDefaultCheckedBorderColor() {
    return this.btnCheckedBg;
  }
  public static get btnDefaultTextColor() {
    return this.textColorDefault;
  }
  public static btnDefaultHoverBg = '#F0F0F0';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#E6E6E6';
  public static get btnDefaultHoverBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultHoverTextColor = '';
  public static get btnDefaultActiveBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultActiveShadow = 'none';
  public static btnSuccessBg = '#26AD50';
  public static btnSuccessBorderColor = '#26AD50';
  public static btnSuccessHoverBg = '#23A14A';
  public static btnSuccessHoverBorderColor = '#23A14A';
  public static btnSuccessHoverTextColor = '';
  public static btnSuccessBgStart = 'none';
  public static btnSuccessBgEnd = 'none';
  public static btnSuccessTextColor = '#fff';
  public static btnSuccessHoverBgStart = 'none';
  public static btnSuccessHoverBgEnd = 'none';
  public static btnSuccessActiveBg = '#209644';
  public static btnSuccessActiveBorderColor = '#209644';
  public static btnSuccessActiveShadow = 'none';

  public static btnPrimaryBg = '#3D3D3D';
  public static btnPrimaryHoverBg = '#292929';
  public static btnPrimaryActiveBg = '#141414';

  public static btnPrimaryHoverTextColor = '';
  public static btnPrimaryBorderColor = '#3D3D3D';
  public static btnPrimaryHoverBorderColor = '#292929';
  public static btnPrimaryActiveBorderColor = '#141414';

  public static btnPrimaryBgStart = 'none';
  public static btnPrimaryBgEnd = 'none';
  public static btnPrimaryTextColor = '#fff';
  public static btnPrimaryHoverBgStart = 'none';
  public static btnPrimaryHoverBgEnd = 'none';
  public static btnPrimaryActiveShadow = 'none';
  public static get btnDangerBg() {
    return this.errorMain;
  }
  public static get btnDangerBorderColor() {
    return this.btnDangerBg;
  }

  public static btnDangerHoverBg = '#ED3F3F';
  public static btnDangerHoverBorderColor = '#ED3F3F';

  public static btnDangerHoverTextColor = '';
  public static btnDangerBgStart = 'none';
  public static btnDangerBgEnd = 'none';
  public static btnDangerTextColor = '#fff';
  public static btnDangerHoverBgStart = 'none';
  public static btnDangerHoverBgEnd = 'none';
  public static btnDangerActiveBg = '#DD3333';
  public static get btnDangerActiveBorderColor() {
    return this.btnDangerActiveBg;
  }

  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = '#fcb73e';
  public static btnPayHoverBg = '#fda70c';
  public static btnPayHoverBorderColor = '#fda70c';
  public static btnPayHoverTextColor = '';
  public static btnPayBorderColor = '#fcb73e';
  public static btnPayBgStart = 'none';
  public static btnPayBgEnd = 'none';
  public static get btnPayTextColor() {
    return this.textColorDefault;
  }
  public static btnPayHoverBgStart = 'none';
  public static btnPayHoverBgEnd = 'none';
  public static btnPayActiveBg = '#f69912';
  public static btnPayActiveBorderColor = '#f69912';
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
  public static btnDisabledBg = 'rgba(0, 0, 0, 0.06)';

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
  public static get btnLinkTextDecorationColor() {
    return this.linkTextDecorationColor;
  }
  public static get btnLinkTextDecorationStyle() {
    return this.linkTextDecorationStyle;
  }
  public static get btnLinkHoverTextDecorationStyle() {
    return this.linkTextDecorationStyle;
  }
  public static get btnLinkTextUnderlineOffset() {
    return this.linkTextUnderlineOffset;
  }
  public static get btnLinkTextDecorationThickness() {
    return this.linkTextDecorationThickness;
  }
  public static get btnLinkTextUnderlineOpacity() {
    return this.linkTextUnderlineOpacity;
  }
  public static get btnLinkLineBorderBottomStyle() {
    return this.linkLineBorderBottomStyle;
  }
  public static get btnLinkHoverLineBorderBottomStyle() {
    return this.btnLinkLineBorderBottomStyle;
  }
  public static get btnLinkLineBorderBottomWidth() {
    return this.linkLineBorderBottomWidth;
  }
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
    return this.textColorDisabled;
  }
  public static btnBacklessBg = 'transparent';
  public static btnBacklessHoverBg = 'rgba(0, 0, 0, 0.06)';
  public static btnBacklessActiveBg = 'rgba(0, 0, 0, 0.1)';
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

  public static btnTextBg = 'transparent';
  public static btnTextHoverBg = 'rgba(0, 0, 0, 0.06)';
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

  /** @deprecated use btnWithIconPadding[Small/Medium/Large] instead */
  public static get btnWithIconPaddingLeftSmall() {
    return this.btnWithIconPaddingSmall;
  }
  public static get btnWithIconPaddingLeftMedium() {
    return this.btnWithIconPaddingMedium;
  }
  public static get btnWithIconPaddingLeftLarge() {
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
  public static get selectDefaultBg() {
    return this.inputBg;
  }
  public static selectPlaceholderColor = '#adadad';
  public static get selectBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get selectPlaceholderColorDisabled() {
    return this.textColorDisabled;
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
    return this.inputBorderRadiusSmall;
  }
  public static get selectBorderRadiusMedium() {
    return this.inputBorderRadiusMedium;
  }
  public static get selectBorderRadiusLarge() {
    return this.inputBorderRadiusLarge;
  }
  public static get selectIconGapSmall() {
    return this.inputIconGapSmall;
  }
  public static get selectIconGapMedium() {
    return this.inputIconGapMedium;
  }
  public static get selectIconGapLarge() {
    return this.inputIconGapLarge;
  }

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
  public static get selectMenuArrowColor() {
    return this.btnMenuArrowColor;
  }
  public static get selectMenuArrowColorDisabled() {
    return this.textColorDisabled;
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
    return this.inputDisabledBg;
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

  //#endregion Select
  //#region Tooltip
  /** @deprecated Эта переменная устарела при появлении размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipPaddingYSmall `tooltipPaddingYSmall`} */
  public static tooltipPaddingY = '16px';
  /** @deprecated Эта переменная устарела при появлении размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipPaddingXSmall `tooltipPaddingXSmall`} */
  public static tooltipPaddingX = '16px';
  public static tooltipPaddingYSmall = '16px';
  public static tooltipPaddingXSmall = '16px';
  public static tooltipPaddingYMedium = '20px';
  public static tooltipPaddingXMedium = '20px';
  public static tooltipPaddingYLarge = '24px';
  public static tooltipPaddingXLarge = '24px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipCloseBtnPaddingSmall `tooltipCloseBtnPaddingSmall`} */
  public static tooltipCloseBtnPadding = '4px';
  public static tooltipCloseBtnPaddingSmall = '4px';
  public static tooltipCloseBtnPaddingMedium = '6px';
  public static tooltipCloseBtnPaddingLarge = '8px';
  public static tooltipCloseBtnSide = '16px';
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.32)';
  public static tooltipCloseBtnHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static get tooltipTextColor() {
    return this.textColorDefault;
  }
  public static tooltipBg = '#fff';
  public static get tooltipBorder() {
    return this.popupBorder;
  }
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipBorderRadiusSmall `tooltipBorderRadiusSmall`} */
  public static tooltipBorderRadius = '8px';
  public static tooltipBorderRadiusSmall = '8px';
  public static tooltipBorderRadiusMedium = '10px';
  public static tooltipBorderRadiusLarge = '12px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipPinOffsetYSmall `tooltipPinOffsetYSmall`} */
  public static tooltipPinOffsetY = '18px';
  public static tooltipPinOffsetYSmall = '18px';
  public static tooltipPinOffsetYMedium = '21px';
  public static tooltipPinOffsetYLarge = '24px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipPinOffsetXSmall `tooltipPinOffsetXSmall` */
  public static tooltipPinOffsetX = '16px';
  public static tooltipPinOffsetXSmall = '16px';
  public static tooltipPinOffsetXMedium = '20px';
  public static tooltipPinOffsetXLarge = '24px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipMarginSmall `tooltipMarginSmall`} */
  public static tooltipMargin = '10px';
  public static tooltipMarginSmall = '10px';
  public static tooltipMarginMedium = '12px';
  public static tooltipMarginLarge = '14px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipPinSizeSmall `tooltipPinSizeSmall`} */
  public static get tooltipPinSize() {
    return this.popupPinSize;
  }
  public static tooltipPinSizeSmall = '8px';
  public static tooltipPinSizeMedium = '10px';
  public static tooltipPinSizeLarge = '12px';
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipFontSizeSmall `tooltipFontSizeSmall`} */
  public static get tooltipFontSize() {
    return this.fontSizeSmall;
  }
  public static get tooltipFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get tooltipFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get tooltipFontSizeLarge() {
    return this.fontSizeLarge;
  }
  /** @deprecated Переменная устарела с появлением размеров у `Tooltip` и будет удалена в `6.0`.
   * @see {@link tooltipLineHeightSmall `tooltipLineHeightSmall`} */
  public static get tooltipLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get tooltipLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get tooltipLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get tooltipLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  //#endregion Tooltip
  //#region TooltipMenu
  public static get tooltipMenuPinOffsetX() {
    return this.tooltipPinOffsetX;
  }
  public static get tooltipMenuPinOffsetY() {
    return this.tooltipPinOffsetY;
  }
  public static get tooltipMenuMargin() {
    return this.popupMargin;
  }
  public static get tooltipMenuPinSize() {
    return this.popupPinSize;
  }

  //#endregion
  //#region Kebab
  public static kebabMargin = '4px';
  public static kebabBackground = 'transparent';
  public static kebabBackgroundHover = 'rgba(0, 0, 0, 0.06)';
  public static kebabBackgroundActive = 'rgba(0, 0, 0, 0.10)';
  public static kebabBorderRadius = '50%';
  public static kebabBorder = '2px solid transparent';
  public static kebabSizeSmall = '24px';
  public static kebabSizeMedium = '32px';
  public static kebabSizeLarge = '40px';
  public static kebabIconSizeSmall = '16px';
  public static kebabIconSizeMedium = '20px';
  public static kebabIconSizeLarge = '24px';
  public static kebabIconColor = '#757575';

  //#endregion
  //#region Modal
  public static modalWindowShadow = '0px 16px 32px 0px rgba(0, 0, 0, 0.06)';
  public static modalBackBg = '#000';
  public static get modalBg() {
    return this.bgSecondary;
  }
  public static modalBackOpacity = '0.16';
  public static modalCloseButtonColor = 'rgba(0, 0, 0, 0.32)';
  public static modalCloseButtonDisabledColor = '#8b8b8b';
  public static modalCloseButtonHoverColor = 'rgba(0, 0, 0, 0.865)';
  public static modalCloseButtonPadding = '32px';
  public static modalCloseButtonBottomPadding = '20px';
  /** @deprecated use modalCloseButtonClickArea[Top/Bottom/Left/Right] instead */
  public static modalCloseButtonClickArea = '6px';
  public static modalCloseButtonClickAreaTop = '6px';
  public static modalCloseButtonClickAreaBottom = '6px';
  public static modalCloseButtonClickAreaLeft = '6px';
  public static modalCloseButtonClickAreaRight = '6px';
  public static modalCloseIconSize = '20px';
  public static modalBorderRadius = '16px';
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
  public static get modalFooterBg() {
    return this.modalBg;
  }
  public static modalAdaptiveThreshold = '425px';
  public static modalPaddingTop = '24px';
  public static modalPaddingLeft = '32px';
  public static modalPaddingRight = '32px';
  public static modalHeaderFontSize = '24px';
  public static modalHeaderFontWeight = '700';
  public static get modalHeaderTextColor() {
    return this.textColorDefault;
  }
  public static modalHeaderLineHeight = '32px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalHeaderPaddingTop = '24px';
  public static get modalHeaderAdditionalPaddingBottom() {
    return this.modalHeaderPaddingBottom;
  }
  public static modalFixedHeaderMarginBottom = '0px';
  public static get modalFixedHeaderPaddingBottom() {
    return this.modalHeaderPaddingBottom;
  }
  public static get modalFixedFooterPaddingTop() {
    return this.modalFooterPanelPaddingTop;
  }
  public static modalFixedFooterMarginTop = '0px';

  public static modalSeparatorBorderBottom = '1px solid #E6E6E6';
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
  public static get modalFooterPanelPaddingBottom() {
    return this.modalFooterPaddingBottom;
  }
  public static mobileModalCloseButtonRightPadding = '16px';
  public static mobileModalCloseButtonTopPadding = '8px';
  public static mobileModalCloseButtonClickArea = '16px';
  public static mobileModalWithoutHeaderCloseButtonPadding = '10px';
  public static get mobileModalWithoutHeaderCloseButtonWidth() {
    return `${parseInt(this.modalCloseIconSize) + 2 * parseInt(this.mobileModalWithoutHeaderCloseButtonPadding)}px`;
  }
  public static mobileModalCloseIconSize = '20px';
  public static mobileModalHeaderFontSize = '24px';
  public static mobileModalHeaderLineHeight = '32px';
  public static mobileModalHeaderPadding = '16px';
  public static mobileModalBodyPadding = '0 16px 16px 16px';
  public static mobileModalBodyPaddingTop = '16px';
  public static mobileModalBodyPaddingBottom = '16px';
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
  public static get sidePageFooterPanelBg() {
    return this.sidePageBgDefault;
  }
  public static sidePageBackingBg = '#000';
  public static sidePageBackingBgOpacity = '0.16';
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
  public static sidePageFooterPaddingTop = '20px';
  public static sidePageFooterPaddingBottom = '20px';
  public static sidePageBgDefault = '#fff';
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
  public static sidePageHeaderStickyOffset = '9px';
  /** @deprecated use sidePageCloseButtonClickAreaLeft and sidePageCloseButtonClickAreaRight instead */
  public static sidePageCloseButtonPadding = '32px';
  public static mobileSidePageCloseButtonPadding = '16px';
  public static get sidePageFooterPanelPaddingTop() {
    return this.sidePageFooterPaddingTop;
  }
  public static get sidePageFooterPanelPaddingBottom() {
    return this.sidePageFooterPanelPaddingTop;
  }
  public static sidePageCloseIconSize = '20px';
  /** @deprecated use sidePageCloseButtonClickArea[Top/Bottom/Left/Right] instead */
  public static sidePageCloseButtonClickArea = '6px';
  public static sidePageCloseButtonClickAreaTop = '6px';
  public static sidePageCloseButtonClickAreaBottom = '6px';
  public static sidePageCloseButtonClickAreaLeft = '6px';
  public static sidePageCloseButtonClickAreaRight = '6px';
  public static get sidePageCloseButtonFixedClickAreaTop() {
    return this.sidePageCloseButtonFixedClickAreaBottom;
  }
  public static sidePageCloseButtonFixedClickAreaBottom = '14px';
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
  /** @deprecated use mobileSidePageCloseButtonPadding instead */
  public static mobileSidePageCloseButtonRightPadding = '12px';
  public static sidePageHeaderFontWeight = 'bold';
  public static sidePageCloseButtonWrapperOffsetTop = '4px';
  public static sidePageCloseButtonWrapperFixedOffsetTop = '4px';
  //#endregion SidePage
  //#region DateInput
  public static get dateInputIconColor() {
    return this.textColorDefault;
  }
  public static dateInputMaskColor = '#b8b8b8';
  public static dateInputComponentSelectedBgColor = '';
  public static dateInputComponentSelectedTextColor = '';
  //#endregion DateInput
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
  public static calendarBorderRadius = '8px';
  public static get calendarCellBg() {
    return this.bgSecondary;
  }
  public static calendarCellHoverColor = '';
  public static calendarCellActiveHoverColor = '';
  public static get calendarCellWeekendColor() {
    return this.errorText;
  }
  public static calendarCellTodayBorder = '1px solid';
  public static calendarCellBorderRadius = '9999px';
  public static calendarCellSelectedBgColor = '#E6E6E6';
  public static calendarCellSelectedFontColor = 'inherit';
  public static calendarCellHeight = '32px';
  public static get calendarCellWidth() {
    return this.calendarCellHeight;
  }
  public static calendarCellFontSize = '14px';
  public static get calendarCellLineHeight() {
    return `${parseInt(this.calendarCellHeight) - 2}px`;
  }
  public static get calendarMonthHeaderStickedBgColor() {
    return this.bgSecondary;
  }
  public static calendarMonthTitleBorderBottomColor = '#dfdede';
  public static calendarCellHoverBgColor = '#F0F0F0';
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
  public static get datePickerOpenBtnColor() {
    return this.textColorDefault;
  }
  public static get datePickerMenuOffsetY() {
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
  public static rangeCalendarCellBg = '#f0f0f0';
  public static rangeCalendarCellEndBg = '#1e1e1e';
  public static rangeCalendarCellEndColor = 'white';
  public static rangeCalendarCellHoverBg = 'rgba(0, 0, 0, 0.1)';
  public static rangeCalendarWrapperHeight = '450px';

  public static mobileRangeCalendarCellHeight = '42px';
  public static mobileRangeCalendarCellWidth = '42px';
  public static mobileRangeCalendarGridRowSpacing = '0px';
  public static mobileRangeCalendarWrapperHeight = '400px';
  //#endregion

  //#region DateSelect
  public static get dateSelectMenuBg() {
    return this.bgSecondary;
  }
  public static dateSelectMenuItemBgActive = '#F0F0F0';
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
  public static dateSelectTextColorInvert = '';
  public static mobileDateSelectFontSize = '16px';
  public static mobileDateSelectLineHeight = '20px';
  //#endregion DateSelect
  //#region Paging
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0`
   * @see {@link pagingFontSizeSmall `pagingFontSizeSmall`} */
  public static get pagingFontSize() {
    return this.fontSizeMedium;
  }
  public static get pagingFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get pagingFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get pagingFontSizeLarge() {
    return this.fontSizeLarge;
  }
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0`
   * @see {@link pagingLineHeightSmall `pagingLineHeightSmall`} */
  public static pagingLineHeight = '22px';
  public static get pagingLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get pagingLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get pagingLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static pagingPageLinkBoxSizing = 'border-box';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static pagingPageLinkMinWidth = '0.75em';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0`
   * @see {@link pagingPageLinkPaddingYSmall `pagingPageLinkPaddingYSmall`} */
  public static pagingPageLinkPaddingY = '0.3125em';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0`
   * @see {@link pagingPageLinkPaddingXSmall `pagingPageLinkPaddingXSmall`} */
  public static pagingPageLinkPaddingX = '12px';
  public static pagingPageLinkPaddingYSmall = '6px';
  public static pagingPageLinkPaddingXSmall = '11.5px';
  public static pagingPageLinkPaddingYMedium = '9px';
  public static pagingPageLinkPaddingXMedium = '15px';
  public static pagingPageLinkPaddingYLarge = '12px';
  public static pagingPageLinkPaddingXLarge = '18.5px';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static pagingPageLinkMargin = '0px 1px';
  public static pagingPageLinkBorderRadius = '9999px';
  public static get pagingPageLinkColor() {
    return this.textColorDefault;
  }
  public static get pagingPageLinkActiveColor() {
    return this.textColorDefault;
  }
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.1)';
  public static pagingPageLinkDisabledActiveBg = 'rgba(0, 0, 0, 0.04)';
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.06)';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static pagingPageForwardLinkMarginTop = '';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static pagingPageForwardLinkMarginLeft = '0px';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static get pagingPageForwardLinkPaddingRight() {
    return this.pagingPageLinkPaddingX;
  }
  public static pagingForwardLinkPaddingSmall = '6px 8px 6px 12px';
  public static pagingForwardLinkPaddingMedium = '9px 12px 9px 16px';
  public static pagingForwardLinkPaddingLarge = '12px 16px 12px 20px';
  public static pagingForwardLinkPaddingMediumMobile = '10px';
  public static pagingForwardLinkPaddingLargeMobile = '12px';
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0` */
  public static get pagingForwardIconSize() {
    return this.pagingFontSize;
  }
  public static get pagingForwardLinkColor() {
    return this.textColorDefault;
  }
  public static get pagingForwardLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  /** @deprecated Это переменная старого размера `Paging` и будет удалена в `6.0`
   * @see {@link pagingDotsPaddingSmall `pagingDotsPaddingSmall`} */
  public static pagingDotsPadding = '0.375em 0.625em 0';
  public static pagingDotsPaddingSmall = '11px 8px 5px 8px';
  public static pagingDotsPaddingMedium = '14px 12px 10px 12px';
  public static pagingDotsPaddingLarge = '19px 16px 13px 16px';
  public static pagingDotsColor = '#ADADAD';
  public static get pagingDotsDisabledColor() {
    return this.textColorDisabled;
  }
  public static pagingPageLinkHintFontSize = '12px';
  public static pagingPageLinkHintLineHeight = '16px';
  public static pagingPageLinkHintMargin = '4px -20px 0px';
  public static get pagingPageLinkHintColor() {
    return this.placeholderColor;
  }
  //#endregion Paging
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
  public static hintPaddingY = '4px';
  public static hintPaddingX = '8px';
  public static hintTextAlign = 'center';
  public static hintBgColor = 'rgba(0, 0, 0, 0.76)';
  public static hintBorder = 'none';
  public static hintBorderRadius = '6px';
  public static hintMargin = '8px';

  //#endregion Hint
  //#region Toast
  public static get toastFontSize() {
    return this.fontSizeSmall;
  }
  public static get toastLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static toastPaddingY = '10px';
  public static toastPaddingX = '16px';
  public static toastBorderRadius = '8px';
  public static toastBorder = 'none';
  public static toastTop = '24px';
  public static toastBg = 'rgba(0, 0, 0, 0.76)';
  public static toastErrorBg = '#F63B3F';
  public static toastColor = 'white';
  public static toastColorError = '#fff';
  public static toastLinkColor = '#fff';
  public static toastLinkColorError = '#fff';
  public static toastLinkTextDecorationHover = '';
  public static toastLinkBgHover = 'rgba(255, 255, 255, 0.12)';
  public static toastLinkBgHoverError = 'rgba(255, 255, 255, 0.08)';
  public static toastLinkBgActive = 'rgba(0, 0, 0, 0.87)';
  public static toastLinkBgActiveError = 'rgba(255, 255, 255, 0.04)';
  public static toastLinkColorActiveError = 'rgba(255, 255, 255, 0.64)';
  public static toastLinkPadding = '12px';
  public static toastClosePadding = '16px';
  public static toastCloseColor = 'rgba(255, 255, 255, 0.6)';
  public static toastCloseColorError = 'rgba(255, 255, 255, 0.6)';
  public static toastCloseHoverColor = 'white';
  public static toastCloseHoverColorError = 'white';
  public static toastCloseSize = '16px';

  //#endregion Toast
  //#region Dropdown
  public static dropdownMenuBorderColorTransition = '';
  public static get dropdownMenuHoverBorderColor() {
    return this.btnDefaultHoverBorderColor;
  }
  public static get dropdownMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static get dropdownMenuMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static dropdownMenuMenuBoxSizing = 'content-box';
  public static dropdownButtonBorderRadiusSmall = '8px';
  public static dropdownButtonBorderRadiusMedium = '8px';
  public static dropdownButtonBorderRadiusLarge = '8px';

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
    return this.btnPaddingXSmall;
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
    return this.btnPaddingXMedium;
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
    return this.btnPaddingXLarge;
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
  //#endregion Dropdown
  //#region Menu
  public static get menuBgDefault() {
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
  public static get menuItemTextColor() {
    return this.textColorDefault;
  }
  public static menuItemSelectedBg = '#E6E6E6';
  public static menuItemHoverBg = '#F0F0F0';

  public static menuItemIconWidthSmall = '16px';
  public static menuItemIconWidthMedium = '20px';
  public static menuItemIconWidthLarge = '24px';
  public static menuItemIconGap = '4px';

  public static get menuItemPaddingForIconSmall() {
    return `${
      parseInt(this.menuItemPaddingXSmall) + parseInt(this.menuItemIconWidthSmall) + parseInt(this.menuItemIconGap)
    }px`;
  }
  public static get menuItemPaddingForIconMedium() {
    return `${
      parseInt(this.menuItemPaddingXMedium) + parseInt(this.menuItemIconWidthMedium) + parseInt(this.menuItemIconGap)
    }px`;
  }
  public static get menuItemPaddingForIconLarge() {
    return `${
      parseInt(this.menuItemPaddingXLarge) + parseInt(this.menuItemIconWidthLarge) + parseInt(this.menuItemIconGap)
    }px`;
  }

  public static get menuItemLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get menuItemLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get menuItemLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  public static get menuItemFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get menuItemFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get menuItemFontSizeLarge() {
    return this.fontSizeLarge;
  }

  public static menuItemPaddingXSmall = '8px';
  public static menuItemPaddingYSmall = '6px';

  public static menuItemPaddingXMedium = '12px';
  public static menuItemPaddingYMedium = '9px';

  public static menuItemPaddingXLarge = '16px';
  public static menuItemPaddingYLarge = '12px';

  public static menuItemBorderRadius = '6px';
  public static get menuItemHoverColor() {
    return this.menuItemTextColor;
  }
  /**
   * @deprecated
   */
  public static get menuItemLinkColor() {
    return this.linkColor;
  }
  public static get menuItemCommentColor() {
    return this.menuItemTextColor;
  }
  public static menuItemCommentOpacity = '0.6';
  public static menuItemCommentOpacityHover = '0.6';
  public static get menuItemCommentColorHover() {
    return this.menuItemTextColor;
  }
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

  public static get menuMessageLineHeightMobile() {
    return this.menuItemLineHeightMobile;
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
  public static menuItemGap = '1px';

  //menuHeader
  public static menuHeaderColor = '#757575';

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

  //menuSeparator
  public static menuSeparatorBorderColor = '#ebebeb';
  public static menuSeparatorMarginY = '2px';
  public static menuSeparatorMarginX = '8px';
  public static menuSeparatorBorderWidth = '1px';
  // mobileMenuSeparator
  public static mobileMenuSeparatorMarginY = '4px';
  public static mobileMenuSeparatorMarginX = '24px';
  //#endregion Menu
  //#region Toggle
  public static get toggleLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get toggleLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get toggleLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get toggleFontSizeSmall() {
    return this.fontSizeSmall;
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
  public static toggleHandleActiveWidthIncrement = '0px';
  public static get toggleHandleBorderRadiusSmall() {
    const height = parseInt(this.toggleHeightSmall, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
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

  public static toggleHeightSmall = '20px';
  public static toggleWidthSmall = '32px';

  public static toggleHeightMedium = '22px';
  public static toggleWidthMedium = '34px';

  public static toggleHeightLarge = '24px';
  public static toggleWidthLarge = '36px';

  public static get toggleBorderRadiusSmall() {
    return `calc(${this.toggleHeightSmall} * 0.5)`;
  }
  public static get toggleBorderRadiusMedium() {
    return `calc(${this.toggleHeightMedium} * 0.5)`;
  }
  public static get toggleBorderRadiusLarge() {
    return `calc(${this.toggleHeightLarge} * 0.5)`;
  }

  public static toggleBaseBg = '#fff';
  public static toggleBgHover = '#F0F0F0';

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

  public static toggleHandleSizeSmall = '14px';
  public static toggleHandleSizeMedium = '16px';
  public static toggleHandleSizeLarge = '18px';

  public static toggleHandleLeft = '3px';
  public static toggleHandleTop = '3px';

  public static toggleBgFocus = 'linear-gradient(-180deg, #f1f1f1, #dedede)';
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

  public static toggleContainerBg = '#FFFFFF';
  public static toggleHandleBg = '#FFFFFF';
  public static toggleHandleBoxShadow = '0 0 0 1px rgba(0, 0, 0, 0.16)';
  public static toggleContainerBoxShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.16)';

  // idle :hover
  public static toggleContainerBoxShadowHover = 'inset 0 0 0 1px rgba(0, 0, 0, 0.16)';
  public static toggleHandleBgHover = '#FFFFFF';
  public static toggleHandleBoxShadowHover = '0 0 0 1px rgba(0, 0, 0, 0.16)';
  public static get toggleContainerBgHover() {
    return this.toggleBgHover;
  }

  // checked
  public static toggleContainerBoxShadowChecked = 'none';
  public static toggleHandleBoxShadowChecked = 'none';
  public static toggleHandleBgChecked = '#FFFFFF';
  public static toggleBgChecked = '#3D3D3D';
  public static get toggleContainerBgChecked() {
    return this.toggleBgChecked;
  }
  public static toggleCheckedBg = '#fff';
  public static toggleCheckedBgHover = '#fff';

  // checked :hover
  public static toggleContainerBoxShadowCheckedHover = 'none';
  public static toggleContainerBgCheckedHover = '#292929';
  public static toggleHandleBoxShadowCheckedHover = 'none';
  public static toggleHandleBgCheckedHover = '#F0F0F0';

  // disabled
  public static toggleContainerBgDisabled = '#F0F0F0';
  public static toggleHandleBgDisabled = 'transparent';
  public static toggleContainerBoxShadowDisabled = 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)';
  public static toggleHandleBoxShadowDisabled = '0 0 0 1px rgba(0, 0, 0, 0.1)';
  public static toggleDisabledHandleBg = '#fff';
  public static get toggleBgDisabled() {
    return this.bgDisabled;
  }

  // disabled checked
  public static toggleContainerBgDisabledChecked = '#D6D6D6';
  public static toggleHandleBgDisabledChecked = '#F0F0F0';
  public static toggleContainerBoxShadowDisabledChecked = 'none';
  public static toggleHandleBoxShadowDisabledChecked = 'none';
  public static get toggleBorderColorDisabledChecked() {
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
  public static get popupTextColor() {
    return this.textColorDefault;
  }
  public static get popupBackground() {
    return this.bgSecondary;
  }
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
  public static inputIconColor = '#858585';
  public static get inputIconColorDisabled() {
    return this.textColorDisabled;
  }
  public static get inputFocusedIconColor() {
    return this.inputIconColor;
  }
  public static inputColor = 'inherit';
  public static inputWidth = '200px';
  public static get inputTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static get inputPlaceholderColorDisabled() {
    return this.textColorDisabled;
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
  public static inputIconGapMedium = '6px';
  public static inputIconGapLarge = '8px';

  public static inputIconSizeSmall = '16px';
  public static inputIconSizeMedium = '20px';
  public static inputIconSizeLarge = '24px';

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
  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';
  public static inputDisabledBackgroundClip = 'padding-box';
  public static inputBorderColor = 'rgba(0, 0, 0, 0.16)';

  public static inputBorderColorHover = 'rgba(0, 0, 0, 0.32)';
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
    return this.inputBorderColor;
  }
  public static get inputPlaceholderColor() {
    return this.placeholderColor;
  }

  public static get inputPlaceholderColorLight() {
    return this.placeholderColorLight;
  }
  public static inputBlinkColor = 'rgba(61, 61, 61, 0.2)';
  public static inputColorScheme = 'light';

  //#endregion Input
  //#region Checkbox
  public static get checkboxFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get checkboxFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get checkboxFontSizeLarge() {
    return this.fontSizeLarge;
  }

  public static get checkboxLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get checkboxLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get checkboxLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  public static checkboxBoxSizeSmall = '16px';
  public static checkboxBoxSizeMedium = '20px';
  public static checkboxBoxSizeLarge = '24px';
  public static checkboxCaptionGap = '8px';

  public static get checkboxPaddingYSmall() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
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
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.1)`;
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
  public static checkboxBorderRadius = '4px';
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
    return this.bgChecked;
  }
  public static get checkboxBgDisabled() {
    return this.bgDisabled;
  }
  public static checkboxCheckedHoverBg = '#292929';
  public static get checkboxCheckedActiveBg() {
    return ColorFunctions.darken(this.checkboxCheckedBg, '15%');
  }
  public static get checkboxShadowActive() {
    return `0 0 0 ${this.checkboxBorderWidth} #c3c3c3`;
  }
  //#endregion Checkbox
  //#region TextArea
  public static textareaBg = '#fff';
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
  public static textareaBackgroundClip = 'padding-box';

  public static get textareaFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get textareaFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get textareaFontSizeLarge() {
    return this.fontSizeLarge;
  }

  public static get textareaLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get textareaLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get textareaLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static textareaBorderRadius = '2px';
  public static get textareaBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get textareaOutlineWidth() {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${outlineWidth - borderWidth}px`;
  }

  public static get textareaMinHeightSmall() {
    const lineHeight = parseInt(this.textareaLineHeightSmall, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingYSmall, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;
    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
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
  public static textareaPaddingXSmall = '7px';

  public static textareaPaddingXMedium = '11px';
  public static textareaPaddingXLarge = '15px';

  public static get textareaPaddingYSmall() {
    return this.controlPaddingYSmall;
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

  public static get textareaDisabledBg() {
    return this.inputDisabledBg;
  }
  public static get textareaDisabledBorderColor() {
    return this.borderColorDisabled;
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
  public static textareaMargin = '';
  public static textareaVerticalAlign = 'middle';

  //#endregion Textarea
  //#region Radio
  public static radioBulletSizeSmall = '6px';
  public static radioBulletSizeMedium = '10px';
  public static radioBulletSizeLarge = '12px';
  public static get radioOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get radioTextColor() {
    return this.textColorDefault;
  }

  public static radioSizeSmall = '16px';
  public static radioSizeMedium = '20px';
  public static radioSizeLarge = '24px';

  public static get radioFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get radioFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get radioFontSizeLarge() {
    return this.fontSizeLarge;
  }

  public static get radioLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get radioLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get radioLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  public static radioCaptionGap = '8px';

  public static get radioPaddingYSmall() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeightSmall, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
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
  public static radioDisabledBg = '#F0F0F0';
  public static get radioDisabledShadow() {
    return `0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.1)`;
  }
  public static radioCaptionDisplay = 'inline-flex';
  public static radioBorderWidthCompensation = '0px';
  public static radioCircleOffsetY = '1px';
  public static get radioCheckedDisabledBulletBg() {
    return this.gray;
  }
  //#endregion
  //#region Tabs
  public static get tabFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get tabFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get tabFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static get tabLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get tabLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get tabLineHeightLarge() {
    return this.controlLineHeightLarge;
  }

  public static tabPaddingXSmall = '8px';
  public static tabPaddingXMedium = '10px';
  public static tabPaddingXLarge = '12px';

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
    const paddingY = parseInt(this.controlPaddingYLarge);
    const borderWidth = parseInt(this.controlBorderWidth);
    return `${paddingY + borderWidth}px`;
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
  public static tabColorHover = '#D6D6D6';
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
  public static tabIndicatorBorderRadius = '2px';
  //#endregion Tabs
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
  public static switcherBorderRadius = '8px';
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
  public static mobilePopupFooterPadding = '16px 16px 16px 16px';
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
  public static fileUploaderBg = '';
  public static fileUploaderUploadButtonBg = '#fff';
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
  public static get fileUploaderLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get fileUploaderLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get fileUploaderLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get fileUploaderPaddingYSmall() {
    return this.controlPaddingYSmall;
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
  public static fileUploaderBorderRadius = '8px';
  public static fileUploaderBorderColor = 'rgba(0, 0, 0, 0.37)';
  public static get fileUploaderBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get fileUploaderDisabledBorder() {
    return `${this.fileUploaderBorderWidth} ${this.fileUploaderBorderStyle} ${this.fileUploaderDisabledBorderColor}`;
  }
  public static fileUploaderBorderStyle = 'dashed';
  public static get fileUploaderBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get fileUploaderLinkColor() {
    return this.textColorDefault;
  }
  public static fileUploaderAfterLinkColor = '#858585';
  public static fileUploaderIconSize = '14px';
  public static fileUploaderIconColor = '#222222';
  public static fileUploaderIconHoverColor = '#333';
  public static get fileUploaderBorderColorError() {
    return this.borderColorError;
  }
  public static get fileUploaderBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get fileUploaderDisabledBg() {
    return this.btnDisabledBg;
  }
  public static fileUploaderDisabledBgClip = 'padding-box';
  public static fileUploaderDisabledBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static get fileUploaderDisabledTextColor() {
    return this.textColorDisabled;
  }
  public static get fileUploaderDisabledLinkColor() {
    return this.textColorDisabled;
  }
  public static get fileUploaderDisabledIconColor() {
    return this.textColorDisabled;
  }
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = 'rgba(0, 0, 0, 0.06)';
  public static fileUploaderHoveredBorderColor = 'transparent';
  public static fileUploaderIconGapSmall = '4px';
  public static fileUploaderIconGapMedium = '6px';
  public static fileUploaderIconGapLarge = '8px';

  public static get fileUploaderDragOverBorderColor() {
    return this.borderColorFocus;
  }
  public static fileUploaderDragOverShadow =
    '0px 0px 0px 3px rgb(149, 149, 149), 0px 0px 0px 8px rgba(61, 61, 61, 0.2)';
  //#endregion FileUploader

  //#region ClearCrossIcon
  public static get clearCrossIconWidthSmall() {
    return this.inputHeightSmall;
  }
  public static get clearCrossIconWidthMedium() {
    return this.inputHeightMedium;
  }
  public static get clearCrossIconWidthLarge() {
    return this.inputHeightLarge;
  }
  public static get clearCrossIconHeightSmall() {
    return this.inputHeightSmall;
  }
  public static get clearCrossIconHeightMedium() {
    return this.inputHeightMedium;
  }
  public static get clearCrossIconHeightLarge() {
    return this.inputHeightLarge;
  }

  public static get clearCrossIconRightMarginSmall() {
    const inputPaddingXSmall = parseInt(this.inputPaddingXSmall);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXSmall + inputBorderWidth}px`;
  }
  public static get clearCrossIconRightMarginMedium() {
    const inputPaddingXMedium = parseInt(this.inputPaddingXMedium);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXMedium + inputBorderWidth}px`;
  }
  public static get clearCrossIconRightMarginLarge() {
    const inputPaddingXLarge = parseInt(this.inputPaddingXLarge);
    const inputBorderWidth = parseInt(this.inputBorderWidth);
    return `-${inputPaddingXLarge + inputBorderWidth}px`;
  }

  public static get clearCrossIconBorderRadiusSmall() {
    return this.inputBorderRadiusSmall;
  }
  public static get clearCrossIconBorderRadiusMedium() {
    return this.inputBorderRadiusMedium;
  }
  public static get clearCrossIconBorderRadiusLarge() {
    return this.inputBorderRadiusLarge;
  }

  public static clearCrossIconColor = 'rgba(0, 0, 0, 0.54)';
  public static clearCrossIconHoverColor = 'rgba(0, 0, 0, 0.87)';

  public static clearCrossIconAlign = 'center';

  //#endregion ClearCrossIcon

  //#region CloseIcon
  public static closeBtnIconColor = 'rgba(0, 0, 0, 0.32)';
  public static closeBtnIconDisabledColor = '#8b8b8b';
  public static closeBtnIconHoverColor = 'rgba(0, 0, 0, 0.865)';
  public static closeBtnIconBorderRadius = '4px';
  public static get closeBtnIconFocusShadow() {
    return `inset 0 0 0 1px ${this.borderColorFocus}, inset 0 0 0 2px ${this.outlineColorFocus}`;
  }
  //#endregion CloseIcon

  //#region Autocomplete
  public static get autocompleteMenuOffsetY() {
    return this.menuOffsetY;
  }
  //#endregion Autocomplete

  //#region Combobox
  public static get comboboxMenuOffsetY() {
    return this.menuOffsetY;
  }
  //#endregion Combobox

  //#region MiniModal
  public static miniModalHeaderPaddingBottom = '0';
  public static miniModalBodyPaddingTop = '16px';
  public static miniModalBodyPaddingBottom = '0';
  public static miniModalDescriptionFontSize = 'inherit';
  public static miniModalDescriptionLineHeight = 'normal';
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
  //#endregion MiniModal

  //#region react-ui-validations
  public static get validationsTextColorError() {
    return this.errorText;
  }
  public static validationsTextColorWarning = '#ef8b17';
  //#endregion
}

export const BasicTheme = createTheme({ themeClass: BasicThemeClass });

export const BasicThemeClassForExtension = class {} as typeof BasicThemeClass;
