import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022 extends (class {} as typeof DefaultThemeInternal) {
  public static borderColorDisabled = 'rgba(0, 0, 0, 0.08)';

  //#region Link
  public static linkColor = '#3D3D3D';
  public static linkHoverColor = '#292929';
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

  public static linkLineBottom = '0';
  public static linkLineBorderBottomStyle = 'solid';
  public static linkLineBorderBottomWidth = '1px';

  public static linkDisabledColor = '#858585';
  //#endregion Link

  public static borderColorFocus = '#3d3d3d';

  public static bgActive = '#141414';

  //#region Button
  public static btnCheckedBg = '#3D3D3D';
  public static btnCheckedDisabledBg = '#ADADAD';
  public static btnCheckedDisabledColor = '#EBEBEB';

  public static btnDefaultBg = '#fff';
  public static btnDefaultHoverBg = '#f6f6f6';
  public static btnDefaultHoverBgStart = 'none';
  public static btnDefaultHoverBgEnd = 'none';
  public static btnDefaultActiveBg = '#ebebeb';

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

  public static btnDisabledBg = 'rgba(0, 0, 0, 0.04)';
  public static get btnDisabledTextColor() {
    return this.textColorDisabledContrast;
  }
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.08)';

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

  public static btnLinkLineBottom = '0';
  public static btnLinkLineBorderBottomStyle = 'solid';
  public static btnLinkLineBorderBottomWidth = '1px';

  //#endregion

  //#region Input
  public static inputIconColor = '#858585';
  public static inputBorderColor = 'rgba(0, 0, 0, 0.16)';
  public static get inputBorderTopColor() {
    return this.inputBorderColor;
  }

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
  //#endregion

  //#region Textarea
  public static textareaBorderRadius = '2px';
  //#endregion

  public static radioBulletSize = '6px';

  public static checkboxBorderRadius = '4px';

  public static menuSeparatorMarginX = '8px';

  public static tooltipBorderRadius = '8px';

  public static popupBorderRadius = '8px';

  public static toastBorderRadius = '8px';

  public static hintBorderRadius = '8px';

  public static modalBorderRadius = '16px';
  public static fixedPanelShadow = 'none';
  public static modalFooterBg = '#fff';
  public static modalFixedHeaderBorder = '1px solid #EBEBEB';
  public static modalFixedFooterBorder = '1px solid #EBEBEB';

  public static checkboxCheckedBg = '#3D3D3D';

  public static menuBorderRadius = '8px';
  public static menuPaddingX = '4px';
  public static menuItemHoverBg = '#EBEBEB';
  public static menuItemHoverColor = '#222';
  public static menuItemBorderRadius = '6px';
  public static menuItemCommentColorHover = '#858585';

  public static fileUploaderBorderRadius = '8px';
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = 'rgba(0, 0, 0, 0.04)';

  public static tokenInputBorderRadius = '2px';
  public static tokenBorderRadius = '2px';

  public static tokenPaddingY = '1px';
  public static tokenPaddingX = '3px';

  public static tokenMarginY = '3px';
  public static tokenMarginX = '2px';

  public static tokenInputPaddingY = '2px';
  public static tokenInputPaddingX = '2px';

  public static toggleHandleSize = '14px';
  public static toggleHandleLeft = '3px';
  public static toggleHandleTop = '3px';
  public static toggleHandleActiveWidthIncrement = '0px';

  public static toggleHandleBg = '#3D3D3D';
  public static toggleBgChecked = '#3D3D3D';
  public static toggleBgHover = '#3D3D3D';

  public static toggleCheckedBg = '#fff';
  public static toggleCheckedBgHover = '#fff';

  public static switcherBorderRadius = '8px';
}

export const Theme2022Internal = Object.setPrototypeOf(
  exposeGetters(Theme2022),
  DefaultThemeInternal,
) as typeof Theme2022;
