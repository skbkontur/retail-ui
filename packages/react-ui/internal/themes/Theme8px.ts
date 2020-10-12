import { exposeGetters, markAs8pxTheme } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme8px extends (class {} as typeof DefaultThemeInternal) {
  public static fontSizeSmall = '14px';
  public static fontSizeMedium = '16px';
  public static fontSizeLarge = '18px';
  public static controlHeightSmall = '32px';
  public static controlHeightMedium = '40px';
  public static controlHeightLarge = '48px';
  public static controlLineHeightSmall = '20px';
  public static controlLineHeightMedium = '22px';
  public static controlLineHeightLarge = '24px';
  public static controlPaddingYSmall = '5px';
  public static controlPaddingYMedium = '8px';
  public static controlPaddingYLarge = '11px';
  //#region Button
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
  public static get btnBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get btnOutlineWidth() {
    return this.controlOutlineWidth;
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
  public static get btnFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get btnFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get btnFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static btnPaddingXSmall = '15px';
  public static btnPaddingXMedium = '15px';
  public static btnPaddingXLarge = '19px';
  public static get btnPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get btnPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get btnPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static btnBorderRadiusSmall = '1px';
  public static btnBorderRadiusMedium = '1px';
  public static btnBorderRadiusLarge = '1px';

  public static btnIconGapSmall = '4px';
  public static btnIconGapMedium = '4px';
  public static btnIconGapLarge = '4px';
  public static btnIconSizeSmall = '16px';
  public static btnIconSizeMedium = '18px';
  public static btnIconSizeLarge = '20px';
  public static btnSmallArrowTop = '7px';
  public static btnSmallArrowRight = '-8px';

  public static btnSmallArrowLength = '16px';
  public static btnMediumArrowTop = '8px';
  public static btnMediumArrowLength = '21.2px';
  public static btnMediumArrowRight = '-11px';
  public static btnLargeArrowLength = '25px';
  public static btnLargeArrowLeft = '-12px';
  public static btnLargeArrowRight = '-12px';

  //#endregion
  //#region Input
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
  public static inputWidth = '200px';
  public static get inputBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get inputOutlineWidth() {
    return `calc(${this.controlOutlineWidth} - 1px)`;
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
  public static get inputFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get inputFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get inputFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static inputPaddingXSmall = '7px';
  public static inputPaddingXMedium = '11px';
  public static inputPaddingXLarge = '15px';
  public static get inputPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get inputPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get inputPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static inputBorderRadiusSmall = '0px';
  public static inputBorderRadiusMedium = '0px';
  public static inputBorderRadiusLarge = '0px';
  public static inputIconGapSmall = '4px';
  public static inputIconGapMedium = '8px';
  public static inputIconGapLarge = '12px';
  public static inputIconSizeSmall = '16px';
  public static inputIconSizeMedium = '18px';
  public static inputIconSizeLarge = '20px';
  //#endregion
  //#region Select
  public static selectWidth = '200px';
  public static get selectBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get selectOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get selectLineHeightSmall() {
    return this.controlLineHeightSmall;
  }
  public static get selectLineHeightMedium() {
    return this.controlLineHeightMedium;
  }
  public static get selectLineHeightLarge() {
    return this.controlLineHeightLarge;
  }
  public static get selectFontSizeSmall() {
    return this.fontSizeSmall;
  }
  public static get selectFontSizeMedium() {
    return this.fontSizeMedium;
  }
  public static get selectFontSizeLarge() {
    return this.fontSizeLarge;
  }
  public static selectPaddingXSmall = '7px';
  public static selectPaddingXMedium = '11px';
  public static selectPaddingXLarge = '15px';
  public static get selectPaddingYSmall() {
    return this.controlPaddingYSmall;
  }
  public static get selectPaddingYMedium() {
    return this.controlPaddingYMedium;
  }
  public static get selectPaddingYLarge() {
    return this.controlPaddingYLarge;
  }
  public static get selectBorderRadiusSmall() {
    return this.btnBorderRadiusSmall;
  }
  public static get selectBorderRadiusMedium() {
    return this.btnBorderRadiusMedium;
  }
  public static get selectBorderRadiusLarge() {
    return this.btnBorderRadiusLarge;
  }
  public static selectIconGapSmall = '4px';
  public static selectIconGapMedium = '8px';
  public static selectIconGapLarge = '12px';
  //#endregion
  //#region Checkbox
  public static get checkboxLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get checkboxFontSize() {
    return this.fontSizeSmall;
  }
  public static checkboxLabelGap = '8px';
  public static get checkboxPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.checkboxLineHeight, 10) || 0;

    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static checkboxBorderRadius = '1px';
  public static get checkboxBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get checkboxOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static checkboxBorder = 'none';
  public static get checkboxBorderWidthCompensation() {
    return this.checkboxBorderWidth;
  }

  //#endregion
  //#region Tab
  public static tabPaddingX = '12px';
  public static get tabsMarginX() {
    return this.tabPaddingX;
  }
  public static get tabPaddingY() {
    const paddingY = parseInt(this.controlPaddingYLarge, 10) || 0;
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;

    return `${paddingY + borderWidth}px`;
  }
  public static get tabFontSize() {
    return this.fontSizeLarge;
  }
  public static get tabLineHeight() {
    return this.controlLineHeightLarge;
  }
  public static tabBorderWidth = '2px';
  public static get tabOutlineWidth() {
    return this.controlOutlineWidth;
  }
  //#endregion
  //#region Toggle
  public static toggleWidth = '32px';
  public static toggleHeight = '20px';
  public static get toggleBorderRadius() {
    return `calc(${this.toggleHeight} / 2)`;
  }
  public static get toggleBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get toggleOutlineWidth() {
    return `calc(${this.controlOutlineWidth} + 1px)`;
  }
  //#endregion
  //#region Token
  public static get tokenLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get tokenFontSize() {
    return this.fontSizeSmall;
  }
  public static tokenMarginY = '2px';
  public static tokenMarginX = '4px';
  public static tokenPaddingY = '1px';
  public static tokenPaddingX = '3px';
  public static tokenBorderRadius = '1px';
  public static tokenRemoveIconSize = '8px';
  public static tokenRemoveIconPaddingY = '4px';
  public static tokenRemoveIconPaddingX = '4px';
  public static tokenRemoveIconGap = '4px';
  public static tokenRemoveIconBoxSizing = 'content-box';
  public static tokenBorderColorDisabled = '#dadada';
  public static tokenDisabledBg = '#e5e5e5';
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
    return `0 0 0 ${this.tokenBorderWidth} ${this.tokenBorderColorDisabled}`;
  }
  //#endregion
  //#region TokenInput
  public static tokenInputLineHeight = '26px';
  //#endregion
  //#region Spinner

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
  public static spinnerPaddingXSmall = '9px';
  public static spinnerPaddingYMedium = '-2px';
  public static spinnerPaddingYLarge = '2px';
  //#endregion
  //#region SpinnerOld
  public static get spinnerOldFontSizeSmall() {
    return this.spinnerFontSizeSmall;
  }
  public static get spinnerOldFontSizeMedium() {
    return this.spinnerFontSizeMedium;
  }
  public static get spinnerOldFontSizeLarge() {
    return this.spinnerFontSizeLarge;
  }
  public static get spinnerOldLineHeightSmall() {
    return this.spinnerLineHeightSmall;
  }
  public static get spinnerOldLineHeightMedium() {
    return this.spinnerLineHeightMedium;
  }
  public static get spinnerOldLineHeightLarge() {
    return this.spinnerLineHeightLarge;
  }
  public static get spinnerOldPaddingXSmall() {
    return this.spinnerPaddingXSmall;
  }
  public static get spinnerOldPaddingYMedium() {
    return this.spinnerPaddingYMedium;
  }
  public static get spinnerOldPaddingYLarge() {
    return this.spinnerPaddingYLarge;
  }
  //#endregion
  //#region Link
  public static linkIconMarginRight = '4px';
  public static linkButtonLineHeight = '34px';
  public static linkButtonPaddingX = '10px';
  //#endregion
  //#region Textarea
  public static textareaWidth = '250px';
  public static get textareaBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get textareaOutlineWidth() {
    return `calc(${this.controlOutlineWidth} - 1px)`;
  }
  public static get textareaFontSize() {
    return this.fontSizeSmall;
  }
  public static textareaBorderRadius = '0px';
  public static textareaPaddingX = '7px';
  public static get textareaPaddingY() {
    return this.controlPaddingYSmall;
  }
  public static get textareaLineHeight() {
    return this.controlLineHeightSmall;
  }
  //#endregion
  //#region Radio
  public static get radioLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static get radioFontSize() {
    return this.fontSizeSmall;
  }
  public static radioLabelGap = '8px';
  public static get radioPaddingY() {
    const controlHeight = parseInt(this.controlHeightSmall, 10) || 0;
    const lineHeight = parseInt(this.radioLineHeight, 10) || 0;

    return `${(controlHeight - lineHeight) / 2}px`;
  }
  public static radioSize = '16px';
  public static get radioBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get radioOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static radioBulletSize = '8px';
  public static get radioBorderWidthCompensation() {
    return this.radioBoxShadow !== 'none' ? this.radioBorderWidth : '0px';
  }
  public static get radioSizeAfter() {
    const borderCompensation =
      this.radioBoxShadow === 'none' ? this.radioBorderWidth : this.radioBorderWidthCompensation;
    return `calc(${this.radioSize} + 2 * ${this.radioOutlineWidth} - 2 * ${borderCompensation})`;
  }
  public static radioVerticalAlign = 'top';
  //#endregion
  //#region Switcher
  public static get switcherOutlineWidth() {
    return this.btnOutlineWidth;
  }
  public static get switcherLabelFontSizeSmall() {
    return this.btnFontSizeSmall;
  }
  public static get switcherLabelFontSizeMedium() {
    return this.btnFontSizeMedium;
  }
  public static get switcherLabelFontSizeLarge() {
    return this.btnFontSizeLarge;
  }
  public static get switcherLabelLineHeightSmall() {
    return this.btnLineHeightSmall;
  }
  public static get switcherLabelLineHeightMedium() {
    return this.btnLineHeightMedium;
  }
  public static get switcherLabelLineHeightLarge() {
    return this.btnLineHeightLarge;
  }
  public static get switcherLabelGapSmall() {
    return this.btnPaddingXSmall;
  }
  public static get switcherLabelGapMedium() {
    return this.btnPaddingXMedium;
  }
  public static get switcherLabelGapLarge() {
    return this.btnPaddingXLarge;
  }
  public static switcherButtonPaddingXSmall = '7px';
  public static switcherButtonPaddingXMedium = '11px';
  public static switcherButtonPaddingXLarge = '15px';
}

export const Theme8pxInternal = exposeGetters(markAs8pxTheme(Theme8px));
