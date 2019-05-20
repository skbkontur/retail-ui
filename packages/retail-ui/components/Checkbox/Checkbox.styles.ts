import { css } from 'emotion';
import styles from './Checkbox.less';
import { ITheme } from '../../lib/theming/Theme';
import ColorFunctions from '../../lib/styles/ColorFunctions';

const jsStyles = {
  root(t: ITheme) {
    return css`
      &:hover .${styles.box} {
        background: ${t.chbHoverBg};
      }

      &:active .${styles.box} {
        box-shadow: ${t.chbShadowActive};
        background: ${t.chbActiveBg};
      }

      &.${styles.disabled} {
        color: ${t.textColorDisabled};
      }
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
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorWarning};
        border-color: ${t.borderColorWarning};
      }

      .rt-ie8 & .${styles.box} {
        outline: 1px solid ${t.borderColorWarning};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      & .${styles.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorError};
        border-color: ${t.borderColorError};
      }

      .rt-ie8 & .${styles.box} {
        outline: 1px solid ${t.borderColorError};
      }
    `;
  },

  checked(t: ITheme) {
    return css`
      & .${styles.box} {
        background: ${t.chbCheckedBg};
        color: ${t.chbCheckedColor};
      }
            
      &:hover .${styles.box} {
          background: ${ColorFunctions.darken(t.chbCheckedBg, '5%')};
      }
      
      &:active .${styles.box} {
          background: ${ColorFunctions.darken(t.chbCheckedBg, '15%')};
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

      .${styles.root}:hover & {
        background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '5%')};
      }
      .${styles.root}:active & {
        background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '15%')};
      }
    `;
  },
};

export default jsStyles;
