import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';
import { SizeProp } from '../../lib/types/props';

import { fontSize, lineHeight, paddingX, paddingY } from './helpers';

export const globalClasses = prefix('tab')({
  focus: 'focus',
});

export const getStyles = (emotion: Emotion) => {
  function tabRoot(t: Theme, size: SizeProp) {
    return emotion.css`
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

  function tabVertical(t: Theme, size: SizeProp) {
    return emotion.css`
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

  function tabFocus(t: Theme, size: SizeProp) {
    return emotion.css`
    border: ${t.tabOutlineWidth} solid ${t.tabColorFocus};
    bottom: -${t.tabBorderWidth};
    left: -${paddingX(t, size)};
    position: absolute;
    right: -${paddingX(t, size)};
    top: 0;
  `;
  }

  return memoizeStyle({
    rootSmall(t: Theme) {
      return tabRoot(t, 'small');
    },

    rootMedium(t: Theme) {
      return tabRoot(t, 'medium');
    },

    rootLarge(t: Theme) {
      return tabRoot(t, 'large');
    },

    verticalSmall(t: Theme) {
      return tabVertical(t, 'small');
    },

    verticalMedium(t: Theme) {
      return tabVertical(t, 'medium');
    },

    verticalLarge(t: Theme) {
      return tabVertical(t, 'large');
    },

    focusSmall(t: Theme) {
      return tabFocus(t, 'small');
    },

    focusMedium(t: Theme) {
      return tabFocus(t, 'medium');
    },

    focusLarge(t: Theme) {
      return tabFocus(t, 'large');
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
  });
};

export const getHorizontalStyles = (emotion: Emotion) =>
  memoizeStyle({
    active(t: Theme) {
      return emotion.css`
      &:hover {
        border-bottom: ${t.tabBorderWidth} solid transparent;
      }
    `;
    },

    disabled() {
      return emotion.css`
      &:hover {
        border-bottom-color: transparent;
      }
    `;
    },

    primary(t: Theme) {
      return emotion.css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverPrimary};
      }
    `;
    },

    success(t: Theme) {
      return emotion.css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverSuccess};
      }
    `;
    },

    warning(t: Theme) {
      return emotion.css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverWarning};
      }
    `;
    },

    error(t: Theme) {
      return emotion.css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverError};
      }
    `;
    },
  });

export const getVerticalStyles = (emotion: Emotion) =>
  memoizeStyle({
    active(t: Theme) {
      return emotion.css`
      &:hover {
        border-left: ${t.tabBorderWidth} solid transparent;
      }
    `;
    },

    disabled() {
      return emotion.css`
      &:hover {
        border-left-color: transparent;
      }
    `;
    },

    primary(t: Theme) {
      return emotion.css`
      &:hover {
        border-left-color: ${t.tabColorHoverPrimary};
      }
    `;
    },

    success(t: Theme) {
      return emotion.css`
      &:hover {
        border-left-color: ${t.tabColorHoverSuccess};
      }
    `;
    },

    warning(t: Theme) {
      return emotion.css`
      &:hover {
        border-left-color: ${t.tabColorHoverWarning};
      }
    `;
    },

    error(t: Theme) {
      return emotion.css`
      &:hover {
        border-left-color: ${t.tabColorHoverError};
      }
    `;
    },
  });
