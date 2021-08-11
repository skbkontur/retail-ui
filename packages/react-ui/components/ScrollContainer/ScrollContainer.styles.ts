import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('button')({
  scrollbarX: 'scrollbar-x',
  scrollbarY: 'scrollbar-y',
});

export const styles = memoizeStyle({
  root() {
    return css`
      height: 100%;
      overflow: hidden;
      position: relative;
    `;
  },

  inner(t: Theme) {
    return css`
      position: relative;
      overflow: scroll;
      max-height: 100%;
      max-width: 100%;

      .${globalClasses.scrollbarX} ~ & {
        &::after {
          content: ' ';
          width: 100%;
          display: block;
          height: calc(${t.scrollContainerScrollBarHoverSize} + 2px);
        }
      }

      /*IEsometimesenabledscroll*/
      margin-bottom: -1px;
      padding-bottom: 1px;
      margin-right: -1px;
      padding-right: 1px;

      /* Hide scrobars without losing functionality */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `;
  },

  scrollBar(t: Theme) {
    return css`
      position: absolute;
      z-index: 200;

      &::after {
        content: '';
        display: block;
        border-radius: 5px;
        position: absolute;
        background: ${t.scrollContainerScrollBarColor};
      }
    `;
  },

  scrollBarInvert(t: Theme) {
    return css`
      &::after {
        background: #ccc;
        background: ${t.scrollContainerScrollBarInvertColor};
      }
    `;
  },

  scrollBarY(t: Theme) {
    return css`
      right: 2px;
      transition: width 0.2s;
      width: ${t.scrollContainerScrollBarSize};

      &::after {
        bottom: 1px;
        left: 0;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollBarYHover(t: Theme) {
    return css`
      width: ${t.scrollContainerScrollBarHoverSize};
    `;
  },

  scrollBarX(t: Theme) {
    return css`
      bottom: 1px;
      transition: height 0.2s;
      height: ${t.scrollContainerScrollBarSize};

      &::after {
        bottom: 0px;
        left: 1px;
        right: 1px;
        top: 0;
      }

      .${globalClasses.scrollbarY} ~ & {
        &::after {
          right: calc(${t.scrollContainerScrollBarHoverSize} + 4px) !important;
        }
      }
    `;
  },

  scrollBarXHover(t: Theme) {
    return css`
      height: ${t.scrollContainerScrollBarHoverSize};
    `;
  },
});
