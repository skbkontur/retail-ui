import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { exposeGetters } from '../../lib/theming/ThemeHelpers';

export class DefaultTheme {
  //#region Common variables
  public static fontFamilyCompensationBaseline = '0'; // deprecated
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
  public static btnFocusShadowWidth = '2px';
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
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#ebebeb';
  public static btnDefaultHoverBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultHoverBorderBottomColor = '';
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultActiveBorderTopColor = '';
  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static btnDefaultBorderBottomColor = '';
  public static btnDefaultActiveShadow = 'none';
  public static btnSuccessBg = '#538a1b';
  public static btnSuccessHoverBg = '#477916';
  public static btnSuccessHoverBorderColor = '#477916';
  public static btnSuccessHoverBorderBottomColor = '';
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
  public static tooltipCloseBtnColor = 'rgba(0, 0, 0, 0.32)';
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
  public static kebabBorderRadius = '50%';
  public static kebabBorder = '2px solid transparent';
  //#endregion
  //#region Modal
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
  public static get modalHeaderTextColor() {
    return this.textColorDefault;
  }
  public static modalHeaderLineHeight = '32px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalHeaderPaddingTop = '24px';
  public static get modalFixedHeaderPaddingBottom() {
    return `${Math.round(parseInt(this.modalHeaderPaddingBottom) / 2)}px`;
  }
  public static modalBodyTextColor = 'inherit';
  public static modalFooterTextColor = 'inherit';
  public static modalBodyPaddingBottom = '24px';
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
  public static mobileModalBodyPadding = '16px';
  public static mobileModalBodyFontSize = '16px';
  public static mobileModalFooterPadding = '16px';
  public static mobileModalPaddingBottom = '16px';
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
  //#endregion
  //#region DateInput
  public static get dateInputIconColor() {
    return this.textColorDefault;
  }
  public static dateInputMaskColor = '#b8b8b8';
  public static dateInputComponentSelectedBgColor = '#cdedff';
  //#endregion
  //#region Calendar
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
  public static pagingPageLinkBorderRadius = '9999px';
  public static get pagingPageLinkHintColor() {
    return this.placeholderColor;
  }
  public static pagingPageLinkHintFontSize = '12px';
  public static pagingPageLinkHintLineHeight = '16px';
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
  public static get mobileHintColor() {
    return this.textColorDefault;
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
  public static toastClosePadding = '16px';
  public static toastCloseColor = 'rgba(255, 255, 255, 0.6)';
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
    return this.bgSecondary;
  }
  public static get menuBorderRadius() {
    return '0px';
  }
  public static menuBorder = 'none';
  public static menuShadow = '0 4px 12px rgba(0, 0, 0, 0.16)';
  public static menuPaddingY = '4px';
  public static menuPaddingX = '0';
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
  public static menuItemBorderRadius = '0px';
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
  public static menuItemCommentColor = '#adadad';
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
  public static menuSeparatorBorderColor = '#ebebeb';
  public static menuSeparatorMarginY = '2px';
  public static menuSeparatorBorderWidth = '1px';
  //#endregion
  //#region Toggle
  public static get toggleFontSize() {
    return this.fontSizeSmall;
  }
  public static get toggleLineHeight() {
    return this.controlLineHeightSmall;
  }
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
  /**
   * @deprecated use toggleHandleBg
   */
  public static toggleBg = '#fff';
  public static get toggleHandleBg() {
    return this.toggleBg;
  }
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
  public static get toggleHandleSize() {
    const toggleHeight = parseInt(this.toggleHeight, 10) || 0;
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
  public static toggleCaptionGap = '10px';
  public static toggleButtonOffsetY = '0px';
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
  public static textareaBorderTopColor = 'rgba(0, 0, 0, 0.16)';
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
  public static radioCaptionDisplay = 'inline-table';
  public static radioBorderWidthCompensation = '0px';
  public static radioCircleOffsetY = '1px';
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
  public static get switcherButtonDisabledBorderColor() {
    return this.btnDisabledBorderColor;
  }
  public static get switcherButtonCheckedDisabledShadow() {
    return this.btnCheckedDisabledShadow;
  }
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
  public static scrollContainerScrollBarColor = 'rgba(183, 183, 183, 0.7)';
  public static scrollContainerScrollBarInvertColor = 'rgba(255, 255, 255, 0.5)';
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
  public static globalLoaderTop = '0';
  public static globalLoaderLeft = '0';
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
  public static get fileUploaderFontSize() {
    return this.fontSizeSmall;
  }
  public static get fileUploaderLineHeight() {
    return this.controlLineHeightSmall;
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
  public static fileUploaderBorderStyle = 'dashed';
  public static get fileUploaderBorderColorFocus() {
    return this.borderColorFocus;
  }
  public static get fileUploaderLinkColor() {
    return this.linkColor;
  }
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
  public static fileUploaderDisabledBorderColor = '#f2f2f2';
  public static fileUploaderDisabledTextColor = '#808080';
  public static fileUploaderDisabledLinkColor = '#808080';
  public static fileUploaderDisabledIconColor = '#A0A0A0';
  public static get fileUploaderLinkHoverTextDecoration() {
    return this.linkHoverTextDecoration;
  }
  public static fileUploaderHoveredBg = 'none';
  //#endregion
}

export const DefaultThemeInternal = exposeGetters(DefaultTheme);
