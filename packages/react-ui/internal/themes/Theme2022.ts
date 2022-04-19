import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022 extends (class {} as typeof DefaultThemeInternal) {
  public static primaryColor = '#3d3d3d';
  public static primaryHoverColor = '#292929';
  public static primaryActiveColor = '#141414';

  public static get linkColor() {
    return this.textColorDefault;
  }
  public static get linkActiveColor() {
    return this.primaryColor;
  }

  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';

  public static textareaBorderRadius = '2px';

  public static get calendarCellHoverBgColor() {
    return this.primaryColor;
  }

  public static lightBackground = 'rgba(0,0,0,0.04)';

  public static btnBorderRadiusSmall = '8px';
  public static btnBorderRadiusMedium = '8px';
  public static btnBorderRadiusLarge = '8px';

  public static btnPaddingXSmall = '12px';
  public static btnPaddingXMedium = '16px';
  public static btnPaddingXLarge = '20px';

  public static btnPaddingYSmall = '6px';
  public static btnPaddingYMedium = '9px';
  public static btnPaddingYLarge = '12px';

  public static btnIconGapMedium = '6px';
  public static btnIconGapLarge = '8px';

  public static btnIconSizeMedium = '20px';
  public static btnIconSizeLarge = '24px';

  public static get btnPrimaryBg() {
    return this.primaryColor;
  }
  public static get btnPrimaryHoverBg() {
    return this.primaryHoverColor;
  }
  public static get btnPrimaryHoverBorderColor() {
    return this.primaryHoverColor;
  }
  public static get btnPrimaryBorderColor() {
    return this.primaryColor;
  }
  public static get btnPrimaryActiveBg() {
    return this.primaryActiveColor;
  }
  public static get btnPrimaryActiveBorderColor() {
    return this.primaryActiveColor;
  }

  public static menuPaddingX = '4px';
  public static menuItemBorderRadius = '6px';
  public static menuItemCommentColor = '#858585';
  public static menuItemCommentColorHover = '#636363';
  public static get menuItemHoverColor() {
    return this.textColorDefault;
  }

  public static modalBorderRadius = '16px';
  public static modalHeaderFontWeight = 'bold';
  public static modalPaddingLeft = '32px';
  public static modalPaddingRight = '32px';
  public static modalFooterPaddingBottom = '20px';

  public static get hintBorderRadius() {
    return this.popupBorderRadius;
  }

  public static get dropdownMenuSelectedBg() {
    return this.grayXLight;
  }

  public static inputBorderRadius = '2px';
  public static inputIconGapMedium = '6px';
  public static inputIconGapLarge = '8px';
  public static inputIconSizeMedium = '20px';
  public static inputIconSizeLarge = '24px';

  public static tokenBorderRadius = '2px';
  public static get tokenInputBorderRadius() {
    return this.inputBorderRadius;
  }

  public static fileUploaderBorderRadius = '8px';
  public static get fileUploaderTextColorDefault() {
    return this.gray;
  }
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = 'rgba(0,0,0,0.04)';

  public static radioBulletSize = '6px';

  public static checkboxBorderRadius = '4px';
  public static get checkboxCheckedBg() {
    return this.primaryColor;
  }

  public static kebabPaddingXSmall = '4px';
  public static kebabPaddingXMedium = '6px';
  public static kebabPaddingXLarge = '8px';

  public static toastBorderRadius = '8px';

  public static get dropdownMenuHoverBg() {
    //deprecated
    return this.bgDisabled;
  }

  public static toggleHandleBgActive = this.white;
  public static toggleBg = this.primaryColor;
  public static toggleBoxShadowColor = this.primaryColor;
  public static get toggleHandleSize() {
    return `${parseInt(this.toggleHeight, 10) - 6 * parseInt(this.toggleBorderWidth, 10)}px`;
  }
  public static get toggleHandleLeft() {
    return `${parseInt(this.toggleBorderWidth) + 2}px`;
  }
  public static get toggleHandleTop() {
    return `${parseInt(this.toggleBorderWidth) + 2}px`;
  }
  public static get toggleInputHandleCheckedHeight() {
    return `${parseInt(this.toggleHeight) - 4 * parseInt(this.toggleBorderWidth) - 2}px`;
  }
  public static get toogleHandleBgActive() {
    return this.white;
  }
  public static get toggleHandleCheckedTop() {
    return `${parseInt(this.toggleBorderWidth) + 2}px`;
  }
  public static get toggleHandleCheckedWidth() {
    return this.toggleInputHandleSize;
  }
  public static get toggleBgChecked() {
    return this.btnPrimaryBg;
  }

  public static popupBorderRadius = '8px';

  public static switcherErrorBorderRadius = '8px';

  public static tokenPaddingY = '1px';
  public static tokenPaddingX = '3px';
  public static tokenMarginY = '4px';
  public static tokenMarginX = '2px';
}

export const Theme2022Internal = Object.setPrototypeOf(
  exposeGetters(Theme2022),
  DefaultThemeInternal,
) as typeof Theme2022;
