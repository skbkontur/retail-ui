import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters, markAsFullTheme } from '../../lib/theming/ThemeHelpers';

export class NewDefaultTheme {
  //#region Common variables
  public static fontFamilyCompensationBaseline = '1';
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
  public static blueLight = '#1d85d0';
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
  public static borderColorDisabled = 'rgba(0, 0, 0, 0.05)';
  public static placeholderColor = '#a0a0a0';
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
  public static textColorDefault = '#333333';
  public static textColorInvert = '#fff';
  public static textColorDisabled = '#a0a0a0';
  public static textColorDisabledContrast = '#808080';
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '16px';
  public static fontSizeLarge = '18px';
  public static fontSizeMobile = '18px';
  public static lineHeightMobile = '24px';
  public static specificityLevel = '0';
  private static fixedPanelShadow = '0 0 16px 1px rgba(0, 0, 0, 0.3)';
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
  public static linkIconMarginRight = '4px';
  public static get linkHoverColor() {
    return this.linkColor;
  }
  public static get linkDisabledColor() {
    return this.textColorDisabled;
  }
  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';
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
  public static tokenBorderColorDisabled = 'rgba(0, 0, 0, 0.15)';
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
  //#endregion
  //#region Button
  public static btnBackgroundClip = 'padding-box';
  public static btnArrowBgImageActive = 'none';
  public static btnArrowBgImageChecked = 'none';
  public static btnLinkBorderRadius = '2px';
  public static get btnFocusShadowWidth() {
    const outlineWidth = parseInt(this.btnOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    return `${outlineWidth - borderWidth}px`;
  }
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
  public static btnBorderRadiusSmall = '2px';
  public static btnBorderRadiusMedium = '2px';
  public static btnBorderRadiusLarge = '2px';
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
  public static btnIconGapSmall = '4px';
  public static btnIconGapMedium = '4px';
  public static btnIconGapLarge = '4px';
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
  public static btnDefaultHoverBgStart = '#f2f2f2';
  public static btnDefaultHoverBgEnd = '#f2f2f2';
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultHoverBorderColor = '#d9d9d9';
  public static get btnDefaultHoverBorderBottomColor() {
    return this.btnDefaultHoverBorderColor;
  }
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static get btnDefaultActiveBorderTopColor() {
    return this.btnDefaultActiveBorderColor;
  }
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static get btnDefaultBorderBottomColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultActiveShadow = 'none';
  public static btnSuccessBg = '#419d14';
  public static btnSuccessHoverBg = '#3c9312';
  public static btnSuccessHoverBorderColor = '#3c9312';
  public static get btnSuccessHoverBorderBottomColor() {
    return this.btnSuccessHoverBorderColor;
  }
  public static btnSuccessBorderColor = '#419d14';
  public static get btnSuccessBorderBottomColor() {
    return this.btnSuccessBorderColor;
  }
  public static btnSuccessBgStart = '#419d14';
  public static btnSuccessBgEnd = '#419d14';
  public static btnSuccessTextColor = '#fff';
  public static btnSuccessHoverBgStart = '#3c9312';
  public static btnSuccessHoverBgEnd = '#3c9312';
  public static btnSuccessActiveBg = '#398911';
  public static btnSuccessActiveBorderColor = '#398911';
  public static get btnSuccessActiveBorderTopColor() {
    return this.btnSuccessActiveBorderColor;
  }
  public static btnSuccessActiveShadow = 'none';
  public static btnPrimaryBg = '#1d85d0';
  public static btnPrimaryHoverBg = '#1b7dc3';
  public static btnPrimaryHoverBorderColor = '#1b7dc3';
  public static get btnPrimaryHoverBorderBottomColor() {
    return this.btnPrimaryHoverBorderColor;
  }
  public static btnPrimaryBorderColor = '#1d85d0';
  public static get btnPrimaryBorderBottomColor() {
    return this.btnPrimaryBorderColor;
  }
  public static btnPrimaryBgStart = '#1d85d0';
  public static btnPrimaryBgEnd = '#1d85d0';
  public static btnPrimaryTextColor = '#fff';
  public static btnPrimaryHoverBgStart = '#1b7dc3';
  public static btnPrimaryHoverBgEnd = '#1b7dc3';
  public static btnPrimaryActiveBg = '#1974b6';
  public static btnPrimaryActiveBorderColor = '#1974b6';
  public static get btnPrimaryActiveBorderTopColor() {
    return this.btnPrimaryActiveBorderColor;
  }
  public static btnPrimaryActiveShadow = 'none';
  public static btnDangerBg = '#d9472b';
  public static btnDangerHoverBg = '#cc4228';
  public static btnDangerHoverBorderColor = '#cc4228';
  public static get btnDangerHoverBorderBottomColor() {
    return this.btnDangerHoverBorderColor;
  }
  public static btnDangerBorderColor = '#d9472b';
  public static get btnDangerBorderBottomColor() {
    return this.btnDangerBorderColor;
  }
  public static btnDangerBgStart = '#d9472b';
  public static btnDangerBgEnd = '#d9472b';
  public static btnDangerTextColor = '#fff';
  public static btnDangerHoverBgStart = '#cc4228';
  public static btnDangerHoverBgEnd = '#cc4228';
  public static btnDangerActiveBg = '#be3e25';
  public static btnDangerActiveBorderColor = '#be3e25';
  public static get btnDangerActiveBorderTopColor() {
    return this.btnDangerActiveBorderColor;
  }
  public static btnDangerActiveShadow = 'none';
  public static btnPayBg = '#ffca43';
  public static btnPayHoverBg = 'f0be3f';
  public static btnPayHoverBorderColor = '#f0be3f';
  public static get btnPayHoverBorderBottomColor() {
    return this.btnPayHoverBorderColor;
  }
  public static btnPayBorderColor = '#ffca43';
  public static get btnPayBorderBottomColor() {
    return this.btnPayBorderColor;
  }
  public static btnPayBgStart = '#ffca43';
  public static btnPayBgEnd = '#ffca43';
  public static get btnPayTextColor() {
    return this.textColorDefault;
  }
  public static btnPayHoverBgStart = '#f0be3f';
  public static btnPayHoverBgEnd = '#f0be3f';
  public static btnPayActiveBg = '#e0b13a';
  public static btnPayActiveBorderColor = '#e0b13a';
  public static get btnPayActiveBorderTopColor() {
    return this.btnPayActiveBorderColor;
  }
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
  public static get btnLinkHoverTextDecoration() {
    return this.linkHoverTextDecoration;
  }
  public static get btnLinkIconMarginRight() {
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
  //#endregion
  //#region Select
  public static selectPlaceholderColor = '#a0a0a0';
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
  public static get selectTextColorDisabled() {
    return this.btnDisabledTextColor;
  }
  public static get selectBgDisabled() {
    return this.btnDisabledBg;
  }
  public static get selectBorderColorDisabled() {
    return this.btnDisabledBorderColor;
  }
  //#endregion
  //#region Tooltip
  public static tooltipPaddingY = '16px';
  public static tooltipPaddingX = '16px';
  public static tooltipCloseBtnPadding = '8px';
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.374)';
  public static tooltipCloseBtnHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static get tooltipTextColor() {
    return this.textColorDefault;
  }
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
  public static kebabBorderRadius = '50%';
  public static kebabBorder = '2px solid transparent';
  //#endregion
  //#region Modal
  public static modalBackBg = '#333';
  public static modalBackOpacity = '0.6';
  public static modalCloseButtonColor = '#808080';
  public static modalCloseButtonDisabledColor = '#8b8b8b';
  public static modalCloseButtonHoverColor = '#333';
  public static modalCloseButtonPadding = '36px';
  public static modalCloseButtonLegacyShift = '0px';
  public static modalCloseButtonBottomPadding = '20px';
  public static modalCloseButtonClickArea = '10px';
  public static modalCloseIconSize = '12px';
  public static modalCloseLegacyGap = '0px';
  public static modalCloseWrapperLegacyGap = '0px';
  public static modalFixedHeaderBg = '#fff';
  public static get modalFixedHeaderShadow() {
    return this.fixedPanelShadow;
  }
  public static get modalFixedFooterShadow() {
    return this.fixedPanelShadow;
  }
  public static modalFooterBg = '#e5e5e5';
  public static modalAdaptiveThreshold = '425px';
  public static modalPaddingTop = '24px';
  public static modalPaddingLeft = '32px';
  public static modalPaddingRight = '36px';
  public static modalHeaderFontSize = '24px';
  public static get modalHeaderTextColor() {
    return this.textColorDefault;
  }
  public static modalHeaderLineHeight = '32px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalHeaderPaddingTop = '24px';
  public static get modalFixedHeaderPaddingBottom() {
    return `${Math.round(parseInt(this.modalHeaderPaddingBottom) / 2)}px`;
  }
  public static modalBodyPaddingBottom = '24px';
  public static modalFooterPaddingTop = '0px';
  public static modalFooterPaddingBottom = '32px';
  public static modalPaddingBottom = '40px';
  public static modalFooterPanelPaddingTop = '20px';
  public static modalFooterPanelPaddingBottom = '20px';
  //#endregion
  //#region SidePage
  public static sidePageFooterPanelBg = '#e5e5e5';
  public static sidePageBackingBg = '#333';
  public static sidePageBackingBgOpacity = '0.6';
  public static sidePageCloseButtonColor = 'rgba(0, 0, 0, 0.374)';
  public static sidePageCloseButtonHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static sidePageContainerShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
  public static sidePagePaddingLeft = '32px';
  public static sidePagePaddingRight = '36px';
  public static sidePagePaddingTop = '24px';
  public static sidePagePaddingBottom = '40px';
  public static sidePageFooterPaddingTop = '24px';
  public static sidePageFooterPaddingBottom = '32px';
  public static get sidePageBgDefault() {
    return this.bgDefault;
  }
  public static get sidePageHeaderTextColor() {
    return this.textColorDefault;
  }
  public static sidePageHeaderFontSize = '24px';
  public static sidePageHeaderLineHeight = '32px';
  public static sidePageHeaderPaddingBottom = '16px';
  public static sidePageHeaderPaddingTop = '24px';
  public static sidePageHeaderFixedFontSize = '18px';
  public static sidePageHeaderFixedLineHeight = '28px';
  public static sidePageHeaderFixedPaddingY = '10px';
  public static sidePageHeaderStickyOffset = '5px';
  public static sidePageCloseButtonPadding = '36px';
  public static sidePageCloseButtonLegacyPaddingLeft = '36px';
  public static sidePageFooterPanelPaddingTop = '20px';
  public static sidePageFooterPanelPaddingBottom = '20px';
  public static sidePageCloseIconSize = '12px';
  public static sidePageCloseButtonClickArea = '10px';
  public static get sidePageFixedHeaderShadow() {
    return this.fixedPanelShadow;
  }
  public static get sidePageFixedFooterShadow() {
    return this.fixedPanelShadow;
  }
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
  public static calendarCellSize = '32px';
  public static calendarMonthHeaderStickedBgColor = 'white';
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
  public static datePickerOpenBtnColor = '#333';
  public static pickerBg = '#fff';
  public static pickerShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.16)';
  public static pickerTodayWrapperBgColor = 'white';
  public static pickerTodayWrapperBorderTop = '1px solid #dfdede';
  public static pickerTodayWrapperHoverBgColor = '#f5f5f5';
  public static pickerTodayWrapperFontSize = '14px';
  public static pickerTodayWrapperLineHeight = '20px';
  public static pickerTodayWrapperPaddingTop = '6px';
  public static pickerTodayWrapperPaddingBottom = '6px';
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
  public static get pagingFontSize() {
    return this.fontSizeMedium;
  }
  public static get pagingForwardIconSize() {
    return this.pagingFontSize;
  }
  public static pagingForwardIconMarginTop = '1px';
  public static pagingPageLinkPaddingX = '0.625em';
  public static pagingPageLinkPaddingY = '0.3125em';
  public static pagingPageLinkLegacyPaddingY = '0';
  public static pagingPageLinkMinWidth = '0.75em';
  public static pagingPageForwardLinkMarginTop = '0.35em';
  public static pagingPageForwardLinkMarginLeft = '10px';
  public static pagingPageForwardLinkPaddingRight = '1.375em';
  public static pagingLineHeight = '1.375em';
  public static pagingDotsColor = 'gray';
  public static pagingDotsPadding = '0.375em 0.625em 0';
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.09)';
  public static get pagingPageLinkActiveColor() {
    return this.textColorDefault;
  }
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.05)';
  public static pagingPageLinkHintColor = '#bbb';
  public static pagingPageLinkHintFontSize = '12px';
  public static pagingPageLinkHintLineHeight = '16px';
  public static pagingPageLinkBorderRadius = '50%';
  public static pagingPageLinkMargin = '0px 1px';
  public static get pagingForwardLinkColor() {
    return this.linkColor;
  }
  public static get pagingForwardLinkDisabledColor() {
    return this.linkDisabledColor;
  }
  //#endregion
  //#region Hint
  public static get hintColor() {
    return this.textColorInvert;
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
  public static toastLinkColor = '#80caff';
  public static toastClosePadding = '16px';
  public static toastCloseColor = '#a0a0a0';
  public static toastCloseHoverColor = 'white';
  public static toastCloseSize = '8px';
  //#endregion
  //#region Dropdown
  public static dropdownMenuSelectedBg = '#f1f1f1'; //deprecated
  public static get dropdownMenuHoverBg() {
    //deprecated
    return this.bgActive;
  }
  //#endregion
  //#region Menu
  public static get menuBgDefault() {
    return this.bgDefault;
  }
  public static menuBorder = 'none';
  public static menuShadow = '0 4px 12px rgba(0, 0, 0, 0.16)';
  public static menuPaddingY = '4px';
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
  public static menuItemIconWidth = '16px';
  public static menuItemIconGap = '4px';
  public static menuItemIconLegacyMargin = '0px';
  public static menuItemIconLegacyShift = '0px';
  public static get menuItemPaddingForIcon() {
    return `${
      parseInt(this.menuItemPaddingX) +
      parseInt(this.menuItemIconWidth) +
      parseInt(this.menuItemIconGap) +
      parseInt(this.menuItemIconLegacyMargin)
    }px`;
  }
  public static get menuItemLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get menuItemFontSize() {
    return this.fontSizeSmall;
  }
  public static menuItemPaddingX = '8px';
  public static menuItemPaddingY = '6px';
  public static menuItemLegacyPaddingX = '0px';
  public static menuItemLegacyPaddingY = '0px';
  public static get menuItemHoverColor() {
    return this.textColorInvert;
  }
  public static get menuItemDisabledColor() {
    return this.textColorDisabled;
  }
  public static get menuItemLinkColor() {
    return this.linkColor;
  }
  public static menuItemCommentColor = '#a0a0a0';
  public static menuItemCommentColorHover = '#fff';
  public static menuItemPaddingMobile = '12px 16px';
  //menuHeader
  public static get menuHeaderColor() {
    return this.gray;
  }
  public static menuHeaderLineHeight = '16px';
  public static menuHeaderFontSize = '12px';
  public static menuHeaderPaddingX = '8px';
  public static menuHeaderPaddingTop = '12px';
  public static menuHeaderPaddingBottom = '4px';
  public static menuHeaderLegacyPaddingRight = '0px';
  //menuSeparator
  public static menuSeparatorBorderColor = '#e6e6e6';
  public static menuSeparatorMarginY = '2px';
  public static menuSeparatorBorderWidth = '1px';
  //#endregion
  //#region Toggle
  public static get toggleTextColor() {
    return this.textColorDefault;
  }
  public static toggleHandleActiveWidthIncrement = '4px';
  public static get toggleHandleBorderRadius() {
    const height = parseInt(this.toggleHeight, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    const handleSize = height - 2 * borderWidth;
    return `${handleSize / 2}px`;
  }
  public static toggleHeight = '20px';
  public static toggleWidth = '32px';
  public static get toggleBorderRadius() {
    return `calc(${this.toggleHeight} * 0.5)`;
  }
  public static toggleBg = '#fff';
  public static toggleDisabledHandleBg = '#fff';
  public static toggleBaseBg = '#fff';
  public static get toggleBgDisabled() {
    return this.bgDisabled;
  }
  public static get toggleBgDisabledChecked() {
    return this.bgDisabled;
  }
  public static toggleBgHover = '#f3f3f2';
  public static toggleBgChecked = '#3072c4';
  public static get toggleBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get toggleOutlineWidth() {
    const outlineWidth = parseInt(this.controlOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.toggleBorderWidth, 10) || 0;
    return `${outlineWidth + borderWidth}px`;
  }
  public static toggleBorderColor = '#d0d0d0';
  public static get toggleBorderColorDisabled() {
    return this.toggleBorderColor;
  }
  public static get toggleBorderColorDisabledChecked() {
    return this.toggleBorderColor;
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
  public static toggleCaptionGap = '10px';
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
    return this.bgDefault;
  }
  public static popupPinOffset = '0'; // deprecated
  public static popupPinOffsetX = '16px';
  public static popupPinOffsetY = '16px';
  public static popupMargin = '10px';
  public static popupPinSize = '8px';
  //#endregion
  //#region Input
  public static get inputTextColor() {
    return this.textColorDefault;
  }
  public static inputShadow = 'none';
  public static inputBg = 'white';
  public static inputIconColor = '#a9a9a9';
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
  public static inputBorderRadiusSmall = '0px';
  public static inputBorderRadiusMedium = '0px';
  public static inputBorderRadiusLarge = '0px';
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
  //#endregion
  //#region Checkbox
  public static get checkboxBorderWidthCompensation() {
    return this.checkboxBorderWidth;
  }
  public static get checkboxFontSize() {
    return this.fontSizeSmall;
  }
  public static get checkboxLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static checkboxBoxSize = '16px';
  public static checkboxCaptionGap = '8px';
  public static get checkboxPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeight, 10) || 0;
    return `${(controlHeight - lineHeight) / 2}px`;
  }
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
  public static get textareaFontSize() {
    return this.fontSizeSmall;
  }
  public static get textareaLineHeight() {
    return this.controlLineHeightSmall;
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
  public static get textareaMinHeight() {
    const lineHeight = parseInt(this.textareaLineHeight, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingY, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;

    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
  }
  public static textareaWidth = '250px';
  public static textareaPaddingX = '7px';
  public static get textareaPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static get textareaBorderColor() {
    return this.borderColorGrayLight;
  }
  public static textareaBorderTopColor = 'rgba(0, 0, 0, 0.15)';
  public static get textareaBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get textareaBorderColorWarning() {
    return this.borderColorWarning;
  }
  public static get textareaBorderColorError() {
    return this.borderColorError;
  }
  public static textareaDisabledBg = 'rgba(0, 0, 0, 0.05)';
  public static get textareaDisabledBorderColor() {
    return this.textareaDisabledBg;
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
  public static get radioTextColor() {
    return this.textColorDefault;
  }
  public static radioSize = '16px';
  public static get radioSizeAfter() {
    const borderCompensation =
      this.radioBoxShadow === 'none' ? this.radioBorderWidth : this.radioBorderWidthCompensation;
    return `calc(${this.radioSize} + 2 * ${this.radioOutlineWidth} - 2 * ${borderCompensation})`;
  }
  public static get radioFontSize() {
    return this.fontSizeSmall;
  }
  public static get radioLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static radioCaptionGap = '8px';
  public static get radioPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeight, 10) || 0;
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
  public static radioBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static radioBoxShadow = 'none';
  public static get radioBorder() {
    return `${this.radioBorderWidth} solid rgba(0, 0, 0, 0.15)`;
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
  public static radioCaptionDisplay = 'inline-block';
  public static get radioBorderWidthCompensation() {
    return this.radioBoxShadow !== 'none' ? this.radioBorderWidth : '0px';
  }
  public static radioMarginY = '2px';
  //#endregion
  //#region RadioGroup
  public static radioGroupLegacyItemGap = '0px';
  //#endregion
  //#region Tabs
  public static get tabFontSize() {
    return this.fontSizeLarge;
  }
  public static tabPaddingX = '12px';
  public static get tabsMarginX() {
    return this.tabPaddingX;
  }
  public static get tabPaddingY() {
    const paddingY = parseInt(this.controlPaddingYLarge, 10) || 0;
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;
    return `${paddingY + borderWidth}px`;
  }
  public static get tabLineHeight() {
    return this.controlLineHeightLarge;
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
  //#endregion
  //#region Switcher
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
  public static get switcherButtonDisabledBorderColor() {
    return this.borderColorDisabled;
  }
  public static switcherButtonCheckedDisabledShadow: 'none';
  //#endregion
  //#region MobilePopup
  public static mobilePopupTopPadding = '20px';
  public static mobilePopupHeaderPadding = '0 16px';
  public static mobilePopupHeaderBorderRadius = '8px 8px 0px 0px';
  public static mobilePopupHeaderShadow = '0px 0px 16px 1px rgba(0, 0, 0, 0.1)';
  public static get mobilePopupHeaderFontSize() {
    return this.fontSizeMobile;
  }
  public static get mobilePopupHeaderLineHeight() {
    return this.lineHeightMobile;
  }
  public static mobilePopupHeaderFontWeight = '500';
  public static mobilePopupHeaderChildPadding = '12px';
  //#endregion
  //#region ScrollContainer
  public static scrollContainerScrollBarSize = '4px';
  public static scrollContainerScrollBarHoverSize = '10px';
  public static scrollContainerScrollBarColor = '#b7b7b7';
  public static scrollContainerScrollBarInvertColor = 'rgba(255, 255, 255, 0.5)';
  //#endregion
}

export const NewDefaultThemeInternal = markAsFullTheme(exposeGetters(NewDefaultTheme));
