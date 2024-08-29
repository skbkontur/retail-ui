import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import { tokenSizeMixin } from './Token.mixins';

export const globalClasses = prefix('token')({
  removeIcon: 'remove-icon',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    token(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        ${tokenSizeMixin(emotion)(
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
      return emotion.css`
        ${tokenSizeMixin(emotion)(
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
      return emotion.css`
        ${tokenSizeMixin(emotion)(
          t.tokenPaddingYLarge,
          t.tokenPaddingXLarge,
          t.tokenLineHeightLarge,
          t.tokenFontSizeLarge,
          t.tokenMarginYLarge,
          t.tokenMarginXLarge,
        )};
      `;
    },

    token2022(t: Theme) {
      return emotion.css`
        border: solid ${t.tokenBorderWidth} transparent;
      `;
    },

    tokenDefaultIdle2022(t: Theme) {
      return emotion.css`
        color: ${t.tokenDefaultIdleColor};
        background: ${t.tokenDefaultIdleBg};
        border-color: ${t.tokenDefaultIdleBorderColor};
        background-clip: border-box;
      `;
    },

    tokenDefaultIdleHovering2022(t: Theme) {
      return emotion.css`
        &:hover {
          color: ${t.tokenDefaultIdleColorHover};
          background: ${t.tokenDefaultIdleBgHover};
          border: solid ${t.tokenBorderWidth} ${t.tokenDefaultIdleBorderColorHover};
        }
      `;
    },

    tokenDefaultActive2022(t: Theme) {
      return emotion.css`
        color: ${t.tokenDefaultActiveColor};
        background: ${t.tokenDefaultActiveBg};
        border: solid ${t.tokenBorderWidth} ${t.tokenDefaultActiveBorderColor};
      `;
    },

    tokenError2022(t: Theme) {
      return emotion.css`
        border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorError};
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError};
      `;
    },

    tokenWarning2022(t: Theme) {
      return emotion.css`
        border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorWarning};
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning};
      `;
    },

    tokenDisabled2022(t: Theme) {
      return emotion.css`
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
      return emotion.css`
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
      return emotion.css`
        display: inline-block;
        padding-bottom: ${t.tokenLegacyTextShift};
      `;
    },

    removeIcon(t: Theme) {
      return emotion.css`
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
        display: inline-block;

        &:hover {
          opacity: 1;
        }
      `;
    },

    helperText() {
      return emotion.css`
        max-width: 100%;
        word-break: break-all;

        // don't collapse spaces
        // so they get counted in width
        white-space: pre-wrap;
      `;
    },
    helperContainer() {
      return emotion.css`
        display: flex;
        position: absolute;
        visibility: hidden;
      `;
    },
    helperContainerSmall(t: Theme) {
      return emotion.css`
        left: ${t.tokenInputPaddingXSmall};
        right: ${t.tokenInputPaddingXSmall};
      `;
    },
    helperContainerMedium(t: Theme) {
      return emotion.css`
        left: ${t.tokenInputPaddingXMedium};
        right: ${t.tokenInputPaddingXMedium};
      `;
    },
    helperContainerLarge(t: Theme) {
      return emotion.css`
        left: ${t.tokenInputPaddingXLarge};
        right: ${t.tokenInputPaddingXLarge};
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

export const getColorStyles = (emotion: Emotion) => {
  const tokenColors = [
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
            return emotion.css`
            box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError}, inset 0 0 0 1px ${color(t)};
          `;
          } else if (v === 'warning') {
            return emotion.css`
            box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning}, inset 0 0 0 1px ${color(t)};
          `;
          }

          return '';
        };

        return emotion.css`
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
        return emotion.css`
        background-color: ${t.tokenDisabledBg};
        box-shadow: ${t.tokenShadowDisabled};
      `;
      },
      defaultDisabledWarning(t: Theme) {
        return emotion.css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
      },
      defaultDisabledError(t: Theme) {
        return emotion.css`
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError}, inset 0 0 0 1px ${t.tokenDisabledBg};
      `;
      },
    } as TokenColors,
  );
  return tokenColors;
};
