import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';
import { is8pxTheme } from '../../lib/theming/ThemeHelpers';

export const styles = memoizeStyle({
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

      &:hover {
        border-bottom: none;
        border-left: ${t.tabBorderWidth} solid ${t.tabColorHover};
      }

      [data-focus] {
        bottom: 0;
        left: -${t.tabBorderWidth};
        right: 0;
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
    `;
  },

  active() {
    return css`
      cursor: default;
    `;
  },
});

export const horizontalStyles = memoizeStyle({
  active(t: Theme) {
    return css`
      &:hover {
        border-bottom: ${t.tabBorderWidth} solid transparent;
      }
    `;
  },

  disabled() {
    return css`
      &:hover {
        border-bottom-color: transparent;
      }
    `;
  },

  primary(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverError};
      }
    `;
  },
});

export const verticalStyles = memoizeStyle({
  active(t: Theme) {
    return css`
      &:hover {
        border-left: ${t.tabBorderWidth} solid transparent;
      }
    `;
  },

  disabled() {
    return css`
      &:hover {
        border-left-color: transparent;
      }
    `;
  },

  primary(t: Theme) {
    return css`
      &:hover {
        border-left-color: ${t.tabColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-left-color: ${t.tabColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-left-color: ${t.tabColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-left-color: ${t.tabColorHoverError};
      }
    `;
  },
});
