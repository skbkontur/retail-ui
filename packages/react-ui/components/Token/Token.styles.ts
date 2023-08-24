import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { tokenSizeMixin } from './Token.mixins';

export const globalClasses = prefix('token')({
  removeIcon: 'remove-icon',
});

export const styles = memoizeStyle({
  token(t: Theme) {
    return css`
      display: inline-flex;
      align-items: center;
      border-radius: ${t.tokenBorderRadius};
      min-width: 0;
      word-break: break-all;
      user-select: none;

      &:hover {
        cursor: pointer;
      }
    `;
  },

  tokenSmall(t: Theme) {
    return css`
      ${tokenSizeMixin(
        t.tokenPaddingYSmall,
        t.tokenPaddingXSmall,
        t.tokenLineHeightSmall,
        t.tokenFontSizeSmall,
        t.tokenMarginYSmall,
        t.tokenMarginXSmall,
      )};
    `;
  },

  tokenMedium(t: Theme) {
    return css`
      ${tokenSizeMixin(
        t.tokenPaddingYMedium,
        t.tokenPaddingXMedium,
        t.tokenLineHeightMedium,
        t.tokenFontSizeMedium,
        t.tokenMarginYMedium,
        t.tokenMarginXMedium,
      )};
    `;
  },

  tokenLarge(t: Theme) {
    return css`
      ${tokenSizeMixin(
        t.tokenPaddingYLarge,
        t.tokenPaddingXLarge,
        t.tokenLineHeightLarge,
        t.tokenFontSizeLarge,
        t.tokenMarginYLarge,
        t.tokenMarginXLarge,
      )};
    `;
  },

  tokenDefaultIdle2022(t: Theme) {
    return css`
      color: ${t.tokenDefaultIdleColor};
      background: ${t.tokenDefaultIdleBg};
      border: solid ${t.tokenBorderWidth} ${t.tokenDefaultIdleBorderColor};
      background-clip: border-box;
    `;
  },

  tokenDefaultIdleHovering2022(t: Theme) {
    return css`
      &:hover {
        color: ${t.tokenDefaultIdleColorHover};
        background: ${t.tokenDefaultIdleBgHover};
        border: solid ${t.tokenBorderWidth} ${t.tokenDefaultIdleBorderColorHover};
      }
    `;
  },

  tokenDefaultActive2022(t: Theme) {
    return css`
      color: ${t.tokenDefaultActiveColor};
      background: ${t.tokenDefaultActiveBg};
      border: solid ${t.tokenBorderWidth} ${t.tokenDefaultActiveBorderColor};
    `;
  },

  tokenError2022(t: Theme) {
    return css`
      border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorError};
      box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError};
    `;
  },

  tokenWarning2022(t: Theme) {
    return css`
      border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorWarning};
      box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning};
    `;
  },

  tokenDisabled2022(t: Theme) {
    return css`
      padding: ${t.tokenPaddingYDisabled} ${t.tokenPaddingXDisabled};
      margin: ${t.tokenMarginYDisabled} ${t.tokenMarginXDisabled};
      user-select: text;
      cursor: text;
      color: ${t.tokenTextColorDisabled};
      pointer-events: none;
      border: solid 1px ${t.tokenBorderColorDisabled};

      .${globalClasses.removeIcon} {
        visibility: hidden;
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
      pointer-events: none;

      .${globalClasses.removeIcon} {
        visibility: hidden;
      }
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
});

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

export const colorStyles = [
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
      const getVStyle = () => {
        if (v === 'error') {
          return css`
            box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError}, inset 0 0 0 1px ${color(t)};
          `;
        } else if (v === 'warning') {
          return css`
            box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning}, inset 0 0 0 1px ${color(t)};
          `;
        }

        return '';
      };

      return css`
        background-color: ${color(t)};
        color: ${ColorFunctions.contrast(color(t))};
        box-shadow: 0 0 0 ${t.tokenBorderWidth} ${ColorFunctions.darken(color(t), '5%')}, inset 0 0 0 1px ${color(t)};

        ${getVStyle()}

        .${globalClasses.removeIcon}:hover {
          color: ${ColorFunctions.contrast(color(t))};
        }
      `;
    },
  }),
  {
    defaultDisabled(t: Theme) {
      return css`
        background-color: ${t.tokenDisabledBg};
        box-shadow: ${t.tokenShadowDisabled};
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
