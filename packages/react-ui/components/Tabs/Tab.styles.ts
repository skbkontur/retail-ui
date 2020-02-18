import { css, cssName } from '../../lib/theming/Emotion';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
      margin-left: 20px;
      margin-right: 20px;
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

      ${cssName(jsStyles.root(t))}&:hover {
        border-bottom: none;
        border-left: 3px solid ${t.tabColorHover};
      }

      ${cssName(jsStyles.focus(t))} {
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

      &${cssName(jsStyles.vertical(t))}:hover {
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
        ${ColorFunctions.red(t.textColorDefault)},
        ${ColorFunctions.green(t.textColorDefault)},
        ${ColorFunctions.blue(t.textColorDefault)},
        0.5
      );
      cursor: default;

      &:hover {
        border-bottom-color: transparent !important;
      }

      &${cssName(jsStyles.vertical(t))}:hover {
        border-left-color: transparent !important;
      }
    `;
  },

  primary(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverPrimary};
      }
      &${cssName(jsStyles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverSuccess};
      }
      &${cssName(jsStyles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverWarning};
      }
      &${cssName(jsStyles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverError};
      }
      &${cssName(jsStyles.vertical(t))}:hover {
        border-left-color: ${t.tabColorHoverError};
      }
    `;
  },
};
