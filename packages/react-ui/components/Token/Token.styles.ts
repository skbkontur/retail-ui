import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

const styles = {
  token(t: Theme) {
    return css`
      display: inline-flex;
      align-items: center;
      border-radius: 1px;
      padding: 0 ${t.tokenPaddingX};
      line-height: ${t.tokenLineHeight};
      font-size: ${t.tokenFontSize};
      margin: 3px;
      min-width: 0;
      word-break: break-word;
      user-select: none;

      &:hover {
        cursor: pointer;
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      box-shadow: none !important;
      margin: 2px;
      padding: 1px ${t.tokenPaddingX};
      user-select: text;
      cursor: text;
      color: ${t.textColorDisabled} !important;
    `;
  },

  text() {
    return css`
      display: inline-block;
      padding-bottom: 1px;
    `;
  },

  removeIcon() {
    return css`
      height: 1em;
      width: 1em;
      flex-shrink: 0;
      padding: 2px;
      box-sizing: border-box;
      margin-left: 4px;
      transition: none;
      fill: currentColor;
      opacity: 0.5;
      line-height: 0;

      &:hover {
        opacity: 1;
      }
    `;
  },
};

interface TokenColors {
  defaultIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  defaultActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  defaultDisabled: (t: Theme) => string;
  defaultDisabledWarning: (t: Theme) => string;
  defaultDisabledError: (t: Theme) => string;
  grayIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  grayActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  blueIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  blueActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  greenIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  greenActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  yellowIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  yellowActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  redIdle: (t: Theme, v: 'error' | 'warning' | null) => string;
  redActive: (t: Theme, v: 'error' | 'warning' | null) => string;
  white: (t: Theme, v: 'error' | 'warning' | null) => string;
  black: (t: Theme, v: 'error' | 'warning' | null) => string;
}

export const jsStyles = memoizeStyle(styles);

export const jsTokenColors = [
  { name: 'defaultIdle', color: (t: Theme) => t.grayXLight },
  { name: 'defaultActive', color: (t: Theme) => t.brand },
  { name: 'grayIdle', color: (t: Theme) => t.grayXLight },
  { name: 'grayActive', color: (t: Theme) => t.grayDark },
  { name: 'blueIdle', color: (t: Theme) => t.blueLight },
  { name: 'blueActive', color: (t: Theme) => t.blueDark },
  { name: 'greenIdle', color: (t: Theme) => t.greenXxLight },
  { name: 'greenActive', color: (t: Theme) => t.greenDark },
  { name: 'yellowIdle', color: (t: Theme) => t.yellowXxLight },
  { name: 'yellowActive', color: (t: Theme) => t.yellowDark },
  { name: 'redIdle', color: (t: Theme) => t.redXxLight },
  { name: 'redActive', color: (t: Theme) => t.redDark },
  { name: 'white', color: (t: Theme) => t.white },
  { name: 'black', color: (t: Theme) => t.black },
].reduce(
  (colors: TokenColors, { name, color }) => ({
    ...colors,
    [name](t: Theme, v: 'error' | 'warning') {
      const warning = css`
        box-shadow: 0 0 0 2px ${t.borderColorWarning}, inset 0 0 0 1px ${color(t)};
      `;
      const error = css`
        box-shadow: 0 0 0 2px ${t.borderColorError}, inset 0 0 0 1px ${color(t)};
      `;
      const vStyle = v === 'error' ? error : v === 'warning' ? warning : '';

      return css`
        background-color: ${color(t)};
        color: ${ColorFunctions.contrast(color(t))};
        box-shadow: 0 0 0 1px ${ColorFunctions.darken(color(t), '5%')}, inset 0 0 0 1px ${color(t)};

        ${vStyle}

        & ${cssName(jsStyles.removeIcon())}:hover {
          color: ${ColorFunctions.contrast(color(t))};
        }
      `;
    },
  }),
  {
    defaultDisabled(t: Theme) {
      return css`
        background-color: ${t.tokenDisabledBg};
        color: ${ColorFunctions.contrast(t.tokenDisabledBg)};
        box-shadow: 0 0 0 1px ${t.tokenDisabledBg};

        & ${cssName(jsStyles.removeIcon())} {
          fill: ${t.textColorDisabled};
          opacity: 1;
        }
      `;
    },
    defaultDisabledWarning(t: Theme) {
      return css`
        box-shadow: 0 0 0 2px ${t.borderColorWarning}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
    },
    defaultDisabledError(t: Theme) {
      return css`
        box-shadow: 0 0 0 2px ${t.borderColorError}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
    },
  } as TokenColors,
);
