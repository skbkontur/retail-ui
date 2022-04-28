import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class NotFlatTheme extends (class {} as typeof DefaultThemeInternal) {
  //#region Button
  public static btnArrowBgImageActive =
    'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 15%), linear-gradient(-95deg, rgba(0,0,0,0.1) 0%, transparent 4%)';
  public static btnArrowBgImageChecked =
    'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 15%), linear-gradient(-95deg, rgba(0,0,0,0.1) 0%, transparent 4%)';
  public static btnLinkBorderRadius = '1px';
  public static btnDisabledBorderColor = 'rgba(0, 0, 0, 0.15)';
  public static btnCheckedBg = '#737373';
  public static btnCheckedDisabledBorderColor = 'rgba(161,161,161,1)';
  public static btnCheckedShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.3)';
  public static btnDefaultBg = 'none';
  public static btnDefaultBgStart = '#fff';
  public static btnDefaultBgEnd = '#ebebeb';
  public static btnDefaultCheckedBorderColor = 'rgba(102,102,102,1)';
  public static btnDefaultHoverBg = 'none';
  public static btnDefaultHoverBgEnd = '#dfdfdf';
  public static btnDefaultHoverBorderColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultHoverBorderBottomColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultActiveBorderColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultActiveBorderTopColor = 'rgba(0, 0, 0, 0.2)';
  public static btnDefaultBorderBottomColor = 'rgba(0, 0, 0, 0.1)';
  public static btnDefaultActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnSuccessHoverBg = 'none';
  public static btnSuccessHoverBorderColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessHoverBorderBottomColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessBorderColor = 'rgba(25, 103, 6, 0.7)';
  public static btnSuccessBorderBottomColor = 'rgba(25, 103, 6, 0.7)';
  public static btnSuccessBgStart = '#4ba91d';
  public static btnSuccessBgEnd = '#37910b';
  public static btnSuccessHoverBgStart = '#3b8d13';
  public static btnSuccessHoverBgEnd = '#317e0b';
  public static btnSuccessActiveBg = '#35840e';
  public static btnSuccessActiveBorderColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessActiveBorderTopColor = 'rgba(8, 73, 2, 0.7)';
  public static btnSuccessActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnPrimaryBg = '#1e8dd4';
  public static btnPrimaryHoverBg = 'none';
  public static btnPrimaryHoverBorderColor = 'rgba(5, 61, 100, 0.7)';
  public static btnPrimaryHoverBorderBottomColor = 'rgba(5, 61, 100, 0.7)';
  public static btnPrimaryBorderColor = 'rgba(14, 81, 129, 0.7)';
  public static btnPrimaryBorderBottomColor = 'rgba(14, 81, 129, 0.7)';
  public static btnPrimaryBgStart = '#2899ea';
  public static btnPrimaryBgEnd = '#167ac1';
  public static btnPrimaryHoverBgStart = '#0087d5';
  public static btnPrimaryHoverBgEnd = '#167ac1';
  public static btnPrimaryActiveBg = '#0079c3';
  public static btnPrimaryActiveBorderColor = 'rgba(5, 61, 100, 0.7) ';
  public static btnPrimaryActiveBorderTopColor = 'rgba(5, 61, 100, 0.7)';
  public static btnPrimaryActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.2)';
  public static btnDangerBg = '#e14c30';
  public static btnDangerHoverBg = 'none';
  public static btnDangerHoverBorderColor = 'rgba(145, 0, 0, 0.7)';
  public static btnDangerHoverBorderBottomColor = 'rgba(145, 0, 0, 0.85)';
  public static btnDangerBorderColor = 'rgba(173,15,0,0.7)';
  public static btnDangerBorderBottomColor = 'rgba(173,15,0,0.7)';
  public static btnDangerBgStart = '#ec5438';
  public static btnDangerBgEnd = '#d44327';
  public static btnDangerHoverBgStart = '#d44227';
  public static btnDangerHoverBgEnd = '#c73013';
  public static btnDangerActiveBg = '#cd381b';
  public static btnDangerActiveBorderColor = 'rgba(145, 0, 0, 0.7)';
  public static btnDangerActiveBorderTopColor = 'rgba(145, 0, 0, 0.85)';
  public static btnDangerActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)';
  public static btnPayBg = '#ffc943';
  public static btnPayHoverBg = 'none';
  public static btnPayHoverBorderColor = 'rgba(227, 142, 8, 0.7)';
  public static btnPayHoverBorderBottomColor = '227, 142, 8, 0.85)';
  public static btnPayBorderColor = 'rgba(238, 169, 34, 0.7)';
  public static btnPayBorderBottomColor = 'rgba(238, 169, 34, 0.7)';
  public static btnPayBgStart = '#ffd54b';
  public static btnPayBgEnd = '#ffbb39';
  public static btnPayHoverBgStart = '#ffbd3a';
  public static btnPayHoverBgEnd = '#f8a91d';
  public static btnPayActiveBg = '#fbb028';
  public static btnPayActiveBorderColor = 'rgba(227, 142, 8, 0.7)';
  public static btnPayActiveBorderTopColor = 'rgba(227, 142, 8, 0.85)';
  public static btnPayActiveShadow = 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)';
  public static get btnFontSizeMedium() {
    return this.fontSizeMedium;
  }
  //#endregion
  //#region Select
  public static get selectFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get selectMenuArrowColorDisabled() {
    return this.selectMenuArrowColor;
  }
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
  //#region Toggle
  public static toggleHandleBg = 'linear-gradient(-180deg, #fff, #ebebeb)';
  public static toggleCheckedBg = 'linear-gradient(-180deg, #fff, #ebebeb)';
  public static get toggleBgHover() {
    return this.toggleBgFocus;
  }
  public static get toggleCheckedBgHover() {
    return this.toggleBgFocus;
  }
  public static get toggleBgActive() {
    return this.toggleBgChecked;
  }
  //#endregion
  //#region Input
  public static inputShadow = 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)';
  public static get inputDisabledBorderColor() {
    return this.borderColorGrayLight;
  }
  public static get inputBorderTopColor() {
    return this.borderColorGrayDark;
  }
  //#endregion
  //#region Checkbox
  public static get checkboxShadowDisabled() {
    return `0 0 0 ${this.checkboxBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static get checkboxShadowHover() {
    return this.checkboxShadow;
  }
  public static get checkboxCheckedColor() {
    return this.textColorDefault;
  }
  public static get checkboxCheckedHoverShadow() {
    return this.checkboxShadow;
  }
  public static get checkboxCheckedShadow() {
    return this.checkboxShadow;
  }
  public static get checkboxCheckedActiveShadow() {
    return `${this.checkboxShadow}, ${this.btnDefaultActiveShadow}`;
  }
  public static get checkboxBg() {
    return `linear-gradient(${this.checkboxBgStart}, ${this.checkboxBgEnd})`;
  }
  public static get checkboxHoverBg() {
    return `linear-gradient(-180deg, ${this.btnDefaultHoverBgStart} 0, ${this.btnDefaultHoverBgEnd} 100%)`;
  }
  public static get checkboxCheckedBg() {
    return this.checkboxBg;
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
  public static textareaShadow = 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)';

  public static get textareaBorderTopColor() {
    return this.borderColorGrayDark;
  }
  public static get textareaDisabledBg() {
    return this.bgDisabled;
  }
  public static get textareaDisabledBorderColor() {
    return this.borderColorGrayLight;
  }
  //#endregion
  //#region Radio
  public static radioBgImage = 'linear-gradient(-180deg, #fff 0, #ebebeb 100%)';
  public static radioBgColor = 'transparent';
  public static radioHoverBg = 'linear-gradient(-180deg, #f2f2f2 0, #dfdfdf 100%)';
  public static radioActiveBg = 'linear-gradient(-180deg, #e1e1e1 0, #e1e1e1 100%)';
  public static get radioBoxShadow() {
    return `0 ${this.radioBorderWidth} 0 0 ${this.radioBorderColor}, 0 0 0 ${this.radioBorderWidth} ${this.radioBorderColor}`;
  }
  public static radioBorder = '0 none';
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
  public static get radioDisabledShadow() {
    return `0 0 0 ${this.radioBorderWidth} rgba(0, 0, 0, 0.15)`;
  }
  public static radioBorderWidthCompensation = '1px';
  //#endregion
  //#region Switcher
  public static get switcherButtonDisabledBorderColor() {
    return this.btnDisabledBorderColor;
  }
  public static get switcherButtonCheckedDisabledShadow() {
    return this.btnCheckedDisabledShadow;
  }
  //#endregion
  //#region Token
  public static tokenDisabledBg = 'rgba(0, 0, 0, 0.10)';
  public static get tokenShadowDisabled() {
    return `0 0 0 ${this.tokenBorderWidth} ${this.tokenBorderColorDisabled}`;
  }
  //#endregion
}

export const NotFlatThemeInternal = exposeGetters(NotFlatTheme);
