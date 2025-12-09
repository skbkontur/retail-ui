import type { Emotion } from '@emotion/css/types/create-instance';

import { memoizeGetStyles, prefix } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import type { Theme } from '../../lib/theming/Theme';
import type { SizeProp } from '../../lib/types/props';

import { fontSize, lineHeight, paddingX, paddingY } from './helpers';

export const globalClasses = prefix('tab')({
  focus: 'focus',
});

export const getStyles = memoizeGetStyles((emotion: Emotion) => ({
  rootSmall(t: Theme) {
    return emotion.css`
        ${tabRoot(t, 'small', emotion)}
      `;
  },

  rootMedium(t: Theme) {
    return emotion.css`
        ${tabRoot(t, 'medium', emotion)}
      `;
  },

  rootLarge(t: Theme) {
    return emotion.css`
        ${tabRoot(t, 'large', emotion)}
      `;
  },

  verticalSmall(t: Theme) {
    return emotion.css`
        ${tabVertical(t, 'small', emotion)}
      `;
  },

  verticalMedium(t: Theme) {
    return emotion.css`
        ${tabVertical(t, 'medium', emotion)}
      `;
  },

  verticalLarge(t: Theme) {
    return emotion.css`
        ${tabVertical(t, 'large', emotion)}
      `;
  },

  focusSmall(t: Theme) {
    return emotion.css`
        ${tabFocus(t, 'small', emotion)}
      `;
  },

  focusMedium(t: Theme) {
    return emotion.css`
        ${tabFocus(t, 'medium', emotion)}
      `;
  },

  focusLarge(t: Theme) {
    return emotion.css`
        ${tabFocus(t, 'large', emotion)}
      `;
  },

  disabled(t: Theme) {
    return emotion.css`
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
    return emotion.css`
        cursor: default;
      `;
  },
}));

export const getHorizontalStyles = memoizeGetStyles(({ css }: Emotion) => ({
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
}));

export const getVerticalStyles = memoizeGetStyles(({ css }: Emotion) => ({
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
}));

function tabRoot(t: Theme, size: SizeProp, { css }: Emotion) {
  return css`
    border-bottom: ${t.tabBorderWidth} solid transparent;
    box-sizing: border-box;
    color: ${t.tabTextColorDefault};
    cursor: pointer;
    display: inline-block;
    font-size: ${fontSize(t, size)};
    line-height: ${lineHeight(t, size)};
    margin-left: ${paddingX(t, size)};
    margin-right: ${paddingX(t, size)};
    padding-bottom: calc(${paddingY(t, size)} - ${t.tabBorderWidth});
    padding-top: ${paddingY(t, size)};
    position: relative;
    text-decoration: inherit;
    transition: border-bottom ${t.transitionDuration} ${t.transitionTimingFunction};

    &:hover {
      outline: inherit;
      border-bottom: ${t.tabBorderWidth} solid ${t.tabColorHover};
    }

    &:focus {
      outline: inherit;
    }
  `;
}

function tabVertical(t: Theme, size: SizeProp, { css }: Emotion) {
  return css`
    border-bottom: none;
    border-left: ${t.tabBorderWidth} solid transparent;
    display: block;
    margin-left: 0;
    margin-right: 0;
    padding-left: ${shift(paddingX(t, size), `-${t.tabBorderWidth}`)};
    padding-right: ${paddingX(t, size)};

    &:hover {
      border-bottom: none;
      border-left: ${t.tabBorderWidth} solid ${t.tabColorHover};
    }

    .${globalClasses.focus} {
      bottom: 0;
      left: -${t.tabBorderWidth};
      right: 0;
    }
  `;
}

function tabFocus(t: Theme, size: SizeProp, { css }: Emotion) {
  return css`
    border: ${t.tabOutlineWidth} solid ${t.tabColorFocus};
    bottom: -${t.tabBorderWidth};
    left: -${paddingX(t, size)};
    position: absolute;
    right: -${paddingX(t, size)};
    top: 0;
  `;
}
