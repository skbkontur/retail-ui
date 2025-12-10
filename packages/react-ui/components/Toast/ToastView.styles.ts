import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

const getVerticalPaddings = (theme: Theme) => {
  const { toastPaddingY } = theme;
  const paddingY = parseInt(toastPaddingY);

  return [`${paddingY}px`, `${paddingY}px`];
};

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddings(t);
    return css`
      border-radius: ${t.toastBorderRadius};
      border: ${t.toastBorder};
      display: inline-flex;
      font-size: ${t.toastFontSize};
      line-height: ${t.toastLineHeight};
      opacity: 1;
      padding: ${paddingTop} ${t.toastPaddingX} ${paddingBottom};
      position: relative;
      top: ${t.toastTop};
    `;
  },

  default(t: Theme) {
    return css`
      background: ${t.toastBg};
      color: ${t.toastColor};
    `;
  },

  error(t: Theme) {
    return css`
      background: ${t.toastErrorBg};
      color: ${t.toastColorError};
    `;
  },

  wrapper(t: Theme) {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      text-align: center;
      border-radius: ${t.toastBorderRadius};
    `;
  },

  closeWrapper(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddings(t);
    return css`
      display: flex;
      margin: -${paddingTop} -${t.toastPaddingX} -${paddingBottom} 0;
    `;
  },

  link(t: Theme) {
    const [paddingTop, paddingBottom] = getVerticalPaddings(t);
    const padding = `${paddingTop} ${t.toastLinkPadding}`;

    return css`
      border: none;
      font: inherit;
      color: ${t.toastLinkColor};
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      background-color: transparent;

      margin: -${paddingTop} 0 -${paddingBottom} ${t.toastPaddingX};

      padding: ${padding};
      transition: background ${t.transitionDuration} ${t.transitionTimingFunction};
      &:hover {
        background: ${t.toastLinkBgHover};
        text-decoration: ${t.toastLinkTextDecorationHover};
      }
      padding: ${padding};
      transition: background ${t.transitionDuration} ${t.transitionTimingFunction};
    `;
  },

  toastActionErrorColor(t: Theme) {
    return css`
      color: ${t.toastLinkColorError};

      &:hover {
        background: ${t.toastLinkBgHoverError};
        text-decoration: ${t.toastLinkTextDecorationHover};
      }

      &:active {
        background: ${t.toastLinkBgActiveError};
        color: ${t.toastLinkColorActiveError};
      }
    `;
  },

  toastActionDefaultColor(t: Theme) {
    return css`
      color: ${t.toastLinkColor};

      &:hover {
        background: ${t.toastLinkBgHover};
        text-decoration: ${t.toastLinkTextDecorationHover};
      }

      &:active {
        background: ${t.toastLinkBgActive};
      }
    `;
  },
}));
