import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('scroll-container')({
  scrollbarX: 'scrollbar-x',
  scrollbarY: 'scrollbar-y',
  scrollbarContainerX: 'scrollbar-container-x',
  scrollbarContainerY: 'scrollbar-container-y',
  inner: 'inner',
});

export const styles = memoizeStyle({
  root() {
    return css`
      height: 100%;
      overflow: hidden;
      position: relative;
    `;
  },

  inner() {
    return css`
      position: relative;
      overflow: scroll;
      max-height: 100%;
      max-width: 100%;

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
    return css`
      /* IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX */
      margin-bottom: -1px;
      padding-bottom: 1px;
      margin-right: -1px;
      padding-right: 1px;
    `;
  },

  scrollBar(t: Theme) {
    return css`
      position: absolute;
      z-index: 200;
      border-radius: 5px;
      background: ${t.scrollContainerScrollBarColor};
      opacity: 0;
    `;
  },

  visibleScrollBar() {
    return css`
      opacity: 1;
    `;
  },

  scrollBarInvert(t: Theme) {
    return css`
      background: #ccc;
      background: ${t.scrollContainerScrollBarInvertColor};
    `;
  },

  scrollBarContainerY() {
    return css`
      position: absolute;
      right: 2px;
      top: 1px;
      bottom: 1px;
      width: 0;
    `;
  },

  scrollBarY(t: Theme) {
    return css`
      right: 0;
      transition: width 0.2s;
      width: ${t.scrollContainerScrollBarSize};
    `;
  },

  scrollBarYHover(t: Theme) {
    return css`
      width: ${t.scrollContainerScrollBarHoverSize};
    `;
  },

  scrollBarContainerX(t: Theme) {
    return css`
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
    return css`
      bottom: 0;
      transition: height 0.2s;
      height: ${t.scrollContainerScrollBarSize};
    `;
  },

  scrollBarXHover(t: Theme) {
    return css`
      height: ${t.scrollContainerScrollBarHoverSize};
    `;
  },
  transition() {
    return css`
      opacity: 0 !important; //override scrollBar opacity
    `;
  },
  transitionActive() {
    return css`
      transition: opacity 100ms ease-out !important; //override scrollBarX and scrollBarY transition
      opacity: 1 !important; //override scrollBar opacity
    `;
  },
  transitionLeave() {
    return css`
      opacity: 1 !important; //override scrollBar opacity
    `;
  },
  transitionLeaveActive() {
    return css`
      opacity: 0 !important; //override scrollBar opacity
      transition: opacity 300ms ease-out !important; //override scrollBarX and scrollBarY transition
    `;
  },
});
