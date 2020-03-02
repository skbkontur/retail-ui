import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

const styles = {
  token() {
    return css`
      display: inline-flex;
      align-items: center;
      border-radius: 1px;
      padding: 0 4px;
      line-height: 1.5;
      font-size: 14px;
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
      padding: 1px 4px;
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
  { name: 'defaultIdle', color: 'grayXLight' },
  { name: 'defaultActive', color: 'brand' },
  { name: 'grayIdle', color: 'grayXLight' },
  { name: 'grayActive', color: 'grayDark' },
  { name: 'blueIdle', color: 'blueLight' },
  { name: 'blueActive', color: 'blueDark' },
  { name: 'greenIdle', color: 'greenXxLight' },
  { name: 'greenActive', color: 'greenDark' },
  { name: 'yellowIdle', color: 'yellowXxLight' },
  { name: 'yellowActive', color: 'yellowDark' },
  { name: 'redIdle', color: 'redXxLight' },
  { name: 'redActive', color: 'redDark' },
  { name: 'white', color: 'white' },
  { name: 'black', color: 'black' },
].reduce(
  (colors: TokenColors, { name, color }) => ({
    ...colors,
    [name](t: Theme, v: 'error' | 'warning') {
      const warning = css`
        box-shadow: 0 0 0 2px ${t.borderColorWarning}, inset 0 0 0 1px ${t[color]};
      `;
      const error = css`
        box-shadow: 0 0 0 2px ${t.borderColorError}, inset 0 0 0 1px ${t[color]};
      `;
      const vStyle = v === 'error' ? error : v === 'warning' ? warning : '';

      return css`
        background-color: ${t[color]};
        color: ${ColorFunctions.contrast(t[color])};
        box-shadow: 0 0 0 1px ${ColorFunctions.darken(t[color], '5%')}, inset 0 0 0 1px ${t[color]};

        ${vStyle}

        & ${cssName(jsStyles.removeIcon())}:hover {
          color: ${ColorFunctions.contrast(t[color])};
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
