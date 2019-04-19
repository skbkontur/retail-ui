import { css, cx } from 'emotion';
import styles from './Checkbox.less';
import { ITheme } from '../../lib/ThemeManager';
import ColorFunctions from '../../lib/styles/ColorFunctions';
import Upgrade from '../../lib/Upgrades';

const jsStyles = {
  root(t: ITheme) {
    return css`
      &:hover {
        .${styles.box} {
          background: ${t.chbHoverBg};
        }
        .${cx(jsStyles.box(t), jsStyles.boxIndeterminate(t))} {
          // hack with background.
          // TODO remove after moving variables from .less to js Object
          background: ${
            Upgrade.isFlatDesignEnabled() ? ColorFunctions.darken(t.chbBoxIndeterminateBgHover, '5%') : t.chbHoverBg
          };
        }
      }

      &:active {
        .${styles.box} {
          box-shadow: ${t.chbShadowActive};
          background: ${t.chbActiveBg};
        }
        .${cx(jsStyles.box(t), jsStyles.boxIndeterminate(t))} {
          // hack with background.
          // TODO remove after moving variables from .less to js Object
          background: ${
            Upgrade.isFlatDesignEnabled() ? ColorFunctions.darken(t.chbBoxIndeterminateBgActive, '15%') : t.chbActiveBg
          };
        }
      }

      &.${styles.disabled} {
        color: ${t.textColorDisabled};
      }

      // .${cx(jsStyles.checked(t), jsStyles.focus(t))} .${styles.box} {
      //   border-color: ${t.chbBorderColorFocus};
      //   box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.chbBorderColorFocus};
      // }
    `;
  },

  box(t: ITheme) {
    return css`
      color: ${t.textColorDefault};
      border: ${t.chbBorder};
      box-shadow: ${t.chbShadow};
      background: ${t.chbBg};

      .${styles.disabled} & {
        box-shadow: ${t.chbShadowDisabled} !important; //to overide hover and active
        background: ${t.bgDisabled} !important;
        color: ${t.textColorDisabled} !important;
        border-color: transparent;
      }
    `;
  },

  indeterminate(t: ITheme) {
    return css`
      background: ${t.chbIndeterminateBg};

      .${styles.disabled} & {
        background: ${t.textColorDisabled};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      & .${styles.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.warningMain};
        border-color: ${t.borderColorWarning};
      }

      .rt-ie8 & .${styles.box} {
        outline: 1px solid ${t.warningMain};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      & .${styles.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.errorMain};
        border-color: ${t.borderColorError};
      }

      .rt-ie8 & .${styles.box} {
        outline: 1px solid ${t.errorMain};
      }
    `;
  },

  checked(t: ITheme) {
    return css`
      & .${styles.box} {
        background: ${t.chbCheckedBg};
        color: ${t.chbCheckedColor};
      }
            
      &:hover {
        .${styles.box} {
          background: ${Upgrade.isFlatDesignEnabled() ? ColorFunctions.darken(t.chbCheckedBg, '5%') : t.chbCheckedBg};
      }
      
      &:active {
        .${styles.box} {
          background: ${Upgrade.isFlatDesignEnabled() ? ColorFunctions.darken(t.chbCheckedBg, '15%') : t.chbCheckedBg};
        }
      }
    `;
  },

  focus(t: ITheme): string {
    return css`
      & .${styles.box} {
        border-color: ${t.chbBorderColorFocus};
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.chbBorderColorFocus};
      }

      .rt-ie8 & .${styles.box} {
        outline: 1px solid ${t.chbBorderColorFocus};
      }
    `;
  },

  boxIndeterminate(t: ITheme) {
    return css`
      background: ${t.chbBoxIndeterminateBg};
    `;
  },
};

export default jsStyles;
