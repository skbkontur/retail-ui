import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022 extends (class {} as typeof DefaultThemeInternal) {
  public static borderColorDisabled = 'rgba(0, 0, 0, 0.10)';
  public static borderColorFocus = '#3d3d3d';
  public static bgActive = '#141414';
  public static bgDisabled = '#F0F0F0';

  //#region Link
  public static linkColor = '#222222';
  public static linkHoverColor = '#222222';
  public static linkActiveColor = '#141414';

  public static linkSuccessColor = '#477916';
  public static linkSuccessHoverColor = '#3A6710';
  public static linkSuccessActiveColor = '#325A0C';

  public static linkDangerColor = '#CB3D35';
  public static linkDangerHoverColor = '#BA342E';
  public static linkDangerActiveColor = '#A92A27';

  public static linkGrayedColor = '#858585';
  public static linkGrayedHoverColor = '#292929';
  public static linkGrayedActiveColor = '#141414';

  public static linkLineBorderBottomStyle = 'solid';
  public static linkLineBorderBottomWidth = '1px';

  public static linkDisabledColor = '#858585';
  //#endregion Link

  //#region Button
  public static btnCheckedBg = '#3D3D3D';
  public static btnCheckedDisabledBg = '#ADADAD';
  public static btnCheckedDisabledColor = '#E6E6E6';

  public static btnDefaultBg = '#fff';
  public static btnDefaultHoverBg = '#F0F0F0';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#E6E6E6';

  public static btnDefaultBorderColor = 'rgba(0, 0, 0, 0.16);';
  public static btnDefaultBorderBottomColor = '';
  public static get btnDefaultHoverBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultHoverBorderBottomColor = '';
  public static get btnDefaultActiveBorderColor() {
    return this.btnDefaultBorderColor;
  }
  public static btnDefaultActiveBorderTopColor = '';

  public static btnPrimaryBg = '#3D3D3D';
  public static btnPrimaryHoverBg = '#292929';
  public static btnPrimaryActiveBg = '#141414';

  public static btnPrimaryBorderColor = '#3D3D3D';
  public static btnPrimaryHoverBorderColor = '#292929';
  public static btnPrimaryActiveBorderColor = '#141414';

  public static btnDisabledBg = 'rgba(0, 0, 0, 0.06)';
  public static get btnDisabledTextColor() {
    return this.textColorDisabledContrast;
  }
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.10)';

  public static btnBorderRadiusSmall = '8px';
  public static btnBorderRadiusMedium = '8px';
  public static btnBorderRadiusLarge = '8px';

  public static btnPaddingXSmall = '12px';
  public static btnPaddingXMedium = '16px';
  public static btnPaddingXLarge = '20px';

  // public static btnPaddingYSmall = '6px';
  // public static btnPaddingYMedium = '9px';
  // public static btnPaddingYLarge = '12px';

  public static btnIconSizeSmall = '16px';
  public static btnIconSizeMedium = '20px';
  public static btnIconSizeLarge = '24px';

  public static btnIconGapSmall = '4px';
  public static btnIconGapMedium = '6px';
  public static btnIconGapLarge = '8px';

  public static btnWithIconPaddingLeftSmall = '8px';
  public static btnWithIconPaddingLeftMedium = '10px';
  public static btnWithIconPaddingLeftLarge = '12px';

  public static btnLinkHoverTextDecoration = 'none';

  public static get btnLinkLineBorderBottomStyle() {
    return this.linkLineBorderBottomStyle;
  }
  public static get btnLinkLineBorderBottomWidth() {
    return this.linkLineBorderBottomWidth;
  }
  public static get btnLinkDisabledColor() {
    return this.linkDisabledColor;
  }

  //#endregion

  //#region Input
  public static inputIconColor = '#858585';
  public static inputBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static get inputBorderTopColor() {
    return this.inputBorderColor;
  }
  public static inputBorderColorHover = 'rgba(0, 0, 0, 0.32)';

  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';

  public static inputIconGapSmall = '4px';
  public static inputIconGapMedium = '6px';
  public static inputIconGapLarge = '8px';

  public static inputIconSizeSmall = '16px';
  public static inputIconSizeMedium = '20px';
  public static inputIconSizeLarge = '24px';

  public static inputBlinkColor = 'rgba(61, 61, 61, 0.2)';

  public static inputDisabledBackgroundClip = 'padding-box';
  //#endregion

  //#region Textarea
  public static textareaBorderRadius = '2px';
  public static get textareaDisabledBorderColor() {
    return this.borderColorDisabled;
  }
  public static get textareaDisabledBg() {
    return this.inputDisabledBg;
  }
  public static textareaBackgroundClip = 'padding-box';
  //#endregion

  //#region Radio
  public static radioBulletSize = '6px';
  public static radioDisabledBg = '#F0F0F0';
  public static get radioDisabledShadow() {
    return `0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.1)`;
  }
  //#endregion

  public static menuSeparatorMarginX = '8px';

  public static popupBorderRadius = '8px';
  public static popupBoxShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';
  public static popupDropShadow =
    'drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.08)) drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.12))';

  public static pickerShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';

  //#region Hint
  public static hintBgColor = 'rgba(0, 0, 0, 0.76)';
  public static hintBorderRadius = '8px';
  public static hintPaddingY = '8px';
  public static hintPaddingX = '8px';
  //#endregion

  //#region Modal
  public static modalWindowShadow = '0px 16px 32px 0px rgba(0, 0, 0, 0.06)';
  public static modalBorderRadius = '16px';
  public static modalBodyBorderRadius = '0px';
  public static fixedPanelShadow = 'none';
  public static get modalFooterBg() {
    return this.modalBg;
  }
  public static get modalFooterPanelPaddingTop() {
    return this.modalFooterPaddingTop;
  }
  public static get modalFooterPanelPaddingBottom() {
    return this.modalFooterPaddingBottom;
  }
  public static modalFixedPanelShadow = 'none';
  public static modalFooterPaddingTop = '20px';
  public static modalFooterPaddingBottom = '20px';
  public static modalFixedHeaderMarginBottom = '0px';
  public static get modalFixedHeaderPaddingBottom() {
    return this.modalHeaderPaddingBottom;
  }
  public static get modalHeaderAdditionalPaddingBottom() {
    return this.modalHeaderPaddingBottom;
  }
  public static get modalFixedFooterPaddingTop() {
    return this.modalFooterPaddingTop;
  }
  public static modalCloseButtonClickArea = '6px';
  public static modalFixedFooterMarginTop = '0px';
  public static modalSeparatorBorderBottom = '1px solid #E6E6E6';
  public static modalHeaderFontWeight = '700';
  public static modalPaddingRight = '32px';
  public static modalCloseButtonPadding = '32px';
  public static modalCloseIconSize = '20px';
  public static mobileModalCloseIconSize = '20px';
  public static mobileModalCloseButtonRightPadding = '12px';
  public static mobileModalCloseButtonTopPadding = '8px';
  public static modalHeaderPaddingBottom = '16px';
  public static modalBackBg = '#000';
  public static modalBackOpacity = '0.16';
  //#endregion

  //#region Select
  public static get selectBgDisabled() {
    return this.inputDisabledBg;
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
  public static get selectMenuOffsetY() {
    return this.menuOffsetY;
  }
  //#endregion

  //#region FileUploader
  public static fileUploaderIconColor = '#222222';
  public static fileUploaderDisabledIconColor = '#858585';
  public static fileUploaderDisabledTextColor = '#858585';
  public static fileUploaderDisabledLinkColor = '#858585';
  public static fileUploaderAfterLinkColor = '#858585';
  public static fileUploaderBorderRadius = '8px';
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = 'rgba(0, 0, 0, 0.06)';
  public static fileUploaderDisabledBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static fileUploaderHoveredBorderColor = 'transparent';
  public static get fileUploaderDisabledBg() {
    return this.btnDisabledBg;
  }
  public static fileUploaderBg = '';
  public static fileUploaderUploadButtonBg = '#fff';
  public static fileUploaderDisabledBgClip = 'padding-box';
  public static get fileUploaderDragOverBorderColor() {
    return this.borderColorFocus;
  }
  public static fileUploaderDragOverShadow =
    '0px 0px 0px 3px rgb(149, 149, 149), 0px 0px 0px 8px rgba(61, 61, 61, 0.2)';
  public static get fileUploaderDisabledBorder() {
    return `${this.fileUploaderBorderWidth} ${this.fileUploaderBorderStyle} ${this.fileUploaderDisabledBorderColor}`;
  }
  //#endregion

  //#region Toast
  public static toastBg = 'rgba(0, 0, 0, 0.76)';
  public static toastLinkColor = '#fff';
  public static toastLinkBgHover = 'rgba(255, 255, 255, 0.12)';
  public static toastLinkBgActive = 'rgba(0, 0, 0, 0.87)';
  public static toastLinkTextDecorationHover = '';
  public static toastBorderRadius = '8px';
  public static toastCloseSize = '16px';
  public static toastClosePadding = '14px';
  //#endregion

  //#region Tooltip
  public static tooltipBorderRadius = '8px';
  public static tooltipCloseBtnPadding = '4px';
  public static tooltipCloseBtnSide = '16px';
  //#endregion

  //#region Token
  public static tokenRemoveIconSize = '16px';
  public static tokenRemoveIconPaddingY = '0px';
  public static tokenRemoveIconPaddingX = '0px';
  public static tokenDefaultActive = '#323232';
  public static tokenBorderRadius = '2px';

  public static tokenPaddingY = '0px';
  public static tokenMarginX = '2px';
  public static tokenOutlineWidth = '1px';

  public static tokenShadowDisabled = '';
  public static tokenBorderColorDisabled = 'transparent';

  public static tokenDefaultIdleColor = '#222222';
  public static tokenDefaultIdleBg = 'rgba(0, 0, 0, 0.1)';
  public static tokenDefaultIdleBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static tokenDefaultIdleColorHover = '#222222';
  public static tokenDefaultIdleBgHover = 'rgba(0, 0, 0, 0.16)';
  public static tokenDefaultIdleBorderColorHover = 'rgba(0, 0, 0, 0.16)';
  public static tokenDefaultActiveColor = '#FFFFFF';
  public static tokenDefaultActiveBg = '#3D3D3D';
  public static tokenDefaultActiveBorderColor = 'transparent';
  //#endregion

  //#region DateInput
  //https://w3c.github.io/csswg-drafts/css-color/#valdef-system-color-highlight
  public static dateInputComponentSelectedBgColor = 'highlight';
  //#endregion

  //#region Checkbox
  public static checkboxBorderRadius = '4px';
  public static checkboxCheckedBg = '#3D3D3D';
  public static checkboxCheckedHoverBg = '#292929';
  public static checkboxBgDisabled = '#F0F0F0';
  public static get checkboxShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.1)`;
  }
  //#endregion

  public static menuBorderRadius = '8px';
  public static menuPaddingX = '4px';
  public static menuOffsetY = '4px';
  public static menuBoxSizing = 'border-box';
  public static menuItemHoverBg = '#F0F0F0';
  public static menuItemSelectedBg = '#E6E6E6';
  public static menuItemBorderRadius = '6px';
  public static menuItemDisabledColor = '#858585';
  public static get menuItemHoverColor() {
    return this.menuItemTextColor;
  }
  public static get menuItemCommentColor() {
    return this.menuItemTextColor;
  }
  public static get menuItemCommentColorHover() {
    return this.menuItemTextColor;
  }
  public static menuItemGap = '1px';
  public static menuItemCommentOpacity = '0.6';
  public static menuShadow = '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)';

  public static tokenInputBorderRadius = '2px';

  public static tokenInputPaddingY = '2px';
  public static tokenInputPaddingX = '2px';
  public static tokenInputMenuPopupBg = 'transparent';

  //#region Toggle
  public static toggleHandleSize = '14px';
  public static toggleHandleLeft = '3px';
  public static toggleHandleTop = '3px';
  public static toggleHandleActiveWidthIncrement = '0px';

  public static toggleBgChecked = '#3D3D3D';
  public static toggleBgHover = '#3D3D3D';

  public static toggleCheckedBg = '#fff';
  public static toggleCheckedBgHover = '#fff';

  // idle
  public static toggleContainerBg = '#FFFFFF';
  public static toggleContainerBoxShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.16)';
  public static toggleHandleBg = '#FFFFFF';
  public static toggleHandleBoxShadow = '0 0 0 1px rgba(0, 0, 0, 0.16)';

  // idle :hover
  public static toggleContainerBgHover = '#F0F0F0';
  public static toggleContainerBoxShadowHover = 'inset 0 0 0 1px rgba(0, 0, 0, 0.16)';
  public static toggleHandleBgHover = '#FFFFFF';
  public static toggleHandleBoxShadowHover = '0 0 0 1px rgba(0, 0, 0, 0.16)';

  // checked
  public static toggleContainerBgChecked = '#3D3D3D';
  public static toggleContainerBoxShadowChecked = 'none';
  public static toggleHandleBgChecked = '#FFFFFF';
  public static toggleHandleBoxShadowChecked = 'none';

  // checked :hover
  public static toggleContainerBgCheckedHover = '#292929';
  public static toggleContainerBoxShadowCheckedHover = 'none';
  public static toggleHandleBgCheckedHover = '#F0F0F0';
  public static toggleHandleBoxShadowCheckedHover = 'none';

  // disabled
  public static toggleContainerBgDisabled = '#F0F0F0';
  public static toggleContainerBoxShadowDisabled = 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)';
  public static toggleHandleBgDisabled = 'transparent';
  public static toggleHandleBoxShadowDisabled = '0 0 0 1px rgba(0, 0, 0, 0.1)';

  // disabled checked
  public static toggleContainerBgDisabledChecked = '#D6D6D6';
  public static toggleContainerBoxShadowDisabledChecked = 'none';
  public static toggleHandleBgDisabledChecked = '#F0F0F0';
  public static toggleHandleBoxShadowDisabledChecked = 'none';
  //#endregion

  public static switcherBorderRadius = '8px';

  //#region Calendar
  public static calendarCellHoverBgColor = '#F0F0F0';
  public static calendarCellHoverColor = '';
  public static calendarCellActiveHoverColor = '';
  public static calendarCellSelectedBgColor = '#E6E6E6';
  public static calendarCellTodayBorder = '1px solid';
  //#endregion

  //#region DateSelect
  public static dateSelectMenuItemBgActive = '#F0F0F0';
  public static dateSelectMenuItemFontActive = '';
  public static dateSelectTextColorInvert = '';
  //#endregion

  //#region InternalMenu
  public static get internalMenuPaddingY() {
    return this.menuScrollContainerContentWrapperPaddingY;
  } // deprecated, use menuLegacyPaddingY
  //#endregion

  //#region Menu
  public static get menuLegacyPaddingY() {
    return this.menuScrollContainerContentWrapperPaddingY;
  }
  //#endregion

  //#region Autocomplete
  public static get autocompleteMenuOffsetY() {
    return this.menuOffsetY;
  }
  //#endregion

  //#region DatePicker
  public static get datePickerMenuOffsetY() {
    return this.menuOffsetY;
  }
  public static pickerBorderRadius = '8px';
  //#endregion

  //#region Combobox
  public static get comboboxMenuOffsetY() {
    return this.menuOffsetY;
  }
  //#endregion

  //#region Paging
  public static pagingPageForwardLinkMarginTop = '';
  public static pagingPageForwardLinkMarginLeft = '0px';
  public static get pagingPageForwardLinkPaddingRight() {
    return this.pagingPageLinkPaddingX;
  }
  public static pagingLineHeight = '22px';
  public static pagingPageLinkPaddingX = '12px';
  public static pagingPageLinkBoxSizing = 'border-box';
  public static pagingPageLinkHintMargin = '4px -20px 0px';
  public static pagingDotsColor = '#ADADAD';
  public static pagingDotsDisabledColor = '#ADADAD';
  public static pagingForwardLinkColor = '#222222';
  public static pagingPageLinkActiveBg = 'rgba(0, 0, 0, 0.1)';
  public static pagingPageLinkHoverBg = 'rgba(0, 0, 0, 0.06)';
  //#endregion

  //#region SidePage
  public static sidePageBgDefault = '#fff';
  public static sidePageFooterPaddingTop = '20px';
  public static sidePageFooterPaddingBottom = '20px';
  public static get sidePageFooterPanelBg() {
    return this.sidePageBgDefault;
  }
  public static get sidePageFooterPanelPaddingTop() {
    return this.sidePageFooterPaddingTop;
  }
  public static get sidePageFooterPanelPaddingBottom() {
    return this.sidePageFooterPanelPaddingTop;
  }
  public static sidePageHeaderFontWeight = 'bold';
  public static sidePageBackingBg = '#000';
  public static sidePageBackingBgOpacity = '0.16';
  //#endregion

  //#region Tabs
  public static tabColorHover = '#D6D6D6';
  public static tabIndicatorBorderRadius = '2px';
  //#endregion

  //#region Kebab
  public static kebabSizeSmall = '24px';
  public static kebabSizeMedium = '32px';
  public static kebabSizeLarge = '40px';
  public static kebabIconSizeSmall = '16px';
  public static kebabIconSizeMedium = '20px';
  public static kebabIconSizeLarge = '24px';
  public static kebabBackgroundHover = 'rgba(0, 0, 0, 0.06)';
  public static kebabBackgroundActive = 'rgba(0, 0, 0, 0.10)';
  //#endregion
}

export const Theme2022Internal = Object.setPrototypeOf(
  exposeGetters(Theme2022),
  DefaultThemeInternal,
) as typeof Theme2022;
