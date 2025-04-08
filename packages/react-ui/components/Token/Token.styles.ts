import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

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
      border: solid ${t.tokenBorderWidth} transparent;
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

    tokenIdle(t: Theme) {
      return emotion.css`
        color: ${t.tokenColor};
        background: ${t.tokenBg};
        border-color: ${t.tokenBorderColor};
        background-clip: border-box;
      `;
    },

    tokenHover(t: Theme) {
      return emotion.css`
        &:hover {
          color: ${t.tokenColorHover};
          background: ${t.tokenBgHover};
          border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorHover};
        }
      `;
    },

    tokenActive(t: Theme) {
      return emotion.css`
        color: ${t.tokenColorActive};
        background: ${t.tokenBgActive};
        border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorActive};
      `;
    },

    tokenError(t: Theme) {
      return emotion.css`
        border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorError};
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorError};
      `;
    },

    tokenWarning(t: Theme) {
      return emotion.css`
        border: solid ${t.tokenBorderWidth} ${t.tokenBorderColorWarning};
        box-shadow: 0 0 0 ${t.tokenOutlineWidth} ${t.tokenBorderColorWarning};
      `;
    },

    tokenDisabled(t: Theme) {
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

    text() {
      return emotion.css`
        display: inline-block;
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
