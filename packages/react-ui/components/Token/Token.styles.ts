import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

const styles = {
  token(t: Theme) {
    return css`
      display: inline-flex;
      align-items: center;
      border-radius: ${t.tokenBorderRadius};
      padding: ${t.tokenPaddingY} ${t.tokenPaddingX};
      line-height: ${t.tokenLineHeight};
      font-size: ${t.tokenFontSize};
      margin: ${t.tokenMarginY} ${t.tokenMarginX};
      min-width: 0;
      word-break: break-all;
      user-select: none;

      &:hover {
        cursor: pointer;
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      padding: ${t.tokenPaddingYDisabled} ${t.tokenPaddingXDisabled};
      margin: ${t.tokenMarginYDisabled} ${t.tokenMarginXDisabled};
      user-select: text;
      cursor: text;
      color: ${t.tokenTextColorDisabled};
    `;
  },

  text(t: Theme) {
    return css`
      display: inline-block;
      padding-bottom: ${t.tokenLegacyTextShift};
    `;
  },

  removeIcon(t: Theme) {
    return css`
      height: ${t.tokenRemoveIconSize};
      width: ${t.tokenRemoveIconSize};
      flex-shrink: 0;
      padding: ${t.tokenRemoveIconPaddingY} ${t.tokenRemoveIconPaddingX};
      box-sizing: ${t.tokenRemoveIconBoxSizing};
      margin-left: ${t.tokenRemoveIconGap};
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
  { name: 'defaultIdle', color: (t: Theme) => t.tokenDefaultIdle },
  { name: 'defaultActive', color: (t: Theme) => t.tokenDefaultActive },
  { name: 'grayIdle', color: (t: Theme) => t.tokenGrayIdle },
  { name: 'grayActive', color: (t: Theme) => t.tokenGrayActive },
  { name: 'blueIdle', color: (t: Theme) => t.tokenBlueIdle },
  { name: 'blueActive', color: (t: Theme) => t.tokenBlueActive },
  { name: 'greenIdle', color: (t: Theme) => t.tokenGreenIdle },
  { name: 'greenActive', color: (t: Theme) => t.tokenGreenActive },
  { name: 'yellowIdle', color: (t: Theme) => t.tokenYellowIdle },
  { name: 'yellowActive', color: (t: Theme) => t.tokenYellowActive },
  { name: 'redIdle', color: (t: Theme) => t.tokenRedIdle },
  { name: 'redActive', color: (t: Theme) => t.tokenRedActive },
  { name: 'white', color: (t: Theme) => t.tokenWhite },
  { name: 'black', color: (t: Theme) => t.tokenBlack },
].reduce(
  (colors: TokenColors, { name, color }) => ({
    ...colors,
    [name](t: Theme, v: 'error' | 'warning') {
      const warning = css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning}, inset 0 0 0 1px ${color(t)};
      `;
      const error = css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError}, inset 0 0 0 1px ${color(t)};
      `;
      const vStyle = v === 'error' ? error : v === 'warning' ? warning : '';

      return css`
        background-color: ${color(t)};
        color: ${ColorFunctions.contrast(color(t))};
        box-shadow: 0 0 0 ${t.tokenBorderWidth} ${ColorFunctions.darken(color(t), '5%')}, inset 0 0 0 1px ${color(t)};

        ${vStyle}

        & ${cssName(jsStyles.removeIcon(t))}:hover {
          color: ${ColorFunctions.contrast(color(t))};
        }
      `;
    },
  }),
  {
    defaultDisabled(t: Theme) {
      return css`
        background-color: ${t.tokenDisabledBg};
        box-shadow: ${t.tokenShadowDisabled}};

        & ${cssName(jsStyles.removeIcon(t))} {
          fill: ${t.tokenTextColorDisabled};
          opacity: 1;
        }
      `;
    },
    defaultDisabledWarning(t: Theme) {
      return css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
    },
    defaultDisabledError(t: Theme) {
      return css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
    },
  } as TokenColors,
);
