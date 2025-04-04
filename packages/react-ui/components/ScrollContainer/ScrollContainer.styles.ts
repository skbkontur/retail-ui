import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('scroll-container')({
  scrollbarX: 'scrollbar-x',
  scrollbarY: 'scrollbar-y',
  scrollbarContainerX: 'scrollbar-container-x',
  scrollbarContainerY: 'scrollbar-container-y',
  inner: 'inner',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
        height: 100%;
        overflow: hidden;
        position: relative;
      `;
    },

    inner() {
      return emotion.css`
        position: relative;
        overflow: scroll;
        height: 100%;
        width: 100%;

        /* Hide scrobars without losing functionality */
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `;
    },

    innerIE11() {
      return emotion.css`
        /* IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX */
        margin-bottom: -1px;
        padding-bottom: 1px;
        margin-right: -1px;
        padding-right: 1px;
      `;
    },

    scrollBar(t: Theme) {
      return emotion.css`
        position: absolute;
        z-index: 200;
        border-radius: 5px;
        background: ${t.scrollContainerScrollBarColor};
        opacity: 0;
        transition:
          opacity 0.3s ease-out,
          width 0.2s,
          height 0.2s;
      `;
    },

    visibleScrollBar() {
      return emotion.css`
        opacity: 1;
        transition:
          opacity 0.1s ease-out,
          width 0.2s,
          height 0.2s;
      `;
    },

    scrollBarInvert(t: Theme) {
      return emotion.css`
        background: #ccc;
        background: ${t.scrollContainerScrollBarInvertColor};
      `;
    },

    scrollBarContainerY() {
      return emotion.css`
        position: absolute;
        right: 2px;
        top: 1px;
        bottom: 1px;
        width: 0;
      `;
    },

    scrollBarY(t: Theme) {
      return emotion.css`
        right: 0;
        width: ${t.scrollContainerScrollBarSize};
      `;
    },

    scrollBarYHover(t: Theme) {
      return emotion.css`
        width: ${t.scrollContainerScrollBarHoverSize};
      `;
    },

    scrollBarContainerX(t: Theme) {
      return emotion.css`
        position: absolute;
        right: 1px;
        bottom: 1px;
        left: 1px;
        height: 0;

        .${globalClasses.scrollbarContainerY} ~ & {
          margin-right: calc(${t.scrollContainerScrollBarHoverSize} + 3px) !important;
        }

        & ~ .${globalClasses.inner} {
          &::after {
            content: ' ';
            width: 100%;
            display: block;
            height: calc(${t.scrollContainerScrollBarHoverSize} + 2px);
          }
        }
      `;
    },

    scrollBarX(t: Theme) {
      return emotion.css`
        bottom: 0;
        height: ${t.scrollContainerScrollBarSize};
      `;
    },

    scrollBarXHover(t: Theme) {
      return emotion.css`
        height: ${t.scrollContainerScrollBarHoverSize};
      `;
    },
  });
