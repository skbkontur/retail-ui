import { css, prefixer } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import ColorFunctions from '../../lib/styles/ColorFunctions';

const jsStyles = {
  root(t: ITheme) {
    return css`
      display: inline-flex;
      vertical-align: top;
      align-items: start;
      cursor: pointer;
      position: relative;
      user-select: none;
      line-height: 20px;

      &:hover .${classes.box} {
        background: ${t.chbHoverBg};
        box-shadow: ${t.chbShadowHover};
      }

      &:active .${classes.box} {
        box-shadow: ${t.chbShadowActive};
        background: ${t.chbActiveBg};
      }

      &.${classes.disabled} {
        color: ${t.textColorDisabled};
      }

      .rt-ie-any & {
        display: inline-table;
      }
    `;
  },

  box(t: ITheme) {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      flex: none;
      margin-top: 2px;
      font-size: 14px;
      color: ${t.textColorDefault};
      border: ${t.chbBorder};
      border-radius: ${t.chbBorderRadius};
      box-shadow: ${t.chbShadow};
      background: ${t.chbBg};

      .${classes.disabled} & {
        box-shadow: ${t.chbShadowDisabled} !important; //to override hover and active
        background: ${t.bgDisabled} !important;
        color: ${t.textColorDisabled} !important;
      }

      .rt-ie-any & {
        margin-top: 3px;
      }
    `;
  },

  input(t: ITheme) {
    return css`
      display: inline-block;
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
      z-index: -1;
    `;
  },

  indeterminate(t: ITheme) {
    return css`
      width: 8px;
      height: 8px;
      background: ${t.chbIndeterminateBg};
      border-radius: ${t.chbIndeterminateBorderRadius};

      .${classes.disabled} & {
        background: ${t.textColorDisabled};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      & .${classes.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorWarning} !important;
      }
    `;
  },

  error(t: ITheme) {
    return css`
      & .${classes.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.borderColorError} !important;
      }
    `;
  },

  checked(t: ITheme) {
    return css`
      & .${classes.box} {
        background: ${t.chbCheckedBg};
        color: ${t.chbCheckedColor};
        box-shadow: ${t.chbCheckedShadow};
      }

      &:hover .${classes.box} {
        box-shadow: ${t.chbCheckedHoverShadow};
        background: ${ColorFunctions.darken(t.chbCheckedBg, '5%')};
      }

      &:active .${classes.box} {
          background: ${ColorFunctions.darken(t.chbCheckedBg, '15%')};
        }
      }
    `;
  },

  focus(t: ITheme): string {
    return css`
      & .${classes.box} {
        box-shadow: inset 0 0 0 1px ${t.outlineColorFocus}, 0 0 0 ${t.chbShadowWidth} ${t.chbBorderColorFocus} !important;
      }
    `;
  },

  disabled(t: ITheme): string {
    return css`
      cursor: default;
    `;
  },

  boxIndeterminate(t: ITheme) {
    return css`
      background: ${t.chbBoxIndeterminateBg};
      box-shadow: ${t.chbCheckedShadow};

      .${classes.root}:hover & {
        background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '5%')};
        box-shadow: ${t.chbCheckedHoverShadow};
      }
      .${classes.root}:active & {
        background: ${ColorFunctions.darken(t.chbBoxIndeterminateBg, '15%')};
      }
    `;
  },

  caption(t: ITheme) {
    return css`
      padding-left: 10px;

      .rt-ie-any & {
        display: table-cell;
      }
    `;
  },

  boxWrapperIE11(t: ITheme) {
    return css`
      display: table-cell;
      vertical-align: top;
      text-align: center;
    `;
  },
};

export const classes = prefixer({
  root: 'root',
  box: 'box',
  disabled: 'disabled',
});

export default jsStyles;
