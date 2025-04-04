import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const getVerticalPaddings = (theme: Theme) => {
  const { toastPaddingY } = theme;
  const paddingY = parseInt(toastPaddingY);

  return [`${paddingY}px`, `${paddingY}px`];
};

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      const [paddingTop, paddingBottom] = getVerticalPaddings(t);
      return emotion.css`
        background: ${t.toastBg};
        border-radius: ${t.toastBorderRadius};
        border: ${t.toastBorder};
        color: ${t.toastColor};
        display: inline-flex;
        font-size: ${t.toastFontSize};
        line-height: ${t.toastLineHeight};
        opacity: 1;
        padding: ${paddingTop} ${t.toastPaddingX} ${paddingBottom};
        position: relative;
        top: ${t.toastTop};
      `;
    },

    wrapper(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        display: flex;
        margin: -${paddingTop} -${t.toastPaddingX} -${paddingBottom} 0;
      `;
    },

    link(t: Theme) {
      const [paddingTop, paddingBottom] = getVerticalPaddings(t);
      const padding = `${paddingTop} ${t.toastLinkPadding}`;

      return emotion.css`
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

        &:active {
          background: ${t.toastLinkBgActive};
        }
      `;
    },
  });
