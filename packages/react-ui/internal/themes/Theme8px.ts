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
  public static get btnBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get btnBorderWidthFocus() {
    return this.controlBorderWidthFocus;
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
  public static btnLargeArrowLength = '24px';
  public static btnLargeArrowLeft = '-11px';
  public static btnLargeArrowRight = '-11px';

  //#endregion
  //#region Input
  public static inputWidth = '200px';
  public static get inputBorderWidth() {
    return this.controlBorderWidth;
  }
  public static get inputBorderWidthFocus() {
    return `calc(${this.controlBorderWidthFocus} - 1px)`;
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
  public static get selectBorderWidthFocus() {
    return this.controlBorderWidthFocus;
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
  public static get checkboxBorderWidthFocus() {
    return this.controlBorderWidthFocus;
  }
  public static checkboxBorder = 'none';
  public static get checkboxBorderWidthCompensation() {
    return this.checkboxBorderWidth;
  }

  //#endregion
  //#region Tab
  public static tabPaddingX = '16px';
  public static get tabsMarginX() {
    return this.tabPaddingX;
  }
  public static get tabPaddingY() {
    const paddingYSmall = parseInt(this.controlPaddingYSmall, 10) || 0;
    const borderWidth = parseInt(this.controlBorderWidth, 10) || 0;

    return `${paddingYSmall + borderWidth}px`;
  }
  public static get tabFontSize() {
    return this.fontSizeSmall;
  }
  public static get tabLineHeight() {
    return this.controlLineHeightSmall;
  }
  public static tabBorderWidth = '2px';
  public static get tabBorderWidthFocus() {
    return this.controlBorderWidthFocus;
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
  public static get toggleBorderWidthFocus() {
    return `calc(${this.controlBorderWidthFocus} + 1px)`;
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
  public static tokenPaddingX = '4px';
  public static tokenBorderRadius = '1px';
  public static tokenCloseIconSize = '8px';
  public static tokenCloseIconPaddingY = '4px';
  public static tokenCloseIconPaddingX = '4px';
  public static tokenCloseIconGap = '4px';
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
  public static spinnerPaddingXSmall = '6px';
  public static spinnerPaddingYMedium = '4px';
  public static spinnerPaddingYLarge = '12px';
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
  public static get textareaBorderWidthFocus() {
    return `calc(${this.controlBorderWidthFocus} - 1px)`;
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
  public static get textareaHeight() {
    const lineHeight = parseInt(this.textareaLineHeight, 10) || 0;
    const paddingY = parseInt(this.textareaPaddingY, 10) || 0;
    const borderWidth = parseInt(this.textareaBorderWidth, 10) || 0;

    return `${lineHeight * 3 + paddingY * 2 + borderWidth * 2}px`;
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
  public static get radioBorderWidthFocus() {
    return this.controlBorderWidthFocus;
  }
  public static radioBulletSize = '8px';
  public static get radioBorderWidthCompensation() {
    return this.radioBoxShadow !== 'none' ? this.radioBorderWidth : '0px';
  }
  public static get radioSizeAfter() {
    const borderCompensation =
      this.radioBoxShadow === 'none' ? this.radioBorderWidth : this.radioBorderWidthCompensation;
    return `calc(${this.radioSize} + 2 * ${this.radioBorderWidthFocus} - 2 * ${borderCompensation})`;
  }
  public static radioVerticalAlign = 'top';
  //#endregion
}

export const Theme8pxInternal = exposeGetters(markAs8pxTheme(Theme8px));
