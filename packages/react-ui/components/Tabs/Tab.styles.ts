import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

const styles = {
  root(t: Theme) {
    const paddingTop = is8pxTheme(t) ? t.tabPaddingY : shift(t.tabPaddingY, '-1px');
    const paddingBottom = is8pxTheme(t) ? `calc(${t.tabPaddingY} - ${t.tabBorderWidth})` : shift(t.tabPaddingY, '1px');
    return css`
      border-bottom: ${t.tabBorderWidth} solid transparent;
      box-sizing: border-box;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font-size: ${t.tabFontSize};
      line-height: ${t.tabLineHeight};
      margin-left: ${t.tabPaddingX};
      margin-right: ${t.tabPaddingX};
      padding-bottom: ${paddingBottom};
      padding-top: ${paddingTop};
      position: relative;
      text-decoration: inherit;
      transition: border-bottom 0.2s ease-out;

      &:hover {
        outline: inherit;
        border-bottom: ${t.tabBorderWidth} solid ${t.tabColorHover};
      }

      &:focus {
        outline: inherit;
      }
    `;
  },

  vertical(t: Theme) {
    return css`
      border-bottom: none;
      border-left: ${t.tabBorderWidth} solid transparent;
      display: block;
      margin-left: 0;
      margin-right: 0;
      padding-left: ${shift(t.tabPaddingX, `-${t.tabBorderWidth}`)};
      padding-right: ${t.tabPaddingX};

      ${cssName(styles.root(t))}&:hover {
        border-bottom: none;
        border-left: ${t.tabBorderWidth} solid ${t.tabColorHover};
      }

      ${cssName(styles.focus(t))} {
        bottom: 0;
        left: -${t.tabBorderWidth};
        right: 0;
      }
    `;
  },

  active(t: Theme) {
    return css`
      &:hover {
        cursor: default;
        border-bottom: ${t.tabBorderWidth} solid transparent;
      }

      &${cssName(styles.vertical(t))}:hover {
        border-left: ${t.tabBorderWidth} solid transparent;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      border: ${t.tabOutlineWidth} solid ${t.tabColorFocus};
      bottom: -${t.tabBorderWidth};
      left: -${t.tabPaddingX};
      position: absolute;
      right: -${t.tabPaddingX};
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
        border-bottom-color: ${t.tabColorHoverPrimary};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverSuccess};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverWarning};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverError};
      }
      &${cssName(styles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverError};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
