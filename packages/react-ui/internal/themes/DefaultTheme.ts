import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters, markAsFullTheme } from '../../lib/theming/ThemeHelpers';

export class DefaultTheme {
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
  public static controlLineHeightMedium = '20px';
  public static controlLineHeightLarge = '22px';
  public static controlPaddingYSmall = '6px';
  public static controlPaddingYMedium = '9px';
  public static controlPaddingYLarge = '10px';
  public static textColorDefault = '#333333';
  public static textColorInvert = '#fff';
  public static textColorDisabled = '#a0a0a0';
  public static textColorDisabledContrast = '#808080';
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '14px';
  public static fontSizeLarge = '16px';
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
  //#region Token
  public static tokenDisabledBg = 'rgba(0, 0, 0, 0.10)';
  public static get tokenTextColorDisabled() {
    return this.textColorDisabledContrast;
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
  public static tokenLegacyTextShift = '1px';
  public static tokenPaddingYDisabled = '1px';
  public static get tokenPaddingXDisabled() {
    return this.tokenPaddingX;
  }
  public static tokenMarginYDisabled = '2px';
  public static tokenMarginXDisabled = '2px';
  public static get tokenShadowDisabled() {
    return `0 0 0 ${this.tokenBorderWidth} ${this.tokenBorderColorDisabled}`;
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
  public static btnArrowBgImageActive =
    'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 15%), linear-gradient(-95deg, rgba(0,0,0,0.1) 0%, transparent 4%)';
  public static btnArrowBgImageChecked =
    'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 15%), linear-gradient(-95deg, rgba(0,0,0,0.1) 0%, transparent 4%)';
  public static btnLinkBorderRadius = '1px';
  public static get btnFocusShadowWidth() {
    const outlineWidth = parseInt(this.btnOutlineWidth, 10) || 0;
    const borderWidth = parseInt(this.btnBorderWidth, 10) || 0;
    return `${outlineWidth - borderWidth}px`;
  }
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnCheckedBg = '#737373';
  public static btnCheckedDisabledBg = '#a0a0a0';
  public static btnCheckedDisabledColor = 'rgba(255, 255, 255, 0.7)';
  public static btnCheckedTextColor = '#fff';
  public static btnCheckedDisabledBorderColor = 'rgba(161,161,161,1)';
  public static btnCheckedShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)';
  public static btnCheckedDisabledShadow = 'none';
  public static btnBorderRadiusSmall = '2px';
  public static btnBorderRadiusMedium = '2px';
  public static btnBorderRadiusLarge = '2px';

  public static btnBorderWidth = '1px';
  public static btnInsetWidth = '1px';
  public static get btnOutlineWidth() {
    return `${parseInt(this.btnBorderWidth, 10) + 1}px`;
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
  public static btnDefaultCheckedBorderColor = 'rgba(102,102,102,1)';
  public static get btnDefaultTextColor() {
    return this.textColorDefault;
  }
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultHoverBgStart = '#f2f2f2';
  public static btnDefaultHoverBgEnd = '#dfdfdf';
  public static btnDefaultActiveBg = '#e5e5e5';
  public static btnDefaultHoverBorderColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultHoverBorderBottomColor = 'rgba(0, 0, 0, 0.35)';
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultActiveBorderTopColor = 'rgba(0, 0, 0, 0.35)';
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnDefaultBorderBottomColor = 'rgba(0, 0, 0, 0.28)';
  public static btnDefaultActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnSuccessBg = '#419d14';
  public static btnSuccessHoverBg = 'none';
  public static btnSuccessHoverBorderColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessHoverBorderBottomColor = 'rgba(8, 73, 2, 0.9)';
  public static btnSuccessBorderColor = 'rgba(25, 103, 6, 0.7)';
  public static btnSuccessBorderBottomColor = 'rgba(23, 89, 7, 0.9)';
  public static btnSuccessBgStart = '#4ba91d';
  public static btnSuccessBgEnd = '#37910b';
  public static btnSuccessTextColor = '#fff';
  public static btnSuccessHoverBgStart = '#3b8d13';
  public static btnSuccessHoverBgEnd = '#317e0b';
  public static btnSuccessActiveBg = '#35840e';
  public static btnSuccessActiveBorderColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessActiveBorderTopColor = 'rgba(8, 73, 2, 0.9)';
  public static btnSuccessActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnPrimaryBg = '#1e8dd4';
  public static btnPrimaryHoverBg = 'none';
  public static btnPrimaryHoverBorderColor = 'rgba(5, 61, 100, 0.7)';
  public static btnPrimaryHoverBorderBottomColor = 'rgba(5, 61, 100, 0.9)';
  public static btnPrimaryBorderColor = 'rgba(14, 81, 129, 0.7)';
  public static btnPrimaryBorderBottomColor = 'rgba(14, 81, 129, 0.9)';
  public static btnPrimaryBgStart = '#2899ea';
  public static btnPrimaryBgEnd = '#167ac1';
  public static btnPrimaryTextColor = '#fff';
  public static btnPrimaryHoverBgStart = '#0087d5';
  public static btnPrimaryHoverBgEnd = '#167ac1';
  public static btnPrimaryActiveBg = '#0079c3';
  public static btnPrimaryActiveBorderColor = 'rgba(5, 61, 100, 0.7) ';
  public static btnPrimaryActiveBorderTopColor = 'rgba(5, 61, 100, 0.9)';
  public static btnPrimaryActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
  public static btnDangerBg = '#e14c30';
  public static btnDangerHoverBg = 'none';
  public static btnDangerHoverBorderColor = 'rgba(145, 0, 0, 0.7)';
  public static btnDangerHoverBorderBottomColor = 'rgba(145, 0, 0, 0.95)';
  public static btnDangerBorderColor = 'rgba(173,15,0,0.7)';
  public static btnDangerBorderBottomColor = 'rgba(173,15,0,0.9)';
  public static btnDangerBgStart = '#ec5438';
  public static btnDangerBgEnd = '#d44327';
  public static btnDangerTextColor = '#fff';
  public static btnDangerHoverBgStart = '#d44227';
  public static btnDangerHoverBgEnd = '#c73013';
  public static btnDangerActiveBg = '#cd381b';
  public static btnDangerActiveBorderColor = 'rgba(145, 0, 0, 0.7)';
  public static btnDangerActiveBorderTopColor = 'rgba(145, 0, 0, 0.95)';
  public static btnDangerActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnPayBg = '#ffc943';
  public static btnPayHoverBg = 'none';
  public static btnPayHoverBorderColor = 'rgba(227, 142, 8, 0.7)';
  public static btnPayHoverBorderBottomColor = 'rgba(227, 142, 8, 0.95)';
  public static btnPayBorderColor = 'rgba(238, 169, 34, 0.7)';
  public static btnPayBorderBottomColor = 'rgba(217, 144, 3, 0.9)';
  public static btnPayBgStart = '#ffd54b';
  public static btnPayBgEnd = '#ffbb39';
  public static get btnPayTextColor() {
    return this.textColorDefault;
  }
  public static btnPayHoverBgStart = '#ffbd3a';
  public static btnPayHoverBgEnd = '#f8a91d';
  public static btnPayActiveBg = '#fbb028';
  public static btnPayActiveBorderColor = 'rgba(227, 142, 8, 0.7)';
  public static btnPayActiveBorderTopColor = 'rgba(227, 142, 8, 0.95)';
  public static btnPayActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)';
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
  public static selectBorderWidth = '1px';
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
  public static tooltipPaddingY = '15px';
  public static tooltipPaddingX = '20px';
  public static tooltipCloseBtnPadding = '8px';
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.374)';
  public static tooltipCloseBtnHoverColor = 'rgba(0, 0, 0, 0.5)';
  public static get tooltipBorder() {
    return this.popupBorder;
  }
  public static get tooltipBorderRadius() {
    return this.popupBorderRadius;
  }
  public static tooltipPinOffset = '0px'; // deprecated
  public static tooltipPinOffsetX = '17px';
  public static tooltipPinOffsetY = '17px';
  public static tooltipMargin = '15px';
  public static get tooltipPinSize() {
    return this.popupPinSize;
  }
  //#endregion
  //#region TooltipMenu
  public static tooltipMenuPinOffset = '15px';
  public static get tooltipMenuMargin() {
    return this.popupMargin;
  }
  public static get tooltipMenuPinSize() {
    return this.popupPinSize;
  }
  //#endregion
  //#region Kebab
  public static kebabPinOffset = '15px';
  public static get kebabPinSize() {
    return this.popupPinSize;
  }
  public static kebabMargin = '5px';
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
  public static modalCloseButtonPadding = '35px';
  public static modalCloseButtonLegacyShift = '15px';
  public static modalCloseButtonBottomPadding = '20px';
  public static modalCloseButtonClickArea = '10px';
  public static modalCloseIconSize = '14px';
  public static modalCloseLegacyGap = '26px';
  public static modalCloseWrapperLegacyGap = '7px';
  public static modalFixedHeaderBg = '#fff';
  public static get modalFixedHeaderShadow() {
    return this.fixedPanelShadow;
  }
  public static get modalFixedFooterShadow() {
    return this.fixedPanelShadow;
  }
  public static modalFooterBg = '#e5e5e5';
  public static modalAdaptiveThreshold = '425px';
  public static modalPaddingTop = '30px';
  public static modalPaddingLeft = '30px';
  public static modalPaddingRight = '35px';
  public static modalHeaderFontSize = '22px';
  public static modalHeaderLineHeight = '30px';
  public static modalHeaderPaddingBottom = '11px';
  public static modalHeaderPaddingTop = '24px';
  public static modalFixedHeaderPaddingBottom = '11px';
  public static modalBodyPaddingBottom = '25px';
  public static modalFooterPaddingTop = '0px';
  public static modalFooterPaddingBottom = '30px';
  public static modalPaddingBottom = '30px';
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
  public static sidePagePaddingLeft = '30px';
  public static sidePagePaddingRight = '35px';
  public static sidePagePaddingTop = '25px';
  public static sidePagePaddingBottom = '20px';
  public static sidePageFooterPaddingTop = '20px';
  public static sidePageFooterPaddingBottom = '20px';
  public static get sidePageBgDefault() {
    return this.bgDefault;
  }

  public static sidePageHeaderFontSize = '22px';
  public static sidePageHeaderLineHeight = '30px';
  public static sidePageHeaderPaddingBottom = '25px';
  public static sidePageHeaderPaddingTop = '25px';
  public static sidePageHeaderFixedFontSize = '18px';
  public static sidePageHeaderFixedLineHeight = '24px';
  public static sidePageHeaderFixedPaddingY = '13px';
  public static sidePageHeaderStickyOffset = '8px';
  public static sidePageCloseButtonPadding = '36px';
  public static sidePageCloseButtonLegacyPaddingLeft = '37px';
  public static sidePageFooterPanelPaddingTop = '20px';
  public static sidePageFooterPanelPaddingBottom = '20px';
  public static sidePageCloseIconSize = '12px';
  public static sidePageCloseButtonClickAreaX = '10px';
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
  public static calendarCellSize = '30px';
  public static calendarMonthHeaderStickedBgColor = 'white';
  public static calendarMonthTitleBorderBottomColor = '#dfdede';
  public static get calendarCellHoverBgColor() {
    return this.bgActive;
  }
  public static calendarPaddingX = '15px';
  public static calendarMonthTitleLineHeight = '24px';
  public static calendarMonthTitlePaddingTop = '8px';
  public static calendarMonthTitlePaddingBottom = '8px';
  public static calendarMonthTitleMarginX = '0';
  public static calendarMonthTitleMarginBottom = '10px';
  public static calendarWrapperHeight = ' 330px';
  public static calendarMonthMarginBottom = '10px';
  public static calendarMaxMonthsToAppendOnScroll = '5';
  //#endregion
  //#region DatePicker
  public static dateSelectLineHeight = '24px';
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
  public static pickerShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.2)';
  public static pickerTodayWrapperBgColor = 'white';
  public static pickerTodayWrapperBorderTop = '1px solid #dfdede';
  public static pickerTodayWrapperHoverBgColor = '#f5f5f5';
  public static pickerTodayWrapperFontSize = '14px';
  public static pickerTodayWrapperLineHeight = 'normal';
  public static pickerTodayWrapperPaddingTop = '7px';
  public static pickerTodayWrapperPaddingBottom = '8px';
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
  public static pagingFontSize = '16px';
  public static pagingForwardIconSize = '18px';
  public static pagingForwardIconMarginTop = '0px';
  public static pagingPageLinkPaddingX = '10px';
  public static pagingPageLinkPaddingY = '2px';
  public static pagingPageLinkLegacyPaddingY = '5px';
  public static pagingPageLinkMinWidth = 'initial';
  public static pagingPageForwardLinkMarginTop = '4px';
  public static pagingPageForwardLinkMarginLeft = '10px';
  public static pagingPageForwardLinkPaddingRight = '22px';
  public static pagingLineHeight = 'initial';
  public static pagingDotsColor = 'gray';
  public static pagingDotsPadding = '6px 10px 0';
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.09)';
  public static pagingPageLinkActiveColor = 'black';
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.05)';
  public static pagingPageLinkHintColor = '#bbb';
  public static pagingPageLinkHintFontSize = '11px';
  public static pagingPageLinkHintLineHeight = '15px';
  public static pagingPageLinkBorderRadius = '16px';
  public static pagingPageLinkMargin = '2px 1px';
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
  public static get hintBorder() {
    return this.popupBorder;
  }
  public static get hintBorderRadius() {
    return this.popupBorderRadius;
  }
  public static hintPinOffset = '8px';
  public static hintMargin = '15px';
  //#endregion
  //#region Toast
  public static get toastFontSize() {
    return this.fontSizeSmall;
  }
  public static toastLineHeight = '20px';
  public static toastPaddingY = '10px';
  public static toastPaddingX = '20px';
  public static toastBorderRadius = '2px';
  public static toastBorder = 'none';
  public static toastTop = '20px';
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
  public static menuBorder = '1px solid #d5d5d5';
  public static menuShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
  public static menuPaddingY = '5px';
  // menuItem
  public static get menuItemSelectedBg() {
    return this.dropdownMenuSelectedBg;
  }
  public static get menuItemHoverBg() {
    return this.dropdownMenuHoverBg;
  }
  public static menuItemIconWidth = '16px';
  public static menuItemIconGap = '5px';
  public static menuItemIconLegacyMargin = '7px';
  public static menuItemIconLegacyShift = '-1px';
  public static get menuItemPaddingForIcon() {
    return `${
      parseInt(this.menuItemPaddingX) +
      parseInt(this.menuItemIconWidth) +
      parseInt(this.menuItemIconGap) +
      parseInt(this.menuItemIconLegacyMargin)
    }px`;
  }
  public static menuItemLineHeight = '18px';
  public static get menuItemFontSize() {
    return this.fontSizeSmall;
  }
  public static menuItemPaddingX = '8px';
  public static get menuItemPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static menuItemLegacyPaddingX = '10px';
  public static menuItemLegacyPaddingY = '1px';
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
  //menuHeader
  public static menuHeaderColor = '#a0a0a0';
  public static menuHeaderLineHeight = 'inherit';
  public static menuHeaderFontSize = '12px';
  public static get menuHeaderPaddingX() {
    return this.menuItemPaddingX;
  }
  public static menuHeaderPaddingTop = '6px';
  public static menuHeaderPaddingBottom = '7px';
  public static menuHeaderLegacyPaddingRight = '10px';
  //menuSeparator
  public static menuSeparatorBorderColor = '#e6e6e6';
  public static menuSeparatorMarginY = '5px';
  public static menuSeparatorBorderWidth = '1px';
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
  public static toggleDisabledHandleBg = '#fff';
  public static toggleBaseBg = '#fff';
  public static get toggleBgDisabled() {
    return this.bgDisabled;
  }
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
  public static popupDropShadow = 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))';
  public static popupBoxShadow = '0 0 0 1px rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.2)';
  public static popupTextColor = 'inherit';
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
  public static inputTextColor = 'none';
  public static inputShadow = 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)';
  public static inputBg = 'white';
  public static inputIconColor = '#a9a9a9';
  public static inputColor = 'inherit';
  public static inputWidth = '250px';
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
  public static checkboxBorderWidthCompensation = '0px';
  public static get checkboxFontSize() {
    return this.fontSizeSmall;
  }
  public static get checkboxLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static checkboxBoxSize = '16px';
  public static checkboxLabelGap = '10px';
  public static checkboxPaddingY = '0';
  public static checkboxBgStart = '#fdfdfd';
  public static checkboxBgEnd = '#ededed';
  public static get checkboxTextColorDefault() {
    return this.textColorDefault;
  }
  public static get checkboxTextColorDisabled() {
    return this.textColorDisabled;
  }
  public static get checkboxShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static checkboxBorder = 'none';
  public static checkboxBorderWidth = '1px';
  public static get checkboxShadow() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static get checkboxShadowHover() {
    return this.checkboxShadow;
  }
  public static get checkboxCheckedColor() {
    return this.textColorDefault;
  }
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
    return this.checkboxShadow;
  }
  public static checkboxBorderRadius = '1px';
  public static checkboxOutlineWidth = '2px';
  public static get checkboxCheckedShadow() {
    return this.checkboxShadow;
  }
  public static get checkboxCheckedActiveShadow() {
    return `${this.checkboxShadow}, ${this.btnDefaultActiveShadow}`;
  }
  public static get checkboxBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get checkboxBg() {
    return `linear-gradient(${this.checkboxBgStart}, ${this.checkboxBgEnd})`;
  }
  public static get checkboxHoverBg() {
    return `linear-gradient(-180deg, ${this.btnDefaultHoverBgStart} 0, ${this.btnDefaultHoverBgEnd} 100%)`;
  }
  public static get checkboxActiveBg() {
    return this.btnDefaultActiveBg;
  }
  public static get checkboxCheckedBg() {
    return this.checkboxBg;
  }
  public static get checkboxBgDisabled() {
    return this.bgDisabled;
  }
  public static get checkboxCheckedHoverBg() {
    return this.checkboxHoverBg;
  }
  public static get checkboxCheckedActiveBg() {
    return this.btnDefaultActiveBg;
  }
  public static get checkboxShadowActive() {
    return `${this.checkboxShadow}, ${this.btnDefaultActiveShadow}`;
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
  public static get textareaMinHeight() {
    const lineHeight = parseInt(this.textareaLineHeight, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingY, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;

    return `${lineHeight + paddingY * 2 + borderWidth * 2}px`;
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
  public static radioBgColor = 'transparent';
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
  public static radioCheckedBorderColor = 'inherit';
  public static radioCheckedBulletColor = '#404040';
  public static get radioCheckedHoverBgColor() {
    return this.radioHoverBg;
  }
  public static get radioDisabledBg() {
    return this.bgDisabled;
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
  //#region ScrollContainer
  public static scrollContainerScrollBarSize = '4px';
  public static scrollContainerScrollBarHoverSize = '10px';
  public static scrollContainerScrollBarColor = '#b7b7b7';
  public static scrollContainerScrollBarInvertColor = 'rgba(255, 255, 255, 0.5)';
  //#endregion
}

export const DefaultThemeInternal = exposeGetters(markAsFullTheme(DefaultTheme));
