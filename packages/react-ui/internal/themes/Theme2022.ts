import { exposeGetters } from '../../lib/theming/ThemeHelpers';

import { DefaultThemeInternal } from './DefaultTheme';

export class Theme2022 extends (class {} as typeof DefaultThemeInternal) {
  public static linkColor = '#3D3D3D';
  public static linkActiveColor = '#141414';

  public static btnPrimaryBg = '#3D3D3D';
  public static btnPrimaryBorderColor = '#3D3D3D';

  public static btnPrimaryHoverBg = '#292929';
  public static btnPrimaryHoverBorderColor = '#292929';

  public static btnPrimaryActiveBg = '#141414';
  public static btnPrimaryActiveBorderColor = '#141414';

  public static btnBorderRadiusSmall = '8px';
  public static btnBorderRadiusMedium = '8px';
  public static btnBorderRadiusLarge = '8px';

  public static inputBorderRadiusSmall = '2px';
  public static inputBorderRadiusMedium = '2px';
  public static inputBorderRadiusLarge = '2px';

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

  public static fileUploaderBorderRadius = '8px';
  public static fileUploaderLinkHoverTextDecoration = 'none';
  public static fileUploaderHoveredBg = 'rgba(0, 0, 0, 0.04)';

  public static tokenInputBorderRadius = '2px';
  public static tokenBorderRadius = '2px';

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
