import type { BasicLightThemeInternal } from '@skbkontur/react-ui/internal/themes/BasicLightTheme';
import type { Theme as ReactUITheme } from '@skbkontur/react-ui/lib/theming/Theme';
import { exposeGetters } from '@skbkontur/react-ui/lib/theming/ThemeHelpers';

export const REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY = '__IS_REACT_UI_TABLE_CONSTRUCTOR_THEME__';
export class TableTheme extends (class {} as typeof BasicLightThemeInternal) {
  public static tableBaseSize = '8px';
  public static get tableStickyBackground() {
    return this.bgDefault;
  }
  public static get tableText() {
    return this.textColorDefault;
  }
  public static get tableSecondaryText() {
    return this.menuHeaderColor;
  }
  public static get tableOutline() {
    return this.inputFocusOutline;
  }
  public static get tableOutlineWidth() {
    return this.controlOutlineWidth;
  }
  public static get tableBorder() {
    return this.btnDefaultActiveBg;
  }
  public static get tableRowHover() {
    return this.bgDisabled;
  }
  public static get tableShadowLight() {
    return this.bgDisabled;
  }
  public static get tableRowCheckedHoverLight() {
    return this.btnDefaultActiveBg;
  }
  public static get tableRowCheckedHoverDark() {
    return this.bgDisabled;
  }
  public static get tableShadowMediumLight() {
    return this.btnDefaultActiveBg;
  }
  public static get tableShadowMediumDark() {
    return this.bgDisabled;
  }
  public static get tableRed() {
    return this.red;
  }
  public static get tableRedDark() {
    return this.redDark;
  }
  public static get tableRoundButtonBackground() {
    return this.tokenDisabledBg;
  }
  public static get tableRoundButtonActiveBackground() {
    return this.kebabBackgroundActive;
  }
  public static get tableRowCheckedActive() {
    return this.grayXLight;
  }
  public static get tableDangerActiveColor() {
    return this.btnDangerTextColor;
  }
}

export const markAsTableTheme = <T extends object>(theme: T): T => {
  return Object.create(theme, {
    [REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY]: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
  });
};

export const isTableTheme = (theme: ReactUITheme | TableTheme): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return theme[REACT_UI_TABLE_CONSTRUCTOR_THEME_KEY] === true;
};

export const TableThemeInternal = exposeGetters(TableTheme) as typeof TableTheme;
