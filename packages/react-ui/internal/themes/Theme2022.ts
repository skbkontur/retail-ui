import { exposeGetters } from '../../lib/theming/ThemeHelpers';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022 extends (class {} as typeof DefaultThemeInternal) {
  public static linkColor = '#3D3D3D';
  public static linkActiveColor = '#141414';

  public static borderColorFocus = '#141414';

  public static bgActive = '#141414';

  //#region Button
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

  public static btnSmallWithIconPaddingLeft = '8px';
  public static btnMediumWithIconPaddingLeft = '10px';
  public static btnLargeWithIconPaddingLeft = '12px';

  public static btnLinkHoverTextDecoration = 'none';

  public static btnLinkLineBottom = '0';
  public static get btnLinkLineBorderBottomColor() {
    return ColorFunctions.fade(this.linkColor, 0.5);
  }
  public static get btnLinkHoverLineBorderBottomColor() {
    return this.linkColor;
  }
  public static get btnLinkActiveLineBorderBottomColor() {
    return this.linkColor;
  }
  public static btnLinkLineBorderBottomStyle = 'solid';
  public static btnLinkLineBorderBottomWidth = '1px';

  //#endregion

  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';

  public static textareaBorderRadius = '2px';

  public static radioBulletSize = '6px';

  public static checkboxBorderRadius = '4px';
  public static checkboxIconHeight = '12px';
  public static checkboxIconWidth = '12px';
  public static checkboxIconTop = '2px';
  public static checkboxIconLeft = '2px';

  public static menuSeparatorMarginX = '8px';

  public static tooltipBorderRadius = '8px';

  public static popupBorderRadius = '8px';
  public static popupBoxShadow = '0px 4px 16px 0px rgba(0, 0, 0, 0.08)';
  public static popupDropShadow = 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.08))';

  public static pickerShadow = '0px 4px 16px 0px rgba(0, 0, 0, 0.08)';

  public static toastBorderRadius = '8px';

  public static hintBorderRadius = '8px';

  //#region Modal
  public static modalWindowShadow = '0px 16px 32px 0px rgba(0, 0, 0, 0.04)';
  public static modalBorderRadius = '16px';
  public static fixedPanelShadow = 'none';
  public static modalFooterBg = '#fff';
  // public static modalFixedHeaderBorder = '1px solid #EBEBEB';
  // public static modalFixedFooterBorder = '1px solid #EBEBEB';
  public static modalFooterPaddingTop = '20px';
  public static modalFooterPaddingBottom = '20px';
  public static modalFixedHeaderMarginBottom = '0px';
  public static get modalFixedHeaderPaddingBottom() {
    return this.modalHeaderPaddingBottom;
  }
  public static get modalFixedFooterPaddingTop() {
    return this.modalFooterPaddingTop;
  }
  public static modalFixedFooterMarginTop = '0px';
  public static modalSeparatorBorderBottom = '1px solid #EBEBEB';
  public static modalHeaderFontWeight = '700';
  public static modalPaddingRight = '32px';
  //#endregion

  public static checkboxCheckedBg = '#3D3D3D';

  public static menuBorderRadius = '8px';
  public static menuPaddingX = '4px';
  public static menuItemHoverBg = '#EBEBEB';
  public static menuItemHoverColor = '#222';
  public static menuItemBorderRadius = '6px';
  public static menuItemCommentColorHover = '#858585';
  public static menuShadow = '0px 4px 16px 0px rgba(0, 0, 0, 0.08)';

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

  public static get tokenDefaultIdle222() {
    return this.tokenDefaultIdle;
  }
}

export const Theme2022Internal = Object.setPrototypeOf(
  exposeGetters(Theme2022),
  DefaultThemeInternal,
) as typeof Theme2022;
