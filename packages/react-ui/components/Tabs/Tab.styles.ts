import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font-size: ${t.tabFontSize};
      line-height: ${t.tabLineHeight};
      margin-left: ${t.tabPaddingX};
      margin-right: ${t.tabPaddingX};
      padding-bottom: 11px;
      padding-top: 9px;
      position: relative;
      text-decoration: inherit;
      transition: border-bottom 0.2s ease-out;

      &:hover {
        outline: inherit;
        border-bottom: 3px solid ${t.tabColorHover};
      }

      &:focus {
        outline: inherit;
      }
    `;
  },

  vertical(t: Theme) {
    return css`
      border-bottom: none;
      border-left: 3px solid transparent;
      display: block;
      margin-left: 0;
      margin-right: 0;
      padding-left: 17px;
      padding-right: 20px;

      ${cssName(styles.root(t))}&:hover {
        border-bottom: none;
        border-left: 3px solid ${t.tabColorHover};
      }

      ${cssName(styles.focus(t))} {
        bottom: 0;
        left: -3px;
        right: 0;
      }
    `;
  },

  active(t: Theme) {
    return css`
      &:hover {
        cursor: default;
        border-bottom: 3px solid transparent;
      }

      &${cssName(styles.vertical(t))}:hover {
        border-left: 3px solid transparent;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      border: 2px solid ${t.tabColorFocus};
      bottom: -3px;
      left: -20px;
      position: absolute;
      right: -20px;
      top: 0;
    `;
  },

  disabled(t: Theme) {
    return css`
      color: rgba(
        ${ColorFunctions.red(t.tabTextColorDefault)},
        ${ColorFunctions.green(t.tabTextColorDefault)},
        ${ColorFunctions.blue(t.tabTextColorDefault)},
        0.5
      );
      cursor: default;

      &:hover {
        border-bottom-color: transparent !important;
      }

      &${cssName(styles.vertical(t))}:hover {
        border-left-color: transparent !important;
      }
    `;
  },

  primary(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabBorderColorHoverPrimary};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabBorderColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabBorderColorHoverSuccess};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabBorderColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabBorderColorHoverWarning};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabBorderColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabBorderColorHoverError};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabBorderColorHoverError};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
